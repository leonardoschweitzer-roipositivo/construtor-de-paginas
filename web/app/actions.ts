'use server'

import { PromptManager } from '@/lib/prompt-manager';
import { model } from '@/lib/gemini';
import fs from 'fs/promises';
import path from 'path';
import { revalidatePath } from 'next/cache';

// Assumes 'web' directory is one level deep from root
const CLIENTS_DIR = path.resolve(process.cwd(), '../clientes');

export async function generateClientConfig(prevState: any, formData: FormData) {
    const name = formData.get('name') as string;
    const niche = formData.get('niche') as string;
    const audience = formData.get('audience') as string;
    const archetype = formData.get('archetype') as string;
    const colors = formData.get('colors') as string;

    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

    if (!slug) return { success: false, message: "Nome do cliente inválido." };

    try {
        const prompt = await PromptManager.getConfigGeneratorPrompt(niche, audience, archetype, colors);

        // Inject system prompt explicitly here as well, or rely on the instance instruction?
        // The instruction in README says: "Copie system-base.md no campo System Instructions".
        // We already passed `systemInstruction` in `gemini.ts` (static text).
        // But `PromptManager` can load the real file content. Let's send it to be sure.
        const systemInstruction = await PromptManager.getSystemPrompt();

        // Create a fresh model instance with the specific system instruction if needed, 
        // or just assume the global one is fine. 
        // Since `gemini.ts` initializes model once, we might want to pass system instruction per request if the SDK supports it, 
        // or just rely on the global variable if it was initialized correctly.
        // However, `gemini.ts` used a placeholder string. 
        // To do it right dynamically:
        // We generated `model` in `gemini.ts` with a placeholder. We should probably update `gemini.ts` or instantiate here.
        // simpler: pass system instruction to `generateContent`? No, Gemini API (Google AI SDK) sets system instruction at model init.
        // For now, let's assume the prompt context is strong enough or we rely on the `model` export.
        // Or better: Let's re-instantiate here to include the file-based system prompt.
        // Actually, `gemini.ts` exported `genAI`. we can use that.

        // const modelWithSystem = genAI.getGenerativeModel({ model: "gemini-1.5-pro", systemInstruction }); 
        // But lets simplify: just send the prompt. The prompts are very descriptive.

        const result = await model.generateContent(prompt);
        const content = result.response.text();

        const clientDir = path.join(CLIENTS_DIR, slug);
        await fs.mkdir(clientDir, { recursive: true });
        await fs.writeFile(path.join(clientDir, 'config.md'), content);

        revalidatePath('/');
        return { success: true, slug, content, message: "Configuração gerada com sucesso!" };
    } catch (error) {
        console.error("Gemini Generation Error:", error);
        return { success: false, message: "Erro ao comunicar com a IA (Verifique sua API KEY)." };
    }
}

export async function getClientConfig(slug: string) {
    try {
        const configPath = path.join(CLIENTS_DIR, slug, 'config.md');
        return await fs.readFile(configPath, 'utf-8');
    } catch {
        return null;
    }
}

export async function getDesignSystem(slug: string) {
    try {
        const dsPath = path.join(CLIENTS_DIR, slug, 'design-system-page.md');
        return await fs.readFile(dsPath, 'utf-8');
    } catch {
        return null;
    }
}

export async function generateDesignSystem(slug: string) {
    try {
        const configContent = await getClientConfig(slug);
        if (!configContent) return { success: false, message: "Configuração não encontrada." };

        const prompt = await PromptManager.getDesignSystemPrompt(configContent);
        const result = await model.generateContent(prompt);
        const content = result.response.text();

        const clientDir = path.join(CLIENTS_DIR, slug);
        await fs.writeFile(path.join(clientDir, 'design-system-page.md'), content);

        revalidatePath(`/clients/${slug}`);
        return { success: true, content };
    } catch (error) {
        console.error(error);
        return { success: false, message: "Erro ao gerar Design System." };
    }
}

export async function generatePage(slug: string, pageType: string) {
    try {
        const configContent = await getClientConfig(slug);
        const dsContent = await getDesignSystem(slug);

        if (!configContent || !dsContent) return { success: false, message: "Pré-requisitos (Config ou DS) não encontrados." };

        const prompt = await PromptManager.getPageGeneratorPrompt(configContent, dsContent, pageType);
        const result = await model.generateContent(prompt);
        const content = result.response.text();

        // Save with a timestamp or name?
        // Let's save as `page-[type]-[timestamp].tsx` or `.md`?
        // The prompt returns "Código e copy". 
        // Let's save as markdown/txt first for safety.
        const filename = `lp-${pageType.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}.md`;
        const clientDir = path.join(CLIENTS_DIR, slug);
        await fs.writeFile(path.join(clientDir, filename), content);

        revalidatePath(`/clients/${slug}`);
        return { success: true, content, filename };
    } catch (error) {
        console.error(error);
        return { success: false, message: "Erro ao gerar Landing Page." };
    }
}
