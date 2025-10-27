---
description:
globs:
alwaysApply: false
---

# Regras de Commit

## Estrutura de Mensagem de Commit

Ao criar uma mensagem de commit, siga estas regras:

### 1. Verificar Arquivos Staged

- Use `git status` para verificar arquivos na área de staging
- Analise o tipo e escopo das mudanças

### 2. Seguir Regras do Commitlint

Tipos permitidos:

- `feat`: Nova funcionalidade
- `fix`: Correção de bug
- `docs`: Mudanças apenas na documentação
- `style`: Mudanças que não afetam o significado do código (espaços em branco,
  formatação, etc)
- `refactor`: Mudanças no código que não corrigem bugs nem adicionam
  funcionalidades
- `perf`: Melhorias de performance
- `test`: Adição de testes ausentes ou correção de testes existentes
- `build`: Mudanças que afetam o sistema de build ou dependências externas
- `ci`: Mudanças nos arquivos de configuração e scripts de CI
- `chore`: Outras mudanças que não modificam arquivos src ou test
- `revert`: Reverte um commit anterior

### 3. Formato da Mensagem

```
<tipo>(<escopo>): <descrição curta>

<descrição detalhada>
```

### 4. Regras de Formatação

- Título deve estar em minúsculas
- Não usar sentence-case, start-case, pascal-case ou upper-case no assunto
- Usar modo imperativo na descrição
- Escopo é opcional mas recomendado

### 5. Commit Manual

Para fazer commits, use o comando git commit diretamente seguindo o formato:

```bash
git commit -m "tipo(escopo): descrição curta

descrição detalhada"
```

### 6. Exemplo

```
feat(coordinator): implementar telas do módulo coordenador

- Adicionar novas telas e funcionalidades do coordenador
- Atualizar estrutura de navegação
- Implementar novos componentes
- Configurar dependências necessárias
```

## Regras Específicas do Projeto EduBank

### 1. Escopos Recomendados

- `auth`: Autenticação e autorização
- `student`: Funcionalidades específicas do estudante
- `teacher`: Funcionalidades específicas do professor
- `transfer`: Sistema de transferências
- `extract`: Funcionalidades de extrato
- `profile`: Gerenciamento de perfil
- `navigation`: Configuração de navegação
- `ui`: Componentes de interface
- `config`: Arquivos de configuração
- `deps`: Gerenciamento de dependências

### 2. Padrões de Commit por Tipo

#### Funcionalidades (feat)

```
feat(student): adicionar tela de transferência

- Implementar formulário de transferência
- Adicionar validação de saldo
- Integrar com API de transações
```

#### Correções (fix)

```
fix(auth): corrigir validação de login

- Resolver problema de validação de email
- Ajustar feedback de erro para usuário
```

#### Refatoração (refactor)

```
refactor(components): melhorar estrutura do Header

- Extrair lógica de navegação
- Simplificar props do componente
- Melhorar tipagem TypeScript
```

#### Estilo (style)

```
style(screens): aplicar tema consistente

- Usar cores do sistema de design
- Remover color literals
- Aplicar espaçamento padrão
```

#### Documentação (docs)

```
docs(readme): atualizar instruções de setup

- Adicionar comandos de instalação
- Documentar estrutura do projeto
- Incluir guia de contribuição
```

### 3. Mensagens de Commit Proibidas

❌ **Evitar:**

- "fix" (muito genérico)
- "update" (não específico)
- "changes" (vago)
- "wip" (work in progress - não commitar)
- Mensagens em inglês (usar português)
- Mensagens com maiúsculas no início

✅ **Preferir:**

- "fix(auth): corrigir validação de senha"
- "feat(transfer): implementar confirmação de transferência"
- "refactor(styles): organizar sistema de cores"

### 4. Commits Especiais

#### Breaking Changes

```
feat(api): alterar estrutura de resposta da API

BREAKING CHANGE: A estrutura de resposta da API de transferências
foi alterada. O campo 'data' agora contém um objeto ao invés de array.

- Atualizar tipos TypeScript
- Ajustar componentes que consomem a API
- Adicionar migração para versões antigas
```

#### Reversão de Commits

```
revert: feat(student): adicionar tela de investimentos

This reverts commit 1234567.

Motivo: Funcionalidade ainda não está pronta para produção
```

## Integração com Ferramentas

### 1. Commitlint

O projeto usa commitlint para validar mensagens de commit automaticamente.

Configuração em `commitlint.config.js`:

- Valida tipos permitidos
- Verifica formato da mensagem
- Garante que o assunto esteja em minúsculas

### 2. Commit Manual

Use o comando git commit diretamente:

```bash
git commit -m "tipo(escopo): descrição"
```

### 3. Pre-commit Hooks

Os hooks executam automaticamente:

- Linting (`npm run lint:fix`)
- Formatação (`npm run format`)
- Validação de commit message

## Boas Práticas

### 1. Commits Atômicos

- Um commit = uma mudança lógica
- Não misturar diferentes tipos de mudanças
- Facilita revisão e rollback

### 2. Mensagens Descritivas

- Explique o "porquê", não apenas o "o quê"
- Use linguagem clara e objetiva
- Inclua contexto quando necessário

### 3. Frequência de Commits

- Commit frequentemente (múltiplas vezes por dia)
- Não acumule muitas mudanças em um commit
- Mantenha o histórico granular e rastreável

### 4. Revisão Antes do Commit

- Verifique arquivos staged: `git status`
- Revise mudanças: `git diff --staged`
- Teste as mudanças antes de commitar

## Fluxo de Trabalho

### 1. Preparação

```bash
# Verificar status
git status

# Adicionar arquivos específicos
git add src/components/Header.tsx

# Verificar mudanças staged
git diff --staged
```

### 2. Commit

```bash
# Commit manual (recomendado)
git commit -m "feat(ui): implementar componente Header

- Adicionar navegação com botão voltar
- Implementar título dinâmico
- Aplicar estilo consistente com design system"
```

### 3. Verificação

```bash
# Ver último commit
git log -1 --oneline

# Ver histórico recente
git log --oneline -5
```

## Exemplos Práticos

### Desenvolvimento de Funcionalidades

```bash
# Implementação
git commit -m "feat(student): adicionar validação de saldo na transferência"

# Testes
git commit -m "test(student): adicionar testes para validação de saldo"

# Documentação
git commit -m "docs(student): documentar fluxo de transferência"
```

### Correções e Melhorias

```bash
# Bug fix
git commit -m "fix(transfer): corrigir cálculo de taxa de transferência"

# Performance
git commit -m "perf(extract): otimizar carregamento da lista de transações"

# Refatoração
git commit -m "refactor(auth): simplificar lógica de autenticação"
```

### Configuração e Manutenção

```bash
# Dependências
git commit -m "build(deps): atualizar react-native para v0.72"

# CI/CD
git commit -m "ci: adicionar cache para node_modules no GitHub Actions"

# Configuração
git commit -m "chore(config): atualizar configuração do ESLint"
```
