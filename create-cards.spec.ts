#!/usr/bin/env bun

import { beforeEach, describe, expect, test } from "bun:test";
import ratelimit from "promise-ratelimit";
import { html2card } from "./create-cards";

const waitOneSecond = ratelimit(1000);

describe("create-cards", () => {

    beforeEach(async () => {
        await waitOneSecond();
    });

    test("bibCheck", async () => {
        const url = 'https://services.istex.fr/validation-de-reference-bibliographique/';
        const html = await (await fetch(url)).text();
        const card = html2card(html);

        expect(card).toContainKeys([
            "title", "name", "userLevel", "validationLevel", "aim", "method", "metrics",
            "others", "serviceUrl", "examples", "openApi", "source",
        ]);
        expect(card.title).toBe("bibCheck - Contrôle de référence bibliographique");
        expect(card.name).toBe("bibCheck");
        expect(card.userLevel).toBe("Débutant");
        expect(card.validationLevel).toBe("Expérimental");
        expect(card.aim).toStartWith("Ce web service");
        expect(card.method).toStartWith("L’entrée est une");
        expect(card.others).toBe("Enrichissement par DOI\nVerbalisation des préfixes de DOI");
        expect(card.serviceUrl).toBe("https://biblio-ref.services.istex.fr/v1/validate");
        expect(card.examples).toHaveLength(4);
        expect(card.examples[0].input).toStartWith("2. Y. B. LINHART");
        expect(card.examples[0].output).toStartWith("doi:10.3406/");
        expect(card.openApi).toStartWith("https:\/\/openapi.services.istex.fr");
        expect(card.source).toBe("https://github.com/Inist-CNRS/web-services/tree/main/services/biblio-ref");
        expect(card.useCase).toStartWith("Vous souhaitez contrôler la validité");
    });

    test("Teeft", async () => {
        const url = 'https://services.istex.fr/extraction-de-termes-teeft/';
        const html = await (await fetch(url)).text();
        const card = html2card(html);

        expect(card).toContainKeys([
            "title", "name", "userLevel", "validationLevel", "aim", "method", "metrics",
            "variants", "references", "others", "serviceUrl", "examples", "openApi", "source",
            "further", "useCase"
        ]);
        expect(card.title).toBe("Teeft - Extraction de termes d’un texte via Teeft");
        expect(card.name).toBe("Teeft");
        expect(card.userLevel).toBe("Débutant");
        expect(card.validationLevel).toBe("Validé");
        expect(card.aim).toStartWith("Le service web Teeft extrait");
        expect(card.metrics).toStartWith("Le service Teeft originel");
        expect(card.variants).toStartWith("Langues");
        expect(card.references).toStartWith("Cuxac P");
        expect(card.serviceUrl).toBe("https://terms-extraction.services.istex.fr/v1/teeft/en");
        expect(card.examples).toHaveLength(1);
        expect(card.examples[0].input).toStartWith("Mars Exploration Rover (MER)");
        expect(card.examples[0].output).toStartWith("mars exploration rover mer,");
        expect(card.openApi).toStartWith("https://openapi.services.istex.fr");
        expect(card.source).toBe("https://github.com/Inist-CNRS/web-services/tree/main/services/terms-extraction/v1/teeft");
        expect(card.further).toStartWith("Dans LODEX, les enrichissements");
        expect(card.useCase).toStartWith("Vous avez un corpus");
    });

    test("idRorDetect", async () => {
        const url = "https://services.istex.fr/associer-un-identifiant-ror-a-une-adresse-daffiliation/";
        const html = await (await fetch(url)).text();
        const card = html2card(html);

        expect(card).toContainKeys([
            "title", "name", "userLevel", "validationLevel", "aim", "method", "metrics",
            "variants", "references", "others", "serviceUrl", "examples", "openApi", "source",
            "further", "useCase"
        ]);
        expect(card.title).toBe("IdRorDetect - Associer un identifiant ROR à une adresse d’affiliation");
        expect(card.name).toBe("IdRorDetect");
        expect(card.userLevel).toBe("Débutant");
        expect(card.validationLevel).toBe("Expérimental");
        expect(card.aim).toStartWith("Web service qui prend en entrée une affiliation");
        expect(card.method).toStartWith("Le web service prend en entrée");
        expect(card.metrics).toStartWith("Ce web service");
        expect(card.variants).toBe("");
        expect(card.references).toBe("");
        expect(card.serviceUrl).toBe("https://affiliations-tools.services.istex.fr/v1/ror/get-id");
        expect(card.examples).toHaveLength(0);
        expect(card.openApi).toStartWith("https://openapi.services.istex.fr");
        expect(card.source).toBe("https://github.com/Inist-CNRS/web-services/tree/main/services/affiliations-tools/v1/ror");
        expect(card.further).toBe("");
        expect(card.useCase).toBe("");
    });

    test("textClustering", async () => {
        const url = "https://services.istex.fr/extraction-de-cluster-dun-corpus/";
        const html = await (await fetch(url)).text();
        const card = html2card(html);

        expect(card).toContainKeys([
            "title", "name", "userLevel", "validationLevel", "aim", "method", "metrics",
            "variants", "references", "others", "serviceUrl", "examples", "openApi", "source",
            "further", "useCase"
        ]);
        expect(card.title).toBe("textClustering - Extraction de cluster d’un corpus");
        expect(card.name).toBe("textClustering");
        expect(card.userLevel).toBe("Avancé");
        expect(card.validationLevel).toBe("Expérimental");
        expect(card.aim).toStartWith("Ce web service traite non plus du texte");
        expect(card.method).toStartWith("Dans un premier temps, un embedding est utilisé");
        expect(card.metrics).toStartWith("Un modèle est créé à chaque utilisation");
        expect(card.variants).toBe("");
        expect(card.references).toStartWith("UMAP (Uniform Manifold");
        expect(card.others).toStartWith("Extraction de thématiques d’un corpus");
        expect(card.serviceUrl).toBe("https://text-clustering.services.istex.fr/v1/clustering");
        expect(card.examples).toHaveLength(0);
        expect(card.openApi).toStartWith("https://openapi.services.istex.fr");
        expect(card.source).toBe("https://github.com/Inist-CNRS/web-services/tree/main/services/text-clustering");
        expect(card.further).toBe("");
        expect(card.useCase).toBe("");
    })

    test("quantityExtract", async () => {
        const url = 'https://services.istex.fr/extraction-de-quantites/';
        const html = await (await fetch(url)).text();
        const card = html2card(html);

        expect(card).toContainKeys([
            "title", "name", "userLevel", "validationLevel", "aim", "method", "metrics",
            "others", "serviceUrl", "examples", "openApi", "source",
        ]);
        expect(card.title).toBe("quantityExtract - Extraction de quantités");
        expect(card.name).toBe("quantityExtract");
        expect(card.userLevel).toBe("Débutant");
        expect(card.validationLevel).toBe("Expérimental");
        expect(card.aim).toStartWith("Ce web service extrait");
        expect(card.method).toStartWith("Ce web service utilise la");
        expect(card.references).toStartWith("Bibliothèque python CQE");
        expect(card.others).toStartWith("Extraction d’entités nommées de maladies");
        expect(card.serviceUrl).toBe("https://terms-extraction.services.istex.fr/v1/quantity/extract");
        expect(card.examples).toHaveLength(2);
        expect(card.examples[0].input).toStartWith("The experimental vaccine showed");
        expect(card.examples[0].output).toStartWith("[\n");
        expect(card.openApi).toStartWith("https:\/\/openapi.services.istex.fr");
        expect(card.source).toBe("https://github.com/Inist-CNRS/web-services/tree/main/services/terms-extraction/v1/quantity");
        expect(card.useCase).toBe("");
    });
});
