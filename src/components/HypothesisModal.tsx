import React, { useState } from 'react';
import { X, PlusCircle, Check } from 'lucide-react';
import { RESEARCH_CHANNELS } from '../data/researchChannels';

interface HypothesisModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (channelId: string, title: string, content: string, tags: string[]) => void;
}

export const HypothesisModal: React.FC<HypothesisModalProps> = ({
  isOpen,
  onClose,
  onSubmit
}) => {
  const [selectedChannel, setSelectedChannel] = useState<string>(RESEARCH_CHANNELS[0].id);
  const [title, setTitle] = useState<string>('');
  const [hypothesisText, setHypothesisText] = useState<string>('');
  const [tagsInput, setTagsInput] = useState<string>('Zero-Installation, In-Growth, Hyperaccumulation');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!hypothesisText.trim()) return;

    const tags = tagsInput
      .split(',')
      .map(t => t.trim())
      .filter(Boolean);

    onSubmit(selectedChannel, title || 'New Hypothesis', hypothesisText, tags);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-lg rounded-lg border border-slate-800 bg-slate-950 p-6 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded p-1 text-slate-400 hover:text-slate-200 cursor-pointer"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="flex items-center gap-2 text-emerald-400 text-xs font-data uppercase tracking-wider">
          <PlusCircle className="h-4 w-4" />
          <span>Post Scientific Hypothesis</span>
        </div>

        <h2 className="mt-1 font-display text-lg font-bold text-slate-100">
          Propose Research Hypothesis
        </h2>
        <p className="mt-1 text-xs text-slate-400">
          Add an empirical hypothesis to the Ms. Heavy Metal Leaf collaboration board for peer review and simulation.
        </p>

        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300">
              Target Channel
            </label>
            <select
              value={selectedChannel}
              onChange={e => setSelectedChannel(e.target.value)}
              className="mt-1 w-full rounded border border-slate-800 bg-slate-900 px-3 py-1.5 text-xs text-slate-200 focus:border-emerald-500 focus:outline-none"
            >
              {RESEARCH_CHANNELS.map(ch => (
                <option key={ch.id} value={ch.id}>
                  #{ch.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300">
              Hypothesis Headline
            </label>
            <input
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="e.g. Sub-cuticular Au-PDMS bonding eliminates contact resistance"
              className="mt-1 w-full rounded border border-slate-800 bg-slate-900 px-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:border-emerald-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300">
              Biophysical Rationale & Proposed Test
            </label>
            <textarea
              rows={4}
              value={hypothesisText}
              onChange={e => setHypothesisText(e.target.value)}
              placeholder="Describe your reasoning regarding hyperaccumulator biology, mold geometry, or field decontamination..."
              className="mt-1 w-full rounded border border-slate-800 bg-slate-900 px-3 py-2 text-xs text-slate-200 placeholder-slate-500 focus:border-emerald-500 focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300">
              Keywords / Tags (comma separated)
            </label>
            <input
              type="text"
              value={tagsInput}
              onChange={e => setTagsInput(e.target.value)}
              className="mt-1 w-full rounded border border-slate-800 bg-slate-900 px-3 py-1.5 text-xs text-slate-200 focus:border-emerald-500 focus:outline-none"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2 border-t border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="rounded px-3 py-1.5 text-xs font-medium text-slate-400 hover:text-slate-200 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded bg-emerald-500 px-4 py-1.5 text-xs font-semibold text-slate-950 hover:bg-emerald-400 cursor-pointer"
            >
              Submit to Collaboration Board
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
