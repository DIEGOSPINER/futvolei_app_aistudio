/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { firestoreSchema, queriesExplanation, CollectionSchema } from '../data/firestoreSchema';
import { Database, Copy, Check, Info, Server, CodeSquare, Code, HelpCircle } from 'lucide-react';

export default function SchemaViewer() {
  const [selectedColIndex, setSelectedColIndex] = useState(1); // Default to Players
  const [copied, setCopied] = useState<string | null>(null);
  const [showCodeTab, setShowCodeTab] = useState<'explanation' | 'dart'>('explanation');

  const selectedCol = firestoreSchema[selectedColIndex];

  // Helper to construct a representative JSON template
  const generateJSONSample = (schema: CollectionSchema): string => {
    const obj: Record<string, any> = {};
    schema.fields.forEach(f => {
      obj[f.name] = f.example;
    });

    if (schema.subcollections && schema.subcollections.length > 0) {
      const sub = schema.subcollections[0];
      const subObj: Record<string, any> = {};
      sub.fields.forEach(sf => {
        subObj[sf.name] = sf.example;
      });
      // Nested description of how subcollection path functions
      obj[`// SUBCOLEÇÃO: ${sub.path}`] = [subObj];
    }

    return JSON.stringify(obj, null, 2);
  };

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden flex flex-col h-full" id="schema-viewer-container">
      {/* Tab bar header */}
      <div className="bg-slate-50 border-b border-slate-100 p-4" id="schema-header">
        <div className="flex items-center gap-2 mb-3">
          <Database className="w-5 h-5 text-emerald-500" />
          <h3 className="font-semibold text-slate-800 text-lg">Modelagem do Banco Firestore NoSQL</h3>
        </div>
        
        {/* Collection Selector Buttons */}
        <div className="flex flex-wrap gap-2 text-sm">
          {firestoreSchema.map((col, index) => (
            <button
              key={col.path}
              id={`btn-col-${index}`}
              onClick={() => setSelectedColIndex(index)}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                selectedColIndex === index
                  ? 'bg-slate-800 text-white shadow-sm'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              {col.path.split('/')[1]} {/* Just collection name (arenas, players, duos, matches) */}
            </button>
          ))}
        </div>
      </div>

      {/* Main Body */}
      <div className="p-5 flex-1 flex flex-col overflow-y-auto max-h-[700px] space-y-5" id="schema-body">
        {/* Metadata info of collection */}
        <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 space-y-2">
          <div className="flex items-start gap-2">
            <Server className="w-4 h-4 text-slate-500 mt-0.5 shrink-0" />
            <div>
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">Caminho da Coleção</span>
              <code className="text-sm font-semibold text-emerald-600 font-mono break-all">{selectedCol.path}</code>
            </div>
          </div>
          <p className="text-slate-600 text-sm">{selectedCol.description}</p>
          <div className="pt-2 border-t border-dashed border-slate-200 mt-2">
            <span className="text-xs font-semibold text-indigo-600 uppercase tracking-wider block mb-0.5">Por Que Modelar Assim? (Performance e Custos)</span>
            <p className="text-slate-600 text-xs leading-relaxed italic">{selectedCol.whyThisWay}</p>
          </div>
        </div>

        {/* Tab options for JSON Schema vs Table */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Fields dictionary Table */}
          <div className="lg:col-span-7 space-y-3">
            <h4 className="text-sm font-semibold text-slate-800 flex items-center gap-1.5">
              <Info className="w-4 h-4 text-sky-500" />
              Dicionário de Atributos & Tipos NoSQL
            </h4>
            <div className="border border-slate-100 rounded-xl overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-600">
                <thead className="bg-slate-50 text-slate-700 uppercase font-semibold text-[10px] tracking-wider border-b border-slate-100">
                  <tr>
                    <th className="p-3">Campo</th>
                    <th className="p-3">Tipo</th>
                    <th className="p-3">O que guarda</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {selectedCol.fields.map(f => (
                    <tr key={f.name} className="hover:bg-slate-50/50">
                      <td className="p-3 font-mono font-bold text-slate-800 select-all">{f.name}</td>
                      <td className="p-3 text-slate-500 font-medium">
                        <span className="px-1.5 py-0.5 bg-slate-100 rounded text-[10px] text-slate-600 font-mono">{f.type}</span>
                      </td>
                      <td className="p-3 text-slate-600 leading-normal">{f.description}</td>
                    </tr>
                  ))}
                  {/* Append monthly subcollection visual mock if player is selected */}
                  {selectedCol.subcollections && selectedCol.subcollections.length > 0 && (
                    <tr className="bg-indigo-50/30">
                      <td colSpan={3} className="p-3 text-indigo-800 font-bold">
                        <div className="flex items-center gap-1 border-t border-dashed border-indigo-100 pt-2 pb-1 text-xs">
                          <code className="text-indigo-600 font-mono text-[10px]">/players/{'{playerId}'}/monthlyStats/{'{yearMonth}'}</code>
                          <span>(Subcoleção do Jogador)</span>
                        </div>
                        <p className="text-[11px] text-indigo-600 font-normal leading-relaxed">
                          Subcoleção para guardar dados agregados históricos mensais de vitórias, derrotas e pontos do atleta. Essencial para a curva de evolução rápida sem explodir custos de leitura.
                        </p>
                        <div className="mt-2 space-y-1.5 font-normal text-[11px]">
                          {selectedCol.subcollections[0].fields.map(sf => (
                            <div key={sf.name} className="flex justify-between items-center text-slate-600 font-mono pb-1 border-b border-indigo-50/50">
                              <span><strong className="text-slate-800">{sf.name}</strong> <i>({sf.type})</i></span>
                              <span className="text-[10px] text-right max-w-xs">{sf.description}</span>
                            </div>
                          ))}
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Code display: JSON sample output */}
          <div className="lg:col-span-5 flex flex-col space-y-2">
            <div className="flex justify-between items-center">
              <h4 className="text-sm font-semibold text-slate-800 flex items-center gap-1.5">
                <Code className="w-4 h-4 text-emerald-500" />
                Estrutura JSON do Documento
              </h4>
              <button
                id={`btn-copy-json-${selectedColIndex}`}
                onClick={() => handleCopy(generateJSONSample(selectedCol), `json-${selectedColIndex}`)}
                className="flex items-center gap-1 text-xs text-indigo-600 hover:text-indigo-800 transition font-medium px-2 py-1 hover:bg-indigo-50 rounded"
              >
                {copied === `json-${selectedColIndex}` ? (
                  <>
                    <Check className="w-3 h-3 text-emerald-500" />
                    <span>Copiado!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" />
                    <span>Copiar JSON</span>
                  </>
                )}
              </button>
            </div>
            <div className="relative bg-slate-900 rounded-xl p-4 font-mono text-[11px] text-indigo-100 overflow-x-auto min-h-[300px] shadow-inner border border-slate-800">
              <pre className="whitespace-pre-wrap leading-relaxed select-all">
                {generateJSONSample(selectedCol)}
              </pre>
            </div>
          </div>
        </div>

        {/* Pro explanations tabs in footer */}
        <div className="pt-4 border-t border-slate-100 space-y-3" id="queries-and-dart-section">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <div className="flex items-center gap-1.5 text-slate-800 font-semibold text-sm">
              <CodeSquare className="w-4 h-4 text-pink-500" />
              <span>Como Calcular Requisitos no Flutter / Dart</span>
            </div>
            <div className="flex gap-1">
              <button
                onClick={() => setShowCodeTab('explanation')}
                className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all ${
                  showCodeTab === 'explanation' ? 'bg-slate-800 text-white' : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100'
                }`}
              >
                Estratégia NoSQL
              </button>
              <button
                onClick={() => setShowCodeTab('dart')}
                className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all ${
                  showCodeTab === 'dart' ? 'bg-slate-800 text-white' : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100'
                }`}
              >
                Código Flutter (Dart)
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" id="query-columns-updated">
            {/* Loop through queriesExplanation */}
            {Object.entries(queriesExplanation).map(([key, queryVal]: [string, any]) => (
              <div key={key} className="p-4 bg-slate-50 border border-slate-100 rounded-xl space-y-2 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">
                      {key === 'ranking' ? 'REQUISITO 1' : 
                       key === 'aproveitamento' ? 'REQUISITO 2' : 
                       key === 'evolucao' ? 'REQUISITO 3' : 
                       key === 'rankingDuplas' ? 'REQUISITO 4 (DUPLAS / TORNEIO)' : 
                       key === 'compilacaoArena' ? 'REQUISITO 5 (ARENA DO ANO)' : 'MÉTODO'}
                    </span>
                    {queryVal.formula && (
                      <span className="px-1.5 py-0.5 bg-sky-50 text-sky-700 font-mono text-[9px] font-bold rounded">
                        Fórmula Ativa
                      </span>
                    )}
                  </div>
                  <h5 className="font-bold text-slate-800 text-xs">{queryVal.title}</h5>
                  
                  {showCodeTab === 'explanation' || !queryVal.dartCode ? (
                    <div className="space-y-2 mt-1.5">
                      <p className="text-[11px] text-slate-600 leading-relaxed">
                        {queryVal.explanation}
                      </p>
                      {queryVal.formula && (
                        <div className="p-1.5 bg-slate-100 text-slate-700 rounded font-mono text-[9px] text-center font-semibold">
                          {queryVal.formula}
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="relative bg-slate-900 rounded-lg p-2.5 font-mono text-[9px] text-slate-200 mt-2 overflow-x-auto max-h-48 shadow-inner">
                      <pre className="whitespace-pre shrink-0">{queryVal.dartCode}</pre>
                    </div>
                  )}
                </div>

                {queryVal.dartCode && (
                  <div className="pt-2">
                    <button
                      onClick={() => handleCopy(queryVal.dartCode, `copy-code-${key}`)}
                      className="w-full text-center text-[10px] text-indigo-600 hover:text-indigo-800 font-semibold py-1 bg-white hover:bg-slate-100 border border-slate-200 rounded-lg transition"
                    >
                      {copied === `copy-code-${key}` ? '✔ Código Copiado!' : '📋 Copiar Código'}
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Full Transaction helper detail */}
          <div className="p-4 bg-indigo-50/50 rounded-xl border border-indigo-100/50 space-y-2 mt-3 flex flex-col md:flex-row justify-between gap-4">
            <div className="space-y-1">
              <span className="inline-block bg-indigo-100 text-indigo-800 px-2.5 py-0.5 rounded text-[9px] font-bold tracking-wider uppercase">
                Padrão de Consistência Atômica do Futevôlei
              </span>
              <h4 className="font-bold text-indigo-900 text-xs">Atualizando Jogadores, Mês e Duplas Simultaneamente</h4>
              <p className="text-[11px] text-indigo-700 leading-relaxed max-w-4xl">
                Tanto as estatísticas anuais das arenas quanto o aproveitamento das duplas de exemplo e pontos de ranking precisam cooperar de forma atômica. Se qualquer um dos caminhos falhar, o Firebase cancelará tudo para impedir corrupção das tabelas de liderança.
              </p>
            </div>
            <button
              onClick={() => handleCopy(queriesExplanation.transacao.dartCode, "main-txn")}
              className="md:self-center self-start whitespace-nowrap flex items-center gap-1.5 text-xs text-white bg-indigo-600 hover:bg-indigo-700 font-semibold px-4 py-2 rounded-xl transition shadow-sm cursor-pointer"
            >
              {copied === "main-txn" ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Código Copiado!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copiar Transação Completa Dart</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
