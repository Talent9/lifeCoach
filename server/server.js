const express = require('express');
const cors = require('cors');
const axios = require('axios');
const path = require('path');

const app = express();
require('dotenv').config();
const port = process.env.PORT || 3000;

// 配置中间件
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

// DeepSeek R1 API配置
const API_KEY = process.env.API_KEY;
const API_URL = process.env.API_URL;

// 系统预设消息
const systemMessage = {
  role: 'system',
  content: '你是一位专业的生活教练，擅长倾听、分析和给出建设性的建议。你的目标是通过对话帮助用户发现自己的潜力，克服困难，实现个人成长。请用温暖、专业、鼓励的语气与用户交流。'
};

// 处理聊天请求
app.post('/api/chat', async (req, res) => {
  try {
    const { message } = req.body;
    
    // 设置响应头，支持流式输出
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    // 准备请求数据
    const requestData = {
      model: 'deepseek-r1-250120',
      messages: [
        systemMessage,
        { role: 'user', content: message }
      ],
      stream: true,
      temperature: 0.7
    };

    // 发送请求到DeepSeek API
    const response = await axios({
      method: 'post',
      url: API_URL,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`
      },
      data: requestData,
      timeout: 60000, // 60秒超时
      responseType: 'stream'
    });

    // 处理流式响应
    response.data.on('data', (chunk) => {
      const lines = chunk.toString().split('\n');
      lines.forEach(line => {
        if (line.startsWith('data: ') && line !== 'data: [DONE]') {
          try {
            const jsonData = JSON.parse(line.slice(6));
            const content = jsonData.choices[0].delta.content || '';
            res.write(`data: ${JSON.stringify({ content })}\n\n`);
          } catch (e) {
            console.error('解析响应数据出错:', e);
          }
        }
      });
    });

    response.data.on('end', () => {
      res.write('data: [DONE]\n\n');
      res.end();
    });

  } catch (error) {
    console.error('API请求出错:', error);
    res.status(500).json({ error: '服务器内部错误' });
  }
});

// 启动服务器
app.listen(port, () => {
  console.log(`服务器运行在 http://localhost:${port}`);
});