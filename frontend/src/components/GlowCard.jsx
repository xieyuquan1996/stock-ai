import { motion } from 'framer-motion';
import PropTypes from 'prop-types';

const GlowCard = ({ 
  children, 
  delay = 0, 
  className = '',
  hoverable = true,
  glowEffect = false,
  variant = 'default',
  onClick = null
}) => {
  const baseVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { 
        duration: 0.5, 
        delay,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  const hoverVariants = hoverable ? {
    scale: 1.02,
    transition: { duration: 0.2 }
  } : {};

  const cardClasses = {
    default: 'glass-card',
    hover: 'glass-card-hover',
    gradient: 'glass-card bg-gradient-to-br from-primary from-opacity-10 to-secondary to-opacity-10',
    neon: 'glass-card border-primary border-opacity-30'
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      whileHover={hoverVariants}
      variants={baseVariants}
      onClick={onClick}
      className={`
        ${cardClasses[variant]} 
        ${glowEffect ? 'glow-effect' : ''} 
        ${className}
        relative overflow-hidden
        ${onClick ? 'cursor-pointer' : ''}
      `}
    >
      {glowEffect && (
        <div className="absolute inset-0 bg-gradient-to-r from-primary from-opacity-20 via-secondary via-opacity-20 to-primary to-opacity-20 opacity-0 hover:opacity-100 transition-opacity duration-500" />
      )}
      
      <div className="relative z-10">
        {children}
      </div>
      
      {/* Glow background effect */}
      {glowEffect && (
        <div className="card-glow absolute -inset-1 bg-gradient-to-r from-primary to-secondary opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-20" />
      )}
    </motion.div>
  );
};

GlowCard.propTypes = {
  children: PropTypes.node.isRequired,
  delay: PropTypes.number,
  className: PropTypes.string,
  hoverable: PropTypes.bool,
  glowEffect: PropTypes.bool,
  variant: PropTypes.oneOf(['default', 'hover', 'gradient', 'neon']),
  onClick: PropTypes.func
};

export default GlowCard;