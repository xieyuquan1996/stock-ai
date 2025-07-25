import { motion } from 'framer-motion';
import PropTypes from 'prop-types';

const GaugeChart = ({ 
  value, 
  min = 0, 
  max = 100, 
  title = '', 
  unit = '',
  size = 200,
  className = '' 
}) => {
  const radius = size / 2 - 20;
  const center = size / 2;
  const startAngle = -Math.PI * 0.75; // -135 degrees
  const endAngle = Math.PI * 0.75;    // 135 degrees
  const totalAngle = endAngle - startAngle;
  
  const normalizedValue = Math.max(min, Math.min(max, value));
  const percentage = (normalizedValue - min) / (max - min);
  const currentAngle = startAngle + (totalAngle * percentage);

  // Create path for background arc
  const createArcPath = (startA, endA, r) => {
    const x1 = center + Math.cos(startA) * r;
    const y1 = center + Math.sin(startA) * r;
    const x2 = center + Math.cos(endA) * r;
    const y2 = center + Math.sin(endA) * r;
    const largeArc = endA - startA > Math.PI ? 1 : 0;
    
    return `M ${x1} ${y1} A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2}`;
  };

  // Color based on value
  const getColor = (val) => {
    const normalizedVal = val / max;
    if (normalizedVal < 0.3) return '#10B981'; // Green
    if (normalizedVal < 0.6) return '#F59E0B'; // Yellow
    if (normalizedVal < 0.8) return '#EF4444'; // Orange
    return '#DC2626'; // Red
  };

  const color = getColor(normalizedValue);

  // Tick marks
  const ticks = [];
  const tickCount = 5;
  for (let i = 0; i <= tickCount; i++) {
    const tickAngle = startAngle + (totalAngle * i / tickCount);
    const tickValue = min + ((max - min) * i / tickCount);
    const innerRadius = radius - 10;
    const outerRadius = radius;
    
    const x1 = center + Math.cos(tickAngle) * innerRadius;
    const y1 = center + Math.sin(tickAngle) * innerRadius;
    const x2 = center + Math.cos(tickAngle) * outerRadius;
    const y2 = center + Math.sin(tickAngle) * outerRadius;
    
    // Label position
    const labelRadius = radius - 25;
    const labelX = center + Math.cos(tickAngle) * labelRadius;
    const labelY = center + Math.sin(tickAngle) * labelRadius;
    
    ticks.push({
      id: i,
      x1, y1, x2, y2,
      labelX, labelY,
      value: Math.round(tickValue)
    });
  }

  return (
    <div className={`relative flex flex-col items-center ${className}`}>
      <svg width={size} height={size * 0.7} className="overflow-visible">
        {/* Background Arc */}
        <motion.path
          d={createArcPath(startAngle, endAngle, radius)}
          fill="none"
          stroke="rgba(255, 255, 255, 0.1)"
          strokeWidth="8"
          strokeLinecap="round"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        />

        {/* Value Arc */}
        <motion.path
          d={createArcPath(startAngle, currentAngle, radius)}
          fill="none"
          stroke={color}
          strokeWidth="8"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
          style={{
            filter: `drop-shadow(0 0 10px ${color}40)`
          }}
        />

        {/* Tick marks */}
        {ticks.map((tick) => (
          <g key={tick.id}>
            <motion.line
              x1={tick.x1}
              y1={tick.y1}
              x2={tick.x2}
              y2={tick.y2}
              stroke="rgba(255, 255, 255, 0.3)"
              strokeWidth="2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 + tick.id * 0.1 }}
            />
            <motion.text
              x={tick.labelX}
              y={tick.labelY}
              textAnchor="middle"
              dominantBaseline="middle"
              className="text-xs fill-textSecondary"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 + tick.id * 0.1 }}
            >
              {tick.value}
            </motion.text>
          </g>
        ))}

        {/* Needle */}
        <motion.g
          initial={{ rotate: startAngle * (180 / Math.PI) }}
          animate={{ rotate: currentAngle * (180 / Math.PI) }}
          transition={{ duration: 1.5, ease: "easeOut", delay: 0.8 }}
          style={{ transformOrigin: `${center}px ${center}px` }}
        >
          {/* Needle line */}
          <line
            x1={center}
            y1={center}
            x2={center}
            y2={center - radius + 15}
            stroke={color}
            strokeWidth="3"
            strokeLinecap="round"
          />
          
          {/* Needle center circle */}
          <circle
            cx={center}
            cy={center}
            r="6"
            fill={color}
            stroke="#ffffff"
            strokeWidth="2"
          />
        </motion.g>

        {/* Glow effect for needle */}
        <motion.circle
          cx={center}
          cy={center}
          r="8"
          fill="none"
          stroke={color}
          strokeWidth="1"
          opacity="0.3"
          initial={{ scale: 0 }}
          animate={{ scale: [1, 1.5, 1] }}
          transition={{ 
            duration: 2, 
            repeat: Infinity,
            delay: 1.5
          }}
        />
      </svg>

      {/* Value Display */}
      <motion.div
        className="text-center mt-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
      >
        <div className="text-3xl font-bold" style={{ color }}>
          {normalizedValue.toFixed(1)}{unit}
        </div>
        {title && (
          <div className="text-textSecondary text-sm mt-1">
            {title}
          </div>
        )}
      </motion.div>
    </div>
  );
};

GaugeChart.propTypes = {
  value: PropTypes.number.isRequired,
  min: PropTypes.number,
  max: PropTypes.number,
  title: PropTypes.string,
  unit: PropTypes.string,
  size: PropTypes.number,
  className: PropTypes.string
};

export default GaugeChart;