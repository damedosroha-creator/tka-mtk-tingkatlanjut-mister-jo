import React, { useState } from 'react';
import {
  LayoutDashboard,
  Map,
  BookOpen,
  HelpCircle,
  Award,
  Menu,
  X,
  Compass,
} from 'lucide-react';

export type ViewType = 'home' | 'map' | 'practice' | 'guide' | 'results';

interface NavbarProps {
  currentView: ViewType;
  onNavigate: (view: ViewType) => void;
  completedCount: number;
  totalCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onNavigate,
  completedCount,
  totalCount,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home' as ViewType, label: 'Dashboard', icon: LayoutDashboard },
    { id: 'map' as ViewType, label: 'Peta Materi', icon: Map },
    { id: 'practice' as ViewType, label: 'Latihan Soal', icon: BookOpen },
    { id: 'guide' as ViewType, label: 'Petunjuk', icon: HelpCircle },
    { id: 'results' as ViewType, label: 'Hasil Belajar', icon: Award },
  ];

  const handleNavClick = (view: ViewType) => {
    onNavigate(view);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-teal-800/40 bg-teal-900/95 text-white shadow-lg backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        {/* Brand / Logo */}
        <div
          onClick={() => handleNavClick('home')}
          className="flex cursor-pointer items-center gap-3 group transition"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600 text-teal-950 font-black shadow-md border border-amber-300">
            <Compass className="h-6 w-6 text-teal-950" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold tracking-tight text-white sm:text-lg">
                TKA MATEMATIKA
              </span>
              <span className="rounded bg-teal-700/80 px-1.5 py-0.5 text-[10px] font-bold text-amber-300 border border-teal-600">
                2026
              </span>
            </div>
            <div className="text-[11px] font-semibold text-teal-200 tracking-wider flex items-center gap-1.5">
              <span>TINGKAT LANJUT</span>
              <span className="text-amber-400 font-bold">•</span>
              <span className="text-amber-300 font-bold">MISTER JO</span>
            </div>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`flex items-center gap-2 rounded-xl px-3.5 py-2 text-xs font-semibold transition ${
                  isActive
                    ? 'bg-amber-400 text-teal-950 shadow-sm'
                    : 'text-teal-100 hover:bg-teal-800/70 hover:text-white'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{item.label}</span>
                {item.id === 'practice' && (
                  <span
                    className={`ml-1 rounded-full px-1.5 py-0.2 text-[10px] font-bold ${
                      isActive ? 'bg-teal-950 text-amber-300' : 'bg-teal-800 text-teal-200'
                    }`}
                  >
                    {completedCount}/{totalCount}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Mobile Hamburger Button */}
        <div className="flex md:hidden items-center gap-2">
          <div className="text-xs font-bold text-amber-300 bg-teal-800/80 px-2 py-1 rounded-lg border border-teal-700">
            {completedCount}/{totalCount} Soal
          </div>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-800 text-teal-100 hover:text-white"
            aria-label="Buka Menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="border-t border-teal-800 bg-teal-950/98 px-4 py-3 md:hidden">
          <div className="flex flex-col gap-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center justify-between rounded-xl px-4 py-2.5 text-sm font-semibold transition ${
                    isActive
                      ? 'bg-amber-400 text-teal-950 font-bold'
                      : 'text-teal-100 hover:bg-teal-900'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="h-4 w-4" />
                    <span>{item.label}</span>
                  </div>
                  {item.id === 'practice' && (
                    <span className="rounded-full bg-teal-800 px-2 py-0.5 text-xs text-amber-300">
                      {completedCount} / {totalCount}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
