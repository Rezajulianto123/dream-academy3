import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Sparkles,
  Flame,
  User,
  ShieldCheck,
  Compass,
  Mic,
  BookOpen,
  LogOut,
  Layers,
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { currentView, setCurrentView, currentUser, loginAs, logout, setAuthModalOpen } = useApp();

  return (
    <header className="sticky top-0 z-40 bg-[#FDFCFB]/95 backdrop-blur-md border-b-2 border-[#1A1A1A] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        {/* Brand Logo */}
        <div className="flex items-center space-x-3">
          <button
            id="nav-brand-logo"
            onClick={() => setCurrentView(currentUser ? 'dashboard' : 'landing')}
            className="flex items-center space-x-2 text-left group cursor-pointer focus:outline-none"
          >
            <div className="text-2xl sm:text-3xl font-black tracking-tighter text-[#1A1A1A] select-none">
              DREAM ACADEMY<span className="text-[#FF5733]">.</span>
            </div>
          </button>
        </div>

        {/* Center Nav Links */}
        <nav className="hidden md:flex items-center space-x-2 lg:space-x-6 text-xs sm:text-sm font-bold uppercase tracking-wider text-[#1A1A1A]">
          <button
            id="nav-link-home"
            onClick={() => setCurrentView('landing')}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
              currentView === 'landing' ? 'bg-[#1A1A1A] text-white' : 'hover:opacity-60'
            }`}
          >
            Beranda
          </button>
          <button
            id="nav-link-assessment"
            onClick={() => setCurrentView('assessment')}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer flex items-center space-x-1.5 ${
              currentView === 'assessment' || currentView === 'assessment-result'
                ? 'bg-[#1A1A1A] text-white'
                : 'hover:opacity-60'
            }`}
          >
            <Compass className="w-4 h-4 text-[#FF5733]" />
            <span>Tes Kemampuan</span>
          </button>
          <button
            id="nav-link-dashboard"
            onClick={() => {
              if (currentUser) {
                setCurrentView('dashboard');
              } else {
                loginAs('student');
              }
            }}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer flex items-center space-x-1.5 ${
              currentView === 'dashboard' || currentView === 'lesson'
                ? 'bg-[#1A1A1A] text-white'
                : 'hover:opacity-60'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Dashboard</span>
          </button>
          <button
            id="nav-link-speaking"
            onClick={() => setCurrentView('speaking-studio')}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer flex items-center space-x-1.5 ${
              currentView === 'speaking-studio'
                ? 'bg-[#1A1A1A] text-white'
                : 'hover:opacity-60'
            }`}
          >
            <Mic className="w-4 h-4 text-[#FF5733]" />
            <span>Speaking Coach</span>
          </button>
          <button
            id="nav-link-pricing"
            onClick={() => setCurrentView('pricing')}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
              currentView === 'pricing' ? 'bg-[#1A1A1A] text-white' : 'hover:opacity-60'
            }`}
          >
            Harga
          </button>
          <button
            id="nav-link-admin"
            onClick={() => {
              if (currentUser?.role === 'admin') {
                setCurrentView('admin');
              } else {
                loginAs('admin');
              }
            }}
            className={`px-3 py-1.5 rounded-lg border-2 border-[#1A1A1A] transition-all cursor-pointer flex items-center space-x-1 ${
              currentView === 'admin'
                ? 'bg-[#1A1A1A] text-white'
                : 'hover:bg-[#1A1A1A] hover:text-white'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5 text-[#FF5733]" />
            <span>Admin</span>
          </button>
        </nav>

        {/* Right side controls */}
        <div className="flex items-center space-x-3">
          {/* Quick role switcher pill for testing */}
          <div className="hidden xl:flex items-center text-xs bg-[#F3F3F1] border-2 border-[#1A1A1A] rounded-full p-0.5 text-[#1A1A1A]">
            <span className="px-2 py-0.5 text-[10px] font-black uppercase text-[#4A4A4A] tracking-wider">Mode:</span>
            <button
              onClick={() => loginAs('guest')}
              className={`px-2.5 py-0.5 rounded-full font-bold text-xs transition-all cursor-pointer ${
                !currentUser ? 'bg-[#1A1A1A] text-white shadow-xs' : 'hover:opacity-60'
              }`}
            >
              Guest
            </button>
            <button
              onClick={() => loginAs('student')}
              className={`px-2.5 py-0.5 rounded-full font-bold text-xs transition-all cursor-pointer ${
                currentUser?.role === 'student' ? 'bg-[#FF5733] text-white shadow-xs' : 'hover:opacity-60'
              }`}
            >
              Siswa
            </button>
            <button
              onClick={() => loginAs('admin')}
              className={`px-2.5 py-0.5 rounded-full font-bold text-xs transition-all cursor-pointer ${
                currentUser?.role === 'admin' ? 'bg-[#1A1A1A] text-white shadow-xs' : 'hover:opacity-60'
              }`}
            >
              Admin
            </button>
          </div>

          {currentUser ? (
            <div className="flex items-center space-x-2 sm:space-x-3">
              {currentUser.role === 'student' && (
                <div className="flex items-center space-x-1.5 bg-[#FFF0EB] border border-[#FF5733] text-[#FF5733] px-3 py-1 rounded-full text-xs font-black">
                  <Flame className="w-3.5 h-3.5 fill-[#FF5733]" />
                  <span>{currentUser.learningStreak} HARI</span>
                </div>
              )}
              <div className="flex items-center space-x-2 pl-1">
                <div className="w-9 h-9 rounded-full border-2 border-[#1A1A1A] bg-[#1A1A1A] text-white flex items-center justify-center text-xs font-black">
                  {currentUser.name.charAt(0)}
                </div>
                <div className="hidden sm:block text-left">
                  <div className="text-xs font-black text-[#1A1A1A] leading-none truncate max-w-[110px]">
                    {currentUser.name}
                  </div>
                  <div className="text-[10px] font-bold text-[#FF5733] leading-tight uppercase">
                    {currentUser.role === 'admin' ? 'Administrator' : currentUser.estimatedLevel || 'Level A2'}
                  </div>
                </div>
              </div>
              <button
                id="btn-logout"
                onClick={logout}
                title="Keluar"
                className="p-2 border border-stone-300 hover:border-[#1A1A1A] text-[#1A1A1A] hover:bg-[#F3F3F1] rounded-lg transition-colors cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="flex items-center space-x-3">
              <button
                id="btn-login-modal"
                onClick={() => setAuthModalOpen(true)}
                className="text-xs sm:text-sm font-bold uppercase tracking-widest text-[#1A1A1A] hover:opacity-60 px-3 py-2 transition-opacity cursor-pointer"
              >
                Masuk
              </button>
              <button
                id="btn-start-free-assessment-nav"
                onClick={() => setCurrentView('assessment')}
                className="bg-[#FF5733] hover:bg-[#E84826] text-white px-5 py-2.5 rounded-xl font-black text-xs uppercase tracking-wider shadow-[3px_3px_0px_0px_#1A1A1A] hover:shadow-[1px_1px_0px_0px_#1A1A1A] hover:translate-x-0.5 hover:translate-y-0.5 transition-all cursor-pointer flex items-center space-x-1.5"
              >
                <span>Tes Gratis</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
