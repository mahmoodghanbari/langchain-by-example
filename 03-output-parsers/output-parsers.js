import { ChatOpenAI } from "@langchain/openai";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser, CommaSeparatedListOutputParser, StructuredOutputParser } from "@langchain/core/output_parsers";

import {z} from 'zod';

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

// string output parser
async function callStringOutputParser(){
    // create propmpt template 
const propmt = ChatPromptTemplate.fromMessages([
    ["system","you are a comedian, tell a joke based on the following word"],
    ["human", "{input}"],
])

// create parser 

const parser = new StringOutputParser(); 

// create chain 
const chain = propmt.pipe(model).pipe(parser);

// call chain 
return chain.invoke({
    input : "dog",
});
}

// list output parser
async function callListOutputParser(){
    const prompt = ChatPromptTemplate.fromMessages([
        [
            "system",
            "provide 5 synonyms, seperated by commas, for a word that the user will provide."
        ],
        [
            "human",
            "{word}"
        ],
    ]);

    const outputParser = new CommaSeparatedListOutputParser();

    const chain = prompt.pipe(model).pipe(outputParser);

    return await chain.invoke({
        word : "sad"
    });
}

// structured output parser 

async function callStructuredParser(){
    const prompt = ChatPromptTemplate.fromTemplate(
        "extract information from the following pharse. \n{format_instractions}\n{phrase}"
    );

    const outputParser = StructuredOutputParser.fromNamesAndDescriptions({
        name : "name of the person",
        age : "age of the person",
    });

    const chain = prompt.pipe(model).pipe(outputParser);

    return  await chain.invoke({
        phrase : "max is 30 years old",
        format_instractions : outputParser.getFormatInstructions(),
    });
    
}

// zod structured output parser

async function callZodOutputParser(){
    const prompt = ChatPromptTemplate.fromTemplate(
        "Extract information from the following phrase.\n{format_instructions}\n{phrase}"
    );

    const outputParser = StructuredOutputParser.fromZodSchema(
        z.object({
            recipe: z.string().describe("name of recipe"),
            ingrediants: z.array(z.string()).describe("ingredients"),
        })
    );

    // create chain 
    const chain = prompt.pipe(model).pipe(outputParser);

    return await chain.invoke({
        phrase:"Ghormesabzi",
        format_instructions: outputParser.getFormatInstructions()
    })
}

//const response = await callStringOutputParser();
//const response = await callListOutputParser();
//const response = await callStructuredParser();
const response = await callZodOutputParser();

console.log(response);