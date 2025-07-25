import { motion } from 'framer-motion';
import PropTypes from 'prop-types';

const TrendChart = ({ 
  data, 
  width = 400, 
  height = 200, 
  color = '#00D9FF',
  showGrid = true,
  showArea = true,
  className = '' 
}) => {
  if (!data || data.length === 0) return null;

  const padding = 20;
  const chartWidth = width - padding * 2;
  const chartHeight = height - padding * 2;

  // Find min/max values
  const values = data.map(d => d.value);
  const minValue = Math.min(...values);
  const maxValue = Math.max(...values);
  const valueRange = maxValue - minValue || 1;

  // Create path points
  const points = data.map((item, index) => ({
    x: padding + (index / (data.length - 1)) * chartWidth,
    y: padding + ((maxValue - item.value) / valueRange) * chartHeight,
    value: item.value,
    label: item.label
  }));

  // Create SVG path
  const pathData = points.reduce((path, point, index) => {
    const command = index === 0 ? 'M' : 'L';
    return `${path} ${command} ${point.x} ${point.y}`;
  }, '');

  // Create area path
  const areaPath = showArea ? 
    `${pathData} L ${points[points.length - 1].x} ${height - padding} L ${padding} ${height - padding} Z` 
    : '';

  // Grid lines
  const gridLines = [];
  if (showGrid) {
    // Horizontal grid lines
    for (let i = 0; i <= 4; i++) {
      const y = padding + (i / 4) * chartHeight;
      gridLines.push(
        <motion.line
          key={`h-${i}`}
          x1={padding}
          y1={y}
          x2={width - padding}
          y2={y}
          stroke="rgba(255, 255, 255, 0.1)"
          strokeWidth="1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: i * 0.1 }}
        />
      );
    }

    // Vertical grid lines
    for (let i = 0; i <= 4; i++) {
      const x = padding + (i / 4) * chartWidth;
      gridLines.push(
        <motion.line
          key={`v-${i}`}
          x1={x}
          y1={padding}
          x2={x}
          y2={height - padding}
          stroke="rgba(255, 255, 255, 0.1)"
          strokeWidth="1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 + i * 0.1 }}
        />
      );
    }
  }

  return (
    <div className={`relative ${className}`}>
      <svg width={width} height={height} className="overflow-visible">
        {/* Grid */}
        {gridLines}

        {/* Area fill */}
        {showArea && areaPath && (
          <motion.path
            d={areaPath}
            fill={`url(#trendGradient-${color.replace('#', '')})`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          />
        )}

        {/* Trend line */}
        <motion.path
          d={pathData}
          fill="none"
          stroke={color}
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ delay: 0.3, duration: 1.5, ease: "easeOut" }}
          style={{
            filter: `drop-shadow(0 0 8px ${color}40)`
          }}
        />

        {/* Data points */}
        {points.map((point, index) => (
          <motion.g key={index}>
            <motion.circle
              cx={point.x}
              cy={point.y}
              r="4"
              fill={color}
              stroke="#ffffff"
              strokeWidth="2"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.8 + index * 0.1 }}
              whileHover={{ scale: 1.5, r: 6 }}
              className="cursor-pointer"
            />
            
            {/* Hover tooltip */}
            <motion.g
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              className="pointer-events-none"
            >
              <rect
                x={point.x - 25}
                y={point.y - 35}
                width="50"
                height="25"
                fill="rgba(0, 0, 0, 0.8)"
                rx="4"
              />
              <text
                x={point.x}
                y={point.y - 20}
                textAnchor="middle"
                className="text-xs fill-white"
              >
                {point.value}
              </text>
            </motion.g>
          </motion.g>
        ))}

        {/* Gradient definitions */}
        <defs>
          <linearGradient 
            id={`trendGradient-${color.replace('#', '')}`}
            x1="0%" 
            y1="0%" 
            x2="0%" 
            y2="100%"
          >
            <stop offset="0%" stopColor={color} stopOpacity="0.3" />
            <stop offset="100%" stopColor={color} stopOpacity="0.05" />
          </linearGradient>
        </defs>
      </svg>

      {/* X-axis labels */}
      <div className="flex justify-between mt-2 px-5">
        {data.map((item, index) => (
          <motion.div
            key={index}
            className="text-xs text-textSecondary"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 + index * 0.1 }}
          >
            {item.label}
          </motion.div>
        ))}
      </div>

      {/* Y-axis labels */}
      <div className="absolute left-0 top-0 h-full flex flex-col justify-between py-5">
        {Array.from({ length: 5 }, (_, i) => {
          const value = maxValue - (i * valueRange / 4);
          return (
            <motion.div
              key={i}
              className="text-xs text-textSecondary -translate-x-full pr-2"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + i * 0.1 }}
            >
              {value.toFixed(1)}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

TrendChart.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.number.isRequired
    })
  ).isRequired,
  width: PropTypes.number,
  height: PropTypes.number,
  color: PropTypes.string,
  showGrid: PropTypes.bool,
  showArea: PropTypes.bool,
  className: PropTypes.string
};

export default TrendChart;