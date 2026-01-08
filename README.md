# 🚀 ROI POSITIVO: Construtor de Páginas IA

Este repositório é o centro de inteligência estratégica e técnica da Agência ROI POSITIVO. Ele utiliza engenharia de prompts avançada, Google AI Studio (Gemini 3 Pro) e componentes modernos (Shadcn/UI + Tailwind CSS) para criar Landing Pages de alta conversão.

## 🛠️ Arquitetura do Repositório

- **`/01-PROMPTS-MESTRES`**: Instruções fundamentais que guiam o comportamento da IA.
- **`/02-CORE-TECNICO`**: Definições técnicas de UI (Shadcn e Tailwind) para garantir performance e design premium.
- **`/03-CLIENTES`**: Repositório de DNA e ativos específicos para cada cliente atendido.

---

## 🔄 Fluxo de Trabalho (Workflow)

Para criar uma nova aplicação ou página, siga rigorosamente esta ordem de processos no **Google AI Studio**:

### Passo 1: Configuração do Sistema (Setup)
Copie o conteúdo de `prompts/system-base.md` e cole no campo **System Instructions** do Google AI Studio. Isso define a personalidade da IA como Especialista em Conversão da ROI POSITIVO.

### Passo 2: Criação do DNA do Cliente
Utilize o prompt `prompts/gerador-de-config.md`. Forneça o briefing do cliente (nicho, público, arquétipo).
- **Resultado:** Gere o arquivo `clientes/nome-do-cliente/config.md`. Este documento guarda as cores, fontes e tom de voz exclusivo do cliente.

### Passo 3: Construção da Base Técnica (Design System)
Utilize o prompt `prompts/gerador-de-design-system.md` combinando:
1. O conteúdo do `config.md` do cliente.
2. As diretrizes de `/core-tecnico` (Shadcn/Tailwind).
- **Resultado:** Gere o arquivo `clientes/nome-do-cliente/design-system-page.md`. Aqui a IA aprende a "codar" visualmente para esse cliente.

### Passo 4: Geração da Landing Page (Execução)
Utilize o prompt `prompts/gerar-lp-final.md`. Com base em toda a carga anterior (DNA + Design System), solicite a criação da página específica (Ex: Página de Vendas, Captura de Leads).
- **Resultado:** Código e copy prontos para implementação.

### Passo 5: Escala e Manutenção
Com a sessão do chat configurada, você pode solicitar variações (Páginas de Obrigado, VSL, Upsell) que a consistência visual e estratégica será mantida automaticamente.

---

## 🎨 Stack Tecnológica Base
- **Copywriting:** Frameworks AIDA / PAS.
- **Estilização:** Tailwind CSS.
- **Componentes:** Shadcn/UI (React).
- **Inteligência:** Google Gemini 3 Pro (via AI Studio).

---
*Mantido com ❤️ pela equipe ROI POSITIVO.*
