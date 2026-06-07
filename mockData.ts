/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Player, Arena, Match, MonthlyStat, SimulationLog, Duo } from './types';
import { initialArenas, initialPlayers, initialMonthlyStats, initialMatches, initialDuos } from './data/mockData';
import SchemaViewer from './components/SchemaViewer';
import StatsDashboard from './components/StatsDashboard';
import MatchSimulator from './components/MatchSimulator';
import PlayerDashboard from './components/PlayerDashboard';
import FlutterViewer from './components/FlutterViewer';
import { Flame, FileSpreadsheet, PlayCircle, Scale, User, BarChart3, HelpCircle, Smartphone, Trophy, Coins, X, MessageSquare, Video } from 'lucide-react';
import MonetizationHub from './components/MonetizationHub';
import ResenhaChat from './components/ResenhaChat';
import CoachIA from './components/CoachIA';

export default function App() {
  const [players, setPlayers] = useState<Player[]>(initialPlayers);
  const [arenas, setArenas] = useState<Arena[]>(initialArenas);
  const [duos, setDuos] = useState<Duo[]>(initialDuos);
  const [matches, setMatches] = useState<Match[]>(initialMatches);
  const [monthlyStats, setMonthlyStats] = useState<Record<string, MonthlyStat[]>>(initialMonthlyStats);
  
  // Simulated logged-in user session
  const [loggedPlayerId, setLoggedPlayerId] = useState<string>('usr_diego');
  const [logs, setLogs] = useState<SimulationLog[]>([]);

  // Modifying the Viewports inside our Single-screen layout as requested:
  // Default active tab is now 'perfil' (the individual athlete dashboard home view!)
  const [activeView, setActiveView] = useState<'perfil' | 'simulador' | 'rankings' | 'liga_fut' | 'blueprint' | 'flutter' | 'monetizacao' | 'resenha' | 'coach_ia'>('perfil');

  // Monetization and Subscription engine states
  const [monetizationPhase, setMonetizationPhase] = useState<'ads' | 'subscription'>('ads');
  const [isPremium, setIsPremium] = useState<boolean>(false);
  const [isSimulationActive, setIsSimulationActive] = useState<boolean>(true);
  const [showSimulatedAd, setShowSimulatedAd] = useState<boolean>(true);

  // Registration of new players NoSQL model simulation
  const handleRegisterPlayer = (name: string, arenaId: string, photoUrl: string) => {
    const newPlayerId = `usr_${Date.now().toString().substring(8)}`;
    
    const newPlayer: Player = {
      id: newPlayerId,
      name,
      photoUrl,
      arenaId,
      wins: 0,
      losses: 0,
      totalMatches: 0,
      winRate: 0.0,
      points: 0,
      createdAt: new Date().toISOString(),
      presenceDays: 0,
      presentDates: []
    };

    setPlayers(prev => [...prev, newPlayer]);
    setLoggedPlayerId(newPlayerId); // Fast auth login redirection

    // NoSQL creation simulator log
    const logVal: SimulationLog = {
      action: 'CREATE',
      path: `/players/${newPlayerId}`,
      payload: newPlayer,
      explanation: `Cadastrou o jogador [${name}] no Firestore. Inicializou o documento de rascunhos de atletas com pontos zerados e filiação imediata.`
    };
    setLogs([logVal]);
    setActiveView('perfil'); // Retain on profile tab
  };

  // Registration of new Arena NoSQL model simulation
  const handleCreateArena = (name: string, city: string, imageUrl: string) => {
    const newArenaId = `arena_${Date.now().toString().substring(10)}`;
    const newArena: Arena = {
      id: newArenaId,
      name,
      city,
      imageUrl: imageUrl || "https://images.unsplash.com/photo-1544698310-74ea9d1c8258?auto=format&fit=crop&q=80&w=400",
      createdAt: new Date().toISOString(),
      matchesPlayed: 0,
      totalPointsScored: 0,
      yearlyVictories: { "2026": 0 }
    };

    setArenas(prev => [...prev, newArena]);

    const logVal: SimulationLog = {
      action: 'CREATE',
      path: `/arenas/${newArenaId}`,
      payload: newArena,
      explanation: `A Arena [${name}] foi criada no Firestore. Inicializou o documento sob a coleção global '/arenas'.`
    };
    setLogs([logVal]);
  };

  // Promote player to admin in our simulation
  const handlePromotePlayerToAdmin = (playerId: string, arenaId: string) => {
    setPlayers(prev => prev.map(p => {
      if (p.id === playerId) {
        const managed = p.managedArenaIds || [];
        return {
          ...p,
          role: 'admin_arena' as const,
          managedArenaIds: managed.includes(arenaId) ? managed : [...managed, arenaId]
        };
      }
      return p;
    }));

    const targetPlayerName = players.find(p => p.id === playerId)?.name || 'Atleta';
    const targetArenaName = arenas.find(a => a.id === arenaId)?.name || 'Arena';

    const logVal: SimulationLog = {
      action: 'UPDATE',
      path: `/players/${playerId}`,
      payload: { role: 'admin_arena', added_arena: arenaId },
      explanation: `Regra NoSQL validada: Promoveu [${targetPlayerName}] ao papel 'admin_arena' para gerenciar a arena '[${targetArenaName}]' no banco de dados.`
    };
    setLogs([logVal]);
  };

  // Recording a raw created match from our form - Saved as PENDING by default
  const handleRecordMatch = (newMatch: Match, simulatedLogs: SimulationLog[]) => {
    // Append the newly recorded pending match to matches list
    setMatches(prev => [newMatch, ...prev]);

    // Set transactional logs showing the write operation
    setLogs(simulatedLogs);
  };

  // Anti-fraud double validation confirmation script (Simulating Flutter Cloud Run runTransaction)
  const handleValidateMatch = (matchId: string, playerId: string) => {
    const matchIndex = matches.findIndex(m => m.id === matchId);
    if (matchIndex === -1) return;

    const matchCandidate = { ...matches[matchIndex] };
    if (matchCandidate.validatedBy.includes(playerId)) return; // prevent duplicate clicks

    const updatedValidList = [...matchCandidate.validatedBy, playerId];
    matchCandidate.validatedBy = updatedValidList;

    // Check bilateral criteria
    const teamAHasValidated = matchCandidate.teamA.some(id => updatedValidList.includes(id));
    const teamBHasValidated = matchCandidate.teamB.some(id => updatedValidList.includes(id));

    const simulatedLogs: SimulationLog[] = [];
    const playerWhoClicked = players.find(p => p.id === playerId)?.name || 'Atleta';

    simulatedLogs.push({
      action: 'INFO',
      path: 'FIRESTORE_TRANSACTION_BEGIN',
      payload: null,
      explanation: `Iniciando runTransaction() no SDK Firebase requisitado por ${playerWhoClicked} para aceitar placar da partida /matches/${matchId}.`
    });

    if (teamAHasValidated && teamBHasValidated) {
      // Consensus achieved! Unlock rating points counters!
      matchCandidate.status = 'validated';

      simulatedLogs.push({
        action: 'UPDATE',
        path: `/matches/${matchId}`,
        payload: {
          validatedBy: updatedValidList,
          status: 'validated'
        },
        explanation: '✓ CONSENSO ALCANÇADO: Atletas de ambas as duplas homologaram o placar final! Liberando transação atômica multi-documentos no banco de dados.'
      });

      const teamAWon = matchCandidate.winnerTeam === 'A';
      const matchMonth = matchCandidate.month;
      const matchDate = matchCandidate.date;
      const matchYear = matchMonth.split('-')[0];

      // 1. Update overall counters for all 4 playing athletes in matches
      setPlayers(prevPlayers => {
        return prevPlayers.map(p => {
          const isParticipant = matchCandidate.playerIds.includes(p.id);
          if (!isParticipant) return p;

          const isTeamA = matchCandidate.teamA.includes(p.id);
          const isWinner = (isTeamA && teamAWon) || (!isTeamA && !teamAWon);

          const matchWin = isWinner ? 1 : 0;
          const matchLoss = isWinner ? 0 : 1;
          const ptsReward = isWinner ? 3 : 1;

          const nextWins = p.wins + matchWin;
          const nextLosses = p.losses + matchLoss;
          const nextTotal = p.totalMatches + 1;
          const nextWinRate = parseFloat((nextWins / nextTotal).toFixed(2));
          const nextPoints = p.points + ptsReward;

          const alreadyCheckedIn = p.presentDates?.includes(matchDate) || false;
          const nextDates = alreadyCheckedIn ? (p.presentDates || []) : [...(p.presentDates || []), matchDate];
          const nextPresenceDays = nextDates.length;

          simulatedLogs.push({
            action: 'UPDATE',
            path: `/players/${p.id}`,
            payload: {
              wins: nextWins,
              losses: nextLosses,
              points: nextPoints,
              presenceDays: nextPresenceDays,
              presentDates: nextDates
            },
            explanation: `Incrementou contadores de ${p.name}: +${ptsReward} Pts de campeonato, presença homologada hoje (${matchDate}).`
          });

          return {
            ...p,
            wins: nextWins,
            losses: nextLosses,
            totalMatches: nextTotal,
            winRate: nextWinRate,
            points: nextPoints,
            presenceDays: nextPresenceDays,
            presentDates: nextDates
          };
        });
      });

      // 2. Update Monthly Stats for participant players
      setMonthlyStats(prevMonthly => {
        const updated = { ...prevMonthly };
        matchCandidate.playerIds.forEach(pId => {
          const isTeamA = matchCandidate.teamA.includes(pId);
          const isWinner = (isTeamA && teamAWon) || (!isTeamA && !teamAWon);

          const matchWin = isWinner ? 1 : 0;
          const matchLoss = isWinner ? 0 : 1;
          const ptsReward = isWinner ? 3 : 1;

          const playerStats = updated[pId] ? [...updated[pId]] : [];
          const existingMonthObj = playerStats.find(s => s.month === matchMonth);

          if (existingMonthObj) {
            existingMonthObj.wins += matchWin;
            existingMonthObj.losses += matchLoss;
            existingMonthObj.points += ptsReward;
          } else {
            playerStats.push({
              month: matchMonth,
              wins: matchWin,
              losses: matchLoss,
              points: ptsReward
            });
          }

          updated[pId] = playerStats;
        });

        return updated;
      });

      // 3. Update Duos in state
      setDuos(prevDuos => {
        const duoIdA = [...matchCandidate.teamA].sort().join('_');
        const duoIdB = [...matchCandidate.teamB].sort().join('_');

        let hasA = false;
        let hasB = false;

        let nextDuos = prevDuos.map(d => {
          if (d.id === duoIdA) {
            hasA = true;
            const wins = d.wins + (teamAWon ? 1 : 0);
            const losses = d.losses + (teamAWon ? 0 : 1);
            const totalMatches = d.totalMatches + 1;
            const points = d.points + (teamAWon ? 3 : 1);
            const yearlyWins = { ...d.yearlyWins };
            yearlyWins[matchYear] = (yearlyWins[matchYear] || 0) + (teamAWon ? 1 : 0);

            simulatedLogs.push({
              action: 'UPDATE',
              path: `/duos/${duoIdA}`,
              payload: { wins, losses, totalMatches, winRate: wins / totalMatches, points },
              explanation: `Atualizou sinergia da Dupla A [${d.playerNames.join(' + ')}]: Aproveitamento: ${((wins/totalMatches)*100).toFixed(0)}%.`
            });

            return {
              ...d,
              wins,
              losses,
              totalMatches,
              winRate: wins / totalMatches,
              points,
              yearlyWins
            };
          }
          if (d.id === duoIdB) {
            hasB = true;
            const wins = d.wins + (!teamAWon ? 1 : 0);
            const losses = d.losses + (!teamAWon ? 0 : 1);
            const totalMatches = d.totalMatches + 1;
            const points = d.points + (!teamAWon ? 3 : 1);
            const yearlyWins = { ...d.yearlyWins };
            yearlyWins[matchYear] = (yearlyWins[matchYear] || 0) + (!teamAWon ? 1 : 0);

            simulatedLogs.push({
              action: 'UPDATE',
              path: `/duos/${duoIdB}`,
              payload: { wins, losses, totalMatches, winRate: wins / totalMatches, points },
              explanation: `Atualizou sinergia da Dupla B [${d.playerNames.join(' + ')}]: Aproveitamento: ${((wins/totalMatches)*100).toFixed(0)}%.`
            });

            return {
              ...d,
              wins,
              losses,
              totalMatches,
              winRate: wins / totalMatches,
              points,
              yearlyWins
            };
          }
          return d;
        });

        // Dynamic fallback creation for duos
        if (!hasA) {
          const sortedA = [...matchCandidate.teamA].sort();
          const p1 = players.find(p => p.id === sortedA[0]);
          const p2 = players.find(p => p.id === sortedA[1]);
          if (p1 && p2) {
            nextDuos.push({
              id: duoIdA,
              playerIds: sortedA,
              playerNames: [p1.name, p2.name],
              photoUrls: [p1.photoUrl, p2.photoUrl],
              wins: teamAWon ? 1 : 0,
              losses: teamAWon ? 0 : 1,
              totalMatches: 1,
              winRate: teamAWon ? 1.0 : 0.0,
              points: teamAWon ? 3 : 1,
              yearlyWins: { [matchYear]: teamAWon ? 1 : 0 }
            });
            
            simulatedLogs.push({
              action: 'CREATE',
              path: `/duos/${duoIdA}`,
              payload: { team: [p1.name, p2.name], wins: teamAWon ? 1 : 0 },
              explanation: `Registrou nova dupla /duos/${duoIdA} por identificação de primeiro jogo conjunto.`
            });
          }
        }

        if (!hasB) {
          const sortedB = [...matchCandidate.teamB].sort();
          const p1 = players.find(p => p.id === sortedB[0]);
          const p2 = players.find(p => p.id === sortedB[1]);
          if (p1 && p2) {
            nextDuos.push({
              id: duoIdB,
              playerIds: sortedB,
              playerNames: [p1.name, p2.name],
              photoUrls: [p1.photoUrl, p2.photoUrl],
              wins: !teamAWon ? 1 : 0,
              losses: !teamAWon ? 0 : 1,
              totalMatches: 1,
              winRate: !teamAWon ? 1.0 : 0.0,
              points: !teamAWon ? 3 : 1,
              yearlyWins: { [matchYear]: !teamAWon ? 1 : 0 }
            });
            
            simulatedLogs.push({
              action: 'CREATE',
              path: `/duos/${duoIdB}`,
              payload: { team: [p1.name, p2.name], wins: !teamAWon ? 1 : 0 },
              explanation: `Registrou nova dupla /duos/${duoIdB} por identificação de primeiro jogo conjunto.`
            });
          }
        }

        return nextDuos;
      });

      // 4. Update Sede Arena aggregates in state
      setArenas(prevArenas => {
        return prevArenas.map(a => {
          if (a.id === matchCandidate.arenaId) {
            const matchesPlayed = a.matchesPlayed + 1;
            const totalPointsScored = a.totalPointsScored + (matchCandidate.scoreA + matchCandidate.scoreB);
            const yearlyVictories = { ...a.yearlyVictories };
            yearlyVictories[matchYear] = (yearlyVictories[matchYear] || 0) + 1;

            simulatedLogs.push({
              action: 'UPDATE',
              path: `/arenas/${a.id}`,
              payload: { matchesPlayed, totalPointsScored },
              explanation: `Sincronizou dados de volume físico e pontos jogados na Arena sede [${a.name}].`
            });

            return {
              ...a,
              matchesPlayed,
              totalPointsScored,
              yearlyVictories
            };
          }
          return a;
        });
      });

      simulatedLogs.push({
        action: 'INFO',
        path: 'TRANSACTION_COMMIT_SUCCESS',
        payload: null,
        explanation: 'FIM DO COMMIT: Todos os 12 documentos de rankings foram sincronizados em conformidade com as regras de integridade do Circuito de Futevôlei.'
      });

    } else {
      // Bilateral validation from both sides not met yet
      simulatedLogs.push({
        action: 'UPDATE',
        path: `/matches/${matchId}`,
        payload: {
          validatedBy: updatedValidList,
          status: 'pending'
        },
        explanation: `Sua confirmação foi anexada com êxito em /matches/${matchId}. Pontuações continuam RETIDAS aguardando que ao menos um oponente homologue o placar.`
      });
    }

    setLogs(simulatedLogs);
    setMatches(prev => {
      const copy = [...prev];
      copy[matchIndex] = matchCandidate;
      return copy;
    });
  };

  const handleRejectMatch = (matchId: string, playerId: string) => {
    const matchIndex = matches.findIndex(m => m.id === matchId);
    if (matchIndex === -1) return;

    const matchCandidate = { ...matches[matchIndex] };
    matchCandidate.status = 'rejected';

    const playerRejecting = players.find(p => p.id === playerId)?.name || 'Atleta';
    const simulatedLogs: SimulationLog[] = [];

    simulatedLogs.push({
      action: 'INFO',
      path: 'SECURITY_ALARM_FRAUD',
      payload: null,
      explanation: `🚨 DISCREPÂNCIA DETECTADA! O atleta [${playerRejecting}] contestou e REJEITOU os dados inseridos para a partida.`
    });

    simulatedLogs.push({
      action: 'UPDATE',
      path: `/matches/${matchId}`,
      payload: {
        status: 'rejected'
      },
      explanation: `Mudança de estado do documento para 'rejected' (Sinalizado por fraude / Contestação). Nenhuma alteração foi executada no ranking global.`
    });

    setLogs(simulatedLogs);
    setMatches(prev => {
      const copy = [...prev];
      copy[matchIndex] = matchCandidate;
      return copy;
    });
  };

  const clearLogsByResetting = () => {
    setLogs([]);
    // Restore initial values
    setPlayers(initialPlayers);
    setArenas(initialArenas);
    setDuos(initialDuos);
    setMonthlyStats(initialMonthlyStats);
    setMatches(initialMatches);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans" id="applet-root">
      {/* Visual Header */}
      <header className="bg-white border-b border-slate-100 py-3.5 px-6 shadow-sm sticky top-0 z-10 shrink-0" id="applet-header">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-3">
          
          {/* Headline branding */}
          <div className="flex items-center gap-2.5">
            <span className="p-2 bg-indigo-50 text-indigo-600 rounded-xl">
              <Flame className="w-5 h-5 fill-indigo-600" />
            </span>
            <div>
              <h1 className="font-bold text-slate-900 tracking-tight text-sm sm:text-base leading-tight">
                Circuito Futevôlei Salvador — NoSQL Firestore
              </h1>
              <p className="text-[11px] text-slate-500 font-medium">
                Plataforma com validação bilateral de placar e controle integrado de fraudes
              </p>
            </div>
          </div>

          {/* Expanded Tab Controllers representing the athlete journey */}
          <div className="flex flex-wrap bg-slate-100 p-1 rounded-xl border border-slate-200/50 gap-0.5" id="view-toggle-container">
            <button
              id="tab-btn-perfil"
              onClick={() => setActiveView('perfil')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-bold rounded-lg transition-all cursor-pointer ${
                activeView === 'perfil' 
                  ? 'bg-white text-slate-900 shadow-sm' 
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <User className="w-3.5 h-3.5 text-indigo-500" />
              <span>Meu Perfil</span>
            </button>

            <button
              id="tab-btn-simulator"
              onClick={() => setActiveView('simulador')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-bold rounded-lg transition-all cursor-pointer ${
                activeView === 'simulador' 
                  ? 'bg-white text-slate-900 shadow-sm' 
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <PlayCircle className="w-3.5 h-3.5 text-rose-500" />
              <span>Lançar Partida</span>
            </button>

            <button
              id="tab-btn-rankings"
              onClick={() => setActiveView('rankings')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-bold rounded-lg transition-all cursor-pointer ${
                activeView === 'rankings' 
                  ? 'bg-white text-slate-900 shadow-sm' 
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <BarChart3 className="w-3.5 h-3.5 text-emerald-500" />
              <span>Rankings Gerais</span>
            </button>

            <button
              id="tab-btn-ligafut"
              onClick={() => setActiveView('liga_fut')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-bold rounded-lg transition-all cursor-pointer ${
                activeView === 'liga_fut' 
                  ? 'bg-white text-slate-900 shadow-sm' 
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <Trophy className="w-3.5 h-3.5 text-amber-500" />
              <span>Liga Fut</span>
            </button>

            <button
              id="tab-btn-blueprint"
              onClick={() => setActiveView('blueprint')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-bold rounded-lg transition-all cursor-pointer ${
                activeView === 'blueprint' 
                  ? 'bg-white text-slate-900 shadow-sm' 
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <FileSpreadsheet className="w-3.5 h-3.5 text-teal-500" />
              <span>Esquema NoSQL</span>
            </button>

            <button
              id="tab-btn-flutter"
              onClick={() => setActiveView('flutter')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-bold rounded-lg transition-all cursor-pointer ${
                activeView === 'flutter' 
                  ? 'bg-white text-slate-900 shadow-sm animate-pulse' 
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5 text-rose-500" />
              <span className="font-extrabold uppercase">Flutter Escuro</span>
            </button>

            <button
              id="tab-btn-resenha"
              onClick={() => setActiveView('resenha')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-bold rounded-lg transition-all cursor-pointer ${
                activeView === 'resenha' 
                  ? 'bg-white text-slate-900 shadow-sm' 
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <MessageSquare className="w-3.5 h-3.5 text-blue-500" />
              <span>Resenha / Chat</span>
            </button>

            <button
              id="tab-btn-coach-ia"
              onClick={() => setActiveView('coach_ia')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-bold rounded-lg transition-all cursor-pointer ${
                activeView === 'coach_ia' 
                  ? 'bg-white text-slate-900 shadow-sm' 
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <Video className="w-3.5 h-3.5 text-amber-500" />
              <span className="font-extrabold text-amber-600">Coach IA (Fase 3)</span>
            </button>

            <button
              id="tab-btn-monetizacao"
              onClick={() => setActiveView('monetizacao')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-black rounded-lg transition-all cursor-pointer ${
                activeView === 'monetizacao' 
                  ? 'bg-indigo-600 text-white shadow' 
                  : 'text-indigo-650 bg-indigo-50/50 hover:bg-indigo-50'
              }`}
            >
              <Coins className="w-3.5 h-3.5 text-indigo-500" />
              <span className="font-bold">Monetização</span>
            </button>
          </div>

        </div>
      </header>

      {/* Main Single-screen Content area */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6" id="applet-main">
        
        {/* VIEW 1: MY PROFILE DASHBOARD (DEFAULT ACTIVE LANDING VIEW) */}
        {activeView === 'perfil' && (
          <PlayerDashboard 
            players={players}
            arenas={arenas}
            duos={duos}
            matches={matches}
            loggedPlayerId={loggedPlayerId}
            setLoggedPlayerId={setLoggedPlayerId}
            onRegisterPlayer={handleRegisterPlayer}
            onValidateMatch={handleValidateMatch}
            onRejectMatch={handleRejectMatch}
            onCreateArena={handleCreateArena}
            onPromotePlayerToAdmin={handlePromotePlayerToAdmin}
          />
        )}

        {/* VIEW 2: LAUNCH NEW MATCH (SIMULATOR FOR CO-SIGNING CONES) */}
        {activeView === 'simulador' && (
          isSimulationActive && monetizationPhase === 'subscription' && !isPremium ? (
            <div className="max-w-3xl mx-auto bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 border border-amber-400/40 shadow-2xl relative overflow-hidden" id="subscription-paywall">
              <div className="absolute top-0 right-0 p-8 opacity-10 text-[120px] select-none font-black text-amber-400">
                ⭐
              </div>
              <div className="relative z-10 space-y-6">
                <div className="space-y-2">
                  <span className="px-3.5 py-1 bg-amber-500/15 border border-amber-500/30 text-amber-400 rounded-full text-[10px] uppercase font-black tracking-widest inline-flex items-center gap-1">
                    💎 Recurso VIP Bloqueado (Fase 2)
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight leading-tight">O lançamento de partidas competitivas exige assinatura VIP ativa</h3>
                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-2xl">
                    Para registrar e auditar pontuações agregadas de duplas e arenas de Salvador de maneira integrada e segura contra fraudes, sua conta precisa do plano de assinatura premium ou corporativa do <strong>Circuito Futevôlei VIP</strong>.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div className="bg-white/5 p-4 rounded-xl border border-white/10 space-y-1">
                    <span className="text-amber-400 font-extrabold block text-xs">Plano Atleta Mensal</span>
                    <strong className="text-lg block font-black text-slate-100">R$ 19,90 / mês</strong>
                    <span className="text-slate-400 text-[10px] block">Lançamento ilimitado de confrontos e auditorias</span>
                  </div>
                  <div className="bg-white/5 p-4 rounded-xl border border-white/10 space-y-1">
                    <span className="text-amber-400 font-extrabold block text-xs">Plano Sede / Arena</span>
                    <strong className="text-lg block font-black text-slate-100">R$ 99,90 / mês</strong>
                    <span className="text-slate-400 text-[10px] block font-light">A Arena ganha selo oficial, estrelas no painel e hospeda ranking</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-4 pt-4 border-t border-white/10">
                  <button
                    onClick={() => setIsPremium(true)}
                    className="w-full sm:w-auto px-6 py-3 bg-amber-500 hover:bg-amber-600 text-slate-950 font-black rounded-xl text-xs transition-all shadow-md cursor-pointer uppercase tracking-wider text-center"
                  >
                    Ativar Assinatura VIP (Simulado Stripe)
                  </button>
                  <p className="text-[10.5px] text-slate-400 font-light max-w-sm">
                    No aplicativo móvel, este botão inicia a SDK do Stripe enviando um token de sessão via Pix ou Cartão. Clique acima para simular a homologação em tempo real.
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start" id="sandbox-view">
              <div className="lg:col-span-5">
                <MatchSimulator 
                  players={players}
                  arenas={arenas}
                  logs={logs}
                  onRecordMatch={handleRecordMatch}
                  clearLogs={clearLogsByResetting}
                  loggedPlayerId={loggedPlayerId}
                />
              </div>

              <div className="lg:col-span-7 space-y-4">
                <div className="p-4 bg-indigo-50 border border-indigo-150 rounded-2xl flex items-start gap-3 text-xs text-indigo-900 leading-relaxed shadow-sm">
                  <HelpCircle className="w-5 h-5 text-indigo-600 mt-0.5 shrink-0" />
                  <div>
                    <h4 className="font-bold mb-0.5">Como simular a segurança anti-fraude:</h4>
                    <ol className="list-decimal list-inside space-y-1 mt-1 text-[11px]">
                      <li>Nesta aba <strong>"Lançar Partida"</strong>, selecione os atletas e o placar. Certifique-se de que o seu atleta ativo participa do jogo.</li>
                      <li>Clique em <strong>"Executar Escrita de Transação Firestore"</strong>. O sistema cria o documento como <em>"pendente"</em>.</li>
                      <li>Vá em <strong>"Meu Perfil"</strong> no topo direito e mude o atleta ativo para um dos oponentes.</li>
                      <li>O oponente receberá um aviso em destaque na sua caixa de homologação. Ao clicar em <strong>"Confirmar Placar"</strong>, a transação NoSQL dispara e unifica as pontuações automaticamente!</li>
                    </ol>
                  </div>
                </div>

                {/* Showcase list of matches sorted by newer date */}
                <div className="bg-white rounded-2xl border border-slate-100 p-5 space-y-3">
                  <h3 className="font-extrabold text-slate-900 text-xs uppercase tracking-wider">Histórico Recente de Confrontos no Banco NoSQL</h3>
                  <div className="space-y-2 max-h-96 overflow-y-auto">
                    {matches.map(m => {
                      let badgeStyles = 'bg-emerald-50 text-emerald-700 border-emerald-100';
                      let label = '✓ Validada';
                      
                      if (m.status === 'pending') {
                        badgeStyles = 'bg-amber-50 text-amber-700 border-amber-100 animate-pulse';
                        label = '⏰ Pendente';
                      } else if (m.status === 'rejected') {
                        badgeStyles = 'bg-rose-50 text-rose-700 border-rose-100';
                        label = '🚨 Contestado (Fraude)';
                      }

                      const nameA1 = players.find(p => p.id === m.teamA[0])?.name || '';
                      const nameA2 = players.find(p => p.id === m.teamA[1])?.name || '';
                      const nameB1 = players.find(p => p.id === m.teamB[0])?.name || '';
                      const nameB2 = players.find(p => p.id === m.teamB[1])?.name || '';

                      return (
                        <div key={m.id} className="p-3 bg-slate-50 border border-slate-150 rounded-xl text-xs flex justify-between items-center gap-4">
                          <div>
                            <div className="flex gap-2 items-center mb-1">
                              <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded border ${badgeStyles}`}>
                                {label}
                              </span>
                              <span className="text-[10px] text-slate-400 font-mono font-medium">{m.date} — {m.arenaName}</span>
                            </div>
                            <span className="font-semibold text-slate-800">
                              {nameA1} + {nameA2}
                              <span className="mx-2 text-slate-400 font-normal">vs</span>
                              {nameB1} + {nameB2}
                            </span>
                          </div>
                          <div className="font-mono font-black text-xs text-right bg-white px-2 py-1 rounded-lg border border-slate-200">
                            {m.scoreA} x {m.scoreB}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

              </div>
            </div>
          )
        )}

        {/* VIEW 3: GLOBAL TABLES & RANKINGS LEADERBOARDS */}
        {activeView === 'rankings' && (
          <StatsDashboard 
            players={players}
            arenas={arenas}
            duos={duos}
            monthlyStats={monthlyStats}
            selectedPlayerId={loggedPlayerId}
            setSelectedPlayerId={setLoggedPlayerId}
            matches={matches}
            viewMode="rankings"
          />
        )}

        {/* VIEW LIGA FUT: HISTORICO E COMPARADOR COM FILTRO DE ANO */}
        {activeView === 'liga_fut' && (
          <StatsDashboard 
            players={players}
            arenas={arenas}
            duos={duos}
            monthlyStats={monthlyStats}
            selectedPlayerId={loggedPlayerId}
            setSelectedPlayerId={setLoggedPlayerId}
            matches={matches}
            viewMode="liga_fut"
          />
        )}

        {/* VIEW 4: SECURITY FIRESTORE RULES SCHEMA DOCUMENTER */}
        {activeView === 'blueprint' && (
          <div className="space-y-6" id="blueprint-view">
            <div className="p-4 bg-teal-50 border border-teal-150 rounded-2xl flex items-start gap-3 text-xs text-teal-900 leading-relaxed shadow-sm">
              <Scale className="w-5 h-5 text-teal-600 mt-0.5 shrink-0" />
              <div>
                <strong>Segurança & Regras NoSQL de Produção:</strong> No futevôlei, dados agregados (vitórias, derrotas, pontos) de duplas e arenas precisam de validação server-side rígida para evitar fraudes ou abusos nos rankings de usuários. 
                Use o dicionário interativo e copie os modelos JSON e códigos Flutter/Dart prontos para economizar semanas de desenvolvimento.
              </div>
            </div>

            <SchemaViewer />
          </div>
        )}

        {/* VIEW 5: MOBILE FLUTTER COMPANION APP ARCHITECTURE */}
        {activeView === 'flutter' && (
          <FlutterViewer />
        )}

        {/* VIEW 6: MONETIZATION PLANNER & SANDBOX */}
        {activeView === 'monetizacao' && (
          <MonetizationHub 
            monetizationPhase={monetizationPhase}
            setMonetizationPhase={setMonetizationPhase}
            isPremium={isPremium}
            setIsPremium={setIsPremium}
            isSimulationActive={isSimulationActive}
            setIsSimulationActive={setIsSimulationActive}
          />
        )}

        {/* VIEW 7: RESENHA & CHAT ROOM */}
        {activeView === 'resenha' && (
          <ResenhaChat 
            players={players}
            loggedPlayerId={loggedPlayerId}
          />
        )}

        {/* VIEW 8: COACH IA BIOMECHANICS */}
        {activeView === 'coach_ia' && (
          <CoachIA 
            isPremium={isPremium}
            setIsPremium={setIsPremium}
          />
        )}

      </main>

      {/* Clean footer */}
      <footer className="bg-white border-t border-slate-100 py-3.5 px-6 shrink-0" id="applet-footer">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center text-[11px] text-slate-400 gap-2">
          <span>Estudo de Caso Arquitetural — Banco NoSQL Firestore para Futevôlei com Proteção Transacional de Pontuação</span>
          <div className="flex gap-4">
            <span>Diego Santos • diegospinersantos@gmail.com</span>
            <span>2026-06-04 UTC</span>
          </div>
        </div>
      </footer>

      {/* Floating Simulated AdMob Banner (Fase 1: Ads) */}
      {isSimulationActive && monetizationPhase === 'ads' && showSimulatedAd && (
        <div className="fixed bottom-3 left-1/2 -translate-x-1/2 z-40 w-full max-w-lg px-4 transition-all">
          <div className="bg-slate-900 border border-indigo-500 text-white rounded-xl p-3 shadow-2xl flex items-center justify-between gap-3 relative overflow-hidden">
            <button 
              onClick={() => setShowSimulatedAd(false)}
              className="absolute top-1 right-1 p-1 hover:bg-white/10 rounded-full text-slate-400 hover:text-white transition-all cursor-pointer z-20"
              title="Fechar anúncio de teste"
            >
              <X className="w-3 h-3" />
            </button>
            
            <div className="absolute top-0 left-0 bg-indigo-500 text-[7px] text-white font-mono px-1 py-0.5 rounded-br font-black uppercase tracking-wider">
              AdMob Simulador
            </div>
            
            <div className="flex items-center gap-2.5 pt-2">
              <span className="text-xl shrink-0" role="img" aria-label="ball">🏐</span>
              <div className="leading-tight">
                <span className="text-[8px] uppercase font-bold text-indigo-400 block tracking-widest">Patrocinador Licenciado</span>
                <strong className="text-slate-100 text-[10.5px] block font-black">Mikasa FT-5 com 15% OFF cupom 'LIGAFUT'</strong>
                <p className="text-[9.5px] text-slate-400">Jogue com a bola oficial aprovada pela associação de Salvador.</p>
              </div>
            </div>
            
            <a 
              href="https://aistudio.google" 
              target="_blank" 
              rel="noreferrer" 
              className="px-2.5 py-1.5 bg-indigo-500 hover:bg-indigo-650 text-[10px] font-black rounded-lg text-white transition-all whitespace-nowrap self-end uppercase text-center cursor-pointer shadow"
            >
              Comprar
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
