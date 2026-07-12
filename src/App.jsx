import React, { useState } from 'react';
import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header';
import DashboardPage from './pages/DashboardPage';
import EnvironmentalPage from './pages/EnvironmentalPage';
import SocialPage from './pages/SocialPage';
import GovernancePage from './pages/GovernancePage';
import GamificationPage from './pages/GamificationPage';
import { esgScores } from './data/mockData';

const PAGES = {
  dashboard:     DashboardPage,
  environmental: EnvironmentalPage,
  social:        SocialPage,
  governance:    GovernancePage,
  gamification:  GamificationPage,
};

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const Page = PAGES[activeTab] || DashboardPage;

  return (
    <div className="flex min-h-screen" style={{ background: '#f9fafb' }}>
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />

      <div className="flex-1 flex flex-col min-h-screen overflow-hidden">
        <Header activeTab={activeTab} overallScore={esgScores.overall} />

        <main className="flex-1 overflow-y-auto p-8">
          <Page />
        </main>
      </div>
    </div>
  );
}
