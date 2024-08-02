#!/usr/bin/env bun

import { strict as assert } from 'node:assert';
import { html2card } from "./create-cards";

const waitOneSecond = () => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(null);
        }, 1000);
    });
}

const URL_BIB_CHECK = 'https://services.istex.fr/validation-de-reference-bibliographique/';

const html = await (await fetch(URL_BIB_CHECK)).text();

const card = html2card(html);

assert.equal(card.title, "bibCheck - Contrôle de référence bibliographique");
assert.equal(card.name, "bibCheck");
assert.equal(card.userLevel, "Débutant");
assert.equal(card.validationLevel, "Expérimental");
assert.match(card.aim, /^Ce web service/);
assert.match(card.method, /^L’entrée est une/);
assert.ok(card.metrics);
assert.equal(card.others, "Enrichissement par DOI\nVerbalisation des préfixes de DOI");
assert.equal(card.url, "https://biblio-ref.services.istex.fr/v1/validate");
assert.match(card.openApi ?? "", /^https:\/\/openapi.services.istex.fr/)
assert.equal(card.source, "https://github.com/Inist-CNRS/web-services/tree/main/services/biblio-ref");

console.log(card);

await waitOneSecond();

const URL_TEEFT = 'https://services.istex.fr/extraction-de-termes-dun-corpus/';

