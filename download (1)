// notification_service
// 
// SPDF-License-Identifier: Apache-2.0
// Senior Flutter Developer: Notification and Motivation Core Processor for Athlete Gamification

import './models.dart';

class AthleteNotification {
  final String id;
  final String type; // 'warning' | 'info' | 'danger' | 'success' | 'stimu'
  final String badge;
  final String title;
  final String description;

  AthleteNotification({
    required this.id,
    required this.type,
    required this.badge,
    required this.title,
    required this.description,
  });
}

class AthleteNotificationService {
  static List<AthleteNotification> generateNotifications({
    required Player currentUser,
    required List<Player> players,
    required List<Duo> duos,
    required List<Arena> arenas,
    required List<Match> matches,
  }) {
    List<AthleteNotification> list = [];

    // 1. Calculate General Ranking Position & Neighbor Competitors
    final rankedPlayers = List<Player>.from(players)
      ..sort((a, b) {
        if (b.points != a.points) return b.points.compareTo(a.points);
        return b.winRate.compareTo(a.winRate);
      });

    final myRankIndex = rankedPlayers.indexWhere((p) => p.id == currentUser.id);
    final myRankPosition = myRankIndex != -1 ? myRankIndex + 1 : 1;

    // Who is directly above us?
    final competitorAbove = (myRankIndex > 0) ? rankedPlayers[myRankIndex - 1] : null;
    // Who is directly below us?
    final competitorBelow = (myRankIndex != -1 && myRankIndex < rankedPlayers.length - 1) 
        ? rankedPlayers[myRankIndex + 1] 
        : null;

    // 2. High Frequency check
    final playersSortedByFrequency = List<Player>.from(players)
      ..sort((a, b) => b.presenceDays.compareTo(a.presenceDays));
    final mostActivePlayer = playersSortedByFrequency.isNotEmpty ? playersSortedByFrequency[0] : null;

    // 3. Low attendance alerts
    final hasLowFrequency = currentUser.presenceDays <= 2;

    // Last match calculation
    final sortedMatchesWithMe = matches
        .where((m) => m.status == 'validated' && m.playerIds.contains(currentUser.id))
        .toList()
      ..sort((a, b) => b.date.compareTo(a.date));

    int daysSinceLastMatch = 99;
    if (sortedMatchesWithMe.isNotEmpty) {
      final lastMatchDate = DateTime.tryParse(sortedMatchesWithMe[0].date);
      if (lastMatchDate != null) {
        final referenceDate = DateTime(2026, 6, 4);
        daysSinceLastMatch = referenceDate.difference(lastMatchDate).inDays;
      }
    }

    // 4. Duo analyses
    final myDuos = duos.where((d) => d.playerIds.contains(currentUser.id)).toList();
    final bestMyDuo = myDuos.isNotEmpty 
        ? (myDuos..sort((a, b) => b.points.compareTo(a.points)))[0] 
        : null;

    final sortedAllDuos = List<Duo>.from(duos)
      ..sort((a, b) {
        if (b.points != a.points) return b.points.compareTo(a.points);
        return b.winRate.compareTo(a.winRate);
      });
    final topCircuitDuo = sortedAllDuos.isNotEmpty ? sortedAllDuos[0] : null;

    // --- ALERTS TRIGGER GENERATOR ---

    // Warning / Danger: Overtakes
    if (competitorAbove != null) {
      final ptDiff = competitorAbove.points - currentUser.points;
      if (ptDiff > 0) {
        list.add(AthleteNotification(
          id: 'overtaken_by_above',
          type: 'danger',
          badge: 'Gatilho de Ultrapassagem',
          title: 'O jogador ${competitorAbove.name} ultrapassou você!',
          description: 'Ele está em #${myRankPosition - 1} colocado com ${competitorAbove.points} pts. Você tem ${currentUser.points} pts. Vença a próxima partida para ultrapassá-lo em pontos/vitórias!',
        ));
      } else {
        list.add(AthleteNotification(
          id: 'tied_by_winrate',
          type: 'warning',
          badge: 'Desempate Técnico',
          title: '${competitorAbove.name} está na sua frente pelo aproveitamento!',
          description: 'Vocês empatam com ${currentUser.points} pts, mas ele ultrapassou você no critério de aproveitamento (${(competitorAbove.winRate * 100).toStringAsFixed(0)}% vs ${(currentUser.winRate * 100).toStringAsFixed(0)}%). Garanta vitória no próximo jogo!',
        ));
      }
    }

    if (competitorBelow != null) {
      final ptDiff = currentUser.points - competitorBelow.points;
      if (ptDiff <= 3) {
        list.add(AthleteNotification(
          id: 'breath_on_neck',
          type: 'warning',
          badge: 'Sinal de Alerta',
          title: 'Cuidado! ${competitorBelow.name} está colado em você!',
          description: 'A diferença para ele é de apenas $ptDiff pontos (${currentUser.points} pts vs ${competitorBelow.points} pts). Não perca o foco, ele está pronto para te passar esta semana!',
        ));
      }
    }

    // Low attendance / Frequency Alert
    if (daysSinceLastMatch > 5 || hasLowFrequency) {
      list.add(AthleteNotification(
        id: 'low_attendance_warning',
        type: 'warning',
        badge: 'Alerta de Presença',
        title: 'Ausência Recente detectada!',
        description: 'Você não compareceu às quadras com frequência esta semana, está ficando para trás... Total de presenças acumuladas: ${currentUser.presenceDays} dias. Reúna sua dupla preferida!',
      ));
    }

    // High frequency of another player stimulus
    if (mostActivePlayer != null && mostActivePlayer.id != currentUser.id) {
      list.add(AthleteNotification(
        id: 'high_freq_other_player',
        type: 'info',
        badge: 'Ritmo Quente',
        title: 'Líder de Presença: ${mostActivePlayer.name} está voando!',
        description: 'O atleta registrou recorde de frequência com ${mostActivePlayer.presenceDays} dias de treinos e jogos homologados. Vamos tentar batê-lo essa semana?',
      ));
    }

    // Duo benchmark / stimulation
    if (topCircuitDuo != null) {
      if (bestMyDuo != null) {
        final isDeclining = bestMyDuo.losses > bestMyDuo.wins || bestMyDuo.points < topCircuitDuo.points * 0.7;
        if (isDeclining && bestMyDuo.id != topCircuitDuo.id) {
          final partnerName = bestMyDuo.playerNames.firstWhere((name) => !name.contains(currentUser.name.split(' ')[0]), orElse: () => 'parceiro');
          list.add(AthleteNotification(
            id: 'duo_declining_stimulation',
            type: 'stimu',
            badge: 'Estímulo de Sinergia',
            title: 'Estimule sua dupla com $partnerName!',
            description: 'Seu melhor resultado em dupla tem ${bestMyDuo.wins}V - ${bestMyDuo.losses}D. A dupla líder #${topCircuitDuo.playerNames.join(' + ')} está dominando o ranking com ${topCircuitDuo.points} pts. Mostre do que sua dupla é capaz e desafie novos oponentes!',
          ));
        } else {
          list.add(AthleteNotification(
            id: 'duo_benchmark',
            type: 'stimu',
            badge: 'Meta de Duplas',
            title: 'Confronto entre as duplas mais disputadas!',
            description: 'Sua dupla com ${bestMyDuo.playerNames.firstWhere((name) => !name.contains(currentUser.name.split(' ')[0]), orElse: () => 'parceiro')} está acumulando pontos. O topo é a dupla ${topCircuitDuo.playerNames.join(' + ')} (${topCircuitDuo.points} pts). Marquem uma nova rodada na Arena hoje!',
          ));
        }
      } else {
        list.add(AthleteNotification(
          id: 'no_duo_warning',
          type: 'info',
          badge: 'Formação de Parceria',
          title: 'Você ainda não tem uma Dupla Consolidada!',
          description: 'O futevôlei floresce com parceria. O ranking de duos é liderado por ${topCircuitDuo.playerNames.join(' + ')}. Chame um atleta parceiro e registre uma nova partida na aba "Lançar Partida".',
        ));
      }
    }

    // Individual win rate projection model
    if (currentUser.totalMatches > 0) {
      final nextTotal = currentUser.totalMatches + 1;
      final projectedWinrateIfWin = ((currentUser.wins + 1) / nextTotal) * 100;
      list.add(AthleteNotification(
        id: 'winrate_projection',
        type: 'success',
        badge: 'Estímulo Estatístico',
        title: 'Meta de Rendimento Técnico individual!',
        description: 'Seu aproveitamento atual é de ${(currentUser.winRate * 100).toStringAsFixed(0)}%. Se garantir e homologar uma vitória na próxima partida, seu índice subirá para ${projectedWinrateIfWin.toStringAsFixed(0)}%!',
      ));
    }

    return list;
  }
}
