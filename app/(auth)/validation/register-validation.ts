import { validateCPF } from '@/lib/utils/cpf';
import { validatePhone } from '@/lib/utils/phone';
import { isValidEmail } from '@/lib/utils/validation';

export interface RegisterForm {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  cpf: string;
  phone: string;
}

export const registerValidation = {
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
  password: (value: string) => {
    if (!value) return 'Senha é obrigatória';
    if (value.length < 6) return 'Senha deve ter pelo menos 6 caracteres';
    return undefined;
  },
  confirmPassword: (value: string, formData: RegisterForm) => {
    if (!value) return 'Confirmação de senha é obrigatória';
    if (value !== formData.password) return 'Senhas não coincidem';
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
