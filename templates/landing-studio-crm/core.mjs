// Pure domain logic: no browser APIs, credentials or persistence.
export const STAGES = [
  { id: 'pesquisar', label: 'Pesquisar' },
  { id: 'qualificado', label: 'Qualificado' },
  { id: 'producao', label: 'Em produção' },
  { id: 'pronto', label: 'Pronto para contato' },
  { id: 'contatado', label: 'Contatado' },
  { id: 'respondeu', label: 'Respondeu' },
  { id: 'negociacao', label: 'Negociação' },
  { id: 'fechado', label: 'Fechado' },
  { id: 'perdido', label: 'Perdido' }
];
export const PHASES = ['Não iniciado', 'Pesquisa', 'Direção', 'Implementação', 'Auditoria', 'Publicado'];
export const AUDITS = ['Não iniciada', 'Parcial', 'Aprovada'];
const text = (value, length = 500) => String(value ?? '').trim().slice(0, length);
const money = value => {
  const n = Number(value);
  return Number.isFinite(n) && n >= 0 ? Math.round(n * 100) / 100 : 0;
};
const date = value => /^\d{4}-\d{2}-\d{2}$/.test(text(value)) && !Number.isNaN(Date.parse(text(value) + 'T12:00:00Z')) ? text(value) : '';
export function safeUrl(value) {
  try {
    const url = new URL(text(value, 2048));
    return ['https:', 'http:'].includes(url.protocol) ? url.toString() : '';
  } catch { return ''; }
}
export function normalizeLead(raw, createId = () => '') {
  if (!raw || typeof raw !== 'object' || Array.isArray(raw)) throw Error('Registro inválido.');
  const name = text(raw.name, 120);
  if (!name) throw Error('Informe o nome da empresa.');
  const id = /^[a-zA-Z0-9_-]{1,80}$/.test(text(raw.id)) ? text(raw.id) : createId();
  if (!id) throw Error('Identificador inválido.');
  return {
    id,
    name,
    segment: text(raw.segment, 100),
    city: text(raw.city, 100),
    website: safeUrl(raw.website),
    instagram: safeUrl(raw.instagram),
    public_contact: text(raw.public_contact, 150),
    vercel_url: safeUrl(raw.vercel_url),
    github_url: safeUrl(raw.github_url),
    stage: STAGES.some(s => s.id === raw.stage) ? raw.stage : 'pesquisar',
    phase: PHASES.includes(raw.phase) ? raw.phase : 'Não iniciado',
    audit: AUDITS.includes(raw.audit) ? raw.audit : 'Não iniciada',
    proposed_value: money(raw.proposed_value),
    closed_value: money(raw.closed_value),
    last_contact: date(raw.last_contact),
    next_date: date(raw.next_date),
    notes: text(raw.notes, 4000),
    created_at: text(raw.created_at, 35) || new Date().toISOString(),
    updated_at: new Date().toISOString()
  };
}
export function summarize(leads) {
  return {
    total: leads.length,
    ready: leads.filter(l => l.stage === 'pronto').length,
    contacted: leads.filter(l => ['contatado','respondeu','negociacao','fechado'].includes(l.stage)).length,
    answered: leads.filter(l => ['respondeu','negociacao','fechado'].includes(l.stage)).length,
    won: leads.filter(l => l.stage === 'fechado').length,
    revenue: leads.filter(l => l.stage === 'fechado').reduce((sum,l) => sum + money(l.closed_value), 0)
  };
}
export function filterLeads(leads, term = '', stage = '') {
  const query = text(term).toLocaleLowerCase('pt-BR');
  return leads.filter(l => (!stage || l.stage === stage) &&
    [l.name, l.segment, l.city, l.notes].some(v => String(v || '').toLocaleLowerCase('pt-BR').includes(query)))
    .sort((a,b) => (b.updated_at || '').localeCompare(a.updated_at || ''));
}
export function backup(leads) {
  return JSON.stringify({ version: 1, exported_at: new Date().toISOString(), leads }, null, 2);
}
export function restore(textValue, createId = () => '') {
  let parsed;
  try { parsed = JSON.parse(textValue); } catch { throw Error('Arquivo JSON inválido.'); }
  if (!parsed || parsed.version !== 1 || !Array.isArray(parsed.leads) || parsed.leads.length > 2000)
    throw Error('Formato de backup não suportado ou limite de registros excedido.');
  const values = parsed.leads.map(raw => normalizeLead(raw, createId));
  if (new Set(values.map(l => l.id)).size !== values.length) throw Error('O backup contém IDs duplicados.');
  return values;
}
const csvCell = value => {
  let s = String(value ?? '');
  if (/^[\s]*[=+@-]/.test(s)) s = "'" + s; // prevent formula execution in spreadsheets
  return '"' + s.replaceAll('"','""') + '"';
};
export function exportCsv(leads) {
  const fields = ['name','segment','city','stage','phase','audit','website','instagram','public_contact','vercel_url','github_url','proposed_value','closed_value','last_contact','next_date','notes'];
  return '\uFEFF' + [fields.map(csvCell).join(';'), ...leads.map(l => fields.map(f => csvCell(l[f])).join(';'))].join('\r\n');
}
