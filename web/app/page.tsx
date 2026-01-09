import { ClientForm } from "@/components/client-form";

export default function Home() {
  return (
    <main className="lp-container min-h-screen py-12 flex flex-col items-center justify-center space-y-8 bg-slate-50/50">
      <div className="text-center space-y-4 animate-reveal">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl text-primary">
          ROI POSITIVO
        </h1>
        <p className="text-xl text-muted-foreground">
          Construtor de Páginas IA - Workflow Automatizado
        </p>
      </div>

      <div className="w-full animate-reveal" style={{ animationDelay: '0.2s' }}>
        <ClientForm />
      </div>

      <footer className="text-sm text-muted-foreground mt-8">
        Sistema v1.0 • Powered by Gemini AI
      </footer>
    </main>
  );
}
