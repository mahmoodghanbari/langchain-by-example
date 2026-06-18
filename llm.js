import { ChatOpenAI } from "@langchain/openai";

import * as dotenv from 'dotenv';
dotenv.config();

const model = new ChatOpenAI({
    model : "gpt-3.5-turbo",
    temperature : 0.2,
    maxTokens : 1000,
    verbose : true,
});

const response = await model.invoke("hello langchain");

console.log(response);