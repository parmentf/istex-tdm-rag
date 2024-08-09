#!/usr/bin/env bun

import { JsonLoader, Ollama, OllamaEmbeddings, RAGApplicationBuilder } from '@llm-tools/embedjs';
import { LanceDb } from '@llm-tools/embedjs/vectorDb/lance';
import path from 'path';
import ratelimit from 'promise-ratelimit';
import { html2card } from './create-cards';

const throttleOneSecond = ratelimit(1000);

const MAX_POSTS = 100;
const URL_ALL_POSTS = `https://services.istex.fr/wp-json/wp/v2/posts?status=publish&per_page=${MAX_POSTS}&categories=8`;

const allPosts: { id: number, author: number }[] = await (await fetch(URL_ALL_POSTS)).json();
const allPostIds = allPosts
    .filter(p => p.author !== 27) //Lucile
    .filter(p => p.author !== 29) // Segia
    .filter(p => p.id !== 1658) // NLP_tools
    .filter(p => p.id !== 1509) // ARK tools
    .slice(0)
    .map((p) => p.id);

console.log(`Nombre de fiches à traiter: ${allPostIds.length}`);

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
console.log(
    "Nombre d'embeddings restant après reset:",
    await ragApplication.getEmbeddingsCount()
);

await Promise.all(allPostIds.map(async (id) => {
    const url = `https://services.istex.fr/?p=${id}`;
    await throttleOneSecond();

    const html = await (await fetch(url)).text();
    const card = html2card(html);

    await ragApplication.addLoader(new JsonLoader({
        object: { ...card, url },
        pickKeysForEmbedding: [
            'url', 'name', 'title', 'userLevel', 'validationLevel', 'aim', 'metrics',
            'variants', 'method'
        ],
    }));
}));

console.log("Nombre d'embeddings récoltés:", await ragApplication.getEmbeddingsCount());
