import { useState } from 'react';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';

const RiskSlider = ({ value, onChange, className = '' }) => {
  const [isDragging, setIsDragging] = useState(false);

  const riskLevels = [
    { value: 0, label: '极保守', color: '#10B981', description: '稳健收益，风险极低' },
    { value: 25, label: '保守', color: '#22C55E', description: '稳定增长，低风险' },
    { value: 50, label: '平衡', color: '#F59E0B', description: '平衡收益，中等风险' },
    { value: 75, label: '积极', color: '#EF4444', description: '追求增长，较高风险' },
    { value: 100, label: '激进', color: '#DC2626', description: '高收益目标，高风险' }
  ];

  const getCurrentRisk = () => {
    return riskLevels.reduce((prev, curr) => 
      Math.abs(curr.value - value) < Math.abs(prev.value - value) ? curr : prev
    );
  };

  const currentRisk = getCurrentRisk();

  return (
    <div className={`w-full ${className}`}>
      {/* Current Selection Display */}
      <motion.div
        animate={{ scale: isDragging ? 1.05 : 1 }}
        className="text-center mb-8"
      >
        <motion.div
          animate={{ color: currentRisk.color }}
          className="text-2xl font-bold mb-2"
        >
          {currentRisk.label}
        </motion.div>
        <div className="text-textSecondary">
          {currentRisk.description}
        </div>
      </motion.div>

      {/* Slider Container */}
      <div className="relative">
        {/* Background Track */}
        <div className="h-3 bg-surface rounded-full relative overflow-hidden">
          {/* Gradient Track */}
          <div 
            className="h-full rounded-full"
            style={{
              background: 'linear-gradient(to right, #10B981, #22C55E, #F59E0B, #EF4444, #DC2626)'
            }}
          />
          
          {/* Progress Indicator */}
          <motion.div
            className="absolute top-0 right-0 h-full bg-black bg-opacity-30 rounded-full"
            animate={{ width: `${100 - value}%` }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          />
        </div>

        {/* Slider Handle */}
        <motion.div
          className="absolute top-1/2 -translate-y-1/2 w-8 h-8 rounded-full cursor-grab active:cursor-grabbing"
          style={{
            left: `calc(${value}% - 16px)`,
            backgroundColor: currentRisk.color,
            boxShadow: `0 0 20px ${currentRisk.color}40`
          }}
          animate={{ 
            scale: isDragging ? 1.3 : 1,
            boxShadow: isDragging 
              ? `0 0 30px ${currentRisk.color}60` 
              : `0 0 20px ${currentRisk.color}40`
          }}
          whileTap={{ scale: 1.4 }}
          onPanStart={() => setIsDragging(true)}
          onPanEnd={() => setIsDragging(false)}
          onPan={(_, info) => {
            const slider = document.querySelector('.risk-slider-track');
            if (slider) {
              const rect = slider.getBoundingClientRect();
              const percentage = Math.max(0, Math.min(100, 
                ((info.point.x - rect.left) / rect.width) * 100
              ));
              onChange(Math.round(percentage));
            }
          }}
        >
          {/* Handle Glow */}
          <div 
            className="absolute inset-0 rounded-full blur-sm opacity-50"
            style={{ backgroundColor: currentRisk.color }}
          />
        </motion.div>

        {/* Risk Level Markers */}
        <div className="mt-8 flex justify-between text-sm">
          {riskLevels.map((risk, index) => (
            <motion.button
              key={risk.value}
              onClick={() => onChange(risk.value)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className={`
                flex flex-col items-center p-2 rounded-lg transition-all
                ${Math.abs(value - risk.value) < 15 
                  ? 'text-white bg-white bg-opacity-10' 
                  : 'text-textSecondary hover:text-white hover:bg-white hover:bg-opacity-5'
                }
              `}
            >
              <div 
                className="w-3 h-3 rounded-full mb-2"
                style={{ backgroundColor: risk.color }}
              />
              <span className="font-medium">{risk.label}</span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Hidden track element for pan detection */}
      <div 
        className="risk-slider-track absolute inset-0 cursor-pointer"
        style={{ top: '-20px', bottom: '-20px' }}
        onClick={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          const percentage = ((e.clientX - rect.left) / rect.width) * 100;
          onChange(Math.max(0, Math.min(100, Math.round(percentage))));
        }}
      />
    </div>
  );
};

RiskSlider.propTypes = {
  value: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  className: PropTypes.string
};

export default RiskSlider;