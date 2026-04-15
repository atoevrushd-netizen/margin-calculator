import React, { useState } from 'react';
import { Language } from '../types';
import { TRANSLATIONS } from '../constants/translations';
import { fmt, fmtPct, getWaUrl } from '../lib/formatters';
import { MessageCircle } from 'lucide-react';

interface BepCalculatorProps {
  lang: Language;
}

export const BepCalculator: React.FC<BepCalculatorProps> = ({ lang }) => {
  const t = TRANSLATIONS[lang];
  const [fixed, setFixed] = useState('');
  const [price, setPrice] = useState('');
  const [varCst, setVarCst] = useState('');
  const [target, setTarget] = useState('');

  const fixedVal = parseFloat(fixed) || 0;
  const priceVal = parseFloat(price) || 0;
  const varCstVal = parseFloat(varCst) || 0;
  const targetVal = parseFloat(target) || 0;

  const contrib = priceVal - varCstVal;
  const contribPct = priceVal > 0 ? (contrib / priceVal) * 100 : NaN;
  const bepQty = contrib > 0 ? Math.ceil(fixedVal / contrib) : NaN;
  const bepRev = !isNaN(bepQty) ? bepQty * priceVal : NaN;
  const tgtQty = (contrib > 0 && targetVal > 0) ? Math.ceil((fixedVal + targetVal) / contrib) : NaN;
  const tgtRev = !isNaN(tgtQty) ? tgtQty * priceVal : NaN;

  return (
    <div className="space-y-4">
      <div className="glass rounded-2xl p-5 md:p-6 space-y-5">
        <div className="text-[10px] font-bold tracking-widest uppercase text-accent">{t.bep_inputs_title}</div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-[12px] font-semibold text-text-muted">{t.be_fixed_lbl}</label>
            <span className="block text-[10.5px] text-text-muted/60 leading-tight">{t.be_fixed_hint}</span>
            <div className="relative flex items-center">
              <input
                type="number"
                value={fixed}
                onChange={(e) => setFixed(e.target.value)}
                className="w-full bg-white/5 border border-glass-border rounded-xl px-4 py-3 text-[16px] font-bold text-text-primary outline-none focus:border-accent/52 transition-all h-[52px]"
                placeholder="0"
              />
              <span className="absolute right-4 text-[12px] text-text-muted font-bold">TJS</span>
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="text-[12px] font-semibold text-text-muted">{t.be_price_lbl}</label>
            <span className="block text-[10.5px] text-text-muted/60 leading-tight">{t.be_price_hint}</span>
            <div className="relative flex items-center">
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full bg-white/5 border border-glass-border rounded-xl px-4 py-3 text-[16px] font-bold text-text-primary outline-none focus:border-accent/52 transition-all h-[52px]"
                placeholder="0"
              />
              <span className="absolute right-4 text-[12px] text-text-muted font-bold">TJS</span>
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="text-[12px] font-semibold text-text-muted">{t.be_var_lbl}</label>
            <span className="block text-[10.5px] text-text-muted/60 leading-tight">{t.be_var_hint}</span>
            <div className="relative flex items-center">
              <input
                type="number"
                value={varCst}
                onChange={(e) => setVarCst(e.target.value)}
                className="w-full bg-white/5 border border-glass-border rounded-xl px-4 py-3 text-[16px] font-bold text-text-primary outline-none focus:border-accent/52 transition-all h-[52px]"
                placeholder="0"
              />
              <span className="absolute right-4 text-[12px] text-text-muted font-bold">TJS</span>
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="text-[12px] font-semibold text-text-muted">{t.be_target_lbl}</label>
            <span className="block text-[10.5px] text-text-muted/60 leading-tight">{t.be_target_hint}</span>
            <div className="relative flex items-center">
              <input
                type="number"
                value={target}
                onChange={(e) => setTarget(e.target.value)}
                className="w-full bg-white/5 border border-glass-border rounded-xl px-4 py-3 text-[16px] font-bold text-text-primary outline-none focus:border-accent/52 transition-all h-[52px]"
                placeholder="0"
              />
              <span className="absolute right-4 text-[12px] text-text-muted font-bold">TJS</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 md:gap-4">
        <div className="glass-heavy rounded-2xl p-4 text-center">
          <div className="text-[9px] md:text-[10px] font-bold tracking-widest uppercase text-text-muted mb-2">{t.bep_lbl_contrib}</div>
          <div className="text-[1.1rem] md:text-[1.25rem] font-extrabold text-accent tabular-nums">{contrib > 0 ? fmt(contrib) + ' TJS' : '—'}</div>
          <div className="text-[9.5px] text-text-muted mt-1">{t.bep_sub_contrib}</div>
        </div>
        <div className="glass-heavy rounded-2xl p-4 text-center">
          <div className="text-[9px] md:text-[10px] font-bold tracking-widest uppercase text-text-muted mb-2">{t.bep_lbl_contrib_pct}</div>
          <div className="text-[1.1rem] md:text-[1.25rem] font-extrabold text-accent tabular-nums">{!isNaN(contribPct) && contribPct > 0 ? fmtPct(contribPct) : '—'}</div>
          <div className="text-[9.5px] text-text-muted mt-1">{t.bep_sub_contrib_pct}</div>
        </div>
        <div className="glass-heavy rounded-2xl p-4 text-center">
          <div className="text-[9px] md:text-[10px] font-bold tracking-widest uppercase text-text-muted mb-2">{t.bep_lbl_qty}</div>
          <div className="text-[1.1rem] md:text-[1.25rem] font-extrabold text-text-primary tabular-nums">{!isNaN(bepQty) ? bepQty.toLocaleString('ru-RU') + ' ' + t.be_unit : '—'}</div>
          <div className="text-[9.5px] text-text-muted mt-1">{t.bep_sub_qty}</div>
        </div>
        <div className="glass-heavy rounded-2xl p-4 text-center">
          <div className="text-[9px] md:text-[10px] font-bold tracking-widest uppercase text-text-muted mb-2">{t.bep_lbl_rev}</div>
          <div className="text-[1.1rem] md:text-[1.25rem] font-extrabold text-text-primary tabular-nums">{!isNaN(bepRev) ? fmt(bepRev) + ' TJS' : '—'}</div>
          <div className="text-[9.5px] text-text-muted mt-1">{t.bep_sub_rev}</div>
        </div>
      </div>

      {targetVal > 0 && !isNaN(tgtQty) && (
        <div className="bg-accent/5 border border-accent/15 rounded-2xl p-4 md:p-5 space-y-3">
          <div className="text-[10px] font-bold tracking-widest uppercase text-accent">{t.bep_target_title}</div>
          <div className="grid grid-cols-2 gap-3 md:gap-4">
            <div className="glass-heavy rounded-2xl p-4 text-center">
              <div className="text-[9px] md:text-[10px] font-bold tracking-widest uppercase text-text-muted mb-2">{t.bep_lbl_t_qty}</div>
              <div className="text-[1.1rem] md:text-[1.25rem] font-extrabold text-green-400 tabular-nums">{tgtQty.toLocaleString('ru-RU') + ' ' + t.be_unit}</div>
              <div className="text-[9.5px] text-text-muted mt-1">{t.bep_sub_t_qty}</div>
            </div>
            <div className="glass-heavy rounded-2xl p-4 text-center">
              <div className="text-[9px] md:text-[10px] font-bold tracking-widest uppercase text-text-muted mb-2">{t.bep_lbl_t_rev}</div>
              <div className="text-[1.1rem] md:text-[1.25rem] font-extrabold text-green-400 tabular-nums">{fmt(tgtRev)} TJS</div>
              <div className="text-[9.5px] text-text-muted mt-1">{t.bep_sub_t_rev}</div>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white/5 border border-glass-border rounded-xl p-4 space-y-2">
        <div className="text-[11px] text-text-muted leading-relaxed">
          МД/воҳ = <span className="text-accent font-bold">{t.formula_bep_1}</span>
        </div>
        <div className="text-[11px] text-text-muted leading-relaxed">
          МД % = <span className="text-accent font-bold">{t.formula_bep_2}</span>
        </div>
        <div className="text-[11px] text-text-muted leading-relaxed">
          ТБ (воҳид) = <span className="text-accent font-bold">{t.formula_bep_3}</span>
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
