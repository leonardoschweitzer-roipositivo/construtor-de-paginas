import { getClientConfig, getDesignSystem, generateDesignSystem, generatePage } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ClientDashboardActions } from "@/components/client-dashboard-actions";

interface Props {
    params: { slug: string };
    searchParams: Record<string, string | string[] | undefined>;
}

// Next.js 15 requires awaiting params
export default async function ClientPage(props: Props) {
    const params = await props.params;
    const slug = params.slug;
    const configContent = await getClientConfig(slug);
    const dsContent = await getDesignSystem(slug);

    if (!configContent) {
        return (
            <div className="flex h-screen items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold">Cliente não encontrado</h1>
                    <Link href="/" className="text-primary hover:underline">Voltar para Home</Link>
                </div>
            </div>
        );
    }

    return (
        <main className="lp-container min-h-screen py-8 space-y-8 bg-slate-50/50">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight capitalize text-primary">
                        {slug.replace(/-/g, ' ')}
                    </h1>
                    <p className="text-muted-foreground">Dashboard do Cliente</p>
                </div>
                <Link href="/">
                    <Button variant="outline">Voltar</Button>
                </Link>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Step 1 & 2: DNA / Config */}
                <Card className="glass-effect">
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <CardTitle>1. DNA do Cliente (Config)</CardTitle>
                            <Badge variant="outline" className="bg-green-100 text-green-800">Gerado</Badge>
                        </div>
                        <CardDescription>Definições de marca, cores e arquétipo.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ScrollArea className="h-[300px] w-full rounded-md border p-4 bg-muted/50 text-sm font-mono">
                            <pre>{configContent}</pre>
                        </ScrollArea>
                    </CardContent>
                </Card>

                {/* Step 3: Design System */}
                <Card className="glass-effect">
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <CardTitle>2. Design System</CardTitle>
                            {dsContent ? (
                                <Badge variant="outline" className="bg-green-100 text-green-800">Gerado</Badge>
                            ) : (
                                <Badge variant="outline" className="bg-yellow-100 text-yellow-800">Pendente</Badge>
                            )}
                        </div>
                        <CardDescription>Estrutura visual e componentes base.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {dsContent ? (
                            <ScrollArea className="h-[300px] w-full rounded-md border p-4 bg-muted/50 text-sm font-mono">
                                <pre>{dsContent}</pre>
                            </ScrollArea>
                        ) : (
                            <ClientDashboardActions step="design-system" slug={slug} />
                        )}
                    </CardContent>
                </Card>
            </div>

            {/* Step 4: Page Generation */}
            {dsContent && (
                <Card className="glass-effect border-primary/20">
                    <CardHeader>
                        <CardTitle>3. Gerar Landing Page</CardTitle>
                        <CardDescription>Crie páginas de alta conversão baseadas no DNA + Design System.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ClientDashboardActions step="page-generation" slug={slug} />
                    </CardContent>
                </Card>
            )}
        </main>
    );
}
