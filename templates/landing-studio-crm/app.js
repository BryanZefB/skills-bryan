import { STAGES, PHASES, AUDITS, WORKFLOW, workflowProgress, normalizeLead, summarize, filterLeads, backup, restore, exportCsv, safeUrl } from './core.mjs';

const STORAGE_KEY = 'landing-studio-crm-v1';
const $ = selector => document.querySelector(selector);
const money = n => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }).format(n || 0);
const esc = input => String(input ?? '').replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&#39;');
const stageName = id => STAGES.find(s => s.id === id)?.label || 'Pesquisar';
const idFactory = () => crypto.randomUUID();
let leads = [];
let editingId = null;
let workflowId = null;
let warning = '';

function notify(message) {
  const node = $('#notice');
  node.textContent = message;
  node.hidden = false;
}
function persist() {
  try {
    localStorage.setItem(STORAGE_KEY, backup(leads));
    return true;
  } catch {
    notify('Não foi possível salvar neste navegador. Exporte um backup e confira permissões e espaço.');
    return false;
  }
}
function read() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (!saved) return [];
  try { return restore(saved, idFactory); }
  catch {
    warning = 'Os dados locais não puderam ser lidos. O conteúdo original foi preservado neste navegador; não cadastre novos registros sem recuperar um backup.';
    return [];
  }
}
function link(url, label) {
  const href = safeUrl(url);
  return href ? '<a class="mini-link" href="' + esc(href) + '" target="_blank" rel="noopener noreferrer">' + esc(label) + ' ↗</a>' : '';
}
function options(items, selected) {
  return items.map(item => {
    const value = typeof item === 'string' ? item : item.id;
    const label = typeof item === 'string' ? item : item.label;
    return '<option value="' + esc(value) + '"' + (value === selected ? ' selected' : '') + '>' + esc(label) + '</option>';
  }).join('');
}
function render() {
  const s = summarize(leads);
  $('#stat-total').textContent = s.total;
  $('#stat-ready').textContent = s.ready;
  $('#stat-answered').textContent = s.answered;
  $('#stat-revenue').textContent = money(s.revenue);
  $('#stat-won').textContent = s.won + (s.won === 1 ? ' contrato fechado' : ' contratos fechados');
  const result = filterLeads(leads, $('#search').value, $('#stage-filter').value);
  $('#result-count').textContent = result.length + (result.length === 1 ? ' resultado' : ' resultados');
  $('#lead-rows').innerHTML = result.map(l => '<tr>' +
    '<td><strong class="company">' + esc(l.name) + '</strong><small>' + esc([l.segment, l.city].filter(Boolean).join(' · ') || 'Sem segmento/cidade') + '</small></td>' +
    '<td><select class="stage-select" aria-label="Etapa de ' + esc(l.name) + '" data-stage-id="' + esc(l.id) + '">' + options(STAGES,l.stage) + '</select></td>' +
    '<td><span class="phase">' + esc(l.phase) + '</span><small>Auditoria: ' + esc(l.audit) + ' · ' + workflowProgress(l).finished + '/' + WORKFLOW.length + ' etapas</small></td>' +
    '<td><span>' + esc(l.next_date ? l.next_date.split('-').reverse().join('/') : 'Não agendada') + '</span><small>' + esc((l.next_action || l.notes).slice(0,80) || 'Sem próxima ação descrita') + '</small></td>' +
    '<td><div class="links">' + (link(l.vercel_url,'Prévia') + link(l.github_url,'GitHub') + link(l.website,'Site') || '<span class="muted">—</span>') + '</div></td>' +
    '<td><div class="actions"><button type="button" class="text-button workflow-button" data-workflow="' + esc(l.id) + '">Roteiro</button><button type="button" class="text-button" data-edit="' + esc(l.id) + '">Editar</button><button type="button" class="text-button delete" data-delete="' + esc(l.id) + '">Excluir</button></div></td>' +
    '</tr>').join('');
  $('#empty').hidden = result.length > 0;
  const prompt = $('#prompt-lead');
  const previous = prompt.value;
  prompt.innerHTML = '<option value="">Sem empresa (modelo genérico)</option>' + leads.map(l => '<option value="' + esc(l.id) + '">' + esc(l.name) + '</option>').join('');
  if (leads.some(l => l.id === previous)) prompt.value = previous;
}
function openDialog(lead = null) {
  editingId = lead?.id || null;
  $('#dialog-title').textContent = lead ? 'Editar oportunidade' : 'Nova empresa';
  $('#form-error').textContent = '';
  const form = $('#lead-form');
  form.reset();
  [...form.elements].filter(el => el.name).forEach(el => { el.value = lead?.[el.name] ?? ''; });
  form.elements.stage.value = lead?.stage ?? 'pesquisar';
  form.elements.phase.value = lead?.phase ?? 'Não iniciado';
  form.elements.audit.value = lead?.audit ?? 'Não iniciada';
  $('#lead-dialog').showModal();
  form.elements.name.focus();
}
function closeDialog() { $('#lead-dialog').close(); }
function download(content, filename, type) {
  const url = URL.createObjectURL(new Blob([content], { type }));
  const a = document.createElement('a');
  a.href = url; a.download = filename; a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
function promptText(mode, selectedLead = null) {
  const lead = selectedLead || leads.find(l => l.id === $('#prompt-lead').value);
  const detail = lead
    ? 'Empresa: ' + lead.name + '\nSegmento: ' + (lead.segment || 'a pesquisar') +
      '\nCidade: ' + (lead.city || 'a pesquisar') + '\nSite confirmado: ' + (lead.website || 'não confirmado') +
      '\nInstagram: ' + (lead.instagram || 'não confirmado') + '\nRepositório: ' + (lead.github_url || 'a definir') +
      '\nPreview Vercel: ' + (lead.vercel_url || 'a definir') + '\nFonte da pesquisa: ' + (lead.source || 'não informada') + '\nVerificado em: ' + (lead.verified_on || 'data não informada') + '\nPróxima ação: ' + (lead.next_action || 'não definida') + '\nObservações/pendências: ' + (lead.notes || 'a investigar')
    : 'Empresa, segmento, cidade, serviços, contatos, fontes e repositório: preencher com informações verificadas.';
  const intro = 'Siga o processo descrito em https://github.com/BryanZefB/skills-bryan/blob/main/docs/landing-page-playbook.md; leia esse arquivo antes de continuar ou peça sua cópia se não houver acesso à web. Leia as instruções do projeto, BRIEF.md e DESIGN.md existentes. Não invente fatos, não alegue testes não executados.\n\n' + detail + '\n\n';
  const directions = {
    pesquisa: 'FASE PESQUISA: pesquise nome, serviços, cidade, Google Maps, Instagram e presença digital. Verifique se existe site próprio (ausência em busca não é confirmação). Liste fontes, datas e informações confirmadas, o que falta e oportunidades reais. Não invente dados nem faça contato.',
    brief: 'FASE BRIEF: use fontes verificadas para produzir BRIEF.md com fatos/histórico/fonte, público, oferta, objeções, objetivo do site, CTA com destino confirmado, assets autorizados e requisitos R01...Rn com como testar. Mostre lacunas; não implemente o site ainda.',
    direcao: 'MODO DIREÇÃO: com base no BRIEF.md, crie duas direções visuais realmente distintas para hero e uma seção, desktop e mobile, com hierarquia, imagens, composição e tipografia. Explique adequação, riscos e recomende uma escolha. Não crie a página completa antes da avaliação.',
    completo: 'MODO COMPLETO: leia BRIEF.md; apresente duas direções, escolha justificadamente se autorizado e registre em DESIGN.md; implemente a landing page mobile-first, CTA real, estados acessíveis e metadados. Execute testes reais e preencha AUDIT.md. Corrija falhas relevantes. Publique na Vercel apenas com autorização específica. Registre LESSONS.md e links.',
    auditoria: 'MODO AUDITORIA: compare pedido, BRIEF.md, DESIGN.md e página renderizada. Teste 320/375/414/768/1024/1440 px, links, CTA, foco, contraste, reduced-motion, build e console; faça screenshots reais, corrija falhas autorizadas, reteste e preencha Rxx → implementação → teste → evidência → status. Reporte PARCIAL/BLOQUEADO quando necessário.',
    publicacao: 'FASE PUBLICAÇÃO: revise o escopo e obtenha autorização específica antes do deploy. Configure preview na Vercel com Root Directory correto, garanta que os dados comerciais e segredos não sejam incluídos, publique na branch adequada e confirme o carregamento/CTA na URL real. Não anuncie deploy como feito sem evidência. Marque a demo como proposta independente, não site oficial.',
    abordagem: 'Mensagem pronta para adaptar (NÃO enviar automaticamente): Olá! Conheci o trabalho da ' + (lead?.name || '[empresa]') + ' e tive uma ideia de como apresentar os serviços de forma mais clara na internet. Preparei uma demonstração de página e queria saber se posso enviar a prévia, sem compromisso. Caso não seja prioridade, tudo bem!',
    acompanhamento: 'Mensagem pronta para adaptar (NÃO enviar automaticamente): Olá, pessoal da ' + (lead?.name || '[empresa]') + '! Passando apenas para saber se faz sentido conversar sobre a ideia de página que compartilhei. Se não for prioridade agora, sem problema. Obrigado!' 
  };
  return intro + directions[mode];
}


function showWorkflow() {
  const lead = leads.find(l => l.id === workflowId);
  if (!lead) return;
  const progress = workflowProgress(lead);
  $('#workflow-title').textContent = lead.name;
  $('#workflow-company').textContent = [lead.segment, lead.city].filter(Boolean).join(' · ') || 'Dados comerciais ainda incompletos';
  $('#workflow-count').textContent = progress.finished + ' de ' + progress.total + ' etapas concluídas';
  $('#workflow-progress-fill').style.width = (100 * progress.finished / progress.total) + '%';
  const warning = $('#workflow-warning');
  warning.hidden = lead.audit === 'Aprovada';
  warning.textContent = 'Auditoria ainda não aprovada no cadastro. Não trate a demonstração como validada nem envie como entrega final.';
  $('#workflow-steps').innerHTML = WORKFLOW.map((step, i) =>
    '<div class="workflow-step' + (lead.workflow?.[step.id] ? ' is-complete' : '') + '">' +
    '<div class="workflow-number">' + String(i+1).padStart(2,'0') + '</div>' +
    '<div><label><input type="checkbox" data-workflow-check="' + esc(step.id) + '"' + (lead.workflow?.[step.id] ? ' checked' : '') + '> <strong>' + esc(step.label) + '</strong></label>' +
    '<p>' + esc(step.desc) + '</p>' +
    (step.id === 'publicacao' ? '<small>Prévia: ' + (link(lead.vercel_url,'Abrir Vercel') || 'URL ainda não cadastrada') + '</small>' : '') +
    '</div><button class="button button-secondary step-copy" type="button" data-workflow-copy="' + esc(step.prompt) + '">Copiar</button></div>'
  ).join('');
}
function openWorkflow(id) {
  workflowId = id;
  if (!leads.some(l => l.id === id)) return;
  showWorkflow();
  $('#workflow-dialog').showModal();
}
async function copyPrompt(mode, lead = null) {
  try {
    await navigator.clipboard.writeText(promptText(mode, lead));
    notify(mode === 'abordagem' || mode === 'acompanhamento' ? 'Mensagem copiada; personalize antes de enviar.' : 'Prompt copiado. Confira o brief e as fontes.');
  } catch { notify('Falha ao copiar. Use HTTPS ou localhost e libere o acesso à área de transferência.'); }
}
$('#close-workflow').addEventListener('click', () => $('#workflow-dialog').close());
$('#workflow-done').addEventListener('click', () => $('#workflow-dialog').close());
$('#workflow-edit').addEventListener('click', () => {
  const lead = leads.find(l => l.id === workflowId);
  $('#workflow-dialog').close();
  if (lead) openDialog(lead);
});
$('#workflow-steps').addEventListener('change', event => {
  const control = event.target.closest('[data-workflow-check]');
  if (!control || !WORKFLOW.some(step => step.id === control.dataset.workflowCheck)) return;
  const previous = leads;
  leads = leads.map(l => l.id === workflowId ? {
    ...l, workflow: { ...l.workflow, [control.dataset.workflowCheck]: control.checked },
    updated_at: new Date().toISOString()
  } : l);
  if (!persist()) leads = previous;
  render();
  showWorkflow();
});
$('#workflow-steps').addEventListener('click', event => {
  const button = event.target.closest('[data-workflow-copy]');
  if (button) copyPrompt(button.dataset.workflowCopy, leads.find(l => l.id === workflowId));
});

$('#today').textContent = new Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' }).format(new Date());
$('#stage-filter').insertAdjacentHTML('beforeend', options(STAGES,''));
$('#form-stage').innerHTML = options(STAGES,'pesquisar');
$('#form-phase').innerHTML = options(PHASES,'Não iniciado');
$('#form-audit').innerHTML = options(AUDITS,'Não iniciada');
$('#add-lead').addEventListener('click', () => { if (!warning) openDialog(); else notify(warning); });
$('#close-dialog').addEventListener('click', closeDialog);
$('#cancel-dialog').addEventListener('click', closeDialog);
$('#search').addEventListener('input', render);
$('#stage-filter').addEventListener('change', render);
$('#lead-rows').addEventListener('click', event => {
  const edit = event.target.closest('[data-edit]');
  const del = event.target.closest('[data-delete]');
  const guide = event.target.closest('[data-workflow]');
  if (guide) openWorkflow(guide.dataset.workflow);
  if (edit) openDialog(leads.find(l => l.id === edit.dataset.edit));
  if (del && confirm('Excluir esta oportunidade deste navegador? Faça um backup se quiser preservá-la.')) {
    const updated = leads.filter(l => l.id !== del.dataset.delete);
    const previous = leads; leads = updated;
    if (!persist()) leads = previous;
    render();
  }
});
$('#lead-rows').addEventListener('change', event => {
  const input = event.target.closest('[data-stage-id]');
  if (!input) return;
  const previous = leads;
  leads = leads.map(l => l.id === input.dataset.stageId ? { ...l, stage: input.value, updated_at: new Date().toISOString() } : l);
  if (!persist()) leads = previous;
  render();
});
$('#lead-form').addEventListener('submit', event => {
  event.preventDefault();
  if (warning) return notify(warning);
  const form = event.currentTarget;
  if (!form.reportValidity()) return;
  const values = Object.fromEntries(new FormData(form));
  try {
    const old = leads.find(l => l.id === editingId);
    const data = normalizeLead({ ...old, ...values, id: editingId || idFactory(), created_at: old?.created_at }, idFactory);
    const original = leads;
    leads = editingId ? leads.map(l => l.id === editingId ? data : l) : [data, ...leads];
    if (!persist()) { leads = original; return; }
    render();
    closeDialog();
    notify('Oportunidade salva neste navegador.');
  } catch (error) { $('#form-error').textContent = error.message; }
});
$('#export-json').addEventListener('click', () => download(backup(leads), 'landing-studio-backup.json', 'application/json;charset=utf-8'));
$('#export-csv').addEventListener('click', () => download(exportCsv(leads), 'landing-studio-oportunidades.csv', 'text/csv;charset=utf-8'));
$('#import-trigger').addEventListener('click', () => $('#import-json').click());
$('#import-json').addEventListener('change', async event => {
  const file = event.target.files?.[0];
  if (!file) return;
  try {
    if (file.size > 3_000_000) throw Error('Arquivo muito grande (limite 3 MB).');
    const imported = restore(await file.text(), idFactory);
    if (!confirm('Substituir os registros locais pelos ' + imported.length + ' registros do backup? Exporte um backup antes de continuar.')) return;
    const original = leads; leads = imported;
    if (!persist()) { leads = original; return; }
    warning = '';
    render();
    notify('Backup restaurado. Registros: ' + leads.length);
  } catch (error) { notify('Erro na importação: ' + error.message); }
  finally { event.target.value = ''; }
});
document.querySelectorAll('[data-prompt]').forEach(button => button.addEventListener('click', () => copyPrompt(button.dataset.prompt)));
try { leads = read(); } catch { warning = 'Armazenamento local indisponível; verifique permissões ou use outro navegador.'; }
render();
if (warning) notify(warning);
