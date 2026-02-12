"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Code, User, Send } from "lucide-react";
import Link from "next/link";

// --- CONFIGURAÇÃO DAS ANIMAÇÕES ---
const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const staggerContainer = {
  visible: { transition: { staggerChildren: 0.2 } }
};

export default function Portfolio() {
  return (
    // Container Principal com Scroll Snap
    <main className="h-screen w-full overflow-y-scroll snap-y snap-mandatory no-scrollbar scroll-smooth relative bg-space-900">
      
      {/* --- BACKGROUND FIXO (ESTRELAS) --- */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        {/* Estrelas geradas dinamicamente */}
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-white rounded-full"
            initial={{ opacity: 0.1, scale: 0.5 }}
            animate={{ opacity: [0.2, 1, 0.2], scale: [1, 1.5, 1] }}
            transition={{ duration: Math.random() * 3 + 2, repeat: Infinity }}
            style={{
              width: Math.random() * 3 + 'px',
              height: Math.random() * 3 + 'px',
              top: Math.random() * 100 + '%',
              left: Math.random() * 100 + '%',
            }}
          />
        ))}
        {/* Brilho Roxo de Fundo (Nebulosa) */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-900/20 blur-[120px] rounded-full" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-900/20 blur-[120px] rounded-full" />
      </div>

      {/* --- MENU DE NAVEGAÇÃO FLUTUANTE --- */}
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 bg-white/5 backdrop-blur-md border border-white/10 px-6 py-3 rounded-full flex gap-8">
        <NavLink href="#home" icon={<User size={20} />} label="Início" />
        <NavLink href="#projetos" icon={<Code size={20} />} label="Projetos" />
        <NavLink href="#contato" icon={<Send size={20} />} label="Contato" />
      </nav>

      {/* --- SESSÃO 1: HOME --- */}
      <section id="home" className="h-screen w-full snap-start flex items-center justify-center relative z-10 p-6">
        <motion.div 
          initial="hidden" 
          whileInView="visible" 
          viewport={{ once: false }} // Anima toda vez que entra na tela
          variants={staggerContainer}
          className="text-center max-w-4xl"
        >
          <motion.p variants={fadeInUp} className="text-cyan-400 font-medium mb-4 tracking-widest uppercase text-sm">
            Bem-vindo ao meu universo
          </motion.p>
          <motion.h1 variants={fadeInUp} className="text-5xl md:text-7xl font-bold mb-6 text-white bg-clip-text text-transparent bg-linear-to-r from-purple-400 to-cyan-400">
            João Vitor
          </motion.h1>
          <motion.p variants={fadeInUp} className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Desenvolvedor Full Stack & Explorador de Dados. <br/>
            Construindo soluções robustas com <span className="text-white font-mono">Next.js</span> e <span className="text-white font-mono">Astronomia</span>.
          </motion.p>
        </motion.div>
      </section>

      {/* --- SESSÃO 2: PROJETOS --- */}
      <section id="projetos" className="h-screen w-full snap-start flex flex-col items-center justify-center relative z-10 p-6 bg-black/20">
        <motion.div 
          initial="hidden" 
          whileInView="visible" 
          viewport={{ once: false }}
          variants={staggerContainer}
          className="max-w-6xl w-full"
        >
          <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold mb-12 text-center text-white">
            Missões Recentes
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* CARD DO PROJETO UNIVERSE - SEU DESTAQUE */}
            <motion.div variants={fadeInUp} className="group relative bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 hover:-translate-y-2">
              <div className="absolute top-4 right-4 bg-purple-500/20 text-purple-300 px-3 py-1 rounded-full text-xs font-mono border border-purple-500/30">
                EM DESENVOLVIMENTO
              </div>
              <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                Project Universe
              </h3>
              <p className="text-gray-400 mb-6 text-sm">
                Uma aplicação Full-stack ambiciosa. Aprimorando habilidades de desenvolvimento com foco em escalabilidade e design moderno.
              </p>
              <div className="flex gap-2 mb-6">
                <TechBadge name="Next.js" />
                <TechBadge name="TypeScript" />
                <TechBadge name="Node" />
              </div>
              <a href="https://github.com/joaovitor8/universe" target="_blank" className="inline-flex items-center text-sm font-medium text-white hover:text-cyan-400 gap-2">
                Ver Código na Base <Github size={16} />
              </a>
            </motion.div>

            {/* CARD SECUNDÁRIO (Exemplo: Data Science) */}
            <motion.div variants={fadeInUp} className="group relative bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 hover:-translate-y-2">
               <div className="absolute top-4 right-4 bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full text-xs font-mono border border-blue-500/30">
                EM BREVE
              </div>
              <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                Análise de Dados Estelar
              </h3>
              <p className="text-gray-400 mb-6 text-sm">
                Projeto focado em Ciência de Dados, analisando padrões complexos para portfólio.
              </p>
              <div className="flex gap-2 mb-6">
                <TechBadge name="Python" />
                <TechBadge name="Pandas" />
                <TechBadge name="AI" />
              </div>
              <span className="inline-flex items-center text-sm font-medium text-gray-500 cursor-not-allowed gap-2">
                Aguardando lançamento... <Code size={16} />
              </span>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* --- SESSÃO 3: CONTATO --- */}
      <section id="contato" className="h-screen w-full snap-start flex items-center justify-center relative z-10 p-6">
        <motion.div 
          initial="hidden" 
          whileInView="visible" 
          viewport={{ once: false }}
          variants={staggerContainer}
          className="text-center bg-white/5 backdrop-blur-lg p-10 rounded-3xl border border-white/10 max-w-lg w-full"
        >
          <motion.div variants={fadeInUp} className="mb-6 mx-auto bg-linear-to-br from-purple-500 to-cyan-500 w-16 h-16 rounded-full flex items-center justify-center shadow-lg shadow-purple-500/30">
            <Mail className="text-white" size={32} />
          </motion.div>
          
          <motion.h2 variants={fadeInUp} className="text-3xl font-bold text-white mb-4">
            Vamos conversar?
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-gray-400 mb-8">
            Estou disponível para novas oportunidades. <br/>Mande um sinal e eu respondo na velocidade da luz.
          </motion.p>

          <motion.div variants={fadeInUp} className="flex justify-center gap-6">
            <SocialLink href="https://github.com/joaovitor8" icon={<Github size={24} />} />
            <SocialLink href="https://linkedin.com" icon={<Linkedin size={24} />} />
            <SocialLink href="mailto:seuemail@email.com" icon={<Mail size={24} />} />
          </motion.div>
        </motion.div>
      </section>

    </main>
  );
}

// --- COMPONENTES MENORES PARA ORGANIZAÇÃO ---

function NavLink({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
  return (
    <Link href={href} className="group flex flex-col items-center gap-1 text-gray-400 hover:text-cyan-400 transition-colors">
      <div className="group-hover:-translate-y-1 transition-transform duration-300">
        {icon}
      </div>
      <span className="text-[10px] uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity absolute -bottom-5">
        {label}
      </span>
    </Link>
  );
}

function TechBadge({ name }: { name: string }) {
  return (
    <span className="px-3 py-1 bg-white/5 rounded text-xs text-gray-300 border border-white/5">
      {name}
    </span>
  );
}

function SocialLink({ href, icon }: { href: string; icon: React.ReactNode }) {
  return (
    <a href={href} target="_blank" className="p-3 bg-white/5 rounded-full hover:bg-white/10 hover:text-cyan-400 hover:scale-110 transition-all border border-white/5">
      {icon}
    </a>
  );
}
