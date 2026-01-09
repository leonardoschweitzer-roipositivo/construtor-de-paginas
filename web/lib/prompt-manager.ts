import fs from 'fs/promises';
import path from 'path';

// Assumes 'web' directory is one level deep from root
const PROMPTS_DIR = path.resolve(process.cwd(), '../prompts');
const CORE_DIR = path.resolve(process.cwd(), '../core-tecnico');

export class PromptManager {

    static async getSystemPrompt(): Promise<string> {
        try {
            return await fs.readFile(path.join(PROMPTS_DIR, 'system-base.md'), 'utf-8');
        } catch (error) {
            console.error("Error reading system prompt:", error);
            throw new Error("Failed to load system prompt.");
        }
    }

    static async getConfigGeneratorPrompt(niche: string, audience: string, archetype: string, colors: string = ""): Promise<string> {
        const base = await fs.readFile(path.join(PROMPTS_DIR, 'gerador-de-config.md'), 'utf-8');
        return `${base}

## Input do Usuário (Novo Cliente):
- **Nicho:** ${niche}
- **Público-Alvo:** ${audience}
- **Arquétipo:** ${archetype}
- **Cores de Preferência:** ${colors || "Não informado"}
`;
    }

    static async getDesignSystemPrompt(clientConfigContent: string): Promise<string> {
        const baseLogger = await fs.readFile(path.join(PROMPTS_DIR, 'gerador-de-design-system.md'), 'utf-8');
        const shadcnPreset = await fs.readFile(path.join(CORE_DIR, 'shadcn-preset.json'), 'utf-8');
        const tailwindBase = await fs.readFile(path.join(CORE_DIR, 'tailwind-base.css'), 'utf-8');

        // The prompt expects placeholders to be context, lets provide them explicitly
        return `${baseLogger}

## CONTEXTO DO PROJETO (INPUTS):

### 1. DNA do Cliente (config.md):
\`\`\`markdown
${clientConfigContent}
\`\`\`

### 2. Preset de Componentes (shadcn-preset.json):
\`\`\`json
${shadcnPreset}
\`\`\`

### 3. Base de Estilização (tailwind-base.css):
\`\`\`css
${tailwindBase}
\`\`\`
`;
    }

    static async getPageGeneratorPrompt(clientConfig: string, designSystem: string, pageRequest: string): Promise<string> {
        const basePrompt = await fs.readFile(path.join(PROMPTS_DIR, 'gerar-lp-final.md'), 'utf-8');
        const shadcnPreset = await fs.readFile(path.join(CORE_DIR, 'shadcn-preset.json'), 'utf-8');
        const tailwindBase = await fs.readFile(path.join(CORE_DIR, 'tailwind-base.css'), 'utf-8');

        return `${basePrompt}

## CONTEXTO TÉCNICO E DE BRANDING:

### 1. DNA do Cliente:
\`\`\`markdown
${clientConfig}
\`\`\`

### 2. Design System do Cliente (design-system-page.md):
\`\`\`markdown
${designSystem}
\`\`\`

### 3. Core Técnico (Referência):
shadcn-preset.json:
\`\`\`json
${shadcnPreset}
\`\`\`
tailwind-base.css:
\`\`\`css
${tailwindBase}
\`\`\`

## PEDIDO DA PÁGINA (INPUT DO USUÁRIO):
${pageRequest}
`;
    }
}
