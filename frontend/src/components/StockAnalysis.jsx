import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  TrendingUp, 
  TrendingDown, 
  Activity, 
  Target,
  Shield,
  AlertTriangle,
  Star,
  BarChart3,
  PieChart,
  Calendar,
  DollarSign
} from 'lucide-react';
import GlowCard from './GlowCard';
import AIThinking from './AIThinking';
import AnimatedNumber from './AnimatedNumber';
import RadarChart from './RadarChart';
import GaugeChart from './GaugeChart';
import TrendChart from './TrendChart';

const StockAnalysis = () => {
  const [stockCode, setStockCode] = useState('');
  const [analysisDepth, setAnalysisDepth] = useState('standard');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [analysisResult, setAnalysisResult] = useState(null);

  const analysisDepths = [
    { id: 'quick', label: '快速分析', description: '5分钟内完成', time: '5min' },
    { id: 'standard', label: '标准分析', description: '全面基础分析', time: '10min' },
    { id: 'deep', label: '深度分析', description: '详细专业报告', time: '20min' }
  ];

  const handleAnalysis = () => {
    if (!stockCode.trim()) return;
    
    setIsAnalyzing(true);
    setAnalysisProgress(0);

    // Simulate analysis progress
    const progressInterval = setInterval(() => {
      setAnalysisProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setIsAnalyzing(false);
          generateAnalysisResult();
          return 100;
        }
        return Math.min(prev + Math.random() * 12, 100);
      });
    }, 600);
  };

  const generateAnalysisResult = () => {
    // Mock analysis result
    const result = {
      stockInfo: {
        code: stockCode.toUpperCase(),
        name: '平安银行',
        market: 'SZ',
        industry: '银行业',
        price: 11.28,
        change: 0.23,
        changePercent: 2.08,
        volume: 125000000,
        marketCap: 218500000000
      },
      comprehensiveScore: 78.5,
      rating: 'buy',
      confidence: 0.85,
      targetPrice: 13.50,
      fundamentalAnalysis: {
        score: 82,
        metrics: {
          pe: 5.8,
          pb: 0.65,
          roe: 11.2,
          revenueGrowth: 8.5,
          profitGrowth: 12.3,
          debtRatio: 0.23
        },
        keyPoints: [
          '营收稳健增长，同比增长8.5%',
          '资产质量改善，不良率下降至1.02%',
          'ROE持续提升，盈利能力强劲',
          '资本充足率保持健康水平'
        ]
      },
      technicalAnalysis: {
        score: 75,
        trend: 'upward',
        supportLevel: 10.5,
        resistanceLevel: 12.8,
        indicators: {
          macd: 'buy',
          rsi: 58,
          ma20: 10.95,
          ma50: 10.72
        },
        signals: [
          'MACD金叉形成，上涨动能增强',
          '成交量放大，资金流入明显',
          '突破短期阻力位，趋势向好'
        ]
      },
      riskAnalysis: {
        riskLevel: 'medium',
        riskScore: 45,
        risks: [
          {
            type: '市场风险',
            description: '利率下行压力影响净息差',
            impact: 'medium',
            probability: 0.6
          },
          {
            type: '政策风险',
            description: '房地产政策调整影响',
            impact: 'low',
            probability: 0.3
          }
        ]
      },
      priceHistory: [
        { label: '1月', value: 10.2 },
        { label: '2月', value: 10.5 },
        { label: '3月', value: 10.8 },
        { label: '4月', value: 11.1 },
        { label: '5月', value: 11.3 }
      ],
      radarData: [
        { label: '基本面', value: 82 },
        { label: '技术面', value: 75 },
        { label: '估值', value: 88 },
        { label: '成长性', value: 72 },
        { label: '盈利能力', value: 85 },
        { label: '财务健康', value: 79 }
      ],
      aiInsights: '平安银行基本面稳健，零售转型持续推进。技术面显示短期有上涨动能，但需关注11.8元附近压力。建议逢低适量建仓，目标价12.5元，止损价10.2元。'
    };

    setAnalysisResult(result);
  };

  if (isAnalyzing) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <AIThinking 
          progress={analysisProgress}
          keywords={[
            '获取股票基础数据',
            '分析财务指标',
            '计算技术指标',
            '评估风险因子',
            '生成投资建议',
            '验证分析结果'
          ]}
          status="analyzing"
        />
      </div>
    );
  }

  if (analysisResult) {
    const { stockInfo, comprehensiveScore, fundamentalAnalysis, technicalAnalysis, riskAnalysis } = analysisResult;
    
    return (
      <div className="min-h-screen py-12 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <h1 className="text-4xl font-bold mb-4 text-gradient">
              {stockInfo.code} 深度分析报告
            </h1>
            <p className="text-textSecondary text-lg">
              {stockInfo.name} - {stockInfo.industry}
            </p>
          </motion.div>

          {/* Stock Info Card */}
          <GlowCard variant="gradient" className="p-6 mb-8">
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-white mb-1">
                  ¥<AnimatedNumber value={stockInfo.price} decimals={2} />
                </div>
                <div className="text-textSecondary text-sm">当前价格</div>
              </div>
              <div className="text-center">
                <div className={`text-2xl font-bold mb-1 ${stockInfo.change >= 0 ? 'text-success' : 'text-danger'}`}>
                  {stockInfo.change >= 0 ? '+' : ''}
                  <AnimatedNumber value={stockInfo.change} decimals={2} />
                </div>
                <div className="text-textSecondary text-sm">涨跌额</div>
              </div>
              <div className="text-center">
                <div className={`text-2xl font-bold mb-1 ${stockInfo.changePercent >= 0 ? 'text-success' : 'text-danger'}`}>
                  {stockInfo.changePercent >= 0 ? '+' : ''}
                  <AnimatedNumber value={stockInfo.changePercent} decimals={2} suffix="%" />
                </div>
                <div className="text-textSecondary text-sm">涨跌幅</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white mb-1">
                  <AnimatedNumber value={stockInfo.volume / 1000000} decimals={1} suffix="M" />
                </div>
                <div className="text-textSecondary text-sm">成交量</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white mb-1">
                  <AnimatedNumber value={stockInfo.marketCap / 100000000} decimals={0} suffix="亿" />
                </div>
                <div className="text-textSecondary text-sm">市值</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary mb-1">
                  <AnimatedNumber value={analysisResult.targetPrice} decimals={2} />
                </div>
                <div className="text-textSecondary text-sm">目标价</div>
              </div>
            </div>
          </GlowCard>

          {/* Main Analysis Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            {/* Comprehensive Score */}
            <GlowCard variant="gradient" className="p-6 text-center">
              <h3 className="text-xl font-bold mb-4">综合评分</h3>
              <GaugeChart 
                value={comprehensiveScore} 
                max={100}
                title="投资价值"
                size={180}
              />
              <div className={`mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium
                ${analysisResult.rating === 'buy' ? 'bg-success bg-opacity-20 text-success' : 'bg-primary bg-opacity-20 text-primary'}
              `}>
                <Star size={16} />
                {analysisResult.rating === 'buy' ? '推荐买入' : '持有观望'}
              </div>
            </GlowCard>

            {/* Multi-dimensional Analysis */}
            <GlowCard variant="gradient" className="p-6 text-center">
              <h3 className="text-xl font-bold mb-4">多维度分析</h3>
              <RadarChart 
                data={analysisResult.radarData}
                size={250}
              />
            </GlowCard>

            {/* Price Trend */}
            <GlowCard variant="gradient" className="p-6">
              <h3 className="text-xl font-bold mb-4">价格走势</h3>
              <TrendChart 
                data={analysisResult.priceHistory}
                width={300}
                height={180}
                color="#00D9FF"
              />
            </GlowCard>
          </div>

          {/* Detailed Analysis */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Fundamental Analysis */}
            <GlowCard variant="gradient" className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-success bg-opacity-20 rounded-lg">
                  <BarChart3 className="text-success" size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold">基本面分析</h3>
                  <div className="text-success font-medium">评分: {fundamentalAnalysis.score}/100</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                {Object.entries(fundamentalAnalysis.metrics).map(([key, value]) => {
                  const labels = {
                    pe: 'P/E',
                    pb: 'P/B',
                    roe: 'ROE(%)',
                    revenueGrowth: '营收增长(%)',
                    profitGrowth: '利润增长(%)',
                    debtRatio: '负债率'
                  };
                  
                  return (
                    <div key={key} className="glass-card p-3 text-center">
                      <div className="text-lg font-bold text-white">
                        <AnimatedNumber 
                          value={value} 
                          decimals={key === 'pe' || key === 'pb' ? 2 : 1}
                          suffix={key === 'roe' || key.includes('Growth') ? '%' : ''}
                        />
                      </div>
                      <div className="text-textSecondary text-xs">{labels[key]}</div>
                    </div>
                  );
                })}
              </div>

              <div>
                <h4 className="font-semibold mb-3">关键要点</h4>
                <ul className="space-y-2">
                  {fundamentalAnalysis.keyPoints.map((point, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start gap-2 text-sm text-textSecondary"
                    >
                      <div className="w-1.5 h-1.5 bg-success rounded-full mt-2 flex-shrink-0" />
                      {point}
                    </motion.li>
                  ))}
                </ul>
              </div>
            </GlowCard>

            {/* Technical Analysis */}
            <GlowCard variant="gradient" className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-primary bg-opacity-20 rounded-lg">
                  <Activity className="text-primary" size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold">技术面分析</h3>
                  <div className="text-primary font-medium">评分: {technicalAnalysis.score}/100</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="glass-card p-3 text-center">
                  <div className="text-lg font-bold text-success">
                    ¥<AnimatedNumber value={technicalAnalysis.supportLevel} decimals={2} />
                  </div>
                  <div className="text-textSecondary text-xs">支撑位</div>
                </div>
                <div className="glass-card p-3 text-center">
                  <div className="text-lg font-bold text-danger">
                    ¥<AnimatedNumber value={technicalAnalysis.resistanceLevel} decimals={2} />
                  </div>
                  <div className="text-textSecondary text-xs">阻力位</div>
                </div>
                <div className="glass-card p-3 text-center">
                  <div className="text-lg font-bold text-white">
                    <AnimatedNumber value={technicalAnalysis.indicators.rsi} decimals={0} />
                  </div>
                  <div className="text-textSecondary text-xs">RSI</div>
                </div>
                <div className="glass-card p-3 text-center">
                  <div className={`text-lg font-bold ${technicalAnalysis.trend === 'upward' ? 'text-success' : 'text-danger'}`}>
                    {technicalAnalysis.trend === 'upward' ? (
                      <TrendingUp size={20} className="mx-auto" />
                    ) : (
                      <TrendingDown size={20} className="mx-auto" />
                    )}
                  </div>
                  <div className="text-textSecondary text-xs">趋势</div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-3">技术信号</h4>
                <ul className="space-y-2">
                  {technicalAnalysis.signals.map((signal, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start gap-2 text-sm text-textSecondary"
                    >
                      <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                      {signal}
                    </motion.li>
                  ))}
                </ul>
              </div>
            </GlowCard>
          </div>

          {/* Risk Analysis & AI Insights */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Risk Analysis */}
            <GlowCard variant="gradient" className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-danger bg-opacity-20 rounded-lg">
                  <Shield className="text-danger" size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold">风险分析</h3>
                  <div className="text-danger font-medium">风险等级: {riskAnalysis.riskLevel === 'medium' ? '中等' : '低'}</div>
                </div>
              </div>

              <div className="mb-6">
                <GaugeChart 
                  value={riskAnalysis.riskScore} 
                  max={100}
                  title="风险评分"
                  size={160}
                />
              </div>

              <div>
                <h4 className="font-semibold mb-3">主要风险</h4>
                <div className="space-y-3">
                  {riskAnalysis.risks.map((risk, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="glass-card p-3"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <AlertTriangle size={16} className="text-danger" />
                        <span className="font-medium text-sm">{risk.type}</span>
                      </div>
                      <p className="text-textSecondary text-xs">{risk.description}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </GlowCard>

            {/* AI Insights */}
            <GlowCard variant="gradient" className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-secondary bg-opacity-20 rounded-lg">
                  <Target className="text-secondary" size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold">AI 投资建议</h3>
                  <div className="text-secondary font-medium">置信度: {Math.round(analysisResult.confidence * 100)}%</div>
                </div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="glass-card p-4 mb-6"
              >
                <p className="text-textSecondary leading-relaxed">
                  {analysisResult.aiInsights}
                </p>
              </motion.div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="primary-button py-3"
                >
                  设置预警
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="secondary-button py-3"
                >
                  导出报告
                </motion.button>
              </div>
            </GlowCard>
          </div>
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
            AI 股票分析
          </h1>
          <p className="text-textSecondary text-lg">
            输入股票代码，获得 AI 驱动的专业分析报告
          </p>
        </motion.div>

        {/* Analysis Form */}
        <GlowCard variant="gradient" className="p-8">
          {/* Stock Code Input */}
          <div className="mb-8">
            <label className="block text-lg font-semibold mb-4">股票代码</label>
            <div className="relative">
              <input
                type="text"
                value={stockCode}
                onChange={(e) => setStockCode(e.target.value.toUpperCase())}
                placeholder="请输入股票代码，如 000001"
                className="w-full glass-card px-6 py-4 text-lg bg-transparent border-white border-opacity-20 focus:border-primary focus:outline-none focus:bg-white focus:bg-opacity-5 transition-all"
                style={{ borderRadius: '16px' }}
              />
              <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-textSecondary" size={24} />
            </div>
          </div>

          {/* Analysis Depth */}
          <div className="mb-8">
            <label className="block text-lg font-semibold mb-4">分析深度</label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {analysisDepths.map((depth) => {
                const isSelected = analysisDepth === depth.id;
                
                return (
                  <motion.button
                    key={depth.id}
                    onClick={() => setAnalysisDepth(depth.id)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`
                      glass-card p-4 text-left transition-all
                      ${isSelected 
                        ? 'border-primary bg-primary bg-opacity-10' 
                        : 'hover:border-white hover:border-opacity-20 hover:bg-white hover:bg-opacity-5'
                      }
                    `}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h3 className={`font-semibold ${isSelected ? 'text-primary' : 'text-white'}`}>
                        {depth.label}
                      </h3>
                      <span className={`text-xs px-2 py-1 rounded ${isSelected ? 'bg-primary bg-opacity-20 text-primary' : 'bg-white bg-opacity-10 text-textSecondary'}`}>
                        {depth.time}
                      </span>
                    </div>
                    <p className="text-textSecondary text-sm">
                      {depth.description}
                    </p>
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* Start Analysis Button */}
          <div className="text-center">
            <motion.button
              onClick={handleAnalysis}
              disabled={!stockCode.trim()}
              whileHover={{ scale: stockCode.trim() ? 1.05 : 1 }}
              whileTap={{ scale: stockCode.trim() ? 0.95 : 1 }}
              className={`
                primary-button flex items-center gap-3 text-lg px-12 py-4 mx-auto
                ${!stockCode.trim() ? 'opacity-50 cursor-not-allowed' : ''}
              `}
            >
              <Activity size={24} />
              开始分析
            </motion.button>
          </div>
        </GlowCard>
      </div>
    </div>
  );
};

export default StockAnalysis;