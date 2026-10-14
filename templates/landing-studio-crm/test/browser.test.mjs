import { chromium } from 'playwright';
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
  assert.deepEqual(errors,[],'Não deve haver erros JS no navegador');
  console.log('Browser smoke tests passed: CRUD, workflow, clipboard, persistence, search, JSON download and 6 viewports.');
} finally { await browser.close(); }
