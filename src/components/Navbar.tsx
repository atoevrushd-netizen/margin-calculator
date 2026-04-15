import React, { useState, useEffect } from 'react';
import { Language } from '../types';
import { TRANSLATIONS } from '../constants/translations';
import { ChevronLeft } from 'lucide-react';
import { cn } from '../lib/utils';

interface NavbarProps {
  lang: Language;
  setLang: (l: Language) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ lang, setLang }) => {
  const t = TRANSLATIONS[lang];
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 pt-safe',
        scrolled
          ? 'bg-[#060a12]/95 backdrop-blur-xl border-b border-cyan-500/10 shadow-[0_8px_32px_rgba(0,0,0,0.45)]'
          : 'bg-[#060a12]/60 backdrop-blur-md border-b border-transparent'
      )}
    >
      <div className="max-w-[1024px] mx-auto px-3 sm:px-4 h-[52px] md:h-[56px] flex items-center gap-2 sm:gap-3">

        {/* Назад — крупная зона касания на мобилке */}
        <a
          href="/"
          className="flex items-center justify-center w-9 h-9 sm:w-8 sm:h-8 rounded-xl sm:rounded-lg text-slate-400 hover:text-cyan-400 hover:bg-cyan-400/8 active:bg-cyan-400/12 transition-colors duration-200 touch-manipulation shrink-0"
          aria-label="На сайт"
        >
          <ChevronLeft size={20} strokeWidth={2.5} />
        </a>

        {/* Логотип */}
        <a
          href="#"
          className="font-bold text-[14px] sm:text-[15px] text-slate-100 tracking-tight shrink-0 leading-none touch-manipulation"
        >
          Бизнес<span className="text-cyan-400">.</span>Панели
        </a>

        {/* Подзаголовок (скрыт на xs, виден на sm+) */}
        <span className="hidden sm:inline-flex items-center gap-1.5 text-[10px] font-semibold tracking-[0.18em] uppercase text-slate-500 bg-white/[0.04] border border-cyan-500/10 rounded-full px-3 py-1 flex-1 max-w-[260px] mx-auto justify-center overflow-hidden whitespace-nowrap text-ellipsis">
          <span className="w-1 h-1 rounded-full bg-cyan-400 shadow-[0_0_5px_#22d3ee] animate-pulse shrink-0" />
          {t.nav_title}
        </span>

        {/* Переключатель языка */}
        <div className="flex bg-white/[0.04] border border-cyan-500/10 rounded-lg p-0.5 gap-0.5 shrink-0 ml-auto">
          {(['tg', 'ru'] as Language[]).map((l) => (
            <button
              key={l}
              onClick={() => setLang(l)}
              className={cn(
                'px-2.5 py-1.5 sm:py-1 rounded-md text-[11px] font-bold transition-all duration-200 touch-manipulation min-w-[32px]',
                lang === l
                  ? 'bg-[#141e33] text-slate-100 border border-cyan-500/15 shadow-sm'
                  : 'text-slate-500 hover:text-slate-300 active:text-slate-100'
              )}
            >
              {l === 'tg' ? 'ТҶ' : 'RU'}
            </button>
          ))}
        </div>

      </div>
    </nav>
  );
};
