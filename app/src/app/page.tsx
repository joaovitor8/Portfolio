import Link from "next/link";
import { ArrowRight, Github, Linkedin, Rocket, Terminal } from "lucide-react";

export default function Home() {
  // Gerando estrelas aleatórias para o fundo (visual leve sem imagens pesadas)
  // Em um projeto real, isso pode ser movido para um componente separado "StarBackground"
  const stars = Array.from({ length: 50 }).map((_, i) => ({
    id: i,
    top: `${Math.floor(Math.random() * 100)}%`,
    left: `${Math.floor(Math.random() * 100)}%`,
    delay: `${Math.random() * 3}s`,
    size: Math.random() > 0.5 ? "w-1 h-1" : "w-0.5 h-0.5",
  }));

  return (
    <main className="min-h-screen flex flex-col relative overflow-hidden">
      
      {/* --- BACKGROUND DE ESTRELAS --- */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {stars.map((star) => (
          <div
            key={star.id}
            className={`absolute bg-white rounded-full opacity-70 animate-twinkle ${star.size}`}
            style={{
              top: star.top,
              left: star.left,
              animationDelay: star.delay,
            }}
          />
        ))}
        {/* Efeito de brilho central (Glow) */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-125 h-125 bg-nebula-primary/20 blur-[120px] rounded-full" />
      </div>

      {/* --- CONTEÚDO PRINCIPAL --- */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Badge "Disponível para trabalho" */}
        <div className="animate-float mb-6 glass-panel px-4 py-1.5 rounded-full flex items-center gap-2 text-highlight text-sm font-medium font-sans">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-highlight opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-highlight"></span>
          </span>
          Disponível para projetos & freelas
        </div>

        {/* Título Principal */}
        <h1 className="font-space font-bold text-5xl sm:text-7xl md:text-8xl tracking-tight mb-6">
          Explorando o <br />
          <span className="text-transparent bg-clip-text bg-linear-to-r from-nebula-secondary via-white to-nebula-primary">
            Universo Digital
          </span>
        </h1>

        {/* Subtítulo / Bio Curta */}
        <p className="font-sans text-starlight/80 text-lg sm:text-xl max-w-2xl mb-10 leading-relaxed">
          Olá, sou <strong className="text-white">João Vitor</strong>. Estudante de Ciência da Computação 
          e Desenvolvedor Full Stack apaixonado por criar soluções de outro mundo.
        </p>

        {/* Botões de Ação (CTA) */}
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <Link 
            href="/projetos" 
            className="group relative px-8 py-3 bg-nebula-primary hover:bg-nebula-primary/90 text-white font-bold rounded-lg transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(139,92,246,0.5)] hover:shadow-[0_0_30px_rgba(139,92,246,0.7)]"
          >
            <Rocket className="w-5 h-5 group-hover:-translate-y-1 transition-transform" />
            Ver Projetos
          </Link>
          
          <Link 
            href="/contato" 
            className="px-8 py-3 glass-panel hover:bg-white/10 text-white font-medium rounded-lg transition-all flex items-center justify-center gap-2 border border-white/10 hover:border-highlight/50"
          >
            Entre em Contato
          </Link>
        </div>

        {/* Links Sociais (Ícones) */}
        <div className="mt-12 flex items-center gap-6 text-starlight/60">
          <a href="https://github.com/joaovitor8" target="_blank" className="hover:text-white hover:scale-110 transition-all">
            <Github className="w-8 h-8" />
          </a>
          <a href="#" target="_blank" className="hover:text-nebula-secondary hover:scale-110 transition-all">
            <Linkedin className="w-8 h-8" />
          </a>
          <a href="#" className="hover:text-highlight hover:scale-110 transition-all">
            <Terminal className="w-8 h-8" />
          </a>
        </div>
      </div>
    </main>
  );
}
