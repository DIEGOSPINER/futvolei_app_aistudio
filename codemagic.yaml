/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Coins, 
  Tv, 
  CreditCard, 
  Check, 
  Smartphone, 
  Server, 
  Lock, 
  HelpCircle, 
  DollarSign, 
  Megaphone,
  Bell,
  Code2,
  Copy,
  CheckCircle2,
  AlertTriangle,
  Flame,
  ArrowRight
} from 'lucide-react';

interface MonetizationHubProps {
  monetizationPhase: 'ads' | 'subscription';
  setMonetizationPhase: (phase: 'ads' | 'subscription') => void;
  isPremium: boolean;
  setIsPremium: (isPremium: boolean) => void;
  isSimulationActive: boolean;
  setIsSimulationActive: (active: boolean) => void;
}

export default function MonetizationHub({
  monetizationPhase,
  setMonetizationPhase,
  isPremium,
  setIsPremium,
  isSimulationActive,
  setIsSimulationActive
}: MonetizationHubProps) {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [codeTab, setCodeTab] = useState<'flutter_ads' | 'stripe_backend' | 'rules_security'>('flutter_ads');
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const triggerCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(id);
    setTimeout(() => setCopiedText(null), 2500);
  };

  const adCodeSnippet = `// DEPENDÊNCIAS (pubspec.yaml)
// dependencies:
//   google_mobile_ads: ^4.0.0

import 'package:flutter/material.dart';
import 'package:google_mobile_ads/google_mobile_ads.dart';

class AdBannerWidget extends StatefulWidget {
  const AdBannerWidget({Key? key}) : super(key: key);

  @override
  State<AdBannerWidget> createState() => _AdBannerWidgetState();
}

class _AdBannerWidgetState extends State<AdBannerWidget> {
  BannerAd? _bannerAd;
  bool _isLoaded = false;

  // IDs oficiais de teste da Google para homologação segura
  final String adUnitId = Platform.isAndroid
      ? 'ca-app-pub-3940256099942544/6300978111' // Test Unit Android
      : 'ca-app-pub-3940256099942544/2934735716'; // Test Unit iOS

  @override
  void initState() {
    super.initState();
    _loadAd();
  }

  void _loadAd() {
    _bannerAd = BannerAd(
      adUnitId: adUnitId,
      request: const AdRequest(),
      size: AdSize.banner,
      listener: BannerAdListener(
        onAdLoaded: (ad) {
          setState(() {
            _isLoaded = true;
          });
        },
        onAdFailedToLoad: (ad, err) {
          print('Falha ao carregar banner: $err');
          ad.dispose();
        },
      ),
    )..load();
  }

  @override
  void dispose() {
    _bannerAd?.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    if (!_isLoaded || _bannerAd == null) {
      return const SizedBox(height: 0); // Oculta bloco se falhar
    }
    return Container(
      alignment: Alignment.center,
      width: _bannerAd!.size.width.toDouble(),
      height: _bannerAd!.size.height.toDouble(),
      child: AdWidget(ad: _bannerAd!),
    );
  }
}`;

  const stripeBackendCode = `// API GATEWAY NODEJS - EXPRESS + STRIPE SUBSCRIPTION
// npm install stripe express firestore-admin

import express from "express";
import Stripe from "stripe";
import { getFirestore } from "firebase-admin/firestore";

const app = express();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16",
});

// Endpoint 1: Iniciar fluxo de Checkout da Assinatura VIP
app.post("/api/checkout/membership", async (req, res) => {
  const { userId, userEmail } = req.body; // Identificação do atleta logado

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card", "pix"],
      mode: "subscription",
      customer_email: userEmail,
      client_reference_id: userId,
      line_items: [{
        price: "price_1P9FutevoleiVIPSalvador", // PREÇO CONFIGURADO NO STRIPE
        quantity: 1,
      }],
      success_url: "https://futevoleisallvador.web.app/membership/success?session_id={CHECKOUT_SESSION_ID}",
      cancel_url: "https://futevoleisallvador.web.app/membership/pricing",
    });

    res.json({ checkoutUrl: session.url });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// Endpoint 2: Webhook Oficial Stripe p/ Habilitar VIP de forma assíncrona
app.post("/webhook/stripe", express.raw({ type: "application/json" }), async (req, res) => {
  const sig = req.headers["stripe-signature"]!;
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body, sig, process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err: any) {
    return res.status(400).send(\`Webhook Error: \${err.message}\`);
  }

  // Escuta os eventos de ciclo de vida contratual
  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const userId = session.client_reference_id; // User ID retornado

    if (userId) {
      // Grava diretamente no documento NoSQL do Firestore
      const db = getFirestore();
      await db.collection("players").doc(userId).update({
        isVIP: true,
        stripeCustomerId: session.customer,
        stripeSubscriptionId: session.subscription,
        membershipActiveSince: new Date().toISOString()
      });
      console.log(\`Atleta \${userId} promovido a VIP com sucesso via Stripe!\`);
    }
  }

  // Desativa VIP se cancelar assinatura
  if (event.type === "customer.subscription.deleted") {
    const subscription = event.data.object as Stripe.Subscription;
    const db = getFirestore();
    const snap = await db.collection("players")
      .where("stripeSubscriptionId", "==", subscription.id)
      .limit(1)
      .get();
    
    if (!snap.empty) {
      const userDoc = snap.docs[0];
      await userDoc.ref.update({ isVIP: false });
    }
  }

  res.json({ received: true });
});`;

  const securityRulesCode = `// firestore.rules
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // Auxiliar para checar se o atleta efetuou assinatura VIP homologada via Stripe
    function isVipAthlete(userId) {
      return get(/documents/database/$(database)/documents/players/$(userId)).data.isVIP == true;
    }

    match /players/{userId} {
      allow read: if request.auth != null;
      // Permite autogestão básica, mas edição de flag 'isVIP' somente via Admin (Backend Stripe Webhook)
      allow update: if request.auth.uid == userId 
                     && request.resource.data.isVIP == resource.data.isVIP;
      allow create: if request.auth != null;
    }

    match /matches/{matchId} {
      // SOB PAYWALL CASO SEJA FASE 2:
      // O atleta precisa ter assinatura VIP ativa para registrar partidas no circuito competitivo
      allow create: if request.auth != null && isVipAthlete(request.auth.uid);
      allow update: if request.auth != null; 
      allow read: if request.auth != null;
    }

    match /arenas/{arenaId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && get(/documents/database/$(database)/documents/players/$(request.auth.uid)).data.role == "host";
    }
  }
}`;

  const faqs = [
    {
      q: "Como começar com anúncios sem frustrar os atletas?",
      a: "Coloque anúncios simples em banner no rodapé da visualização de listagem de partidas e rankings. Evite anúncios em vídeo (Interstitials) ao tentar registrar partidas correntes, para evitar desistência. Use o canal gratuito para popular as Arenas locais de Salvador."
    },
    {
      q: "Qual é o momento ideal para fechar o aplicativo e cobrar assinatura?",
      a: "O gatilho recomendado é atingir cerca de 500 usuários ativos mensais ou no encerramento de um circuito promocional curto (ex: após 3 meses de ranking consolidado). Ofereça planos anuais atraentes para as Arenas filiadas (Clubhouse VIP)."
    },
    {
      q: "O Stripe é seguro e funciona para pagamentos no Brasil via Pix?",
      a: "Sim, o Stripe possui suporte nativo a cartões e ao Pix recorrente/avulso no Brasil. O webhook é disparado segundos após a confirmação do Pix e altera a propriedade 'isVIP' de maneira 100% automatizada no Firebase."
    },
    {
      q: "Como estruturar os benefícios da assinatura premium?",
      a: "Proponha: (1) Histórico estatístico estendido, (2) Emissão de selos/estrelas VIP de destaque nos rankings, (3) Lançamento ilimitado de partidas em Arenas homologadas da Liga Fut, (4) Alertas sms/push de fraudes em tempo de jogo."
    }
  ];

  return (
    <div className="flex flex-col space-y-6" id="monetization-hub-view">
      
      {/* Upper Interactive Panel */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-6 shadow-xl border border-indigo-500/10">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          
          <div className="space-y-2">
            <span className="px-3 py-1 bg-indigo-500/20 text-indigo-300 rounded-full text-[10px] font-black uppercase tracking-wider border border-indigo-400/20 inline-flex items-center gap-1">
              <Coins className="w-3.5 h-3.5" />
              Estratégia de Lançamento Comercial
            </span>
            <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white leading-tight">
              Estratégia de Monetização e Lançamento
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm max-w-2xl leading-relaxed">
              Consolide sua base de atletas de Salvador de forma gratuita utilizando publicidade não intrusiva. Após estabelecer a tração do circuito, vire a chave para o modelo paywall de assinatura premium (VIP).
            </p>
          </div>

          {/* Quick Sandbox Controls */}
          <div className="w-full lg:w-auto bg-white/5 backdrop-blur-md p-4 rounded-2xl border border-white/10 shrink-0 space-y-3.5">
            <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-2">
              <span className="text-[11px] font-bold text-indigo-300 uppercase tracking-widest block">Sandbox de Simulação</span>
              <div className="flex items-center gap-1">
                <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                <span className="text-[9px] font-mono text-emerald-400">ATIVO</span>
              </div>
            </div>

            {/* Toggle Simulator Feature */}
            <div className="flex items-center justify-between text-xs gap-6">
              <div className="space-y-0.5">
                <span className="font-bold text-slate-200 block">Modo Piloto Visual</span>
                <span className="text-[10px] text-slate-400 block font-light">Renderiza anúncios ou paywalls na tela</span>
              </div>
              <button
                onClick={() => setIsSimulationActive(!isSimulationActive)}
                className={`px-3 py-1.5 rounded-lg text-[10px] font-extrabold cursor-pointer transition-all ${
                  isSimulationActive 
                    ? 'bg-emerald-500 text-slate-950 shadow' 
                    : 'bg-white/10 text-slate-300'
                }`}
              >
                {isSimulationActive ? 'ATIVADO' : 'DESATIVADO'}
              </button>
            </div>

            {/* Switch Monetization Mode */}
            <div className="flex items-center justify-between text-xs gap-6 border-t border-white/5 pt-3">
              <div className="space-y-0.5">
                <span className="font-bold text-slate-200 block">Fase Corrente do App</span>
                <span className="text-[10px] text-slate-400 block font-light">Selecione o modelo comercial de testes</span>
              </div>
              <div className="flex bg-slate-800 p-0.5 rounded-lg border border-slate-700">
                <button
                  onClick={() => setMonetizationPhase('ads')}
                  className={`px-2.5 py-1 text-[10px] font-bold rounded-md transition-all cursor-pointer ${
                    monetizationPhase === 'ads' 
                      ? 'bg-indigo-500 text-white' 
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Fase 1 (Ads)
                </button>
                <button
                  onClick={() => setMonetizationPhase('subscription')}
                  className={`px-2.5 py-1 text-[10px] font-bold rounded-md transition-all cursor-pointer ${
                    monetizationPhase === 'subscription' 
                      ? 'bg-indigo-500 text-white' 
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Fase 2 (VIP)
                </button>
              </div>
            </div>

            {/* Simulate Premium Account Status */}
            {monetizationPhase === 'subscription' && (
              <div className="flex items-center justify-between text-xs gap-6 border-t border-white/5 pt-3">
                <div className="space-y-0.5">
                  <span className="font-bold text-slate-200 block">Status Atleta Ativo</span>
                  <span className="text-[10px] text-slate-400 block font-light">Testar comportamento de paywall</span>
                </div>
                <button
                  onClick={() => setIsPremium(!isPremium)}
                  className={`px-3 py-1.5 rounded-lg text-[10px] font-extrabold cursor-pointer transition-all ${
                    isPremium 
                      ? 'bg-amber-500 text-slate-950' 
                      : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                  }`}
                >
                  {isPremium ? '💎 VIP PRESTÍGIO' : '❌ GRÁTIS / LIMITADO'}
                </button>
              </div>
            )}

          </div>

        </div>
      </div>

      {/* Visual Simulation Indicators */}
      {isSimulationActive && (
        <div className="bg-amber-50 border border-amber-200 p-4 rounded-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-start gap-2.5">
            <span className="p-1.5 bg-amber-100 rounded text-amber-800 animate-bounce">
              <Megaphone className="w-4.5 h-4.5" />
            </span>
            <div className="leading-snug">
              <strong className="text-slate-900 text-xs block font-bold">Feedback do Sandbox Comercial Habilitado</strong>
              <p className="text-[11px] text-slate-600">
                {monetizationPhase === 'ads' 
                  ? '📢 Atualmente em FASE 1 (Grátis): Observe que anúncios em banner simulados começaram a aparecer de forma sutil na parte inferior de todas as suas abas principais.' 
                  : '🔒 Atualmente em FASE 2 (VIP): Funções avançadas de escrita NoSQL (como simular transações de novas partidas competitivas) agora solicitam upgrade de assinatura premium para atletas que não são VIP.'}
              </p>
            </div>
          </div>
          {monetizationPhase === 'subscription' && !isPremium && (
            <button
              onClick={() => setIsPremium(true)}
              className="px-3.5 py-1.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-black rounded-xl text-xs flex items-center gap-1 cursor-pointer shadow-sm transition-all text-center self-stretch md:self-auto justify-center"
            >
              <span>Simular Upgrade VIP</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      )}

      {/* Structured Roadmap Matrix */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        
        {/* Phase 1 Details */}
        <div className={`p-5 rounded-2xl border transition-all ${
          monetizationPhase === 'ads' 
            ? 'bg-white border-indigo-200 shadow-sm' 
            : 'bg-white/60 border-slate-100 opacity-80'
        }`}>
          <div className="flex items-center justify-between mb-3 border-b border-slate-50 pb-2">
            <div className="flex items-center gap-1.5">
              <Tv className="w-5 h-5 text-indigo-500" />
              <h3 className="font-extrabold text-slate-900 text-sm">Fase 1: Captação com Anúncios</h3>
            </div>
            <span className="text-[10px] font-black uppercase text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded">
              Lançamento Piloto
            </span>
          </div>

          <p className="text-xs text-slate-600 leading-relaxed mb-4">
            Distribua seu aplicativo gratuitamente na Google Play e App Store de Salvador. Integre banners rápidos do <strong>Google AdMob</strong> de forma leve para monetizar o engajamento diário sem repelir cliques.
          </p>

          <div className="space-y-2.5">
            <div className="flex items-start gap-2 text-xs">
              <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              <div className="leading-snug">
                <strong className="text-slate-800 block text-[11px] font-bold">Barreira de Entrada Zero</strong>
                <span className="text-[10.5px] text-slate-500">Aumenta o volume de novas duplas e arenas cadastradas rapidamente.</span>
              </div>
            </div>
            <div className="flex items-start gap-2 text-xs">
              <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              <div className="leading-snug">
                <strong className="text-slate-800 block text-[11px] font-bold">Anúncios Contextuais</strong>
                <span className="text-[10.5px] text-slate-500">Monetize com publicidade segmentada para vestuários e aluguel de quadra na capital.</span>
              </div>
            </div>
            <div className="flex items-start gap-2 text-xs">
              <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              <div className="leading-snug">
                <strong className="text-slate-800 block text-[11px] font-bold">Análise Comportamental</strong>
                <span className="text-[10.5px] text-slate-500">Mapeie quem são os atletas mais frequentes para focar a conversão futura.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Phase 2 Details */}
        <div className={`p-5 rounded-2xl border transition-all ${
          monetizationPhase === 'subscription' 
            ? 'bg-white border-amber-300 shadow-sm' 
            : 'bg-white/60 border-slate-100 opacity-80'
        }`}>
          <div className="flex items-center justify-between mb-3 border-b border-slate-50 pb-2">
            <div className="flex items-center gap-1.5">
              <CreditCard className="w-5 h-5 text-amber-500" />
              <h3 className="font-extrabold text-slate-900 text-sm">Fase 2: Clube de Assinatura VIP</h3>
            </div>
            <span className="text-[10px] font-black uppercase text-amber-700 bg-amber-50 px-2 py-0.5 rounded">
              Receita Recorrente
            </span>
          </div>

          <p className="text-xs text-slate-600 leading-relaxed mb-4">
            Inicie a transição fechando os cadastros e mantendo as estatísticas em tempo real exclusivas para membros pagantes (Assinatura VIP). Ofereça formas flexíveis de pagamento como cartões e faturamento via Pix.
          </p>

          <div className="space-y-2.5">
            <div className="flex items-start gap-2 text-xs">
              <Check className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
              <div className="leading-snug">
                <strong className="text-slate-800 block text-[11px] font-bold">Cobrança e Contratos Estáveis</strong>
                <span className="text-[10.5px] text-slate-500">Segurança de receita recorrente mensal (MRR) para novos investimentos.</span>
              </div>
            </div>
            <div className="flex items-start gap-2 text-xs">
              <Check className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
              <div className="leading-snug">
                <strong className="text-slate-800 block text-[11px] font-bold">Selos de Prestígio e Diferenciais</strong>
                <span className="text-[10.5px] text-slate-500">Habilite o renderizador de estrelas douradas e títulos anuais de forma destacada no layout.</span>
              </div>
            </div>
            <div className="flex items-start gap-2 text-xs">
              <Check className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
              <div className="leading-snug">
                <strong className="text-slate-800 block text-[11px] font-bold">Retenção Através da Elite</strong>
                <span className="text-[10.5px] text-slate-500">As Arenas pagam licenças corporativas para figurar como sedes oficiais da Federação.</span>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Code Repositories & Security Rules */}
      <div className="bg-slate-900 text-slate-100 rounded-2xl border border-slate-800 overflow-hidden shadow-md">
        
        {/* Code Header Bar */}
        <div className="bg-slate-950 p-4 border-b border-slate-850 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="space-y-0.5">
            <h4 className="text-xs uppercase font-black text-slate-400 tracking-widest flex items-center gap-1.5">
              <Code2 className="w-4 h-4 text-indigo-400" />
              <span>Gabarito e Blueprint de Códigos</span>
            </h4>
            <p className="text-[10.5px] text-slate-500">Códigos limpos e prontos para produção em seu app móvel.</p>
          </div>

          <div className="flex bg-slate-900 border border-slate-800 p-0.5 rounded-xl text-xs">
            <button
              onClick={() => setCodeTab('flutter_ads')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all flex items-center gap-1 cursor-pointer ${
                codeTab === 'flutter_ads' 
                  ? 'bg-slate-850 text-white shadow-sm' 
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5 text-rose-400" />
              <span>Anúncios (Flutter)</span>
            </button>
            <button
              onClick={() => setCodeTab('stripe_backend')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all flex items-center gap-1 cursor-pointer ${
                codeTab === 'stripe_backend' 
                  ? 'bg-slate-850 text-white shadow-sm' 
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Server className="w-3.5 h-3.5 text-emerald-400" />
              <span>Assinatura (Stripe Webhook)</span>
            </button>
            <button
              onClick={() => setCodeTab('rules_security')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all flex items-center gap-1 cursor-pointer ${
                codeTab === 'rules_security' 
                  ? 'bg-slate-850 text-white shadow-sm' 
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Lock className="w-3.5 h-3.5 text-amber-500" />
              <span>Paywall (NoSQL Rules)</span>
            </button>
          </div>
        </div>

        {/* Code Content View */}
        <div className="p-4 relative">
          <button
            onClick={() => {
              const text = codeTab === 'flutter_ads' 
                ? adCodeSnippet 
                : codeTab === 'stripe_backend' 
                ? stripeBackendCode 
                : securityRulesCode;
              triggerCopy(text, codeTab);
            }}
            className="absolute right-4 top-4 px-2.5 py-1.5 bg-slate-950/80 hover:bg-slate-950 border border-slate-800 rounded-lg text-xs text-indigo-400 hover:text-indigo-300 transition-all font-semibold flex items-center gap-1 shadow cursor-pointer z-10"
          >
            {copiedText === codeTab ? (
              <>
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400 font-mono text-[10px]">Copiado!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span className="text-[10px]">Copiar Código</span>
              </>
            )}
          </button>

          <pre className="text-[10.5px] font-mono text-slate-300 leading-relaxed overflow-x-auto max-h-[360px] p-2 whitespace-pre">
            {codeTab === 'flutter_ads' && adCodeSnippet}
            {codeTab === 'stripe_backend' && stripeBackendCode}
            {codeTab === 'rules_security' && securityRulesCode}
          </pre>
        </div>
      </div>

      {/* Frequently Asked Questions */}
      <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
        <h3 className="font-extrabold text-slate-900 text-sm mb-4 flex items-center gap-2 border-b border-slate-50 pb-2">
          <HelpCircle className="w-4.5 h-4.5 text-slate-500" />
          <span>F.A.Q. de Monetização para Futevôlei</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {faqs.map((faq, index) => (
            <div 
              key={index}
              onClick={() => setActiveFaq(activeFaq === index ? null : index)}
              className="p-3.5 bg-slate-50 border border-slate-150 rounded-xl cursor-pointer hover:border-indigo-200 transition-colors"
            >
              <div className="flex items-center justify-between gap-3 mb-1">
                <strong className="text-slate-800 font-bold text-xs block leading-tight">{faq.q}</strong>
                <span className="text-xs text-slate-400 shrink-0">{activeFaq === index ? '▲' : '▼'}</span>
              </div>
              <p className={`text-[10.5px] text-slate-550 leading-relaxed mt-1.5 border-t border-slate-200/50 pt-2 transition-all duration-300 ${
                activeFaq === index ? 'block opacity-100' : 'hidden opacity-0'
              }`}>
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
