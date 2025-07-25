import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const AnimatedNumber = ({ 
  value, 
  duration = 1000, 
  decimals = 0, 
  prefix = '', 
  suffix = '',
  className = ''
}) => {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const startValue = displayValue;
    const endValue = value;
    const startTime = Date.now();
    
    const animate = () => {
      const now = Date.now();
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function (ease-out)
      const easeOut = 1 - Math.pow(1 - progress, 3);
      
      const currentValue = startValue + (endValue - startValue) * easeOut;
      setDisplayValue(currentValue);
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    
    animate();
  }, [value, duration, displayValue]);

  const formatNumber = (num) => {
    if (decimals === 0) {
      return Math.round(num).toLocaleString();
    }
    return num.toFixed(decimals);
  };

  return (
    <span className={`font-mono ${className}`}>
      {prefix}{formatNumber(displayValue)}{suffix}
    </span>
  );
};

AnimatedNumber.propTypes = {
  value: PropTypes.number.isRequired,
  duration: PropTypes.number,
  decimals: PropTypes.number,
  prefix: PropTypes.string,
  suffix: PropTypes.string,
  className: PropTypes.string
};

export default AnimatedNumber;