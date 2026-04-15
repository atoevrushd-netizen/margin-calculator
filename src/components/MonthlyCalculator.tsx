import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Language, MonthlyData } from '../types';
import { TRANSLATIONS } from '../constants/translations';
import { RefreshCw, LayoutGrid, MessageCircle } from 'lucide-react';
import { cn } from '../lib/utils';
import { fmt, fmtPct, getMarginClass, getWaUrl } from '../lib/formatters';
import { motion, AnimatePresence } from 'motion/react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

interface Props { lang: Language; }

export const MonthlyCalculator: React.FC<Props> = ({ lang }) => {
  const t = TRANSLATIONS[lang];

  const [data, setData] = useState<MonthlyData[]>(() => {
    try {
      const saved = localStorage.getItem('bp_margin_v3');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length === 12) return parsed;
      }
    } catch {}
    return Array.from({ length: 12 }, () => ({ revenue: '', income: '', expenses: '' }));
  });

  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    localStorage.setItem('bp_margin_v3', JSON.stringify(data));
  }, [data]);

  const handleChange = useCallback((i: number, field: keyof MonthlyData, val: string) => {
    setData(prev => {
      const next = [...prev];
      next[i] = { ...next[i], [field]: val };
      return next;
    });
  }, []);

  const handleReset = useCallback(() => {
    if (window.confirm(t.confirm_reset)) {
      setData(Array.from({ length: 12 }, () => ({ revenue: '', income: '', expenses: '' })));
    }
  }, [t.confirm_reset]);

  const months = t.months;

  // ── Расчёт: фойда = выручка − нархи омад − харочот, маржа = фойда / выручка ──
  const rows = useMemo(() => data.map((d, i) => {
    const revenue  = parseFloat(d.revenue)  || 0;
    const income   = parseFloat(d.income)   || 0;
    const expenses = parseFloat(d.expenses) || 0;
    const profit   = revenue - income - expenses;
    const margin   = revenue > 0 ? (profit / revenue) * 100 : NaN;
    const hasData  = !!(d.revenue || d.income || d.expenses);
    return { name: months[i], revenue, income, expenses, profit, margin, hasData };
  }), [data, months]);

  const totals = useMemo(() => rows.reduce((acc, r) => {
    if (r.hasData) {
      acc.revenue  += r.revenue;
      acc.income   += r.income;
      acc.expenses += r.expenses;
      acc.profit   += r.profit;
      acc.filled++;
      if (r.profit > 0) acc.profitableMonths++;
    }
    return acc;
  }, { revenue: 0, income: 0, expenses: 0, profit: 0, filled: 0, profitableMonths: 0 }), [rows]);

  const avgProfit = totals.filled > 0 ? totals.profit / totals.filled : NaN;
  const netMargin = totals.revenue > 0 ? (totals.profit / totals.revenue) * 100 : NaN;

  const chartData = useMemo(() =>
    rows.map(r => ({ name: r.name, profit: r.hasData ? r.profit : 0 })),
    [rows]
  );

  // ── Стиль инпута ──
  const inputCls = 'w-full bg-white/5 border border-glass-border rounded-lg px-2 py-1.5 text-[13px] font-bold text-text-primary text-right focus:border-accent/50 focus:ring-2 focus:ring-accent/14 outline-none transition-all';
  const inputClsLg = 'bg-white/5 border border-glass-border rounded-lg px-2.5 py-1.5 text-[14px] font-bold text-text-primary w-32 text-right focus:border-accent/52 focus:ring-2 focus:ring-accent/16 outline-none transition-all';

  return (
    <div className="space-y-6">

      {/* WA Strip — сверху */}
      <div className="flex items-center gap-3 bg-wa/7 border border-wa/18 rounded-2xl p-3 md:p-4 flex-wrap md:flex-nowrap">
        <span className="w-2 h-2 bg-wa rounded-full shadow-[0_0_7px_var(--color-wa)] animate-pulse shrink-0" />
        <div className="flex-1 min-w-0">
          <span className="block text-[13px] md:text-[13.5px] font-bold text-text-primary leading-tight">{t.wa_strip_title}</span>
          <span className="block text-[11px] text-text-muted mt-0.5">{t.wa_strip_sub}</span>
        </div>
        <a href={getWaUrl(lang)} target="_blank" rel="noopener noreferrer"
          className="flex items-center gap-1.5 bg-wa text-white text-[13px] font-bold px-4 py-2.5 rounded-xl shadow-[0_3px_14px_rgba(37,211,102,0.35)] hover:brightness-110 transition-all active:scale-95 w-full md:w-auto justify-center touch-manipulation">
          <MessageCircle size={15} fill="currentColor" />
          {t.wa_strip_btn}
        </a>
      </div>

      {/* Заголовок секции */}
      <div className="flex items-center justify-between gap-4">
        <span className="text-[10px] font-bold tracking-[0.18em] uppercase text-accent whitespace-nowrap">{t.sec_tag}</span>
        <div className="flex-1 h-px bg-glass-border" />
        <button onClick={handleReset}
          className="flex items-center gap-1.5 border border-glass-border rounded-xl px-3.5 py-1.5 text-[11.5px] font-semibold text-text-muted hover:border-accent/45 hover:text-accent transition-all active:scale-95 touch-manipulation">
          <RefreshCw size={12} strokeWidth={2.5} />
          {t.btn_reset}
        </button>
      </div>

      {/* ── Мобильные карточки (< md) ── */}
      <div className="grid grid-cols-2 gap-2.5 md:hidden">
        {months.map((m, i) => (
          <div key={i} className="glass rounded-2xl p-3.5 flex flex-col gap-2 focus-within:border-accent/30 transition-all">
            <div className="flex items-center justify-between mb-0.5">
              <span className="text-[11px] font-extrabold tracking-widest uppercase text-text-primary">{m}</span>
              <span className={cn('text-[10px] font-bold px-1.5 py-0.5 rounded-full', getMarginClass(rows[i].margin))}>
                {rows[i].hasData ? fmtPct(rows[i].margin) : '—'}
              </span>
            </div>

            <div className="space-y-1">
              <span className="text-[9px] font-semibold tracking-widest uppercase text-text-muted">{t.mc_revenue}</span>
              <input type="number" value={data[i].revenue}
                onChange={e => handleChange(i, 'revenue', e.target.value)}
                className={inputCls} placeholder="0" />
            </div>

            <div className="space-y-1">
              <span className="text-[9px] font-semibold tracking-widest uppercase text-text-muted">{t.mc_income}</span>
              <input type="number" value={data[i].income}
                onChange={e => handleChange(i, 'income', e.target.value)}
                className={inputCls} placeholder="0" />
            </div>

            <div className="space-y-1">
              <span className="text-[9px] font-semibold tracking-widest uppercase text-text-muted">{t.mc_expenses}</span>
              <input type="number" value={data[i].expenses}
                onChange={e => handleChange(i, 'expenses', e.target.value)}
                className={inputCls} placeholder="0" />
            </div>

            <div className="flex items-center justify-between pt-1.5 border-t border-white/5 mt-0.5">
              <span className="text-[9px] font-semibold tracking-widest uppercase text-text-muted">{t.mc_profit}</span>
              <span className={cn('text-[12px] font-bold tabular-nums',
                rows[i].profit > 0 ? 'text-green-400' : rows[i].profit < 0 ? 'text-red-400' : 'text-text-muted')}>
                {rows[i].hasData ? fmt(rows[i].profit) : '—'}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* ── Десктоп таблица (md+) ── */}
      <div className="hidden md:block glass rounded-2xl overflow-hidden shadow-2xl">
        <table className="w-full border-collapse min-w-160">
          <thead>
            <tr className="bg-white/5 border-b border-glass-border">
              <th className="p-3 text-left text-[10px] font-bold tracking-widest uppercase text-text-muted w-20">{t.th_month}</th>
              <th className="p-3 text-right text-[10px] font-bold tracking-widest uppercase text-text-muted">{t.th_revenue}</th>
              <th className="p-3 text-right text-[10px] font-bold tracking-widest uppercase text-text-muted">{t.th_income}</th>
              <th className="p-3 text-right text-[10px] font-bold tracking-widest uppercase text-text-muted">{t.th_expenses}</th>
              <th className="p-3 text-right text-[10px] font-bold tracking-widest uppercase text-text-muted">{t.th_profit}</th>
              <th className="p-3 text-right text-[10px] font-bold tracking-widest uppercase text-text-muted">{t.th_margin}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {months.map((m, i) => (
              <tr key={i} className="hover:bg-white/[0.025] transition-colors">
                <td className="p-3 text-[11px] font-bold tracking-widest uppercase text-text-muted">{m}</td>
                <td className="p-3 text-right">
                  <input type="number" value={data[i].revenue}
                    onChange={e => handleChange(i, 'revenue', e.target.value)}
                    className={inputClsLg} placeholder="0" />
                </td>
                <td className="p-3 text-right">
                  <input type="number" value={data[i].income}
                    onChange={e => handleChange(i, 'income', e.target.value)}
                    className={inputClsLg} placeholder="0" />
                </td>
                <td className="p-3 text-right">
                  <input type="number" value={data[i].expenses}
                    onChange={e => handleChange(i, 'expenses', e.target.value)}
                    className={inputClsLg} placeholder="0" />
                </td>
                <td className={cn('p-3 text-right font-bold text-[14px] tabular-nums',
                  rows[i].profit > 0 ? 'text-green-400' : rows[i].profit < 0 ? 'text-red-400' : 'text-text-muted')}>
                  {rows[i].hasData ? fmt(rows[i].profit) : '—'}
                </td>
                <td className="p-3 text-right">
                  <span className={cn('inline-flex items-center justify-center text-[10px] font-bold px-2 py-0.5 rounded-full min-w-[46px]', getMarginClass(rows[i].margin))}>
                    {rows[i].hasData ? fmtPct(rows[i].margin) : '—'}
                  </span>
                </td>
              </tr>
            ))}
            {/* Итого */}
            <tr className="bg-white/5 border-t border-glass-border">
              <td className="p-3 text-[10px] font-extrabold tracking-[0.18em] text-accent">{t.total}</td>
              <td className="p-3 text-right text-[13px] font-bold text-text-primary tabular-nums">{totals.filled > 0 ? fmt(totals.revenue) : '—'}</td>
              <td className="p-3 text-right text-[13px] font-bold text-text-muted tabular-nums">{totals.filled > 0 ? fmt(totals.income) : '—'}</td>
              <td className="p-3 text-right text-[13px] font-bold text-text-muted tabular-nums">{totals.filled > 0 ? fmt(totals.expenses) : '—'}</td>
              <td className={cn('p-3 text-right text-[14px] font-bold tabular-nums',
                totals.profit > 0 ? 'text-green-400' : totals.profit < 0 ? 'text-red-400' : 'text-text-muted')}>
                {totals.filled > 0 ? fmt(totals.profit) : '—'}
              </td>
              <td className="p-3 text-right">
                <span className={cn('inline-flex items-center justify-center text-[10px] font-bold px-2 py-0.5 rounded-full min-w-[46px]', getMarginClass(netMargin))}>
                  {totals.filled > 0 ? fmtPct(netMargin) : '—'}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Кнопка «Показать итоги» */}
      <div className="text-center">
        <button onClick={() => setShowResults(!showResults)}
          className={cn(
            'inline-flex items-center justify-center gap-2.5 w-full md:w-auto md:min-w-[280px] h-[52px] rounded-2xl font-extrabold text-[15px] md:text-[16px] tracking-tight transition-all active:scale-95 touch-manipulation',
            showResults
              ? 'bg-accent/12 text-accent border border-accent/25 hover:border-accent/45'
              : 'bg-accent text-bg shadow-[0_4px_24px_rgba(34,211,238,0.4)] hover:brightness-110 hover:shadow-[0_6px_32px_rgba(34,211,238,0.55)]'
          )}>
          <LayoutGrid size={18} strokeWidth={2.5} />
          {showResults ? t.calc_btn_hide : t.calc_btn_show}
        </button>
      </div>

      {/* ── Панель результатов ── */}
      <AnimatePresence>
        {showResults && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="pt-6 space-y-4">
              {/* KPI — строка 1 */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 md:gap-4">
                <div className="glass-heavy rounded-2xl p-4 text-center">
                  <div className="text-[9px] md:text-[10px] font-bold tracking-widest uppercase text-text-muted mb-2">{t.lbl_s_income}</div>
                  <div className="text-[1.1rem] md:text-[1.35rem] font-extrabold text-text-primary tabular-nums">{fmt(totals.revenue)}</div>
                  <div className="text-[9.5px] text-text-muted mt-1">{t.sub_s_income}</div>
                </div>
                <div className="glass-heavy rounded-2xl p-4 text-center">
                  <div className="text-[9px] md:text-[10px] font-bold tracking-widest uppercase text-text-muted mb-2">{t.lbl_s_expenses}</div>
                  <div className="text-[1.1rem] md:text-[1.35rem] font-extrabold text-text-muted tabular-nums">{fmt(totals.expenses)}</div>
                  <div className="text-[9.5px] text-text-muted mt-1">{t.sub_s_expenses}</div>
                </div>
                <div className="glass-heavy rounded-2xl p-4 text-center">
                  <div className="text-[9px] md:text-[10px] font-bold tracking-widest uppercase text-text-muted mb-2">{t.lbl_s_profit}</div>
                  <div className={cn('text-[1.1rem] md:text-[1.35rem] font-extrabold tabular-nums',
                    totals.profit >= 0 ? 'text-green-400' : 'text-red-400')}>{fmt(totals.profit)}</div>
                  <div className="text-[9.5px] text-text-muted mt-1">{t.sub_s_profit}</div>
                </div>
                <div className="glass-heavy rounded-2xl p-4 text-center">
                  <div className="text-[9px] md:text-[10px] font-bold tracking-widest uppercase text-text-muted mb-2">{t.lbl_s_margin}</div>
                  <div className="text-[1.1rem] md:text-[1.35rem] font-extrabold text-accent tabular-nums">{fmtPct(netMargin)}</div>
                  <div className="text-[9.5px] text-text-muted mt-1">{t.sub_s_margin}</div>
                </div>
              </div>

              {/* KPI — строка 2 */}
              <div className="grid grid-cols-2 gap-2.5 md:gap-4">
                <div className="glass-heavy rounded-2xl p-4 text-center">
                  <div className="text-[9px] md:text-[10px] font-bold tracking-widest uppercase text-text-muted mb-2">{t.lbl_s_avg}</div>
                  <div className="text-[1.1rem] md:text-[1.35rem] font-extrabold text-text-primary tabular-nums">{fmt(avgProfit)}</div>
                  <div className="text-[9.5px] text-text-muted mt-1">{t.sub_s_avg}</div>
                </div>
                <div className="glass-heavy rounded-2xl p-4 text-center">
                  <div className="text-[9px] md:text-[10px] font-bold tracking-widest uppercase text-text-muted mb-2">{t.lbl_s_months}</div>
                  <div className="text-[1.1rem] md:text-[1.35rem] font-extrabold text-text-primary tabular-nums">{totals.profitableMonths}</div>
                  <div className="text-[9.5px] text-text-muted mt-1">{t.sub_s_months}</div>
                </div>
              </div>

              {/* График */}
              <div className="glass-heavy rounded-2xl p-5 md:p-6">
                <div className="flex items-center justify-between mb-6">
                  <span className="text-[10px] font-bold tracking-widest uppercase text-text-muted">{t.chart_lbl}</span>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1.5 text-[10px] text-text-muted">
                      <div className="w-4 h-0.5 bg-accent rounded-full" />{t.legend_pos}
                    </div>
                    <div className="flex items-center gap-1.5 text-[10px] text-text-muted">
                      <div className="w-4 h-0.5 bg-red-400 rounded-full" />{t.legend_neg}
                    </div>
                  </div>
                </div>
                <div className="h-[140px] md:h-[180px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chartData}>
                      <defs>
                        <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%"  stopColor="#22d3ee" stopOpacity={0.3} />
                          <stop offset="95%" stopColor="#22d3ee" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                      <XAxis dataKey="name" axisLine={false} tickLine={false}
                        tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 700 }} dy={10} />
                      <YAxis hide />
                      <Tooltip
                        contentStyle={{ backgroundColor: 'rgba(12,14,18,0.9)', border: '1px solid rgba(34,211,238,0.15)', borderRadius: '12px', backdropFilter: 'blur(12px)' }}
                        itemStyle={{ color: '#f1f5f9', fontWeight: 700 }}
                        labelStyle={{ color: '#94a3b8', marginBottom: '4px', fontSize: '10px', textTransform: 'uppercase' }}
                        formatter={(v: number) => [fmt(v), t.legend_pos]}
                      />
                      <Area type="monotone" dataKey="profit" stroke="#22d3ee" strokeWidth={2.5}
                        fillOpacity={1} fill="url(#colorProfit)" animationDuration={1000} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* WA Strip — снизу */}
      <div className="flex items-center gap-3 bg-wa/7 border border-wa/18 rounded-2xl p-3 md:p-4 flex-wrap md:flex-nowrap">
        <span className="w-2 h-2 bg-wa rounded-full shadow-[0_0_7px_var(--color-wa)] animate-pulse shrink-0" />
        <div className="flex-1 min-w-0">
          <span className="block text-[13px] md:text-[13.5px] font-bold text-text-primary leading-tight">{t.wa_strip_title}</span>
          <span className="block text-[11px] text-text-muted mt-0.5">{t.wa_strip_sub}</span>
        </div>
        <a href={getWaUrl(lang)} target="_blank" rel="noopener noreferrer"
          className="flex items-center gap-1.5 bg-wa text-white text-[13px] font-bold px-4 py-2.5 rounded-xl shadow-[0_3px_14px_rgba(37,211,102,0.35)] hover:brightness-110 transition-all active:scale-95 w-full md:w-auto justify-center touch-manipulation">
          <MessageCircle size={15} fill="currentColor" />
          {t.wa_strip_btn}
        </a>
      </div>

    </div>
  );
};
