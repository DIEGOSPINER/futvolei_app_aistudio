/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Player {
  id: string;
  name: string;
  photoUrl: string;
  arenaId: string;
  wins: number;
  losses: number;
  totalMatches: number;
  winRate: number; // calculated as wins / totalMatches (between 0.0 and 1.0)
  points: number;   // custom calculated rating points (e.g. wins * 3)
  createdAt: string;
  presenceDays: number;     // number of unique days of check-in / attendance
  presentDates: string[];   // list of 'YYYY-MM-DD' strings where player has at least one match
  role?: 'atleta' | 'admin_arena' | 'admin_geral';
  managedArenaIds?: string[]; // List of Arena IDs managed by this user
}

export interface Duo {
  id: string;          // Formed by alphabetical order "playerId1_playerId2" e.g. "usr_diego_usr_lucas"
  playerIds: string[]; // ["usr_diego", "usr_lucas"]
  playerNames: string[]; // ["Diego Santos", "Lucas 'Lob'"]
  photoUrls: string[];   // [url1, url2]
  wins: number;
  losses: number;
  totalMatches: number;
  winRate: number;     // wins / totalMatches
  points: number;
  yearlyWins: Record<string, number>; // e.g. { "2026": 5 } for tournament/year wins calculation
}

export interface Arena {
  id: string;
  name: string;
  city: string;
  imageUrl: string;
  createdAt: string;
  // Year ranking stats
  matchesPlayed: number; // total matches held here
  totalPointsScored: number;
  topPlayerId?: string; // Player associated with this arena with biggest winRate
  topPlayerName?: string;
  yearlyVictories: Record<string, number>; // Total matches played in this arena in year "2026"
}

export interface Match {
  id: string;
  date: string;
  arenaId: string;
  arenaName: string;
  teamA: string[]; // [playerId1, playerId2]
  teamB: string[]; // [playerId3, playerId4]
  scoreA: number;
  scoreB: number;
  winnerTeam: 'A' | 'B';
  month: string;   // 'YYYY-MM'
  playerIds: string[]; // Combined array [playerA1, playerA2, playerB1, playerB2] for simple array-contains query
  status: 'pending' | 'validated';
  createdBy: string;
  validatedBy: string[]; // List of player IDs who validated this match
}

export interface MonthlyStat {
  month: string; // 'YYYY-MM'
  wins: number;
  losses: number;
  points: number;
}

export interface SimulationLog {
  action: 'CREATE' | 'UPDATE' | 'INFO';
  path: string;
  payload: any;
  explanation: string;
}

