'use client'

import { useState } from "react";
import { generateDesignSystem, generatePage } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Props {
    slug: string;
    step: 'design-system' | 'page-generation';
}

export function ClientDashboardActions({ slug, step }: Props) {
    const [isLoading, setIsLoading] = useState(false);
    const [pageType, setPageType] = useState("Página de Vendas (Sales Page)");
    const { toast } = useToast();

    async function handleGenerateDS() {
        setIsLoading(true);
        const result = await generateDesignSystem(slug);
        if (result.success) {
            toast({ title: "Design System Gerado!", description: "A página foi atualizada." });
        } else {
            toast({ title: "Erro", description: result.message, variant: "destructive" });
        }
        setIsLoading(false);
    }

    async function handleGeneratePage() {
        setIsLoading(true);
        const result = await generatePage(slug, pageType);
        if (result.success) {
            toast({ title: "Página Gerada!", description: `Arquivo ${result.filename} criado.` });
        } else {
            toast({ title: "Erro", description: result.message, variant: "destructive" });
        }
        setIsLoading(false);
    }

    if (step === 'design-system') {
        return (
            <div className="flex flex-col items-center justify-center h-[200px] border-2 border-dashed rounded-lg p-6 space-y-4">
                <p className="text-muted-foreground text-center">
                    O Design System traduz o DNA do cliente em componentes técnicos (React + Tailwind).
                </p>
                <Button onClick={handleGenerateDS} disabled={isLoading} className="w-full sm:w-auto">
                    {isLoading ? "Gerando..." : "Gerar Design System"}
                </Button>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="page-type">Tipo de Página</Label>
                <Select onValueChange={setPageType} defaultValue={pageType}>
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Selecione o tipo" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="Página de Vendas (Sales Page)">Página de Vendas</SelectItem>
                        <SelectItem value="Página de Captura (Opt-in)">Página de Captura</SelectItem>
                        <SelectItem value="Página de Obrigado (Thank You)">Página de Obrigado</SelectItem>
                        <SelectItem value="VSL (Video Sales Letter)">VSL</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <Button onClick={handleGeneratePage} disabled={isLoading} className="btn-cta w-full">
                {isLoading ? "Escrevendo Página..." : "Gerar Landing Page (Código + Copy)"}
            </Button>
        </div>
    );
}
