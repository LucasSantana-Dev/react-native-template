import { ThemeColors } from '@/types/theme';

export interface Feature {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
}

export const DOCUMENTATION_LINKS = [
  {
    title: 'React Native',
    url: 'https://reactnative.dev/',
    description: 'Documentação oficial do React Native',
    icon: '⚛️',
  },
  {
    title: 'Expo',
    url: 'https://docs.expo.dev/',
    description: 'Documentação oficial do Expo',
    icon: '📱',
  },
  {
    title: 'TypeScript',
    url: 'https://www.typescriptlang.org/docs/',
    description: 'Documentação oficial do TypeScript',
    icon: '🔷',
  },
  {
    title: 'React Hook Form',
    url: 'https://react-hook-form.com/',
    description: 'Documentação do React Hook Form',
    icon: '📝',
  },
];

export const getFeatures = (colors: ThemeColors): Feature[] => [
  {
    id: '1',
    title: 'Componentes UI',
    description: 'Button, Card, Input e outros componentes prontos para uso',
    icon: '🎨',
    color: colors.primary,
  },
  {
    id: '2',
    title: 'Sistema de Tema',
    description: 'Cores, tipografia e espaçamentos consistentes',
    icon: '🎯',
    color: colors.secondary,
  },
  {
    id: '3',
    title: 'Utilitários Brasileiros',
    description: 'Formatação de CPF, telefone, CEP e moeda',
    icon: '🇧🇷',
    color: colors.success,
  },
  {
    id: '4',
    title: 'Navegação',
    description: 'Expo Router com navegação tipada e lazy loading',
    icon: '🧭',
    color: colors.warning,
  },
  {
    id: '5',
    title: 'Performance',
    description: 'Otimizações para listas grandes e carregamento lazy',
    icon: '⚡',
    color: colors.info,
  },
  {
    id: '6',
    title: 'Testes',
    description: 'Jest e Detox configurados para testes unitários e E2E',
    icon: '🧪',
    color: colors.error,
  },
];
