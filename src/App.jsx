import React, { useState, Component } from 'react';
import {
  ScrollProgress,
  Background,
  Navbar,
  MobileMenu,
  Footer,
  useSmoothScroll,
} from './components/Layout';
import { Hero } from './components/Hero';
import {
  Projects,
  CareerTimeline,
  Publications,
  Skills,
  Contact,
} from './components/Sections';
import CustomCursor from './components/CustomCursor';

class AppErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('AppErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-[#06080e] p-6 text-white text-center">
          <div className="h-12 w-12 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400 font-bold mb-4 font-mono">
            !
          </div>
          <h1 className="text-2xl font-bold font-sans">Something went wrong while rendering</h1>
          <p className="mt-2 max-w-md text-sm text-slate-400 font-sans">
            {this.state.error?.message || 'An unexpected rendering error occurred.'}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="mt-6 rounded-full bg-sky-500 px-6 py-2.5 text-sm font-semibold text-white hover:bg-sky-400 transition"
          >
            Reload Page
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  useSmoothScroll();

  return (
    <AppErrorBoundary>
      <div className="relative min-h-screen bg-[#06080e] text-slate-200 selection:bg-sky-500/25 selection:text-white font-sans antialiased">
        <CustomCursor />
        <ScrollProgress />
        <Background />
        <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
        {menuOpen && <MobileMenu close={() => setMenuOpen(false)} />}
        <main>
          <Hero />
          <Projects />
          <CareerTimeline />
          <Publications />
          <Skills />
          <Contact />
        </main>
        <Footer />
      </div>
    </AppErrorBoundary>
  );
}

export default App;
