/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Player, Duo, Arena, Match } from '../types';
import { 
  Bell, 
  Flame, 
  TrendingUp, 
  TrendingDown, 
  UserPlus, 
  Calendar, 
  Trophy, 
  Award, 
  Zap, 
  AlertTriangle 
} from 'lucide-react';

interface DynamicNotificationsProps {
  currentUser: Player;
  players: Player[];
  duos: Duo[];
  arenas: Arena[];
  matches: Match[];
}

export default function DynamicNotifications({
  currentUser,
  players,
  duos,
  arenas,
  matches
}: DynamicNotificationsProps) {
  
  // 1. Calculate General Ranking Position & Neighbor Competitors
  const rankedPlayers = [...players].sort((a, b) => {
    if (b.points !== a.points) return b.points - a.points;
    return b.winRate - a.winRate;
  });
  
  const myRankIndex = rankedPlayers.findIndex(p => p.id === currentUser.id);
  const myRankPosition = myRankIndex + 1;
  
  // Who is directly above us? (Overtook us or is ahead of us)
  const competitorAbove = myRankIndex > 0 ? rankedPlayers[myRankIndex - 1] : null;
  // Who is directly below us? (Close to overtaking us)
  const competitorBelow = myRankIndex < rankedPlayers.length - 1 ? rankedPlayers[myRankIndex + 1] : null;

  // 2. High Frequency check
  const playersSortedByFrequency = [...players].sort((a, b) => b.presenceDays - a.presenceDays);
  const mostActivePlayer = playersSortedByFrequency[0];
  const secondMostActivePlayer = playersSortedByFrequency[1] || mostActivePlayer;
  
  // 3. Low attendance alerts
  // Ideal frequency is at least 3 active presenceDays
  const hasLowFrequency = currentUser.presenceDays <= 2;

  // Let's check when the last match of the current user was to give a "you haven't played this week" alert
  const sortedMatchesWithMe = [...matches]
    .filter(m => m.status === 'validated' && m.playerIds.includes(currentUser.id))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  
  const lastMatch = sortedMatchesWithMe[0];
  let daysSinceLastMatch = 99;
  if (lastMatch) {
    const diffTime = Math.abs(new Date('2026-06-04').getTime() - new Date(lastMatch.date).getTime());
    daysSinceLastMatch = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }

  // 4. Duo analysis for competition
  // Find duos that belong to the current user
  const myDuos = duos.filter(d => d.playerIds.includes(currentUser.id));
  const bestMyDuo = [...myDuos].sort((a, b) => b.points - a.points)[0];
  
  // Best overall duo in the entire ranking (representing the top benchmark duo)
  const topCircuitDuo = [...duos].sort((a, b) => {
    if (b.points !== a.points) return b.points - a.points;
    return b.winRate - a.winRate;
  })[0];

  // 5. Build list of alerts!
  const notifications: {
    id: string;
    type: 'warning' | 'info' | 'danger' | 'success' | 'stimu';
    badge: string;
    title: string;
    description: string;
    icon: React.ReactNode;
  }[] = [];

  // Core 1: Alert on rankings overtakes
  if (competitorAbove) {
    // If the competitor is extremely close (e.g., within 5 points ahead or higher winRate)
    const ptDiff = competitorAbove.points - currentUser.points;
    if (ptDiff > 0) {
      notifications.push({
        id: 'overtaken_by_above',
        type: 'danger',
        badge: 'Gatilho de Ultrapassagem',
        title: `O jogador ${competitorAbove.name} ultrapassou você!`,
        description: `Ele está em #${myRankPosition - 1} colocado com ${competitorAbove.points} pts. Você tem ${currentUser.points} pts. Vença a próxima partida para ultrapassá-lo em pontos/vitórias!`,
        icon: <TrendingDown className="w-4 h-4 text-rose-500 shrink-0" />
      });
    } else {
      // Points are equal, but competitorabove is higher due to winRate (or secondary tiebreaker)
      notifications.push({
        id: 'tied_by_winrate',
        type: 'warning',
        badge: 'Desempate Técnico',
        title: `${competitorAbove.name} está na sua frente pelo aproveitamento!`,
        description: `Vocês empatam com ${currentUser.points} pts, mas ele ultrapassou você no critério de aproveitamento (${(competitorAbove.winRate * 100).toFixed(0)}% vs ${(currentUser.winRate * 100).toFixed(0)}%). Garanta vitória no próximo jogo!`,
        icon: <Award className="w-4 h-4 text-amber-500 shrink-0" />
      });
    }
  }

  if (competitorBelow) {
    const ptDiff = currentUser.points - competitorBelow.points;
    if (ptDiff <= 3) {
      notifications.push({
        id: 'breath_on_neck',
        type: 'warning',
        badge: 'Sinal de Alerta',
        title: `Cuidado! ${competitorBelow.name} está colado em você!`,
        description: `A diferença para ele é de apenas ${ptDiff} pontos (${currentUser.points} pts vs ${competitorBelow.points} pts). *Não perca o foco, ele está pronto para te passar esta semana!*`,
        icon: <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
      });
    }
  }

  // Core 2: Alert on low attendance / frequency warnings
  if (daysSinceLastMatch > 5 || hasLowFrequency) {
    notifications.push({
      id: 'low_attendance_warning',
      type: 'warning',
      badge: 'Alerta de Presença',
      title: 'Ausência Recente detectada!',
      description: `*Você não compareceu às quadras com frequência esta semana, está ficando para trás...* Total de presenças acumuladas: ${currentUser.presenceDays} dias. Reúna sua dupla preferida!`,
      icon: <Calendar className="w-4 h-4 text-rose-500 shrink-0" />
    });
  }

  // Core 3: High frequency of another player stimulus
  if (mostActivePlayer && mostActivePlayer.id !== currentUser.id) {
    notifications.push({
      id: 'high_freq_other_player',
      type: 'info',
      badge: 'Ritmo Quente',
      title: `Líder de Presença: ${mostActivePlayer.name} está voando!`,
      description: `O atleta registrou recorde de frequência com ${mostActivePlayer.presenceDays} dias de treinos e jogos homologados. Vamos tentar batê-lo essa semana?`,
      icon: <Flame className="w-4 h-4 text-emerald-500 shrink-0" />
    });
  }

  // Core 4: Head-to-head or competitive comparison of top disputed duos to stimulate a declining duo
  if (topCircuitDuo) {
    // If we have an active duo
    if (bestMyDuo) {
      const isDeclining = bestMyDuo.losses > bestMyDuo.wins || bestMyDuo.points < topCircuitDuo.points * 0.7;
      if (isDeclining && bestMyDuo.id !== topCircuitDuo.id) {
        notifications.push({
          id: 'duo_declining_stimulation',
          type: 'stimu',
          badge: 'Estímulo de Sinergia',
          title: `Estimule sua dupla com ${bestMyDuo.playerNames.find(n => !n.includes(currentUser.name.split(' ')[0])) || 'parceiro'}!`,
          description: `Seu melhor resultado em dupla tem ${bestMyDuo.wins}V - ${bestMyDuo.losses}D. A dupla líder ¹# ${topCircuitDuo.playerNames.join(' + ')} está dominando o ranking com ${topCircuitDuo.points} pts. *Mostre do que sua dupla é capaz e desafie novos oponentes!*`,
          icon: <Zap className="w-4 h-4 text-purple-500 shrink-0" />
        });
      } else {
        // Just standard competitive challenge
        notifications.push({
          id: 'duo_benchmark',
          type: 'stimu',
          badge: 'Meta de Duplas',
          title: 'Confronto entre as duplas mais disputadas!',
          description: `Sua dupla com ${bestMyDuo.playerNames.find(n => !n.includes(currentUser.name.split(' ')[0])) || 'parceiro'} está em #${bestMyDuo.points} pts. O topo é a dupla ${topCircuitDuo.playerNames.join(' + ')} (${topCircuitDuo.points} pts). Marquem uma nova rodada na Arena hoje!`,
          icon: <Trophy className="w-4 h-4 text-yellow-500 shrink-0" />
        });
      }
    } else {
      // Player doesn't have an established duo in the DB yet, stimulate them to form one!
      notifications.push({
        id: 'no_duo_warning',
        type: 'info',
        badge: 'Formação de Parceria',
        title: 'Você ainda não tem uma Dupla Consolidada!',
        description: `O futevôlei floresce com parceria. O ranking de duos é liderado por ${topCircuitDuo.playerNames.join(' + ')}. Chame um atleta parceiro e registre uma nova partida na aba 'Lançar Partida'.`,
        icon: <UserPlus className="w-4 h-4 text-indigo-500 shrink-0" />
      });
    }
  }

  // Core 5: Data-driven general triggers
  if (currentUser.totalMatches > 0) {
    const projectedWinrateIfWin = ((currentUser.wins + 1) / (currentUser.totalMatches + 1)) * 100;
    notifications.push({
      id: 'winrate_projection',
      type: 'success',
      badge: 'Estímulo Estatístico',
      title: 'Meta de Rendimento Técnico individual!',
      description: `Seu aproveitamento atual é de ${(currentUser.winRate * 100).toFixed(0)}%. Se garantir e homologar uma vitória na próxima partida, seu índice subirá para ${projectedWinrateIfWin.toFixed(0)}%!`,
      icon: <TrendingUp className="w-4 h-4 text-emerald-600 shrink-0" />
    });
  }

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 md:p-6 mb-6" id="athlete-notifications-center">
      <div className="flex items-center justify-between mb-4 border-b border-slate-800/80 pb-3">
        <div className="flex items-center gap-2">
          <span className="p-1.5 bg-indigo-950 border border-indigo-800 text-indigo-400 rounded-xl shrink-0 relative">
            <Bell className="w-4 h-4" />
            <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-rose-500 rounded-full animate-ping"></span>
            <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-rose-600 rounded-full"></span>
          </span>
          <div>
            <h3 className="font-extrabold text-white text-sm">💡 Central de Estímulos e Alertas do Atleta</h3>
            <p className="text-[10px] text-slate-400">Notificações e insights gerados em tempo real de acordo com as regras fiduciárias do futevôlei.</p>
          </div>
        </div>
        
        <span className="text-[8.5px] font-bold text-indigo-300 bg-indigo-950/80 border border-indigo-900/40 px-2 py-0.5 rounded-full uppercase tracking-wider">
          {notifications.length} Alertas
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4" id="notifications-grid-container">
        {notifications.map((notif) => {
          // Color styles depending on warning type
          let cardBorder = 'border-slate-800 bg-slate-950/40 hover:bg-slate-950/70';
          let badgeStyle = 'bg-slate-900 text-slate-400 border-slate-800/50';
          
          if (notif.type === 'danger') {
            cardBorder = 'border-rose-950 bg-rose-950/10 hover:bg-rose-950/15 border-l-4 border-l-rose-500';
            badgeStyle = 'bg-rose-950/40 text-rose-300 border-rose-900/30';
          } else if (notif.type === 'warning') {
            cardBorder = 'border-amber-950 bg-amber-950/8 hover:bg-amber-950/12 border-l-4 border-l-amber-500';
            badgeStyle = 'bg-amber-950/45 text-amber-300 border-amber-900/30';
          } else if (notif.type === 'success') {
            cardBorder = 'border-emerald-950 bg-emerald-950/8 hover:bg-emerald-950/12 border-l-4 border-l-emerald-500';
            badgeStyle = 'bg-emerald-950/45 text-emerald-300 border-emerald-900/30';
          } else if (notif.type === 'stimu') {
            cardBorder = 'border-purple-950 bg-purple-950/8 hover:bg-purple-950/12 border-l-4 border-l-purple-500';
            badgeStyle = 'bg-purple-950/40 text-purple-300 border-purple-900/30';
          }

          return (
            <div 
              key={notif.id} 
              className={`p-4 rounded-2xl border transition flex gap-3 items-start justify-between ${cardBorder}`}
              id={`notif-${notif.id}`}
            >
              <div className="flex gap-3 items-start">
                <div className="p-2 bg-slate-900 rounded-xl border border-slate-800 shrink-0 mt-0.5">
                  {notif.icon}
                </div>
                
                <div className="space-y-1">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className={`text-[8px] font-extrabold px-1.5 py-0.5 rounded uppercase border font-mono tracking-wider ${badgeStyle}`}>
                      {notif.badge}
                    </span>
                  </div>
                  <h4 className="text-white text-xs font-bold leading-tight">{notif.title}</h4>
                  <p className="text-[10px] text-slate-300 leading-relaxed font-sans italic">
                    {notif.description}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
