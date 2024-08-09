#!/usr/bin/env bun

import {
    RAGApplicationBuilder,
    Ollama,
    OllamaEmbeddings,
} from '@llm-tools/embedjs';
import { LanceDb } from '@llm-tools/embedjs/vectorDb/lance';
import path from 'path';
import msee from 'msee';

const ragApplication = await new RAGApplicationBuilder()
    .setModel(
        new Ollama({
            modelName: 'llama3.1:latest',
            baseUrl: 'http://localhost:11434',
        }),
    )
    .setVectorDb(new LanceDb({ path: path.resolve('db') }))
    .setQueryTemplate(
        // "Utilise tout le contexte fourni pour répondre à la question à la fin du paragraphe. Réponds à toute la question. Si tu ne connais pas la réponse, dis simplement que tu ne sais pas, n'essaye pas de créer une réponse qui pourrait être considérée comme fausse ou inexacte. Question: {0}",
        "Tu es un expert du service TDM d'ISTEX. Utilise toutes les fiches de services web pertinentes fournies pour répondre à la question à la fin du paragraphe (en général pour sélectionner un service web adapté à l'opération en question). Réponds à toute la question. Si tu ne connais pas la réponse, dis simplement que tu ne sais pas, n'essaye pas de créer une réponse qui pourrait être considérée comme fausse ou inexacte. Question: {0}",
    )
    .setEmbeddingModel(
        new OllamaEmbeddings({
            // model: 'nomic-embed-text:latest',
            model: 'paraphrase-multilingual',
            baseUrl: 'http://localhost:11434',
        }),
    )
    .setSearchResultCount(7)
    .build();

/////////////////////////////////////////////////
const query = process.argv.slice(2).join(" ") || 'Quels sont les différents types de services web disponibles ?'

console.log(msee.parse('# POC RAG ISTEX TDM'));

console.log(msee.parse(`## Question\n*${query}*`));

const GENERATE_ANSWER = false;
if (GENERATE_ANSWER) {
    const answer = await ragApplication.query(query);
    console.log(msee.parse(answer.content));

    console.log(msee.parse("## Sources"))
    for (let s of answer.sources) {
        console.log(` - ${s.source}`);
    }
} else {
    const context = await ragApplication.getContext(query);

    console.log(context);
}
