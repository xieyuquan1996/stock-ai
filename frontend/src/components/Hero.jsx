import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Brain, TrendingUp, MessageSquare, ArrowRight } from 'lucide-react';
import ParticleBackground from './ParticleBackground';
import GlowCard from './GlowCard';
import PropTypes from 'prop-types';

const Hero = ({ onNavigate }) => {
  const [currentText, setCurrentText] = useState(0);
  const [isTyping, setIsTyping] = useState(true);

  const heroTexts = [
    "AI 持仓管家 - 不只是推荐，更懂你的持仓",
    "实时诊断持仓健康度，智能提示加仓减仓时机",
    "别人只会推荐，我们帮你管理",
    "别人看个股，我们看组合"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTyping(false);
      setTimeout(() => {
        setCurrentText((prev) => (prev + 1) % heroTexts.length);
        setIsTyping(true);
      }, 500);
    }, 3000);

    return () => clearInterval(interval);
  }, [heroTexts.length]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  const features = [
    {
      icon: Brain,
      title: "持仓诊断",
      description: "AI分析持仓健康度，发现潜在问题",
      color: "from-primary from-opacity-20 to-primary to-opacity-5",
      delay: 0.1,
      page: "portfolio-diagnosis"
    },
    {
      icon: TrendingUp,
      title: "仓位管理", 
      description: "智能提示加仓减仓时机，优化配置",
      color: "from-secondary from-opacity-20 to-secondary to-opacity-5",
      delay: 0.2,
      page: "position-management"
    },
    {
      icon: MessageSquare,
      title: "风险预警",
      description: "实时监控风险，提前预警潜在损失",
      color: "from-success from-opacity-20 to-success to-opacity-5",
      delay: 0.3,
      page: "risk-alert"
    }
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Particle Background */}
      <ParticleBackground density={80} />
      
      {/* Background Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background via-opacity-95 to-surface to-opacity-80" />
      
      {/* Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 max-w-7xl mx-auto px-6 text-center"
      >
        {/* Main Heading */}
        <motion.div variants={itemVariants} className="mb-8">
          <motion.h1 
            className="text-6xl md:text-8xl font-bold mb-6"
            animate={{ 
              textShadow: [
                "0 0 20px rgba(0, 217, 255, 0.5)",
                "0 0 40px rgba(0, 217, 255, 0.8)",
                "0 0 20px rgba(0, 217, 255, 0.5)"
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <span className="text-gradient neon-text">Stock</span>
            <span className="text-white">AI</span>
          </motion.h1>
          
          {/* Animated Subtitle */}
          <div className="h-20 flex items-center justify-center">
            <motion.h2 
              key={currentText}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isTyping ? 1 : 0, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-2xl md:text-4xl font-light text-textSecondary"
            >
              {heroTexts[currentText]}
            </motion.h2>
          </div>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div variants={itemVariants} className="mb-16">
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <motion.button
              onClick={() => onNavigate('portfolio-diagnosis')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="primary-button flex items-center gap-3 text-lg px-10 py-5"
            >
              诊断我的持仓
              <ArrowRight size={20} />
            </motion.button>
            
            <motion.button
              onClick={() => onNavigate('position-management')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="secondary-button flex items-center gap-3 text-lg px-10 py-5"
            >
              开始使用
            </motion.button>
          </div>
        </motion.div>

        {/* Feature Cards */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <GlowCard
                key={index}
                delay={feature.delay}
                variant="gradient"
                hoverable={true}
                glowEffect={true}
                className="p-8 text-center group cursor-pointer"
                onClick={() => onNavigate(feature.page)}
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="mb-6 inline-block"
                >
                  <div className={`p-4 rounded-2xl bg-gradient-to-br ${feature.color} backdrop-blur-sm`}>
                    <Icon size={40} className="text-white" />
                  </div>
                </motion.div>
                
                <h3 className="text-2xl font-semibold mb-4 text-white group-hover:text-primary transition-colors">
                  {feature.title}
                </h3>
                
                <p className="text-textSecondary text-lg leading-relaxed">
                  {feature.description}
                </p>
                
                {/* Hover Arrow */}
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  whileHover={{ opacity: 1, x: 0 }}
                  className="mt-4 flex justify-center"
                >
                  <ArrowRight className="text-primary" size={24} />
                </motion.div>
              </GlowCard>
            );
          })}
        </motion.div>

        {/* Stats Section */}
        <motion.div variants={itemVariants} className="mt-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { value: "99.9%", label: "分析准确率" },
              { value: "10ms", label: "响应速度" },
              { value: "24/7", label: "服务时间" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="text-center"
              >
                <motion.div
                  className="text-4xl md:text-6xl font-bold text-gradient mb-2"
                  animate={{ 
                    scale: [1, 1.02, 1],
                  }}
                  transition={{ 
                    duration: 2, 
                    repeat: Infinity,
                    delay: index * 0.5
                  }}
                >
                  {stat.value}
                </motion.div>
                <div className="text-textSecondary text-lg">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* Floating Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-primary bg-opacity-30 rounded-full"
            animate={{
              x: [
                Math.random() * window.innerWidth,
                Math.random() * window.innerWidth,
                Math.random() * window.innerWidth
              ],
              y: [
                Math.random() * window.innerHeight,
                Math.random() * window.innerHeight,
                Math.random() * window.innerHeight
              ],
              opacity: [0, 1, 0],
              scale: [0, 1, 0]
            }}
            transition={{
              duration: 10 + Math.random() * 10,
              delay: Math.random() * 5,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}
      </div>
    </section>
  );
};

Hero.propTypes = {
  onNavigate: PropTypes.func.isRequired
};

export default Hero;