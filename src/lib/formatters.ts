import { Language } from '../types';

export const fmt = (n: number | null | undefined) => {
  if (n === null || n === undefined || isNaN(n)) return '—';
  return n.toLocaleString('ru-RU', { maximumFractionDigits: 0 });
};

export const fmtPct = (n: number) => {
  if (!isFinite(n) || isNaN(n)) return '—';
  return n.toFixed(1) + '%';
};

export const getMarginClass = (p: number) => {
  if (!isFinite(p) || isNaN(p)) return 'text-text-3 bg-slate-800/50';
  if (p >= 30) return 'text-green-400 bg-green-400/10';
  if (p >= 10) return 'text-yellow-400 bg-yellow-400/10';
  if (p > 0) return 'text-red-400 bg-red-400/10';
  return 'text-text-3 bg-slate-800/50';
};

export const WA_BASE = 'https://wa.me/992918175700';

export const getWaUrl = (lang: Language, margin?: string) => {
  if (!margin || margin === '—') return WA_BASE;
  const msg = lang === 'tg'
    ? `Салом! Маржаи умумии бизнеси ман ${margin} мебошад. Мехоҳам бо мутахассисон нуқтаи рушдро пайдо намоям.`
    : `Привет! Общая маржа моего бизнеса ${margin}. Хочу найти точки роста с экспертом.`;
  return `${WA_BASE}?text=${encodeURIComponent(msg)}`;
};
