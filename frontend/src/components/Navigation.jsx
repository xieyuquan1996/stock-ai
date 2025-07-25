import { useState } from 'react';
import { motion } from 'framer-motion';
import { Brain, TrendingUp, MessageSquare, Home, Menu, X, Shield } from 'lucide-react';
import PropTypes from 'prop-types';

const Navigation = ({ currentPage, onPageChange }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: '首页', icon: Home },
    { id: 'portfolio-diagnosis', label: '持仓诊断', icon: Brain },
    { id: 'position-management', label: '仓位管理', icon: TrendingUp },
    { id: 'risk-alert', label: '风险预警', icon: Shield },
    { id: 'ai-advisor', label: 'AI顾问', icon: MessageSquare }
  ];

  const handleNavClick = (itemId) => {
    onPageChange(itemId);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Desktop Navigation */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-white border-opacity-10"
      >
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-3 cursor-pointer"
              onClick={() => handleNavClick('home')}
            >
              <div className="w-10 h-10 bg-gradient-to-r from-primary to-secondary rounded-lg flex items-center justify-center">
                <Brain size={24} className="text-white" />
              </div>
              <span className="text-2xl font-bold text-gradient">StockAI</span>
            </motion.div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-8">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentPage === item.id;
                
                return (
                  <motion.button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`
                      flex items-center gap-2 px-4 py-2 rounded-lg transition-all
                      ${isActive 
                        ? 'bg-primary bg-opacity-20 text-primary border border-primary border-opacity-30' 
                        : 'text-textSecondary hover:text-white hover:bg-white hover:bg-opacity-10'
                      }
                    `}
                  >
                    <Icon size={18} />
                    <span className="font-medium">{item.label}</span>
                  </motion.button>
                );
              })}
            </div>

            {/* Profile */}
            <div className="hidden md:flex items-center gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="secondary-button px-4 py-2"
              >
                登录
              </motion.button>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="w-10 h-10 bg-gradient-to-r from-secondary to-primary rounded-full flex items-center justify-center cursor-pointer"
              >
                <span className="text-white font-semibold">U</span>
              </motion.div>
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              whileTap={{ scale: 0.95 }}
              className="md:hidden p-2 text-textSecondary hover:text-white"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <motion.div
        initial={{ opacity: 0, x: '100%' }}
        animate={{ 
          opacity: isMobileMenuOpen ? 1 : 0,
          x: isMobileMenuOpen ? 0 : '100%'
        }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className={`
          fixed top-0 right-0 bottom-0 w-80 z-40 glass-card border-l border-white border-opacity-10
          md:hidden ${isMobileMenuOpen ? 'pointer-events-auto' : 'pointer-events-none'}
        `}
      >
        <div className="p-6 pt-20">
          {/* Mobile Navigation Items */}
          <div className="space-y-4 mb-8">
            {navItems.map((item, index) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;
              
              return (
                <motion.button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ 
                    opacity: isMobileMenuOpen ? 1 : 0,
                    x: isMobileMenuOpen ? 0 : 50
                  }}
                  transition={{ delay: index * 0.1 }}
                  whileTap={{ scale: 0.95 }}
                  className={`
                    w-full flex items-center gap-4 px-4 py-3 rounded-lg transition-all
                    ${isActive 
                      ? 'bg-primary bg-opacity-20 text-primary border border-primary border-opacity-30' 
                      : 'text-textSecondary hover:text-white hover:bg-white hover:bg-opacity-10'
                    }
                  `}
                >
                  <Icon size={20} />
                  <span className="font-medium">{item.label}</span>
                </motion.button>
              );
            })}
          </div>

          {/* Mobile Profile Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ 
              opacity: isMobileMenuOpen ? 1 : 0,
              y: isMobileMenuOpen ? 0 : 20
            }}
            transition={{ delay: 0.3 }}
            className="border-t border-white border-opacity-10 pt-6"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-secondary to-primary rounded-full flex items-center justify-center">
                <span className="text-white font-semibold text-lg">U</span>
              </div>
              <div>
                <div className="text-white font-semibold">用户名</div>
                <div className="text-textSecondary text-sm">user@example.com</div>
              </div>
            </div>
            <motion.button
              whileTap={{ scale: 0.95 }}
              className="w-full primary-button py-3"
            >
              登录 / 注册
            </motion.button>
          </motion.div>
        </div>
      </motion.div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsMobileMenuOpen(false)}
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
        />
      )}
    </>
  );
};

Navigation.propTypes = {
  currentPage: PropTypes.string.isRequired,
  onPageChange: PropTypes.func.isRequired
};

export default Navigation;