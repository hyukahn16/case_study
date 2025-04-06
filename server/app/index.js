import express from 'express';
import cors from 'cors';
import OpenAI from "openai";
import { config } from '../config.js';

import * as db from './init_database_schema.js';
await db.DeleteCollection();
await db.createClass(); // Create class in Weaviate database
await db.initDatabase(); // Initialize database with data
await db.getData();

const app = express();
const PORT = process.env.PORT || 5000;
const openai = new OpenAI({
    baseURL: config.DEEPSEEK_API_URL,
    apiKey: config.DEEPSEEK_API_KEY, 
});

// Enable CORS for React frontend
app.use(cors({ origin: 'http://localhost:3000' })); 
app.use(express.json());

import systemMessages from "../data/system_message.json" with { type: 'json' };
const systemMessageContext = systemMessages.messages.context;
const systemMessageTask = systemMessages.messages.task;
const systemMessageConstraint = systemMessages.messages.constraint;
const systemMessageBypass = systemMessages.messages.bypass;
const systemMessageOutput = systemMessages.messages.output;

// Secure API endpoint
app.post('/api/chat', async (req, res) => {
  try {
    // 1) Define user message
    const userMessage = req.body.messages;
    if (!userMessage) {
        return res.status(400).json({ error: 'No message provided' });
    }

    // 2) Define system message
    const systemMessage = {
      	role: 'system',
      	content: systemMessageContext + 
                 systemMessageTask + 
                 systemMessageConstraint + 
	  		     systemMessageBypass + 
                 systemMessageOutput,
    };

    // 3) Define augment message
    // Use user's last message to retrieve relevant data
    const augmentedRetrieval = await db.getData(userMessage.at(-1).content);
    let augmentMessage = "";
    if (augmentedRetrieval) {
        augmentMessage = 
            "Check whether the following information is relevant to the user \
            query. Use the information only if the information is relevant:" + 
            JSON.stringify(augmentedRetrieval.objects, null, 2)
    }

    userMessage.at(-1).content = 
        userMessage.at(-1).content + augmentMessage;

    const response = await openai.chat.completions.create({
    	model: 'deepseek-chat',
        messages: [systemMessage].concat(userMessage),    
        max_tokens: 500, 
        temperature: 0.8
    });

    const data = response;
    res.json(data);
    } catch (error) {
    	console.error('API Error:', error);
    	res.status(500).json({ error: 'Failed to process request' });
    }
});


app.listen(PORT, () => {
  	console.log(`Express Backend running on port ${PORT}`);
});
