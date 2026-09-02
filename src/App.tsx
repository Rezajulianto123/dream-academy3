import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { LandingPage } from './components/landing/LandingPage';
import { AssessmentView } from './components/assessment/AssessmentView';
import { AssessmentResultView } from './components/assessment/AssessmentResultView';
import { OnboardingView } from './components/onboarding/OnboardingView';
import { StudentDashboard } from './components/dashboard/StudentDashboard';
import { LessonPage } from './components/lesson/LessonPage';
import { SpeakingStudio } from './components/speaking/SpeakingStudio';
import { PricingView } from './components/pricing/PricingView';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { AuthModal } from './components/auth/AuthModal';

const AppContent: React.FC = () => {
  const { currentView } = useApp();

  return (
    <div className="min-h-screen flex flex-col bg-[#FDFCFB] text-[#1A1A1A] font-['Plus_Jakarta_Sans',sans-serif] selection:bg-[#FF5733]/25 selection:text-[#1A1A1A]">
      <Navbar />

      <main className="flex-1">
        {currentView === 'landing' && <LandingPage />}
        {currentView === 'assessment' && <AssessmentView />}
        {currentView === 'assessment-result' && <AssessmentResultView />}
        {currentView === 'onboarding' && <OnboardingView />}
        {currentView === 'dashboard' && <StudentDashboard />}
        {currentView === 'lesson' && <LessonPage />}
        {currentView === 'speaking-studio' && <SpeakingStudio />}
        {currentView === 'pricing' && <PricingView />}
        {currentView === 'admin' && <AdminDashboard />}
      </main>

      <Footer />
      <AuthModal />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
