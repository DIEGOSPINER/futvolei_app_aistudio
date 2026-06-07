/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface SchemaField {
  name: string;
  type: string;
  description: string;
  example: any;
}

export interface CollectionSchema {
  path: string;
  description: string;
  whyThisWay: string;
  fields: SchemaField[];
  subcollections?: CollectionSchema[];
}

export const firestoreSchema: CollectionSchema[] = [
  {
    path: "/arenas/{arenaId}",
    description: "Cadastro das arenas ativas (Pântano, Arena Marisol, BPCHOQUE, Buraco, Petromar) e dados de performance consolidados por local.",
    whyThisWay: "Coleção raiz de arenas. Jogadores são vinculados via arenaId. Permite realizar o comparativo de 'Arena Ganhadora do Ano' em O(1) calculando o volume de partidas disputadas no local, placares gerais e o atleta de melhor aproveitamento nativo de forma agregada no documento.",
    fields: [
      { name: "id", type: "String", description: "ID único gerador para a arena (ex: arena_marisol).", example: "arena_marisol" },
      { name: "name", type: "String", description: "Nome representativo da Arena.", example: "Arena Marisol" },
      { name: "city", type: "String", description: "Cidade sede da quadra.", example: "Salvador - BA" },
      { name: "imageUrl", type: "String", description: "Link da foto física do complexo esportivo.", example: "https://images.unsplash.com/photo-1519046904884-53103b34b206" },
      { name: "matchesPlayed", type: "Number (Integer)", description: "Contagem agregada de todas as partidas disputadas nesta arena.", example: 15 },
      { name: "totalPointsScored", type: "Number (Integer)", description: "Soma de todos os pontos marcados nas redes desta arena.", example: 310 },
      { name: "topPlayerId", type: "String", description: "Referência ao jogador filiado com maior aproveitamento (Win Rate) neste ano.", example: "usr_sofia" },
      { name: "topPlayerName", type: "String", description: "Nome amigável do melhor jogador afiliado para evitar joins complexos.", example: "Sofia 'Shark'" },
      { name: "yearlyVictories", type: "Map (Year -> Matches)", description: "Contagem anual de partidas consolidadas para decidir a melhor arena do ano.", example: { "2026": 11 } },
      { name: "createdAt", type: "Timestamp", description: "Data de registro da Arena.", example: "Timestamp(seconds=1780590000, nanoseconds=0)" }
    ]
  },
  {
    path: "/players/{playerId}",
    description: "Cadastro de jogadores e suas estatísticas de carreira.",
    whyThisWay: "Contém campos indexados como 'winRate' e 'points' para possibilitar queries rápidas com ordenação orderBy() direta no Flutter, além de um arenaId correspondente que classifica a filiação do atleta com as arenas de exemplo (Pântano, Marisol, etc.).",
    fields: [
      { name: "id", type: "String", description: "UID original do Firebase Auth ou apelido único.", example: "usr_diego" },
      { name: "name", type: "String", description: "Nome de exibição nas tabelas do futevôlei.", example: "Diego Santos" },
      { name: "photoUrl", type: "String", description: "Foto de perfil oficial.", example: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e" },
      { name: "arenaId", type: "String", description: "Arena de filiação principal do jogador (Pântano, Marisol, etc.).", example: "arena_pantano" },
      { name: "wins", type: "Number (Integer)", description: "Total acumulado de vitórias do atleta.", example: 9 },
      { name: "losses", type: "Number (Integer)", description: "Total acumulado de derrotas do atleta.", example: 3 },
      { name: "totalMatches", type: "Number (Integer)", description: "Número total de jogos disputados.", example: 12 },
      { name: "winRate", type: "Number (Float)", description: "Razão wins/totalMatches (0.00 a 1.00) usada para o aproveitamento.", example: 0.75 },
      { name: "points", type: "Number (Integer)", description: "Pontos gerais do campeonato (vitória = 3pt, derrota = 1pt).", example: 30 },
      { name: "createdAt", type: "Timestamp", description: "Data de início no futevôlei do app.", example: "Timestamp(seconds=1780612000, nanoseconds=0)" }
    ],
    subcollections: [
      {
        path: "/players/{playerId}/monthlyStats/{yearMonth}",
        description: "Histórico mensal de desempenho individual por ano e mês.",
        whyThisWay: "O ID do documento refere-se ao período (ex: '2026-06'). Permite plotar gráficos de linha de evolução na tela do usuário instantaneamente.",
        fields: [
          { name: "month", type: "String", description: "Chave única no formato AAAA-MM.", example: "2026-06" },
          { name: "wins", type: "Number (Integer)", description: "Vitórias obtidas.", example: 3 },
          { name: "losses", type: "Number (Integer)", description: "Derrotas obtidas.", example: 1 },
          { name: "points", type: "Number (Integer)", description: "Pontos acumulados.", example: 10 }
        ]
      }
    ]
  },
  {
    path: "/duos/{duoId}",
    description: "Compilação e tabela de classificação de DUPLAS parceiras.",
    whyThisWay: "Para classificar e analisar as melhores duplas e sua sinergia, criamos documentos no formato 'idJogadorA_idJogadorB' (ordenados alfabeticamente). Esse padrão impede registros duplicados (ex: Diego+Lucas e Lucas+Diego) e permite responder com 100% de precisão sobre a melhor dupla do torneio anual de forma indexada.",
    fields: [
      { name: "id", type: "String", description: "ID alfabético 'idMenor_idMaior' que garante unicidade para a dupla.", example: "usr_diego_usr_lucas" },
      { name: "playerIds", type: "Array (String)", description: "Vetor contendo os dois IDs de jogadores correspondentes.", example: ["usr_diego", "usr_lucas"] },
      { name: "playerNames", type: "Array (String)", description: "Nomes denormalizados de ambos os jogadores para listagens rápidas.", example: ["Diego Santos", "Lucas 'Lob'"] },
      { name: "photoUrls", type: "Array (String)", description: "Fotos de perfil de ambos os jogadores.", example: ["https://images.unsplash.com/photo-1500648767791-00dcc994a43e", "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde"] },
      { name: "wins", type: "Number (Integer)", description: "Vitórias obtidas jogando lado a lado.", example: 6 },
      { name: "losses", type: "Number (Integer)", description: "Derrotas obtidas jogando lado a lado.", example: 2 },
      { name: "totalMatches", type: "Number (Integer)", description: "Soma de partidas disputadas em conjunto.", example: 8 },
      { name: "winRate", type: "Number (Float)", description: "Aproveitamento conjunto (wins / totalMatches).", example: 0.75 },
      { name: "points", type: "Number (Integer)", description: "Pontos conjuntos acumulados.", example: 20 },
      { name: "yearlyWins", type: "Map (Year -> Wins)", description: "Estatística de vitórias para calcular quem ganhou mais o 'Torneio Anual' daquele ano específico.", example: { "2026": 6 } }
    ]
  },
  {
    path: "/matches/{matchId}",
    description: "Registro cronológico imutável de todas as partidas.",
    whyThisWay: "Tabela transacional. Usamos o campo 'playerIds' para carregar todo o histórico de confrontos que tenham a participação do usuário independentemente de equipe, usando queries 'array-contains'.",
    fields: [
      { name: "id", type: "String", description: "ID do documento do Firestore.", example: "match_12345" },
      { name: "date", type: "Timestamp", description: "Data de realização do jogo.", example: "Timestamp(seconds=1780677173, nanoseconds=0)" },
      { name: "arenaId", type: "String", description: "ID da Arena de realização (Buraco, Pântano, etc.).", example: "arena_pantano" },
      { name: "arenaName", type: "String", description: "Nome denormalizado da Arena pra evitar joins.", example: "Arena Pântano" },
      { name: "teamA", type: "Array (String)", description: "IDs da dupla A.", example: ["usr_diego", "usr_lucas"] },
      { name: "teamB", type: "Array (String)", description: "IDs da dupla B.", example: ["usr_sofia", "usr_pedro"] },
      { name: "scoreA", type: "Number (Integer)", description: "Placar final da dupla A.", example: 18 },
      { name: "scoreB", type: "Number (Integer)", description: "Placar final da dupla B.", example: 15 },
      { name: "winnerTeam", type: "String", description: "Vantagem do placar ('A' ou 'B').", example: "A" },
      { name: "month", type: "String", description: "Chave do período em formato AAAA-MM.", example: "2026-06" },
      { name: "playerIds", type: "Array (String)", description: "Array contendo os 4 participantes juntos.", example: ["usr_diego", "usr_lucas", "usr_sofia", "usr_pedro"] }
    ]
  }
];

export const queriesExplanation = {
  ranking: {
    title: "Como calcular o Ranking",
    explanation: "Em vez de calcular os pontos dinamicamente somando partidas, consulte diretamente a coleção `/players` ordenada pelo campo `points` de forma decrescente. Isso consome exatamente 1 leitura por jogador retornado na paginação.",
    dartCode: `// Consulta ideal para a tabela de líderes (Leaderboard) em Flutter
QuerySnapshot liders = await FirebaseFirestore.instance
    .collection('players')
    .orderBy('points', descending: true)
    .limit(20)
    .get();`
  },
  aproveitamento: {
    title: "Como calcular o Aproveitamento (Vitórias/Derrotas)",
    explanation: "O aproveitamento individual é computado através do campo `winRate` pré-registrado. Pelo fato de estar salvo diretamente em cada documento, você pode listar os jogadores com maior aproveitamento (que jogaram um número mínimo de partidas) instantaneamente com filtragem server-side.",
    formula: "Aproveitamento % = (vitórias / total_de_partidas) * 100",
    dartCode: `// Listagem ordenada por aproveitamento de jogadores experientes
QuerySnapshot topWinRate = await FirebaseFirestore.instance
    .collection('players')
    .where('totalMatches', isGreaterThanOrEqualTo: 5) // Evita distorções de quem jogou 1 partida só e venceu
    .orderBy('totalMatches')
    .orderBy('winRate', descending: true)
    .get();`
  },
  evolucao: {
    title: "Como calcular a Evolução Mensal",
    explanation: "Busque a subcoleção `/players/{playerId}/monthlyStats` ordenada por mês de maneira crescente. Cada documento dará os pontos, vitórias e derrotas acumuladas de um mês específico. Monte o gráfico de linha relacionando os meses no eixo X e os pontos ou vitórias no eixo Y.",
    dartCode: `// Obter histórico de evolução para o gráfico do jogador
QuerySnapshot evolucao = await FirebaseFirestore.instance
    .collection('players')
    .doc(playerId)
    .collection('monthlyStats')
    .orderBy('month', descending: false)
    .get();

// No Flutter, mapeie os documentos diretamente para renderizar na biblioteca charts_flutter ou fl_chart
List<MonthlyStat> stats = evolucao.docs.map((doc) => MonthlyStat.fromFirestore(doc)).toList();`
  },
  transacao: {
    title: "Garantindo a Consistência com Transações (Firestore Transaction)",
    explanation: "Ao registrar uma partida, você PRECISA salvar o Match e atualizar as estatísticas de cada um dos 4 jogadores participantes e de suas respectivas DUPLAS parceiras de forma atômica no Firestore. O código abaixo mostra como aplicar isso atômicamente no Flutter.",
    dartCode: `Future<void> registrarPartida(Match match) {
  final firestore = FirebaseFirestore.instance;
  final matchRef = firestore.collection('matches').doc();
  
  return firestore.runTransaction((transaction) async {
    // 1. Grava a partida
    transaction.set(matchRef, match.toMap());
    
    // Lista de ids de todos os jogadores envolvidos
    List<String> todosJogadores = [...match.teamA, ...match.teamB];
    bool duplaAvenceu = match.winnerTeam == 'A';
    
    // Atualização dos 4 jogadores individuais
    for (String pId in todosJogadores) {
      final playerRef = firestore.collection('players').doc(pId);
      final monthStatsRef = playerRef.collection('monthlyStats').doc(match.month);
      
      DocumentSnapshot playerSnap = await transaction.get(playerRef);
      DocumentSnapshot monthSnap = await transaction.get(monthStatsRef);
      
      bool isTeamA = match.teamA.contains(pId);
      bool isWinner = (isTeamA && duplaAvenceu) || (!isTeamA && !duplaAvenceu);
      
      int ptsGanhos = isWinner ? 3 : 1; 
      int novaVitoria = isWinner ? 1 : 0;
      int novaDerrota = isWinner ? 0 : 1;
      
      if (playerSnap.exists) {
        int currentWins = playerSnap.get('wins') ?? 0;
        int currentLosses = playerSnap.get('losses') ?? 0;
        int currentPoints = playerSnap.get('points') ?? 0;
        
        int nextWins = currentWins + novaVitoria;
        int nextLosses = currentLosses + novaDerrota;
        int nextTotal = nextWins + nextLosses;
        double nextWinRate = nextTotal > 0 ? (nextWins / nextTotal) : 0.0;
        
        transaction.update(playerRef, {
          'wins': nextWins,
          'losses': nextLosses,
          'totalMatches': nextTotal,
          'winRate': nextWinRate,
          'points': currentPoints + ptsGanhos
        });
      }
      
      // Atualiza Valores Mensais
      if (monthSnap.exists) {
        transaction.update(monthStatsRef, {
          'wins': (monthSnap.get('wins') ?? 0) + novaVitoria,
          'losses': (monthSnap.get('losses') ?? 0) + novaDerrota,
          'points': (monthSnap.get('points') ?? 0) + ptsGanhos
        });
      } else {
        transaction.set(monthStatsRef, {
          'month': match.month,
          'wins': novaVitoria,
          'losses': novaDerrota,
          'points': ptsGanhos
        });
      }
    }

    // 2. Grava e Atualiza Estatísticas das Duplas parceiras envolvidas (Team A e Team B)
    await atualizarEstatisticasDupla(transaction, match.teamA, teamAVon: duplaAvenceu, ano: match.month.split('-')[0]);
    await atualizarEstatisticasDupla(transaction, match.teamB, teamAVon: !duplaAvenceu, ano: match.month.split('-')[0]);
  });
}

// Auxiliar para a dupla
Future<void> atualizarEstatisticasDupla(Transaction transaction, List<String> playerIds, {required bool teamAVon, required String ano}) async {
  // Ordena alfabeticamente para gerar o ID unificado
  List<String> sortedIds = [...playerIds]..sort();
  String duoId = sortedIds.join('_');
  final duoRef = FirebaseFirestore.instance.collection('duos').doc(duoId);
  DocumentSnapshot duoSnap = await transaction.get(duoRef);

  int vitoria = teamAVon ? 1 : 0;
  int derrota = teamAVon ? 0 : 1;
  int pts = teamAVon ? 3 : 1;

  if (duoSnap.exists) {
    int wins = duoSnap.get('wins') ?? 0;
    int losses = duoSnap.get('losses') ?? 0;
    int currentPoints = duoSnap.get('points') ?? 0;
    Map<String, dynamic> yearlyWins = Map<String, dynamic>.from(duoSnap.get('yearlyWins') ?? {});
    
    int total = wins + losses + 1;
    int nextWins = wins + vitoria;
    yearlyWins[ano] = (yearlyWins[ano] ?? 0) + vitoria;

    transaction.update(duoRef, {
      'wins': nextWins,
      'losses': losses + derrota,
      'totalMatches': total,
      'winRate': nextWins / total,
      'points': currentPoints + pts,
      'yearlyWins': yearlyWins
    });
  } else {
    // Se a dupla nunca jogou junta, cria os registros iniciais
    transaction.set(duoRef, {
      'id': duoId,
      'playerIds': sortedIds,
      'wins': vitoria,
      'losses': derrota,
      'totalMatches': 1,
      'winRate': vitoria / 1.0,
      'points': pts,
      'yearlyWins': { ano: vitoria }
    });
  }
}`
  },
  rankingDuplas: {
    title: "Ranking e Melhor Dupla (Sinergia de Parceiros)",
    explanation: "Consulte a coleção `/duos` ordenando pelo número de vitórias acumuladas de forma decrescente para saber Instantaneamente a melhor dupla do campeonato. Para restringir ao Torneio Anual de um ano específico (ex: '2026'), use `yearlyWins.2026`.",
    dartCode: `// Listagem geral de sinergia de duplas em Flutter
QuerySnapshot rankingDuplas = await FirebaseFirestore.instance
    .collection('duos')
    .orderBy('points', descending: true)
    .limit(10)
    .get();

// Dupla Campeã do Torneio Anual 2026 (quem venceu mais partidas no ano)
QuerySnapshot campeaoAnual = await FirebaseFirestore.instance
    .collection('duos')
    .orderBy('yearlyWins.2026', descending: true)
    .limit(1)
    .get();`
  },
  compilacaoArena: {
    title: "Comparativo de Arena Ganhadora do Ano",
    explanation: "Filtre a coleção raiz `/arenas` pelo número de partidas disputadas naquele ano ou use os dados de faturamento/pontuação da arena. Para saber as arenas estrelas com melhor faturamento estrutural ou jogadores locais mais fortes, consulte `/arenas` ordenada por `matchesPlayed` ou pelo filtro do mapa `yearlyVictories.2026`.",
    dartCode: `// Descobre qual a Melhor Arena / Arena de Maior Engajamento do ano
QuerySnapshot melhorArena = await FirebaseFirestore.instance
    .collection('arenas')
    .orderBy('yearlyVictories.2026', descending: true)
    .limit(1)
    .get();

// Saída em Flutter para renderizar o comparativo de todas as 5 arenas (Pântano, Marisol, etc)
QuerySnapshot todasArenas = await FirebaseFirestore.instance
    .collection('arenas')
    .orderBy('matchesPlayed', descending: true)
    .get();`
  }
};
