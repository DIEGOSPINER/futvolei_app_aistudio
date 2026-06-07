/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Player, Arena, MonthlyStat, Duo, Match } from '../types';
import { 
  Award, 
  TrendingUp, 
  Trophy, 
  MapPin, 
  Calendar, 
  Users, 
  Flame, 
  Sparkles, 
  Building, 
  CheckCircle, 
  ShieldAlert,
  ArrowUpDown,
  Clock,
  UserCheck,
  BarChart3
} from 'lucide-react';

interface StatsDashboardProps {
  players: Player[];
  arenas: Arena[];
  duos: Duo[];
  monthlyStats: Record<string, MonthlyStat[]>;
  selectedPlayerId: string;
  setSelectedPlayerId: (id: string) => void;
  matches?: Match[];
  viewMode?: 'rankings' | 'liga_fut';
}

interface DataPoint {
  label: string;
  wins: number;
  winRate: number;
}

interface EvolutionStatsCardProps {
  title: string;
  subtitle: string;
  dailyData: DataPoint[];
  monthlyData: DataPoint[];
  yearlyData: DataPoint[];
  accentColor: 'blue' | 'indigo' | 'emerald';
}

function EvolutionStatsCard({
  title,
  subtitle,
  dailyData = [],
  monthlyData = [],
  yearlyData = [],
  accentColor = 'blue'
}: EvolutionStatsCardProps) {
  const [timeframe, setTimeframe] = useState<'daily' | 'monthly' | 'yearly'>('monthly');
  const [chartType, setChartType] = useState<'line' | 'bar'>('line');

  const data = {
    daily: dailyData,
    monthly: monthlyData,
    yearly: yearlyData
  }[timeframe];

  const themeConfig = {
    blue: {
      btnActive: 'bg-blue-600 text-white',
      btnInactive: 'text-slate-500 hover:bg-slate-100',
      pillsActive: 'bg-blue-50 text-blue-700 border-blue-200',
      bar1: '#2563eb',
      bar2: '#10b981',
      line1: '#2563eb',
      line2: '#10b981',
      text: 'text-blue-900',
      border: 'border-blue-100',
      bg: 'bg-blue-50/20'
    },
    indigo: {
      btnActive: 'bg-indigo-600 text-white',
      btnInactive: 'text-slate-500 hover:bg-slate-100',
      pillsActive: 'bg-indigo-50 text-indigo-700 border-indigo-200',
      bar1: '#4f46e5',
      bar2: '#f59e0b',
      line1: '#4f46e5',
      line2: '#f59e0b',
      text: 'text-indigo-900',
      border: 'border-indigo-100',
      bg: 'bg-indigo-50/20'
    },
    emerald: {
      btnActive: 'bg-emerald-600 text-white',
      btnInactive: 'text-slate-500 hover:bg-slate-100',
      pillsActive: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      bar1: '#059669',
      bar2: '#0ea5e9',
      line1: '#059669',
      line2: '#0ea5e9',
      text: 'text-emerald-900',
      border: 'border-emerald-100',
      bg: 'bg-emerald-50/20'
    }
  }[accentColor];

  if (!data || data.length === 0) {
    return (
      <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm text-center py-8 text-xs text-slate-400 italic">
        Sem dados históricos disponíveis para este período.
      </div>
    );
  }

  const width = 450;
  const height = 155;
  const padX = 45;
  const padY = 22;

  const maxWins = Math.max(...data.map(d => d.wins), 2);
  const xCoords = data.map((_, i) => padX + (i / Math.max(data.length - 1, 1)) * (width - padX * 2));
  const winsY = data.map(d => height - padY - (d.wins / maxWins) * (height - padY * 2));
  const winRateY = data.map(d => height - padY - (d.winRate / 100) * (height - padY * 2));

  let lineD1 = '';
  let lineD2 = '';
  if (data.length > 0) {
    if (data.length === 1) {
      lineD1 = `M ${padX} ${winsY[0]} L ${width - padX} ${winsY[0]}`;
      lineD2 = `M ${padX} ${winRateY[0]} L ${width - padX} ${winRateY[0]}`;
    } else {
      lineD1 = `M ${xCoords[0]} ${winsY[0]} ` + xCoords.slice(1).map((x, idx) => `L ${x} ${winsY[idx + 1]}`).join(' ');
      lineD2 = `M ${xCoords[0]} ${winRateY[0]} ` + xCoords.slice(1).map((x, idx) => `L ${x} ${winRateY[idx + 1]}`).join(' ');
    }
  }

  const groupWidth = (width - padX * 2) / Math.max(data.length, 1);
  const barW = Math.max(groupWidth * 0.32, 4);

  return (
    <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-3.5 flex flex-col justify-between" id="evolution-stats-card-widget">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-slate-100 pb-2.5">
        <div>
          <h4 className="font-extrabold text-slate-800 text-xs uppercase tracking-wider block">{title}</h4>
          <span className="text-[10px] text-slate-500 leading-tight block">{subtitle}</span>
        </div>

        <div className="flex bg-slate-100 p-0.5 rounded-lg border border-slate-200/40 shrink-0 self-end sm:self-auto">
          <button
            onClick={() => setChartType('line')}
            className={`px-2 py-1 text-[9.5px] font-bold rounded-md transition-all cursor-pointer ${chartType === 'line' ? themeConfig.btnActive : 'text-slate-500 hover:text-slate-800'}`}
          >
            Linha
          </button>
          <button
            onClick={() => setChartType('bar')}
            className={`px-2 py-1 text-[9.5px] font-bold rounded-md transition-all cursor-pointer ${chartType === 'bar' ? themeConfig.btnActive : 'text-slate-500 hover:text-slate-800'}`}
          >
            Barras
          </button>
        </div>
      </div>

      <div className="flex justify-between items-center bg-slate-50 border border-slate-200/60 p-1 rounded-xl">
        <span className="text-[9.5px] font-bold text-slate-400 pl-1.5 uppercase tracking-wider hidden sm:inline">Período:</span>
        <div className="flex gap-1 w-full sm:w-auto">
          {(['daily', 'monthly', 'yearly'] as const).map((mode) => {
            const label = { daily: 'Diário', monthly: 'Mensal', yearly: 'Anual' }[mode];
            const isActive = timeframe === mode;
            return (
              <button
                key={mode}
                onClick={() => setTimeframe(mode)}
                className={`flex-1 sm:flex-initial px-2.5 py-1 text-[9.5px] font-bold rounded-lg transition-all border cursor-pointer ${
                  isActive 
                    ? `${themeConfig.pillsActive} font-extrabold border-slate-200 shadow-sm` 
                    : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-100'
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="relative bg-slate-50/50 rounded-xl p-2.5 border border-slate-100 overflow-hidden select-none">
        {chartType === 'line' ? (
          <svg className="w-full h-auto aspect-[450/155]" viewBox={`0 0 ${width} ${height}`}>
            <line x1={padX} y1={padY} x2={width - padX} y2={padY} stroke="#f1f5f9" strokeWidth="1" />
            <line x1={padX} y1={(padY + height - padY) /2} x2={width - padX} y2={(padY + height - padY) /2} stroke="#f1f5f9" strokeWidth="1" strokeDasharray="3" />
            <line x1={padX} y1={height - padY} x2={width - padX} y2={height - padY} stroke="#e2e8f0" strokeWidth="1.2" />

            <path d={lineD1} fill="none" stroke={themeConfig.line1} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d={lineD2} fill="none" stroke={themeConfig.line2} strokeWidth="1.8" strokeDasharray="4 2" strokeLinecap="round" strokeLinejoin="round" />

            {data.map((pt, i) => {
              const xVal = xCoords[i];
              const yW = winsY[i];
              const yWR = winRateY[i];
              return (
                <g key={i}>
                  <circle cx={xVal} cy={yW} r="4" fill="#ffffff" stroke={themeConfig.line1} strokeWidth="2" className="cursor-pointer hover:r-5 transition-all" />
                  <text x={xVal} y={yW - 8} textAnchor="middle" className="text-[8.5px] font-extrabold fill-slate-700 font-mono">
                    {pt.wins}V
                  </text>

                  <circle cx={xVal} cy={yWR} r="3" fill="#ffffff" stroke={themeConfig.line2} strokeWidth="1.5" />
                  <text x={xVal} y={yWR + 11} textAnchor="middle" className="text-[8px] font-bold fill-indigo-650 font-mono">
                    {pt.winRate}%
                  </text>

                  <text x={xVal} y={height - 5} textAnchor="middle" className="text-[8px] fill-slate-400 font-bold font-mono">
                    {pt.label}
                  </text>
                </g>
              );
            })}
          </svg>
        ) : (
          <svg className="w-full h-auto aspect-[450/155]" viewBox={`0 0 ${width} ${height}`}>
            <line x1={padX} y1={padY} x2={width - padX} y2={padY} stroke="#f1f5f9" strokeWidth="1" />
            <line x1={padX} y1={(padY + height - padY) /2} x2={width - padX} y2={(padY + height - padY) /2} stroke="#f1f5f9" strokeWidth="1" strokeDasharray="3" />
            <line x1={padX} y1={height - padY} x2={width - padX} y2={height - padY} stroke="#e2e8f0" strokeWidth="1.2" />

            {data.map((pt, i) => {
              const groupX = padX + i * groupWidth;
              const barX1 = groupX + groupWidth * 0.15;
              const barX2 = groupX + groupWidth * 0.52;

              const barH1 = (pt.wins / maxWins) * (height - padY * 2);
              const barH2 = (pt.winRate / 100) * (height - padY * 2);

              const barY1 = height - padY - barH1;
              const barY2 = height - padY - barH2;

              return (
                <g key={i}>
                  <rect
                    x={barX1}
                    y={barY1}
                    width={barW}
                    height={Math.max(barH1, 2)}
                    rx="1.5"
                    fill={themeConfig.bar1}
                    opacity="0.95"
                    className="cursor-pointer hover:opacity-100 transition-all"
                  />
                  <text x={barX1 + barW / 2} y={barY1 - 5} textAnchor="middle" className="text-[8px] font-bold fill-slate-700 font-mono">
                    {pt.wins}
                  </text>

                  <rect
                    x={barX2}
                    y={barY2}
                    width={barW}
                    height={Math.max(barH2, 2)}
                    rx="1.5"
                    fill={themeConfig.bar2}
                    opacity="0.95"
                    className="cursor-pointer hover:opacity-100 transition-all"
                  />
                  <text x={barX2 + barW / 2} y={barY2 - 5} textAnchor="middle" className="text-[7.5px] font-bold fill-slate-700 font-mono">
                    {pt.winRate}%
                  </text>

                  <text x={groupX + groupWidth / 2} y={height - 5} textAnchor="middle" className="text-[8px] fill-slate-400 font-bold font-mono">
                    {pt.label}
                  </text>
                </g>
              );
            })}
          </svg>
        )}
      </div>

      <div className="flex justify-center items-center gap-4 text-[9px] font-bold border-t border-slate-100 pt-2 text-slate-500">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded shrink-0" style={{ backgroundColor: themeConfig.bar1 }}></span>
          <span>Vitórias (Nº)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded shrink-0" style={{ backgroundColor: themeConfig.bar2 }}></span>
          <span>Aproveitamento (%)</span>
        </div>
      </div>
    </div>
  );
}

// Championship Stars and Title configuration (completamente integrado com a estética de fardamento do Brasileirão)
const getStarsInfo = (id: string, type: 'individual' | 'duo' | 'arena') => {
  let count = 0;
  let label = '';
  if (type === 'individual') {
    if (id === 'usr_sofia') { count = 3; label = 'Tricampeã (Individual 24, Dupla 24, Dupla 26)'; }
    else if (id === 'usr_diego') { count = 2; label = 'Bicampeão (Individual 25, Dupla 25)'; }
    else if (id === 'usr_bruna') { count = 2; label = 'Bicampeã (Dupla 24, Dupla 26)'; }
    else if (id === 'usr_gaucho') { count = 1; label = 'Campeão (Individual 2026)'; }
    else if (id === 'usr_lucas') { count = 1; label = 'Campeão em Duplas (Dupla 2025)'; }
  } else if (type === 'duo') {
    if (id === 'usr_bruna_usr_sofia') { count = 2; label = 'Dupla Bicampeã (2024, 2026)'; }
    else if (id === 'usr_diego_usr_lucas') { count = 1; label = 'Dupla Campeã (2025)'; }
  } else if (type === 'arena') {
    if (id === 'arena_marisol') { count = 1; label = 'Sede Campeã (2024)'; }
    else if (id === 'arena_pantano') { count = 2; label = 'Sede Bicampeã (2025, 2027)'; }
    else if (id === 'arena_bpchoque') { count = 1; label = 'Sede Campeã (2026)'; }
  }
  return { count, label };
};

const renderStars = (id: string, type: 'individual' | 'duo' | 'arena') => {
  const { count, label } = getStarsInfo(id, type);
  if (count === 0) return null;
  return (
    <div 
      className="inline-flex items-center gap-0.5 px-1 py-0.5 bg-amber-50 border border-amber-200/50 rounded text-amber-600 cursor-help shrink-0 shadow-sm" 
      title={label}
    >
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} className="w-2.5 h-2.5 fill-amber-500 stroke-amber-600 animate-pulse" viewBox="0 0 24 24">
          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" strokeWidth="0.5"/>
        </svg>
      ))}
      <span className="text-[7.5px] font-black font-mono leading-none text-amber-700 shrink-0 select-none">{count}★</span>
    </div>
  );
};

export default function StatsDashboard({
  players,
  arenas,
  duos,
  monthlyStats,
  selectedPlayerId,
  setSelectedPlayerId,
  matches = [],
  viewMode = 'rankings'
}: StatsDashboardProps) {
  // Navigation Tabs: Frequency control screen, Duos results, Arenas results, Tourney History/Compare
  const [activeTab, setActiveTab] = useState<'athletes_frequency' | 'duos_results' | 'arenas_results' | 'history_championships'>(
    viewMode === 'liga_fut' ? 'history_championships' : 'athletes_frequency'
  );

  // Sync state if viewMode changes
  useEffect(() => {
    setActiveTab(viewMode === 'liga_fut' ? 'history_championships' : 'athletes_frequency');
  }, [viewMode]);

  // Year selector for Liga Fut classification
  const [selectedYear, setSelectedYear] = useState<string>('2026');

  const getYearlyClassification = (year: string) => {
    if (year === '2024') {
      return {
        players: [
          { name: "Sofia 'Shark'", wins: 10, losses: 2, winRate: 0.83, points: 32, stars: 1, isChamp: true, note: "Penta Campeã de Set" },
          { name: "Bruna 'Defesa'", wins: 8, losses: 4, winRate: 0.67, points: 28, stars: 0, isChamp: false, note: "Muralha de Salvador" },
          { name: "Diego Santos", wins: 7, losses: 5, winRate: 0.58, points: 26, stars: 0, isChamp: false, note: "Líder Técnico" },
          { name: "Lucas 'Lob'", wins: 6, losses: 6, winRate: 0.50, points: 24, stars: 0, isChamp: false, note: "Especialista Lob" }
        ],
        duos: [
          { name: "Bruna & Sofia", wins: 9, losses: 1, winRate: 0.90, points: 28, stars: 1, isChamp: true, note: "Parceria Única" },
          { name: "Diego & Lucas", wins: 7, losses: 3, winRate: 0.70, points: 24, stars: 0, isChamp: false, note: "Ataque Total" },
          { name: "Gabriel & Pedro", wins: 5, losses: 5, winRate: 0.50, points: 18, stars: 0, isChamp: false, note: "Consistentes" }
        ],
        arenas: [
          { name: "Arena Marisol", matches: 12, points: 240, winRate: 0.80, stars: 1, isChamp: true, note: "Sede de Abertura" },
          { name: "Arena Pântano", matches: 9, points: 190, winRate: 0.65, stars: 0, isChamp: false, note: "Sempre Lotada" },
          { name: "Arena BPCHOQUE", matches: 7, points: 150, winRate: 0.55, stars: 0, isChamp: false, note: "Linha de Defesa" }
        ]
      };
    } else if (year === '2025') {
      return {
        players: [
          { name: "Diego Santos", wins: 9, losses: 3, winRate: 0.75, points: 30, stars: 1, isChamp: true, note: "MVP da Temporada" },
          { name: "Sofia 'Shark'", wins: 8, losses: 4, winRate: 0.67, points: 28, stars: 0, isChamp: false, note: "Ataque Shark" },
          { name: "Lucas 'Lob'", wins: 8, losses: 4, winRate: 0.67, points: 28, stars: 0, isChamp: false, note: "Destaque Coletivo" },
          { name: "Mateus Pepa", wins: 6, losses: 6, winRate: 0.50, points: 24, stars: 0, isChamp: false, note: "Melhor Defensor" }
        ],
        duos: [
          { name: "Diego & Lucas", wins: 8, losses: 2, winRate: 0.80, points: 26, stars: 1, isChamp: true, note: "Campeões do Circuito" },
          { name: "Bruna & Sofia", wins: 7, losses: 3, winRate: 0.70, points: 24, stars: 0, isChamp: false, note: "Quase Duas Vezes" },
          { name: "Fofo & Gato", wins: 5, losses: 5, winRate: 0.50, points: 20, stars: 0, isChamp: false, note: "Sucesso de Bilheteria" }
        ],
        arenas: [
          { name: "Arena Pântano", matches: 14, points: 280, winRate: 0.75, stars: 1, isChamp: true, note: "Estrutura Campeã" },
          { name: "Arena Marisol", matches: 10, points: 220, winRate: 0.60, stars: 0, isChamp: false, note: "Areia Macia" },
          { name: "Arena BPCHOQUE", matches: 8, points: 180, winRate: 0.50, stars: 0, isChamp: false, note: "Segurança Máxima" }
        ]
      };
    } else if (year === '2027') {
      return {
        players: [
          { name: "Mateus Pepa", wins: 12, losses: 1, winRate: 0.92, points: 37, stars: 1, isChamp: true, note: "Nova Estrela Solitária" },
          { name: "Gaúcho", wins: 10, losses: 3, winRate: 0.77, points: 33, stars: 0, isChamp: false, note: "Ataque Violento" },
          { name: "Sofia 'Shark'", wins: 9, losses: 4, winRate: 0.69, points: 31, stars: 0, isChamp: false, note: "Ainda na Elite" }
        ],
        duos: [
          { name: "Fofo & Lucas", wins: 12, losses: 1, winRate: 0.92, points: 37, stars: 1, isChamp: true, note: "Sinergia de Ouro" },
          { name: "Bruna & Sofia", wins: 11, losses: 2, winRate: 0.85, points: 35, stars: 0, isChamp: false, note: "Dupla de Aço" },
          { name: "Diego & Pedro", wins: 8, losses: 5, winRate: 0.62, points: 29, stars: 0, isChamp: false, note: "Parceria Estável" }
        ],
        arenas: [
          { name: "Arena Pântano", matches: 16, points: 350, winRate: 0.85, stars: 1, isChamp: true, note: "Maior Sede de Salvador" },
          { name: "Arena BPCHOQUE", matches: 11, points: 240, winRate: 0.65, stars: 0, isChamp: false, note: "Torcidas Unidas" },
          { name: "Arena Marisol", matches: 10, points: 220, winRate: 0.60, stars: 0, isChamp: false, note: "Vista para o Mar" }
        ]
      };
    } else {
      // 2026 (Live / Real-time calculation!)
      const sortedPls = [...players].sort((a, b) => b.points - a.points);
      const sortedDs = [...duos].sort((a, b) => b.points - a.points);
      const sortedArs = [...arenas].sort((a, b) => b.totalPointsScored - a.totalPointsScored);

      return {
        players: sortedPls.map((p, idx) => ({
          name: p.name,
          wins: p.wins,
          losses: p.losses,
          winRate: p.winRate,
          points: p.points,
          stars: p.id === 'usr_gaucho' ? 1 : 0,
          isChamp: idx === 0,
          note: idx === 0 ? "🏆 Líder do Ano" : "Desafiante Ativo"
        })),
        duos: sortedDs.map((d, idx) => ({
          name: `${d.playerNames[0].split(' ')[0]} & ${d.playerNames[1].split(' ')[0]}`,
          wins: d.wins,
          losses: d.losses,
          winRate: d.winRate,
          points: d.points,
          stars: d.id === 'usr_bruna_usr_sofia' ? 2 : 0,
          isChamp: idx === 0,
          note: idx === 0 ? "👥 Parceria Líder" : "Sinergia Ativa"
        })),
        arenas: sortedArs.map((a, idx) => {
          const gamesCount = a.matchesPlayed;
          return {
            name: a.name,
            matches: gamesCount,
            points: a.totalPointsScored,
            winRate: gamesCount > 0 ? 0.70 : 0.0,
            stars: a.id === 'arena_bpchoque' ? 1 : a.id === 'arena_pantano' ? 2 : 0,
            isChamp: idx === 0,
            note: idx === 0 ? "🏟️ Sede de Ouro" : "Sede Homologada"
          };
        })
      };
    }
  };

  // Sort toggle for athletes tab: sort by 'frequency' (presenceDays) or 'points' (ranking points)
  const [athleteSortBy, setAthleteSortBy] = useState<'frequency' | 'points'>('frequency');

  // Local state for partnership testing (Sinergômetro)
  const [partnerTestPid, setPartnerTestPid] = useState<string>(selectedPlayerId || players[0]?.id || '');

  // Selector states for dynamic interactive Duo and Arena closed/temporal charts
  const sortedDuos = [...duos].sort((a, b) => b.points - a.points);
  const sortedArenas = [...arenas].sort((a, b) => {
    const vA = a.yearlyVictories['2026'] || 0;
    const vB = b.yearlyVictories['2026'] || 0;
    return vB - vA;
  });

  const [selectedDuoId, setSelectedDuoId] = useState<string>(sortedDuos[0]?.id || 'usr_diego_usr_lucas');
  const [selectedArenaId, setSelectedArenaId] = useState<string>(sortedArenas[0]?.id || 'arena_pantano');

  const selectedPlayer = players.find(p => p.id === selectedPlayerId) || players[0];

  // Comparison module state variables
  const [compCategory, setCompCategory] = useState<'individual' | 'duo' | 'arena'>('individual');
  const [compItemA, setCompItemA] = useState<string>('');
  const [compItemB, setCompItemB] = useState<string>('');
  const [compTimeframe, setCompTimeframe] = useState<'yearly' | 'monthly' | 'daily'>('monthly');
  const [compMetric, setCompMetric] = useState<'wins' | 'win_rate' | 'points'>('wins');
  const [compVisualType, setCompVisualType] = useState<'bar' | 'line'>('bar');

  const compItems = compCategory === 'individual'
    ? players.map(p => ({ id: p.id, name: p.name }))
    : compCategory === 'duo'
    ? duos.map(d => ({ id: d.id, name: `${d.playerNames[0].split(' ')[0]} & ${d.playerNames[1].split(' ')[0]}` }))
    : arenas.map(a => ({ id: a.id, name: a.name }));

  const currentItemA = compItems.find(item => item.id === compItemA) || compItems[0];
  const currentItemB = compItems.find(item => item.id === compItemB && item.id !== currentItemA?.id) 
    || compItems.find(item => item.id !== currentItemA?.id) 
    || compItems[1] 
    || compItems[0];

  const activeCompItemAId = currentItemA?.id || '';
  const activeCompItemBId = currentItemB?.id || '';

  const activeMetric = compMetric;

  const categoryMetrics = [
    { id: 'wins', label: 'Vitórias' },
    { id: 'win_rate', label: 'Aproveitamento (%)' },
    { id: 'points', label: 'Pontuação de Ranking' }
  ];

  const getMetricLabel = () => {
    if (activeMetric === 'wins') return 'Vitórias';
    if (activeMetric === 'win_rate') return 'Aproveitamento (%)';
    return 'Pontos de Ranking';
  };

  const getEntityMetricForPeriod = (
    id: string, 
    category: 'individual' | 'duo' | 'arena', 
    periodLabel: string, 
    periodType: 'daily' | 'monthly' | 'yearly', 
    metric: 'wins' | 'win_rate' | 'points'
  ): number => {
    if (!id) return 0;
    
    if (periodType === 'yearly') {
      const yearMatches = (matches || []).filter(m => m.status === 'validated' && m.date.startsWith(periodLabel));
      if (category === 'individual') {
        const won = yearMatches.filter(m => {
          const isTeamA = m.teamA.includes(id);
          const isTeamB = m.teamB.includes(id);
          if (!isTeamA && !isTeamB) return false;
          return (isTeamA && m.winnerTeam === 'A') || (isTeamB && m.winnerTeam === 'B');
        }).length;
        const total = yearMatches.filter(m => m.teamA.includes(id) || m.teamB.includes(id)).length;
        
        if (metric === 'wins') return won;
        if (metric === 'win_rate') return total > 0 ? Math.round((won / total) * 100) : (id === 'usr_sofia' ? 80 : id === 'usr_diego' ? 75 : 50);
        return won * 3 + (total - won);
      } else if (category === 'duo') {
        const duo = duos.find(d => d.id === id);
        if (!duo) return 0;
        const p1 = duo.playerIds[0];
        const p2 = duo.playerIds[1];
        const won = yearMatches.filter(m => {
          const isTeamA = m.teamA.includes(p1) && m.teamA.includes(p2);
          const isTeamB = m.teamB.includes(p1) && m.teamB.includes(p2);
          return (isTeamA && m.winnerTeam === 'A') || (isTeamB && m.winnerTeam === 'B');
        }).length;
        const total = yearMatches.filter(m => {
          const isTeamA = m.teamA.includes(p1) && m.teamA.includes(p2);
          const isTeamB = m.teamB.includes(p1) && m.teamB.includes(p2);
          return isTeamA || isTeamB;
        }).length;

        if (metric === 'wins') return won || (duo.yearlyWins[periodLabel] || 0);
        if (metric === 'win_rate') return total > 0 ? Math.round((won / total) * 100) : Math.round((duo.winRate || 0.6) * 100);
        return (won || (duo.yearlyWins[periodLabel] || 0)) * 3;
      } else {
        const arenaMatches = yearMatches.filter(m => m.arenaId === id);
        const total = arenaMatches.length;
        const pointsScored = arenaMatches.reduce((acc, m) => acc + m.scoreA + m.scoreB, 0);

        const arenaObj = arenas.find(a => a.id === id);
        if (metric === 'wins') return total || (arenaObj?.yearlyVictories[periodLabel] || 0);
        if (metric === 'win_rate') return total > 0 ? Math.min(100, Math.round(total * 8)) : (id === 'arena_pantano' ? 70 : id === 'arena_marisol' ? 60 : 50);
        return pointsScored || (total * 38) || (id === 'arena_pantano' ? 180 : 120);
      }
    }

    if (periodType === 'monthly') {
      const monthToCode: Record<string, string> = {
        'Dez': '2025-12',
        'Jan': '2026-01',
        'Fev': '2026-02',
        'Mar': '2026-03',
        'Abr': '2026-04',
        'Mai': '2026-05'
      };
      const monthCode = monthToCode[periodLabel] || '2026-01';
      const monthMatches = (matches || []).filter(m => m.status === 'validated' && m.date.startsWith(monthCode));

      if (category === 'individual') {
        const presets = monthlyStats[id] || [];
        const presetStat = presets.find(p => p.month === monthCode);
        if (presetStat) {
          if (metric === 'wins') return presetStat.wins;
          if (metric === 'win_rate') return presetStat.wins + presetStat.losses > 0 ? Math.round((presetStat.wins / (presetStat.wins + presetStat.losses)) * 100) : 50;
          return presetStat.points;
        }

        const won = monthMatches.filter(m => {
          const isTeamA = m.teamA.includes(id);
          const isTeamB = m.teamB.includes(id);
          return (isTeamA && m.winnerTeam === 'A') || (isTeamB && m.winnerTeam === 'B');
        }).length;
        const total = monthMatches.filter(m => m.teamA.includes(id) || m.teamB.includes(id)).length;
        if (metric === 'wins') return won || (id === 'usr_sofia' ? 3 : id === 'usr_diego' ? 2 : 1);
        if (metric === 'win_rate') return total > 0 ? Math.round((won / total) * 100) : (id === 'usr_sofia' ? 82 : id === 'usr_diego' ? 76 : 53);
        return won * 3 + (total - won) || (id === 'usr_sofia' ? 10 : id === 'usr_diego' ? 7 : 4);
      } else if (category === 'duo') {
        const duo = duos.find(d => d.id === id);
        const p1 = duo?.playerIds[0] || '';
        const p2 = duo?.playerIds[1] || '';
        const won = monthMatches.filter(m => {
          const isTeamA = m.teamA.includes(p1) && m.teamA.includes(p2);
          const isTeamB = m.teamB.includes(p1) && m.teamB.includes(p2);
          return (isTeamA && m.winnerTeam === 'A') || (isTeamB && m.winnerTeam === 'B');
        }).length;
        const total = monthMatches.filter(m => {
          const isTeamA = m.teamA.includes(p1) && m.teamA.includes(p2);
          const isTeamB = m.teamB.includes(p1) && m.teamB.includes(p2);
          return isTeamA || isTeamB;
        }).length;
        if (metric === 'wins') return won || (id === 'usr_bruna_usr_sofia' ? 2 : 1);
        if (metric === 'win_rate') return total > 0 ? Math.round((won / total) * 100) : (id === 'usr_bruna_usr_sofia' ? 80 : 65);
        return won * 3 || (id === 'usr_bruna_usr_sofia' ? 6 : 3);
      } else {
        const arenaMatches = monthMatches.filter(m => m.arenaId === id);
        const total = arenaMatches.length;
        const pointsScored = arenaMatches.reduce((acc, m) => acc + m.scoreA + m.scoreB, 0);
        if (metric === 'wins') return total || (id === 'arena_pantano' ? 4 : id === 'arena_marisol' ? 3 : 2);
        if (metric === 'win_rate') return total > 0 ? Math.min(100, total * 10) : (id === 'arena_pantano' ? 75 : 60);
        return pointsScored || (total * 38) || (id === 'arena_pantano' ? 150 : 100);
      }
    }

    if (periodType === 'daily') {
      const dailyToCode: Record<string, string> = {
        '20/Mai': '2026-05-20',
        '22/Mai': '2026-05-22',
        '25/Mai': '2026-05-25',
        '28/Mai': '2026-05-28',
        '01/Jun': '2026-06-01',
        '04/Jun': '2026-06-04'
      };
      const dateCode = dailyToCode[periodLabel] || '2026-06-04';
      const dateMatches = (matches || []).filter(m => m.status === 'validated' && m.date === dateCode);

      if (category === 'individual') {
        const won = dateMatches.filter(m => {
          const isTeamA = m.teamA.includes(id);
          const isTeamB = m.teamB.includes(id);
          return (isTeamA && m.winnerTeam === 'A') || (isTeamB && m.winnerTeam === 'B');
        }).length;
        const total = dateMatches.filter(m => m.teamA.includes(id) || m.teamB.includes(id)).length;
        if (metric === 'wins') return won || (id === 'usr_sofia' ? 1 : 0);
        if (metric === 'win_rate') return total > 0 ? Math.round((won / total) * 100) : (id === 'usr_sofia' && periodLabel.includes('Jun') ? 100 : 0);
        return won * 3 + (total - won) || (id === 'usr_sofia' ? 3 : 0);
      } else if (category === 'duo') {
        const duo = duos.find(d => d.id === id);
        const p1 = duo?.playerIds[0] || '';
        const p2 = duo?.playerIds[1] || '';
        const won = dateMatches.filter(m => {
          const isTeamA = m.teamA.includes(p1) && m.teamA.includes(p2);
          const isTeamB = m.teamB.includes(p1) && m.teamB.includes(p2);
          return (isTeamA && m.winnerTeam === 'A') || (isTeamB && m.winnerTeam === 'B');
        }).length;
        const total = dateMatches.filter(m => {
          const isTeamA = m.teamA.includes(p1) && m.teamA.includes(p2);
          const isTeamB = m.teamB.includes(p1) && m.teamB.includes(p2);
          return isTeamA || isTeamB;
        }).length;
        if (metric === 'wins') return won || (id === 'usr_bruna_usr_sofia' && periodLabel.includes('Jun') ? 1 : 0);
        if (metric === 'win_rate') return total > 0 ? Math.round((won / total) * 100) : (id === 'usr_bruna_usr_sofia' && periodLabel.includes('Jun') ? 100 : 0);
        return won * 3 || (id === 'usr_bruna_usr_sofia' && periodLabel.includes('Jun') ? 3 : 0);
      } else {
        const arenaMatches = dateMatches.filter(m => m.arenaId === id);
        const total = arenaMatches.length;
        const pointsScored = arenaMatches.reduce((acc, m) => acc + m.scoreA + m.scoreB, 0);
        if (metric === 'wins') return total || (id === 'arena_pantano' && periodLabel.includes('Jun') ? 2 : 0);
        if (metric === 'win_rate') return total > 0 ? Math.min(100, total * 25) : 0;
        return pointsScored || (id === 'arena_pantano' && periodLabel.includes('Jun') ? 76 : 0);
      }
    }

    return 0;
  };

  const getComparisonData = () => {
    const labels = compTimeframe === 'daily'
      ? ['20/Mai', '22/Mai', '25/Mai', '28/Mai', '01/Jun', '04/Jun']
      : compTimeframe === 'monthly'
      ? ['Dez', 'Jan', 'Fev', 'Mar', 'Abr', 'Mai']
      : ['2024', '2025', '2026', '2027'];

    return labels.map(label => {
      const valA = getEntityMetricForPeriod(activeCompItemAId, compCategory, label, compTimeframe, activeMetric);
      const valB = getEntityMetricForPeriod(activeCompItemBId, compCategory, label, compTimeframe, activeMetric);
      return {
        label,
        valA,
        valB
      };
    });
  };

  const compData = getComparisonData();
  const maxChartVal = Math.max(...compData.map(d => Math.max(d.valA, d.valB)), 10);

  // 1. ATHLETE PERFORMANCE DATA AGGREGATION HELPERS
  const getAthleteDailyData = () => {
    const validatedMatches = (matches || []).filter(
      m => m.status === 'validated' && m.playerIds.includes(selectedPlayer.id)
    );

    const dayMap: Record<string, { wins: number; total: number }> = {};
    validatedMatches.forEach(m => {
      const isTeamA = m.teamA.includes(selectedPlayer.id);
      const isWinner = (isTeamA && m.winnerTeam === 'A') || (!isTeamA && m.winnerTeam === 'B');
      if (!dayMap[m.date]) {
        dayMap[m.date] = { wins: 0, total: 0 };
      }
      dayMap[m.date].total += 1;
      if (isWinner) dayMap[m.date].wins += 1;
    });

    let list = Object.entries(dayMap).map(([date, val]) => ({
      label: date.split('-').slice(1).reverse().join('/'),
      rawDate: date,
      wins: val.wins,
      winRate: Math.round((val.wins / val.total) * 100)
    }));

    const existingRawDates = list.map(l => l.rawDate);
    const missingDates = (selectedPlayer.presentDates || []).filter(d => !existingRawDates.includes(d));

    missingDates.forEach((d, i) => {
      const simulatedTotal = 2 + (i % 2);
      const simulatedWins = 1 + (i % 2);
      list.push({
        label: d.split('-').slice(1).reverse().join('/'),
        rawDate: d,
        wins: simulatedWins,
        winRate: Math.round((simulatedWins / simulatedTotal) * 100)
      });
    });

    list.sort((a, b) => a.rawDate.localeCompare(b.rawDate));
    return list.slice(-6);
  };

  const getAthleteMonthlyData = () => {
    const playerPresetStats = monthlyStats[selectedPlayer.id] || [];
    const monthLabelsMap: Record<string, string> = {
      '01': 'Jan', '02': 'Fev', '03': 'Mar', '04': 'Abr', '05': 'Mai', '06': 'Jun',
      '07': 'Jul', '08': 'Ago', '09': 'Set', '10': 'Out', '11': 'Nov', '12': 'Dez'
    };

    let list = playerPresetStats.map(s => {
      const monthNum = s.month.split('-')[1];
      const label = monthLabelsMap[monthNum] || s.month;
      const total = s.wins + s.losses || 1;
      return {
        label,
        rawCode: s.month,
        wins: s.wins,
        winRate: Math.round((s.wins / total) * 100)
      };
    });

    if (list.length === 0) {
      list = [
        { label: 'Abr', rawCode: '2026-04', wins: 2, winRate: 67 },
        { label: 'Mai', rawCode: '2026-05', wins: 3, winRate: 75 },
        { label: 'Jun', rawCode: '2026-06', wins: selectedPlayer.wins || 4, winRate: Math.round((selectedPlayer.winRate || 0.75) * 100) }
      ];
    }
    list.sort((a, b) => a.rawCode.localeCompare(b.rawCode));
    return list;
  };

  const getAthleteYearlyData = () => {
    const wins2026 = selectedPlayer.wins;
    const winRate2026 = Math.round((selectedPlayer.winRate || 0) * 100);

    const seed = selectedPlayer.name.length;
    const wins2025 = 4 + (seed % 6);
    const winRate2025 = 55 + (seed % 20);

    return [
      { label: '2025', wins: wins2025, winRate: winRate2025 },
      { label: '2026', wins: wins2026, winRate: winRate2026 }
    ];
  };

  // 2. SELECTED DUO PERFORMANCE DATA AGGREGATION HELPERS
  const activeDuo = duos.find(d => d.id === selectedDuoId) || duos[0] || sortedDuos[0];

  const getDuoDailyData = () => {
    if (!activeDuo) return [];
    const p0 = activeDuo.playerIds[0];
    const p1 = activeDuo.playerIds[1];

    const validatedMatches = (matches || []).filter(
      m => m.status === 'validated' &&
      ((m.teamA.includes(p0) && m.teamA.includes(p1)) || (m.teamB.includes(p0) && m.teamB.includes(p1)))
    );

    const dayMap: Record<string, { wins: number; total: number }> = {};
    validatedMatches.forEach(m => {
      const isTeamA = m.teamA.includes(p0);
      const isWinner = (isTeamA && m.winnerTeam === 'A') || (!isTeamA && m.winnerTeam === 'B');
      if (!dayMap[m.date]) {
        dayMap[m.date] = { wins: 0, total: 0 };
      }
      dayMap[m.date].total += 1;
      if (isWinner) dayMap[m.date].wins += 1;
    });

    let list = Object.entries(dayMap).map(([date, val]) => ({
      label: date.split('-').slice(1).reverse().join('/'),
      rawDate: date,
      wins: val.wins,
      winRate: Math.round((val.wins / val.total) * 100)
    }));

    if (list.length < 3) {
      const dates = ['2026-05-15', '2026-05-24', '2026-06-01'];
      dates.forEach((d, i) => {
        const simWins = Math.max(1, Math.floor(activeDuo.wins / 3) + i);
        const simRate = Math.min(95, Math.round((activeDuo.winRate || 0.6) * 100 - (10 - i * 5)));
        if (!list.some(l => l.rawDate === d)) {
          list.push({
            label: d.split('-').slice(1).reverse().join('/'),
            rawDate: d,
            wins: simWins,
            winRate: simRate
          });
        }
      });
    }

    list.sort((a, b) => a.rawDate.localeCompare(b.rawDate));
    return list.slice(-6);
  };

  const getDuoMonthlyData = () => {
    if (!activeDuo) return [];
    const baseWinRate = Math.round((activeDuo.winRate || 0.70) * 100);
    const mWins = activeDuo.wins;

    return [
      { label: 'Abr', wins: Math.max(1, Math.round(mWins * 0.3)), winRate: Math.max(50, baseWinRate - 8) },
      { label: 'Mai', wins: Math.max(2, Math.round(mWins * 0.6)), winRate: Math.max(55, baseWinRate - 3) },
      { label: 'Jun', wins: mWins, winRate: baseWinRate }
    ];
  };

  const getDuoYearlyData = () => {
    if (!activeDuo) return [];
    const baseWinRate = Math.round((activeDuo.winRate || 0.70) * 100);
    const mWins = activeDuo.wins;

    return [
      { label: '2025', wins: Math.max(1, Math.round(mWins * 0.5)), winRate: Math.max(45, baseWinRate - 12) },
      { label: '2026', wins: mWins, winRate: baseWinRate }
    ];
  };

  // 3. SELECTED ARENA PERFORMANCE DATA AGGREGATION HELPERS
  const activeArena = arenas.find(a => a.id === selectedArenaId) || arenas[0] || sortedArenas[0];

  const getArenaDailyData = () => {
    if (!activeArena) return [];
    const localPlayers = players.filter(p => p.arenaId === activeArena.id);
    const playerIds = localPlayers.map(p => p.id);

    const dayMap: Record<string, { wins: number; total: number }> = {};
    (matches || []).filter(m => m.status === 'validated').forEach(m => {
      m.playerIds.forEach(pId => {
        if (playerIds.includes(pId)) {
          const isTeamA = m.teamA.includes(pId);
          const won = (isTeamA && m.winnerTeam === 'A') || (!isTeamA && m.winnerTeam === 'B');
          if (!dayMap[m.date]) {
            dayMap[m.date] = { wins: 0, total: 0 };
          }
          dayMap[m.date].total += 1;
          if (won) dayMap[m.date].wins += 1;
        }
      });
    });

    let list = Object.entries(dayMap).map(([date, val]) => ({
      label: date.split('-').slice(1).reverse().join('/'),
      rawDate: date,
      wins: val.wins,
      winRate: Math.round((val.wins / val.total) * 100)
    }));

    if (list.length < 3) {
      const dates = ['2026-05-18', '2026-05-28', '2026-06-02'];
      dates.forEach((d, i) => {
        const totalWinsOfRoster = localPlayers.reduce((acc, p) => acc + p.wins, 0);
        const simWins = Math.max(1, Math.floor(totalWinsOfRoster / 5) + i);
        const avgWinRate = localPlayers.length > 0
          ? Math.round((localPlayers.reduce((acc, p) => acc + p.winRate, 0) / localPlayers.length) * 100)
          : 65;
        if (!list.some(l => l.rawDate === d)) {
          list.push({
            label: d.split('-').slice(1).reverse().join('/'),
            rawDate: d,
            wins: simWins,
            winRate: Math.max(40, avgWinRate - 10 + i * 4)
          });
        }
      });
    }

    list.sort((a, b) => a.rawDate.localeCompare(b.rawDate));
    return list.slice(-6);
  };

  const getArenaMonthlyData = () => {
    if (!activeArena) return [];
    const localPlayers = players.filter(p => p.arenaId === activeArena.id);
    const totalWinsOfRoster = localPlayers.reduce((acc, p) => acc + p.wins, 0);
    const avgWinRate = localPlayers.length > 0
      ? Math.round((localPlayers.reduce((acc, p) => acc + p.winRate, 0) / localPlayers.length) * 100)
      : 65;

    return [
      { label: 'Abr', wins: Math.max(1, Math.round(totalWinsOfRoster * 0.28)), winRate: Math.max(45, avgWinRate - 6) },
      { label: 'Mai', wins: Math.max(2, Math.round(totalWinsOfRoster * 0.65)), winRate: Math.max(50, avgWinRate - 2) },
      { label: 'Jun', wins: totalWinsOfRoster, winRate: avgWinRate }
    ];
  };

  const getArenaYearlyData = () => {
    if (!activeArena) return [];
    const localPlayers = players.filter(p => p.arenaId === activeArena.id);
    const totalWinsOfRoster = localPlayers.reduce((acc, p) => acc + p.wins, 0);
    const avgWinRate = localPlayers.length > 0
      ? Math.round((localPlayers.reduce((acc, p) => acc + p.winRate, 0) / localPlayers.length) * 100)
      : 65;

    return [
      { label: '2025', wins: Math.max(2, Math.round(totalWinsOfRoster * 0.45)), winRate: Math.max(40, avgWinRate - 11) },
      { label: '2026', wins: totalWinsOfRoster, winRate: avgWinRate }
    ];
  };

  // Dynamic calculations for best partner (with whom they won the most)
  const getBestPartnerName = (playerId: string) => {
    const playerDuos = duos.filter(d => d.playerIds.includes(playerId));
    if (playerDuos.length === 0) return 'Nenhum';
    // Sort by wins with that partner descending, and fallback to winrate
    const sortedByWins = [...playerDuos].sort((a, b) => {
      if (b.wins !== a.wins) return b.wins - a.wins;
      return b.winRate - a.winRate;
    });
    const bestDuoMatch = sortedByWins[0];
    if (!bestDuoMatch || bestDuoMatch.wins === 0) return 'Nenhum';
    const partnerIdx = bestDuoMatch.playerIds.indexOf(playerId) === 0 ? 1 : 0;
    return `${bestDuoMatch.playerNames[partnerIdx]} (${bestDuoMatch.wins}V)`;
  };

  // 1. INDIVIDUAL & FREQUENCY STATISTICS CALCULATIONS
  // Sorting players according to selection
  const sortedPlayers = [...players].sort((a, b) => {
    if (athleteSortBy === 'frequency') {
      if (b.presenceDays !== a.presenceDays) {
        return b.presenceDays - a.presenceDays;
      }
      return b.winRate - a.winRate; // Tie breaker: individual performance
    } else {
      if (b.points !== a.points) {
        return b.points - a.points;
      }
      return b.wins - a.wins; // Tie breaker: wins
    }
  });

  const playerArena = arenas.find(a => a.id === selectedPlayer.arenaId);
  const pMonthlyStats = [...(monthlyStats[selectedPlayer.id] || [])].sort((a, b) => 
    a.month.localeCompare(b.month)
  );

  // SVG Chart Calculations for Individual Player Evolution
  const chartHeight = 120;
  const chartWidth = 340;
  const paddingX = 40;
  const paddingY = 20;

  let pointsList: number[] = [];
  let minPoints = 0;
  let maxPoints = 10;
  
  if (pMonthlyStats.length > 0) {
    pointsList = pMonthlyStats.map(s => s.points);
    minPoints = Math.min(...pointsList, 0);
    maxPoints = Math.max(...pointsList, 10) + 2;
  }

  const getCoordinates = () => {
    if (pMonthlyStats.length === 0) return [];
    return pMonthlyStats.map((stat, index) => {
      const x = paddingX + (index / (pMonthlyStats.length - 1)) * (chartWidth - paddingX * 2);
      const ratio = (stat.points - minPoints) / (maxPoints - minPoints || 1);
      const y = chartHeight - paddingY - ratio * (chartHeight - paddingY * 2);
      return { x, y, stat };
    });
  };

  const coords = getCoordinates();
  let lineD = '';
  let areaD = '';
  
  if (coords.length > 0) {
    lineD = `M ${coords[0].x} ${coords[0].y} ` + coords.slice(1).map(c => `L ${c.x} ${c.y}`).join(' ');
    areaD = `${lineD} L ${coords[coords.length - 1].x} ${chartHeight - paddingY} L ${coords[0].x} ${chartHeight - paddingY} Z`;
  }

  // 2. DUOS STATISTICS & TOURNEY CALCULATIONS
  const bestDuo = sortedDuos[0];
  const tourneyChampionDuo = [...duos].sort((a, b) => {
    const winsA = a.yearlyWins['2026'] || 0;
    const winsB = b.yearlyWins['2026'] || 0;
    return winsB - winsA;
  })[0];

  // Sinergômetro calculations
  const ptDuos = duos.filter(d => d.playerIds.includes(partnerTestPid));
  const sortedPlayerDuos = [...ptDuos].sort((a, b) => b.winRate - a.winRate);
  const bestPartnerDuo = sortedPlayerDuos[0];
  const worstPartnerDuo = sortedPlayerDuos.length > 1 ? sortedPlayerDuos[sortedPlayerDuos.length - 1] : null;
  const partnerTestPlayerName = players.find(p => p.id === partnerTestPid)?.name || 'Atleta';

  const getPartnerName = (duo: Duo, queryId: string) => {
    const partnerIdx = duo.playerIds.indexOf(queryId) === 0 ? 1 : 0;
    return duo.playerNames[partnerIdx];
  };

  const getPartnerPhoto = (duo: Duo, queryId: string) => {
    const partnerIdx = duo.playerIds.indexOf(queryId) === 0 ? 1 : 0;
    return duo.photoUrls[partnerIdx];
  };

  // 3. ARENAS COMPARATIVE CALCULATIONS
  const bestArenaOfTheYear = sortedArenas[0];

  const getTopPlayerForArena = (arenaId: string) => {
    const affiliated = players.filter(p => p.arenaId === arenaId);
    if (affiliated.length === 0) return { name: 'Nenhum atleta', winRate: 0, photoUrl: '' };
    const top = [...affiliated].sort((a, b) => b.winRate - a.winRate)[0];
    return { name: top.name, winRate: top.winRate, photoUrl: top.photoUrl };
  };

  return (
    <div className="flex flex-col space-y-4" id="stats-dashboard-unified">
      
      {/* Premium Tab Navigation Header */}
      {viewMode === 'rankings' && (
        <div className="flex flex-wrap bg-slate-100 p-1 rounded-2xl border border-slate-200/50 self-start shadow-inner gap-1">
          <button
            onClick={() => setActiveTab('athletes_frequency')}
            className={`px-4 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'athletes_frequency'
                ? 'bg-white text-slate-800 shadow-sm border border-slate-200/20'
                : 'text-slate-500 hover:text-slate-800'
            }`}
            id="btn-tab-frequency"
          >
            <Calendar className="w-3.5 h-3.5 text-blue-500" />
            <span>Frequência e Atletas</span>
          </button>
          <button
            onClick={() => setActiveTab('duos_results')}
            className={`px-4 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'duos_results'
                ? 'bg-white text-slate-800 shadow-sm border border-slate-200/20'
                : 'text-slate-500 hover:text-slate-850'
            }`}
            id="btn-tab-duos"
          >
            <Users className="w-3.5 h-3.5 text-indigo-500" />
            <span>Resultados por Duplas</span>
          </button>
          <button
            onClick={() => setActiveTab('arenas_results')}
            className={`px-4 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'arenas_results'
                ? 'bg-white text-slate-800 shadow-sm border border-slate-200/20'
                : 'text-slate-500 hover:text-slate-850'
            }`}
            id="btn-tab-arenas"
          >
            <Building className="w-3.5 h-3.5 text-emerald-500" />
            <span>Resultados por Arenas</span>
          </button>
        </div>
      )}

      {/* VIEWPORT 1: CHECK-IN FREQUENCY & ATHLETE RANKINGS */}
      {activeTab === 'athletes_frequency' && (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5" id="tab-athletes-frequency">
          
          {/* LEFT PANEL: Comprehensive Check-ins and Athletes Ranking list (8 cols) */}
          <div className="md:col-span-12 lg:col-span-8 flex flex-col space-y-4">
            <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex-1 flex flex-col">
              
              <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3 mb-4">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-1.5">
                    <UserCheck className="w-5 h-5 text-blue-600 animate-pulse" />
                    <h3 className="font-bold text-slate-800 text-sm">Controle de Frequência & Performance</h3>
                  </div>
                  <p className="text-[10px] text-slate-400">Atletas confirmam presença diária participando de ao menos 1 jogo na data.</p>
                </div>

                {/* Sort Toggle Controller */}
                <div className="flex bg-slate-50 p-1 rounded-xl border border-slate-200/50 self-start text-[10px]">
                  <button
                    onClick={() => setAthleteSortBy('frequency')}
                    className={`px-2.5 py-1 font-bold rounded-lg transition-all cursor-pointer flex items-center gap-1 ${
                      athleteSortBy === 'frequency'
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    <ArrowUpDown className="w-3 h-3" />
                    <span>Filtro: Frequência</span>
                  </button>
                  <button
                    onClick={() => setAthleteSortBy('points')}
                    className={`px-2.5 py-1 font-bold rounded-lg transition-all cursor-pointer flex items-center gap-1 ${
                      athleteSortBy === 'points'
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    <ArrowUpDown className="w-3 h-3" />
                    <span>Filtro: Pontos</span>
                  </button>
                </div>
              </div>

              {/* INTERACTIVE VISUAL RESUMO: GRAPH OF TOP 5 ATHLETES */}
              <div className="bg-slate-50/70 p-4 rounded-xl border border-slate-100 mb-4 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-extrabold text-blue-700 uppercase tracking-widest block">📊 Gráficos rápidos: Top 5 Reservistas ({athleteSortBy === 'frequency' ? 'Mais Frequentes' : 'Líderes de Pontuação'})</span>
                  <span className="text-[9px] text-slate-400 font-semibold select-none">Toque para focar</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
                  {sortedPlayers.slice(0, 5).map((player, index) => {
                    const value = athleteSortBy === 'frequency' ? player.presenceDays || 0 : player.points || 0;
                    const maxVal = Math.max(...sortedPlayers.slice(0, 5).map(p => athleteSortBy === 'frequency' ? p.presenceDays || 0 : p.points || 0), 1);
                    const percent = (value / maxVal) * 100;
                    const isSelected = player.id === selectedPlayerId;
                    
                    return (
                      <div 
                        key={player.id} 
                        onClick={() => {
                          setSelectedPlayerId(player.id);
                          setPartnerTestPid(player.id);
                        }}
                        className={`p-2.5 bg-white rounded-xl border transition-all cursor-pointer flex flex-col justify-between space-y-2 hover:border-blue-400 hover:shadow-sm ${
                          isSelected ? 'ring-2 ring-blue-500 border-blue-500 shadow-sm' : 'border-slate-150'
                        }`}
                      >
                        <div className="flex items-center gap-1.5 justify-between w-full">
                          <div className="flex items-center gap-1.5 min-w-0">
                            <span className="text-[9px] font-black font-mono text-slate-400">#{index + 1}</span>
                            <img src={player.photoUrl} alt={player.name} className="w-5 h-5 rounded-full object-cover border border-slate-200 shrink-0 bg-slate-50" referrerPolicy="no-referrer" />
                            <span className="text-[9.5px] font-extrabold text-slate-800 truncate block leading-tight">{player.name.split(' ')[0]}</span>
                          </div>
                          {renderStars(player.id, 'individual')}
                        </div>
                        
                        <div className="space-y-1">
                          <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                            <div 
                              style={{ width: `${percent}%` }} 
                              className={`h-full rounded-full transition-all duration-500 ${
                                index === 0 ? 'bg-yellow-500' : index === 1 ? 'bg-slate-400' : index === 2 ? 'bg-orange-400' : 'bg-blue-600'
                              }`}
                            ></div>
                          </div>
                          <span className="text-[9.5px] font-mono font-black text-slate-700 block">
                            {value} {athleteSortBy === 'frequency' ? 'dias' : 'pts'}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Leaderboard Table optimized for Check-in days, Total Matches, Wins, Winrate, Best Partner, Points and Stars */}
              <div className="overflow-x-auto flex-1">
                <table className="w-full text-left text-xs text-slate-600">
                  <thead>
                    <tr className="bg-slate-50 text-slate-500 font-bold border-b border-slate-150 uppercase tracking-wider text-[9px]">
                      <th className="p-3 text-center w-12">Pos</th>
                      <th className="p-3">Atleta / Filiação</th>
                      <th className="p-3 text-center text-blue-700 font-bold bg-blue-50/40">Frequência</th>
                      <th className="p-3 text-center">Jogos</th>
                      <th className="p-3 text-center text-emerald-700 font-semibold bg-emerald-50/20">Vitórias</th>
                      <th className="p-3 text-center">Aproveit.</th>
                      <th className="p-3">Melhor Parceiro</th>
                      <th className="p-3 text-center font-bold text-slate-800">Pontos</th>
                      <th className="p-3 text-center text-amber-600 font-bold bg-amber-50/40">Estrelas</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {sortedPlayers.map((player, index) => {
                      const isSelected = player.id === selectedPlayerId;
                      const rankPos = index + 1;
                      const bestPartnerText = getBestPartnerName(player.id);
                      
                      return (
                        <tr 
                          key={player.id}
                          id={`row-player-${player.id}`}
                          onClick={() => {
                            setSelectedPlayerId(player.id);
                            setPartnerTestPid(player.id);
                          }}
                          className={`cursor-pointer transition-colors ${
                            isSelected 
                              ? 'bg-blue-50/50 hover:bg-blue-50 font-medium border-l-4 border-blue-600' 
                              : 'hover:bg-slate-50/40'
                          }`}
                        >
                          {/* Rank indicator */}
                          <td className="p-3 text-center">
                            <span className="font-bold text-slate-700 font-mono">
                              {rankPos === 1 ? (
                                <span className="inline-flex items-center justify-center w-5 h-5 bg-yellow-100 text-yellow-800 rounded-full text-[10px]">🏆</span>
                              ) : rankPos === 2 ? (
                                <span className="inline-flex items-center justify-center w-5 h-5 bg-slate-100 text-slate-700 rounded-full text-[10px]">🥈</span>
                              ) : rankPos === 3 ? (
                                <span className="inline-flex items-center justify-center w-5 h-5 bg-orange-100 text-orange-850 rounded-full text-[10px]">🥉</span>
                              ) : (
                                `${rankPos}º`
                              )}
                            </span>
                          </td>

                          {/* Profile details */}
                          <td className="p-3">
                            <div className="flex items-center gap-2">
                              <img 
                                src={player.photoUrl} 
                                alt={player.name}
                                referrerPolicy="no-referrer"
                                className="w-8 h-8 rounded-full border border-slate-200 bg-slate-100 object-cover shrink-0" 
                              />
                              <div>
                                <span className="text-slate-950 font-extrabold text-xs block leading-snug flex items-center gap-1.55">
                                  {player.name}
                                </span>
                                <span className="text-[10px] text-slate-400 block truncate">
                                  {arenas.find(a => a.id === player.arenaId)?.name || 'Avulso'}
                                </span>
                              </div>
                            </div>
                          </td>

                          {/* Attendance metric ("quantos dias compareceu") */}
                          <td className="p-3 text-center bg-blue-50/20">
                            <div className="flex flex-col items-center justify-center">
                              <span className="text-blue-700 font-black font-mono text-xs block leading-none">
                                {player.presenceDays || 0}
                              </span>
                              <span className="text-[9px] text-blue-500 font-bold block mt-0.5">dias</span>
                            </div>
                          </td>

                          {/* Match quantity ("quantas partidas jogou") */}
                          <td className="p-3 text-center font-mono text-slate-700 text-xs font-semibold">
                            {player.totalMatches}
                          </td>

                          {/* Wins quantity */}
                          <td className="p-3 text-center font-mono text-emerald-600 text-xs font-black bg-emerald-50/10">
                            {player.wins}
                          </td>

                          {/* Win Rate % ("aproveitamento individual") */}
                          <td className="p-3 text-center">
                            <span className="px-2 py-0.5 bg-sky-55 text-sky-800 font-mono rounded text-[10px] font-bold">
                              {((player.winRate || 0) * 100).toFixed(0)}%
                            </span>
                          </td>

                          {/* Dynamic best partner ("qual o melhor parceiro - com quem mais ganhou") */}
                          <td className="p-3">
                            <div className="flex items-center gap-1">
                              <span className="text-[11px] font-semibold text-slate-800">
                                {bestPartnerText !== 'Nenhum' ? (
                                  <span className="text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md font-bold text-[10px] inline-block">
                                    🤝 {bestPartnerText}
                                  </span>
                                ) : (
                                  <span className="text-slate-400 italic">Nenhum</span>
                                )}
                              </span>
                            </div>
                          </td>

                          {/* Rating score points */}
                          <td className="p-3 text-center text-slate-900 font-black font-mono text-xs">
                            {player.points}
                          </td>

                          {/* Estrelas */}
                          <td className="p-3 text-center bg-amber-50/20">
                            {renderStars(player.id, 'individual') || <span className="text-slate-300 font-mono text-xs">-</span>}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* NoSQL Architecture Note */}
              <div className="p-3 bg-blue-50/50 border border-blue-100 rounded-xl mt-4 flex items-start gap-2 text-[10px] text-blue-900 leading-normal">
                <Calendar className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <strong>Agregações NoSQL de Frequência:</strong> A cada partida salva, o sistema anexa o dia <code>YYYY-MM-DD</code> ao array <code>presentDates</code> do atleta de forma única (usando <code>FieldValue.arrayUnion</code>). A frequência em dias (<code>presenceDays</code>) é incrementada sob demanda se o dia não existia previamente. Isso previne leituras duplicadas extremamente onerosas e otimiza faturas do Cloud Firestore.
                </div>
              </div>

            </div>
          </div>

          {/* RIGHT PANEL: Details of Selected Player, presence dates listing pills and performance charts (4 cols) */}
          <div className="md:col-span-12 lg:col-span-4 flex flex-col space-y-4">
            {selectedPlayer && (
              <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col h-full space-y-4">
                
                {/* Header */}
                <div className="flex gap-3 items-start border-b border-dashed border-slate-100 pb-4">
                  <img 
                    src={selectedPlayer.photoUrl} 
                    alt={selectedPlayer.name}
                    referrerPolicy="no-referrer"
                    className="w-12 h-12 rounded-2xl border border-slate-200 bg-slate-50 object-cover shrink-0 shadow-sm" 
                  />
                  <div className="space-y-0.5">
                    <span className="text-[8px] font-black tracking-wider text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full uppercase">
                      Atleta Selecionado
                    </span>
                    <h4 className="font-extrabold text-slate-900 text-sm leading-tight flex items-center gap-1.5">
                      {selectedPlayer.name}
                      {renderStars(selectedPlayer.id, 'individual')}
                    </h4>
                    <div className="flex items-center gap-1 text-[10px] text-slate-500">
                      <MapPin className="w-3 h-3 text-rose-500 shrink-0" />
                      <span>{playerArena?.name || 'Associação avulsa'}</span>
                    </div>
                  </div>
                </div>

                {/* Main mini-dashboard stat list */}
                <div className="grid grid-cols-2 gap-2 text-center">
                  <div className="bg-blue-50 border border-blue-100/50 p-2.5 rounded-xl">
                    <span className="text-[8.5px] text-blue-700 block uppercase font-bold tracking-wider mb-0.5">Compareceu</span>
                    <strong className="text-blue-900 font-mono text-sm block leading-none">{selectedPlayer.presenceDays || 0} dias</strong>
                  </div>
                  <div className="bg-slate-50 border border-slate-200/50 p-2.5 rounded-xl">
                    <span className="text-[8.5px] text-slate-500 block uppercase font-bold tracking-wider mb-0.5">Atuou em</span>
                    <strong className="text-slate-800 font-mono text-sm block leading-none">{selectedPlayer.totalMatches} jogos</strong>
                  </div>
                  <div className="bg-emerald-50 border border-emerald-100/50 p-2.5 rounded-xl">
                    <span className="text-[8.5px] text-emerald-700 block uppercase font-bold tracking-wider mb-0.5">Vitórias</span>
                    <strong className="text-emerald-800 font-mono text-sm block leading-none">{selectedPlayer.wins}</strong>
                  </div>
                  <div className="bg-rose-50 border border-rose-100/50 p-2.5 rounded-xl">
                    <span className="text-[8.5px] text-rose-700 block uppercase font-bold tracking-wider mb-0.5">Aproveit.</span>
                    <strong className="text-rose-800 font-mono text-sm block leading-none">{((selectedPlayer.winRate || 0) * 100).toFixed(0)}%</strong>
                  </div>
                </div>

                {/* Visual Technical Efficiency Circle Chart */}
                <div className="bg-slate-50/55 p-3 rounded-xl border border-slate-100 flex items-center justify-between gap-3">
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Eficiência de Vitórias</span>
                    <p className="text-[9.5px] text-slate-400 leading-snug">Taxa de sucesso real em partidas oficiais ponderadas por pontos.</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block"></span>
                      <span className="text-[9.5px] text-slate-600 font-semibold">{selectedPlayer.wins} Vitória{selectedPlayer.wins !== 1 && 's'}</span>
                      <span className="w-2 h-2 rounded-full bg-rose-500 inline-block ml-1"></span>
                      <span className="text-[9.5px] text-slate-600 font-semibold">{selectedPlayer.losses} Derrota{selectedPlayer.losses !== 1 && 's'}</span>
                    </div>
                  </div>
                  
                  {/* Circle SVG */}
                  <div className="relative w-14 h-14 shrink-0 flex items-center justify-center">
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 64 64">
                      {/* Grey background circle */}
                      <circle cx="32" cy="32" r="26" stroke="#f1f5f9" strokeWidth="5.5" fill="transparent" />
                      {/* Active green circle segment */}
                      <circle 
                        cx="32" 
                        cy="32" 
                        r="26" 
                        stroke="#10b981" 
                        strokeWidth="5.5" 
                        fill="transparent" 
                        strokeDasharray={2 * Math.PI * 26}
                        strokeDashoffset={2 * Math.PI * 26 * (1 - (selectedPlayer.winRate || 0))}
                      />
                    </svg>
                    <span className="absolute text-[10px] font-black font-mono text-slate-800">
                      {((selectedPlayer.winRate || 0) * 100).toFixed(0)}%
                    </span>
                  </div>
                </div>

                {/* Scrollable confirmed presence dates list */}
                <div className="space-y-2 pt-1 border-t border-slate-50">
                  <div className="flex items-center gap-1 justify-between">
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-blue-500" />
                      <span>Controle de Presenças</span>
                    </span>
                    <span className="text-[9px] font-semibold text-slate-400 bg-slate-50 px-1.5 py-0.5 rounded font-mono">
                      Subcoleção: /players/...
                    </span>
                  </div>

                  {selectedPlayer.presentDates && selectedPlayer.presentDates.length > 0 ? (
                    <div className="flex flex-wrap gap-1.5 max-h-[140px] overflow-y-auto p-1 bg-slate-50/50 rounded-xl border border-slate-100">
                      {selectedPlayer.presentDates.map((dateStr, i) => (
                        <span 
                          key={i} 
                          className="flex items-center gap-1 text-[10px] font-bold text-slate-700 bg-white border border-slate-200 p-1 px-2 rounded-lg hover:border-blue-400 transition"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                          <span>{dateStr.split('-').reverse().join('/')}</span>
                        </span>
                      ))}
                    </div>
                  ) : (
                    <p className="text-[11px] text-slate-400 italic text-center p-3 bg-slate-50 rounded-lg">
                      Nenhuma data registrada. Lance uma partida para iniciar o registro.
                    </p>
                  )}
                </div>

                {/* Unified Fechamento & Evolução de Resultados (Individual) */}
                <div className="pt-2 border-t border-slate-100">
                  <EvolutionStatsCard
                    title="Fechamento & Resultados"
                    subtitle={`Desempenho histórico de ${selectedPlayer.name}`}
                    dailyData={getAthleteDailyData()}
                    monthlyData={getAthleteMonthlyData()}
                    yearlyData={getAthleteYearlyData()}
                    accentColor="blue"
                  />
                </div>

              </div>
            )}
          </div>

        </div>
      )}

      {/* VIEWPORT 2: DUOS RESULTS PANEL & PARTNER SYNERGIES */}
      {activeTab === 'duos_results' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5" id="tab-duos-results">
          
          {/* Champion duos metrics panel (12 cols) */}
          <div className="lg:col-span-12 grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Top synergy duo */}
            <div className="p-4 bg-gradient-to-br from-indigo-700 to-slate-900 rounded-2xl text-white flex flex-col justify-between shadow-sm relative overflow-hidden">
              <div className="absolute right-0 top-0 opacity-10 transform translate-x-4 -translate-y-4">
                <Users className="w-36 h-36" />
              </div>
              <div className="space-y-1 z-10">
                <span className="px-2 py-0.5 bg-indigo-500/30 text-indigo-200 border border-indigo-400/20 text-[9px] font-bold uppercase rounded-lg tracking-wider">
                  Sinergia de Dupla Suprema
                </span>
                <h4 className="font-semibold text-[11px] text-indigo-300">Dupla Líder por Pontos</h4>
                {bestDuo ? (
                  <div className="flex items-center gap-3 mt-2">
                    <div className="flex -space-x-3.5">
                      <img src={bestDuo.photoUrls[0]} className="w-10 h-10 rounded-full border-2 border-slate-950 object-cover" />
                      <img src={bestDuo.photoUrls[1]} className="w-10 h-10 rounded-full border-2 border-slate-950 object-cover" />
                    </div>
                    <div>
                      <span className="font-extrabold text-white text-xs block leading-tight">{bestDuo.playerNames[0]} & {bestDuo.playerNames[1]}</span>
                      <span className="text-[11px] text-slate-300 block">
                        Aproveitamento de <strong>{(bestDuo.winRate * 100).toFixed(0)}%</strong> • {bestDuo.wins}V - {bestDuo.losses}D ({bestDuo.points} pts)
                      </span>
                    </div>
                  </div>
                ) : (
                  <p className="text-xs text-indigo-200">Nenhuma dupla registrada.</p>
                )}
              </div>
              <div className="mt-4 text-[9px] text-indigo-300 font-mono z-10">
                ID no Firestore: <code className="bg-black/20 px-1 py-0.5 rounded text-white font-bold">{bestDuo?.id}</code>
              </div>
            </div>

            {/* Tourney Champions (yearlyWins winner) */}
            <div className="p-4 bg-gradient-to-br from-amber-500 to-amber-700 rounded-2xl text-slate-950 flex flex-col justify-between shadow-sm relative overflow-hidden">
              <div className="absolute right-0 top-0 opacity-15 transform translate-x-4 -translate-y-4">
                <Trophy className="w-36 h-36 stroke-amber-200" />
              </div>
              <div className="space-y-1 z-10">
                <span className="px-2 py-0.5 bg-amber-950/20 text-yellow-950 text-[9px] font-black uppercase rounded-lg tracking-wider">
                  Campeã do Circuito Anual de 2026
                </span>
                <h4 className="font-semibold text-[11px] text-yellow-900">Dupla com maior volume de vitórias no ano de 2026</h4>
                {tourneyChampionDuo ? (
                  <div className="flex items-center gap-3 mt-2">
                    <div className="flex -space-x-3.5">
                      <img src={tourneyChampionDuo.photoUrls[0]} className="w-10 h-10 rounded-full border-2 border-amber-400 object-cover" />
                      <img src={tourneyChampionDuo.photoUrls[1]} className="w-10 h-10 rounded-full border-2 border-amber-400 object-cover" />
                    </div>
                    <div>
                      <span className="font-extrabold text-slate-950 text-xs block leading-tight">{tourneyChampionDuo.playerNames[0]} & {tourneyChampionDuo.playerNames[1]}</span>
                      <span className="text-[11px] text-amber-950 block">
                        Ano de 2026: <strong className="text-amber-950 font-black">{tourneyChampionDuo.yearlyWins['2026'] || 0} vitórias válidas</strong>
                      </span>
                    </div>
                  </div>
                ) : (
                  <p className="text-xs text-slate-800">Sem partidas computadas.</p>
                )}
              </div>
              <div className="mt-4 text-[9px] text-amber-900 font-semibold z-10">
                Pontuação Total acumulada: {tourneyChampionDuo?.points || 0} pts
              </div>
            </div>

          </div>

          {/* Duos Performance Stacked Bars Chart */}
          <div className="lg:col-span-12 bg-white p-5 rounded-2xl border border-slate-100 shadow-sm space-y-4">
            <div className="flex justify-between items-center border-b border-slate-50 pb-2">
              <div>
                <h4 className="font-extrabold text-indigo-950 text-sm flex items-center gap-1.5">
                  <Flame className="w-4.5 h-4.5 text-orange-500 animate-pulse" />
                  <span>Razão de Sinergia e Aproveitamento (Top 5 Parcerias)</span>
                </h4>
                <p className="text-[10.5px] text-slate-400">Relação visual direta de vitórias (verde) e derrotas (rosa) registradas no Firestore.</p>
              </div>
              <span className="text-[10px] bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded-lg font-bold">Consenso NoSQL</span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 pt-1">
              {sortedDuos.slice(0, 5).map((duo, i) => {
                const total = duo.totalMatches || 1;
                const winPercent = (duo.wins / total) * 100;
                const lossPercent = (duo.losses / total) * 100;
                
                return (
                  <div key={duo.id} className="bg-slate-50 border border-slate-150 p-3 rounded-xl flex flex-col justify-between space-y-3 shadow-inner">
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-1 justify-between w-full">
                        <div className="flex items-center gap-1 min-w-0">
                          <span className="inline-flex items-center justify-center w-4 h-4 bg-indigo-100 text-indigo-700 font-black rounded text-[9.5px] font-mono shrink-0">#{i+1}</span>
                          <span className="text-[11px] font-extrabold text-slate-800 truncate block leading-none">{duo.playerNames[0].split(' ')[0]} + {duo.playerNames[1].split(' ')[0]}</span>
                        </div>
                        {renderStars(duo.id, 'duo')}
                      </div>
                      <span className="text-[10px] text-slate-400 block leading-tight">Aproveitamento de {((duo.winRate || 0) * 100).toFixed(0)}%</span>
                    </div>

                    {/* Segmented stacked horizontal progress bar */}
                    <div className="space-y-1.5">
                      <div className="w-full h-4 bg-slate-200/60 rounded-full overflow-hidden flex shadow-sm">
                        <div 
                          style={{ width: `${winPercent}%` }} 
                          className="bg-emerald-500 hover:bg-emerald-600 transition-all duration-300 text-[8px] font-black text-white flex items-center justify-center font-mono cursor-pointer"
                          title={`${duo.wins} Vitórias`}
                        >
                          {winPercent >= 25 && `${duo.wins}V`}
                        </div>
                        <div 
                          style={{ width: `${lossPercent}%` }} 
                          className="bg-rose-400 hover:bg-rose-500 transition-all duration-300 text-[8px] font-black text-white flex items-center justify-center font-mono cursor-pointer"
                          title={`${duo.losses} Derrotas`}
                        >
                          {lossPercent >= 25 && `${duo.losses}D`}
                        </div>
                      </div>
                      <div className="flex justify-between items-center text-[9px] font-mono font-bold text-slate-400">
                        <span>{duo.wins} Vitórias</span>
                        <span>{duo.losses} Derrotas</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* LEFT: Complete table with Duos Results (7 cols) */}
          <div className="lg:col-span-7 flex flex-col space-y-4">
            <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex-1 flex flex-col">
              <div className="flex items-center justify-between mb-3 border-b border-slate-50 pb-2">
                <div className="flex items-center gap-1.5">
                  <Users className="w-5 h-5 text-indigo-500" />
                  <h3 className="font-bold text-slate-800 text-sm">Tabela Comparativa de Duplas</h3>
                </div>
                <span className="text-[10px] text-slate-400 font-mono">Agregações unificadas de duplas</span>
              </div>

              <div className="overflow-x-auto flex-1">
                <table className="w-full text-left text-xs text-slate-600">
                  <thead>
                    <tr className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-100 uppercase tracking-wider text-[9px]">
                      <th className="p-3 text-center w-12 mr-1">Pos</th>
                      <th className="p-3">Integrantes</th>
                      <th className="p-3 text-center font-bold">Jogos</th>
                      <th className="p-3 text-center font-bold text-emerald-600">Vitórias</th>
                      <th className="p-3 text-center font-bold text-rose-500">Derrotas</th>
                      <th className="p-3 text-center font-bold">Aproveit.</th>
                      <th className="p-3 text-center text-slate-900 font-bold">Pontos</th>
                      <th className="p-3 text-center text-amber-600 font-semibold bg-amber-50/25">Estrelas</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {sortedDuos.map((duo, index) => {
                      const rankPos = index + 1;
                      return (
                        <tr 
                          key={duo.id} 
                          onClick={() => setSelectedDuoId(duo.id)}
                          className={`hover:bg-indigo-50/20 cursor-pointer transition-colors ${selectedDuoId === duo.id ? 'bg-indigo-50/40 border-l-4 border-indigo-500' : ''}`}
                        >
                          <td className="p-3 text-center font-bold font-mono text-slate-400">
                            {rankPos}º
                          </td>
                          <td className="p-3">
                            <div className="flex items-center gap-2">
                              <div className="flex -space-x-3 shrink-0">
                                <img src={duo.photoUrls[0]} className="w-7 h-7 rounded-full border border-white object-cover" />
                                <img src={duo.photoUrls[1]} className="w-7 h-7 rounded-full border border-white object-cover" />
                              </div>
                              <div>
                                <span className="text-slate-900 font-bold text-xs block truncate">
                                  {duo.playerNames[0]} & {duo.playerNames[1]}
                                </span>
                                <span className="text-[9px] text-slate-400 block font-mono">Doc ID: {duo.id}</span>
                              </div>
                            </div>
                          </td>
                          <td className="p-3 text-center font-mono text-slate-500">{duo.totalMatches}</td>
                          <td className="p-3 text-center font-mono font-bold text-emerald-600">{duo.wins}</td>
                          <td className="p-3 text-center font-mono text-rose-500">{duo.losses}</td>
                          <td className="p-3 text-center font-mono">
                            <span className="px-1.5 py-0.5 bg-sky-55 text-sky-800 rounded text-[9.5px] font-extrabold">
                              {((duo.winRate || 0) * 100).toFixed(0)}%
                            </span>
                          </td>
                          <td className="p-3 text-center font-black text-indigo-700 text-xs font-mono">{duo.points}</td>
                          <td className="p-3 text-center bg-amber-50/20">
                            {renderStars(duo.id, 'duo') || <span className="text-slate-300 font-mono text-xs">-</span>}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* RIGHT: PARTNER TESTER / SINERGÔMETRO (5 cols) */}
          <div className="lg:col-span-5 flex flex-col space-y-4">
            <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col space-y-4">
              <div className="flex items-center gap-1.5 border-b border-slate-100 pb-3">
                <Flame className="w-5 h-5 text-red-500" />
                <div>
                  <h4 className="font-extrabold text-slate-800 text-xs uppercase tracking-wider block">Sinergômetro de Parcerias</h4>
                  <span className="text-[10px] text-slate-500 leading-tight">Analise com qual parceiro o atleta conquistou maior rendimento.</span>
                </div>
              </div>

              {/* Selector for Player for Partner testing */}
              <div className="space-y-1">
                <label className="block text-[9px] font-bold text-slate-400 uppercase tracking-wider">Selecione o Atleta:</label>
                <select
                  value={partnerTestPid}
                  onChange={(e) => setPartnerTestPid(e.target.value)}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-indigo-500"
                >
                  {players.map(p => (
                    <option key={p.id} value={p.id}>{p.name}</option>
                  ))}
                </select>
              </div>

              {/* Best partner card representation */}
              {bestPartnerDuo ? (
                <div className="space-y-3">
                  <div className="p-3.5 bg-emerald-50/50 border border-emerald-100 rounded-xl space-y-2">
                    <div className="flex items-center gap-1.5 text-emerald-800 text-[10px] font-bold uppercase tracking-wider">
                      <CheckCircle className="w-4 h-4 text-emerald-650" />
                      <span>🔥 Maior Sinergia de Quadra</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <img 
                        src={getPartnerPhoto(bestPartnerDuo, partnerTestPid)} 
                        className="w-10 h-10 rounded-full border border-emerald-250 object-cover shrink-0" 
                      />
                      <div>
                        <strong className="text-slate-900 text-xs block leading-snug">{getPartnerName(bestPartnerDuo, partnerTestPid)}</strong>
                        <span className="text-[10.5px] text-slate-600 block leading-tight">
                          Melhor rendimento de {partnerTestPlayerName} com aproveitamento de <strong className="text-emerald-700 font-mono">{(bestPartnerDuo.winRate * 100).toFixed(0)}%</strong> ({bestPartnerDuo.wins}V - {bestPartnerDuo.losses}D em {bestPartnerDuo.totalMatches} confrontos).
                        </span>
                      </div>
                    </div>
                  </div>

                  {worstPartnerDuo && worstPartnerDuo.id !== bestPartnerDuo.id ? (
                    <div className="p-3.5 bg-amber-50/50 border border-amber-100 rounded-xl space-y-2">
                      <div className="flex items-center gap-1.5 text-amber-800 text-[10px] font-bold uppercase tracking-wider">
                        <ShieldAlert className="w-4 h-4 text-amber-600" />
                        <span>⚠️ Menor Sinergia de Quadra</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <img 
                          src={getPartnerPhoto(worstPartnerDuo, partnerTestPid)} 
                          className="w-10 h-10 rounded-full border border-amber-200 object-cover shrink-0" 
                        />
                        <div>
                          <strong className="text-slate-900 text-xs block leading-snug">{getPartnerName(worstPartnerDuo, partnerTestPid)}</strong>
                          <span className="text-[10.5px] text-slate-600 block leading-tight">
                            Menor performance em dupla com aproveitamento de <strong className="text-amber-800 font-mono">{(worstPartnerDuo.winRate * 100).toFixed(0)}%</strong> ({worstPartnerDuo.wins}V - {worstPartnerDuo.losses}D). Necessita treinos específicos de sinergia de fundo de quadra.
                          </span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <p className="text-[10px] text-slate-400 text-center italic mt-2">Este atleta possui apenas 1 histórico de parceria registrado até o momento.</p>
                  )}
                </div>
              ) : (
                <div className="p-4 text-center text-xs text-slate-400 italic bg-slate-50 rounded-xl">
                  Este jogador ainda não possui partidas em dupla computadas. Utilize o Simulador NoSQL para registrar confrontos.
                </div>
              )}
            </div>

            {/* Dynamic Interactive Duo Closed Trend Graphics Box */}
            <EvolutionStatsCard
              title={`Resultados da Dupla Selecionada`}
              subtitle={`Histórico cumulativo conjunto no circuito`}
              dailyData={getDuoDailyData()}
              monthlyData={getDuoMonthlyData()}
              yearlyData={getDuoYearlyData()}
              accentColor="indigo"
            />

          </div>

        </div>
      )}

      {/* VIEWPORT 3: ARENA RESULTS BOARD & INDIVIDUAL CARDS */}
      {activeTab === 'arenas_results' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5" id="tab-arenas-results">
          
          {/* Best Arena Header banner */}
          <div className="lg:col-span-12">
            <div className="bg-gradient-to-r from-emerald-600 to-teal-800 p-5 rounded-2xl text-white shadow-md flex flex-col md:flex-row justify-between items-start md:items-center gap-4 relative overflow-hidden">
              <div className="absolute right-0 top-0 opacity-10 transform translate-x-12 -translate-y-12">
                <Building className="w-60 h-60" />
              </div>
              <div className="space-y-1 z-10">
                <span className="px-2 py-0.5 bg-emerald-500 text-emerald-100 text-[9px] font-bold uppercase rounded-lg tracking-wider">
                  Arena Destaque do Ano de 2026
                </span>
                <h3 className="font-extrabold text-lg flex items-center gap-1.5 leading-tight">
                  🏆 {bestArenaOfTheYear?.name}
                </h3>
                <p className="text-xs text-teal-100 max-w-xl leading-relaxed">
                  Pelo critério de volume de confrontos disputados e índice de engajamento geral, a <strong>{bestArenaOfTheYear?.name}</strong> lidera o circuito de Futevôlei, hospedando <strong className="text-white font-mono">{bestArenaOfTheYear?.yearlyVictories['2026'] || 0} partidas oficiais do ranking de 2026</strong>.
                </p>
              </div>
              <div className="bg-white/10 backdrop-blur-md px-4 py-3 rounded-xl border border-white/10 z-10 font-mono text-center shrink-0">
                <span className="text-[9px] text-teal-200 block uppercase font-bold tracking-wider">Pontuação Total Registrada</span>
                <strong className="text-white text-base block font-black">{bestArenaOfTheYear?.totalPointsScored} PONTOS</strong>
              </div>
            </div>
          </div>

          {/* Tabela de Classificação Geral de Arenas */}
          <div className="lg:col-span-12">
            <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
              <div className="flex items-center justify-between mb-4 border-b border-slate-50 pb-2.5">
                <div className="flex items-center gap-1.5">
                  <Building className="w-5 h-5 text-emerald-600 animate-pulse" />
                  <h3 className="font-extrabold text-slate-900 text-sm">Tabela de Classificação das Arenas</h3>
                </div>
                <span className="text-[10px] text-slate-400 font-mono">Ranking por engajamento e pontuação acumulada</span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-655">
                  <thead>
                    <tr className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-100 uppercase tracking-wider text-[9px]">
                      <th className="p-3 text-center w-12">Pos</th>
                      <th className="p-3">Arena / Local</th>
                      <th className="p-3 text-center">Partidas Hospedadas</th>
                      <th className="p-3 text-center text-teal-700 font-bold bg-teal-50/10">Pontos Acumulados</th>
                      <th className="p-3">Jogador Filiado Destaque</th>
                      <th className="p-3 text-center text-amber-600 font-bold bg-amber-50/20">Estrelas Ganhas</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {sortedArenas.map((arena, index) => {
                      const rankPos = index + 1;
                      const topAffiliated = getTopPlayerForArena(arena.id);

                      return (
                        <tr key={arena.id} className="hover:bg-emerald-50/5 transition-colors">
                          <td className="p-3 text-center font-bold text-slate-600 font-mono">
                            {rankPos === 1 ? '🏆' : rankPos === 2 ? '🥈' : rankPos === 3 ? '🥉' : `${rankPos}º`}
                          </td>
                          <td className="p-3">
                            <div>
                              <span className="text-slate-950 font-extrabold text-xs block leading-tight">{arena.name}</span>
                              <span className="text-[10px] text-slate-400 block font-mono">{arena.city}</span>
                            </div>
                          </td>
                          <td className="p-3 text-center font-mono font-medium text-slate-700">{arena.matchesPlayed}</td>
                          <td className="p-3 text-center font-mono font-black text-teal-800 text-xs bg-teal-50/10">{arena.totalPointsScored} pts</td>
                          <td className="p-3">
                            {topAffiliated.name ? (
                              <div className="flex items-center gap-1.5">
                                <img src={topAffiliated.photoUrl} className="w-6 h-6 rounded-full object-cover border border-slate-200 bg-slate-50" />
                                <div>
                                  <span className="text-slate-800 font-bold text-[11px] block">{topAffiliated.name}</span>
                                  <span className="text-[9px] text-slate-400 block font-mono">Aprov: {(topAffiliated.winRate * 100).toFixed(0)}%</span>
                                </div>
                              </div>
                            ) : (
                              <span className="text-slate-400 text-xs italic">Nenhum</span>
                            )}
                          </td>
                          <td className="p-3 text-center bg-amber-50/10 text-amber-600 font-black">
                            {renderStars(arena.id, 'arena') || <span className="text-slate-300 font-mono text-xs">-</span>}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Arenas Comparative & Temporal Evolution Row */}
          <div className="lg:col-span-12 grid grid-cols-1 xl:grid-cols-2 gap-5" id="tab-arenas-results-row">
            
            {/* LEFT: Distribution of Matches among Arenas */}
            <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between">
              <div>
                <span className="text-[9px] font-black uppercase tracking-widest text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md inline-block">Proporção Local</span>
                <h4 className="font-extrabold text-slate-800 text-xs uppercase tracking-wider block">Distribuição de Jogos por Arena</h4>
                <p className="text-[11px] text-slate-400 mt-1 mb-3.5 leading-relaxed">
                  Volume acumulado de hospitalidade para cada quadra de futevôlei associada no ano vigente. O gráfico ilustra o engajamento relativo de cada arena no circuito de 2026.
                </p>
                
                {/* Micro bar compare visual */}
                <div className="flex flex-col space-y-3.5 pt-1">
                  {sortedArenas.map((arena, i) => {
                    const colors = ['bg-emerald-500', 'bg-sky-500', 'bg-amber-500', 'bg-rose-500', 'bg-blue-500'];
                    const textColors = ['text-emerald-700 bg-emerald-50', 'text-sky-700 bg-sky-50', 'text-amber-700 bg-amber-50', 'text-rose-700 bg-rose-50', 'text-blue-700 bg-blue-50'];
                    const maxMatches = Math.max(...arenas.map(a => a.matchesPlayed), 1);
                    const percent = (arena.matchesPlayed / maxMatches) * 100;
                    
                    return (
                      <div key={arena.id} className="space-y-1">
                        <div className="flex justify-between items-center text-[10.5px]">
                          <span className="font-extrabold text-slate-800">{arena.name}</span>
                          <span className={`font-mono font-bold text-[9.5px] px-1.5 py-0.5 rounded ${textColors[i % textColors.length]}`}>{arena.matchesPlayed} partidas</span>
                        </div>
                        {/* Active Bar */}
                        <div className="w-full h-3 bg-slate-50 border border-slate-150 rounded-full overflow-hidden">
                          <div 
                            style={{ width: `${percent}%` }} 
                            className={`h-full ${colors[i % colors.length]} rounded-full transition-all duration-700`}
                          ></div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-4 border-t border-slate-50 mt-4">
                {sortedArenas.map((arena, i) => {
                  const colors = ['bg-emerald-500', 'bg-sky-500', 'bg-amber-500', 'bg-rose-500', 'bg-blue-500'];
                  return (
                    <div key={arena.id} className="flex items-center gap-1.5 text-[9.5px] font-bold text-slate-600 truncate">
                      <span className={`w-2 h-2 rounded-full shrink-0 ${colors[i % colors.length]}`}></span>
                      <span className="truncate">{arena.name.split(' ')[0]} {arena.name.split(' ')[1] || ''}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* RIGHT: Selected Arena Temporal Evolution & Fechamento */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between space-y-4">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-slate-100 pb-3">
                <div>
                  <h4 className="font-extrabold text-slate-800 text-xs uppercase tracking-wider block">Desempenho Temporal da Sede</h4>
                  <span className="text-[10px] text-slate-500 leading-tight block">Rendimento do plantel filiado por período na arena selecionada.</span>
                </div>
                {/* Selector Dropdown with high match quality styling */}
                <select
                  value={selectedArenaId}
                  onChange={(e) => setSelectedArenaId(e.target.value)}
                  className="p-1.5 bg-slate-50 border border-slate-300 rounded-lg text-[11px] font-bold text-slate-800 focus:outline-none focus:ring-1 focus:ring-emerald-500 shadow-sm cursor-pointer"
                >
                  {arenas.map(a => (
                    <option key={a.id} value={a.id}>{a.name}</option>
                  ))}
                </select>
              </div>

              <EvolutionStatsCard
                title={`Análise de Fechamento: ${activeArena.name}`}
                subtitle={`Evolução histórica do plantel filiado à sede`}
                dailyData={getArenaDailyData()}
                monthlyData={getArenaMonthlyData()}
                yearlyData={getArenaYearlyData()}
                accentColor="emerald"
              />
            </div>
            
          </div>

          {/* Grid list of comparative details of each of the 5 Arenas (12 cols) */}
          <div className="lg:col-span-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {arenas.map((arena, index) => {
              const matchesYear = arena.yearlyVictories['2026'] || 0;
              const topAffiliated = getTopPlayerForArena(arena.id);
              
              // Colors based on positions
              const bgColors = index % 5 === 0 
                ? 'from-emerald-500/10 to-teal-500/5 hover:from-emerald-500/15' 
                : index % 5 === 1 
                ? 'from-sky-500/10 to-indigo-500/5 hover:from-sky-500/15' 
                : index % 5 === 2 
                ? 'from-amber-500/10 to-orange-500/5 hover:from-amber-500/15'
                : index % 5 === 3 
                ? 'from-rose-500/10 to-purple-500/5 hover:from-rose-500/15'
                : 'from-blue-500/10 to-slate-500/5 hover:from-blue-500/15';

              return (
                <div 
                  key={arena.id} 
                  className={`bg-gradient-to-br ${bgColors} p-5 rounded-2xl border border-slate-200/40 hover:border-slate-350 transition-all shadow-sm flex flex-col justify-between space-y-4`}
                >
                  <div className="space-y-1.5">
                    <div className="flex justify-between items-start">
                      <span className="px-2 py-0.5 bg-slate-200/50 text-slate-700 text-[9px] font-bold rounded uppercase tracking-wider block">
                        Arena Ref: {arena.id.split('_')[1] || arena.id}
                      </span>
                      <span className="font-bold text-slate-800 text-xs font-mono">{arena.city.split(' ')[0]}</span>
                    </div>

                    <h4 className="font-extrabold text-slate-900 text-sm leading-tight flex items-center gap-1.5 flex-wrap">
                      <Building className="w-4 h-4 text-slate-650 shrink-0" />
                      <span>{arena.name}</span>
                      {renderStars(arena.id, 'arena')}
                    </h4>
                  </div>

                  {/* Core Statistics comparison */}
                  <div className="grid grid-cols-2 gap-2 border-y border-dashed border-slate-200/40 py-3 text-xs">
                    <div>
                      <span className="text-[9px] text-slate-500 block uppercase font-bold">Jogos Totais</span>
                      <strong className="text-slate-800 font-mono text-sm block font-bold">{arena.matchesPlayed}</strong>
                    </div>
                    <div>
                      <span className="text-[9px] text-slate-500 block uppercase font-semibold">Jogos Ano 2026</span>
                      <strong className="text-indigo-600 font-mono text-sm block font-bold">{matchesYear}</strong>
                    </div>
                  </div>

                  {/* Top athlete native to this arena */}
                  <div className="space-y-2 pt-1">
                    <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest block">⭐ Atleta Filiado Destaque</span>
                    {topAffiliated.photoUrl ? (
                      <div className="flex items-center gap-2">
                        <img src={topAffiliated.photoUrl} className="w-7 h-7 rounded-full object-cover border border-slate-200" />
                        <div>
                          <strong className="text-slate-800 text-[11px] block font-bold leading-tight">{topAffiliated.name}</strong>
                          <span className="text-[9.5px] text-slate-500 block">
                            Melhor WinRate: <strong className="text-emerald-600 font-bold">{(topAffiliated.winRate * 100).toFixed(0)}%</strong>
                          </span>
                        </div>
                      </div>
                    ) : (
                      <span className="text-[10px] text-slate-400 italic">Sem registros afiliados.</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      )}

      {/* VIEWPORT 4: TOURNEY HISTORY & COMPARATIVE DASHBOARD */}
      {activeTab === 'history_championships' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5" id="tab-history-championships">
          
          {/* Header Trophy Banner */}
          <div className="lg:col-span-12">
            <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-6 rounded-2xl text-white shadow-md relative overflow-hidden border border-indigo-500/20">
              <div className="absolute right-0 top-0 opacity-10 transform translate-x-12 -translate-y-12">
                <Trophy className="w-68 h-68 text-yellow-400" />
              </div>
              <div className="space-y-1.5 z-10 relative">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 bg-amber-500 text-slate-950 text-[9.5px] font-black uppercase rounded-lg tracking-wider">
                    Galeria de Estrelas & Linha do Tempo
                  </span>
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                  <span className="text-[10px] text-indigo-300 font-mono">Consórcio de Títulos</span>
                </div>
                <h3 className="font-extrabold text-xl flex items-center gap-2 tracking-tight">
                  🏆 Galeria de Campeões & Comparador Histórico
                </h3>
                <p className="text-xs text-indigo-150 max-w-2xl leading-relaxed">
                  Consulte conquistas do passado e simule a evolução do futevôlei. Os atletas, duplas e arenas acumulam 
                  <strong className="text-amber-400 font-bold"> estrelas douradas ★ estilo Brasileirão</strong> decorrentes de títulos anuais oficiais. Compare o progresso técnico em múltiplos horizontes.
                </p>
              </div>
            </div>
          </div>

          {/* YEAR SELECT BAR */}
          <div className="lg:col-span-12">
            <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
              <div>
                <h4 className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
                  <Trophy className="w-4.5 h-4.5 text-amber-500" />
                  <span>Anuário & Histórico Oficial da Liga Fut</span>
                </h4>
                <p className="text-[11px] text-slate-400">Filtre por ano para revisar as classificações oficiais de atletas, duplas e arenas do circuito.</p>
              </div>
              <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs">
                {['2024', '2025', '2026', '2027'].map((year) => (
                  <button
                    key={year}
                    onClick={() => setSelectedYear(year)}
                    className={`px-4 py-1.5 font-black rounded-lg transition-all cursor-pointer flex items-center gap-1 ${
                      selectedYear === year
                        ? 'bg-amber-500 text-slate-950 shadow-sm'
                        : 'text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    <span>{year}</span>
                    {year === '2026' && <span className="text-[8px] bg-red-500 text-white px-1 rounded animate-pulse">Ativo</span>}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* CLASSIFICATION GRID FOR SELECTED YEAR */}
          <div className="lg:col-span-12 grid grid-cols-1 lg:grid-cols-3 gap-5">
            {/* COLUMN 1: INDIVIDUAL */}
            <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex flex-col space-y-4">
              <div className="flex items-center justify-between border-b border-slate-55 pb-2">
                <div className="flex items-center gap-1.5">
                  <span className="p-1 bg-amber-55 rounded text-amber-600 font-bold text-xs">👤</span>
                  <h4 className="font-extrabold text-slate-850 text-xs uppercase tracking-wider">Atletas (Individual)</h4>
                </div>
                <span className="text-[9px] font-mono text-slate-400">Classificação {selectedYear}</span>
              </div>

              {/* Champion Hero Card */}
              {getYearlyClassification(selectedYear).players.filter(p => p.isChamp).map(p => (
                <div key={p.name} className="p-3 bg-gradient-to-r from-yellow-50 to-amber-50 border border-amber-250 rounded-xl relative overflow-hidden flex items-center gap-3">
                  <div className="absolute right-1 bottom-1 text-4xl opacity-15">🏆</div>
                  <div className="w-9 h-9 bg-amber-400 text-slate-950 rounded-full flex items-center justify-center font-black shadow text-sm shrink-0">
                    🥇
                  </div>
                  <div className="z-10 leading-snug">
                    <span className="text-[8.5px] uppercase font-black text-amber-800 tracking-wider flex items-center gap-1">
                      <span>Campeão do Ano</span>
                    </span>
                    <strong className="text-slate-950 text-xs font-black block">{p.name}</strong>
                    <span className="text-[9.5px] text-slate-500 font-medium block">
                      {p.points} pts • {p.wins}V ({p.note})
                    </span>
                  </div>
                </div>
              ))}

              {/* Leaderboard list */}
              <div className="overflow-x-auto flex-1">
                <table className="w-full text-left text-[11px] text-slate-600">
                  <thead className="bg-slate-50">
                    <tr className="text-[9px] uppercase tracking-wider font-bold text-slate-400 border-b border-slate-100">
                      <th className="p-2 text-center w-8">Pos</th>
                      <th className="p-2">Atleta</th>
                      <th className="p-2 text-center text-slate-900 font-bold">Pts</th>
                      <th className="p-2 text-center">Aprov.</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {getYearlyClassification(selectedYear).players.map((p, idx) => (
                      <tr key={p.name} className={`hover:bg-slate-50/50 ${p.isChamp ? 'bg-amber-50/10 font-semibold' : ''}`}>
                        <td className="p-2 text-center font-bold text-slate-500 font-mono">
                          {idx + 1}º
                        </td>
                        <td className="p-2 font-bold text-slate-800 truncate max-w-[120px]" title={p.name}>
                          {p.name}
                        </td>
                        <td className="p-2 text-center font-black text-slate-950 font-mono">{p.points}</td>
                        <td className="p-2 text-center font-mono text-slate-500">{(p.winRate * 100).toFixed(0)}%</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* COLUMN 2: DUPLAS */}
            <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex flex-col space-y-4">
              <div className="flex items-center justify-between border-b border-slate-55 pb-2">
                <div className="flex items-center gap-1.5">
                  <span className="p-1 bg-indigo-50 rounded text-indigo-650 font-bold text-xs">👥</span>
                  <h4 className="font-extrabold text-slate-850 text-xs uppercase tracking-wider">Duplas Campeãs</h4>
                </div>
                <span className="text-[9px] font-mono text-slate-400">Classificação {selectedYear}</span>
              </div>

              {/* Champion Hero Card */}
              {getYearlyClassification(selectedYear).duos.filter(d => d.isChamp).map(d => (
                <div key={d.name} className="p-3 bg-gradient-to-r from-indigo-50 to-slate-50 border border-indigo-200 rounded-xl relative overflow-hidden flex items-center gap-3">
                  <div className="absolute right-1 bottom-1 text-4xl opacity-15">👥</div>
                  <div className="w-9 h-9 bg-indigo-600 text-white rounded-full flex items-center justify-center font-black shadow text-sm shrink-0">
                    🏆
                  </div>
                  <div className="z-10 leading-snug">
                    <span className="text-[8.5px] uppercase font-black text-indigo-700 tracking-wider flex items-center gap-1">
                      <span>Dupla Campeã</span>
                    </span>
                    <strong className="text-slate-950 text-xs font-black block">{d.name}</strong>
                    <span className="text-[9.5px] text-slate-500 font-medium block">
                      {d.points} pts • {d.wins}V ({d.note})
                    </span>
                  </div>
                </div>
              ))}

              {/* Leaderboard list */}
              <div className="overflow-x-auto flex-1">
                <table className="w-full text-left text-[11px] text-slate-600">
                  <thead className="bg-slate-50">
                    <tr className="text-[9px] uppercase tracking-wider font-bold text-slate-400 border-b border-slate-100">
                      <th className="p-2 text-center w-8">Pos</th>
                      <th className="p-2">Dupla</th>
                      <th className="p-2 text-center text-slate-900 font-bold">Pts</th>
                      <th className="p-2 text-center">Aprov.</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {getYearlyClassification(selectedYear).duos.map((d, idx) => (
                      <tr key={d.name} className={`hover:bg-slate-50/50 ${d.isChamp ? 'bg-indigo-50/10 font-semibold' : ''}`}>
                        <td className="p-2 text-center font-bold text-slate-500 font-mono">
                          {idx + 1}º
                        </td>
                        <td className="p-2 font-bold text-slate-800 truncate max-w-[120px]" title={d.name}>
                          {d.name}
                        </td>
                        <td className="p-2 text-center font-black text-indigo-700 font-mono">{d.points}</td>
                        <td className="p-2 text-center font-mono text-slate-500">{(d.winRate * 100).toFixed(0)}%</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* COLUMN 3: ARENAS */}
            <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex flex-col space-y-4">
              <div className="flex items-center justify-between border-b border-slate-55 pb-2">
                <div className="flex items-center gap-1.5">
                  <span className="p-1 bg-emerald-50 rounded text-emerald-650 font-bold text-xs">🏟️</span>
                  <h4 className="font-extrabold text-slate-850 text-xs uppercase tracking-wider">Arenas (Sedes)</h4>
                </div>
                <span className="text-[9px] font-mono text-slate-400">Classificação {selectedYear}</span>
              </div>

              {/* Champion Hero Card */}
              {getYearlyClassification(selectedYear).arenas.filter(a => a.isChamp).map(a => (
                <div key={a.name} className="p-3 bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-250 rounded-xl relative overflow-hidden flex items-center gap-3">
                  <div className="absolute right-1 bottom-1 text-4xl opacity-15">🏟️</div>
                  <div className="w-9 h-9 bg-emerald-500 text-white rounded-full flex items-center justify-center font-black shadow text-sm shrink-0">
                    ⭐
                  </div>
                  <div className="z-10 leading-snug">
                    <span className="text-[8.5px] uppercase font-black text-emerald-700 tracking-wider flex items-center gap-1">
                      <span>Sede Campeã</span>
                    </span>
                    <strong className="text-slate-950 text-xs font-black block">{a.name}</strong>
                    <span className="text-[9.5px] text-slate-500 font-medium block">
                      {a.points} pts • {a.matches} jogos ({a.note})
                    </span>
                  </div>
                </div>
              ))}

              {/* Leaderboard list */}
              <div className="overflow-x-auto flex-1">
                <table className="w-full text-left text-[11px] text-slate-600">
                  <thead className="bg-slate-50">
                    <tr className="text-[9px] uppercase tracking-wider font-bold text-slate-400 border-b border-slate-100">
                      <th className="p-2 text-center w-8">Pos</th>
                      <th className="p-2">Arena</th>
                      <th className="p-2 text-center text-slate-900 font-bold">Pts</th>
                      <th className="p-2 text-center">Stars</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {getYearlyClassification(selectedYear).arenas.map((a, idx) => (
                      <tr key={a.name} className={`hover:bg-slate-50/50 ${a.isChamp ? 'bg-emerald-50/10 font-semibold' : ''}`}>
                        <td className="p-2 text-center font-bold text-slate-500 font-mono">
                          {idx + 1}º
                        </td>
                        <td className="p-2 font-bold text-slate-800 truncate max-w-[120px]" title={a.name}>
                          {a.name}
                        </td>
                        <td className="p-2 text-center font-black text-emerald-850 font-mono">{a.points}</td>
                        <td className="p-2 text-center font-mono text-amber-500 font-bold">
                          {a.stars > 0 ? '★'.repeat(a.stars) : '-'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* GLOBAL winner star ledger hall of fame */}
          <div className="lg:col-span-12 bg-amber-50/45 border border-amber-200/60 p-4 rounded-xl">
            <div className="flex items-center gap-2 mb-2.5">
              <span className="text-[11px] font-black uppercase text-amber-900 bg-amber-100 px-2.5 py-0.5 rounded">Consórcio de Estrelas da Liga Fut</span>
              <span className="text-[9.5px] text-amber-800 font-bold font-mono">Quadro Geral de Titulados</span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-center">
              <div className="bg-white p-2.5 border border-slate-100 rounded-lg shadow-sm">
                <span className="text-[10px] text-slate-500 block truncate">Sofia 'Shark'</span>
                <strong className="text-amber-600 font-mono font-black text-xs block">★ (2024) • ★★ (Dupla 2024/2026)</strong>
              </div>
              <div className="bg-white p-2.5 border border-slate-100 rounded-lg shadow-sm">
                <span className="text-[10px] text-slate-500 block truncate">Bruna 'Defesa'</span>
                <strong className="text-amber-600 font-mono font-black text-xs block">★★ (Dupla 2024/2026)</strong>
              </div>
              <div className="bg-white p-2.5 border border-slate-100 rounded-lg shadow-sm">
                <span className="text-[10px] text-slate-500 block truncate">Diego Santos</span>
                <strong className="text-amber-600 font-mono font-black text-xs block">★ (2025) • ★ (Dupla 2025)</strong>
              </div>
              <div className="bg-white p-2.5 border border-slate-100 rounded-lg shadow-sm">
                <span className="text-[10px] text-slate-500 block truncate">Arena Pântano</span>
                <strong className="text-indigo-650 font-mono font-black text-xs block">★ (2025) • ★ (2027 Proj.)</strong>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Interactive Selector & Comparison Graph (5 cols) */}
          <div className="lg:col-span-12 xl:col-span-12 flex flex-col space-y-5">
            <div className="bg-white p-5 rounded-2xl border border-slate-150 shadow-sm space-y-4">
              
              {/* Controls Grid */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-4">
                <div className="space-y-0.5">
                  <h4 className="font-extrabold text-slate-900 text-sm flex items-center gap-1.5">
                    <ArrowUpDown className="w-4 h-4 text-indigo-600 shrink-0" />
                    <span>Comparador Coletivo Interativo</span>
                  </h4>
                  <p className="text-[10.5px] text-slate-400">Escolha o tipo de agente, as entidades e o horizonte para gerar o fechamento.</p>
                </div>

                {/* Scope selector */}
                <div className="flex bg-slate-50 p-1 rounded-xl border border-slate-200 select-none text-[10.5px]">
                  <button 
                    onClick={() => { setCompCategory('individual'); setCompItemA(''); setCompItemB(''); }}
                    className={`px-3 py-1 font-bold rounded-lg transition-all cursor-pointer ${compCategory === 'individual' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                  >
                    Atletas
                  </button>
                  <button 
                    onClick={() => { setCompCategory('duo'); setCompItemA(''); setCompItemB(''); }}
                    className={`px-3 py-1 font-bold rounded-lg transition-all cursor-pointer ${compCategory === 'duo' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                  >
                    Duplas
                  </button>
                  <button 
                    onClick={() => { setCompCategory('arena'); setCompItemA(''); setCompItemB(''); }}
                    className={`px-3 py-1 font-bold rounded-lg transition-all cursor-pointer ${compCategory === 'arena' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                  >
                    Arenas
                  </button>
                </div>
              </div>

              {/* Selections configuration */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-slate-50 rounded-xl border border-slate-100 text-xs">
                
                {/* Entidade A selector */}
                <div className="space-y-1">
                  <label className="block text-[9.5px] font-black text-rose-600 uppercase tracking-wider">🔴 Entidade Comparativa A</label>
                  <select 
                    value={activeCompItemAId} 
                    onChange={(e) => setCompItemA(e.target.value)}
                    className="w-full p-2 bg-white border border-slate-250 rounded-lg font-bold text-slate-800 focus:outline-none cursor-pointer shadow-sm"
                  >
                    {compItems.map(item => (
                      <option key={item.id} value={item.id}>{item.name}</option>
                    ))}
                  </select>
                </div>

                {/* Entidade B selector */}
                <div className="space-y-1">
                  <label className="block text-[9.5px] font-black text-blue-600 uppercase tracking-wider">🔵 Entidade Comparativa B</label>
                  <select 
                    value={activeCompItemBId} 
                    onChange={(e) => setCompItemB(e.target.value)}
                    className="w-full p-2 bg-white border border-slate-250 rounded-lg font-bold text-slate-800 focus:outline-none cursor-pointer shadow-sm"
                  >
                    {compItems.filter(item => item.id !== activeCompItemAId).map(item => (
                      <option key={item.id} value={item.id}>{item.name}</option>
                    ))}
                    {compItems.filter(item => item.id === activeCompItemAId).map(item => (
                      <option key={item.id} value={item.id} disabled>{item.name} (Selecionado em A)</option>
                    ))}
                  </select>
                </div>

                {/* Timeframe picker */}
                <div className="space-y-1">
                  <label className="block text-[9.5px] font-black text-slate-500 uppercase tracking-wider">📅 Intervalo Temporal</label>
                  <div className="grid grid-cols-3 gap-1 bg-white p-1 rounded-lg border border-slate-200">
                    <button 
                      onClick={() => setCompTimeframe('daily')}
                      className={`py-1 text-center font-bold rounded text-[9.5px] transition-all cursor-pointer ${compTimeframe === 'daily' ? 'bg-indigo-100 text-indigo-700' : 'text-slate-500 hover:bg-slate-50'}`}
                    >
                      Diário
                    </button>
                    <button 
                      onClick={() => setCompTimeframe('monthly')}
                      className={`py-1 text-center font-bold rounded text-[9.5px] transition-all cursor-pointer ${compTimeframe === 'monthly' ? 'bg-indigo-100 text-indigo-700' : 'text-slate-500 hover:bg-slate-50'}`}
                    >
                      Mensal
                    </button>
                    <button 
                      onClick={() => setCompTimeframe('yearly')}
                      className={`py-1 text-center font-bold rounded text-[9.5px] transition-all cursor-pointer ${compTimeframe === 'yearly' ? 'bg-indigo-100 text-indigo-700' : 'text-slate-500 hover:bg-slate-50'}`}
                    >
                      Anual
                    </button>
                  </div>
                </div>

                {/* Metric picker */}
                <div className="space-y-1">
                  <label className="block text-[9.5px] font-black text-slate-500 uppercase tracking-wider">🎯 Métrica Analisada</label>
                  <select 
                    value={activeMetric}
                    onChange={(e) => setCompMetric(e.target.value as any)}
                    className="w-full p-2 bg-white border border-slate-250 rounded-lg font-bold text-indigo-950 focus:outline-none cursor-pointer shadow-sm"
                  >
                    {categoryMetrics.map(m => (
                      <option key={m.id} value={m.id}>{m.label}</option>
                    ))}
                  </select>
                </div>

              </div>

              {/* Dynamic Grouped Column Bar Chart with CSS Flex Layout */}
              <div className="p-5 border border-slate-100 rounded-xl space-y-5">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 text-xs">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1.5">
                      <span className="w-3 h-3 bg-rose-500 rounded-full inline-block"></span>
                      <span className="text-slate-700 font-bold">A: {compItems.find(i => i.id === activeCompItemAId)?.name || 'Item A'}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="w-3 h-3 bg-blue-500 rounded-full inline-block"></span>
                      <span className="text-slate-700 font-bold">B: {compItems.find(i => i.id === activeCompItemBId)?.name || 'Item B'}</span>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 bg-indigo-50 border border-indigo-100 text-indigo-700 rounded font-mono text-[9.5px] font-bold">
                    Eixo Y: {getMetricLabel()}
                  </span>
                </div>

                {/* The Graphic Stage */}
                <div className="h-64 flex items-end justify-between border-b border-l border-slate-200/90 pb-2 pl-3 pt-6 w-full gap-2 sm:gap-6">
                  {getComparisonData().map((item, index) => {
                    const heightPercentA = maxChartVal > 0 ? (item.valA / maxChartVal) * 90 : 5;
                    const heightPercentB = maxChartVal > 0 ? (item.valB / maxChartVal) * 90 : 5;

                    return (
                      <div key={index} className="flex-1 flex flex-col items-center justify-end h-full group/col min-w-[40px]">
                        
                        {/* Pair of Side-by-Side group columns */}
                        <div className="w-full h-full flex items-end justify-center gap-1.5">
                          
                          {/* Column A */}
                          <div 
                            style={{ height: `${Math.max(heightPercentA, 2.5)}%` }}
                            className="w-[18px] sm:w-[24px] bg-gradient-to-t from-rose-600 to-rose-400 hover:from-rose-500 hover:to-rose-300 rounded-t-md transition-all duration-500 shadow-sm relative group cursor-help flex items-end justify-center pb-1 text-[8.5px] text-white font-mono font-bold"
                          >
                            <span className="opacity-0 group-hover:opacity-100 bg-slate-900 text-white text-[9px] font-bold py-1 px-1.5 rounded absolute -top-8 left-1/2 transform -translate-x-1/2 transition-opacity shadow-md pointer-events-none z-10 whitespace-nowrap">
                              {item.valA}{activeMetric === 'win_rate' ? '%' : ''}
                            </span>
                            <span className="text-[7.5px] sm:text-[9px] text-white/90 drop-shadow mb-1 select-none">
                              {item.valA}
                            </span>
                          </div>

                          {/* Column B */}
                          <div 
                            style={{ height: `${Math.max(heightPercentB, 2.5)}%` }}
                            className="w-[18px] sm:w-[24px] bg-gradient-to-t from-blue-600 to-blue-400 hover:from-blue-500 hover:to-blue-300 rounded-t-md transition-all duration-500 shadow-sm relative group cursor-help flex items-end justify-center pb-1 text-[8.5px] text-white font-mono font-bold"
                          >
                            <span className="opacity-0 group-hover:opacity-100 bg-slate-900 text-white text-[9px] font-bold py-1 px-1.5 rounded absolute -top-8 left-1/2 transform -translate-x-1/2 transition-opacity shadow-md pointer-events-none z-10 whitespace-nowrap">
                              {item.valB}{activeMetric === 'win_rate' ? '%' : ''}
                            </span>
                            <span className="text-[7.5px] sm:text-[9px] text-white/90 drop-shadow mb-1 select-none">
                              {item.valB}
                            </span>
                          </div>

                        </div>

                        {/* Label below */}
                        <div className="text-[9px] sm:text-[10px] font-bold text-slate-500 mt-2 text-center truncate w-full select-none">
                          {item.label}
                        </div>

                      </div>
                    );
                  })}
                </div>

                {/* Analytical summary card inside graph */}
                <div className="bg-slate-50/75 p-3 rounded-lg border border-slate-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 text-xs mb-1">
                  <div className="space-y-0.5">
                    <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider block">Estudo Comparativo de Rendimento</span>
                    <p className="text-[10.5px] text-slate-600 leading-snug">
                      Ao longo do horizonte de <strong className="text-slate-800">{compTimeframe === 'daily' ? 'Dias Ativos' : compTimeframe === 'monthly' ? 'Meses de Competição' : 'Anos de Temporada'}</strong>, o critério de <strong className="text-slate-800">{getMetricLabel()}</strong> demonstra a consistência de jogo de ambas as entidades.
                    </p>
                  </div>
                  
                  {/* Delta indicator */}
                  <div className="bg-white border border-slate-200/60 px-3 py-1.5 rounded-lg text-right shrink-0">
                    <span className="text-[8px] text-slate-400 block uppercase font-bold">Média do Período</span>
                    <strong className="text-indigo-950 font-semibold font-mono text-[11px] block">
                      A: {Math.round(getComparisonData().reduce((acc, d) => acc + d.valA, 0) / getComparisonData().length)}{activeMetric === 'win_rate' ? '%' : ''} vs B: {Math.round(getComparisonData().reduce((acc, d) => acc + d.valB, 0) / getComparisonData().length)}{activeMetric === 'win_rate' ? '%' : ''}
                    </strong>
                  </div>
                </div>

              </div>
              
            </div>
          </div>

        </div>
      )}

    </div>
  );
}
