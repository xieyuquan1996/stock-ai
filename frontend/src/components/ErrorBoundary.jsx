import { Component } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';
import GlowCard from './GlowCard';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
  };

  handleGoHome = () => {
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-background flex items-center justify-center px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <GlowCard variant="gradient" className="p-8 max-w-lg text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="mb-6"
              >
                <div className="w-16 h-16 bg-danger bg-opacity-20 rounded-full flex items-center justify-center mx-auto">
                  <AlertTriangle className="text-danger" size={32} />
                </div>
              </motion.div>

              <h1 className="text-2xl font-bold mb-4 text-gradient">
                系统遇到了问题
              </h1>
              
              <p className="text-textSecondary mb-6">
                很抱歉，AI股票系统遇到了意外错误。我们的团队会尽快修复这个问题。
              </p>

              <div className="space-y-4">
                <motion.button
                  onClick={this.handleRetry}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="primary-button flex items-center gap-2 w-full justify-center"
                >
                  <RefreshCw size={20} />
                  重试
                </motion.button>

                <motion.button
                  onClick={this.handleGoHome}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="secondary-button flex items-center gap-2 w-full justify-center"
                >
                  <Home size={20} />
                  返回首页
                </motion.button>
              </div>

              {/* Error Details (only in development) */}
              {process.env.NODE_ENV === 'development' && this.state.error && (
                <motion.details
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="mt-6 text-left"
                >
                  <summary className="cursor-pointer text-textSecondary text-sm mb-2">
                    错误详情
                  </summary>
                  <div className="glass-card p-4 bg-danger bg-opacity-10 text-xs">
                    <div className="text-danger font-mono mb-2">
                      {this.state.error && this.state.error.toString()}
                    </div>
                    <div className="text-textSecondary font-mono whitespace-pre-wrap">
                      {this.state.errorInfo.componentStack}
                    </div>
                  </div>
                </motion.details>
              )}
            </GlowCard>
          </motion.div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;