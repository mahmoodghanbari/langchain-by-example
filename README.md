# LangChain by Example

A practical, example-driven repository for learning LangChain with JavaScript.

This repository contains a collection of small and focused examples that demonstrate LangChain concepts step by step. Each lesson builds on a specific topic and is organized into separate files and folders for easier navigation and learning.

## Purpose

The goal of this repository is to provide hands-on examples for developers who want to learn LangChain through practice rather than theory.

Topics covered include:

* LangChain Fundamentals
* Prompts
* Models
* Output Parsers
* Chains
* Retrieval (RAG)
* Tools
* Agents
* Memory
* And more...

## Getting Started

1. Clone the repository:

```bash
git clone https://github.com/your-username/langchain-by-example.git
cd langchain-by-example
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the project root.

4. Obtain an API key from your preferred model provider (such as OpenAI or another supported provider) and add it to the `.env` file:

```env
OPENAI_API_KEY=your_api_key_here
```

5. Run any example:

```bash
node examples/01-hello-langchain/index.js
```

## Repository Structure

```text
examples/
├── 01-hello-langchain
├── 02-prompts
├── 03-output-parsers
├── 04-chains
├── 05-rag
├── 06-tools
├── 07-agents
└── 08-memory
```

Each folder contains a standalone example focused on a specific LangChain concept.

## License

MIT
