import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Brain, Activity, Zap } from 'lucide-react';
import PropTypes from 'prop-types';

const AIThinking = ({ 
  progress = 0, 
  keywords = [], 
  status = 'analyzing',
  showProgress = true 
}) => {
  const [currentKeyword, setCurrentKeyword] = useState(0);
  const [brainWaves, setBrainWaves] = useState([]);

  const defaultKeywords = [
    '分析基本面数据',
    '计算技术指标',
    '评估市场情绪',
    '识别关键模式',
    '生成投资建议',
    '评估风险水平'
  ];

  const displayKeywords = keywords.length > 0 ? keywords : defaultKeywords;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentKeyword((prev) => (prev + 1) % displayKeywords.length);
    }, 1500);

    return () => clearInterval(interval);
  }, [displayKeywords.length]);

  useEffect(() => {
    // Generate brain wave data
    const waves = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      delay: i * 0.1,
      amplitude: Math.random() * 0.5 + 0.5
    }));
    setBrainWaves(waves);
  }, []);

  const statusConfig = {
    analyzing: {
      icon: Brain,
      color: 'text-primary',
      message: 'AI 正在分析...'
    },
    processing: {
      icon: Activity,
      color: 'text-secondary',
      message: '处理数据中...'
    },
    generating: {
      icon: Zap,
      color: 'text-success',
      message: '生成结果...'
    }
  };

  const { icon: StatusIcon, color, message } = statusConfig[status];

  return (
    <div className="flex flex-col items-center justify-center p-8 space-y-6">
      {/* AI Brain Animation */}
      <div className="relative">
        <motion.div
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.7, 1, 0.7]
          }}
          transition={{ 
            duration: 2, 
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className={`${color} mb-4`}
        >
          <StatusIcon size={64} />
        </motion.div>

        {/* Brain Wave Animation */}
        <div className="absolute -inset-8 flex items-center justify-center">
          {brainWaves.map((wave) => (
            <motion.div
              key={wave.id}
              className="absolute w-2 h-2 bg-primary bg-opacity-30 rounded-full"
              animate={{
                x: [
                  Math.cos(wave.id * 0.5) * 60,
                  Math.cos(wave.id * 0.5 + Math.PI) * 60
                ],
                y: [
                  Math.sin(wave.id * 0.5) * 60,
                  Math.sin(wave.id * 0.5 + Math.PI) * 60
                ],
                opacity: [0.3, 1, 0.3]
              }}
              transition={{
                duration: 2 + wave.amplitude,
                delay: wave.delay,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>
      </div>

      {/* Status Message */}
      <motion.div
        className="text-xl font-semibold text-center"
        animate={{ opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        {message}
      </motion.div>

      {/* Current Analysis Step */}
      <motion.div
        key={currentKeyword}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        className="text-textSecondary text-center min-h-[24px]"
      >
        {displayKeywords[currentKeyword]}
      </motion.div>

      {/* Progress Bar */}
      {showProgress && (
        <div className="w-full max-w-sm">
          <div className="flex justify-between text-sm text-textSecondary mb-2">
            <span>分析进度</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="glass-card h-2 overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-primary to-secondary"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
          </div>
          
          {/* Progress Glow Effect */}
          <motion.div
            className="h-2 bg-gradient-to-r from-primary from-opacity-50 to-secondary to-opacity-50 blur-sm -mt-2"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        </div>
      )}

      {/* Floating Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 12 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-primary bg-opacity-20 rounded-full"
            animate={{
              x: [
                Math.random() * 400,
                Math.random() * 400,
                Math.random() * 400
              ],
              y: [
                Math.random() * 300,
                Math.random() * 300,
                Math.random() * 300
              ],
              opacity: [0, 1, 0]
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              delay: Math.random() * 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>
    </div>
  );
};

AIThinking.propTypes = {
  progress: PropTypes.number,
  keywords: PropTypes.arrayOf(PropTypes.string),
  status: PropTypes.oneOf(['analyzing', 'processing', 'generating']),
  showProgress: PropTypes.bool
};

export default AIThinking;