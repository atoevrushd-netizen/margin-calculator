import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');
  return {
    plugins: [react(), tailwindcss()],

    define: {
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
    },

    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },

    // ── Предварительная оптимизация тяжёлых зависимостей ──
    optimizeDeps: {
      include: ['react', 'react-dom', 'motion', 'recharts', 'lucide-react'],
    },

    build: {
      // ES2020 — меньше полифилов, быстрее
      target: 'es2020',
      // Минимальный порог предупреждения
      chunkSizeWarningLimit: 600,

      rollupOptions: {
        output: {
          // Разбиваем тяжёлые вендоры в отдельные чанки:
          // - загружаются параллельно
          // - кэшируются отдельно (при обновлении приложения recharts не перекачивается)
          manualChunks: {
            'vendor-react':    ['react', 'react-dom'],
            'vendor-motion':   ['motion'],
            'vendor-recharts': ['recharts'],
            'vendor-icons':    ['lucide-react'],
          },
        },
      },
    },

    server: {
      hmr: process.env.DISABLE_HMR !== 'true',
    },
  };
});
