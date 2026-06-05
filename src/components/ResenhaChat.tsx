/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { Player } from '../types';
import { 
  MessageSquare, 
  Send, 
  Sparkles, 
  HelpCircle, 
  MapPin, 
  CheckCheck, 
  AlertCircle, 
  Flame, 
  Share2, 
  ThumbsUp, 
  Volume2,
  Trash2,
  Info
} from 'lucide-react';

interface ResenhaChatProps {
  players: Player[];
  loggedPlayerId: string;
}

interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  senderPhoto: string;
  text: string;
  timestamp: string;
  channel: string;
  isBanter?: boolean;
}

const mockBanterPhrases = [
  "Chama no peito e chapa neles! 🏐🔥",
  "Hoje tem churrasco pago pela dupla perdedora! 🥩🍺",
  "Aceita o cone que dói menos! 🛢️💅",
  "Essa areia tá fria ou foi pressão psicológica?",
  "Choveu na horta do adversário! 🌧️🥬",
  "Diz que joga muito mas só dá curtinha...",
  "Salva uma bola dessa e eu pago o açaí!"
];

export default function ResenhaChat({ players, loggedPlayerId }: ResenhaChatProps) {
  const activePlayer = players.find(p => p.id === loggedPlayerId) || players[0];

  const [activeChannel, setActiveChannel] = useState<'geral' | 'arena_salvador' | 'parceria'>('geral');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg_1',
      senderId: 'usr_diego',
      senderName: 'Diego Spinola',
      senderPhoto: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&q=80&w=120',
      text: "Hoje a resenha na Arena Balbininho tá quente! Quem vai encarar?",
      timestamp: "17:40",
      channel: 'geral'
    },
    {
      id: 'msg_2',
      senderId: 'usr_bruninho',
      senderName: 'Bruninho Cruz',
      senderPhoto: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=120',
      text: "Diego só joga na diagonal curta né, se der profundidade ele cansa rápido kkkk 🏃‍♂️💨",
      timestamp: "17:42",
      channel: 'geral',
      isBanter: true
    },
    {
      id: 'msg_3',
      senderId: 'usr_paulo',
      senderName: 'Paulo Roberto',
      senderPhoto: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=120',
      text: "Se preparem que o vento na Arena Pântano tá fortíssimo hoje. Preparem o controle de chapa!",
      timestamp: "17:45",
      channel: 'arena_salvador'
    },
    {
      id: 'msg_4',
      senderId: 'usr_rafinha',
      senderName: 'Rafinha Alcantara',
      senderPhoto: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=120',
      text: "A dupla dinâmica de Pituba tá treinando firme pras 19:00. Sem moleza!",
      timestamp: "17:48",
      channel: 'parceria'
    }
  ]);

  const [inputText, setInputText] = useState('');
  const chatBottomRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom
  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Handle send message
  const handleSendMessage = (textToSend?: string) => {
    const finalVal = textToSend || inputText;
    if (!finalVal.trim()) return;

    const newMsg: ChatMessage = {
      id: `msg_${Date.now()}`,
      senderId: activePlayer.id,
      senderName: activePlayer.name,
      senderPhoto: activePlayer.photoUrl,
      text: finalVal,
      timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
      channel: activeChannel,
      isBanter: finalVal.includes('!') || finalVal.includes('kkk')
    };

    setMessages(prev => [...prev, newMsg]);
    if (!textToSend) setInputText('');

    // Simulate reactive responses from high-ranking players to show real-time architecture feedback!
    if (Math.random() > 0.3) {
      setTimeout(() => {
        const opposingAtletas = players.filter(p => p.id !== loggedPlayerId);
        if (opposingAtletas.length === 0) return;
        const randomAth = opposingAtletas[Math.floor(Math.random() * opposingAtletas.length)];
        
        const responseMsg: ChatMessage = {
          id: `msg_bot_${Date.now()}`,
          senderId: randomAth.id,
          senderName: randomAth.name,
          senderPhoto: randomAth.photoUrl,
          text: mockBanterPhrases[Math.floor(Math.random() * mockBanterPhrases.length)],
          timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
          channel: activeChannel,
          isBanter: true
        };

        setMessages(prev => [...prev, responseMsg]);
      }, 1500);
    }
  };

  const handleClearChat = () => {
    setMessages([]);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start" id="resenha-chat-component">
      
      {/* Left Column: Chat Room Interface (7 columns) */}
      <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-100 shadow-sm flex flex-col overflow-hidden h-[600px]">
        
        {/* Chat Room Header */}
        <div className="bg-slate-900 text-white p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-indigo-500/20 text-indigo-400 rounded-xl">
              <MessageSquare className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h3 className="font-bold text-xs sm:text-sm tracking-tight">Resenha da Liga Salvador</h3>
              <p className="text-[10px] text-indigo-200">Canal interativo com sincronização NoSQL simulada</p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-ping"></span>
            <span className="text-[9px] font-mono text-emerald-400 font-bold">12 ATIVOS</span>
          </div>
        </div>

        {/* Channel SELECT BAR */}
        <div className="bg-slate-50 border-b border-slate-150 p-2 flex gap-1">
          <button
            onClick={() => setActiveChannel('geral')}
            className={`px-3 py-1.5 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
              activeChannel === 'geral' 
                ? 'bg-indigo-600 text-white shadow-sm' 
                : 'text-slate-650 hover:bg-slate-200'
            }`}
          >
            💬 Canal Geral
          </button>
          <button
            onClick={() => setActiveChannel('arena_salvador')}
            className={`px-3 py-1.5 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
              activeChannel === 'arena_salvador' 
                ? 'bg-indigo-600 text-white shadow-sm' 
                : 'text-slate-650 hover:bg-slate-200'
            }`}
          >
            🏟️ Mural Arenas
          </button>
          <button
            onClick={() => setActiveChannel('parceria')}
            className={`px-3 py-1.5 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
              activeChannel === 'parceria' 
                ? 'bg-indigo-600 text-white shadow-sm' 
                : 'text-slate-650 hover:bg-slate-200'
            }`}
          >
            🤝 Procurar Dupla
          </button>
        </div>

        {/* Message Feed container */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-slate-50/50">
          
          <div className="text-center py-2">
            <span className="text-[9px] bg-slate-150 text-slate-500 font-bold px-2 py-0.5 rounded-full uppercase tracking-widest text-[8px]">
              {activeChannel === 'geral' && 'Canal Geral de Futevôlei Soteropolitano'}
              {activeChannel === 'arena_salvador' && 'Mural Oficial de Arenas Parceiras'}
              {activeChannel === 'parceria' && 'Quadro de Recrutamento de Duplas'}
            </span>
          </div>

          {messages.filter(m => m.channel === activeChannel).length === 0 ? (
            <div className="text-center py-12 space-y-2">
              <span className="text-3xl">🕊️</span>
              <p className="text-[11px] text-slate-400">Nenhuma resenha aqui ainda... Seja o primeiro a mandar!</p>
            </div>
          ) : (
            messages.filter(m => m.channel === activeChannel).map((msg) => {
              const isMe = msg.senderId === loggedPlayerId;
              return (
                <div 
                  key={msg.id} 
                  className={`flex items-start gap-2.5 max-w-[85%] ${
                    isMe ? 'ml-auto flex-row-reverse' : ''
                  }`}
                >
                  <img 
                    src={msg.senderPhoto} 
                    alt={msg.senderName} 
                    className="w-8 h-8 rounded-full border border-slate-200 shrink-0 object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="space-y-1">
                    <div className={`flex items-center gap-1.5 text-[10px] text-slate-400 ${
                      isMe ? 'justify-end' : ''
                    }`}>
                      <span className="font-bold text-slate-700">{msg.senderName}</span>
                      <span>•</span>
                      <span>{msg.timestamp}</span>
                    </div>

                    <div className={`p-3 rounded-2xl relative ${
                      isMe 
                        ? 'bg-indigo-600 text-white rounded-tr-none' 
                        : msg.isBanter 
                        ? 'bg-rose-50 text-slate-800 border border-rose-100 rounded-tl-none'
                        : 'bg-white text-slate-800 border border-slate-100 rounded-tl-none shadow-xs'
                    }`}>
                      {msg.isBanter && (
                        <span className="absolute -top-1.5 -right-1.5 bg-rose-500 text-white rounded-full text-[8px] px-1 font-mono uppercase font-black tracking-wider shadow-sm scale-90">
                          Resenha🔥
                        </span>
                      )}
                      <p className="text-xs leading-relaxed">{msg.text}</p>
                    </div>
                  </div>
                </div>
              );
            })
          )}
          <div ref={chatBottomRef} />
        </div>

        {/* Quick Banter Suggestions Box */}
        <div className="bg-slate-100 p-2.5 border-t border-slate-150 flex gap-2 overflow-x-auto whitespace-nowrap scrollbar-none shrink-0">
          <span className="text-[10px] text-slate-400 font-extrabold pr-1 flex items-center shrink-0">
            Provocações Rápidas:
          </span>
          {mockBanterPhrases.map((phrase, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(phrase)}
              className="px-2.5 py-1 bg-white hover:bg-slate-50 border border-slate-200 rounded-full text-[10px] font-semibold text-slate-650 cursor-pointer transition-colors shadow-xs"
            >
              🚀 {phrase}
            </button>
          ))}
        </div>

        {/* Chat input box */}
        <div className="p-3 border-t border-slate-150 flex gap-2 bg-white shrink-0">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSendMessage();
            }}
            placeholder={`Falando como ${activePlayer.name}...`}
            className="flex-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-indigo-500 focus:bg-white"
          />
          <button
            onClick={() => handleSendMessage()}
            className="p-2.5 bg-indigo-600 hover:bg-indigo-750 text-white rounded-xl transition-all shadow cursor-pointer active:scale-95"
            title="Enviar mensagem"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>

      </div>

      {/* Right Column: Architectural impact explanation & telemetry rules (5 columns) */}
      <div className="lg:col-span-5 space-y-5">
        
        {/* Core Architectural Verdict Box */}
        <div className="bg-gradient-to-br from-indigo-950 to-slate-900 text-white p-5 rounded-3xl border border-indigo-500/10 shadow-sm space-y-4">
          <div className="space-y-1">
            <span className="text-indigo-400 text-[10px] font-black uppercase tracking-widest block">Análise de Engenharia NoSQL</span>
            <h3 className="font-black text-sm tracking-tight text-white flex items-center gap-1.5">
              <Share2 className="w-4 h-4 text-indigo-400" />
              <span>Podemos implantar agora?</span>
            </h3>
          </div>

          <div className="space-y-3.5 text-xs text-slate-300 leading-relaxed">
            <p>
              <strong>Sim! E mais importante:</strong> Utilizando o Firebase Firestore, resolvemos isso de forma 100% serverless, sem gastar nada com servidores WebSocket próprios.
            </p>
            <p>
              O SDK do Firestore possui suporte nativo ao método <code className="text-amber-400 bg-white/5 px-1 py-0.5 rounded font-mono font-bold text-[10.5px]">onSnapshot()</code>. 
              Ele escuta mudanças em coleções de forma bidirecional através de canais gRPC e re-renderiza a tela do usuário em milissegundos com barreira de consumo insignificante.
            </p>
          </div>

          {/* Key Advantages Matrix */}
          <div className="border-t border-white/5 pt-3.5 space-y-2 text-[11px]">
            <div className="flex items-start gap-2">
              <div className="mt-0.5 p-0.5 bg-emerald-500/15 rounded text-emerald-400">
                <CheckCheck className="w-3.5 h-3.5" />
              </div>
              <div>
                <strong className="text-white block font-bold">Custo-Benefício Extremo</strong>
                <span className="text-slate-400">Ao contrário de WebSockets abertos em servidores dedicados (que cobram por hora online), o Firestore cobra apenas por leituras/escritas. Se ninguém estiver conversando, o custo é literal zero.</span>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <div className="mt-0.5 p-0.5 bg-emerald-500/15 rounded text-emerald-400">
                <CheckCheck className="w-3.5 h-3.5" />
              </div>
              <div>
                <strong className="text-white block font-bold">Resiliência Offline Coerente</strong>
                <span className="text-slate-400">Se a conexão cair na quadra, as mensagens do atleta ficam em fila local (cache) e são enviadas automaticamente ao recuperar sinal.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Database Colection Design Draft */}
        <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-50 pb-2">
            <Info className="w-4.5 h-4.5 text-indigo-500" />
            <h4 className="font-extrabold text-slate-900 text-xs uppercase tracking-wider">Novo Schema NoSQL: Coleção de Resenhas</h4>
          </div>

          <p className="text-xs text-slate-600 leading-relaxed">
            Para acomodar essa funcionalidade sem impactar o desempenho do ranking das arenas, estruturamos uma coleção de mensagens isolada na raiz:
          </p>

          <pre className="text-[10px] font-mono text-slate-700 bg-slate-50 p-3 rounded-xl overflow-x-auto whitespace-pre leading-relaxed border border-slate-200">
{`// COLEÇÃO FIRESTORE: /resenhas/{messageId}
{
  "senderId":  "string (Player ID)",
  "senderName": "string",
  "senderPhoto": "string (URL)",
  "channel":    "string (geral | arena | parceria)",
  "text":       "string (máximo 250 caracteres)",
  "timestamp":  "timestamp (data/hora oficial)",
  "isBanter":   "boolean (se possui provocações)"
}`}
          </pre>

          {/* Security Rules Snippet */}
          <div className="space-y-2">
            <span className="text-[10px] text-slate-500 font-bold block uppercase tracking-wide">Regra de Segurança Recomendada (firestore.rules)</span>
            <div className="bg-slate-900 rounded-xl p-3 text-[10px] font-mono text-slate-300 overflow-x-auto border border-slate-800 leading-relaxed">
{`match /resenhas/{messageId} {
  // Atletas logados podem ler; criação permitida se o payload bater com a identidade autêntica
  allow read: if request.auth != null;
  allow create: if request.auth != null 
                && request.resource.data.senderId == request.auth.uid
                && request.resource.data.text.size() <= 250;
  // Mensagens são imutáveis após registradas
  allow update, delete: if false; 
}`}
            </div>
          </div>
          
          <button
            onClick={handleClearChat}
            className="w-full py-2 bg-slate-100 hover:bg-rose-50 text-slate-650 hover:text-rose-700 border border-slate-200 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Limpar Histórico de Testes</span>
          </button>
        </div>

      </div>

    </div>
  );
}
