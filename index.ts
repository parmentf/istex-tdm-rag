import {
    RAGApplicationBuilder,
    Ollama,
    WebLoader,
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
        "Utilise tout le contexte fourni pour répondre à la question à la fin du paragraphe. Réponds à toute la question. Si tu ne connais pas la réponse, dis simplement que tu ne sais pas, n'essaye pas de créer une réponse qui pourrait être considérée comme fausse ou inexacte. Question: {0}",
    )
    .setEmbeddingModel(
        new OllamaEmbeddings({
            model: 'nomic-embed-text:latest',
            baseUrl: 'http://localhost:11434',
        }),
    )
    .addLoader(
        new WebLoader({
            urlOrContent:
                'https://services.istex.fr/associer-un-identifiant-ror-a-une-adresse-daffiliation/',
        }),
    )
    .addLoader(
        new WebLoader({
            urlOrContent:
                'https://services.istex.fr/detection-de-bruit-dun-corpus/',
        }),
    )
    .addLoader(
        new WebLoader({
            urlOrContent:
                'https://services.istex.fr/classification-en-domaines-scientifiques-science-metrix/',
        }),
    )
    .addLoader(
        new WebLoader({
            urlOrContent:
                'https://services.istex.fr/extraction-de-cluster-dun-corpus/',
        }),
    )
    .addLoader(
        new WebLoader({
            urlOrContent:
                'https://services.istex.fr/extraction-du-texte-epure-de-pdf/',
        }),
    )
    .addLoader(
        new WebLoader({
            urlOrContent: 'https://services.istex.fr/extraction-de-quantites/',
        }),
    )
    .addLoader(
        new WebLoader({
            urlOrContent:
                'https://services.istex.fr/extraction-de-termes-dun-corpus/',
        }),
    )
    .addLoader(
        new WebLoader({
            urlOrContent:
                'https://services.istex.fr/validation-de-reference-bibliographique/',
        }),
    )
    .addLoader(
        new WebLoader({
            urlOrContent:
                'https://services.istex.fr/detection-du-pays-dune-affiliation/',
        }),
    )
    .addLoader(
        new WebLoader({
            urlOrContent:
                'https://services.istex.fr/detection-de-financeurs-dans-un-article/',
        }),
    )
    .addLoader(
        new WebLoader({
            urlOrContent:
                'https://services.istex.fr/detection-dentites-nommees-en-chimie/',
        }),
    )
    .addLoader(
        new WebLoader({
            urlOrContent:
                'https://services.istex.fr/detection-dentites-nommees-de-maladies/',
        }),
    )
    .addLoader(
        new WebLoader({
            urlOrContent:
                'https://services.istex.fr/creation-de-topics-sur-un-corpus-lda/',
        }),
    )
    .addLoader(
        new WebLoader({
            urlOrContent:
                'https://services.istex.fr/detection-dentites-nommees-en-astronomie/',
        }),
    )
    .addLoader(
        new WebLoader({
            urlOrContent:
                'https://services.istex.fr/desambiguisation-dauteurs-via-orcid/',
        }),
    )
    .addLoader(
        new WebLoader({
            urlOrContent:
                'https://services.istex.fr/detection-daffiliations-privees/',
        }),
    )
    .addLoader(
        new WebLoader({
            urlOrContent: 'https://services.istex.fr/detection-de-genre/',
        }),
    )
    .addLoader(
        new WebLoader({
            urlOrContent:
                'https://services.istex.fr/attribution-dun-rnsr-a-une-affiliation-apprentissage/',
        }),
    )
    .addLoader(
        new WebLoader({
            urlOrContent: 'https://services.istex.fr/lemmatiseur_eng/',
        }),
    )
    .addLoader(
        new WebLoader({
            urlOrContent:
                'https://services.istex.fr/affiliations-hospitalieres/',
        }),
    )
    .addLoader(
        new WebLoader({
            urlOrContent:
                'https://services.istex.fr/irc3-species-recherche-despeces-animales/',
        }),
    )
    .addLoader(
         new WebLoader({
            urlOrContent: 'https://services.istex.fr/detection-dunites-cnrs/',
        }),
    )
    .addLoader(
        new WebLoader({
            urlOrContent:
                'https://services.istex.fr/detection-dentites-nommees-dans-les-bulletins-administratifs-de-linstruction-publique-persee/',
        }),
    )
    .addLoader(
        new WebLoader({
            urlOrContent:
                'https://services.istex.fr/attribution-de-noms-dinstituts-cnrs-a-partir-didentifiants-rnsr/',
        }),
    )
    .addLoader(
        new WebLoader({
            urlOrContent:
                'https://services.istex.fr/associer-un-idref-auteur-a-un-identifiant-hal-author-id/',
        }),
    )
    .addLoader(
        new WebLoader({
            urlOrContent:
                'https://services.istex.fr/associer-un-identifiant-orcid-a-lidentifiant-idref-correspondant-a-valider/',
        }),
    )
    .addLoader(
        new WebLoader({
            urlOrContent:
                'https://services.istex.fr/detection-dentites-geographiques/',
        }),
    )
    .addLoader(
        new WebLoader({
            urlOrContent:
                'https://services.istex.fr/classification-dans-les-domaines-hal/',
        }),
    )
    .addLoader(
        new WebLoader({
            urlOrContent: 'https://services.istex.fr/enrichissement-par-doi/',
        }),
    )
    .addLoader(
        new WebLoader({
            urlOrContent:
                'https://services.istex.fr/associer-un-terme-au-vocabulaire-des-communes-de-france/',
        }),
    )
    .addLoader(
        new WebLoader({
            urlOrContent:
                'https://services.istex.fr/normaliser-un-texte-ou-un-terme/',
        }),
    )
    .addLoader(
        new WebLoader({
            urlOrContent: 'https://services.istex.fr/boite-a-outils-nlp/',
        }),
    )
    .addLoader(
        new WebLoader({
            urlOrContent:
                'https://services.istex.fr/extraction-de-termes-teeft/',
        }),
    )
    .addLoader(
        new WebLoader({
            urlOrContent: 'https://services.istex.fr/decoupage-dune-adresse/',
        }),
    )
    .addLoader(
        new WebLoader({
            urlOrContent:
                'https://services.istex.fr/detection-de-la-llangue-dun-texte/',
        }),
    )
    .addLoader(
        new WebLoader({
            urlOrContent:
                'https://services.istex.fr/identifiants-rnsr-adresse/',
        }),
    )
    .addLoader(
        new WebLoader({
            urlOrContent:
                'https://services.istex.fr/classification-en-domaines-scientifiques/',
        }),
    )
    .build();

console.log(msee.parse('# POC RAG ISTEX TDM'));

const answer = await ragApplication.query(
    'Quels sont les différents types de services web disponibles?',
);
// console.log(answer);
console.log(msee.parse(answer.content));

console.log(msee.parse("## Sources"))
for(let s of answer.sources) {
    console.log(` - ${s.source}`);
}
