import test from 'node:test';
import assert from 'node:assert/strict';
import { STAGES, normalizeLead, summarize, filterLeads, backup, restore, safeUrl, exportCsv } from '../core.mjs';
const make = data => normalizeLead({ id: 'a1', name: 'Exemplo', ...data });
test('valida nome e normaliza fase inválida', () => {
  assert.throws(() => normalizeLead({ id:'x', name:' ' }), /nome/);
  assert.equal(make({ stage:'qualquer', audit:'desconhecida' }).stage, 'pesquisar');
  assert.equal(make({ audit:'desconhecida' }).audit, 'Não iniciada');
});
test('permite apenas URLs http/https', () => {
  assert.equal(safeUrl('javascript:alert(1)'), '');
  assert.equal(safeUrl('https://example.com/path'), 'https://example.com/path');
});
test('o funil distingue receita fechada de orçamentos', () => {
  const leads = [make({ id:'a', stage:'fechado', closed_value:1000, proposed_value:2000 }), make({ id:'b', stage:'negociacao', proposed_value:9000 }), make({ id:'c', stage:'pronto' })];
  assert.deepEqual(summarize(leads), { total:3, ready:1, contacted:2, answered:2, won:1, revenue:1000 });
  assert.equal(STAGES.length, 9);
});
test('filtro encontra cidade e etapa comercial', () => {
  const leads = [make({ id:'x', city:'Torres', stage:'pronto' }), make({ id:'y', city:'Itajaí', stage:'contatado' })];
  assert.equal(filterLeads(leads,'torres','pronto').length, 1);
  assert.equal(filterLeads(leads,'torres','contatado').length, 0);
});
test('backup importa registros e rejeita versões e IDs duplicados', () => {
  const a = make({ id:'a' });
  assert.equal(restore(backup([a])).length, 1);
  assert.throws(() => restore('{"version":2,"leads":[]}'), /não suportado/);
  assert.throws(() => restore(JSON.stringify({ version:1, leads:[a,a] })), /duplicados/);
  assert.throws(() => restore('texto inválido'), /JSON inválido/);
});
test('CSV neutraliza fórmula de planilha e preserva nome', () => {
  const csv = exportCsv([make({ name:'=IMPORTXML("a","b")' })]);
  assert.match(csv, /'=IMPORTXML/);
  assert.match(csv, /"name";"segment"/);
});
