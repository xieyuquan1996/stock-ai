import { useState } from 'react';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import PortfolioInput from './components/PortfolioInput';
import PortfolioDiagnosis from './components/PortfolioDiagnosis';
import RiskAlert from './components/RiskAlert';
import AIChat from './components/AIChat';
import ErrorBoundary from './components/ErrorBoundary';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Hero onNavigate={setCurrentPage} />;
      case 'portfolio-diagnosis':
        return <PortfolioInput />;
      case 'position-management':
        return <PortfolioDiagnosis />;
      case 'risk-alert':
        return <RiskAlert />;
      case 'ai-advisor':
        return <AIChat />;
      default:
        return <Hero onNavigate={setCurrentPage} />;
    }
  };

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-background">
        <Navigation currentPage={currentPage} onPageChange={setCurrentPage} />
        <div className="pt-20">
          {renderPage()}
        </div>
      </div>
    </ErrorBoundary>
  );
}

export default App;