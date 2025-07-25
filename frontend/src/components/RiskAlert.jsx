import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  AlertTriangle, 
  Shield, 
  TrendingDown, 
  Clock,
  Target,
  Activity,
  Bell,
  Eye,
  Zap,
  DollarSign
} from 'lucide-react';
import GlowCard from './GlowCard';
import GaugeChart from './GaugeChart';
import AnimatedNumber from './AnimatedNumber';

const RiskAlert = () => {
  const [activeTab, setActiveTab] = useState('current');

  // 模拟风险预警数据
  const riskData = {
    overallRisk: 68,
    alerts: [
      {
        id: 1,
        type: 'high',
        icon: AlertTriangle,
        title: '持仓集中度过高',
        description: '银行股占比65%，存在板块集中风险',
        impact: '如银行板块调整，组合将面临较大回撤',
        suggestion: '建议减持银行股至40%以下，增配其他防御性板块',
        probability: 0.75,
        potentialLoss: 15.2,
        timeframe: '1-2周内'
      },
      {
        id: 2,
        type: 'medium',
        icon: TrendingDown,
        title: '技术面转弱信号',
        description: '招商银行突破重要支撑位',
        impact: '可能引发进一步下跌，影响整体收益',
        suggestion: '建议减仓30%，等待企稳信号',
        probability: 0.6,
        potentialLoss: 8.5,
        timeframe: '3-5天内'
      },
      {
        id: 3,
        type: 'low',
        icon: Clock,
        title: '财报季临近',
        description: '平安银行将于下周公布季度财报',
        impact: '历史上财报前后波动较大',
        suggestion: '可考虑在财报前适度减仓，降低不确定性',
        probability: 0.4,
        potentialLoss: 5.0,
        timeframe: '1周内'
      }
    ],
    riskRadar: [
      { category: '市场风险', level: 'medium', score: 65, description: '整体市场情绪偏谨慎' },
      { category: '个股风险', level: 'low', score: 35, description: '持仓个股基本面稳健' },
      { category: '行业风险', level: 'high', score: 85, description: '银行板块面临净息差压力' },
      { category: '流动性风险', level: 'low', score: 25, description: '持仓流动性良好' },
      { category: '集中度风险', level: 'high', score: 88, description: '持仓过度集中在银行板块' },
      { category: '波动性风险', level: 'medium', score: 55, description: '组合波动性适中' }
    ],
    historicalAlerts: [
      {
        date: '2024-01-20',
        type: 'resolved',
        title: '科技股超买预警',
        action: '及时减仓科技股30%',
        result: '避免了后续15%的回调损失'
      },
      {
        date: '2024-01-15',
        type: 'resolved',
        title: '仓位过重预警',
        action: '降低仓位至80%',
        result: '在市场调整中保持了稳定'
      },
      {
        date: '2024-01-10',
        type: 'missed',
        title: '银行股估值修复机会',
        action: '未及时加仓',
        result: '错失了8%的上涨机会'
      }
    ]
  };

  const getRiskColor = (type) => {
    switch (type) {
      case 'high': return 'text-danger';
      case 'medium': return 'text-primary';
      case 'low': return 'text-success';
      default: return 'text-textSecondary';
    }
  };

  const getRiskBg = (type) => {
    switch (type) {
      case 'high': return 'bg-danger bg-opacity-20 border-danger border-opacity-30';
      case 'medium': return 'bg-primary bg-opacity-20 border-primary border-opacity-30';
      case 'low': return 'bg-success bg-opacity-20 border-success border-opacity-30';
      default: return 'bg-white bg-opacity-10';
    }
  };

  const getLevelColor = (level) => {
    switch (level) {
      case 'high': return 'danger';
      case 'medium': return 'primary';
      case 'low': return 'success';
      default: return 'textSecondary';
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
            AI 风险预警系统
          </h1>
          <p className="text-textSecondary text-lg">
            实时监控持仓风险，提前预警潜在损失
          </p>
        </motion.div>

        {/* Risk Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
          {/* Overall Risk Score */}
          <GlowCard variant="gradient" className="p-6 text-center">
            <h3 className="text-lg font-bold mb-4">整体风险等级</h3>
            <GaugeChart 
              value={riskData.overallRisk} 
              max={100}
              title="风险指数"
              size={150}
            />
          </GlowCard>

          {/* Risk Stats */}
          <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-6">
            <GlowCard variant="gradient" className="p-6 text-center">
              <div className="flex items-center justify-center mb-3">
                <div className="p-3 bg-danger bg-opacity-20 rounded-full">
                  <AlertTriangle className="text-danger" size={24} />
                </div>
              </div>
              <div className="text-2xl font-bold text-danger mb-1">
                <AnimatedNumber value={riskData.alerts.filter(a => a.type === 'high').length} />
              </div>
              <div className="text-textSecondary text-sm">高风险预警</div>
            </GlowCard>

            <GlowCard variant="gradient" className="p-6 text-center">
              <div className="flex items-center justify-center mb-3">
                <div className="p-3 bg-primary bg-opacity-20 rounded-full">
                  <Shield className="text-primary" size={24} />
                </div>
              </div>
              <div className="text-2xl font-bold text-primary mb-1">
                <AnimatedNumber value={riskData.alerts.filter(a => a.type === 'medium').length} />
              </div>
              <div className="text-textSecondary text-sm">中风险提醒</div>
            </GlowCard>

            <GlowCard variant="gradient" className="p-6 text-center">
              <div className="flex items-center justify-center mb-3">
                <div className="p-3 bg-success bg-opacity-20 rounded-full">
                  <Eye className="text-success" size={24} />
                </div>
              </div>
              <div className="text-2xl font-bold text-success mb-1">
                <AnimatedNumber value={riskData.alerts.filter(a => a.type === 'low').length} />
              </div>
              <div className="text-textSecondary text-sm">关注事项</div>
            </GlowCard>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className="glass-card p-2 flex gap-2">
            {[
              { id: 'current', label: '当前预警', icon: Bell },
              { id: 'radar', label: '风险雷达', icon: Activity },
              { id: 'history', label: '历史记录', icon: Clock }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <motion.button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`flex items-center gap-2 px-6 py-3 rounded-xl transition-all ${
                    activeTab === tab.id 
                      ? 'bg-primary text-white' 
                      : 'hover:bg-white hover:bg-opacity-10 text-textSecondary'
                  }`}
                >
                  <Icon size={18} />
                  {tab.label}
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'current' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {riskData.alerts.map((alert, index) => {
              const Icon = alert.icon;
              
              return (
                <GlowCard 
                  key={alert.id} 
                  variant="gradient" 
                  className={`p-6 border-l-4 ${getRiskBg(alert.type)}`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-full ${getRiskBg(alert.type)}`}>
                      <Icon className={getRiskColor(alert.type)} size={24} />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-bold">{alert.title}</h3>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getRiskBg(alert.type)}`}>
                          {alert.type === 'high' ? '高风险' : 
                           alert.type === 'medium' ? '中风险' : '低风险'}
                        </span>
                      </div>
                      
                      <p className="text-textSecondary mb-4">{alert.description}</p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div className="glass-card p-3">
                          <div className="text-xs text-textSecondary mb-1">影响描述</div>
                          <div className="text-sm">{alert.impact}</div>
                        </div>
                        
                        <div className="glass-card p-3">
                          <div className="text-xs text-textSecondary mb-1">发生概率</div>
                          <div className="text-sm font-bold">
                            <AnimatedNumber value={alert.probability * 100} decimals={0} suffix="%" />
                          </div>
                        </div>
                        
                        <div className="glass-card p-3">
                          <div className="text-xs text-textSecondary mb-1">潜在损失</div>
                          <div className="text-sm font-bold text-danger">
                            -<AnimatedNumber value={alert.potentialLoss} decimals={1} suffix="%" />
                          </div>
                        </div>
                      </div>
                      
                      <div className="glass-card p-4 bg-white bg-opacity-5">
                        <div className="flex items-center gap-2 mb-2">
                          <Zap className="text-primary" size={16} />
                          <span className="font-medium">AI 建议</span>
                        </div>
                        <p className="text-sm text-textSecondary">{alert.suggestion}</p>
                        <div className="mt-2 text-xs text-textSecondary">
                          预计时间框架：{alert.timeframe}
                        </div>
                      </div>
                    </div>
                  </div>
                </GlowCard>
              );
            })}
          </motion.div>
        )}

        {activeTab === 'radar' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {riskData.riskRadar.map((risk, index) => (
              <GlowCard key={index} variant="gradient" className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold">{risk.category}</h3>
                  <span className={`px-2 py-1 rounded text-xs bg-${getLevelColor(risk.level)} bg-opacity-20 text-${getLevelColor(risk.level)}`}>
                    {risk.level === 'high' ? '高' : 
                     risk.level === 'medium' ? '中' : '低'}
                  </span>
                </div>
                
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-2">
                    <span>风险评分</span>
                    <span>{risk.score}/100</span>
                  </div>
                  <div className="glass-card h-2 overflow-hidden">
                    <motion.div
                      className={`h-full bg-${getLevelColor(risk.level)}`}
                      initial={{ width: 0 }}
                      animate={{ width: `${risk.score}%` }}
                      transition={{ delay: index * 0.2, duration: 0.8 }}
                    />
                  </div>
                </div>
                
                <p className="text-textSecondary text-sm">{risk.description}</p>
              </GlowCard>
            ))}
          </motion.div>
        )}

        {activeTab === 'history' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            {riskData.historicalAlerts.map((item, index) => (
              <GlowCard key={index} variant="gradient" className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`w-3 h-3 rounded-full ${
                      item.type === 'resolved' ? 'bg-success' :
                      item.type === 'missed' ? 'bg-danger' : 'bg-primary'
                    }`} />
                    
                    <div>
                      <h3 className="font-bold">{item.title}</h3>
                      <p className="text-textSecondary text-sm">
                        {item.action} - {item.result}
                      </p>
                    </div>
                  </div>
                  
                  <div className="text-textSecondary text-sm">
                    {item.date}
                  </div>
                </div>
              </GlowCard>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default RiskAlert;