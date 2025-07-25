import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Send, 
  Mic, 
  Download, 
  Heart, 
  Bot, 
  User,
  TrendingUp,
  PieChart,
  Target,
  AlertCircle,
  Lightbulb,
  BarChart3
} from 'lucide-react';
import GlowCard from './GlowCard';

const AIChat = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'ai',
      content: '您好！我是您的AI持仓顾问。基于您的实际持仓情况，我可以帮您分析持仓健康度、提供加仓减仓建议、预警风险信号。请问今天有什么持仓问题需要咨询的吗？',
      timestamp: new Date().toLocaleTimeString(),
      avatar: Bot
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const quickQuestions = [
    { id: 1, text: '我该减仓吗？', icon: TrendingUp },
    { id: 2, text: '这个位置能加仓吗？', icon: PieChart },
    { id: 3, text: '帮我优化持仓结构', icon: Target },
    { id: 4, text: '最近有什么风险？', icon: AlertCircle },
    { id: 5, text: '我的仓位配置合理吗？', icon: Lightbulb },
    { id: 6, text: '银行股还能持有吗？', icon: BarChart3 }
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date().toLocaleTimeString(),
      avatar: User
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI thinking and response
    setTimeout(() => {
      const aiResponse = generateAIResponse(inputMessage);
      const aiMessage = {
        id: Date.now() + 1,
        type: 'ai',
        content: aiResponse,
        timestamp: new Date().toLocaleTimeString(),
        avatar: Bot
      };
      
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500 + Math.random() * 1000);
  };

  const generateAIResponse = (userInput) => {
    const responses = {
      '减仓': '基于当前市场环境，减仓需要考虑：1) 个股盈利情况 - 已达目标价位或技术压力的股票可以减仓；2) 仓位水平 - 如果满仓且缺乏现金应对调整，适当减仓是明智的；3) 板块轮动 - 热门板块过度拥挤时可以获利了结。建议您告诉我具体的持仓情况，我可以给出更精准的减仓建议。',
      '加仓': '加仓时机需要谨慎判断：1) 技术面 - 股价在重要支撑位获得支撑时；2) 基本面 - 公司业绩超预期或有利好催化剂；3) 估值 - 股价回调到合理估值区间；4) 仓位管理 - 确保有足够资金且不影响整体风险控制。请分享您想加仓的股票和当前持仓比例，我来帮您分析是否合适。',
      '持仓结构': '优化持仓结构的关键要素：1) 行业分散 - 避免过度集中在单一板块；2) 风险平衡 - 高风险高收益股票与稳健价值股合理搭配；3) 仓位控制 - 单一股票占比不宜过高；4) 流动性管理 - 保持一定现金仓位。建议您上传当前持仓信息，我可以为您制定个性化的优化方案。',
      '风险': '当前持仓可能面临的风险：1) 集中度风险 - 如果过度集中在某个板块或个股；2) 流动性风险 - 重仓小盘股或ST股票；3) 市场风险 - 整体市场调整的系统性风险；4) 个股风险 - 公司基本面恶化或黑天鹅事件。建议定期检查持仓健康度，及时调整风险敞口。',
      '仓位配置': '合理的仓位配置应该考虑：1) 股债比例 - 根据年龄和风险偏好确定；2) 行业分布 - 建议不超过30%集中在单一行业；3) 个股权重 - 单一股票占比控制在10%以内；4) 现金比例 - 保持10-20%现金应对机会和风险。请告诉我您的具体配置，我来帮您评估是否合理。',
      '银行股': '银行股的持有逻辑：1) 估值优势 - 普遍处于低估值状态，PB多在1倍以下；2) 分红稳定 - 年股息率通常在4-6%；3) 政策支持 - 金融强国战略下的政策倾斜；4) 但需关注净息差收窄压力。如果您持有银行股占比过高（>40%），建议适当分散到其他板块。'
    };

    for (const [key, response] of Object.entries(responses)) {
      if (userInput.includes(key)) {
        return response;
      }
    }

    return `基于您的持仓咨询"${userInput}"，我的建议如下：

1. **持仓分析** - 建议先上传您的具体持仓信息，我可以为您做全面的健康度诊断
2. **风险评估** - 分析当前持仓的集中度风险和个股风险状况
3. **优化建议** - 基于市场环境给出加仓、减仓或调仓的具体建议
4. **时机把握** - 结合技术面和基本面，提示最佳操作时点

您可以点击"持仓诊断"功能上传持仓信息，或者告诉我具体的股票代码和持仓情况，我会给出更精准的个性化建议。`;
  };

  const handleQuickQuestion = (question) => {
    setInputMessage(question);
    setTimeout(() => handleSendMessage(), 100);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    // Here you would implement voice recording functionality
  };

  const exportChat = () => {
    const chatContent = messages.map(msg => 
      `[${msg.timestamp}] ${msg.type === 'ai' ? 'AI助手' : '用户'}: ${msg.content}`
    ).join('\n\n');
    
    const blob = new Blob([chatContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `AI投资咨询_${new Date().toLocaleDateString()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const favoriteMessage = (messageId) => {
    setMessages(prev => prev.map(msg => 
      msg.id === messageId 
        ? { ...msg, isFavorited: !msg.isFavorited }
        : msg
    ));
  };

  return (
    <div className="min-h-screen py-12 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold mb-4 text-gradient">
            AI 持仓顾问
          </h1>
          <p className="text-textSecondary text-lg">
            基于您的实际持仓，获得个性化的投资建议和风险管理指导
          </p>
        </motion.div>

        {/* Chat Container */}
        <GlowCard variant="gradient" className="h-[600px] flex flex-col">
          {/* Chat Header */}
          <div className="flex items-center justify-between p-6 border-b border-white border-opacity-10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center">
                <Bot size={20} className="text-white" />
              </div>
              <div>
                <h3 className="font-semibold">AI 投资助手</h3>
                <div className="flex items-center gap-2 text-sm text-textSecondary">
                  <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                  在线
                </div>
              </div>
            </div>
            
            <motion.button
              onClick={exportChat}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="secondary-button flex items-center gap-2 px-4 py-2"
            >
              <Download size={16} />
              导出
            </motion.button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            <AnimatePresence>
              {messages.map((message) => {
                const Avatar = message.avatar;
                const isAI = message.type === 'ai';
                
                return (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -20, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    className={`flex gap-3 ${isAI ? '' : 'flex-row-reverse'}`}
                  >
                    {/* Avatar */}
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                      isAI 
                        ? 'bg-gradient-to-r from-primary to-secondary' 
                        : 'bg-gradient-to-r from-secondary to-primary'
                    }`}>
                      <Avatar size={20} className="text-white" />
                    </div>

                    {/* Message Content */}
                    <div className={`max-w-[70%] ${isAI ? '' : 'flex flex-col items-end'}`}>
                      <div className={`glass-card p-4 ${
                        isAI 
                          ? 'bg-white bg-opacity-5 border-white border-opacity-10' 
                          : 'bg-primary bg-opacity-10 border-primary border-opacity-20'
                      }`}>
                        <p className="text-white leading-relaxed whitespace-pre-wrap">
                          {message.content}
                        </p>
                      </div>
                      
                      {/* Message Footer */}
                      <div className={`flex items-center gap-2 mt-2 text-xs text-textSecondary ${
                        isAI ? '' : 'flex-row-reverse'
                      }`}>
                        <span>{message.timestamp}</span>
                        {isAI && (
                          <motion.button
                            onClick={() => favoriteMessage(message.id)}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className={`p-1 rounded-full transition-colors ${
                              message.isFavorited 
                                ? 'text-danger bg-danger bg-opacity-20' 
                                : 'text-textSecondary hover:text-danger hover:bg-danger hover:bg-opacity-10'
                            }`}
                          >
                            <Heart size={12} fill={message.isFavorited ? 'currentColor' : 'none'} />
                          </motion.button>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>

            {/* Typing Indicator */}
            <AnimatePresence>
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="flex gap-3"
                >
                  <div className="w-10 h-10 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center">
                    <Bot size={20} className="text-white" />
                  </div>
                  <div className="glass-card p-4 bg-white bg-opacity-5 border-white border-opacity-10">
                    <div className="flex items-center gap-1">
                      <div className="flex gap-1">
                        {[0, 1, 2].map((i) => (
                          <motion.div
                            key={i}
                            className="w-2 h-2 bg-primary rounded-full"
                            animate={{ 
                              scale: [1, 1.5, 1],
                              opacity: [0.5, 1, 0.5]
                            }}
                            transition={{
                              duration: 1,
                              repeat: Infinity,
                              delay: i * 0.2
                            }}
                          />
                        ))}
                      </div>
                      <span className="text-textSecondary text-sm ml-2">AI正在思考...</span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Questions */}
          {messages.length === 1 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="px-6 pb-4"
            >
              <div className="text-sm text-textSecondary mb-3">快速提问：</div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {quickQuestions.map((question) => {
                  const Icon = question.icon;
                  return (
                    <motion.button
                      key={question.id}
                      onClick={() => handleQuickQuestion(question.text)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="glass-card p-3 text-left hover:bg-white hover:bg-opacity-10 transition-all"
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <Icon size={14} className="text-primary" />
                        <span className="text-xs text-white font-medium">{question.text}</span>
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* Input Area */}
          <div className="p-6 border-t border-white border-opacity-10">
            <div className="flex items-center gap-3">
              {/* Voice Recording Button */}
              <motion.button
                onClick={toggleRecording}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`p-3 rounded-full transition-all ${
                  isRecording 
                    ? 'bg-danger bg-opacity-20 text-danger border border-danger border-opacity-30' 
                    : 'bg-white bg-opacity-10 text-textSecondary hover:bg-white hover:bg-opacity-20 hover:text-white'
                }`}
              >
                <motion.div
                  animate={isRecording ? { scale: [1, 1.2, 1] } : {}}
                  transition={{ duration: 1, repeat: isRecording ? Infinity : 0 }}
                >
                  <Mic size={20} />
                </motion.div>
              </motion.button>

              {/* Message Input */}
              <div className="flex-1 relative">
                <textarea
                  ref={inputRef}
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="输入您的投资问题..."
                  className="w-full glass-card px-4 py-3 pr-12 bg-transparent border-white border-opacity-20 focus:border-primary focus:outline-none focus:bg-white focus:bg-opacity-5 transition-all resize-none"
                  style={{ borderRadius: '12px' }}
                  rows="1"
                />
              </div>

              {/* Send Button */}
              <motion.button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim() || isTyping}
                whileHover={{ scale: !inputMessage.trim() ? 1 : 1.05 }}
                whileTap={{ scale: !inputMessage.trim() ? 1 : 0.95 }}
                className={`p-3 rounded-full transition-all ${
                  inputMessage.trim() && !isTyping
                    ? 'bg-primary text-white hover:bg-primary hover:bg-opacity-80' 
                    : 'bg-white bg-opacity-10 text-textSecondary cursor-not-allowed'
                }`}
              >
                <Send size={20} />
              </motion.button>
            </div>
          </div>
        </GlowCard>
      </div>
    </div>
  );
};

export default AIChat;