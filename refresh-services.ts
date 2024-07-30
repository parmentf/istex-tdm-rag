#!/usr/bin/env bun

import { Ollama, OllamaEmbeddings, RAGApplicationBuilder, WebLoader } from '@llm-tools/embedjs';
import { LanceDb } from '@llm-tools/embedjs/vectorDb/lance';
import path from 'path';
import ratelimit from 'promise-ratelimit';

const throttleOneSecond = ratelimit(1000);

const MAX_POSTS = 100;
const URL_ALL_POSTS = `https://services.istex.fr/wp-json/wp/v2/posts?status=publish&per_page=${MAX_POSTS}&categories=8`;

const allPosts: { id: number, author: number }[] = await (await fetch(URL_ALL_POSTS)).json();
const allPostIds = allPosts
    .filter(p => p.author !== 27) //Lucile
    .filter(p => p.author !== 29) // Segia
    .filter(p => p.id !== 1658) // NLP_tools
    .slice(0)
    .map((p) => p.id);

const ragApplication = await new RAGApplicationBuilder()
    .setModel(
        new Ollama({
            modelName: 'llama3.1:latest',
            baseUrl: 'http://localhost:11434',
        }),
    )
    .setVectorDb(new LanceDb({ path: path.resolve('db') }))
    .setEmbeddingModel(
        new OllamaEmbeddings({
            model: 'nomic-embed-text:latest',
            baseUrl: 'http://localhost:11434',
        }),
    )
    .build()
    ;

await ragApplication.deleteAllEmbeddings(true);

await Promise.all(allPostIds.map(async (id) => {
    const url = `https://services.istex.fr/?p=${id}`;
    await throttleOneSecond();

    await ragApplication.addLoader(new WebLoader({
        urlOrContent:
            url,
    }));
}));

console.log("Nombre d'embeddings récoltés:", await ragApplication.getEmbeddingsCount());
