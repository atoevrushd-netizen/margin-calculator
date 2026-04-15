import React from 'react';
import { Language } from '../types';
import { TRANSLATIONS } from '../constants/translations';
import { motion } from 'motion/react';

interface HeroProps {
  lang: Language;
}

export const Hero: React.FC<HeroProps> = ({ lang }) => {
  const t = TRANSLATIONS[lang];

  return (
    <section className="mb-6 sm:mb-8 md:mb-10 text-left">
      {/* Eyebrow */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="inline-flex items-center gap-1.5 text-[10px] sm:text-[11px] font-semibold tracking-[0.18em] uppercase text-cyan-400 mb-3 sm:mb-4"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_6px_#22d3ee] shrink-0" />
        {t.hero_tag}
      </motion.div>

      {/* H1 — адаптивный размер */}
      <motion.h1
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
        className="text-[1.5rem] sm:text-[2rem] md:text-[2.6rem] font-light text-slate-100 leading-[1.12] tracking-tight mb-2.5 sm:mb-3"
      >
        {t.hero_h1_1}{' '}
        <span className="font-black text-cyan-400">{t.hero_h1_2}</span>
      </motion.h1>

      {/* Cyan-линия разделитель */}
      <motion.div
        className="w-8 sm:w-10 h-[2px] bg-gradient-to-r from-cyan-400 to-sky-500 mb-3 sm:mb-4 shadow-[0_0_8px_rgba(34,211,238,0.45)]"
        initial={{ scaleX: 0, originX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.38, duration: 0.45, ease: 'easeOut' }}
      />

      {/* Подзаголовок */}
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
        className="text-[13px] sm:text-[14px] md:text-[15px] text-slate-400 leading-relaxed max-w-[36rem]"
      >
        {t.hero_sub}
      </motion.p>
    </section>
  );
};
