import { ChatOpenAI } from "@langchain/openai";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { Document } from "@langchain/core/documents";
import { CheerioWebBaseLoader } from "@langchain/community/document_loaders/web/cheerio";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { OpenAIEmbeddings } from "@langchain/openai";
import { MemoryVectorStore } from "langchain/vectorstores/memory";

import { createRetrievalChain } from "langchain/chains/retrieval";
import { createStuffDocumentsChain } from "langchain/chains/combine_documents";

import * as dotenv from "dotenv";
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

// create prompt template
const prompt = ChatPromptTemplate.fromMessages([
   ["system", "answare the user's question. Context: {context} "],
   
   ["human", "{input}"]
]);

// create chain 
const chain = prompt.pipe(model);


//Documents
const documentA = new Document({
    pageContent : "Agent Skills are a lightweight, open format for extending AI agent capabilities with specialized knowledge and workflows."
});

const documentB = new Document({
    pageContent : "Mahmood is a software engineer with expertise in .Net and Azure. He has a strong background in developing scalable applications and cloud solutions."
})

// Web scraping
const loader = new CheerioWebBaseLoader("https://agentskills.io/home");

const docs = await loader.load();

const splitter = new RecursiveCharacterTextSplitter({
    chunkSize : 200,
    chunkOverlap : 20,
});

const splitDocs = await splitter.splitDocuments(docs);

const embeddings = new OpenAIEmbeddings({
  configuration: {
    baseURL: "https://api.gapgpt.app/v1",
  },
});

const vectorStore = await MemoryVectorStore.fromDocuments(splitDocs, embeddings);

// retrieve data

const retriever = vectorStore.asRetriever({
    k:2,
});

const retrievalChain = await createRetrievalChain({
    combineDocsChain : chain,
    retriever : retriever,
});


const response = await retrievalChain.invoke({
    input : "what is skill?"
});

console.log(response);
