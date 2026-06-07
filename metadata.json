/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { 
  Sparkles, 
  Video, 
  HelpCircle, 
  Play, 
  Square, 
  CheckCircle2, 
  Activity, 
  RotateCcw, 
  Cpu, 
  TrendingUp, 
  Award, 
  Flame,
  Volume2,
  Lock,
  Camera,
  Layers,
  FileText
} from 'lucide-react';

interface CoachIAProps {
  isPremium: boolean;
  setIsPremium: (is: boolean) => void;
}

export default function CoachIA({ isPremium, setIsPremium }: CoachIAProps) {
  const [isTracking, setIsTracking] = useState(false);
  const [trackingState, setTrackingState] = useState<'idle' | 'calibrando' | 'detectando' | 'concluido'>('idle');
  
  // Fundamentos trackers (counts)
  const [counts, setCounts] = useState({
    peitada: 0,
    coxa: 0,
    cabeceio: 0,
    chapa: 0
  });

  const [aiReport, setAiReport] = useState<string>('');
  const [isGeneratingReport, setIsGeneratingReport] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const requestRef = useRef<number | null>(null);

  // Animation ticks inside simulated camera view
  useEffect(() => {
    if (trackingState !== 'detectando' || !canvasRef.current) return;

    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) return;

    let frameCount = 0;
    
    // Simulate incremental counts at random checkpoints
    const timerId = setInterval(() => {
      const lucky = Math.random();
      if (lucky < 0.25) {
        setCounts(prev => ({ ...prev, peitada: prev.peitada + 1 }));
      } else if (lucky < 0.50) {
        setCounts(prev => ({ ...prev, coxa: prev.coxa + 1 }));
      } else if (lucky < 0.75) {
        setCounts(prev => ({ ...prev, cabeceio: prev.cabeceio + 1 }));
      } else {
        setCounts(prev => ({ ...prev, chapa: prev.chapa + 1 }));
      }
    }, 2800);

    const drawGrid = () => {
      if (!ctx || !canvasRef.current) return;
      const width = canvasRef.current.width;
      const height = canvasRef.current.height;

      // Clear dark slate arena frame
      ctx.fillStyle = '#0f172a'; // slate-900
      ctx.fillRect(0, 0, width, height);

      // Draw vector diagonal angle calibration guidelines in golden color
      ctx.strokeStyle = 'rgba(245, 158, 11, 0.25)'; // amber-500
      ctx.lineWidth = 1;

      // Vertical helper lines
      for (let i = 0; i < width; i += 40) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, height);
        ctx.stroke();
      }
      // Horizontal helper lines
      for (let j = 0; j < height; j += 40) {
        ctx.beginPath();
        ctx.moveTo(0, j);
        ctx.lineTo(width, j);
        ctx.stroke();
      }

      // Draw camera diagonal safety boundaries
      ctx.strokeStyle = '#3b82f6'; // blue-500
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(width / 2, height / 2, 90, 0, 2 * Math.PI);
      ctx.stroke();

      // Text status display
      ctx.fillStyle = '#60a5fa'; // blue-400
      ctx.font = 'bold 9px monospace';
      ctx.fillText('DIAGONAL ALIGNMENT: 45° APPROVED', 20, 25);
      ctx.fillText(`FRAMES BUFFERED: ${30 + (frameCount % 10)} FPS`, 20, 40);

      // Pulsing skeleton points simulating MediaPipe nodes
      const pulseRadius = 3 + Math.abs(Math.sin(frameCount * 0.15)) * 4;
      
      // Node 1: Cabeca / Cabeceio
      ctx.fillStyle = '#f43f5e'; // rose-500
      ctx.beginPath();
      ctx.arc(200, 70, pulseRadius, 0, 2 * Math.PI);
      ctx.fill();
      ctx.strokeStyle = 'white';
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.fillStyle = 'white';
      ctx.fillText('HEAD NODE', 215, 74);

      // Node 2: Peito / Ombros
      ctx.fillStyle = '#3b82f6'; // blue-500
      ctx.beginPath();
      ctx.arc(195, 120, 6, 0, 2 * Math.PI);
      ctx.fill();
      ctx.fillText('CHEST (PEITADA)', 210, 124);

      // Node 3: Quadril / Coxa
      ctx.fillStyle = '#8b5cf6'; // violet-500
      ctx.beginPath();
      ctx.arc(180, 175, pulseRadius, 0, 2 * Math.PI);
      ctx.fill();
      ctx.fillText('KNEE / COXA NODE', 195, 179);

      // Node 4: Pe / Chapa
      ctx.fillStyle = '#10b981'; // emerald-500
      ctx.beginPath();
      ctx.arc(170, 230, 5, 0, 2 * Math.PI);
      ctx.fill();
      ctx.fillText('FOOT / CHAPA NODE', 185, 234);

      // Connect vector lines (skeletal structure prediction)
      ctx.strokeStyle = '#64748b'; // slate-500
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(200, 70);
      ctx.lineTo(195, 120);
      ctx.lineTo(180, 175);
      ctx.lineTo(170, 230);
      ctx.stroke();

      // Dynamic scanning laser bar
      const laserY = (frameCount * 1.5) % height;
      ctx.strokeStyle = 'rgba(16, 185, 129, 0.4)'; // emerald lasers
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(0, laserY);
      ctx.lineTo(width, laserY);
      ctx.stroke();

      frameCount++;
      requestRef.current = requestAnimationFrame(drawGrid);
    };

    drawGrid();

    return () => {
      clearInterval(timerId);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [trackingState]);

  // Calibration Phase simulator
  const handleStartTracking = () => {
    setActiveCoachTab('analise');
    setTrackingState('calibrando');
    setCounts({ peitada: 0, coxa: 0, cabeceio: 0, chapa: 0 });
    setAiReport('');

    setTimeout(() => {
      setTrackingState('detectando');
    }, 2000); // 2 seconds calibration time
  };

  const handleStopTracking = () => {
    setTrackingState('concluido');
    if (requestRef.current) cancelAnimationFrame(requestRef.current);

    // Auto trigger Gemini Coach AI Report Simulation after performance logs
    triggerAiAnalysisReport();
  };

  const triggerAiAnalysisReport = () => {
    setIsGeneratingReport(true);
    
    // Simulate real high-intelligence analysis insights based on the counts
    setTimeout(() => {
      const summaryText = `### Relatório de Biomecânica - Futevôlei Coach IA ⭐

**Atleta Monitorado:** Diego Spinola (Nível Competitivo Salvador)
**Posicionamento de Câmera:** Diagonal Lateral (45 graus - Homologado)

#### 📊 Estatísticas Clave Detectadas:
* **Chapas de Pé:** ${counts.chapa || 4} movimentos registrados. Controle excelente de profundidade.
* **Peitadas (Amortecimento):** ${counts.peitada || 3} interceptações. Alinhamento escapular correto.
* **Recepção de Coxa:** ${counts.coxa || 2} toques. Centro de gravidade ligeiramente atrasado na recepção.
* **Cabeceios (Ataque):** ${counts.cabeceio || 5} finalizações de potência.

#### 🧠 Análise do Coach IA:
1. **Ângulo de Chapa (Perna de Apoio):** Detectamos que durante a execução da chapa, seu joelho esquerdo de apoio perde flexão de 12 graus na areia fofa da Bahia, o que força demasiadamente o adutor. Sugerimos dobrar mais a perna de sustentação.
2. **Postura de Peito:** A estabilização de tronco (ombros abertos) obteve nota **9.2/10**. Você amortece a bola no ponto ideal do tórax reduzindo rebotes espúrios para o rival.
3. **Revisão de Coxa:** Evite aproximar os joelhos nos levantamentos curtos; incline as costas ligeiramente para trás (e não para frente) para que a bola ganhe altura limpa para o seu parceiro na rede.

**Recomendação de Treino:** Focar em 3 séries de 10 recepções de coxa alternadas, corrigindo o peso corporal no calcanhar oposto.`;
      
      setAiReport(summaryText);
      setIsGeneratingReport(false);
    }, 2000);
  };

  const handleResetCoach = () => {
    setTrackingState('idle');
    setCounts({ peitada: 0, coxa: 0, cabeceio: 0, chapa: 0 });
    setAiReport('');
  };

  const [activeCoachTab, setActiveCoachTab] = useState<'analise' | 'tecnologia' | 'precos'>('analise');

  return (
    <div className="flex flex-col space-y-6" id="coach-ia-module">
      
      {/* Premium Strategy Header Box */}
      <div className="bg-gradient-to-r from-amber-600 via-amber-700 to-amber-900 text-white rounded-3xl p-5 shadow-lg border border-amber-500/20 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-6 opacity-10 text-8xl font-black rotate-12 select-none">
          🤖
        </div>
        
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
          <div className="space-y-1.5 max-w-3xl">
            <span className="px-3 py-0.5 bg-white/20 text-white rounded-full text-[10px] font-black uppercase tracking-wider border border-white/20 inline-flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" />
              Fase 3: Inteligência de Alto Rendimento
            </span>
            <h2 className="text-xl sm:text-2xl font-black tracking-tight leading-tight">
              Futevôlei Coach IA — Análise de Biomecânica
            </h2>
            <p className="text-amber-100 text-xs sm:text-sm leading-relaxed">
              Posicione o celular na diagonal da quadra. Utilizando inteligência artificial e a biblioteca MediaPipe integrada à câmera, o app identifica os fundamentos e sugere correções posturais imediatas.
            </p>
          </div>

          <div className="shrink-0">
            {isPremium ? (
              <span className="px-4 py-2 bg-slate-900 border border-amber-400 text-amber-400 font-black rounded-2xl text-xs flex items-center gap-1 shadow-md">
                💎 TIER COACH ATIVO
              </span>
            ) : (
              <button
                onClick={() => setIsPremium(true)}
                className="px-4 py-2 bg-white hover:bg-slate-50 text-amber-950 font-black rounded-2xl text-xs transition-all flex items-center gap-1 cursor-pointer shadow"
              >
                <span>Desbloquear Fase 3</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Internal Navigation tabs for explaining the strategy to developers */}
      <div className="flex border-b border-slate-100 gap-1 bg-slate-100 p-1.5 rounded-2xl max-w-md">
        <button
          onClick={() => setActiveCoachTab('analise')}
          className={`flex-1 py-1.5 text-xs font-bold rounded-xl transition-all cursor-pointer ${
            activeCoachTab === 'analise' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500'
          }`}
        >
          📹 Simulador Biomecânico
        </button>
        <button
          onClick={() => setActiveCoachTab('tecnologia')}
          className={`flex-1 py-1.5 text-xs font-bold rounded-xl transition-all cursor-pointer ${
            activeCoachTab === 'tecnologia' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500'
          }`}
        >
          🧠 Arquitetura MediaPipe
        </button>
        <button
          onClick={() => setActiveCoachTab('precos')}
          className={`flex-1 py-1.5 text-xs font-bold rounded-xl transition-all cursor-pointer ${
            activeCoachTab === 'precos' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500'
          }`}
        >
          💰 Estratégia de Preço
        </button>
      </div>

      {activeCoachTab === 'analise' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Simulated Mobile Camera Feed Frame (7 Columns) */}
          <div className="lg:col-span-7 space-y-4">
            
            <div className="bg-slate-950 rounded-3xl p-5 border border-slate-800 shadow-lg relative overflow-hidden flex flex-col justify-between" style={{ minHeight: '380px' }}>
              
              {/* Camera Header UI */}
              <div className="flex items-center justify-between text-xs font-semibold z-10 text-white">
                <span className="flex items-center gap-1.5">
                  <span className={`w-2.5 h-2.5 rounded-full ${isTracking ? 'bg-rose-500 animate-pulse' : 'bg-slate-600'}`}></span>
                  <span className="font-mono text-[10.5px]">MODO_CONFLITO: COACH_CAM</span>
                </span>
                <span className="bg-slate-800 text-[10px] px-2.5 py-1 rounded text-amber-400 font-mono font-bold uppercase">
                  {trackingState === 'idle' && 'AGUARDANDO CONEXÃO'}
                  {trackingState === 'calibrando' && '⏳ CALIBRANDO ÂNGULO...'}
                  {trackingState === 'detectando' && '🔴 GRAVANDO JOGO E ANALISANDO'}
                  {trackingState === 'concluido' && '✓ EXPORTAÇÃO COMPLETA'}
                </span>
              </div>

              {/* Feed Frame display (Canvas or Idle background) */}
              <div className="flex-1 my-4 flex items-center justify-center relative bg-slate-900 rounded-2xl overflow-hidden border border-slate-800">
                {trackingState === 'idle' ? (
                  <div className="text-center p-8 space-y-3.5 z-10 text-slate-400">
                    <span className="p-3 bg-slate-800 rounded-full inline-block text-amber-300">
                      <Camera className="w-8 h-8" />
                    </span>
                    <div className="space-y-1">
                      <strong className="text-white text-xs block font-bold">Simule a Câmera Diagonal no Celular</strong>
                      <p className="text-[10px] text-slate-400 max-w-sm mx-auto leading-relaxed">
                        Coloque o smartphone em pé focado nos cones da quadra. O algoritmo rasteriza as coordenadas corporais para contar os fundamentos em tempo de execução.
                      </p>
                    </div>
                    <button
                      onClick={handleStartTracking}
                      className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-black rounded-xl text-xs transition-colors cursor-pointer inline-flex items-center gap-1"
                    >
                      <Play className="w-3.5 h-3.5" />
                      <span>Iniciar Analisador</span>
                    </button>
                  </div>
                ) : (
                  <canvas 
                    ref={canvasRef} 
                    width={400} 
                    height={260} 
                    className="w-full h-full max-w-md aspect-video block bg-slate-900 border border-slate-800 rounded-xl"
                  />
                )}

                {/* Simulated Floating Overlays during Calibration */}
                {trackingState === 'calibrando' && (
                  <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-6 text-center z-20">
                    <div className="space-y-3 max-w-xs">
                      <div className="inline-block relative">
                        <span className="w-12 h-12 rounded-full border-4 border-amber-500 border-t-transparent animate-spin inline-block"></span>
                        <div className="absolute inset-0 flex items-center justify-center text-[10px] font-mono text-amber-400">45°</div>
                      </div>
                      <div className="leading-snug">
                        <strong className="text-slate-100 text-xs block font-bold">Alinhando Esqueleto de Nós</strong>
                        <p className="text-[10px] text-slate-400">Calculando inclinação espacial em relação ao horizonte...</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Camera footer panel control */}
              {trackingState !== 'idle' && (
                <div className="flex items-center justify-between gap-3 pt-3 border-t border-slate-800/80 z-20">
                  <div className="text-[10.5px] font-mono text-slate-400">
                    {trackingState === 'detectando' ? '📡 TRANSMITINDO IA' : '📋 ESTÁTICA EXPORTADA'}
                  </div>

                  <div className="flex gap-2">
                    {trackingState === 'detectando' && (
                      <button
                        onClick={handleStopTracking}
                        className="px-3.5 py-1.5 bg-rose-600 hover:bg-rose-700 text-white font-extrabold text-[11px] rounded-xl flex items-center gap-1 cursor-pointer transition-colors"
                      >
                        <Square className="w-3.5 h-3.5" />
                        <span>Encerrar Gravação</span>
                      </button>
                    )}

                    {trackingState === 'concluido' && (
                      <button
                        onClick={handleResetCoach}
                        className="px-3.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-white font-extrabold text-[11px] rounded-xl flex items-center gap-1 cursor-pointer transition-colors"
                      >
                        <RotateCcw className="w-3.5 h-3.5 text-slate-300" />
                        <span>Recomeçar</span>
                      </button>
                    )}
                  </div>
                </div>
              )}

            </div>

            {/* Live counters cards */}
            <div className="grid grid-cols-4 gap-3">
              <div className="p-3 bg-white border border-slate-100 rounded-2xl text-center shadow-xs">
                <span className="text-[10px] text-slate-400 font-extrabold block uppercase">Peitadas</span>
                <strong className="text-slate-800 text-lg font-black block font-mono">{counts.peitada}</strong>
                <span className="text-[9px] text-slate-500 font-mono">Peito</span>
              </div>
              <div className="p-3 bg-white border border-slate-100 rounded-2xl text-center shadow-xs">
                <span className="text-[10px] text-slate-400 font-extrabold block uppercase">Coxas</span>
                <strong className="text-slate-800 text-lg font-black block font-mono">{counts.coxa}</strong>
                <span className="text-[9px] text-slate-500 font-mono">Joelho</span>
              </div>
              <div className="p-3 bg-white border border-slate-100 rounded-2xl text-center shadow-xs">
                <span className="text-[10px] text-slate-400 font-extrabold block uppercase">Cabeceios</span>
                <strong className="text-slate-800 text-lg font-black block font-mono">{counts.cabeceio}</strong>
                <span className="text-[9px] text-slate-500 font-mono">Cabeça</span>
              </div>
              <div className="p-3 bg-white border border-slate-100 rounded-2xl text-center shadow-xs">
                <span className="text-[10px] text-slate-400 font-extrabold block uppercase">Chapas</span>
                <strong className="text-slate-800 text-lg font-black block font-mono">{counts.chapa}</strong>
                <span className="text-[9px] text-slate-500 font-mono">Pé</span>
              </div>
            </div>

          </div>

          {/* Right Column: AI Insights report display (5 Columns) */}
          <div className="lg:col-span-5 space-y-4">
            
            <div className="bg-white rounded-3xl border border-slate-100 p-5 shadow-sm space-y-4 min-h-[380px] flex flex-col">
              <div className="flex items-center gap-1.5 border-b border-slate-50 pb-2">
                <Sparkles className="w-5 h-5 text-amber-500" />
                <h3 className="font-extrabold text-slate-900 text-xs uppercase tracking-wider">Coach Inteligência Artificial</h3>
              </div>

              {isGeneratingReport ? (
                <div className="flex-1 flex flex-col items-center justify-center text-center p-8 space-y-2">
                  <div className="w-8 h-8 rounded-full border-2 border-indigo-600 border-t-transparent animate-spin"></div>
                  <p className="text-[11px] text-slate-400 font-mono">O Gemini está interpretando os dados do esqueleto e escrevendo relatório...</p>
                </div>
              ) : aiReport ? (
                <div className="flex-1 overflow-y-auto space-y-3">
                  <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl text-slate-700 leading-relaxed text-xs">
                    <pre className="whitespace-pre-wrap font-sans text-xs text-slate-700" style={{ fontFamily: 'Inter, sans-serif' }}>
                      {aiReport}
                    </pre>
                  </div>
                  <button
                    onClick={handleResetCoach}
                    className="w-full py-2 bg-slate-900 hover:bg-slate-950 text-white rounded-xl text-xs font-bold font-mono transition-transform active:scale-95 cursor-pointer"
                  >
                    CO-SIGN: Gravar no Ranking Histórico
                  </button>
                </div>
              ) : (
                <div className="flex-1 flex flex-col items-center justify-center p-8 text-center text-slate-400 space-y-3">
                  <span className="text-3xl">📋</span>
                  <div className="leading-snug space-y-1">
                    <strong className="text-slate-800 text-xs block font-bold">Aguardando Gravação</strong>
                    <p className="text-[10.5px]">Selecione "Iniciar Analisador" na tela ao lado e complete os fundamentos para gerar os conselhos do Coach IA.</p>
                  </div>
                </div>
              )}
            </div>

          </div>

        </div>
      )}

      {activeCoachTab === 'tecnologia' && (
        <div className="bg-slate-900 text-slate-200 p-6 rounded-3xl border border-slate-800 space-y-5">
          <div className="space-y-1">
            <h3 className="text-sm font-black uppercase text-amber-400 flex items-center gap-1.5 font-mono">
              <Cpu className="w-5 h-5 text-amber-400" />
              <span>Arquitetura de Visão Computacional (MediaPipe)</span>
            </h3>
            <p className="text-xs text-slate-400">Entenda os fluxos de renderização de esqueleto usados no aplicativo de futevôlei.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-850 space-y-1.5">
              <strong className="text-slate-100 font-bold block text-xs">1. Captura de Câmera</strong>
              <p className="text-slate-400 font-light leading-relaxed">
                Utiliza a API WebRTC/Camera do Flutter no celular. O celular precisa estar em pé com inclinação diagonal de cerca de 45 graus para abranger a altura completa do atleta e da rede.
              </p>
            </div>
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-850 space-y-1.5">
              <strong className="text-slate-100 font-bold block text-xs">2. Rasterização de Nós </strong>
              <p className="text-slate-400 font-light leading-relaxed">
                A biblioteca de código aberto MediaPipe do Google mapeia 33 nós de articulação em 3D em tempo real. Identifica mãos, ombros, peito, quadris, joelhos e pés.
              </p>
            </div>
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-850 space-y-1.5">
              <strong className="text-slate-100 font-bold block text-xs">3. Contagem dos Fundamentos</strong>
              <p className="text-slate-400 font-light leading-relaxed">
                Calcula a aceleração instantânea de vetores. Se a bola interceptar a proximidade espacial do vetor de Peito, altera e incrementa o contador correspondente.
              </p>
            </div>
          </div>

          <div className="border-t border-slate-800 pt-4 space-y-2">
            <span className="text-[10px] font-bold text-slate-400 uppercase font-mono block">Estrutura de Amostragem do Log de Eventos</span>
            <div className="bg-slate-950 p-3 rounded-xl font-mono text-[10.5px] text-amber-400 border border-slate-850">
{`// Dados biomecânicos enviados à API do Gemini para feedback dinâmico
{
  "athleteId": "usr_diego",
  "positioning": "lateral_diagonal_45",
  "fundamentals_measured": {
    "peitadas": 4,
    "coxas": 2,
    "cabeceios": 5,
    "chapas_pe": 4
  },
  "skeletal_joint_log": {
    "left_knee_flexion": { "mean_angle_degrees": 168.2, "standard_deviation": 12.4 },
    "right_arm_stabilization_distance": { "mean_cm": 42.5 }
  }
}`}
            </div>
          </div>
        </div>
      )}

      {activeCoachTab === 'precos' && (
        <div className="bg-white rounded-3xl p-6 border border-slate-150 shadow-sm space-y-5">
          <div className="space-y-1">
            <h3 className="font-extrabold text-slate-900 text-sm">Modelo Comercial das Assinaturas</h3>
            <p className="text-xs text-slate-500">Desenho da funilagem comercial da Fase 1 à Fase 3.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-xs text-slate-650">
            
            {/* Tier 1 */}
            <div className="p-4 bg-slate-50 border border-slate-150 rounded-2xl relative">
              <span className="text-[9px] font-black uppercase text-slate-400 tracking-wider block mb-1">Fase 1 (Atual)</span>
              <strong className="text-slate-800 text-sm font-bold block">Acesso Gratuito com Anúncios</strong>
              <p className="text-[10.5px] text-slate-500 leading-relaxed mt-2">
                Qualquer um pode ver ranking, registrar partidas (simulado AdMob se o sandbox de anúncios estiver ativado). Ótimo para viralizar na capital.
              </p>
            </div>

            {/* Tier 2 */}
            <div className="p-4 bg-indigo-50/50 border border-indigo-150 rounded-2xl relative">
              <span className="text-[9px] font-black uppercase text-indigo-700 bg-indigo-50 px-1.5 py-0.5 rounded tracking-wider inline-block mb-1">Fase 2 (Próxima)</span>
              <strong className="text-slate-800 text-sm font-bold block">Futevôlei VIP (Plano Padrão)</strong>
              <p className="text-[10.5px] text-slate-600 leading-relaxed mt-2">
                R$ 19,90 por mês de recorrência. Fechamos as trapaças contra fraudes nas partidas e homologamos as quadras sedes oficiais da Federação.
              </p>
            </div>

            {/* Tier 3 */}
            <div className="p-4 bg-amber-50/50 border border-amber-200 rounded-2xl relative">
              <span className="text-[9px] font-black uppercase text-error text-amber-700 bg-amber-100 px-1.5 py-0.5 rounded tracking-wider inline-block mb-1 font-bold">Fase 3 (Foco IA)</span>
              <strong className="text-slate-800 text-sm font-bold block">Futevôlei VIP + Coach IA</strong>
              <p className="text-[10.5px] text-slate-600 leading-relaxed mt-2">
                R$ 49,90 por mês. Dá direito às mesmas funcionalidades VIP somado a análises biomecânicas infinitas com a Inteligência Artificial e MediaPipe.
              </p>
            </div>

          </div>

          <div className="p-3.5 bg-amber-50 border border-amber-150 rounded-2xl text-xs text-amber-850 flex items-start gap-2.5 leading-relaxed">
            <HelpCircle className="w-5 h-5 text-amber-700 mt-0.5 shrink-0" />
            <div>
              <strong className="font-bold block text-[11.5px] text-amber-900">Decisão recomendada de Lançamento:</strong>
              Use a Fase 1 por 60 dias nas praias de Salvador. Quando atingir 500 atletas fiéis trocando placares, mude o painel do Firebase para exigir a assinatura da Fase 2 para registrar confrontos. Por fim, promova a atualização da câmera com a Fase 3 para a elite de atletas profissionais no circuito patrocinado.
            </div>
          </div>

        </div>
      )}

    </div>
  );
}
