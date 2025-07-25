# 股票智能分析系统 API 文档

## 基础信息

- **Base URL**: `https://api.stockai.com/v1`
- **认证方式**: Bearer Token
- **请求格式**: JSON
- **响应格式**: JSON
- **API版本**: v1.0

## 认证

所有API请求需要在Header中包含认证信息：

```
Authorization: Bearer YOUR_API_TOKEN
```

## 通用响应格式

### 成功响应

```json
{
  "code": 0,
  "message": "success",
  "data": {
    // 具体数据
  },
  "timestamp": "2025-01-24T10:00:00Z"
}
```

### 错误响应

```json
{
  "code": 40001,
  "message": "错误描述",
  "error": {
    "type": "INVALID_PARAMETER",
    "details": "具体错误信息"
  },
  "timestamp": "2025-01-24T10:00:00Z"
}
```

## 错误代码

| 代码 | 说明 |
|------|------|
| 0 | 成功 |
| 40001 | 参数错误 |
| 40101 | 未授权 |
| 40301 | 无权限 |
| 40401 | 资源不存在 |
| 42901 | 请求频率超限 |
| 50001 | 服务器内部错误 |
| 50301 | 服务暂时不可用 |

## API 接口列表

### 1. 个股分析

#### 1.1 综合分析

**接口**: `POST /stock/analysis/comprehensive`

**描述**: 对指定股票进行全方位综合分析

**请求参数**:

```json
{
  "stock_code": "000001",
  "market": "SZ",  // SZ-深圳, SH-上海
  "analysis_depth": "standard",  // quick-快速, standard-标准, deep-深度
  "include_modules": ["fundamental", "technical", "sentiment", "risk"]  // 可选模块
}
```

**响应示例**:

```json
{
  "code": 0,
  "message": "success",
  "data": {
    "stock_info": {
      "code": "000001",
      "name": "平安银行",
      "market": "SZ",
      "industry": "银行"
    },
    "analysis_time": "2025-01-24T10:00:00Z",
    "comprehensive_score": 78.5,  // 综合评分 0-100
    "rating": "buy",  // strong_buy, buy, hold, sell, strong_sell
    "confidence": 0.85,  // 置信度 0-1
    "fundamental_analysis": {
      "score": 82,
      "pe_ratio": 5.8,
      "pb_ratio": 0.65,
      "roe": 11.2,
      "revenue_growth": 8.5,
      "profit_growth": 12.3,
      "key_points": [
        "营收稳健增长，同比增长8.5%",
        "资产质量改善，不良率下降至1.02%"
      ]
    },
    "technical_analysis": {
      "score": 75,
      "trend": "upward",
      "support_level": 10.5,
      "resistance_level": 12.8,
      "macd_signal": "buy",
      "rsi": 58,
      "volume_trend": "increasing",
      "key_signals": [
        "MACD金叉形成，上涨动能增强",
        "成交量放大，资金流入明显"
      ]
    },
    "sentiment_analysis": {
      "score": 78,
      "overall_sentiment": "positive",
      "news_sentiment": 0.72,
      "social_sentiment": 0.65,
      "analyst_consensus": "buy",
      "hot_topics": [
        "零售转型成效显著",
        "科技投入加大"
      ]
    },
    "risk_analysis": {
      "risk_level": "medium",
      "risk_score": 45,
      "main_risks": [
        {
          "type": "market_risk",
          "description": "利率下行压力影响净息差",
          "impact": "medium"
        },
        {
          "type": "policy_risk",
          "description": "房地产政策调整影响",
          "impact": "low"
        }
      ]
    },
    "ai_insights": "平安银行基本面稳健，零售转型持续推进。技术面显示短期有上涨动能，但需关注11.8元附近压力。建议逢低适量建仓，目标价12.5元，止损价10.2元。"
  }
}
```

#### 1.2 实时消息解读

**接口**: `POST /stock/news/interpret`

**描述**: 实时解读股票相关新闻的影响

**请求参数**:

```json
{
  "stock_code": "000001",
  "market": "SZ",
  "news_id": "news_12345",  // 可选，指定新闻ID
  "time_range": "24h"  // 1h, 6h, 24h, 7d
}
```

**响应示例**:

```json
{
  "code": 0,
  "message": "success",
  "data": {
    "news_list": [
      {
        "news_id": "news_12345",
        "title": "平安银行2024年净利润增长15%",
        "publish_time": "2025-01-24T09:30:00Z",
        "source": "证券日报",
        "impact_score": 8.5,  // 影响程度 0-10
        "sentiment": "positive",
        "ai_interpretation": "业绩超预期，净利润增速创三年新高，主要得益于零售业务贡献。预计将对股价形成正面支撑。",
        "price_impact": {
          "direction": "up",
          "estimated_range": "2-5%",
          "time_horizon": "short_term"
        },
        "key_points": [
          "净利润同比增长15%，超市场预期",
          "零售业务收入占比提升至65%",
          "不良率降至1.02%，资产质量改善"
        ]
      }
    ],
    "overall_impact": "positive",
    "action_suggestion": "短期利好明显，可考虑加仓"
  }
}
```

#### 1.3 买卖点提示

**接口**: `POST /stock/signals/trade`

**描述**: 获取股票买卖信号提示

**请求参数**:

```json
{
  "stock_code": "000001",
  "market": "SZ",
  "strategy": "balanced",  // aggressive, balanced, conservative
  "holding_period": "short"  // short, medium, long
}
```

**响应示例**:

```json
{
  "code": 0,
  "message": "success",
  "data": {
    "current_price": 11.25,
    "current_signal": "buy",
    "signal_strength": "medium",
    "entry_points": [
      {
        "price": 11.0,
        "type": "support",
        "confidence": 0.8,
        "reason": "前期平台支撑位"
      },
      {
        "price": 10.8,
        "type": "strong_support",
        "confidence": 0.9,
        "reason": "年线支撑位"
      }
    ],
    "exit_points": [
      {
        "price": 12.5,
        "type": "target",
        "confidence": 0.75,
        "reason": "前期高点压力"
      },
      {
        "price": 10.5,
        "type": "stop_loss",
        "confidence": 0.95,
        "reason": "止损位"
      }
    ],
    "position_advice": {
      "recommended_position": 30,  // 建议仓位百分比
      "entry_strategy": "分批建仓，11.0元以下可加仓",
      "risk_control": "严格止损，跌破10.5元清仓"
    }
  }
}
```

### 2. 板块分析

#### 2.1 板块轮动监测

**接口**: `GET /sector/rotation`

**描述**: 监测市场板块轮动情况

**请求参数**:

```
GET /sector/rotation?period=5d&top_n=10
```

**响应示例**:

```json
{
  "code": 0,
  "message": "success",
  "data": {
    "rotation_analysis": {
      "current_hot_sectors": [
        {
          "sector_code": "BK0475",
          "sector_name": "银行",
          "momentum_score": 85,
          "inflow_amount": 12.5,  // 亿元
          "avg_gain": 3.2,  // 百分比
          "leading_stocks": ["000001", "600036", "601166"],
          "rotation_stage": "early",  // early, middle, late
          "ai_comment": "银行板块受益于政策利好，资金持续流入，仍处于上涨初期"
        }
      ],
      "cooling_sectors": [
        {
          "sector_code": "BK0420",
          "sector_name": "新能源",
          "momentum_score": 35,
          "outflow_amount": 8.2,
          "avg_loss": -2.1,
          "rotation_stage": "late"
        }
      ],
      "rotation_signals": [
        {
          "from_sector": "新能源",
          "to_sector": "银行",
          "confidence": 0.82,
          "reason": "资金从高位题材板块流向低估值蓝筹"
        }
      ]
    }
  }
}
```

#### 2.2 龙头股识别

**接口**: `GET /sector/leaders`

**描述**: 识别板块内的龙头股

**请求参数**:

```
GET /sector/leaders?sector_code=BK0475&limit=5
```

**响应示例**:

```json
{
  "code": 0,
  "message": "success",
  "data": {
    "sector_info": {
      "code": "BK0475",
      "name": "银行"
    },
    "leaders": [
      {
        "stock_code": "601398",
        "stock_name": "工商银行",
        "leadership_score": 92,
        "market_cap_rank": 1,
        "volume_rank": 2,
        "price_performance": {
          "1d": 2.3,
          "5d": 5.8,
          "20d": 12.5
        },
        "leadership_factors": [
          "市值最大，行业地位稳固",
          "成交量持续放大，资金关注度高",
          "股价率先突破，带动板块上涨"
        ]
      }
    ]
  }
}
```

### 3. 策略推荐

#### 3.1 个性化选股

**接口**: `POST /strategy/stock-selection`

**描述**: 基于用户偏好推荐股票

**请求参数**:

```json
{
  "user_profile": {
    "risk_tolerance": "medium",  // low, medium, high
    "investment_style": "value",  // value, growth, balanced
    "holding_period": "medium_term",
    "prefer_sectors": ["银行", "消费"],
    "avoid_sectors": ["房地产"]
  },
  "market_cap_range": {
    "min": 100,  // 亿元
    "max": 5000
  },
  "fundamental_filters": {
    "min_roe": 10,
    "max_pe": 30,
    "min_revenue_growth": 5
  },
  "limit": 10
}
```

**响应示例**:

```json
{
  "code": 0,
  "message": "success",
  "data": {
    "recommendations": [
      {
        "stock_code": "000001",
        "stock_name": "平安银行",
        "match_score": 88,  // 匹配度
        "recommendation_reasons": [
          "低估值，PE仅5.8倍",
          "ROE达11.2%，盈利能力良好",
          "零售转型成效显著，符合长期成长逻辑"
        ],
        "key_metrics": {
          "pe": 5.8,
          "pb": 0.65,
          "roe": 11.2,
          "revenue_growth": 8.5
        },
        "risk_return_profile": {
          "expected_return": 15.5,  // 百分比
          "risk_level": "medium",
          "sharpe_ratio": 1.2
        },
        "ai_advice": "建议配置10-15%仓位，逢低分批买入"
      }
    ],
    "portfolio_suggestion": {
      "sector_allocation": {
        "银行": 30,
        "消费": 40,
        "医药": 20,
        "科技": 10
      },
      "risk_metrics": {
        "portfolio_volatility": 15.2,
        "max_drawdown": -12.5,
        "expected_return": 12.8
      }
    }
  }
}
```

#### 3.2 智能预警

**接口**: `POST /alerts/configure`

**描述**: 配置智能预警规则

**请求参数**:

```json
{
  "stock_code": "000001",
  "alert_rules": [
    {
      "type": "price_change",
      "condition": "rise",
      "threshold": 5,  // 百分比
      "time_window": "1d"
    },
    {
      "type": "technical_signal",
      "indicator": "macd_cross",
      "direction": "golden"
    },
    {
      "type": "news_sentiment",
      "sentiment_change": "negative",
      "impact_level": "high"
    },
    {
      "type": "fundamental_change",
      "metric": "earnings_warning"
    }
  ],
  "notification_channels": ["app_push", "email"]
}
```

**响应示例**:

```json
{
  "code": 0,
  "message": "success",
  "data": {
    "alert_id": "alert_789012",
    "status": "active",
    "created_time": "2025-01-24T10:00:00Z",
    "estimated_triggers_per_day": 2.5
  }
}
```

### 4. 市场分析

#### 4.1 市场情绪指数

**接口**: `GET /market/sentiment`

**描述**: 获取整体市场情绪指标

**请求参数**:

```
GET /market/sentiment?market=A&period=realtime
```

**响应示例**:

```json
{
  "code": 0,
  "message": "success",
  "data": {
    "sentiment_index": 72,  // 0-100，50为中性
    "sentiment_level": "optimistic",  // pessimistic, cautious, neutral, optimistic, euphoric
    "components": {
      "news_sentiment": 68,
      "social_sentiment": 75,
      "fund_flow": 78,
      "volatility_index": 22  // VIX类指标
    },
    "market_phase": "risk_on",  // risk_on, risk_off
    "key_drivers": [
      "政策利好预期强烈",
      "北向资金持续流入",
      "市场成交量放大"
    ],
    "historical_comparison": {
      "vs_yesterday": 5,
      "vs_last_week": 12,
      "percentile_rank": 85  // 历史百分位
    },
    "ai_interpretation": "市场情绪偏乐观，但需警惕短期过热风险。建议保持适度仓位，不宜追高。"
  }
}
```

#### 4.2 资金流向分析

**接口**: `GET /market/money-flow`

**描述**: 分析市场资金流向

**请求参数**:

```
GET /market/money-flow?period=5d&category=sector
```

**响应示例**:

```json
{
  "code": 0,
  "message": "success",
  "data": {
    "total_turnover": 8500,  // 亿元
    "net_inflow": 120,
    "flow_distribution": {
      "super_large": {  // 超大单
        "inflow": 2100,
        "outflow": 1980,
        "net": 120,
        "percentage": 25
      },
      "large": {  // 大单
        "inflow": 1800,
        "outflow": 1750,
        "net": 50,
        "percentage": 21
      },
      "medium": {  // 中单
        "inflow": 1500,
        "outflow": 1520,
        "net": -20,
        "percentage": 18
      },
      "small": {  // 小单
        "inflow": 3100,
        "outflow": 3250,
        "net": -150,
        "percentage": 36
      }
    },
    "sector_flows": [
      {
        "sector": "银行",
        "net_inflow": 45.2,
        "inflow_rate": 3.2,  // 百分比
        "main_force_net": 38.5,  // 主力净流入
        "trend": "accelerating"
      }
    ],
    "smart_money_signals": [
      "超大单持续流入银行板块",
      "北向资金连续5日净买入",
      "主力资金从科技股切换至金融股"
    ]
  }
}
```

### 5. 研究报告

#### 5.1 生成研究报告

**接口**: `POST /research/generate-report`

**描述**: 生成深度研究报告

**请求参数**:

```json
{
  "report_type": "stock",  // stock, sector, strategy
  "target": "000001",
  "report_depth": "comprehensive",  // basic, standard, comprehensive
  "language": "zh_CN",
  "format": "pdf",  // pdf, html, markdown
  "custom_sections": [
    "executive_summary",
    "investment_thesis",
    "fundamental_analysis",
    "technical_analysis",
    "risk_assessment",
    "peer_comparison",
    "valuation_model",
    "recommendation"
  ]
}
```

**响应示例**:

```json
{
  "code": 0,
  "message": "success",
  "data": {
    "report_id": "report_345678",
    "status": "generating",
    "estimated_time": 30,  // 秒
    "preview": {
      "title": "平安银行(000001)深度研究报告",
      "summary": "我们给予平安银行'买入'评级，目标价13.5元...",
      "key_points": [
        "零售转型成效显著，ROE持续改善",
        "资产质量优于同业，不良率降至1.02%",
        "估值处于历史低位，安全边际充足"
      ]
    },
    "callback_url": "https://api.stockai.com/v1/research/report/report_345678"
  }
}
```

## WebSocket 接口

### 实时行情推送

**连接地址**: `wss://ws.stockai.com/v1/realtime`

**订阅消息**:

```json
{
  "action": "subscribe",
  "channels": [
    {
      "channel": "stock",
      "symbols": ["SZ000001", "SH600036"]
    },
    {
      "channel": "alert",
      "alert_ids": ["alert_789012"]
    }
  ]
}
```

**推送消息示例**:

```json
{
  "channel": "stock",
  "type": "quote",
  "data": {
    "symbol": "SZ000001",
    "price": 11.28,
    "change": 0.23,
    "change_percent": 2.08,
    "volume": 125000000,
    "timestamp": "2025-01-24T10:30:45Z"
  }
}
```

## 限流策略

- 免费版：10次/分钟，1000次/天
- 基础版：60次/分钟，10000次/天
- 专业版：300次/分钟，100000次/天
- 企业版：自定义

## SDK 示例

### Python

```python
from stockai import StockAIClient

# 初始化客户端
client = StockAIClient(api_key="YOUR_API_KEY")

# 个股分析
result = client.analyze_stock(
    stock_code="000001",
    market="SZ",
    analysis_depth="deep"
)

# 实时监控
def on_alert(alert_data):
    print(f"收到预警: {alert_data}")

client.subscribe_alerts(
    stock_codes=["000001", "600036"],
    callback=on_alert
)
```

### JavaScript

```javascript
import { StockAI } from '@stockai/sdk';

// 初始化
const stockAI = new StockAI({
  apiKey: 'YOUR_API_KEY'
});

// 个股分析
const analysis = await stockAI.analyzeStock({
  stockCode: '000001',
  market: 'SZ'
});

// WebSocket 订阅
stockAI.subscribe({
  channels: ['stock:SZ000001'],
  onMessage: (data) => {
    console.log('实时数据:', data);
  }
});
```

## 最佳实践

1. **缓存策略**
   - 基本面数据可缓存1天
   - 技术指标缓存5-15分钟
   - 新闻解读缓存1小时

2. **错误处理**
   - 实现指数退避重试机制
   - 设置合理的超时时间
   - 做好降级方案

3. **安全建议**
   - API Key 不要暴露在前端
   - 使用 HTTPS 传输
   - 实施请求签名机制

4. **性能优化**
   - 批量请求接口减少调用次数
   - 使用 WebSocket 获取实时数据
   - 合理使用异步请求

## 更新日志

### v1.0.0 (2025-01-24)
- 初始版本发布
- 支持个股分析、板块监测、策略推荐
- WebSocket 实时推送
- 多语言 SDK 支持