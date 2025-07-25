import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle, 
  CheckCircle, 
  XCircle,
  Target,
  Shield,
  PieChart,
  BarChart3,
  Lightbulb
} from 'lucide-react';
import GlowCard from './GlowCard';
import GaugeChart from './GaugeChart';
import RadarChart from './RadarChart';
import AnimatedNumber from './AnimatedNumber';

const PortfolioDiagnosis = () => {
  // 模拟诊断数据
  const diagnosisResult = {
    healthScore: 75,
    totalValue: 125000,
    totalProfit: 12.5,
    todayChange: 2.3,
    
    holdings: [
      {
        id: 1,
        code: '000001',
        name: '平安银行',
        quantity: 1000,
        costPrice: 12.50,
        currentPrice: 13.25,
        profit: 6.0,
        profitAmount: 750,
        health: 'good',
        suggestion: '健康，技术面良好，可继续持有'
      },
      {
        id: 2,
        code: '600036',
        name: '招商银行',
        quantity: 500,
        costPrice: 48.20,
        currentPrice: 52.80,
        profit: 9.5,
        profitAmount: 2300,
        health: 'warning',
        suggestion: '注意，接近压力位，建议减仓30%'
      }
    ],

    sectorsAnalysis: {
      current: [
        { sector: '银行', weight: 65, status: 'overweight' },
        { sector: '科技', weight: 20, status: 'normal' },
        { sector: '消费', weight: 10, status: 'underweight' },
        { sector: '医药', weight: 5, status: 'underweight' }
      ],
      recommended: [
        { sector: '银行', weight: 40 },
        { sector: '科技', weight: 25 },
        { sector: '消费', weight: 20 },
        { sector: '医药', weight: 15 }
      ]
    },

    riskMetrics: {
      beta: 1.25,
      volatility: 18.5,
      maxDrawdown: 12.8,
      sharpeRatio: 0.85
    },

    suggestions: [
      {
        type: 'reduce',
        icon: TrendingDown,
        title: '减持建议',
        content: '减持 600036 约 30%（已到目标价位）',
        priority: 'high',
        color: 'danger'
      },
      {
        type: 'diversify',
        icon: PieChart,
        title: '分散配置',
        content: '考虑配置防御性板块（医药/消费）',
        priority: 'medium',
        color: 'primary'
      },
      {
        type: 'cash',
        icon: Shield,
        title: '现金管理',
        content: '保留 20% 现金应对调整',
        priority: 'medium',
        color: 'success'
      }
    ],

    radarData: [
      { label: '收益性', value: 85 },
      { label: '稳定性', value: 70 },
      { label: '流动性', value: 90 },
      { label: '分散度', value: 45 },
      { label: '成长性', value: 75 },
      { label: '价值性', value: 80 }
    ]
  };

  const getHealthColor = (health) => {
    switch (health) {
      case 'good': return 'text-success';
      case 'warning': return 'text-danger';
      case 'normal': return 'text-primary';
      default: return 'text-textSecondary';
    }
  };

  const getHealthIcon = (health) => {
    switch (health) {
      case 'good': return CheckCircle;
      case 'warning': return AlertTriangle;
      case 'normal': return Target;
      default: return XCircle;
    }
  };

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
            持仓健康诊断报告
          </h1>
          <p className="text-textSecondary text-lg">
            基于 AI 分析的个性化持仓优化建议
          </p>
        </motion.div>

        {/* Overall Health Score */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Health Score */}
          <GlowCard variant="gradient" className="p-6 text-center">
            <h3 className="text-xl font-bold mb-4">持仓健康度</h3>
            <GaugeChart 
              value={diagnosisResult.healthScore} 
              max={100}
              title="综合评分"
              unit="分"
              size={180}
            />
            <div className="mt-4">
              <div className={`text-lg font-medium ${
                diagnosisResult.healthScore >= 80 ? 'text-success' : 
                diagnosisResult.healthScore >= 60 ? 'text-primary' : 'text-danger'
              }`}>
                {diagnosisResult.healthScore >= 80 ? '健康' : 
                 diagnosisResult.healthScore >= 60 ? '良好' : '需要改善'}
              </div>
            </div>
          </GlowCard>

          {/* Portfolio Overview */}
          <GlowCard variant="gradient" className="p-6">
            <h3 className="text-xl font-bold mb-4">投资概览</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-textSecondary">总资产</span>
                <span className="text-2xl font-bold text-white">
                  ¥<AnimatedNumber value={diagnosisResult.totalValue} />
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-textSecondary">总盈亏</span>
                <span className={`text-xl font-bold ${diagnosisResult.totalProfit >= 0 ? 'text-success' : 'text-danger'}`}>
                  {diagnosisResult.totalProfit >= 0 ? '+' : ''}
                  <AnimatedNumber value={diagnosisResult.totalProfit} decimals={1} suffix="%" />
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-textSecondary">今日涨跌</span>
                <span className={`text-lg font-bold ${diagnosisResult.todayChange >= 0 ? 'text-success' : 'text-danger'}`}>
                  {diagnosisResult.todayChange >= 0 ? '+' : ''}
                  <AnimatedNumber value={diagnosisResult.todayChange} decimals={1} suffix="%" />
                </span>
              </div>
            </div>
          </GlowCard>

          {/* Portfolio Radar */}
          <GlowCard variant="gradient" className="p-6 text-center">
            <h3 className="text-xl font-bold mb-4">组合分析</h3>
            <RadarChart 
              data={diagnosisResult.radarData}
              size={200}
            />
          </GlowCard>
        </div>

        {/* Holdings Analysis */}
        <GlowCard variant="gradient" className="p-6 mb-8">
          <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
            <BarChart3 className="text-primary" size={28} />
            个股健康度分析
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {diagnosisResult.holdings.map((holding) => {
              const HealthIcon = getHealthIcon(holding.health);
              
              return (
                <motion.div
                  key={holding.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="glass-card p-4"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="text-lg font-bold">{holding.name}</h4>
                      <p className="text-textSecondary text-sm">{holding.code}</p>
                    </div>
                    <div className={`flex items-center gap-2 ${getHealthColor(holding.health)}`}>
                      <HealthIcon size={20} />
                      <span className="text-sm font-medium">
                        {holding.health === 'good' ? '健康' : 
                         holding.health === 'warning' ? '注意' : '正常'}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between">
                      <span className="text-textSecondary">持仓</span>
                      <span>{holding.quantity}股</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-textSecondary">成本价</span>
                      <span>¥{holding.costPrice}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-textSecondary">现价</span>
                      <span>¥{holding.currentPrice}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-textSecondary">盈亏</span>
                      <span className={holding.profit >= 0 ? 'text-success' : 'text-danger'}>
                        {holding.profit >= 0 ? '+' : ''}{holding.profit}% 
                        (¥{holding.profitAmount >= 0 ? '+' : ''}{holding.profitAmount})
                      </span>
                    </div>
                  </div>

                  <div className="glass-card p-3 bg-white bg-opacity-5">
                    <p className="text-sm text-textSecondary">{holding.suggestion}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </GlowCard>

        {/* Sector Analysis */}
        <GlowCard variant="gradient" className="p-6 mb-8">
          <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
            <PieChart className="text-secondary" size={28} />
            板块配置分析
          </h3>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Current Allocation */}
            <div>
              <h4 className="text-lg font-semibold mb-4">当前配置</h4>
              <div className="space-y-3">
                {diagnosisResult.sectorsAnalysis.current.map((sector, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span>{sector.sector}</span>
                      <span className={`px-2 py-1 rounded text-xs ${
                        sector.status === 'overweight' ? 'bg-danger bg-opacity-20 text-danger' :
                        sector.status === 'underweight' ? 'bg-primary bg-opacity-20 text-primary' :
                        'bg-success bg-opacity-20 text-success'
                      }`}>
                        {sector.status === 'overweight' ? '超配' :
                         sector.status === 'underweight' ? '低配' : '合理'}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-24 bg-white bg-opacity-10 rounded-full h-2">
                        <div 
                          className="h-2 bg-primary rounded-full transition-all duration-1000"
                          style={{ width: `${sector.weight}%` }}
                        />
                      </div>
                      <span className="text-sm w-12 text-right">{sector.weight}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recommended Allocation */}
            <div>
              <h4 className="text-lg font-semibold mb-4">建议配置</h4>
              <div className="space-y-3">
                {diagnosisResult.sectorsAnalysis.recommended.map((sector, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span>{sector.sector}</span>
                    <div className="flex items-center gap-2">
                      <div className="w-24 bg-white bg-opacity-10 rounded-full h-2">
                        <div 
                          className="h-2 bg-success rounded-full transition-all duration-1000"
                          style={{ width: `${sector.weight}%` }}
                        />
                      </div>
                      <span className="text-sm w-12 text-right">{sector.weight}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </GlowCard>

        {/* AI Suggestions */}
        <GlowCard variant="gradient" className="p-6">
          <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
            <Lightbulb className="text-primary" size={28} />
            AI 智能建议
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {diagnosisResult.suggestions.map((suggestion, index) => {
              const SuggestionIcon = suggestion.icon;
              
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 }}
                  className={`glass-card p-4 border-l-4 border-${suggestion.color}`}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`p-2 bg-${suggestion.color} bg-opacity-20 rounded-lg`}>
                      <SuggestionIcon className={`text-${suggestion.color}`} size={20} />
                    </div>
                    <div>
                      <h4 className="font-semibold">{suggestion.title}</h4>
                      <span className={`text-xs px-2 py-1 rounded ${
                        suggestion.priority === 'high' ? 'bg-danger bg-opacity-20 text-danger' :
                        'bg-primary bg-opacity-20 text-primary'
                      }`}>
                        {suggestion.priority === 'high' ? '高优先级' : '中优先级'}
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-textSecondary">{suggestion.content}</p>
                </motion.div>
              );
            })}
          </div>
        </GlowCard>
      </div>
    </div>
  );
};

export default PortfolioDiagnosis;