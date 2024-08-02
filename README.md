# ISTEX TDM RAG

## Description

Ce POC (*Proof Of Concept*) est la suite de
[services-rag](https://vegitlab.intra.inist.fr/parmentf/services-rag), qui était
une première approche.

Son objectif est de proposer une aide pour trouver le bon service web parmi les
fiches proposées sur [ISTEX TDM](https://services.istex.fr/), à l'aide d'une
conversation avec un LLM, ou bien simplement à l'aide du recherche (mais en
utilisant un codage (*embedding*) de la question qui permet de trouver la fiche
du service le plus proche de la demande).

Contrairement à la première expérimentation, où la collecte des données, leur
traduction en anglais pour la création des *embeddings*, étaient faites « à la
main », je vais tenter l'utilisation d'un *framework* fait pour ça:
[EmbedJs](https://github.com/llm-tools/embedJs).

## Installation

### bun

À l'occasion de ce POC, j'utilise [bun](https://bun.sh/) au lieu de
[NodeJs](https://nodejs.org/). Il se peut que certaines fonctionnalités soient
manquantes.

Pour installer `bun`:

```bash
curl -fsSL https://bun.sh/install | bash
source ~/.bashrc
```

Pour installer les paquets:

```bash
bun install
```

### VSCode

Pour éviter les désagréables soulignements rouges qui indiquent que TypeScript
n'a pas de déclaration pour `promise-ratelimit` et pour `msee`, voilà les
fichiers:

- node_modules/msee/lib/msee.d.ts:

    ```typescript
    export function parse(text: any, options?: any): string;
    export function parseFile(file: any, options?: any): string;
    ```
- node_modules/promise-ratelimit/index.d.ts:

    ```typescript
    export = ratelimit;
    declare function ratelimit(rateInMs: any): {
        (): any;
        currentlyActiveCheck: any;
        lastExecutionTime: number;
        queue: any[];
        resolveUniform(fnName: any, v: any): void;
        resolveAll(v: any): void;
        rejectAll(v: any): void;
        check(): any;
    };
    ```

### LLM

Je veux utiliser un LLM local, j'ai donc opté pour [ollama](https://ollama.com/).

```bash
curl -fsSL https://ollama.com/install.sh | sh
```

Dans certains environnements, le serveur ollama n'est pas lancé, il faut le
faire explicitement:

```bash
ollama serve
```

### Base vectorielle

Toujours dans l'idée de ne pas dépendre de services externes, la
[base](https://github.com/llm-tools/embedJs/blob/main/README.md#vector-databases-supported)
choisie est [LanceDB](https://lancedb.com/) (dans la précédente version, j'avais
utilisé ChromaDB, mais cela nécessitait de la lancer dans un autre Container, et
de plus la fonction de similarité n'a pas semblé très prometteuse).
