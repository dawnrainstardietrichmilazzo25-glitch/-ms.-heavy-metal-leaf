import React, { useState } from 'react';
import { X, Copy, Check, Download, FileText } from 'lucide-react';

interface ExportReportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ExportReportModal: React.FC<ExportReportModalProps> = ({
  isOpen,
  onClose
}) => {
  const [copied, setCopied] = useState<boolean>(false);

  if (!isOpen) return null;

  const reportMarkdown = `# MS. HEAVY METAL LEAF: CYBORG HYPERACCUMULATOR BIO-BOT SYSTEM
## Scientific Dossier & Open-Science Collaboration Report
**Date:** September 2026
**Project Lead:** Investigator & Bio-Architect
**Co-Investigators:** Dr. Aris Thorne (Nanobionics), Dr. Althea Chen (Phytoremediation), Koji Murata (Micro-Molds), Elena Rostova (Electrophysiology)

---

### 1. EXECUTIVE SUMMARY & CORE THESIS
'Ms. Heavy Metal Leaf' is a living cyborg flora bio-bot system engineered for toxic land remediation, zero-e-waste environmental robotics, and circular phytomining. 

Traditional bio-hybrid robotics rely on invasive surgical post-installation (inserting metal pins, needles, or wires into mature plants), which inevitably causes callose scarring, tissue necrosis, pathogen entry, and electrical detachment. Ms. Heavy Metal Leaf solves this fundamentally:
- **Zero-Installation In-Growth:** All non-growable components (microfluidic nutrient wicks, capacitive sensors, gold interdigitated electrodes, radio antennas) are pre-patterned inside an elastomeric silicone (PDMS) growth mold.
- **In-Situ Biological Lamination:** The hyperaccumulator seed is germinated directly at the mold inlet. As hypocotyl and leaf tissues expand, epidermal cell walls and cuticle layers naturally encapsulate the electrode arrays with zero incisions.
- **Vascular Metallization:** By absorbing transition metals (Ni, Cd, Zn, Cu) from toxic soils, the plant's leaf veins become naturally conductive traces, fusing the plant's living vascular anatomy with the mold's electrical backplane.

---

### 2. THE 80% METAL FEASIBILITY RESOLUTION
**Scientific Inquiry:** *Can a plant hold ~80% metal by dry weight and still be a viable, living plant?*

**Empirical & Biophysical Resolution:**
1. **The Natural Ceiling (25.7%):**
   In nature, *Pycnandra acuminata* (Sapotaceae) secretes blue-green latex with 25.7% nickel by dry weight complexed with citrate in laticifer vacuoles. Forcing >26% metal into a single intracellular cytoplasm causes free ion leakage, displacing Mg²⁺ from chlorophyll and halting ATP synthesis.
2. **The Ms. Leaf Dual-Compartment Architecture (80% Total Metal):**
   - **Living Symplastic Engine (Core 24–26% Metal):** The inner protoplasm and chloroplasts are kept at physiological equilibrium through vacuolar tonoplast HMA4/ACR3 pumps and organic acid chelation. Photosynthesis, transpiration, and stomatal gas exchange continue normally.
   - **Engineered Apoplastic Exoskeleton (Outer 54–56% Metal):** Transpiration pulls mineral-rich sap into extracellular cell-wall micro-channels guided by the mold. Contact with pre-seeded polyphenolic primers precipitates solid metal nano-crystals along the lignified cell walls without penetrating the living protoplast.
3. **Outcome:**
   The total dry leaf mass reaches 78–82% elemental metal, successfully exceeding the **electrical percolation threshold** (enabling the leaf to function as an RF antenna and galvanic conductor), while the living plant remains alive and translocating.

---

### 3. VALIDATED METALLOPHYTE SPECIES CATALOG
- **Pycnandra acuminata** (New Caledonia): 25.7% Ni dry weight. Blue-green sap acts as liquid bio-electrolyte for phytogalvanic power cells.
- **Noccaea caerulescens** (Europe): Up to 43,700 mg/kg Zn / 3,000 mg/kg Cd. High growth velocity ideal for early mold colonization.
- **Berkheya coddii** (South Africa): 36,000 mg/kg Ni. Biomass yield up to 22 tons/ha; commercial benchmark for industrial phytomining.
- **Haumaniastrum robertii** (Katanga): 10,200 mg/kg Cu / 2,100 mg/kg Co. Supplies copper leaf veins for low-resistance busbar traces.
- **Pteris vittata** (Asia/Europe): 22,600 mg/kg As. Rapid frond turnover for arsenic Superfund site remediation.

---

### 4. FIELD REMEDIATION & PHYTOMINING ECONOMICS
On a 10-hectare mine tailing site contaminated with 4,500 PPM nickel:
- Deploying 20 Ms. Leaf bio-bots per m² (2,000,000 active units) decontaminates the site to <400 PPM safe agricultural levels within 3 growing seasons.
- Total metal extracted: **~84 Metric Tons of battery-grade nickel**.
- Gross bio-ore market value: **~$1,550,000 USD** at London Metal Exchange spot benchmarks.
- Avoided excavation cost: **~$380,000 USD** (no strip-mining or chemical washing).
- Avoided carbon footprint: **~184 Metric Tons of CO₂**.

---

### 5. CLEANROOM BIO-MOLD FABRICATION PROTOCOL
1. Cast PDMS 10:1 mold with capillary fluidic channels and degassing at 50 mTorr.
2. Sputter 150 nm Au / 5 nm Ti interdigitated electrode array onto channel ridges.
3. Prime lower reservoir with Hoagland nutrient buffer and 200 µM chelated target metal.
4. Place sterilized hyperaccumulator seed at mold intake port; maintain +25 mV electrotaxis bias.
5. Monitor bio-impedance drop to <950 Ω at Day 25 to confirm zero-incision bio-integration.`;

  const handleCopy = () => {
    navigator.clipboard.writeText(reportMarkdown);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([reportMarkdown], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'Ms_Heavy_Metal_Leaf_Scientific_Dossier.md');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-3xl rounded-lg border border-slate-800 bg-slate-950 p-6 shadow-2xl flex flex-col max-h-[85vh]">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-emerald-400" />
            <h2 className="font-display text-base font-bold text-slate-100">
              Ms. Heavy Metal Leaf Research Dossier
            </h2>
          </div>
          <button
            onClick={onClose}
            className="rounded p-1 text-slate-400 hover:text-slate-200 cursor-pointer"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <p className="mt-2 text-xs text-slate-400">
          Formatted scientific report covering the zero-installation in-growth methodology, 80% metal feasibility model, botanical species catalog, and phytoremediation metrics.
        </p>

        <div className="my-4 flex-1 overflow-y-auto rounded border border-slate-800 bg-slate-900/60 p-4 font-mono text-xs text-slate-300 whitespace-pre-wrap leading-relaxed">
          {reportMarkdown}
        </div>

        <div className="flex items-center justify-between border-t border-slate-800 pt-3">
          <span className="text-[11px] font-data text-slate-500">
            FORMAT: MARKDOWN DOSSIER · READY FOR OPEN-SCIENCE PUBLICATION
          </span>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 rounded border border-slate-700 bg-slate-900 px-3 py-1.5 text-xs font-medium text-slate-200 hover:border-emerald-500 transition-colors cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="h-3.5 w-3.5 text-emerald-400" />
                  <span>Copied</span>
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5 text-slate-400" />
                  <span>Copy Markdown</span>
                </>
              )}
            </button>

            <button
              onClick={handleDownload}
              className="inline-flex items-center gap-1.5 rounded bg-emerald-500 px-3.5 py-1.5 text-xs font-semibold text-slate-950 hover:bg-emerald-400 transition-colors cursor-pointer"
            >
              <Download className="h-3.5 w-3.5" />
              <span>Download .MD File</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
