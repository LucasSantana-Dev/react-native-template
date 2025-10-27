import { validateCPF } from '@/lib/utils/cpf';
import { validatePhone } from '@/lib/utils/phone';
import { isValidEmail } from '@/lib/utils/validation';

export interface ProfileForm {
  name: string;
  email: string;
  cpf: string;
  phone: string;
}

export const profileValidation = {
  name: (value: string) => {
    if (!value) return 'Nome é obrigatório';
    if (value.length < 2) return 'Nome deve ter pelo menos 2 caracteres';
    return undefined;
  },
  email: (value: string) => {
    if (!value) return 'Email é obrigatório';
    if (!isValidEmail(value)) return 'Email inválido';
    return undefined;
  },
  cpf: (value: string) => {
    if (!value) return 'CPF é obrigatório';
    if (!validateCPF(value)) return 'CPF inválido';
    return undefined;
  },
  phone: (value: string) => {
    if (!value) return 'Telefone é obrigatório';
    if (!validatePhone(value)) return 'Telefone inválido';
    return undefined;
  },
};
