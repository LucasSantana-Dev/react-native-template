import { cleanCPF, formatCPF, generateCPF, validateCPF } from '@/lib/utils/cpf';

describe('CPF Utils', () => {
  describe('formatCPF', () => {
    it('should format valid CPF string', () => {
      expect(formatCPF('12345678901')).toBe('123.456.789-01');
      expect(formatCPF('11144477735')).toBe('111.444.777-35');
    });

    it('should handle already formatted CPF', () => {
      expect(formatCPF('123.456.789-01')).toBe('123.456.789-01');
    });

    it('should handle empty string', () => {
      expect(formatCPF('')).toBe('');
    });

    it('should handle invalid input', () => {
      expect(formatCPF('123')).toBe('123');
      expect(formatCPF('abc')).toBe('abc');
    });
  });

  describe('cleanCPF', () => {
    it('should remove all non-numeric characters', () => {
      expect(cleanCPF('123.456.789-01')).toBe('12345678901');
      expect(cleanCPF('123 456 789 01')).toBe('12345678901');
      expect(cleanCPF('123-456-789-01')).toBe('12345678901');
    });

    it('should handle empty string', () => {
      expect(cleanCPF('')).toBe('');
    });
  });

  describe('validateCPF', () => {
    it('should validate correct CPF', () => {
      expect(validateCPF('11144477735')).toBe(true);
      expect(validateCPF('111.444.777-35')).toBe(true);
      // Use a valid CPF instead of 12345678901
      expect(validateCPF('12345678909')).toBe(true);
    });

    it('should reject invalid CPF', () => {
      expect(validateCPF('11111111111')).toBe(false);
      expect(validateCPF('12345678900')).toBe(false);
      expect(validateCPF('123')).toBe(false);
      expect(validateCPF('')).toBe(false);
      expect(validateCPF('abc')).toBe(false);
    });

    it('should reject CPF with wrong length', () => {
      expect(validateCPF('123456789')).toBe(false);
      expect(validateCPF('123456789012')).toBe(false);
    });
  });

  describe('generateCPF', () => {
    it('should generate valid CPF', () => {
      const cpf = generateCPF();
      expect(validateCPF(cpf)).toBe(true);
      expect(cleanCPF(cpf)).toHaveLength(11);
    });

    it('should generate different CPFs', () => {
      const cpf1 = generateCPF();
      const cpf2 = generateCPF();
      expect(cpf1).not.toBe(cpf2);
    });

    it('should generate valid CPF', () => {
      const cpf = generateCPF();
      expect(validateCPF(cpf)).toBe(true);
    });
  });
});
