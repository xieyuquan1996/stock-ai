import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import PropTypes from 'prop-types';

const StepIndicator = ({ steps, currentStep, className = '' }) => {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      {steps.map((step, index) => {
        const isCompleted = index < currentStep;
        const isCurrent = index === currentStep;
        const isUpcoming = index > currentStep;

        return (
          <div key={step.id} className="flex items-center">
            {/* Step Circle */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0.5 }}
              animate={{ 
                scale: isCurrent ? 1.2 : 1,
                opacity: isUpcoming ? 0.4 : 1
              }}
              transition={{ duration: 0.3 }}
              className={`
                relative w-12 h-12 rounded-full flex items-center justify-center
                border-2 transition-all duration-300
                ${
                  isCompleted
                    ? 'bg-success border-success text-white'
                    : isCurrent
                    ? 'bg-primary bg-opacity-20 border-primary text-primary'
                    : 'bg-surface border-textSecondary border-opacity-30 text-textSecondary'
                }
              `}
            >
              {isCompleted ? (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <Check size={20} />
                </motion.div>
              ) : (
                <span className="font-bold">{index + 1}</span>
              )}

              {/* Glow Effect for Current Step */}
              {isCurrent && (
                <motion.div
                  className="absolute inset-0 rounded-full bg-primary bg-opacity-30 blur-md"
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              )}
            </motion.div>

            {/* Step Label */}
            <div className="ml-3 mr-8">
              <motion.div
                animate={{ 
                  color: isCurrent ? '#00D9FF' : isCompleted ? '#10B981' : '#A1A1AA'
                }}
                className="font-medium transition-colors duration-300"
              >
                {step.title}
              </motion.div>
              <motion.div
                animate={{ opacity: isCurrent ? 1 : 0.6 }}
                className="text-sm text-textSecondary"
              >
                {step.description}
              </motion.div>
            </div>

            {/* Connector Line */}
            {index < steps.length - 1 && (
              <div className="relative">
                <div className="w-20 h-0.5 bg-textSecondary bg-opacity-20" />
                <motion.div
                  className="absolute top-0 left-0 h-0.5 bg-gradient-to-r from-primary to-success"
                  initial={{ width: 0 }}
                  animate={{ 
                    width: isCompleted ? '100%' : isCurrent ? '50%' : '0%'
                  }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

StepIndicator.propTypes = {
  steps: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired
    })
  ).isRequired,
  currentStep: PropTypes.number.isRequired,
  className: PropTypes.string
};

export default StepIndicator;