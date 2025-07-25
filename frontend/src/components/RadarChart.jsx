import { useMemo } from 'react';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';

const RadarChart = ({ data, size = 300, className = '' }) => {
  const center = size / 2;
  const radius = size / 2 - 40;
  const angleSlice = (Math.PI * 2) / data.length;

  const pathData = useMemo(() => {
    let path = '';
    data.forEach((item, index) => {
      const angle = angleSlice * index - Math.PI / 2;
      const x = center + Math.cos(angle) * (radius * item.value / 100);
      const y = center + Math.sin(angle) * (radius * item.value / 100);
      
      if (index === 0) {
        path += `M ${x} ${y}`;
      } else {
        path += ` L ${x} ${y}`;
      }
    });
    path += ' Z';
    return path;
  }, [data, center, radius, angleSlice]);

  const gridLevels = [20, 40, 60, 80, 100];

  return (
    <div className={`relative ${className}`}>
      <svg width={size} height={size} className="overflow-visible">
        {/* Grid Lines */}
        {gridLevels.map((level, index) => {
          const gridRadius = (radius * level) / 100;
          let gridPath = '';
          
          data.forEach((_, i) => {
            const angle = angleSlice * i - Math.PI / 2;
            const x = center + Math.cos(angle) * gridRadius;
            const y = center + Math.sin(angle) * gridRadius;
            
            if (i === 0) {
              gridPath += `M ${x} ${y}`;
            } else {
              gridPath += ` L ${x} ${y}`;
            }
          });
          gridPath += ' Z';

          return (
            <motion.path
              key={level}
              d={gridPath}
              fill="none"
              stroke="rgba(255, 255, 255, 0.1)"
              strokeWidth="1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.1 }}
            />
          );
        })}

        {/* Axis Lines */}
        {data.map((_, index) => {
          const angle = angleSlice * index - Math.PI / 2;
          const x = center + Math.cos(angle) * radius;
          const y = center + Math.sin(angle) * radius;

          return (
            <motion.line
              key={index}
              x1={center}
              y1={center}
              x2={x}
              y2={y}
              stroke="rgba(255, 255, 255, 0.1)"
              strokeWidth="1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 + index * 0.05 }}
            />
          );
        })}

        {/* Data Area */}
        <motion.path
          d={pathData}
          fill="url(#radarGradient)"
          stroke="#00D9FF"
          strokeWidth="2"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
          style={{ transformOrigin: `${center}px ${center}px` }}
        />

        {/* Data Points */}
        {data.map((item, index) => {
          const angle = angleSlice * index - Math.PI / 2;
          const x = center + Math.cos(angle) * (radius * item.value / 100);
          const y = center + Math.sin(angle) * (radius * item.value / 100);

          return (
            <motion.circle
              key={index}
              cx={x}
              cy={y}
              r="4"
              fill="#00D9FF"
              stroke="#ffffff"
              strokeWidth="2"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.7 + index * 0.1 }}
              whileHover={{ scale: 1.5 }}
              className="cursor-pointer"
            >
              <title>{item.label}: {item.value}%</title>
            </motion.circle>
          );
        })}

        {/* Gradient Definition */}
        <defs>
          <radialGradient id="radarGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#00D9FF" stopOpacity="0.3" />
            <stop offset="50%" stopColor="#7C3AED" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#00D9FF" stopOpacity="0.1" />
          </radialGradient>
        </defs>
      </svg>

      {/* Labels */}
      {data.map((item, index) => {
        const angle = angleSlice * index - Math.PI / 2;
        const labelRadius = radius + 25;
        const x = center + Math.cos(angle) * labelRadius;
        const y = center + Math.sin(angle) * labelRadius;

        return (
          <motion.div
            key={index}
            className="absolute text-sm font-medium text-white"
            style={{
              left: x - 30,
              top: y - 10,
              width: 60,
              textAlign: 'center'
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8 + index * 0.1 }}
          >
            <div className="text-textSecondary text-xs mb-1">{item.label}</div>
            <div className="text-primary font-bold">{item.value}%</div>
          </motion.div>
        );
      })}
    </div>
  );
};

RadarChart.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.number.isRequired
    })
  ).isRequired,
  size: PropTypes.number,
  className: PropTypes.string
};

export default RadarChart;