import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const usePortfolioStore = create(
  persist(
    (set, get) => ({
      // Portfolio Holdings
      holdings: [],
      totalValue: 0,
      totalProfit: 0,
      todayChange: 0,

      // Diagnosis Results
      healthScore: null,
      lastDiagnosis: null,
      diagnosisHistory: [],

      // Risk Alerts
      riskAlerts: [],
      riskLevel: 'medium',

      // User Preferences
      riskTolerance: 50,
      investmentGoals: [],
      
      // Actions
      setHoldings: (holdings) => {
        const totalValue = holdings.reduce((sum, holding) => {
          return sum + (holding.quantity * holding.currentPrice || 0);
        }, 0);
        
        const totalCost = holdings.reduce((sum, holding) => {
          return sum + (holding.quantity * holding.costPrice || 0);
        }, 0);
        
        const totalProfit = totalCost > 0 ? ((totalValue - totalCost) / totalCost) * 100 : 0;
        
        set({ 
          holdings, 
          totalValue, 
          totalProfit,
          todayChange: Math.random() * 4 - 2 // 模拟今日涨跌
        });
      },

      addHolding: (holding) => {
        const currentHoldings = get().holdings;
        const newHoldings = [...currentHoldings, { ...holding, id: Date.now() }];
        get().setHoldings(newHoldings);
      },

      updateHolding: (id, updates) => {
        const currentHoldings = get().holdings;
        const updatedHoldings = currentHoldings.map(holding =>
          holding.id === id ? { ...holding, ...updates } : holding
        );
        get().setHoldings(updatedHoldings);
      },

      removeHolding: (id) => {
        const currentHoldings = get().holdings;
        const filteredHoldings = currentHoldings.filter(holding => holding.id !== id);
        get().setHoldings(filteredHoldings);
      },

      setDiagnosis: (diagnosis) => {
        const currentHistory = get().diagnosisHistory;
        const newHistory = [
          { ...diagnosis, timestamp: new Date().toISOString() },
          ...currentHistory.slice(0, 9) // 保留最近10次诊断
        ];
        
        set({
          healthScore: diagnosis.healthScore,
          lastDiagnosis: diagnosis,
          diagnosisHistory: newHistory
        });
      },

      addRiskAlert: (alert) => {
        const currentAlerts = get().riskAlerts;
        const newAlert = { ...alert, id: Date.now(), timestamp: new Date().toISOString() };
        set({ riskAlerts: [newAlert, ...currentAlerts] });
      },

      removeRiskAlert: (id) => {
        const currentAlerts = get().riskAlerts;
        const filteredAlerts = currentAlerts.filter(alert => alert.id !== id);
        set({ riskAlerts: filteredAlerts });
      },

      setRiskTolerance: (tolerance) => set({ riskTolerance: tolerance }),

      setInvestmentGoals: (goals) => set({ investmentGoals: goals }),

      // Computed values
      getHoldingsBySymbol: (symbol) => {
        return get().holdings.filter(holding => holding.code === symbol);
      },

      getSectorAllocation: () => {
        const holdings = get().holdings;
        const sectorMap = new Map();
        
        holdings.forEach(holding => {
          const sector = holding.sector || '其他';
          const value = (holding.quantity || 0) * (holding.currentPrice || 0);
          sectorMap.set(sector, (sectorMap.get(sector) || 0) + value);
        });
        
        const totalValue = get().totalValue;
        const sectors = [];
        
        sectorMap.forEach((value, sector) => {
          sectors.push({
            sector,
            value,
            percentage: totalValue > 0 ? (value / totalValue) * 100 : 0
          });
        });
        
        return sectors.sort((a, b) => b.value - a.value);
      },

      getTopPerformers: (limit = 5) => {
        const holdings = get().holdings;
        return holdings
          .filter(holding => holding.costPrice && holding.currentPrice)
          .map(holding => ({
            ...holding,
            profitPercent: ((holding.currentPrice - holding.costPrice) / holding.costPrice) * 100
          }))
          .sort((a, b) => b.profitPercent - a.profitPercent)
          .slice(0, limit);
      },

      getWorstPerformers: (limit = 5) => {
        const holdings = get().holdings;
        return holdings
          .filter(holding => holding.costPrice && holding.currentPrice)
          .map(holding => ({
            ...holding,
            profitPercent: ((holding.currentPrice - holding.costPrice) / holding.costPrice) * 100
          }))
          .sort((a, b) => a.profitPercent - b.profitPercent)
          .slice(0, limit);
      },

      // Clear all data
      clearAll: () => set({
        holdings: [],
        totalValue: 0,
        totalProfit: 0,
        todayChange: 0,
        healthScore: null,
        lastDiagnosis: null,
        diagnosisHistory: [],
        riskAlerts: [],
        riskLevel: 'medium'
      })
    }),
    {
      name: 'portfolio-storage',
      partialize: (state) => ({
        holdings: state.holdings,
        diagnosisHistory: state.diagnosisHistory,
        riskTolerance: state.riskTolerance,
        investmentGoals: state.investmentGoals
      })
    }
  )
);

export default usePortfolioStore;