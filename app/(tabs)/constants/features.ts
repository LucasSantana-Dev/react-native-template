// ========== FEATURE TYPE ==========
export interface Feature {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
}

// ========== FEATURE DATA ==========
export const FEATURES: Feature[] = [
  {
    id: 'components',
    title: 'Componentes UI',
    description: 'Biblioteca completa de componentes reutilizáveis',
    icon: '🎨',
    color: '#6366F1',
  },
  {
    id: 'navigation',
    title: 'Navegação',
    description: 'Sistema de navegação com Expo Router',
    icon: '🧭',
    color: '#8B5CF6',
  },
  {
    id: 'state',
    title: 'Gerenciamento de Estado',
    description: 'Context API e hooks personalizados',
    icon: '📊',
    color: '#06B6D4',
  },
  {
    id: 'forms',
    title: 'Formulários',
    description: 'Validação com Zod e React Hook Form',
    icon: '📝',
    color: '#10B981',
  },
  {
    id: 'theming',
    title: 'Tema',
    description: 'Sistema de temas claro/escuro',
    icon: '🎭',
    color: '#F59E0B',
  },
  {
    id: 'utils',
    title: 'Utilitários',
    description: 'Funções auxiliares e helpers',
    icon: '🔧',
    color: '#EF4444',
  },
  {
    id: 'testing',
    title: 'Testes',
    description: 'Configuração de testes unitários e E2E',
    icon: '🧪',
    color: '#84CC16',
  },
  {
    id: 'performance',
    title: 'Performance',
    description: 'Otimizações e métricas de performance',
    icon: '⚡',
    color: '#F97316',
  },
];

// ========== DOCUMENTATION LINKS ==========
export const DOCUMENTATION_LINKS = [
  {
    title: 'Expo Documentation',
    description: 'Documentação oficial do Expo',
    url: 'https://docs.expo.dev/',
    icon: '📚',
  },
  {
    title: 'React Native Documentation',
    description: 'Documentação oficial do React Native',
    url: 'https://reactnative.dev/',
    icon: '⚛️',
  },
  {
    title: 'TypeScript Handbook',
    description: 'Guia completo do TypeScript',
    url: 'https://www.typescriptlang.org/docs/',
    icon: '📘',
  },
  {
    title: 'React Hook Form',
    description: 'Documentação do React Hook Form',
    url: 'https://react-hook-form.com/',
    icon: '📋',
  },
  {
    title: 'Zod Documentation',
    description: 'Documentação do Zod para validação',
    url: 'https://zod.dev/',
    icon: '✅',
  },
];
