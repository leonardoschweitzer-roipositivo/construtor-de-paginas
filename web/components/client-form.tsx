'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { generateClientConfig } from '@/app/actions'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { useToast } from '@/hooks/use-toast'

export function ClientForm() {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const { toast } = useToast();

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setIsLoading(true);
        const formData = new FormData(event.currentTarget);

        const result = await generateClientConfig(null, formData);

        if (result.success) {
            toast({
                title: "Sucesso!",
                description: `Cliente ${result.slug} configurado. Redirecionando...`,
            });
            router.push(`/clients/${result.slug}`); // Added router push
        } else {
            toast({
                title: "Erro",
                description: result.message,
                variant: "destructive"
            });
        }
        setIsLoading(false);
    }

    return (
        <Card className="w-full max-w-2xl mx-auto glass-effect">
            <CardHeader>
                <CardTitle>Novo Cliente (Passo 1)</CardTitle>
                <CardDescription>Defina o DNA da marca para iniciar a geração.</CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Nome do Cliente</Label>
                            <Input id="name" name="name" placeholder="Ex: Dra. Ana Silva" required />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="niche">Nicho de Atuação</Label>
                            <Input id="niche" name="niche" placeholder="Ex: Odontologia Estética" required />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="audience">Público-Alvo</Label>
                        <Input id="audience" name="audience" placeholder="Ex: Mulheres classe A/B, 30-50 anos" required />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="archetype">Arquétipo / Tom de Voz</Label>
                        <Input id="archetype" name="archetype" placeholder="Ex: O Cuidador, Sofisticado, Acolhedor" required />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="colors">Paleta de Cores (Opcional)</Label>
                        <Input id="colors" name="colors" placeholder="Ex: Azul Royal e Dourado" />
                    </div>
                </CardContent>
                <CardFooter>
                    <Button type="submit" className="w-full btn-cta" disabled={isLoading}>
                        {isLoading ? "Gerando DNA..." : "Gerar Configuração (IA)"}
                    </Button>
                </CardFooter>
            </form>
        </Card>
    )
}
