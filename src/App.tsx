/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Header } from './components/Header';
import { CollaborationRoom } from './components/CollaborationRoom';
import { MoldGrowthLab } from './components/MoldGrowthLab';
import { MetalFeasibilityCalculator } from './components/MetalFeasibilityCalculator';
import { HyperaccumulatorArchive } from './components/HyperaccumulatorArchive';
import { RemediationCalculator } from './components/RemediationCalculator';
import { HypothesisModal } from './components/HypothesisModal';
import { ExportReportModal } from './components/ExportReportModal';
import { INITIAL_RESEARCH_MESSAGES } from './data/researchChannels';
import { ResearchMessage } from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState<
    'collaboration' | 'mold-lab' | 'feasibility' | 'species' | 'remediation'
  >('collaboration');

  const [isHypothesisOpen, setIsHypothesisOpen] = useState<boolean>(false);
  const [isExportOpen, setIsExportOpen] = useState<boolean>(false);

  const handleAddHypothesis = (
    channelId: string,
    title: string,
    content: string,
    tags: string[]
  ) => {
    const saved = localStorage.getItem('ms_leaf_messages');
    let currentMessages = INITIAL_RESEARCH_MESSAGES;
    if (saved) {
      try {
        currentMessages = JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }

    const newMessage: ResearchMessage = {
      id: `hypo-${Date.now()}`,
      channelId,
      author: {
        name: 'You (Lead Investigator)',
        role: 'Bio-Architect & Author',
        avatarColor: 'bg-emerald-500/20 text-emerald-400'
      },
      timestamp: 'Just now',
      content: `### Hypothesis: ${title}\n\n${content}`,
      tags: ['Hypothesis', ...tags],
      pinned: true
    };

    const updated = {
      ...currentMessages,
      [channelId]: [...(currentMessages[channelId] || []), newMessage]
    };

    localStorage.setItem('ms_leaf_messages', JSON.stringify(updated));
    setActiveTab('collaboration');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Top Header */}
      <Header
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        onOpenHypothesis={() => setIsHypothesisOpen(true)}
        onOpenExport={() => setIsExportOpen(true)}
      />

      {/* Main View Area */}
      <main className="flex-1 pb-12">
        {activeTab === 'collaboration' && (
          <CollaborationRoom
            onOpenHypothesis={() => setIsHypothesisOpen(true)}
            onNavigateToTab={tab => setActiveTab(tab)}
          />
        )}

        {activeTab === 'mold-lab' && <MoldGrowthLab />}

        {activeTab === 'feasibility' && <MetalFeasibilityCalculator />}

        {activeTab === 'species' && <HyperaccumulatorArchive />}

        {activeTab === 'remediation' && <RemediationCalculator />}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-slate-950/80 py-6 text-center text-xs text-slate-500 font-data">
        <div className="mx-auto max-w-7xl px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
            <span>PROJECT MS. HEAVY METAL LEAF // OPEN-SCIENCE CYBORG FLORA CONSORTIUM</span>
          </div>
          <div>
            <span>NANOBIONICS · ZERO-INSTALLATION BIO-MOLDS · PHYTOMINING</span>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <HypothesisModal
        isOpen={isHypothesisOpen}
        onClose={() => setIsHypothesisOpen(false)}
        onSubmit={handleAddHypothesis}
      />

      <ExportReportModal
        isOpen={isExportOpen}
        onClose={() => setIsExportOpen(false)}
      />
    </div>
  );
}
