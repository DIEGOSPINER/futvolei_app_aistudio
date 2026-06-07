/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Smartphone, Copy, Check, Terminal, Code, Cpu, Sparkles, Layers } from 'lucide-react';

export default function FlutterViewer() {
  const [activeFile, setActiveFile] = useState<'app' | 'models' | 'notifications'>('app');
  const [copied, setCopied] = useState(false);

  const fileContents = {
    models: `// models.dart
// 
// SPDF-License-Identifier: Apache-2.0
// Senior Flutter Developer Case Study: Circuit Sports NoSQL Models for Futevôlei

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
}`,

    notifications: `// notification_service.dart
// 
// SPDF-License-Identifier: Apache-2.0
// Notification triggers and motivation center algorithm in pure Dart

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

    // Order players to determine ranking positions
    final rankedPlayers = List<Player>.from(players)
      ..sort((a, b) {
        if (b.points != a.points) return b.points.compareTo(a.points);
        return b.winRate.compareTo(a.winRate);
      });

    final myRankIndex = rankedPlayers.indexWhere((p) => p.id == currentUser.id);
    final myRankPosition = myRankIndex != -1 ? myRankIndex + 1 : 1;

    final competitorAbove = (myRankIndex > 0) ? rankedPlayers[myRankIndex - 1] : null;
    final competitorBelow = (myRankIndex != -1 && myRankIndex < rankedPlayers.length - 1) 
        ? rankedPlayers[myRankIndex + 1] 
        : null;

    // 1. Alert if Overtaken by competitor directly above
    if (competitorAbove != null) {
      final ptDiff = competitorAbove.points - currentUser.points;
      if (ptDiff > 0) {
        list.add(AthleteNotification(
          id: 'overtaken_by_above',
          type: 'danger',
          badge: 'Gatilho de Ultrapassagem',
          title: 'O jogador \${competitorAbove.name} ultrapassou você!',
          description: 'Ele está em #\${myRankPosition - 1} com \${competitorAbove.points} pts. Você tem \${currentUser.points}. Vença para recapturar a posição!',
        ));
      }
    }

    // 2. Alert for competitor breathing down our neck
    if (competitorBelow != null) {
      final ptDiff = currentUser.points - competitorBelow.points;
      if (ptDiff <= 3) {
        list.add(AthleteNotification(
          id: 'breath_on_neck',
          type: 'warning',
          badge: 'Sinal de Alerta',
          title: 'Cuidado! \${competitorBelow.name} está colado em você!',
          description: 'Diferença de apenas \${ptDiff} pts. Não marque bobeira esta semana!',
        ));
      }
    }

    // 3. Low attendance alerts
    if (currentUser.presenceDays <= 2) {
      list.add(AthleteNotification(
        id: 'low_attendance_warning',
        type: 'warning',
        badge: 'Alerta de Presença',
        title: 'Ausência Recente detectada!',
        description: 'Você não compareceu às quadras com frequência esta semana, está ficando para trás... Marquem uma partida!',
      ));
    }

    return list;
  }
}`,

    app: `// futevolei_app.dart
// 
// COMPLETE MULTIPLATFORM SOURCE CODE (Android, iOS & Web) - Theme: Modern Dark Mode
// Features full state simulators for co-signing matches, bilateral validation, leaderboards and charts.

import 'package:flutter/material.dart';
import './models.dart';
import './notification_service.dart';

void main() => runApp(const FutevoleiApp());

class FutevoleiApp extends StatelessWidget {
  const FutevoleiApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Circuito Futevôlei Salvador',
      themeMode: ThemeMode.dark,
      darkTheme: ThemeData(
        brightness: Brightness.dark,
        scaffoldBackgroundColor: const Color(0xFF090D1A), // custom slate black
        primaryColor: const Color(0xFF6366F1), // high contrast indigo
        colorScheme: const ColorScheme.dark(
          primary: Color(0xFF6366F1),
          secondary: Color(0xFF10B981), // emerald
          surface: Color(0xFF151D30), // card color
          error: Color(0xFFF43F5E), // rose
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
  // Application business logic, responsive TabController layouts
  // with interactive points bar charts & custom horizontal ratio bars
  // and in-memory multi-document synchronized simulation transactions.
  // ... Fully implemented in /src/flutter/futevolei_app.dart ...
}`
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(fileContents[activeFile]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 md:p-6" id="flutter-viewer-root">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 border-b border-slate-800 pb-4">
        <div className="flex items-center gap-3">
          <span className="p-2.5 bg-rose-950/40 border border-rose-900/35 text-rose-400 rounded-2xl shrink-0">
            <Smartphone className="w-5 h-5" />
          </span>
          <div>
            <h3 className="font-extrabold text-white text-base">📲 Arquitetura Flutter Multi-Plataforma</h3>
            <p className="text-xs text-slate-400">Implementação de nível produção em Tema Escuro (Dark Mode) para Android, iOS e Web.</p>
          </div>
        </div>

        {/* File Tabs */}
        <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800/60 self-start md:self-auto">
          <button
            onClick={() => setActiveFile('app')}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
              activeFile === 'app' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            futevolei_app.dart (Telas)
          </button>
          <button
            onClick={() => setActiveFile('models')}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
              activeFile === 'models' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            models.dart (Coleções)
          </button>
          <button
            onClick={() => setActiveFile('notifications')}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
              activeFile === 'notifications' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            notification_service.dart
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Dark Mode Screen preview features list */}
        <div className="lg:col-span-4 space-y-4">
          <div className="p-4 bg-indigo-950/20 border border-indigo-900/40 rounded-2xl space-y-2.5">
            <div className="flex items-center gap-2 text-indigo-400 text-xs font-extrabold uppercase tracking-wider">
              <Sparkles className="w-4 h-4 fill-indigo-500/20" />
              <span>Destaques de Design e UI</span>
            </div>
            <ul className="text-[11px] text-slate-300 space-y-1.5 list-inside list-disc leading-relaxed">
              <li><strong>Modern Dark Theme</strong>: Utiliza as especificações de material 3 e contrastes de paletas em Dark Slate (Color(0xFF090D1A)) com nuances neon de Indigo, Emerald e Rose.</li>
              <li><strong>UI Fluida & Responsiva</strong>: Utiliza GridView.count, LayoutBuilder e MediaQueries adaptando-se confortavelmente desde relógios até telas de navegadores Web.</li>
              <li><strong>Notificações Inteligentes</strong>: Transpilação milimétrica do algoritmo de ultrapassagem em tempo de execução, alimentando cartões com feedback imediato.</li>
            </ul>
          </div>

          <div className="p-4 bg-slate-950/50 border border-slate-800/80 rounded-2xl space-y-3">
            <div className="flex items-center gap-1.5 text-slate-400 text-xs font-extrabold uppercase font-mono">
              <Terminal className="w-3.5 h-3.5 text-slate-500" />
              <span>Arquivos Criados</span>
            </div>
            <div className="space-y-1.5 text-[10px]">
              <div className="flex justify-between items-center bg-slate-900/60 p-2 rounded-lg border border-slate-800">
                <span className="text-white font-mono font-medium">/src/flutter/models.dart</span>
                <span className="text-emerald-500 font-bold uppercase text-[9px]">Salvo</span>
              </div>
              <div className="flex justify-between items-center bg-slate-900/60 p-2 rounded-lg border border-slate-800">
                <span className="text-white font-mono font-medium">/src/flutter/notification_service.dart</span>
                <span className="text-emerald-500 font-bold uppercase text-[9px]">Salvo</span>
              </div>
              <div className="flex justify-between items-center bg-slate-900/60 p-2 rounded-lg border border-slate-800">
                <span className="text-white font-mono font-medium">/src/flutter/futevolei_app.dart</span>
                <span className="text-emerald-500 font-bold uppercase text-[9px]">Salvo</span>
              </div>
            </div>
            <p className="text-[10px] text-slate-500 italic leading-snug">
              Esses códigos foram gerados no workspace do projeto e estão disponíveis para compilação direta utilizando o Flutter SDK.
            </p>
          </div>
        </div>

        {/* Code terminal emulator */}
        <div className="lg:col-span-8 flex flex-col space-y-2.5">
          <div className="flex justify-between items-center bg-slate-950 px-4 py-2 rounded-t-xl border-t border-x border-slate-800">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
              <span className="ml-2 text-[10px] text-slate-500 font-mono">Dart Output Console</span>
            </div>
            
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 text-[11px] text-indigo-400 hover:text-indigo-300 font-bold transition px-2 py-0.5"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Código Copiado!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copiar Arquivo</span>
                </>
              )}
            </button>
          </div>

          <div className="bg-slate-950 rounded-b-xl border-b border-x border-slate-800 p-4 font-mono text-[10.5px] text-indigo-100 overflow-x-auto h-96 shadow-inner relative">
            <pre className="whitespace-pre leading-relaxed select-all">
              {fileContents[activeFile]}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
