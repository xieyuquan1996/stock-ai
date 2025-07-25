import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Upload, FileSpreadsheet, Camera, Trash2, Save } from 'lucide-react';
import GlowCard from './GlowCard';
import AIThinking from './AIThinking';
import usePortfolioStore from '../store/portfolioStore';

const PortfolioInput = () => {
  const [holdings, setHoldings] = useState([
    { id: 1, code: '', name: '', quantity: '', costPrice: '', currentPrice: '' }
  ]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);

  const addHolding = () => {
    const newHolding = {
      id: Date.now(),
      code: '',
      name: '',
      quantity: '',
      costPrice: '',
      currentPrice: ''
    };
    setHoldings([...holdings, newHolding]);
  };

  const removeHolding = (id) => {
    if (holdings.length > 1) {
      setHoldings(holdings.filter(holding => holding.id !== id));
    }
  };

  const updateHolding = (id, field, value) => {
    setHoldings(holdings.map(holding => 
      holding.id === id ? { ...holding, [field]: value } : holding
    ));
  };

  const handleAnalyze = () => {
    const filledHoldings = holdings.filter(h => h.code && h.quantity && h.costPrice);
    if (filledHoldings.length === 0) return;

    setIsAnalyzing(true);
    setAnalysisProgress(0);

    const progressInterval = setInterval(() => {
      setAnalysisProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setIsAnalyzing(false);
          return 100;
        }
        return Math.min(prev + Math.random() * 10, 100);
      });
    }, 300);
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      // 模拟文件处理
      console.log('文件上传:', file.name);
    }
  };

  if (isAnalyzing) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <AIThinking 
          progress={analysisProgress}
          keywords={[
            '获取实时股价数据',
            '分析持仓结构',
            '计算风险指标',
            '评估组合健康度',
            '生成优化建议'
          ]}
          status="analyzing"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold mb-4 text-gradient">
            AI 持仓诊断
          </h1>
          <p className="text-textSecondary text-lg">
            输入您的持仓信息，AI 将为您分析投资组合健康度
          </p>
        </motion.div>

        {/* Input Methods */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <GlowCard variant="gradient" className="p-6 text-center cursor-pointer hover:border-primary border-opacity-30 transition-all">
            <div className="flex flex-col items-center">
              <div className="p-4 bg-primary bg-opacity-20 rounded-2xl mb-4">
                <FileSpreadsheet className="text-primary" size={32} />
              </div>
              <h3 className="font-semibold mb-2">手动输入</h3>
              <p className="text-textSecondary text-sm">直接在表格中输入持仓信息</p>
            </div>
          </GlowCard>

          <GlowCard variant="gradient" className="p-6 text-center cursor-pointer hover:border-secondary border-opacity-30 transition-all">
            <input
              type="file"
              id="file-upload"
              accept=".xlsx,.xls,.csv"
              onChange={handleFileUpload}
              className="hidden"
            />
            <label htmlFor="file-upload" className="flex flex-col items-center cursor-pointer">
              <div className="p-4 bg-secondary bg-opacity-20 rounded-2xl mb-4">
                <Upload className="text-secondary" size={32} />
              </div>
              <h3 className="font-semibold mb-2">导入文件</h3>
              <p className="text-textSecondary text-sm">支持 Excel/CSV 格式</p>
            </label>
          </GlowCard>

          <GlowCard variant="gradient" className="p-6 text-center cursor-pointer hover:border-success border-opacity-30 transition-all">
            <div className="flex flex-col items-center">
              <div className="p-4 bg-success bg-opacity-20 rounded-2xl mb-4">
                <Camera className="text-success" size={32} />
              </div>
              <h3 className="font-semibold mb-2">截图识别</h3>
              <p className="text-textSecondary text-sm">上传持仓截图自动识别</p>
            </div>
          </GlowCard>
        </div>

        {/* Holdings Table */}
        <GlowCard variant="gradient" className="p-6 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold">持仓明细</h3>
            <motion.button
              onClick={addHolding}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="secondary-button flex items-center gap-2 px-4 py-2"
            >
              <Plus size={16} />
              添加持仓
            </motion.button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white border-opacity-10">
                  <th className="text-left py-3 px-4 text-textSecondary">股票代码</th>
                  <th className="text-left py-3 px-4 text-textSecondary">股票名称</th>
                  <th className="text-left py-3 px-4 text-textSecondary">持仓数量</th>
                  <th className="text-left py-3 px-4 text-textSecondary">成本价格</th>
                  <th className="text-left py-3 px-4 text-textSecondary">当前价格</th>
                  <th className="text-left py-3 px-4 text-textSecondary">操作</th>
                </tr>
              </thead>
              <tbody>
                <AnimatePresence>
                  {holdings.map((holding, index) => (
                    <motion.tr
                      key={holding.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ delay: index * 0.1 }}
                      className="border-b border-white border-opacity-5"
                    >
                      <td className="py-3 px-4">
                        <input
                          type="text"
                          placeholder="000001"
                          value={holding.code}
                          onChange={(e) => updateHolding(holding.id, 'code', e.target.value)}
                          className="w-full glass-card px-3 py-2 bg-transparent border-white border-opacity-20 focus:border-primary focus:outline-none text-white"
                        />
                      </td>
                      <td className="py-3 px-4">
                        <input
                          type="text"
                          placeholder="平安银行"
                          value={holding.name}
                          onChange={(e) => updateHolding(holding.id, 'name', e.target.value)}
                          className="w-full glass-card px-3 py-2 bg-transparent border-white border-opacity-20 focus:border-primary focus:outline-none text-white"
                        />
                      </td>
                      <td className="py-3 px-4">
                        <input
                          type="number"
                          placeholder="1000"
                          value={holding.quantity}
                          onChange={(e) => updateHolding(holding.id, 'quantity', e.target.value)}
                          className="w-full glass-card px-3 py-2 bg-transparent border-white border-opacity-20 focus:border-primary focus:outline-none text-white"
                        />
                      </td>
                      <td className="py-3 px-4">
                        <input
                          type="number"
                          step="0.01"
                          placeholder="12.50"
                          value={holding.costPrice}
                          onChange={(e) => updateHolding(holding.id, 'costPrice', e.target.value)}
                          className="w-full glass-card px-3 py-2 bg-transparent border-white border-opacity-20 focus:border-primary focus:outline-none text-white"
                        />
                      </td>
                      <td className="py-3 px-4">
                        <input
                          type="number"
                          step="0.01"
                          placeholder="13.25"
                          value={holding.currentPrice}
                          onChange={(e) => updateHolding(holding.id, 'currentPrice', e.target.value)}
                          className="w-full glass-card px-3 py-2 bg-transparent border-white border-opacity-20 focus:border-primary focus:outline-none text-white"
                        />
                      </td>
                      <td className="py-3 px-4">
                        <motion.button
                          onClick={() => removeHolding(holding.id)}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          disabled={holdings.length === 1}
                          className={`p-2 rounded-lg transition-all ${
                            holdings.length === 1 
                              ? 'text-textSecondary cursor-not-allowed' 
                              : 'text-danger hover:bg-danger hover:bg-opacity-20'
                          }`}
                        >
                          <Trash2 size={16} />
                        </motion.button>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
        </GlowCard>

        {/* Action Buttons */}
        <div className="flex justify-center gap-6">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="secondary-button flex items-center gap-2 px-8 py-3"
          >
            <Save size={20} />
            保存持仓
          </motion.button>

          <motion.button
            onClick={handleAnalyze}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="primary-button flex items-center gap-2 px-8 py-3"
          >
            <motion.div
              animate={{ rotate: isAnalyzing ? 360 : 0 }}
              transition={{ duration: 1, repeat: isAnalyzing ? Infinity : 0 }}
            >
              💎
            </motion.div>
            开始诊断
          </motion.button>
        </div>

        {/* Helper Text */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center mt-8"
        >
          <p className="text-textSecondary text-sm">
            💡 提示：股票代码、持仓数量和成本价格为必填项，当前价格可自动获取
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default PortfolioInput;