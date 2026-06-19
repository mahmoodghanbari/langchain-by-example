import { ChatOpenAI } from "@langchain/openai";
import { ChatPromptTemplate } from "@langchain/core/prompts";

import * as dotenv from 'dotenv';
dotenv.config();

// create model 
const model = new ChatOpenAI({
    model : "gapgpt-qwen-3.6",
    temperature : 0.7,
    maxTokens : 1000,
    verbose : true, 
    configuration: {
    baseURL: "https://api.gapgpt.app/v1",
  }
});

// create propmpt template 
const propmt = ChatPromptTemplate.fromMessages([
    ["system","you are a comedian, tell a joke based on the following word"],
    ["human", "{input}"],
])

// create chain 
const chain = propmt.pipe(model);

// call chain 
const response = await chain.invoke({
    input : "dog",
});

console.log(response);