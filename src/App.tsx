import { useState, useEffect, useCallback, lazy, Suspense } from 'react';
import { Language, TabType } from './types';
import { TRANSLATIONS } from './constants/translations';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Calendar, CirclePercent, BookOpen } from 'lucide-react';
import { cn } from './lib/utils';
import { motion, AnimatePresence } from 'motion/react';

// ── Lazy-загрузка вкладок ──
const MonthlyCalculator = lazy(() =>
  import('./components/MonthlyCalculator').then(m => ({ default: m.MonthlyCalculator }))
);
const MarkupCalculator = lazy(() =>
  import('./components/MarkupCalculator').then(m => ({ default: m.MarkupCalculator }))
);
const HelpComponent = lazy(() =>
  import('./components/HelpComponent').then(m => ({ default: m.HelpComponent }))
);

function TabSkeleton() {
  return (
    <div className="space-y-4 animate-pulse">
      <div className="h-16 rounded-2xl bg-white/4" />
      <div className="grid grid-cols-2 gap-3">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-28 rounded-2xl bg-white/3" />
        ))}
      </div>
    </div>
  );
}

function BackgroundPrimitives() {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden" aria-hidden>
      <div className="absolute -top-32 -right-24 h-120 w-120 rounded-full bg-cyan-500/7 blur-[130px]" />
      <div className="absolute top-1/3 -left-28 h-85 w-85 rounded-full bg-sky-400/5 blur-[100px]" />
      <div className="absolute bottom-0 right-1/4 h-65 w-65 rounded-full bg-cyan-400/4 blur-[80px]" />
      <div
        className="absolute inset-0 opacity-[0.018]"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(34,211,238,0.9) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />
    </div>
  );
}

export default function App() {
  const [lang, setLang] = useState<Language>(
    () => (localStorage.getItem('bp_lang') as Language) || 'tg'
  );
  const [activeTab, setActiveTab] = useState<TabType>('monthly');

  useEffect(() => {
    localStorage.setItem('bp_lang', lang);
    document.documentElement.lang = lang;
  }, [lang]);

  const handleTabChange = useCallback((id: TabType) => setActiveTab(id), []);

  const t = TRANSLATIONS[lang];

  // BEP удалён — только 3 вкладки
  const tabs = [
    { id: 'monthly' as TabType, label: t.tab_monthly, icon: Calendar },
    { id: 'markup'  as TabType, label: t.tab_markup,  icon: CirclePercent },
    { id: 'help'    as TabType, label: t.tab_help,    icon: BookOpen },
  ];

  return (
    <div className="min-h-screen bg-bg selection:bg-cyan-400/20 selection:text-slate-100">
      <BackgroundPrimitives />
      <Navbar lang={lang} setLang={setLang} />

      <main className="relative z-10 max-w-5xl mx-auto px-0 sm:px-3 md:px-4 pt-13 md:pt-14 pb-0 sm:pb-8 md:pb-12">
        <div
          className="overflow-hidden sm:rounded-[20px] md:rounded-3xl"
          style={{
            background: 'rgba(20, 30, 51, 0.72)',
            backdropFilter: 'blur(32px)',
            WebkitBackdropFilter: 'blur(32px)',
            border: '1px solid rgba(34, 211, 238, 0.13)',
            boxShadow: '0 40px 100px rgba(0,0,0,0.55), 0 0 0 1px rgba(34,211,238,0.06), 0 0 60px rgba(34,211,238,0.04)',
          }}
        >
          <div className="grid grid-cols-1 md:grid-cols-[240px_1fr]">

            {/* ── Сайдбар (md+) ── */}
            <aside className="hidden md:flex flex-col border-r border-cyan-500/10 p-10 gap-8">
              <a href="/" className="font-bold text-[18px] text-slate-100 tracking-tight shrink-0 leading-none hover:opacity-80 transition-opacity duration-200">
                Бизнес<span className="text-cyan-400">.</span>Панели
              </a>

              <nav className="flex flex-col gap-1.5">
                <p className="text-[9px] font-semibold tracking-[0.2em] uppercase text-slate-600 px-3 mb-1">
                  {lang === 'tg' ? 'Асбобҳо' : 'Инструменты'}
                </p>
                {tabs.map(({ id, label, icon: Icon }) => {
                  const isActive = activeTab === id;
                  return (
                    <button key={id} onClick={() => handleTabChange(id)}
                      className={cn(
                        'flex items-center gap-3 px-3 py-3 rounded-xl text-[14px] font-medium transition-all duration-200 text-left',
                        isActive
                          ? 'bg-cyan-400/8 text-cyan-400 border border-cyan-500/20'
                          : 'text-slate-400 hover:text-slate-100 hover:bg-white/5 border border-transparent'
                      )}>
                      <Icon size={17} strokeWidth={2}
                        className={cn('shrink-0', isActive ? 'text-cyan-400' : 'text-slate-500')} />
                      {label}
                    </button>
                  );
                })}
              </nav>

              <div className="mt-auto pt-4 border-t border-cyan-500/10">
                <a href="/" className="flex items-center gap-2 text-[12px] text-slate-500 hover:text-cyan-400 transition-colors duration-200">
                  <span className="w-1 h-1 rounded-full bg-cyan-400/60" />
                  saydahtam.tj
                </a>
              </div>
            </aside>

            {/* ── Правая колонка ── */}
            <div className="flex flex-col min-h-0 md:min-h-150">

              {/* Горизонтальный таб-бар (мобилка) */}
              <div className="md:hidden border-b border-cyan-500/10 bg-[rgba(10,16,30,0.5)] px-3 py-2.5 overflow-x-auto scrollbar-hide">
                <div className="flex gap-1.5 min-w-max">
                  {tabs.map(({ id, label, icon: Icon }) => {
                    const isActive = activeTab === id;
                    return (
                      <button key={id} onClick={() => handleTabChange(id)}
                        className={cn(
                          'flex items-center gap-2 px-3.5 py-2 rounded-xl text-[13px] font-semibold transition-all duration-200 whitespace-nowrap touch-manipulation',
                          isActive
                            ? 'bg-cyan-400/10 text-cyan-400 border border-cyan-500/20'
                            : 'text-slate-500 border border-transparent active:text-slate-200 active:bg-white/5'
                        )}>
                        <Icon size={15} strokeWidth={2} className="shrink-0" />
                        {label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Контент */}
              <div className="p-4 sm:p-6 md:p-12 flex-1">
                <Hero lang={lang} />
                <Suspense fallback={<TabSkeleton />}>
                  <AnimatePresence mode="wait">
                    <motion.div key={activeTab}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}>
                      {activeTab === 'monthly' && <MonthlyCalculator lang={lang} />}
                      {activeTab === 'markup'  && <MarkupCalculator  lang={lang} />}
                      {activeTab === 'help'    && <HelpComponent     lang={lang} />}
                    </motion.div>
                  </AnimatePresence>
                </Suspense>
              </div>
            </div>

          </div>
        </div>
      </main>

      <footer className="relative z-10 border-t border-cyan-500/10 py-5 text-center text-[11px] sm:text-[11.5px] text-slate-600"
        style={{ paddingBottom: 'max(1.25rem, env(safe-area-inset-bottom))' }}>
        <div className="max-w-5xl mx-auto px-4">
          {t.footer.split('·').map((part, i) => (
            <span key={i}>
              {i > 0 && <span className="mx-1.5 sm:mx-2 text-cyan-500/30">·</span>}
              {part.includes('Бизнес.Панели') ? (
                <span>
                  <em className="text-cyan-400 not-italic font-semibold">Бизнес</em>
                  <em className="text-cyan-400 not-italic font-semibold">.</em>
                  <em className="text-slate-400 not-italic font-semibold">Панели</em>
                </span>
              ) : part}
            </span>
          ))}
        </div>
      </footer>
    </div>
  );
}
