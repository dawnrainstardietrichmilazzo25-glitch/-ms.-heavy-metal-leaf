import React, { useState } from 'react';
import {
  Send,
  Sparkles,
  Pin,
  Bot,
  Hash,
  Activity,
  BookmarkCheck,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { ResearchChannel, ResearchMessage } from '../types';
import { RESEARCH_CHANNELS, INITIAL_RESEARCH_MESSAGES } from '../data/researchChannels';

interface CollaborationRoomProps {
  onOpenHypothesis: () => void;
  onNavigateToTab: (tab: 'mold-lab' | 'feasibility' | 'species' | 'remediation') => void;
}

export const CollaborationRoom: React.FC<CollaborationRoomProps> = ({
  onOpenHypothesis,
  onNavigateToTab
}) => {
  const [activeChannelId, setActiveChannelId] = useState<string>('mold-ingrowth-mechanics');
  const [messages, setMessages] = useState<Record<string, ResearchMessage[]>>(() => {
    const saved = localStorage.getItem('ms_leaf_messages');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return INITIAL_RESEARCH_MESSAGES;
  });

  const [inputPrompt, setInputPrompt] = useState<string>('');
  const [isSynthesizing, setIsSynthesizing] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const activeChannel = RESEARCH_CHANNELS.find(c => c.id === activeChannelId) || RESEARCH_CHANNELS[0];
  const channelMessages = messages[activeChannelId] || [];

  const handleSendMessage = async (customText?: string) => {
    const query = (customText || inputPrompt).trim();
    if (!query) return;

    const userMessage: ResearchMessage = {
      id: `user-${Date.now()}`,
      channelId: activeChannelId,
      author: {
        name: 'You (Lead Investigator)',
        role: 'Project Director & Bio-Architect',
        avatarColor: 'bg-emerald-500/20 text-emerald-400'
      },
      timestamp: 'Just now',
      content: query,
      tags: ['Investigator Inquiry']
    };

    const updatedWithUser = {
      ...messages,
      [activeChannelId]: [...(messages[activeChannelId] || []), userMessage]
    };

    setMessages(updatedWithUser);
    localStorage.setItem('ms_leaf_messages', JSON.stringify(updatedWithUser));
    setInputPrompt('');
    setIsSynthesizing(true);
    setErrorMessage(null);

    try {
      const res = await fetch('/api/gemini/synthesize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: query,
          topic: activeChannel.topic,
          channelId: activeChannel.id
        })
      });

      if (!res.ok) {
        throw new Error(`Server returned ${res.status}`);
      }

      const data = await res.json();
      const aiResponse: ResearchMessage = {
        id: `ai-${Date.now()}`,
        channelId: activeChannelId,
        author: {
          name: 'Dr. Aris Thorne',
          role: 'Lead Nanobionics & AI Co-Scientist',
          avatarColor: 'bg-indigo-500/20 text-indigo-300',
          isAi: true
        },
        timestamp: 'Just now',
        content: data.text,
        tags: ['Peer Review', data.source === 'gemini-3.8-flash' ? 'Gemini 3.8 Flash' : 'Bio-Database']
      };

      const finalUpdated = {
        ...updatedWithUser,
        [activeChannelId]: [...updatedWithUser[activeChannelId], aiResponse]
      };

      setMessages(finalUpdated);
      localStorage.setItem('ms_leaf_messages', JSON.stringify(finalUpdated));
    } catch (err: any) {
      console.error(err);
      setErrorMessage('Synthesis service unavailable. Please retry in a moment.');
    } finally {
      setIsSynthesizing(false);
    }
  };

  const handleTogglePin = (msgId: string) => {
    const updatedList = (messages[activeChannelId] || []).map(m =>
      m.id === msgId ? { ...m, pinned: !m.pinned } : m
    );
    const newMessages = { ...messages, [activeChannelId]: updatedList };
    setMessages(newMessages);
    localStorage.setItem('ms_leaf_messages', JSON.stringify(newMessages));
  };

  const quickInquiries = [
    'How do we reach 80% metal dry weight without causing leaf cell death?',
    'What mold channel diameter best guides the radicle into gold sensor pads?',
    'Calculate soil nickel removal rate for a 5-hectare mine tailing site',
    'How do stomatal hydraulic pressure changes power the phytogalvanic circuit?'
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
      {/* Top Telemetry Ribbon */}
      <div className="mb-6 flex flex-wrap items-center justify-between border-b border-slate-800 pb-4 text-xs font-data">
        <div className="flex items-center gap-4 text-slate-400">
          <span className="flex items-center gap-1.5 text-emerald-400">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>NOMINAL · CALIBRATED</span>
          </span>
          <span className="text-slate-600">/</span>
          <span>PROJECT SPEC: MS. HEAVY METAL LEAF</span>
          <span className="text-slate-600">/</span>
          <span>SYSTEM: ZERO-INSTALLATION CYBORG FLORA</span>
        </div>
        <div className="flex items-center gap-4 text-slate-400">
          <span>ACTIVE CO-SCIENTISTS: 5</span>
          <span className="text-slate-600">/</span>
          <span className="text-emerald-400">GEMINI SYNTHESIS READY</span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Left Column: Channels & Research Team */}
        <div className="lg:col-span-3 space-y-6">
          <div className="rounded border border-slate-800 bg-slate-900/60 p-4">
            <div className="mb-3 text-xs font-semibold tracking-wider text-slate-400 uppercase">
              Research Channels
            </div>
            <div className="space-y-1">
              {RESEARCH_CHANNELS.map(channel => (
                <button
                  key={channel.id}
                  onClick={() => setActiveChannelId(channel.id)}
                  className={`flex w-full items-center justify-between rounded px-2.5 py-2 text-left text-xs font-medium transition-colors cursor-pointer ${
                    activeChannelId === channel.id
                      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                      : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-200'
                  }`}
                >
                  <span className="flex items-center gap-2 truncate">
                    <Hash className="h-3.5 w-3.5 shrink-0 opacity-70" />
                    <span className="truncate">{channel.name}</span>
                  </span>
                  <span className="text-[10px] font-data text-slate-500">
                    {(messages[channel.id] || []).length}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="rounded border border-slate-800 bg-slate-900/60 p-4">
            <div className="mb-3 text-xs font-semibold tracking-wider text-slate-400 uppercase">
              Collab Team Online
            </div>
            <div className="space-y-2.5 text-xs">
              <div className="flex items-center gap-2.5">
                <span className="h-6 w-6 rounded bg-emerald-500/20 text-emerald-300 flex items-center justify-center font-bold text-[10px]">
                  YOU
                </span>
                <div>
                  <div className="font-medium text-slate-200">You (Lead Investigator)</div>
                  <div className="text-[11px] text-slate-400">Bio-Architecture & Hypotheses</div>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <span className="h-6 w-6 rounded bg-indigo-500/20 text-indigo-300 flex items-center justify-center font-bold text-[10px]">
                  AT
                </span>
                <div>
                  <div className="flex items-center gap-1 font-medium text-slate-200">
                    <span>Dr. Aris Thorne</span>
                    <Bot className="h-3 w-3 text-indigo-400" />
                  </div>
                  <div className="text-[11px] text-slate-400">Gemini Nanobionics Lead</div>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <span className="h-6 w-6 rounded bg-amber-500/20 text-amber-300 flex items-center justify-center font-bold text-[10px]">
                  AC
                </span>
                <div>
                  <div className="font-medium text-slate-200">Dr. Althea Chen</div>
                  <div className="text-[11px] text-slate-400">Phytoremediation Field Chemist</div>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <span className="h-6 w-6 rounded bg-cyan-500/20 text-cyan-300 flex items-center justify-center font-bold text-[10px]">
                  KM
                </span>
                <div>
                  <div className="font-medium text-slate-200">Koji Murata</div>
                  <div className="text-[11px] text-slate-400">Micro-Mold Microfluidics</div>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <span className="h-6 w-6 rounded bg-rose-500/20 text-rose-300 flex items-center justify-center font-bold text-[10px]">
                  ER
                </span>
                <div>
                  <div className="font-medium text-slate-200">Elena Rostova</div>
                  <div className="text-[11px] text-slate-400">Plant Electrophysiology</div>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded border border-slate-800 bg-slate-900/60 p-4">
            <div className="mb-2 text-xs font-semibold tracking-wider text-slate-400 uppercase">
              Quick Experiment Links
            </div>
            <div className="space-y-1.5 text-xs">
              <button
                onClick={() => onNavigateToTab('mold-lab')}
                className="w-full text-left py-1 text-slate-300 hover:text-emerald-400 transition-colors flex items-center justify-between cursor-pointer"
              >
                <span>Inspect In-Growth Mold</span>
                <span className="font-data text-[10px] text-slate-500">4 Stages</span>
              </button>
              <button
                onClick={() => onNavigateToTab('feasibility')}
                className="w-full text-left py-1 text-slate-300 hover:text-emerald-400 transition-colors flex items-center justify-between cursor-pointer"
              >
                <span>80% Metal Feasibility Model</span>
                <span className="font-data text-[10px] text-slate-500">Biophysical</span>
              </button>
              <button
                onClick={() => onNavigateToTab('remediation')}
                className="w-full text-left py-1 text-slate-300 hover:text-emerald-400 transition-colors flex items-center justify-between cursor-pointer"
              >
                <span>Toxic Land Decon Calculator</span>
                <span className="font-data text-[10px] text-slate-500">Field Site</span>
              </button>
            </div>
          </div>
        </div>

        {/* Center Column: Active Research Thread */}
        <div className="lg:col-span-6 flex flex-col rounded border border-slate-800 bg-slate-900/40 p-4">
          {/* Channel Header */}
          <div className="border-b border-slate-800 pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Hash className="h-4 w-4 text-emerald-400" />
                <h1 className="font-display text-base font-semibold text-slate-100">
                  {activeChannel.name}
                </h1>
              </div>
              <button
                onClick={onOpenHypothesis}
                className="rounded border border-slate-700 bg-slate-800/80 px-2 py-1 text-[11px] font-medium text-slate-300 hover:text-emerald-400 hover:border-emerald-500 transition-colors cursor-pointer"
              >
                + Pin Hypothesis
              </button>
            </div>
            <p className="mt-1 text-xs text-slate-400 leading-relaxed">
              {activeChannel.topic}
            </p>
            <div className="mt-2 flex items-center gap-2 text-[11px] text-slate-500 font-data">
              <span>{channelMessages.length} ENTRIES</span>
              <span aria-hidden="true">·</span>
              <span>SYNCHRONIZED</span>
              <span aria-hidden="true">·</span>
              <span>IN-SITU GROWTH FOCUS</span>
            </div>
          </div>

          {/* Messages Feed */}
          <div className="my-4 flex-1 space-y-4 overflow-y-auto max-h-[620px] pr-2">
            {channelMessages.map(msg => (
              <div
                key={msg.id}
                className={`rounded border p-3.5 transition-colors ${
                  msg.pinned
                    ? 'border-emerald-500/40 bg-emerald-950/20'
                    : 'border-slate-800/80 bg-slate-900/60'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <span
                      className={`h-6 w-6 rounded flex items-center justify-center font-bold text-[10px] ${msg.author.avatarColor}`}
                    >
                      {msg.author.name.slice(0, 2).toUpperCase()}
                    </span>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-semibold text-slate-200">
                          {msg.author.name}
                        </span>
                        {msg.author.isAi && (
                          <span className="flex items-center gap-0.5 rounded bg-indigo-500/20 px-1 py-0.2 text-[9px] font-mono text-indigo-300">
                            <Sparkles className="h-2.5 w-2.5" /> AI SYNTHESIS
                          </span>
                        )}
                        <span className="text-[10px] text-slate-500 font-data">
                          {msg.timestamp}
                        </span>
                      </div>
                      <div className="text-[10px] text-slate-400">
                        {msg.author.role}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => handleTogglePin(msg.id)}
                    className={`rounded p-1 text-slate-400 hover:text-emerald-400 transition-colors cursor-pointer ${
                      msg.pinned ? 'text-emerald-400' : 'opacity-40 hover:opacity-100'
                    }`}
                    title={msg.pinned ? 'Unpin from lab findings' : 'Pin to lab findings'}
                  >
                    <Pin className="h-3.5 w-3.5" />
                  </button>
                </div>

                <div className="mt-2.5 whitespace-pre-line text-xs text-slate-300 leading-relaxed font-sans">
                  {msg.content}
                </div>

                {msg.tags && msg.tags.length > 0 && (
                  <div className="mt-3 flex flex-wrap items-center gap-2 text-[10px] text-slate-400 font-data">
                    {msg.tags.map((tag, idx) => (
                      <span key={idx}>
                        #{tag}
                        {idx < msg.tags!.length - 1 && <span className="ml-2 text-slate-600">/</span>}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {isSynthesizing && (
              <div className="rounded border border-indigo-500/30 bg-indigo-950/20 p-4">
                <div className="flex items-center gap-2 text-xs font-medium text-indigo-300">
                  <Sparkles className="h-4 w-4 animate-spin text-indigo-400" />
                  <span>Dr. Aris Thorne is synthesizing nanobionics models...</span>
                </div>
                <div className="mt-2 text-[11px] text-slate-400">
                  Computing cellular vacuolar tolerance, apoplastic matrix precipitation, and mold integration geometry.
                </div>
              </div>
            )}

            {errorMessage && (
              <div className="rounded border border-rose-500/30 bg-rose-950/20 p-3 text-xs text-rose-300 flex items-center gap-2">
                <AlertCircle className="h-4 w-4 shrink-0 text-rose-400" />
                <span>{errorMessage}</span>
              </div>
            )}
          </div>

          {/* Prompt Presets */}
          <div className="border-t border-slate-800 pt-3">
            <div className="mb-2 text-[11px] font-semibold text-slate-400">
              Suggested Co-Scientist Prompts:
            </div>
            <div className="flex flex-wrap gap-1.5 mb-3">
              {quickInquiries.map((inquiry, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(inquiry)}
                  disabled={isSynthesizing}
                  className="rounded border border-slate-800 bg-slate-900/80 px-2 py-1 text-[11px] text-slate-300 hover:border-emerald-500/60 hover:text-emerald-300 transition-colors truncate max-w-full cursor-pointer disabled:opacity-50"
                >
                  {inquiry}
                </button>
              ))}
            </div>

            {/* Input Box */}
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={inputPrompt}
                onChange={e => setInputPrompt(e.target.value)}
                onKeyDown={e => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
                placeholder="Ask Dr. Thorne to simulate bio-bot mechanics, 80% metal tolerance, or mold integration..."
                disabled={isSynthesizing}
                className="flex-1 rounded border border-slate-800 bg-slate-950 px-3 py-2 text-xs text-slate-100 placeholder-slate-500 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
              <button
                onClick={() => handleSendMessage()}
                disabled={isSynthesizing || !inputPrompt.trim()}
                className="inline-flex items-center gap-1.5 rounded bg-emerald-500 px-3.5 py-2 text-xs font-semibold text-slate-950 transition-colors hover:bg-emerald-400 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer whitespace-nowrap"
              >
                <Send className="h-3 w-3" />
                <span>Synthesize</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Specimen Showcase & Core Architecture */}
        <div className="lg:col-span-3 space-y-6">
          {/* Specimen Visual Showcase */}
          <div className="rounded border border-slate-800 bg-slate-900/60 overflow-hidden">
            <div className="relative aspect-[16/9] w-full bg-slate-950">
              <img
                src="/src/assets/images/ms_leaf_cyborg_specimen_1790557790087.jpg"
                alt="Ms. Heavy Metal Leaf cyborg plant specimen grown inside micro-mold"
                className="h-full w-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>
              <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between text-[11px] font-data text-emerald-400">
                <span>SPECIMEN // PROTOTYPE-01</span>
                <span>IN-SITU GROWN</span>
              </div>
            </div>
            <div className="p-3.5">
              <h2 className="font-display text-sm font-semibold text-slate-100">
                Ms. Heavy Metal Leaf
              </h2>
              <p className="mt-1 text-xs text-slate-300 leading-relaxed">
                Zero-incision cyborg flora: grown directly into micro-machined silicone molds with embedded gold microelectrode arrays. Veins saturate with toxic metals, forming living bio-metallic circuits.
              </p>
              <div className="mt-3 border-t border-slate-800/80 pt-2 grid grid-cols-2 gap-2 text-xs font-data">
                <div>
                  <div className="text-[10px] text-slate-500">METAL CONTENT</div>
                  <div className="text-emerald-400 font-semibold">25.7% (Live)</div>
                </div>
                <div>
                  <div className="text-[10px] text-slate-500">IMPEDANCE</div>
                  <div className="text-cyan-400 font-semibold">820 Ω</div>
                </div>
              </div>
            </div>
          </div>

          {/* 3 Pillars of Ms. Leaf */}
          <div className="rounded border border-slate-800 bg-slate-900/60 p-4">
            <div className="mb-3 text-xs font-semibold tracking-wider text-slate-400 uppercase">
              Project Ms. Leaf Pillars
            </div>
            <div className="space-y-3 text-xs">
              <div className="border-l-2 border-emerald-500 pl-2.5">
                <div className="font-semibold text-slate-200">1. Zero Installation Robotics</div>
                <div className="text-slate-400 mt-0.5 leading-relaxed">
                  Inorganic sensors are set in the mold first; the plant grows into it naturally. No needles, drilling, or surgery.
                </div>
              </div>

              <div className="border-l-2 border-cyan-500 pl-2.5">
                <div className="font-semibold text-slate-200">2. Toxic Land Remediation</div>
                <div className="text-slate-400 mt-0.5 leading-relaxed">
                  Roots decontaminate mine tailings & brownfields (Ni, Cd, Zn, Cu, As) at a fraction of chemical washing costs.
                </div>
              </div>

              <div className="border-l-2 border-indigo-500 pl-2.5">
                <div className="font-semibold text-slate-200">3. The 80% Metal Feasibility</div>
                <div className="text-slate-400 mt-0.5 leading-relaxed">
                  Proving hyperaccumulators can hold massive metal fractions while maintaining cellular respiration and bio-actuation.
                </div>
              </div>
            </div>
          </div>

          {/* Quick Telemetry Box */}
          <div className="rounded border border-slate-800 bg-slate-900/60 p-4">
            <div className="mb-3 flex items-center justify-between text-xs font-semibold tracking-wider text-slate-400 uppercase">
              <span>Bio-Bot Telemetry</span>
              <Activity className="h-3.5 w-3.5 text-emerald-400" />
            </div>
            <div className="space-y-2 font-data text-xs">
              <div className="flex justify-between items-center text-slate-300">
                <span>Phytogalvanic V_oc</span>
                <span className="text-emerald-400">0.72 V</span>
              </div>
              <div className="flex justify-between items-center text-slate-300">
                <span>Transpiration Flux</span>
                <span className="text-cyan-400">3.4 mmol/m²s</span>
              </div>
              <div className="flex justify-between items-center text-slate-300">
                <span>Stomatal Conductance</span>
                <span className="text-amber-400">182 mmol/m²s</span>
              </div>
              <div className="flex justify-between items-center text-slate-300">
                <span>Sub-Cuticle Sealing</span>
                <span className="text-emerald-400">99.4% Hermetic</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
