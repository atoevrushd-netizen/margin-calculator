import React, { useState } from 'react';
import { Language } from '../types';
import { TRANSLATIONS } from '../constants/translations';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { cn } from '../lib/utils';
import { fmt, fmtPct, getWaUrl } from '../lib/formatters';

interface MarkupCalculatorProps {
  lang: Language;
}

export const MarkupCalculator: React.FC<MarkupCalculatorProps> = ({ lang }) => {
  const t = TRANSLATIONS[lang];
  const [cost, setCost] = useState('');
  const [pct, setPct] = useState('');
  const [mode, setMode] = useState<'markup' | 'margin'>('markup');
  const [convMarkup, setConvMarkup] = useState('');
  const [convMargin, setConvMargin] = useState('');

  const costVal = parseFloat(cost) || 0;
  const pctVal = parseFloat(pct) || 0;

  let sell = 0, profit = 0, margin = 0, markup = 0;
  const hasInputs = costVal > 0 && pctVal > 0;

  if (hasInputs) {
    if (mode === 'markup') {
      markup = pctVal;
      sell = costVal * (1 + markup / 100);
      profit = sell - costVal;
      margin = (profit / sell) * 100;
    } else {
      margin = Math.min(pctVal, 99.9);
      sell = costVal / (1 - margin / 100);
      profit = sell - costVal;
      markup = (profit / costVal) * 100;
    }
  }

  const convMarkupVal = parseFloat(convMarkup);
  const convMarkupRes = (!isNaN(convMarkupVal) && convMarkupVal > 0) ? (convMarkupVal / (100 + convMarkupVal) * 100) : NaN;

  const convMarginVal = parseFloat(convMargin);
  const convMarginRes = (!isNaN(convMarginVal) && convMarginVal > 0 && convMarginVal < 100) ? (convMarginVal / (100 - convMarginVal) * 100) : NaN;

  return (
    <div className="space-y-4">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="glass rounded-2xl p-5 md:p-6 space-y-5">
        <div className="text-[10px] font-bold tracking-widest uppercase text-accent">{t.mm_card_a}</div>
        <div className="space-y-1.5">
          <label className="text-[12px] font-semibold text-text-muted">{t.mm_cost_lbl}</label>
          <div className="relative flex items-center">
            <input
              type="number"
              value={cost}
              onChange={(e) => setCost(e.target.value)}
              className="w-full bg-white/5 border border-glass-border rounded-xl px-4 py-3 text-[16px] font-bold text-text-primary outline-none focus:border-accent/52 focus:ring-2 focus:ring-accent/16 transition-all h-[52px]"
              placeholder="0"
            />
            <span className="absolute right-4 text-[12px] text-text-muted font-bold">TJS</span>
          </div>
        </div>
        <div className="flex bg-glass border border-glass-border rounded-xl p-1 gap-1">
          <button
            onClick={() => setMode('markup')}
            className={cn(
              "flex-1 py-2 rounded-lg text-[12px] font-bold transition-all h-10",
              mode === 'markup' ? "bg-glass-heavy text-text-primary border border-glass-border" : "text-text-muted hover:text-text-primary"
            )}
          >
            {t.mm_mode_markup}
          </button>
          <button
            onClick={() => setMode('margin')}
            className={cn(
              "flex-1 py-2 rounded-lg text-[12px] font-bold transition-all h-10",
              mode === 'margin' ? "bg-glass-heavy text-text-primary border border-glass-border" : "text-text-muted hover:text-text-primary"
            )}
          >
            {t.mm_mode_margin}
          </button>
        </div>
        <div className="space-y-1.5">
          <label className="text-[12px] font-semibold text-text-muted">
            {mode === 'markup' ? t.mm_pct_markup : t.mm_pct_margin}
          </label>
          <div className="relative flex items-center">
            <input
              type="number"
              value={pct}
              onChange={(e) => setPct(e.target.value)}
              className="w-full bg-white/5 border border-glass-border rounded-xl px-4 py-3 text-[16px] font-bold text-text-primary outline-none focus:border-accent/52 focus:ring-2 focus:ring-accent/16 transition-all h-[52px]"
              placeholder="0"
            />
            <span className="absolute right-4 text-[12px] text-text-muted font-bold">%</span>
          </div>
        </div>
        <div className="h-px bg-glass-border my-1" />
        <div className="space-y-2.5">
          <div className="flex items-center justify-between py-1.5 border-b border-white/5">
            <span className="text-[12px] text-text-muted">{t.mm_sell}</span>
            <span className="text-[1.35rem] font-black text-accent tabular-nums">{hasInputs ? fmt(sell) + ' TJS' : '—'}</span>
          </div>
          <div className="flex items-center justify-between py-1.5 border-b border-white/5">
            <span className="text-[12px] text-text-muted">{t.mm_profit}</span>
            <span className="text-[1rem] font-bold text-green-400 tabular-nums">{hasInputs ? fmt(profit) + ' TJS' : '—'}</span>
          </div>
          <div className="flex items-center justify-between py-1.5 border-b border-white/5">
            <span className="text-[12px] text-text-muted">{t.mm_margin}</span>
            <span className="text-[1rem] font-bold text-accent tabular-nums">{hasInputs ? fmtPct(margin) : '—'}</span>
          </div>
          <div className="flex items-center justify-between py-1.5">
            <span className="text-[12px] text-text-muted">{t.mm_markup}</span>
            <span className="text-[1rem] font-bold text-text-primary tabular-nums">{hasInputs ? fmtPct(markup) : '—'}</span>
          </div>
        </div>
      </div>
      <div className="glass rounded-2xl p-5 md:p-6 space-y-5">
        <div className="text-[10px] font-bold tracking-widest uppercase text-accent">{t.mm_card_b}</div>
        <div className="flex items-center gap-3">
          <div className="relative flex-1">
            <input
              type="number"
              value={convMarkup}
              onChange={(e) => setConvMarkup(e.target.value)}
              className="w-full bg-white/5 border border-glass-border rounded-xl px-3 py-2.5 text-[15px] font-bold text-text-primary outline-none focus:border-accent/52 transition-all h-[46px]"
              placeholder="0"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[11px] text-text-muted font-bold">%</span>
          </div>
          <ArrowRight size={16} className="text-text-muted shrink-0" strokeWidth={2.5} />
          <div className="flex flex-col items-end min-w-[68px]">
            <span className="text-[9px] font-bold tracking-widest uppercase text-text-muted">{t.conv_markup_lbl}</span>
            <span className="text-[1.15rem] font-extrabold text-accent tabular-nums">{fmtPct(convMarkupRes)}</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative flex-1">
            <input
              type="number"
              value={convMargin}
              onChange={(e) => setConvMargin(e.target.value)}
              className="w-full bg-white/5 border border-glass-border rounded-xl px-3 py-2.5 text-[15px] font-bold text-text-primary outline-none focus:border-accent/52 transition-all h-[46px]"
              placeholder="0"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[11px] text-text-muted font-bold">%</span>
          </div>
          <ArrowRight size={16} className="text-text-muted shrink-0" strokeWidth={2.5} />
          <div className="flex flex-col items-end min-w-[68px]">
            <span className="text-[9px] font-bold tracking-widest uppercase text-text-muted">{t.conv_margin_lbl}</span>
            <span className="text-[1.15rem] font-extrabold text-accent tabular-nums">{fmtPct(convMarginRes)}</span>
          </div>
        </div>
        <div className="bg-white/5 border border-glass-border rounded-xl p-4 space-y-2">
          <div className="text-[11px] text-text-muted leading-relaxed">
            Маржа = <span className="text-accent font-bold">Наценка ÷ (100 + Наценка) × 100</span>
          </div>
          <div className="text-[11px] text-text-muted leading-relaxed">
            Наценка = <span className="text-accent font-bold">Маржа ÷ (100 − Маржа) × 100</span>
          </div>
        </div>
      </div>
    </div>
      {/* WA Strip — снизу */}
      <div className="flex items-center gap-3 bg-wa/7 border border-wa/18 rounded-2xl p-3 md:p-4 flex-wrap md:flex-nowrap">
        <span className="w-2 h-2 bg-wa rounded-full shadow-[0_0_7px_var(--color-wa)] animate-pulse shrink-0" />
        <div className="flex-1 min-w-0">
          <span className="block text-[13px] md:text-[13.5px] font-bold text-text-primary leading-tight">{t.wa_strip_title}</span>
          <span className="block text-[11px] text-text-muted mt-0.5">{t.wa_strip_sub}</span>
        </div>
        <a
          href={getWaUrl(lang)}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 bg-wa text-white text-[13px] font-bold px-4 py-2.5 rounded-xl shadow-[0_3px_14px_rgba(37,211,102,0.35)] hover:brightness-110 transition-all active:scale-95 w-full md:w-auto justify-center touch-manipulation"
        >
          <MessageCircle size={15} fill="currentColor" />
          {t.wa_strip_btn}
        </a>
      </div>
    </div>
  );
};
