export type Language = 'tg' | 'ru';

export interface MonthlyData {
  revenue: string;  // выручка / даромади умумӣ
  income: string;   // нархи омад (себестоимость) / себестоимость
  expenses: string; // харочоти корхона / расходы предприятия
}

export type TabType = 'monthly' | 'markup' | 'help';
