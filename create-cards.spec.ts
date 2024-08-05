#!/usr/bin/env bun

import { beforeEach, describe, expect, test } from "bun:test";
import { strict as assert } from 'node:assert';
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
            "others", "url", "examples", "openApi", "source",
        ]);
        expect(card.title).toBe("bibCheck - Contrôle de référence bibliographique");
        expect(card.name).toBe("bibCheck");
        expect(card.userLevel).toBe("Débutant");
        expect(card.validationLevel).toBe("Expérimental");
        expect(card.aim).toStartWith("Ce web service");
        expect(card.method).toStartWith("L’entrée est une");
        expect(card.others).toBe("Enrichissement par DOI\nVerbalisation des préfixes de DOI");
        expect(card.url).toBe("https://biblio-ref.services.istex.fr/v1/validate");
        expect(card.examples).toHaveLength(4);
        expect(card.examples[0].input).toStartWith("2. Y. B. LINHART");
        expect(card.examples[0].output).toStartWith("doi:10.3406/");
        expect(card.openApi).toStartWith("https:\/\/openapi.services.istex.fr");
        expect(card.source).toBe("https://github.com/Inist-CNRS/web-services/tree/main/services/biblio-ref");
    });

    test("Teeft", async () => {
        const url = 'https://services.istex.fr/extraction-de-termes-teeft/';
        const html = await (await fetch(url)).text();
        const card = html2card(html);

        expect(card).toContainKeys([
            "title", "name", "userLevel", "validationLevel", "aim", "method", "metrics",
            "variants", "references", "others", "url", "examples", "openApi", "source",
        ]);
        expect(card.title).toBe("Teeft - Extraction de termes d’un texte via Teeft");
        expect(card.name).toBe("Teeft");
        expect(card.userLevel).toBe("Débutant");
        expect(card.validationLevel).toBe("Validé");
        expect(card.aim).toStartWith("Le service web Teeft extrait");
        expect(card.metrics).toStartWith("Le service Teeft originel");
        expect(card.variants).toStartWith("Langues");
        expect(card.references).toStartWith("Cuxac P");
        expect(card.url).toBe("https://terms-extraction.services.istex.fr/v1/teeft/en");
        expect(card.examples).toHaveLength(1);
        expect(card.examples[0].input).toStartWith("Mars Exploration Rover (MER)");
        expect(card.examples[0].output).toStartWith("mars exploration rover mer,");
        expect(card.openApi).toStartWith("https://openapi.services.istex.fr");
        expect(card.source).toBe("https://github.com/Inist-CNRS/web-services/tree/main/services/terms-extraction/v1/teeft");
    });
});
