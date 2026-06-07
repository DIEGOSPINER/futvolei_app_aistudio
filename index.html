// futevolei_app
// 
// SPDF-License-Identifier: Apache-2.0
// Senior Flutter Developer Showcase: Complete Futevôlei ranking app with bilateral anti-fraud matching React logic
// Uses Material 3, custom Dark Slate design, responsive grids, animations, and inline Firestore simulator.

import 'package:flutter/material.dart';
import 'package:flutter/foundation.dart';
import './models.dart';
import './notification_service.dart';

void main() {
  runApp(const FutevoleiApp());
}

/// Root widget of the application.
/// Sets up a modern premium Dark Theme (Slate/Indigo/Emeral/Rose)
class FutevoleiApp extends StatelessWidget {
  const FutevoleiApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Circuito Futevôlei Salvador',
      debugShowCheckedModeBanner: false,
      themeMode: ThemeMode.dark,
      darkTheme: ThemeData(
        useMaterial3: true,
        brightness: Brightness.dark,
        scaffoldBackgroundColor: const Color(0xFF0B0F19), // custom slate-950/deep navy
        primaryColor: const Color(0xFF6366F1), // indigo-500
        colorScheme: const ColorScheme.dark(
          primary: Color(0xFF6366F1),
          secondary: Color(0xFF10B981), // emerald-500
          surface: Color(0xFF151D30), // custom slate-900 card
          background: Color(0xFF0B0F19),
          error: Color(0xFFF43F5E), // rose-500
        ),
        textTheme: const TextTheme(
          displayMedium: TextStyle(fontFamily: 'Inter', fontWeight: FontWeight.bold, color: Colors.white),
          titleLarge: TextStyle(fontFamily: 'Inter', fontWeight: FontWeight.w800, letterSpacing: -0.5, color: Colors.white),
          titleMedium: TextStyle(fontFamily: 'Inter', fontWeight: FontWeight.bold, color: Colors.white),
          bodyLarge: TextStyle(fontFamily: 'Inter', color: Color(0xFFE2E8F0)),
          bodyMedium: TextStyle(fontFamily: 'Inter', color: Color(0xFF94A3B8)),
        ),
        cardTheme: CardTheme(
          color: const Color(0xFF151D30),
          elevation: 0,
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(20),
            side: const BorderSide(color: Color(0xFF1E293B), width: 1),
          ),
        ),
        appBarTheme: const AppBarTheme(
          backgroundColor: Color(0xFF0F172A),
          elevation: 0,
          scrolledUnderElevation: 0,
        ),
      ),
      home: const MainLayoutScreen(),
    );
  }
}

class MainLayoutScreen extends StatefulWidget {
  const MainLayoutScreen({super.key});

  @override
  State<MainLayoutScreen> createState() => _MainLayoutScreenState();
}

class _MainLayoutScreenState extends State<MainLayoutScreen> {
  // In-memory simulated database lists
  late List<Player> _players;
  late List<Arena> _arenas;
  late List<Duo> _duos;
  late List<Match> _matches;
  
  String _loggedPlayerId = 'usr_diego';
  final List<String> _simLogs = [];

  @override
  void initState() {
    super.initState();
    _initializeMockData();
  }

  void _initializeMockData() {
    _players = [
      Player(
        id: 'usr_diego',
        name: 'Diego Santos',
        photoUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=150',
        arenaId: 'arena_pantano',
        wins: 16,
        losses: 4,
        totalMatches: 20,
        winRate: 0.80,
        points: 52,
        createdAt: '2026-01-01T00:00:00Z',
        presenceDays: 12,
        presentDates: ['2026-06-01', '2026-06-02', '2026-06-03'],
      ),
      Player(
        id: 'usr_lucas',
        name: "Lucas 'Lob'",
        photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150',
        arenaId: 'arena_pantano',
        wins: 12,
        losses: 6,
        totalMatches: 18,
        winRate: 0.67,
        points: 42,
        createdAt: '2026-01-02T00:00:00Z',
        presenceDays: 9,
        presentDates: ['2026-06-01', '2026-06-03'],
      ),
      Player(
        id: 'usr_sofia',
        name: 'Sofia Alencar',
        photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150',
        arenaId: 'arena_marisol',
        wins: 15,
        losses: 5,
        totalMatches: 20,
        winRate: 0.75,
        points: 50,
        createdAt: '2026-01-03T00:00:00Z',
        presenceDays: 14,
        presentDates: ['2026-06-01', '2026-06-03'],
      ),
      Player(
        id: 'usr_pedro',
        name: 'Pedro Silva',
        photoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150',
        arenaId: 'arena_bpchoque',
        wins: 10,
        losses: 10,
        totalMatches: 20,
        winRate: 0.50,
        points: 40,
        createdAt: '2026-01-05T00:00:00Z',
        presenceDays: 8,
        presentDates: ['2026-06-01', '2026-06-02'],
      ),
      Player(
        id: 'usr_bruna',
        name: 'Bruna Lima',
        photoUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150',
        arenaId: 'arena_bpchoque',
        wins: 14,
        losses: 6,
        totalMatches: 20,
        winRate: 0.70,
        points: 48,
        createdAt: '2026-01-04T00:00:00Z',
        presenceDays: 11,
        presentDates: ['2026-06-02', '2026-06-03'],
      ),
      Player(
        id: 'usr_gabriel',
        name: 'Gabriel Costa',
        photoUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=150',
        arenaId: 'arena_marisol',
        wins: 11,
        losses: 9,
        totalMatches: 20,
        winRate: 0.55,
        points: 42,
        createdAt: '2026-01-06T00:00:00Z',
        presenceDays: 9,
        presentDates: ['2026-06-02', '2026-06-03'],
      )
    ];

    _arenas = [
      Arena(
        id: 'arena_pantano',
        name: 'Arena Pântano',
        city: 'Salvador - BA',
        imageUrl: '',
        createdAt: '2026-01-01',
        matchesPlayed: 45,
        totalPointsScored: 1220,
        yearlyVictories: {'2026': 45},
      ),
      Arena(
        id: 'arena_bpchoque',
        name: 'Arena BPCHOQUE',
        city: 'Salvador - BA',
        imageUrl: '',
        createdAt: '2026-01-02',
        matchesPlayed: 32,
        totalPointsScored: 890,
        yearlyVictories: {'2026': 32},
      ),
      Arena(
        id: 'arena_marisol',
        name: 'Arena Marisol',
        city: 'Salvador - BA',
        imageUrl: '',
        createdAt: '2026-01-03',
        matchesPlayed: 18,
        totalPointsScored: 512,
        yearlyVictories: {'2026': 18},
      )
    ];

    _duos = [
      Duo(
        id: 'usr_diego_usr_lucas',
        playerIds: ['usr_diego', 'usr_lucas'],
        playerNames: ['Diego Santos', "Lucas 'Lob'"],
        photoUrls: [
          'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=150',
          'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150'
        ],
        wins: 11,
        losses: 3,
        totalMatches: 14,
        winRate: 0.79,
        points: 36,
        yearlyWins: {'2026': 11},
      ),
      Duo(
        id: 'usr_bruna_usr_sofia',
        playerIds: ['usr_bruna', 'usr_sofia'],
        playerNames: ['Bruna Lima', 'Sofia Alencar'],
        photoUrls: [
          'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150',
          'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150'
        ],
        wins: 12,
        losses: 4,
        totalMatches: 16,
        winRate: 0.75,
        points: 40,
        yearlyWins: {'2026': 12},
      )
    ];

    _matches = [
      Match(
        id: 'match_1',
        date: '2026-06-01',
        arenaId: 'arena_pantano',
        arenaName: 'Arena Pântano',
        teamA: ['usr_diego', 'usr_lucas'],
        teamB: ['usr_sofia', 'usr_pedro'],
        scoreA: 18,
        scoreB: 15,
        winnerTeam: 'A',
        month: '2026-06',
        playerIds: ['usr_diego', 'usr_lucas', 'usr_sofia', 'usr_pedro'],
        status: 'validated',
        createdBy: 'usr_diego',
        validatedBy: ['usr_diego', 'usr_sofia'],
      ),
      Match(
        id: 'match_2',
        date: '2026-06-02',
        arenaId: 'arena_bpchoque',
        arenaName: 'Arena BPCHOQUE',
        teamA: ['usr_gabriel', 'usr_bruna'],
        teamB: ['usr_diego', 'usr_pedro'],
        scoreA: 11,
        scoreB: 18,
        winnerTeam: 'B',
        month: '2026-06',
        playerIds: ['usr_gabriel', 'usr_bruna', 'usr_diego', 'usr_pedro'],
        status: 'validated',
        createdBy: 'usr_pedro',
        validatedBy: ['usr_pedro', 'usr_bruna'],
      ),
      Match(
        id: 'match_pending_1',
        date: '2026-06-04',
        arenaId: 'arena_pantano',
        arenaName: 'Arena Pântano',
        teamA: ['usr_diego', 'usr_lucas'],
        teamB: ['usr_sofia', 'usr_bruna'],
        scoreA: 18,
        scoreB: 16,
        winnerTeam: 'A',
        month: '2026-06',
        playerIds: ['usr_diego', 'usr_lucas', 'usr_sofia', 'usr_bruna'],
        status: 'pending',
        createdBy: 'usr_diego',
        validatedBy: ['usr_diego'],
      ),
      Match(
        id: 'match_pending_2',
        date: '2026-06-04',
        arenaId: 'arena_bpchoque',
        arenaName: 'Arena BPCHOQUE',
        teamA: ['usr_gabriel', 'usr_pedro'],
        teamB: ['usr_diego', 'usr_lucas'],
        scoreA: 13,
        scoreB: 18,
        winnerTeam: 'B',
        month: '2026-06',
        playerIds: ['usr_gabriel', 'usr_pedro', 'usr_diego', 'usr_lucas'],
        status: 'pending',
        createdBy: 'usr_gabriel',
        validatedBy: ['usr_gabriel'],
      )
    ];
  }

  // Handle registration of a new Athlete inside simulated NoSQL DB
  void _onRegisterPlayer(String name, String arenaId, String photoUrl) {
    final String newId = 'usr_${DateTime.now().millisecondsSinceEpoch.toString().substring(8)}';
    final newPlayer = Player(
      id: newId,
      name: name,
      photoUrl: photoUrl,
      arenaId: arenaId,
      wins: 0,
      losses: 0,
      totalMatches: 0,
      winRate: 0.0,
      points: 0,
      createdAt: DateTime.now().toIso8601String(),
      presenceDays: 0,
      presentDates: [],
    );

    setState(() {
      _players.add(newPlayer);
      _loggedPlayerId = newId;
      _simLogs.insert(0, 'CREATE: /players/$newId successfully committed with root structure.');
    });

    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text('Atleta "$name" cadastrado e conectado!'),
        backgroundColor: Colors.indigoAccent,
      ),
    );
  }

  // Recording a match as PENDING validation
  void _onRecordMatch(Match match, List<String> logs) {
    setState(() {
      _matches.insert(0, match);
      _simLogs.clear();
      _simLogs.addAll(logs);
    });
  }

  // Simulated Bilateral runTransaction validation
  void _onValidateMatch(String matchId, String playerId) {
    final matchIndex = _matches.indexWhere((m) => m.id == matchId);
    if (matchIndex == -1) return;

    final original = _matches[matchIndex];
    if (original.validatedBy.contains(playerId)) return;

    final updatedValidatedBy = List<String>.from(original.validatedBy)..add(playerId);
    
    // Check if we achieved bilateral validation
    final teamAHasValidated = original.teamA.any((id) => updatedValidatedBy.contains(id));
    final teamBHasValidated = original.teamB.any((id) => updatedValidatedBy.contains(id));

    setState(() {
      _simLogs.clear();
      _simLogs.add('FIRESTORE_TRANSACTION: Initiating runTransaction() with Player ID: $playerId');
      
      if (teamAHasValidated && teamBHasValidated) {
        // Consensus achieved! Commit stats updates for participants
        final updatedMatch = Match(
          id: original.id,
          date: original.date,
          arenaId: original.arenaId,
          arenaName: original.arenaName,
          teamA: original.teamA,
          teamB: original.teamB,
          scoreA: original.scoreA,
          scoreB: original.scoreB,
          winnerTeam: original.winnerTeam,
          month: original.month,
          playerIds: original.playerIds,
          status: 'validated',
          createdBy: original.createdBy,
          validatedBy: updatedValidatedBy,
        );

        _matches[matchIndex] = updatedMatch;
        _simLogs.add('✓ STATUS ACHIEVED: Bilateral Validation verified! Releasing atomic mutations.');

        final teamAWon = original.winnerTeam == 'A';

        // 1. Update overall Player scores in state
        _players = _players.map((p) {
          if (!original.playerIds.contains(p.id)) return p;

          final onTeamA = original.teamA.contains(p.id);
          final isWinner = (onTeamA && teamAWon) || (!onTeamA && !teamAWon);
          
          final int wins = p.wins + (isWinner ? 1 : 0);
          final int losses = p.losses + (isWinner ? 0 : 1);
          final int total = p.totalMatches + 1;
          final int ptsReward = isWinner ? 3 : 1;
          final int nextPoints = p.points + ptsReward;

          final presentDates = List<String>.from(p.presentDates);
          if (!presentDates.contains(original.date)) {
            presentDates.add(original.date);
          }

          _simLogs.add('UPDATE: /players/${p.id} -> Wins=$wins, Losses=$losses, Pts=$nextPoints, Presences=${presentDates.length}');

          return Player(
            id: p.id,
            name: p.name,
            photoUrl: p.photoUrl,
            arenaId: p.arenaId,
            wins: wins,
            losses: losses,
            totalMatches: total,
            winRate: double.parse((wins / total).toStringAsFixed(2)),
            points: nextPoints,
            createdAt: p.createdAt,
            presenceDays: presentDates.length,
            presentDates: presentDates,
          );
        }).toList();

        // 2. Add or update Duo sinergy
        final duoIdA = (List<String>.from(original.teamA)..sort()).join('_');
        final duoIdB = (List<String>.from(original.teamB)..sort()).join('_');

        _updateDuoStats(duoIdA, original.teamA, teamAWon ? 3 : 1, teamAWon, original.date.split('-')[0]);
        _updateDuoStats(duoIdB, original.teamB, !teamAWon ? 3 : 1, !teamAWon, original.date.split('-')[0]);

        // 3. Update Arena played count
        _arenas = _arenas.map((a) {
          if (a.id != original.arenaId) return a;
          final matchesPlayed = a.matchesPlayed + 1;
          final totalPoints = a.totalPointsScored + (original.scoreA + original.scoreB);
          
          _simLogs.add('UPDATE: /arenas/${a.id} -> Count=$matchesPlayed, AccPoints=$totalPoints');
          
          return Arena(
            id: a.id,
            name: a.name,
            city: a.city,
            imageUrl: a.imageUrl,
            createdAt: a.createdAt,
            matchesPlayed: matchesPlayed,
            totalPointsScored: totalPoints,
            yearlyVictories: Map<String, int>.from(a.yearlyVictories)..update(original.date.split('-')[0], (v) => v + 1, ifAbsent: () => 1),
          );
        }).toList();

        _simLogs.add('TRANSACTION_COMMIT_SUCCESS: Atomic operations successfully finished without data collisions.');
      } else {
        // Just record individual signature pending opponent response
        _matches[matchIndex] = Match(
          id: original.id,
          date: original.date,
          arenaId: original.arenaId,
          arenaName: original.arenaName,
          teamA: original.teamA,
          teamB: original.teamB,
          scoreA: original.scoreA,
          scoreB: original.scoreB,
          winnerTeam: original.winnerTeam,
          month: original.month,
          playerIds: original.playerIds,
          status: 'pending',
          createdBy: original.createdBy,
          validatedBy: updatedValidatedBy,
        );
        _simLogs.add('UPDATE: Signature added for athlete $playerId. Still LOCKING points calculations until a counterpart oponente signs the scorecard.');
      }
    });

    ScaffoldMessenger.of(context).showSnackBar(
       SnackBar(
        content: Text(teamAHasValidated && teamBHasValidated ? 'Resultado Homologado e Pontuações Distribuidas!' : 'Presença assinada! Aguardando oponente.'),
        backgroundColor: Colors.emerald,
      ),
    );
  }

  void _updateDuoStats(String duoId, List<String> memberIds, int pointsAwarded, bool won, String year) {
    final existingIdx = _duos.indexWhere((d) => d.id == duoId);
    if (existingIdx != -1) {
      final old = _duos[existingIdx];
      final wins = old.wins + (won ? 1 : 0);
      final losses = old.losses + (won ? 0 : 1);
      final total = old.totalMatches + 1;
      
      setState(() {
        _duos[existingIdx] = Duo(
          id: old.id,
          playerIds: old.playerIds,
          playerNames: old.playerNames,
          photoUrls: old.photoUrls,
          wins: wins,
          losses: losses,
          totalMatches: total,
          winRate: double.parse((wins / total).toStringAsFixed(2)),
          points: old.points + pointsAwarded,
          yearlyWins: Map<String, int>.from(old.yearlyWins)..update(year, (v) => v + (won ? 1 : 0), ifAbsent: () => won ? 1 : 0),
        );
      });
    } else {
      final p1 = _players.firstWhere((p) => p.id == memberIds[0]);
      final p2 = _players.firstWhere((p) => p.id == memberIds[1]);
      
      setState(() {
        _duos.add(Duo(
          id: duoId,
          playerIds: memberIds,
          playerNames: [p1.name, p2.name],
          photoUrls: [p1.photoUrl, p2.photoUrl],
          wins: won ? 1 : 0,
          losses: won ? 0 : 1,
          totalMatches: 1,
          winRate: won ? 1.0 : 0.0,
          points: pointsAwarded,
          yearlyWins: {year: won ? 1 : 0},
        ));
      });
    }
  }

  void _onRejectMatch(String matchId, String playerId) {
    final matchIndex = _matches.indexWhere((m) => m.id == matchId);
    if (matchIndex == -1) return;

    setState(() {
      final original = _matches[matchIndex];
      _matches[matchIndex] = Match(
        id: original.id,
        date: original.date,
        arenaId: original.arenaId,
        arenaName: original.arenaName,
        teamA: original.teamA,
        teamB: original.teamB,
        scoreA: original.scoreA,
        scoreB: original.scoreB,
        winnerTeam: original.winnerTeam,
        month: original.month,
        playerIds: original.playerIds,
        status: 'rejected',
        createdBy: original.createdBy,
        validatedBy: original.validatedBy,
      );

      _simLogs.clear();
      _simLogs.add('🚨 SECURITY ALERT: Match contested and flagged as FRAUD by Athlete $playerId. Point values discarded.');
    });

    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(
        content: Text('Partida contestada! Bloqueio de fraude acionado.'),
        backgroundColor: Colors.redAccent,
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    final currentLoggedUser = _players.firstWhere((p) => p.id == _loggedPlayerId, orElse: () => _players[0]);

    return Scaffold(
      body: DefaultTabController(
        length: 4,
        child: Column(
          children: [
            // APP HEADER DESIGN PART
            _buildAppBarHeader(currentLoggedUser),

            // DYNAMIC TABS PANEL
            Expanded(
              child: TabBarView(
                children: [
                  // VIEW 1: ATHLETE INDIVIDUAL PROFILE (DEFAULT)
                  _buildAthleteProfileTab(currentLoggedUser),

                  // VIEW 2: LOG NEW MATCH SCREEN
                  _buildRecordMatchTab(currentLoggedUser),

                  // VIEW 3: LEADERBOARDS & RANKINGS
                  _buildRankingsTab(),

                  // VIEW 4: FIRESTORE SCHEMAS & SIM CONSOLE
                  _buildNoSqlConsoleTab(),
                ],
              ),
            ),
          ],
        ),
      ),
      bottomNavigationBar: Container(
        color: const Color(0xFF0F172A),
        border: const Border(top: BorderSide(color: Color(0xFF1E293B))),
        child: const SafeArea(
          child: TabBar(
            indicatorColor: Color(0xFF6366F1),
            labelColor: Color(0xFF6366F1),
            unselectedLabelColor: Color(0xFF94A3B8),
            labelStyle: TextStyle(fontSize: 10, fontWeight: FontWeight.bold),
            tabs: [
              Tab(icon: Icon(Icons.person, size: 20), text: 'Meu Perfil'),
              Tab(icon: Icon(Icons.add_circle_outline, size: 20), text: 'Lançar Jogo'),
              Tab(icon: Icon(Icons.leaderboard, size: 20), text: 'Rankings'),
              Tab(icon: Icon(Icons.terminal, size: 20), text: 'Logs NoSQL'),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildAppBarHeader(Player currentLoggedUser) {
    return Container(
      color: const Color(0xFF0F172A),
      padding: const EdgeInsets.only(top: 48, bottom: 16, start: 16, end: 16),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Row(
            children: [
              const Icon(Icons.bolt, color: Color(0xFF6366F1), size: 28),
              const SizedBox(width: 8),
              Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: const [
                  Text(
                    'CIRCUITO FUTEVÔLEI',
                    style: TextStyle(fontSize: 14, fontWeight: FontWeight.black, color: Colors.white, letterSpacing: 0.5),
                  ),
                  Text(
                    'Salvador — Mobile Flutter Core',
                    style: TextStyle(fontSize: 10, color: Color(0xFF6366F1), fontWeight: FontWeight.bold),
                  ),
                ],
              ),
            ],
          ),

          // SIMULATOR ATHLETE ACCORDION SWITCHER
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 2),
            decoration: BoxDecoration(
              color: const Color(0xFF1E293B),
              borderRadius: BorderRadius.circular(12),
              border: Border.all(color: const Color(0xFF334155)),
            ),
            child: DropdownButton<String>(
              value: _loggedPlayerId,
              dropdownColor: const Color(0xFF0F172A),
              underline: const SizedBox(),
              icon: const Icon(Icons.swap_horiz, color: Color(0xFF6366F1), size: 16),
              style: const TextStyle(fontSize: 11, fontWeight: FontWeight.bold, color: Colors.white),
              onChanged: (String? val) {
                if (val != null) {
                  setState(() {
                    _loggedPlayerId = val;
                  });
                }
              },
              items: _players.map<DropdownMenuItem<String>>((Player p) {
                return DropdownMenuItem<String>(
                  value: p.id,
                  child: Text(p.name.split(' ')[0]),
                );
              }).toList(),
            ),
          )
        ],
      ),
    );
  }

  Widget _buildAthleteProfileTab(Player currentUser) {
    // Generate inline notifications dynamically
    final notifs = AthleteNotificationService.generateNotifications(
      currentUser: currentUser,
      players: _players,
      duos: _duos,
      arenas: _arenas,
      matches: _matches,
    );

    // Filter pending scorecard confirmations for this player
    final pendingToValidate = _matches.where((m) {
      final isParticipant = m.playerIds.contains(currentUser.id);
      final validatedByMe = m.validatedBy.contains(currentUser.id);
      return m.status == 'pending' && isParticipant && !validatedByMe;
    }).toList();

    return SingleChildScrollView(
      padding: const EdgeInsets.all(16),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // 1. ATHLETE CARD HEADER
          _buildAthleteCoverCard(currentUser),
          const SizedBox(height: 16),

          // 2. DYNAMIC NOTIFICATIONS / STIMULATION PANELS
          if (notifs.isNotEmpty) ...[
            const Row(
              children: [
                Icon(Icons.lightbulb_outline, color: Color(0xFF6366F1), size: 16),
                SizedBox(width: 6),
                Text(
                  'ESTÍMULOS E INSIGHTS DE RANKING',
                  style: TextStyle(fontSize: 10, fontWeight: FontWeight.black, color: Colors.white, letterSpacing: 1),
                ),
              ],
            ),
            const SizedBox(height: 8),
            _buildHorizontalNotificationsCenter(notifs),
            const SizedBox(height: 20),
          ],

          // 3. CAIXA DE CONFIRMAÇÃO ANTI-FRAUDE
          const Row(
            children: [
              Icon(Icons.shield_outlined, color: Color(0xFFF43F5E), size: 16),
              SizedBox(width: 6),
              Text(
                'HOMOLOGAÇÃO DE PLACARES (ANTI-FRAUDE)',
                style: TextStyle(fontSize: 10, fontWeight: FontWeight.black, color: Colors.white, letterSpacing: 1),
              ),
            ],
          ),
          const SizedBox(height: 8),
          _buildBilateralHomologationBox(pendingToValidate, currentUser),
          const SizedBox(height: 24),

          // 4. PLAYER METRICS BENTO GRID
          const Row(
            children: [
              Icon(Icons.query_stats, color: Color(0xFF10B981), size: 16),
              SizedBox(width: 6),
              Text(
                'Rendimento Técnico Individual',
                style: TextStyle(fontSize: 10, fontWeight: FontWeight.black, color: Colors.white, letterSpacing: 1),
              ),
            ],
          ),
          const SizedBox(height: 10),
          _buildStatsBentoGrid(currentUser),
        ],
      ),
    );
  }

  Widget _buildAthleteCoverCard(Player p) {
    final myArena = _arenas.firstWhere((a) => a.id == p.arenaId, orElse: () => _arenas[0]);
    return Container(
      padding: const EdgeInsets.all(20),
      decoration: BoxDecoration(
        color: const Color(0xFF151D30),
        borderRadius: BorderRadius.circular(24),
        border: Border.all(color: const Color(0xFF1E293B)),
        image: const DecorationImage(
          image: NetworkImage('https://images.unsplash.com/photo-1510123760777-62f74154109f?auto=format&fit=crop&q=80&w=200'),
          fit: BoxFit.cover,
          opacity: 0.08,
        )
      ),
      child: Row(
        children: [
          CircleAvatar(
            radius: 30,
            backgroundColor: const Color(0xFF6366F1),
            backgroundImage: NetworkImage(p.photoUrl),
          ),
          const SizedBox(width: 14),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Container(
                  padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 2),
                  decoration: BoxDecoration(
                    color: Colors.green.withOpacity(0.12),
                    borderRadius: BorderRadius.circular(8),
                    border: Border.all(color: Colors.green.withOpacity(0.2)),
                  ),
                  child: const Text(
                    'PERFIL OFICIAL ATIVO',
                    style: TextStyle(fontSize: 8, fontWeight: FontWeight.black, color: Color(0xFF10B981), letterSpacing: 0.5),
                  ),
                ),
                const SizedBox(height: 4),
                Text(
                  p.name,
                  style: const TextStyle(fontSize: 18, fontWeight: FontWeight.w900, color: Colors.white, letterSpacing: -0.5),
                ),
                Text(
                  'Filiado à ${myArena.name}',
                  style: const TextStyle(fontSize: 11, color: Color(0xFF64748B), fontWeight: FontWeight.bold),
                )
              ],
            ),
          )
        ],
      ),
    );
  }

  Widget _buildHorizontalNotificationsCenter(List<AthleteNotification> list) {
    return SizedBox(
      height: 115,
      child: ListView.builder(
        scrollDirection: Axis.horizontal,
        itemCount: list.length,
        itemBuilder: (context, idx) {
          final notif = list[idx];
          Color borderCol = const Color(0xFF1E293B);
          Color textCol = const Color(0xFF6366F1);
          Color accBg = Colors.indigo.withOpacity(0.08);

          if (notif.type == 'danger') {
            borderCol = const Color(0xFFF43F5E);
            textCol = const Color(0xFFF43F5E);
            accBg = const Color(0xFFF43F5E).withOpacity(0.06);
          } else if (notif.type == 'warning') {
            borderCol = Colors.amberAccent;
            textCol = Colors.amberAccent;
            accBg = Colors.amber.withOpacity(0.06);
          } else if (notif.type == 'success') {
            borderCol = const Color(0xFF10B981);
            textCol = const Color(0xFF10B981);
            accBg = const Color(0xFF10B981).withOpacity(0.06);
          }

          return Container(
            width: 280,
            margin: const EdgeInsets.only(right: 12),
            padding: const EdgeInsets.all(12),
            decoration: BoxDecoration(
              color: accBg,
              borderRadius: BorderRadius.circular(16),
              border: Border.all(color: borderCol.withOpacity(0.3), width: 1.5),
            ),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Row(
                  children: [
                    Container(
                      padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 2),
                      decoration: BoxDecoration(
                        color: borderCol.withOpacity(0.12),
                        borderRadius: BorderRadius.circular(6),
                      ),
                      child: Text(
                        notif.badge.toUpperCase(),
                        style: TextStyle(fontSize: 7.5, fontWeight: FontWeight.black, color: textCol, letterSpacing: 0.5),
                      ),
                    ),
                  ],
                ),
                const SizedBox(height: 4),
                Text(
                  notif.title,
                  style: const TextStyle(fontSize: 11, fontWeight: FontWeight.bold, color: Colors.white, height: 1.1),
                  maxLines: 1,
                  overflow: TextOverflow.ellipsis,
                ),
                const SizedBox(height: 2),
                Text(
                  notif.description,
                  style: const TextStyle(fontSize: 9.5, color: Color(0xFF94A3B8), height: 1.25, fontStyle: FontStyle.italic),
                  maxLines: 3,
                  overflow: TextOverflow.ellipsis,
                ),
              ],
            ),
          );
        },
      ),
    );
  }

  Widget _buildBilateralHomologationBox(List<Match> list, Player currentUser) {
    if (list.isEmpty) {
      return Container(
        width: double.infinity,
        padding: const EdgeInsets.symmetric(vertical: 24, horizontal: 16),
        decoration: BoxDecoration(
          color: const Color(0xFF0F172A).withOpacity(0.5),
          borderRadius: BorderRadius.circular(20),
          border: Border.all(color: const Color(0xFF1E293B)),
        ),
        child: Column(
          children: const [
            Icon(Icons.check_circle_outline, color: Color(0xFF10B981), size: 36),
            SizedBox(height: 8),
            Text(
              'Parabéns! Tudo em ordem',
              style: TextStyle(fontSize: 12, fontWeight: FontWeight.bold, color: Colors.white),
            ),
            SizedBox(height: 2),
            Text(
              'Nenhum placar de jogo pende da sua confirmação.',
              style: TextStyle(fontSize: 10, color: Color(0xFF64748B)),
              textAlign: TextAlign.center,
            ),
          ],
        ),
      );
    }

    return Column(
      children: list.map((match) {
        final onTeamA = match.teamA.contains(currentUser.id);
        final scoreUs = onTeamA ? match.scoreA : match.scoreB;
        final scoreThems = onTeamA ? match.scoreB : match.scoreA;

        final creator = _players.firstWhere((p) => p.id == match.createdBy, orElse: () => currentUser).name;

        return Card(
          margin: const EdgeInsets.only(bottom: 12),
          color: const Color(0xFF1E1E2F),
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(16),
            side: const BorderSide(color: Color(0xFFE11D48), width: 1.2), // highlighted red for homologation
          ),
          child: Padding(
            padding: const EdgeInsets.all(14),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Container(
                      padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
                      decoration: BoxDecoration(
                        color: const Color(0xFFE11D48).withOpacity(0.12),
                        borderRadius: BorderRadius.circular(8),
                      ),
                      child: const Text(
                        'PENDENTE DE ASSINATURA',
                        style: TextStyle(fontSize: 8, fontWeight: FontWeight.black, color: Colors.redAccent),
                      ),
                    ),
                    Text(
                      match.date,
                      style: const TextStyle(fontSize: 10, color: Color(0xFF64748B), fontWeight: FontWeight.bold),
                    ),
                  ],
                ),
                const SizedBox(height: 10),
                Text(
                  'Lançado por $creator no ${match.arenaName}. Placar de confronto indicado:',
                  style: const TextStyle(fontSize: 11, color: Colors.white70),
                ),
                const SizedBox(height: 8),
                
                // CENTER SCORE COMPONENT
                Container(
                  padding: const EdgeInsets.symmetric(vertical: 6, horizontal: 10),
                  decoration: BoxDecoration(
                    color: const Color(0xFF0F172A),
                    borderRadius: BorderRadius.circular(12),
                  ),
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      const Text('Time de Cá', style: TextStyle(fontSize: 10, fontWeight: FontWeight.bold, color: Colors.white38)),
                      const Spacer(),
                      Text('$scoreUs', style: const TextStyle(fontSize: 20, fontFamily: 'monospace', fontWeight: FontWeight.w900, color: Color(0xFF10B981))),
                      const Padding(
                        padding: EdgeInsets.symmetric(horizontal: 8.0),
                        child: Text('x', style: TextStyle(color: Colors.white24)),
                      ),
                      Text('$scoreThems', style: const TextStyle(fontSize: 20, fontFamily: 'monospace', fontWeight: FontWeight.w900, color: Color(0xFF94A3B8))),
                      const Spacer(),
                      const Text('Adversários', style: TextStyle(fontSize: 10, fontWeight: FontWeight.bold, color: Colors.white38)),
                    ],
                  ),
                ),
                const SizedBox(height: 10),

                // ACTION ROW BUTTONS
                Row(
                  mainAxisAlignment: MainAxisAlignment.end,
                  children: [
                    TextButton(
                      onPressed: () => _onRejectMatch(match.id, currentUser.id),
                      child: const Text(
                        'Contestar (Fraude!)',
                        style: TextStyle(fontSize: 11, color: Colors.redAccent, fontWeight: FontWeight.bold),
                      ),
                    ),
                    const SizedBox(width: 10),
                    ElevatedButton.icon(
                      style: ElevatedButton.styleFrom(
                        backgroundColor: const Color(0xFF10B981),
                        foregroundColor: Colors.white,
                        padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 6),
                        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
                      ),
                      onPressed: () => _onValidateMatch(match.id, currentUser.id),
                      icon: const Icon(Icons.check, size: 14),
                      label: const Text('Confirmar Placar', style: TextStyle(fontSize: 11, fontWeight: FontWeight.bold)),
                    ),
                  ],
                )
              ],
            ),
          ),
        );
      }).toList(),
    );
  }

  Widget _buildStatsBentoGrid(Player currentUser) {
    return GridView.count(
      crossAxisCount: 2,
      crossAxisSpacing: 10,
      mainAxisSpacing: 10,
      shrinkWrap: true,
      physics: const NeverScrollableScrollPhysics(),
      childAspectRatio: 1.4,
      children: [
        _buildMetricBox('PONTOS GERAIS', '${currentUser.points} pts', 'Vitória=+3 | Derrota=+1', Icons.emoji_events, Colors.amber),
        _buildMetricBox('PRESENÇA', '${currentUser.presenceDays} dias', 'Dias com homologações', Icons.calendar_today, Colors.green),
        _buildMetricBox('JOGOS VALIDADOS', '${currentUser.totalMatches}', '${currentUser.wins}V - ${currentUser.losses}D', Icons.sports_volleyball, Colors.indigoAccent),
        _buildMetricBox('APROVEITAMENTO', '${(currentUser.winRate * 100).toStringAsFixed(0)}%', 'Eficiência de Quadra', Icons.percent, Colors.teal),
      ],
    );
  }

  Widget _buildMetricBox(String label, String value, String footer, IconData icon, Color col) {
    return Card(
      color: const Color(0xFF151D30),
      child: Padding(
        padding: const EdgeInsets.all(12),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Text(label, style: const TextStyle(fontSize: 8.5, fontWeight: FontWeight.bold, color: Colors.white30)),
                Icon(icon, color: col, size: 14),
              ],
            ),
            const SizedBox(height: 6),
            Text(value, style: const TextStyle(fontSize: 18, fontWeight: FontWeight.black, color: Colors.white, fontFamily: 'monospace')),
            const Spacer(),
            Text(footer, style: const TextStyle(fontSize: 9, color: Color(0xFF64748B), fontStyle: FontStyle.italic)),
          ],
        ),
      ),
    );
  }

  // --- RECORD MATCH TAB (SANDBOX GENERATION CORE) ---
  Widget _buildRecordMatchTab(Player currentUser) {
    return MatchSimulatorForm(
      players: _players,
      arenas: _arenas,
      currentUser: currentUser,
      onRecordMatch: _onRecordMatch,
    );
  }

  // --- LEADERBOARDS & RANKINGS VIEW ---
  Widget _buildRankingsTab() {
    final ranked = List<Player>.from(_players)
      ..sort((a, b) {
        if (b.points != a.points) return b.points.compareTo(a.points);
        return b.winRate.compareTo(a.winRate);
      });

    return ListView(
      padding: const EdgeInsets.all(16),
      children: [
        const Text(
          'INICIATIVA PERFORMANCE (TOP 4 ATLETAS)',
          style: TextStyle(fontSize: 10, fontWeight: FontWeight.bold, color: Colors.blueGrey, letterSpacing: 0.8),
        ),
        const SizedBox(height: 8),
        Container(
          padding: const EdgeInsets.all(14),
          decoration: BoxDecoration(
            color: const Color(0xFF151D30),
            borderRadius: BorderRadius.circular(16),
            border: Border.all(color: const Color(0xFF1E293B)),
          ),
          child: Column(
            children: ranked.take(4).map((p) {
              final double maxPts = ranked.isNotEmpty ? ranked[0].points.toDouble() : 1.0;
              final double ratio = p.points / maxPts;
              return Padding(
                padding: const EdgeInsets.only(bottom: 10),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Text(
                          p.name,
                          style: const TextStyle(fontSize: 11, fontWeight: FontWeight.bold, color: Colors.white),
                        ),
                        Text(
                          '${p.points} Pts',
                          style: const TextStyle(fontSize: 11, fontWeight: FontWeight.black, color: Color(0xFF10B981), fontFamily: 'monospace'),
                        ),
                      ],
                    ),
                    const SizedBox(height: 4),
                    Stack(
                      children: [
                        Container(
                          height: 8,
                          width: double.infinity,
                          decoration: BoxDecoration(
                            color: const Color(0xFF0F172A),
                            borderRadius: BorderRadius.circular(4),
                          ),
                        ),
                        FractionallySizedBox(
                          widthFactor: ratio,
                          child: Container(
                            height: 8,
                            decoration: BoxDecoration(
                              gradient: const LinearGradient(
                                colors: [Color(0xFF6366F1), Color(0xFF10B981)],
                              ),
                              borderRadius: BorderRadius.circular(4),
                            ),
                          ),
                        ),
                      ],
                    ),
                  ],
                ),
              );
            }).toList(),
          ),
        ),
        const SizedBox(height: 20),

        const Text(
          'QUADRO DE CLASSIFICAÇÃO GERAL',
          style: TextStyle(fontSize: 12, fontWeight: FontWeight.black, color: Colors.indigoAccent, letterSpacing: 1),
        ),
        const SizedBox(height: 10),
        
        Card(
          child: ListView.separated(
            shrinkWrap: true,
            physics: const NeverScrollableScrollPhysics(),
            itemCount: ranked.length,
            separatorBuilder: (context, idx) => const Divider(color: Color(0xFF1E293B)),
            itemBuilder: (context, idx) {
              final player = ranked[idx];
              final leadingCol = (idx == 0) 
                  ? Colors.amber 
                  : (idx == 1) ? Colors.blueGrey : (idx == 2) ? Colors.brown : Colors.white70;

              return ListTile(
                leading: CircleAvatar(
                  radius: 18,
                  backgroundColor: leadingCol.withOpacity(0.12),
                  child: Text(
                    '${idx + 1}',
                    style: TextStyle(color: leadingCol, fontWeight: FontWeight.bold, fontSize: 13),
                  ),
                ),
                title: Text(
                  player.name,
                  style: const TextStyle(fontSize: 13, fontWeight: FontWeight.bold, color: Colors.white),
                ),
                subtitle: Text(
                  '${player.wins} Vitórias • ${player.losses} Derrotas',
                  style: const TextStyle(fontSize: 10, color: Color(0xFF64748B)),
                ),
                trailing: Text(
                  '${player.points} Pts',
                  style: const TextStyle(fontSize: 15, fontFamily: 'monospace', fontWeight: FontWeight.black, color: Color(0xFF10B981)),
                ),
              );
            },
          ),
        ),
      ],
    );
  }

  // --- NOSQL CONSOLE LOGS VIEW ---
  Widget _buildNoSqlConsoleTab() {
    return Padding(
      padding: const EdgeInsets.all(16),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              const Text(
                'TRANSAÇÕES REAL-TIME FIRESTORE (SIMULADO)',
                style: TextStyle(fontSize: 11, fontWeight: FontWeight.black, color: Colors.indigoAccent, letterSpacing: 0.5),
              ),
              TextButton.icon(
                onPressed: () {
                  setState(() {
                    _simLogs.clear();
                    _initializeMockData();
                  });
                },
                icon: const Icon(Icons.refresh, size: 12),
                label: const Text('Reset', style: TextStyle(fontSize: 10)),
              )
            ],
          ),
          const SizedBox(height: 8),
          Expanded(
            child: Container(
              width: double.infinity,
              padding: const EdgeInsets.all(14),
              decoration: BoxDecoration(
                color: Colors.black,
                borderRadius: BorderRadius.circular(16),
                border: Border.all(color: const Color(0xFF334155)),
                fontFamily: 'monospace',
              ),
              child: _simLogs.isEmpty
                  ? const Center(
                      child: Text(
                        'Nenhuma transação executada ainda.\nAtletas pendentes de confirmação ou cadastros de partidas geram commits atômicos de concorrência fiduciária neste console.',
                        style: TextStyle(color: Colors.white30, fontSize: 11, fontFamily: 'monospace'),
                        textAlign: TextAlign.center,
                      ),
                    )
                  : ListView.builder(
                      itemCount: _simLogs.length,
                      itemBuilder: (context, idx) {
                        return Padding(
                          padding: const EdgeInsets.only(bottom: 8.0),
                          child: Text(
                            '> ${_simLogs[idx]}',
                            style: TextStyle(
                              color: _simLogs[idx].contains('✓') || _simLogs[idx].contains('SUCCESS')
                                  ? const Color(0xFF10B981)
                                  : _simLogs[idx].contains('ALERT') || _simLogs[idx].contains('rejected')
                                      ? const Color(0xFFF43F5E)
                                      : Colors.indigoAccent,
                              fontSize: 10.5,
                              fontFamily: 'monospace',
                            ),
                          ),
                        );
                      },
                    ),
            ),
          )
        ],
      ),
    );
  }
}

/// Dynamic form widget for creating match card simulated inputs.
class MatchSimulatorForm extends StatefulWidget {
  final List<Player> players;
  final List<Arena> arenas;
  final Player currentUser;
  final Function(Match, List<String>) onRecordMatch;

  const MatchSimulatorForm({
    super.key,
    required this.players,
    required this.arenas,
    required this.currentUser,
    required this.onRecordMatch,
  });

  @override
  State<MatchSimulatorForm> createState() => _MatchSimulatorFormState();
}

class _MatchSimulatorFormState extends State<MatchSimulatorForm> {
  late String _arenaId;
  late String _pA1;
  late String _pA2;
  late String _pB1;
  late String _pB2;
  int _scoreA = 18;
  int _scoreB = 12;

  @override
  void initState() {
    super.initState();
    _arenaId = widget.arenas[0].id;
    _pA1 = widget.currentUser.id; // Active athlete mandated as player A1 to prevent fake logs
    _pA2 = widget.players.firstWhere((p) => p.id != _pA1).id;
    _pB1 = widget.players.firstWhere((p) => p.id != _pA1 && p.id != _pA2).id;
    _pB2 = widget.players.firstWhere((p) => p.id != _pA1 && p.id != _pA2 && p.id != _pB1).id;
  }

  void _triggerCommit() {
    // Assert check
    final chosen = [_pA1, _pA2, _pB1, _pB2];
    if (chosen.toSet().length != 4) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Selecione 4 atletas diferentes para o confronto!'), backgroundColor: Colors.redAccent),
      );
      return;
    }

    // Asserts active logged athlete belongs to the set
    if (!chosen.contains(widget.currentUser.id)) {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text('Sua conta autenticada (${widget.currentUser.name}) deve constar em uma das duplas para poder dar entrada no placar!'), backgroundColor: Colors.redAccent),
      );
      return;
    }

    final winTeam = _scoreA > _scoreB ? 'A' : 'B';
    final matchId = 'match_${DateTime.now().millisecondsSinceEpoch.toString().substring(6)}';
    final matchArena = widget.arenas.firstWhere((a) => a.id == _arenaId).name;

    final Match newMatch = Match(
      id: matchId,
      date: '2026-06-04',
      arenaId: _arenaId,
      arenaName: matchArena,
      teamA: [_pA1, _pA2],
      teamB: [_pB1, _pB2],
      scoreA: _scoreA,
      scoreB: _scoreB,
      winnerTeam: winTeam,
      month: '2026-06',
      playerIds: chosen,
      status: 'pending',
      createdBy: widget.currentUser.id,
      validatedBy: [widget.currentUser.id],
    );

    final List<String> logs = [
      'SIGN_SECURITY_INIT: Validating user credentials for ${widget.currentUser.name}... Done.',
      'CREATE: Written pending scorecard to /matches/$matchId',
      '🔒 RATINGS LOCK: Scorecard created with status: "pending". Scoring calculations are locked.',
      'Awaiting confirmation signature from opponent team players (${winTeam == 'A' ? 'Dupla B' : 'Dupla A'}) to validate and run high-concurrency ratings updates.'
    ];

    widget.onRecordMatch(newMatch, logs);

    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(content: Text('Partida registrada como PENDENTE! Alterne de usuário no topo para homologar.'), backgroundColor: Colors.indigoAccent),
    );
  }

  @override
  Widget build(BuildContext context) {
    return SingleChildScrollView(
      padding: const EdgeInsets.all(16),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Text(
            'LANÇAMENTO DE CONFRONTO CO-ASSINADO',
            style: TextStyle(fontSize: 12, fontWeight: FontWeight.black, color: Colors.roseAccent, letterSpacing: 1),
          ),
          const SizedBox(height: 12),

          Card(
            child: Padding(
              padding: const EdgeInsets.all(16),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  // Arena dropdown
                  const Text('LOCAL DO JOGO (ARENA)', style: TextStyle(fontSize: 9, fontWeight: FontWeight.bold, color: Colors.white30)),
                  const SizedBox(height: 4),
                  DropdownButtonFormField<String>(
                    value: _arenaId,
                    onChanged: (v) => setState(() => _arenaId = v!),
                    items: widget.arenas.map((a) => DropdownMenuItem(value: a.id, child: Text(a.name))).toList(),
                  ),
                  const SizedBox(height: 16),

                  // DUPLA A SETUP
                  const Text('DUPLA "A" (Selecione atleta parceiro)', style: TextStyle(fontSize: 9, fontWeight: FontWeight.bold, color: Color(0xFF6366F1))),
                  const SizedBox(height: 6),
                  Row(
                    children: [
                      Expanded(
                        child: Text(
                          widget.currentUser.name.split(' ')[0], 
                          style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 13, color: Colors.white),
                        ),
                      ),
                      const SizedBox(width: 10),
                      Expanded(
                        child: DropdownButton<String>(
                          value: _pA2,
                          isExpanded: true,
                          onChanged: (v) => setState(() => _pA2 = v!),
                          items: widget.players.map((p) => DropdownMenuItem(value: p.id, child: Text(p.name))).toList(),
                        ),
                      ),
                    ],
                  ),
                  const SizedBox(height: 16),

                  // DUPLA B SETUP
                  const Text('DUPLA ADVERSÁRIA "B"', style: TextStyle(fontSize: 9, fontWeight: FontWeight.bold, color: Color(0xFFF43F5E))),
                  const SizedBox(height: 6),
                  Row(
                    children: [
                      Expanded(
                        child: DropdownButton<String>(
                          value: _pB1,
                          isExpanded: true,
                          onChanged: (v) => setState(() => _pB1 = v!),
                          items: widget.players.map((p) => DropdownMenuItem(value: p.id, child: Text(p.name))).toList(),
                        ),
                      ),
                      const SizedBox(width: 10),
                      Expanded(
                        child: DropdownButton<String>(
                          value: _pB2,
                          isExpanded: true,
                          onChanged: (v) => setState(() => _pB2 = v!),
                          items: widget.players.map((p) => DropdownMenuItem(value: p.id, child: Text(p.name))).toList(),
                        ),
                      ),
                    ],
                  ),
                  const SizedBox(height: 20),

                  // SCORES SLIDERS
                  const Text('PLACAR FINAL DO DUELO DO CIRCUITO', style: TextStyle(fontSize: 9, fontWeight: FontWeight.bold, color: Colors.white30)),
                  const SizedBox(height: 10),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                    children: [
                      Column(
                        children: [
                          const Text('Score Dupla A', style: TextStyle(fontSize: 10)),
                          Row(
                            children: [
                              IconButton(onPressed: () => setState(() => _scoreA > 0 ? _scoreA-- : 0), icon: const Icon(Icons.remove)),
                              Text('$_scoreA', style: const TextStyle(fontSize: 22, fontWeight: FontWeight.black)),
                              IconButton(onPressed: () => setState(() => _scoreA++), icon: const Icon(Icons.add)),
                            ],
                          )
                        ],
                      ),
                      const Text('x', style: TextStyle(fontSize: 20, color: Colors.white24)),
                      Column(
                        children: [
                          const Text('Score Dupla B', style: TextStyle(fontSize: 10)),
                          Row(
                            children: [
                              IconButton(onPressed: () => setState(() => _scoreB > 0 ? _scoreB-- : 0), icon: const Icon(Icons.remove)),
                              Text('$_scoreB', style: const TextStyle(fontSize: 22, fontWeight: FontWeight.black)),
                              IconButton(onPressed: () => setState(() => _scoreB++), icon: const Icon(Icons.add)),
                            ],
                          )
                        ],
                      ),
                    ],
                  ),
                  const SizedBox(height: 16),

                  SizedBox(
                    width: double.infinity,
                    height: 48,
                    child: ElevatedButton(
                      style: ElevatedButton.styleFrom(
                        backgroundColor: const Color(0xFFF43F5E),
                        foregroundColor: Colors.white,
                        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                      ),
                      onPressed: _triggerCommit,
                      child: const Text('Gravar Partida NoSQL (Pendente)', style: TextStyle(fontWeight: FontWeight.bold)),
                    ),
                  ),
                ],
              ),
            ),
          )
        ],
      ),
    );
  }
}
