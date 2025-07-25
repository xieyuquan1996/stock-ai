import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Clock, Building2, Sparkles, TrendingUp, Shield, Target } from 'lucide-react';
import GlowCard from './GlowCard';
import StepIndicator from './StepIndicator';
import RiskSlider from './RiskSlider';
import AIThinking from './AIThinking';
import AnimatedNumber from './AnimatedNumber';

const StockRecommendation = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    riskTolerance: 50,
    investmentPeriod: 'medium',
    preferredSectors: [],
    investmentAmount: 10000
  });
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [recommendations, setRecommendations] = useState([]);

  const steps = [
    {
      id: 'risk',
      title: '风险偏好',
      description: '选择您的风险承受能力'
    },
    {
      id: 'period',
      title: '投资期限',
      description: '确定投资时间范围'
    },
    {
      id: 'sectors',
      title: '行业偏好',
      description: '选择感兴趣的行业'
    },
    {
      id: 'analysis',
      title: 'AI 分析',
      description: '生成个性化推荐'
    }
  ];

  const investmentPeriods = [
    { id: 'short', label: '短期', description: '3-12个月', icon: Clock },
    { id: 'medium', label: '中期', description: '1-3年', icon: Target },
    { id: 'long', label: '长期', description: '3年以上', icon: TrendingUp }
  ];

  const sectors = [
    { id: 'tech', label: '科技', color: 'from-blue-500/20 to-blue-600/10' },
    { id: 'finance', label: '金融', color: 'from-green-500/20 to-green-600/10' },
    { id: 'healthcare', label: '医疗', color: 'from-red-500/20 to-red-600/10' },
    { id: 'consumer', label: '消费', color: 'from-purple-500/20 to-purple-600/10' },
    { id: 'energy', label: '能源', color: 'from-orange-500/20 to-orange-600/10' },
    { id: 'industrial', label: '工业', color: 'from-gray-500/20 to-gray-600/10' },
    { id: 'real-estate', label: '房地产', color: 'from-brown-500/20 to-brown-600/10' },
    { id: 'materials', label: '材料', color: 'from-cyan-500/20 to-cyan-600/10' }
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      startAnalysis();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const startAnalysis = () => {
    setIsAnalyzing(true);
    setAnalysisProgress(0);

    // Simulate AI analysis progress
    const progressInterval = setInterval(() => {
      setAnalysisProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setIsAnalyzing(false);
          generateRecommendations();
          return 100;
        }
        return Math.min(prev + Math.random() * 15, 100);
      });
    }, 500);
  };

  const generateRecommendations = () => {
    // Mock recommendations data
    const mockRecommendations = [
      {
        id: 1,
        symbol: 'AAPL',
        name: '苹果公司',
        sector: '科技',
        price: 175.43,
        change: 2.34,
        changePercent: 1.35,
        matchScore: 92,
        aiRating: 'strong_buy',
        targetPrice: 195.00,
        reasons: [
          '强劲的iPhone销售增长',
          '服务业务持续扩张',
          '现金流充裕，股息稳定'
        ],
        riskLevel: 'medium',
        expectedReturn: 15.2
      },
      {
        id: 2,
        symbol: 'MSFT',
        name: '微软公司',
        sector: '科技',
        price: 378.85,
        change: -1.45,
        changePercent: -0.38,
        matchScore: 89,
        aiRating: 'buy',
        targetPrice: 420.00,
        reasons: [
          'Azure云服务快速增长',
          'AI技术领先优势明显',
          '企业软件市场地位稳固'
        ],
        riskLevel: 'medium',
        expectedReturn: 12.8
      },
      {
        id: 3,
        symbol: 'NVDA',
        name: '英伟达公司',
        sector: '科技',
        price: 875.28,
        change: 15.67,
        changePercent: 1.82,
        matchScore: 85,
        aiRating: 'buy',
        targetPrice: 950.00,
        reasons: [
          'AI芯片需求爆发性增长',
          '数据中心业务强劲',
          '技术护城河深厚'
        ],
        riskLevel: 'high',
        expectedReturn: 18.5
      }
    ];

    setRecommendations(mockRecommendations);
  };

  const toggleSector = (sectorId) => {
    setFormData(prev => ({
      ...prev,
      preferredSectors: prev.preferredSectors.includes(sectorId)
        ? prev.preferredSectors.filter(id => id !== sectorId)
        : [...prev.preferredSectors, sectorId]
    }));
  };

  if (isAnalyzing) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <AIThinking 
          progress={analysisProgress} 
          keywords={[
            '分析市场数据',
            '评估风险指标',
            '匹配投资偏好',
            '计算收益预期',
            '生成推荐方案'
          ]}
          status="analyzing"
        />
      </div>
    );
  }

  if (recommendations.length > 0) {
    return (
      <div className="min-h-screen py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl font-bold mb-4 text-gradient">
              AI 推荐结果
            </h1>
            <p className="text-textSecondary text-lg">
              基于您的投资偏好，AI 为您精选了以下股票
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {recommendations.map((stock, index) => (
              <GlowCard
                key={stock.id}
                delay={index * 0.2}
                variant="gradient"
                hoverable={true}
                glowEffect={true}
                className="p-6 cursor-pointer group"
              >
                {/* Stock Header */}
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-1">
                      {stock.symbol}
                    </h3>
                    <p className="text-textSecondary text-sm">{stock.name}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold">
                      $<AnimatedNumber value={stock.price} decimals={2} />
                    </div>
                    <div className={`text-sm ${stock.change >= 0 ? 'text-success' : 'text-danger'}`}>
                      {stock.change >= 0 ? '+' : ''}{stock.change} ({stock.changePercent}%)
                    </div>
                  </div>
                </div>

                {/* Match Score */}
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-2">
                    <span>匹配度</span>
                    <span>{stock.matchScore}%</span>
                  </div>
                  <div className="glass-card h-2 overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-primary to-success"
                      initial={{ width: 0 }}
                      animate={{ width: `${stock.matchScore}%` }}
                      transition={{ delay: index * 0.2 + 0.5, duration: 0.8 }}
                    />
                  </div>
                </div>

                {/* AI Rating */}
                <div className="mb-4">
                  <div className={`
                    inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium
                    ${stock.aiRating === 'strong_buy' 
                      ? 'bg-success bg-opacity-20 text-success' 
                      : 'bg-primary bg-opacity-20 text-primary'
                    }
                  `}>
                    <Sparkles size={14} />
                    {stock.aiRating === 'strong_buy' ? '强力推荐' : '推荐买入'}
                  </div>
                </div>

                {/* Key Reasons */}
                <div className="mb-4">
                  <h4 className="text-sm font-medium mb-2">推荐理由</h4>
                  <ul className="text-xs text-textSecondary space-y-1">
                    {stock.reasons.map((reason, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <div className="w-1 h-1 bg-primary rounded-full mt-2 flex-shrink-0" />
                        {reason}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Expected Return */}
                <div className="flex justify-between items-center text-sm">
                  <span className="text-textSecondary">预期收益</span>
                  <span className="text-success font-medium">
                    +<AnimatedNumber value={stock.expectedReturn} decimals={1} suffix="%" />
                  </span>
                </div>

                {/* Hover Effect */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  className="absolute inset-0 bg-gradient-to-br from-primary from-opacity-10 to-secondary to-opacity-10 rounded-2xl flex items-center justify-center"
                >
                  <div className="bg-white bg-opacity-10 p-3 rounded-full">
                    <ArrowRight className="text-white" size={24} />
                  </div>
                </motion.div>
              </GlowCard>
            ))}
          </div>

          {/* Portfolio Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mt-12"
          >
            <GlowCard variant="gradient" className="p-8">
              <h3 className="text-2xl font-bold mb-6 text-center">投资组合建议</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-gradient mb-2">
                    <AnimatedNumber value={15.2} decimals={1} suffix="%" />
                  </div>
                  <div className="text-textSecondary">预期年化收益</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-gradient mb-2">
                    <AnimatedNumber value={12.8} decimals={1} suffix="%" />
                  </div>
                  <div className="text-textSecondary">最大回撤风险</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-gradient mb-2">
                    <AnimatedNumber value={1.38} decimals={2} />
                  </div>
                  <div className="text-textSecondary">夏普比率</div>
                </div>
              </div>
            </GlowCard>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold mb-4 text-gradient">
            AI 股票推荐
          </h1>
          <p className="text-textSecondary text-lg">
            告诉我们您的投资偏好，AI 将为您推荐最适合的股票
          </p>
        </motion.div>

        {/* Step Indicator */}
        <StepIndicator 
          steps={steps} 
          currentStep={currentStep} 
          className="mb-12"
        />

        {/* Step Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
          >
            <GlowCard variant="gradient" className="p-8 mb-8">
              {/* Step 0: Risk Tolerance */}
              {currentStep === 0 && (
                <div>
                  <h2 className="text-2xl font-bold mb-6 text-center">
                    选择您的风险偏好
                  </h2>
                  <RiskSlider 
                    value={formData.riskTolerance}
                    onChange={(value) => setFormData(prev => ({ ...prev, riskTolerance: value }))}
                  />
                </div>
              )}

              {/* Step 1: Investment Period */}
              {currentStep === 1 && (
                <div>
                  <h2 className="text-2xl font-bold mb-6 text-center">
                    选择投资期限
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {investmentPeriods.map((period) => {
                      const Icon = period.icon;
                      const isSelected = formData.investmentPeriod === period.id;
                      
                      return (
                        <motion.button
                          key={period.id}
                          onClick={() => setFormData(prev => ({ ...prev, investmentPeriod: period.id }))}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className={`
                            glass-card p-6 text-center transition-all
                            ${isSelected 
                              ? 'border-primary bg-primary bg-opacity-10' 
                              : 'hover:border-white hover:border-opacity-20 hover:bg-white hover:bg-opacity-5'
                            }
                          `}
                        >
                          <Icon 
                            size={40} 
                            className={`mx-auto mb-4 ${isSelected ? 'text-primary' : 'text-textSecondary'}`} 
                          />
                          <h3 className={`text-lg font-semibold mb-2 ${isSelected ? 'text-primary' : 'text-white'}`}>
                            {period.label}
                          </h3>
                          <p className="text-textSecondary text-sm">
                            {period.description}
                          </p>
                        </motion.button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Step 2: Preferred Sectors */}
              {currentStep === 2 && (
                <div>
                  <h2 className="text-2xl font-bold mb-6 text-center">
                    选择感兴趣的行业
                  </h2>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {sectors.map((sector) => {
                      const isSelected = formData.preferredSectors.includes(sector.id);
                      
                      return (
                        <motion.button
                          key={sector.id}
                          onClick={() => toggleSector(sector.id)}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className={`
                            glass-card p-4 text-center transition-all bg-gradient-to-br ${sector.color}
                            ${isSelected 
                              ? 'border-primary bg-primary bg-opacity-20' 
                              : 'hover:border-white hover:border-opacity-20'
                            }
                          `}
                        >
                          <Building2 
                            size={32} 
                            className={`mx-auto mb-2 ${isSelected ? 'text-primary' : 'text-textSecondary'}`} 
                          />
                          <div className={`font-medium ${isSelected ? 'text-primary' : 'text-white'}`}>
                            {sector.label}
                          </div>
                        </motion.button>
                      );
                    })}
                  </div>
                </div>
              )}
            </GlowCard>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Buttons */}
        <div className="flex justify-between">
          <motion.button
            onClick={handlePrevious}
            disabled={currentStep === 0}
            whileHover={{ scale: currentStep === 0 ? 1 : 1.05 }}
            whileTap={{ scale: currentStep === 0 ? 1 : 0.95 }}
            className={`
              secondary-button flex items-center gap-2
              ${currentStep === 0 ? 'opacity-50 cursor-not-allowed' : ''}
            `}
          >
            上一步
          </motion.button>

          <motion.button
            onClick={handleNext}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="primary-button flex items-center gap-2"
          >
            {currentStep === steps.length - 1 ? '开始分析' : '下一步'}
            <ArrowRight size={20} />
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default StockRecommendation;