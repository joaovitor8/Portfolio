"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, Linkedin, Mail, Code, User, Send, Rocket } from "lucide-react";

// --- CONFIGURAÇÃO DAS ANIMAÇÕES (EFEITO HIPERESPAÇO) ---
const pageVariants = {
  initial: { opacity: 0, scale: 0.8, filter: "blur(10px)" },
  in: { opacity: 1, scale: 1, filter: "blur(0px)" },
  out: { opacity: 0, scale: 1.5, filter: "blur(20px)" }
};

const pageTransition = {
  type: "tween",
  ease: "anticipate",
  duration: 0.8
} as const;

export default function Portfolio() {
  const [activeTab, setActiveTab] = useState("home");
  
  const [repos, setRepos] = useState<any[]>([]); 
  const [loadingRepos, setLoadingRepos] = useState(false);
  
  const [stars, setStars] = useState<any[]>([]);

  const projetosDestaque = ["Universe", "ControleFinanceiro"]; 

  useEffect(() => {
    const starData = [...Array(40)].map((_, i) => ({
      id: i,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      width: `${Math.random() * 3}px`,
      height: `${Math.random() * 3}px`,
      opacity: Math.random(),
      animationDuration: `${Math.random() * 3 + 2}s`
    }));
    setStars(starData);
  }, []);

  useEffect(() => {
    if (activeTab === "projetos" && repos.length === 0) {
      setLoadingRepos(true);
      
      fetch("https://api.github.com/users/joaovitor8/repos")
        .then((res) => res.json())
        .then((data) => {
          if (Array.isArray(data)) {
            const projetosFiltrados = data.filter((repo: any) => 
              projetosDestaque.includes(repo.name)
            );
            setRepos(projetosFiltrados);
          }
        })
        .catch((err) => console.error("Erro ao buscar do GitHub:", err))
        .finally(() => setLoadingRepos(false));
    }
  }, [activeTab, repos.length]); 

  return (
    <main className="h-screen w-screen relative overflow-hidden bg-space-900 text-white flex flex-col items-center justify-center">
      
      {/* --- BACKGROUND ESTÁTICO --- */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-stops))] from-slate-900 via-space-900 to-black"></div>

        {stars.map((star) => (
          <div
            key={star.id}
            className="absolute bg-white rounded-full animate-pulse"
            style={{
              top: star.top,
              left: star.left,
              width: star.width,
              height: star.height,
              opacity: star.opacity,
              animationDuration: star.animationDuration
            }}
          />
        ))}
      </div>

      {/* --- MENU DE NAVEGAÇÃO --- */}
      <nav className="fixed top-8 z-50 bg-white/5 backdrop-blur-md border border-white/10 px-2 py-2 rounded-full flex gap-2">
        <NavButton active={activeTab === "home"} onClick={() => setActiveTab("home")} icon={<User size={18} />} label="Base" />
        <NavButton active={activeTab === "projetos"} onClick={() => setActiveTab("projetos")} icon={<Code size={18} />} label="Missões" />
        <NavButton active={activeTab === "contato"} onClick={() => setActiveTab("contato")} icon={<Send size={18} />} label="Sinal" />
      </nav>

      {/* --- ÁREA DE CONTEÚDO --- */}
      <div className="z-10 w-full max-w-5xl px-6">
        <AnimatePresence mode="wait">
          
          {/* TELA 1: HOME */}
          {activeTab === "home" && (
            <motion.div
              key="home"
              initial="initial"
              animate="in"
              exit="out"
              variants={pageVariants}
              transition={pageTransition}
              className="text-center flex flex-col items-center"
            >
              <div className="mb-6 relative">
                <div className="absolute -inset-4 bg-purple-500/30 blur-xl rounded-full"></div>
                <Rocket size={64} className="relative text-purple-400" />
              </div>
              <h1 className="text-5xl md:text-7xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-cyan-400">
                João Vitor
              </h1>
              <h2 className="text-xl text-gray-400 mb-8 max-w-lg">
                Desenvolvedor Full Stack & Estudante de Ciência da Computação.
                Transformando ideias em código estelar.
              </h2>
              <button 
                onClick={() => setActiveTab("projetos")}
                className="px-8 py-3 bg-purple-600 hover:bg-purple-500 text-white rounded-lg font-medium transition-all shadow-[0_0_20px_rgba(147,51,234,0.5)]"
              >
                Iniciar Exploração
              </button>
            </motion.div>
          )}

          {/* TELA 2: PROJETOS */}
          {activeTab === "projetos" && (
            <motion.div
              key="projetos"
              initial="initial"
              animate="in"
              exit="out"
              variants={pageVariants}
              transition={pageTransition}
              className="w-full"
            >
              <h2 className="text-3xl font-bold text-center mb-10 text-white">Log de Projetos</h2>
              
              {loadingRepos ? (
                <div className="flex justify-center items-center h-40">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {repos.length > 0 ? (
                    repos.map((repo: any) => (
                      <div key={repo.id} className="bg-white/5 border border-white/10 p-6 rounded-2xl hover:bg-white/10 transition-colors group flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-start mb-4">
                            <h3 className="text-xl font-bold text-cyan-300 capitalize">
                              {repo.name.replace(/-/g, ' ')}
                            </h3>
                            <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                              <Github className="text-gray-500 group-hover:text-white transition-colors cursor-pointer" />
                            </a>
                          </div>
                          
                          <p className="text-gray-400 text-sm mb-6">
                            {repo.description || "Projeto exploratório focado em desenvolvimento de software e novas tecnologias."}
                          </p>
                        </div>

                        <div className="flex gap-2">
                          {repo.language && (
                            <Badge>{repo.language}</Badge>
                          )}
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-center text-gray-400 col-span-2">Nenhuma missão encontrada nos registros.</p>
                  )}
                </div>
              )}
            </motion.div>
          )}

          {/* TELA 3: CONTATO */}
          {activeTab === "contato" && (
            <motion.div
              key="contato"
              initial="initial"
              animate="in"
              exit="out"
              variants={pageVariants}
              transition={pageTransition}
              className="flex flex-col items-center text-center"
            >
              <div className="p-4 bg-white/5 rounded-full mb-6 border border-white/10">
                <Mail size={40} className="text-cyan-400" />
              </div>
              <h2 className="text-3xl font-bold mb-4">Estabelecer Conexão</h2>
              <p className="text-gray-400 max-w-md mb-8">
                Estou disponível para projetos freelance e oportunidades de carreira.
              </p>
              
              <div className="flex gap-4">
                <a href="https://github.com/joaovitor8" target="_blank" className="flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-all">
                  <Github size={20} /> GitHub
                </a>
                <a href="https://www.linkedin.com/in/joaovitorezequiel/" target="_blank" className="flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-all">
                  <Linkedin size={20} /> LinkedIn
                </a>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </main>
  );
}

// --- COMPONENTES AUXILIARES ---

interface NavButtonProps {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}

function NavButton({ active, onClick, icon, label }: NavButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`
        flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300
        ${active 
          ? "bg-purple-600 text-white shadow-[0_0_15px_rgba(147,51,234,0.5)]" 
          : "text-gray-400 hover:text-white hover:bg-white/5"
        }
      `}
    >
      {icon}
      <span className={`${active ? "inline-block" : "hidden md:inline-block"}`}>{label}</span>
    </button>
  );
}

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="px-2 py-1 rounded bg-white/5 border border-white/5 text-xs text-gray-300">
      {children}
    </span>
  );
}
