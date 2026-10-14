import { chromium } from 'playwright';
import AxeBuilder from '@axe-core/playwright';
import { mkdir } from 'node:fs/promises';
import { resolve } from 'node:path';
import assert from 'node:assert/strict';

const browser = await chromium.launch({ headless:true });
const shots = resolve('templates/landing-studio-crm/test/evidence');
await mkdir(shots,{recursive:true});
let page;
try {
  const context = await browser.newContext({
    viewport:{width:1440,height:900},
    permissions:['clipboard-read','clipboard-write'],
    acceptDownloads:true
  });
  page = await context.newPage();
  const errors = [];
  page.on('pageerror', error => errors.push(String(error)));
  await page.goto('http://127.0.0.1:4173/',{waitUntil:'domcontentloaded'});
  await page.locator('#add-lead').waitFor();
  const dashboardA11y = await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa','wcag22aa']).analyze();
  if (dashboardA11y.violations.length) console.error('AXE-DASHBOARD',JSON.stringify(dashboardA11y.violations.map(v=>({id:v.id,impact:v.impact,nodes:v.nodes.map(n=>({target:n.target,summary:n.failureSummary}))})),null,2));
  assert.deepEqual(dashboardA11y.violations.filter(x=>['critical','serious'].includes(x.impact)).map(x=>x.id),[],'Acessibilidade automatizada do dashboard');
  await page.locator('#add-lead').click();
  await page.locator('[name=name]').fill('Empresa Teste');
  await page.locator('[name=segment]').fill('Assistência técnica');
  await page.locator('[name=city]').fill('Torres/RS');
  await page.locator('[name=source]').fill('https://example.com/');
  await page.locator('[name=next_action]').fill('Criar duas opções de direção');
  await page.locator('#lead-form button[type=submit]').click();
  assert.equal(await page.locator('#lead-rows tr').count(),1,'Deve salvar empresa');
  assert.match(await page.locator('#lead-rows').innerText(),/Empresa Teste/);

  await page.locator('[data-workflow]').click();
  assert.equal(await page.locator('#workflow-dialog').getAttribute('open'),'','Dialog deve abrir');
  assert.match(await page.locator('#workflow-count').innerText(),/0 de 7/);
  const checklistA11y = await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa','wcag22aa']).analyze();
  assert.deepEqual(checklistA11y.violations.filter(x=>['critical','serious'].includes(x.impact)).map(x=>x.id),[],'Acessibilidade automatizada do roteiro');
  await page.locator('[data-workflow-check="pesquisa"]').check();
  assert.match(await page.locator('#workflow-count').innerText(),/1 de 7/);
  await page.locator('[data-workflow-copy="brief"]').click();
  const copied = await page.evaluate(() => navigator.clipboard.readText());
  assert.match(copied,/Empresa Teste/);
  assert.match(copied,/BRIEF.md/);
  await page.locator('#workflow-done').click();
  await page.reload({waitUntil:'domcontentloaded'});
  assert.match(await page.locator('#lead-rows').innerText(),/1\/7 etapas/,'Checklist deve persistir');
  await page.locator('[data-workflow]').click();
  assert.equal(await page.locator('[data-workflow-check="pesquisa"]').isChecked(),true);
  await page.locator('#workflow-done').click();

  await page.locator('[data-stage-id]').selectOption('contatado');
  assert.equal(await page.locator('[data-stage-id]').inputValue(),'contatado');
  await page.locator('#search').fill('inexistente');
  assert.equal(await page.locator('#lead-rows tr').count(),0);
  await page.locator('#search').fill('Torres');
  assert.equal(await page.locator('#lead-rows tr').count(),1);
  await page.locator('#search').fill('');

  const dl = page.waitForEvent('download');
  await page.locator('#export-json').click();
  const d = await dl;
  assert.match(d.suggestedFilename(),/\.json$/);
  const backupPath=resolve(shots,'teste-backup.json');
  await d.saveAs(backupPath);
  await page.locator('[data-stage-id]').selectOption('perdido');
  assert.equal(await page.locator('[data-stage-id]').inputValue(),'perdido');
  page.once('dialog',dialog=>dialog.accept());
  await page.locator('#import-json').setInputFiles(backupPath);
  await page.waitForFunction(() => document.querySelector('[data-stage-id]')?.value === 'contatado');
  assert.equal(await page.locator('#lead-rows tr').count(),1,'Importação JSON deve restaurar registro');

  for(const width of [320,375,414,768,1024,1440]){
    await page.setViewportSize({width,height:900});
    await page.screenshot({path:resolve(shots,`dashboard-${width}.png`),fullPage:true,animations:'disabled'});
    const overflow = await page.evaluate(() => ({
      width:window.innerWidth,
      scroll:document.documentElement.scrollWidth
    }));
    assert.ok(overflow.scroll <= overflow.width + 1,`Overflow horizontal em ${width}px: ${JSON.stringify(overflow)}`);
    await page.locator('[data-workflow]').click();
    await page.screenshot({path:resolve(shots,`roteiro-${width}.png`),animations:'disabled'});
    const dialogOverflow=await page.locator('#workflow-dialog').evaluate(el=>el.scrollWidth > el.clientWidth + 1);
    assert.equal(dialogOverflow,false,`Roteiro com overflow em ${width}px`);
    await page.locator('#workflow-done').click();
  }
  await page.locator('#add-lead').focus();
  await page.keyboard.press('Enter');
  assert.equal(await page.locator('#lead-dialog').getAttribute('open'),'','O formulário abre com teclado');
  await page.keyboard.press('Escape');
  assert.equal(await page.locator('#lead-dialog').getAttribute('open'),null,'O formulário fecha com Escape');
  assert.deepEqual(errors,[],'Não deve haver erros JS no navegador');
  console.log('Browser smoke tests passed: CRUD, workflow, clipboard, persistence, search, import/export JSON, keyboard, axe and 6 viewports.');
} finally { await browser.close(); }
