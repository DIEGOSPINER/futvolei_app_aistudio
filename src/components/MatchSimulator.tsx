/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Player, Arena, Match, SimulationLog } from '../types';
import { Play, RotateCcw, AlertCircle, Sparkles, Terminal, FileCode, Check } from 'lucide-react';

interface MatchSimulatorProps {
  players: Player[];
  arenas: Arena[];
  onRecordMatch: (match: Match, logs: SimulationLog[]) => void;
  logs: SimulationLog[];
  clearLogs: () => void;
  loggedPlayerId: string;
}

export default function MatchSimulator({
  players,
  arenas,
  onRecordMatch,
  logs,
  clearLogs,
  loggedPlayerId
}: MatchSimulatorProps) {
  const [arenaId, setArenaId] = useState<string>(arenas[0]?.id || '');
  const [playerA1, setPlayerA1] = useState<string>(players[0]?.id || '');
  const [playerA2, setPlayerA2] = useState<string>(players[1]?.id || '');
  const [playerB1, setPlayerB1] = useState<string>(players[2]?.id || '');
  const [playerB2, setPlayerB2] = useState<string>(players[3]?.id || '');

  const [scoreA, setScoreA] = useState<number>(18);
  const [scoreB, setScoreB] = useState<number>(14);
  const [matchDate, setMatchDate] = useState<string>('2026-06-04');

  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<boolean>(false);

  // Validate selections to prevent duplicate players in the same match
  const handleSimulate = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(false);

    const selectedIds = [playerA1, playerA2, playerB1, playerB2];
    const uniqueIds = new Set(selectedIds);

    if (uniqueIds.size < 4) {
      setErrorMsg('Erro de validação: Um jogador não pode disputar a partida em duas posições simultâneas! Selecione 4 atletas diferentes.');
      return;
    }

    if (scoreA === scoreB) {
      setErrorMsg('Erro de validação: No futevôlei não há empate! Ajuste o placar com uma dupla vencedora.');
      return;
    }

    if (!/^\d{4}-\d{2}-\d{2}$/.test(matchDate)) {
      setErrorMsg('Erro de validação: A data deve estar no formato AAAA-MM-DD (Ex: 2026-06-04).');
      return;
    }

    const selectedArena = arenas.find(a => a.id === arenaId)!;
    const winnerTeam = scoreA > scoreB ? 'A' : 'B';
    const matchId = `match_${Date.now().toString().substring(5)}`;
    const matchMonth = matchDate.substring(0, 7);

    // Assert that the currently logged-in player is in either Team A or Team B
    if (!selectedIds.includes(loggedPlayerId)) {
      const activeName = players.find(p => p.id === loggedPlayerId)?.name || 'Atleta Autenticado';
      setErrorMsg(`Erro de Prevenção: Como atleta autenticado atual (${activeName}), você deve figurar em uma das duas duplas para poder arbitrar e registrar esta partida.`);
      return;
    }

    const newMatch: Match = {
      id: matchId,
      date: matchDate,
      arenaId,
      arenaName: selectedArena.name,
      teamA: [playerA1, playerA2],
      teamB: [playerB1, playerB2],
      scoreA,
      scoreB,
      winnerTeam,
      month: matchMonth,
      playerIds: selectedIds,
      status: 'pending',
      createdBy: loggedPlayerId,
      validatedBy: [loggedPlayerId] // Self-validation by creation
    };

    // Calculate simulated logs to show precisely what is happening inside Firestore under this anti-fraud model
    const simulatedLogs: SimulationLog[] = [];

    simulatedLogs.push({
      action: 'INFO',
      path: 'SECURITY_CHECK_INIT',
      payload: null,
      explanation: 'Inicializando Verificação de Identidade e Gravação no Firestore.'
    });

    // 1. Write the Match Document in pending state
    simulatedLogs.push({
      action: 'CREATE',
      path: `/matches/${matchId}`,
      payload: {
        date: newMatch.date,
        arenaId: newMatch.arenaId,
        arenaName: newMatch.arenaName,
        teamA: newMatch.teamA,
        teamB: newMatch.teamB,
        scoreA: newMatch.scoreA,
        scoreB: newMatch.scoreB,
        winnerTeam: newMatch.winnerTeam,
        month: newMatch.month,
        playerIds: newMatch.playerIds,
        status: newMatch.status,
        createdBy: newMatch.createdBy,
        validatedBy: newMatch.validatedBy
      },
      explanation: `Escreveu partida /matches/${matchId} com STATUS 'pending' (Pendente).`
    });

    // Explain that scores are LOCKED
    const creatorName = players.find(p => p.id === loggedPlayerId)?.name || 'Diego Santos';
    const opponentTeam = newMatch.teamA.includes(loggedPlayerId) ? 'Dupla B' : 'Dupla A';
    
    simulatedLogs.push({
      action: 'INFO',
      path: 'RATING_TRANSACTION_LOCK',
      payload: null,
      explanation: `🔒 SEGURANÇA: Bloqueio Ativo. A partida foi assinada apenas por ${creatorName} (time autor). Para evitar fraudes nos rankings locais, a transação NoSQL de acúmulo de pontos foi retida. A partida aguarda validação de ao menos um atleta da equipe adversária (${opponentTeam}).`
    });

    onRecordMatch(newMatch, simulatedLogs);
    setSuccessMsg(true);
    setTimeout(() => setSuccessMsg(false), 4000);
  };

  // Helper to filter options to avoid choosing duplicates
  const getAvailablePlayersFor = (currentSelection: string, excludeList: string[]) => {
    return players.filter(p => !excludeList.includes(p.id) || p.id === currentSelection);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden flex flex-col h-full" id="simulator-card">
      <div className="bg-slate-50 border-b border-slate-100 p-4 flex items-center justify-between" id="simulator-header">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-indigo-500" />
          <h3 className="font-semibold text-slate-800 text-base">Registrador de Partida & Simulador NoSQL</h3>
        </div>
        <button
          onClick={clearLogs}
          id="btn-clear-logs"
          className="text-xs flex items-center gap-1 text-slate-500 hover:text-slate-800 transition font-medium"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Resetar Logs</span>
        </button>
      </div>

      <div className="p-5 flex-1 overflow-y-auto space-y-4 max-h-[640px]" id="simulator-scroller">
        <form onSubmit={handleSimulate} className="space-y-4 text-xs">
          
          {/* Row 1: Arena and Month */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3" id="arena-month-row">
            <div>
              <label className="block text-slate-600 font-semibold mb-1 uppercase tracking-wider">Local da Arena</label>
              <select
                id="select-arena"
                value={arenaId}
                onChange={(e) => setArenaId(e.target.value)}
                className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 font-medium"
              >
                {arenas.map(a => (
                  <option key={a.id} value={a.id}>{a.name} ({a.city.split('-')[0]})</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-slate-600 font-semibold mb-1 uppercase tracking-wider">Data da Partida (Check-in)</label>
              <input
                id="input-date"
                type="date"
                value={matchDate}
                onChange={(e) => setMatchDate(e.target.value)}
                className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 font-mono font-semibold"
              />
            </div>
          </div>

          {/* DUPLA A SQUAD (Duo A) */}
          <div className="p-3 bg-indigo-50/20 border border-indigo-100/50 rounded-xl space-y-2" id="duo-a-squad">
            <span className="text-[10px] font-bold text-indigo-700 uppercase tracking-widest block">🛡️ Dupla A (Team A)</span>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-500 mb-1">Jogador 1</label>
                <select
                  id="select-pA1"
                  value={playerA1}
                  onChange={(e) => setPlayerA1(e.target.value)}
                  className="w-full p-1.5 bg-white border border-slate-200 rounded-lg text-slate-800 font-medium"
                >
                  {getAvailablePlayersFor(playerA1, [playerA2, playerB1, playerB2]).map(p => (
                    <option key={p.id} value={p.id}>{p.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-slate-500 mb-1">Jogador 2</label>
                <select
                  id="select-pA2"
                  value={playerA2}
                  onChange={(e) => setPlayerA2(e.target.value)}
                  className="w-full p-1.5 bg-white border border-slate-200 rounded-lg text-slate-800 font-medium"
                >
                  {getAvailablePlayersFor(playerA2, [playerA1, playerB1, playerB2]).map(p => (
                    <option key={p.id} value={p.id}>{p.name}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* DUPLA B SQUAD (Duo B) */}
          <div className="p-3 bg-amber-50/20 border border-amber-100/50 rounded-xl space-y-2" id="duo-b-squad">
            <span className="text-[10px] font-bold text-amber-700 uppercase tracking-widest block">🎯 Dupla B (Team B)</span>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-500 mb-1">Jogador 1</label>
                <select
                  id="select-pB1"
                  value={playerB1}
                  onChange={(e) => setPlayerB1(e.target.value)}
                  className="w-full p-1.5 bg-white border border-slate-200 rounded-lg text-slate-800 font-medium"
                >
                  {getAvailablePlayersFor(playerB1, [playerA1, playerA2, playerB2]).map(p => (
                    <option key={p.id} value={p.id}>{p.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-slate-500 mb-1">Jogador 2</label>
                <select
                  id="select-pB2"
                  value={playerB2}
                  onChange={(e) => setPlayerB2(e.target.value)}
                  className="w-full p-1.5 bg-white border border-slate-200 rounded-lg text-slate-800 font-medium"
                >
                  {getAvailablePlayersFor(playerB2, [playerA1, playerA2, playerB1]).map(p => (
                    <option key={p.id} value={p.id}>{p.name}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* PLACAR INPUT (Score) */}
          <div className="p-3 bg-slate-50 rounded-xl space-y-2 border border-slate-100" id="match-scores-row">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block">📊 Placar do Confronto</span>
            <div className="flex items-center gap-4 justify-center">
              <div className="flex items-center gap-1.5">
                <span className="font-semibold text-slate-700">Dupla A:</span>
                <input
                  id="input-scoreA"
                  type="number"
                  min="0"
                  max="30"
                  value={scoreA}
                  onChange={(e) => setScoreA(parseInt(e.target.value) || 0)}
                  className="w-12 p-1 bg-white border border-slate-200 rounded text-center text-slate-800 font-bold text-xs focus:ring-1 focus:ring-indigo-500"
                />
              </div>
              <span className="font-bold text-slate-400">X</span>
              <div className="flex items-center gap-1.5">
                <input
                  id="input-scoreB"
                  type="number"
                  min="0"
                  max="30"
                  value={scoreB}
                  onChange={(e) => setScoreB(parseInt(e.target.value) || 0)}
                  className="w-12 p-1 bg-white border border-slate-200 rounded text-center text-slate-800 font-bold text-xs focus:ring-1 focus:ring-indigo-500"
                />
                <span className="font-semibold text-slate-700">Dupla B:</span>
              </div>
            </div>
          </div>

          {/* Validation & feedback alerts */}
          {errorMsg && (
            <div className="p-3 bg-rose-50 text-rose-700 rounded-xl flex items-start gap-1.5 border border-rose-100 leading-normal" id="validation-error">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{errorMsg}</span>
            </div>
          )}

          {successMsg && (
            <div className="p-3 bg-emerald-50 text-emerald-700 rounded-xl flex items-center gap-1.5 border border-emerald-100 font-semibold" id="validation-success">
              <Check className="w-4 h-4" />
              <span>Partida Simulada com Sucesso! Veja a escrita de documentos abaixo.</span>
            </div>
          )}

          {/* Action button */}
          <button
            type="submit"
            id="btn-trigger-simulator"
            className="w-full bg-slate-800 hover:bg-slate-900 text-white font-semibold py-2.5 px-4 rounded-xl shadow-md cursor-pointer transition flex items-center justify-center gap-1.5 text-xs text-center"
          >
            <Play className="w-3.5 h-3.5 fill-white" />
            <span>Executar Escrita de Transação Firestore</span>
          </button>
        </form>

        {/* Live transactional terminal console log */}
        <div className="space-y-1.5 mt-2" id="transaction-logs-view">
          <div className="flex items-center gap-1 text-xs font-semibold text-slate-700">
            <Terminal className="w-4 h-4 text-emerald-500" />
            <span>Console Transacional do Firebase Firestore</span>
          </div>

          <div className="bg-slate-950 text-emerald-400 p-3 rounded-xl font-mono text-[10px] space-y-2 min-h-[160px] max-h-[220px] overflow-y-auto shadow-inner border border-slate-800">
            {logs.length === 0 ? (
              <p className="text-slate-500 italic text-center pt-8">
                Preencha as duplas acima e aperte "Executar Escrita..." para ver a transação NoSQL simular em tempo real os SET, UPDATE e MERGE executados.
              </p>
            ) : (
              <div className="space-y-1.5">
                {logs.map((log, index) => {
                  let badgeColor = 'text-sky-400 bg-sky-950 border border-sky-900';
                  if (log.action === 'CREATE') badgeColor = 'text-emerald-400 bg-emerald-950 border border-emerald-900';
                  if (log.action === 'UPDATE') badgeColor = 'text-amber-400 bg-amber-950 border border-amber-900';
                  if (log.path === 'TRANSACTION' || log.path === 'TRANSACTION_COMMIT') badgeColor = 'text-pink-400 bg-pink-950 border border-pink-900';
                  
                  return (
                    <div key={index} className="pb-1.5 border-b border-slate-900/40 last:border-0">
                      <div className="flex flex-wrap items-center gap-1.5 mb-1">
                        <span className={`px-1 rounded text-[8px] font-bold ${badgeColor}`}>
                          {log.action}
                        </span>
                        <span className="text-slate-200 font-bold break-all">{log.path}</span>
                      </div>
                      <p className="text-slate-400 text-[9px] mb-1">{log.explanation}</p>
                      {log.payload && (
                        <div className="bg-slate-900/50 p-1.5 rounded border border-slate-900 text-slate-300 overflow-x-auto whitespace-pre-wrap max-h-24">
                          {JSON.stringify(log.payload, null, 2)}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
