import { useMemo, useState } from 'react';
import { ScrollProgress, Spotlight, Background, Navbar, MobileMenu, Footer, useSmoothScroll, useCursorSpotlight } from './components/Layout';
import { Hero, ProofStrip } from './components/Hero';
import { Projects, Experience, Skills, Publications, RecruiterSnapshot, Contact } from './components/Sections';
import CustomCursor from './components/CustomCursor';
import { projects } from './data/portfolio';

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [filter, setFilter] = useState('Featured');

  const categories = useMemo(() => ['Featured', ...new Set(projects.map(p => p.category))], []);
  const visibleProjects = useMemo(() => {
    if (filter === 'Featured') return projects.filter(p => p.status === 'Featured');
    return projects.filter(p => p.category === filter);
  }, [filter]);

  useSmoothScroll();
  useCursorSpotlight();

  return (
    <main className="min-h-screen overflow-hidden bg-[#030014] text-slate-200">
      <CustomCursor />
      <ScrollProgress />
      <Spotlight />
      <Background />
      <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      {menuOpen && <MobileMenu close={() => setMenuOpen(false)} />}
      <Hero />
      <ProofStrip />
      <Projects categories={categories} filter={filter} setFilter={setFilter} visibleProjects={visibleProjects} />
      <Experience />
      <Skills />
      <Publications />
      <RecruiterSnapshot />
      <Contact />
      <Footer />
    </main>
  );
}

export default App;
