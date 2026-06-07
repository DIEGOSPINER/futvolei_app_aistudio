// dart_models
// 
// SPDF-License-Identifier: Apache-2.0
// Senior Flutter Developer Case Study: Circuit Sports NoSQL Models for Futevôlei ranking app with bilateral anti-fraud

import 'package:cloud_firestore/cloud_firestore.dart';

class Player {
  final String id;
  final String name;
  final String photoUrl;
  final String arenaId;
  final int wins;
  final int losses;
  final int totalMatches;
  final double winRate;
  final int points;
  final String createdAt;
  final int presenceDays;
  final List<String> presentDates;

  Player({
    required this.id,
    required this.name,
    required this.photoUrl,
    required this.arenaId,
    required this.wins,
    required this.losses,
    required this.totalMatches,
    required this.winRate,
    required this.points,
    required this.createdAt,
    required this.presenceDays,
    required this.presentDates,
  });

  factory Player.fromMap(Map<String, dynamic> map, String docId) {
    return Player(
      id: docId,
      name: map['name'] ?? '',
      photoUrl: map['photoUrl'] ?? '',
      arenaId: map['arenaId'] ?? '',
      wins: map['wins'] ?? 0,
      losses: map['losses'] ?? 0,
      totalMatches: map['totalMatches'] ?? 0,
      winRate: (map['winRate'] ?? 0.0).toDouble(),
      points: map['points'] ?? 0,
      createdAt: map['createdAt'] ?? '',
      presenceDays: map['presenceDays'] ?? 0,
      presentDates: List<String>.from(map['presentDates'] ?? []),
    );
  }

  Map<String, dynamic> toMap() {
    return {
      'name': name,
      'photoUrl': photoUrl,
      'arenaId': arenaId,
      'wins': wins,
      'losses': losses,
      'totalMatches': totalMatches,
      'winRate': winRate,
      'points': points,
      'createdAt': createdAt,
      'presenceDays': presenceDays,
      'presentDates': presentDates,
    };
  }

  factory Player.fromFirestore(DocumentSnapshot doc) {
    return Player.fromMap(doc.data() as Map<String, dynamic>, doc.id);
  }
}

class Duo {
  final String id;
  final List<String> playerIds;
  final List<String> playerNames;
  final List<String> photoUrls;
  final int wins;
  final int losses;
  final int totalMatches;
  final double winRate;
  final int points;
  final Map<String, int> yearlyWins;

  Duo({
    required this.id,
    required this.playerIds,
    required this.playerNames,
    required this.photoUrls,
    required this.wins,
    required this.losses,
    required this.totalMatches,
    required this.winRate,
    required this.points,
    required this.yearlyWins,
  });

  factory Duo.fromMap(Map<String, dynamic> map, String docId) {
    return Duo(
      id: docId,
      playerIds: List<String>.from(map['playerIds'] ?? []),
      playerNames: List<String>.from(map['playerNames'] ?? []),
      photoUrls: List<String>.from(map['photoUrls'] ?? []),
      wins: map['wins'] ?? 0,
      losses: map['losses'] ?? 0,
      totalMatches: map['totalMatches'] ?? 0,
      winRate: (map['winRate'] ?? 0.0).toDouble(),
      points: map['points'] ?? 0,
      yearlyWins: Map<String, int>.from(map['yearlyWins'] ?? {}),
    );
  }

  Map<String, dynamic> toMap() {
    return {
      'playerIds': playerIds,
      'playerNames': playerNames,
      'photoUrls': photoUrls,
      'wins': wins,
      'losses': losses,
      'totalMatches': totalMatches,
      'winRate': winRate,
      'points': points,
      'yearlyWins': yearlyWins,
    };
  }

  factory Duo.fromFirestore(DocumentSnapshot doc) {
    return Duo.fromMap(doc.data() as Map<String, dynamic>, doc.id);
  }
}

class Arena {
  final String id;
  final String name;
  final String city;
  final String imageUrl;
  final String createdAt;
  final int matchesPlayed;
  final int totalPointsScored;
  final String? topPlayerId;
  final String? topPlayerName;
  final Map<String, int> yearlyVictories;

  Arena({
    required this.id,
    required this.name,
    required this.city,
    required this.imageUrl,
    required this.createdAt,
    required this.matchesPlayed,
    required this.totalPointsScored,
    this.topPlayerId,
    this.topPlayerName,
    required this.yearlyVictories,
  });

  factory Arena.fromMap(Map<String, dynamic> map, String docId) {
    return Arena(
      id: docId,
      name: map['name'] ?? '',
      city: map['city'] ?? '',
      imageUrl: map['imageUrl'] ?? '',
      createdAt: map['createdAt'] ?? '',
      matchesPlayed: map['matchesPlayed'] ?? 0,
      totalPointsScored: map['totalPointsScored'] ?? 0,
      topPlayerId: map['topPlayerId'],
      topPlayerName: map['topPlayerName'],
      yearlyVictories: Map<String, int>.from(map['yearlyVictories'] ?? {}),
    );
  }

  Map<String, dynamic> toMap() {
    return {
      'name': name,
      'city': city,
      'imageUrl': imageUrl,
      'createdAt': createdAt,
      'matchesPlayed': matchesPlayed,
      'totalPointsScored': totalPointsScored,
      'topPlayerId': topPlayerId,
      'topPlayerName': topPlayerName,
      'yearlyVictories': yearlyVictories,
    };
  }

  factory Arena.fromFirestore(DocumentSnapshot doc) {
    return Arena.fromMap(doc.data() as Map<String, dynamic>, doc.id);
  }
}

class Match {
  final String id;
  final String date;
  final String arenaId;
  final String arenaName;
  final List<String> teamA;
  final List<String> teamB;
  final int scoreA;
  final int scoreB;
  final String winnerTeam; // 'A' | 'B'
  final String month; // 'YYYY-MM'
  final List<String> playerIds;
  final String status; // 'pending' | 'validated' | 'rejected'
  final String createdBy;
  final List<String> validatedBy;

  Match({
    required this.id,
    required this.date,
    required this.arenaId,
    required this.arenaName,
    required this.teamA,
    required this.teamB,
    required this.scoreA,
    required this.scoreB,
    required this.winnerTeam,
    required this.month,
    required this.playerIds,
    required this.status,
    required this.createdBy,
    required this.validatedBy,
  });

  factory Match.fromMap(Map<String, dynamic> map, String docId) {
    return Match(
      id: docId,
      date: map['date'] ?? '',
      arenaId: map['arenaId'] ?? '',
      arenaName: map['arenaName'] ?? '',
      teamA: List<String>.from(map['teamA'] ?? []),
      teamB: List<String>.from(map['teamB'] ?? []),
      scoreA: map['scoreA'] ?? 0,
      scoreB: map['scoreB'] ?? 0,
      winnerTeam: map['winnerTeam'] ?? 'A',
      month: map['month'] ?? '',
      playerIds: List<String>.from(map['playerIds'] ?? []),
      status: map['status'] ?? 'pending',
      createdBy: map['createdBy'] ?? '',
      validatedBy: List<String>.from(map['validatedBy'] ?? []),
    );
  }

  Map<String, dynamic> toMap() {
    return {
      'date': date,
      'arenaId': arenaId,
      'arenaName': arenaName,
      'teamA': teamA,
      'teamB': teamB,
      'scoreA': scoreA,
      'scoreB': scoreB,
      'winnerTeam': winnerTeam,
      'month': month,
      'playerIds': playerIds,
      'status': status,
      'createdBy': createdBy,
      'validatedBy': validatedBy,
    };
  }

  factory Match.fromFirestore(DocumentSnapshot doc) {
    return Match.fromMap(doc.data() as Map<String, dynamic>, doc.id);
  }
}

class MonthlyStat {
  final String month;
  final int wins;
  final int losses;
  final int points;

  MonthlyStat({
    required this.month,
    required this.wins,
    required this.losses,
    required this.points,
  });

  factory MonthlyStat.fromMap(Map<String, dynamic> map) {
    return MonthlyStat(
      month: map['month'] ?? '',
      wins: map['wins'] ?? 0,
      losses: map['losses'] ?? 0,
      points: map['points'] ?? 0,
    );
  }

  Map<String, dynamic> toMap() {
    return {
      'month': month,
      'wins': wins,
      'losses': losses,
      'points': points,
    };
  }
}
