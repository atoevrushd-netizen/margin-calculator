import React from 'react';
import { Language } from '../types';
import { TRANSLATIONS } from '../constants/translations';
import { BookOpen, BarChart3, Calculator } from 'lucide-react';
import { motion } from 'motion/react';

interface HelpComponentProps {
  lang: Language;
}

export const HelpComponent: React.FC<HelpComponentProps> = ({ lang }) => {
  const t = TRANSLATIONS[lang];

  const sections = [
    {
      title: t.help_monthly_title,
      text: t.help_monthly_text,
      icon: BarChart3,
      color: 'text-accent',
      bg: 'bg-accent/10'
    },
    {
      title: t.help_markup_title,
      text: t.help_markup_text,
      icon: Calculator,
      color: 'text-green-400',
      bg: 'bg-green-400/10'
    },
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center text-accent">
          <BookOpen size={24} />
        </div>
        <h2 className="text-[24px] font-bold text-text-primary tracking-tight">{t.help_title}</h2>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {sections.map((section, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="glass rounded-2xl p-6 md:p-8 flex flex-col md:flex-row gap-6 items-start"
          >
            <div className={`w-12 h-12 rounded-2xl ${section.bg} flex items-center justify-center ${section.color} shrink-0`}>
              <section.icon size={28} />
            </div>
            <div className="space-y-3">
              <h3 className="text-[18px] font-bold text-text-primary">{section.title}</h3>
              <p className="text-[14px] text-text-muted leading-relaxed whitespace-pre-line">
                {section.text}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="glass-heavy rounded-2xl p-6 text-center border-accent/20">
        <p className="text-[13px] text-text-muted">
          {lang === 'ru' 
            ? 'Если у вас остались вопросы, вы всегда можете проконсультироваться с нашим экспертом через WhatsApp.' 
            : 'Агар шумо саволҳои иловагӣ дошта бошед, шумо метавонед ҳамеша бо коршиноси мо тавассути WhatsApp машварат кунед.'}
        </p>
      </div>
    </div>
  );
};
