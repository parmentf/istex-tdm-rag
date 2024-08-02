#!/usr/bin/env bun

import * as cheerio from 'cheerio';

const getTextPart = (html: string, section: string) => {
    const $ = cheerio.load(html);
    const partElements = $(`div.wsHeader.flexrow div.wsContentFull div:contains("${section}")`)
        .siblings() ?? [];
    let partText = '';
    for (let i = 0; i < partElements.length; i++) {
        partText += (partElements.eq(i).text().trim() ?? '') +'\n';
    }
    return partText.trim();
}

export const html2card = (html: string) => {
    const $ = cheerio.load(html);
    const title = $('div.backZone.zutile h1').text().replace(/\n/g, ' ').replace(/ +/g, ' ').trim();
    // console.error(title);
    const name = title.split(' - ')?.[0] ?? "";
    const userLevel = $('div.compl span.compContent').eq(0).text();
    const validationLevel = $('div.compl span.compContent').eq(1).text();
    const aim = getTextPart(html, 'Objectif');
    const method = getTextPart(html, 'Méthode');
    const metrics = getTextPart(html, 'Métriques');
    const variants = getTextPart(html, 'Variantes');
    const others = getTextPart(html, 'Ces web services qui peuvent vous intéresser');
    const references = getTextPart(html, 'Références');

    const url = $('#textToCopy-2').text().trim() ?? $('#textToCopy-3').text().trim();

    // console.assert(!title.startsWith("none"), $('.wsEntry pre').eq(0).text().trim() ?? '{}');
    // const input = JSON.parse($('.wsEntry pre').eq(0).text().trim().replace(/\n/g, ' ') ?? '{}');

    // console.assert(!title.startsWith("none"), $('.wsResult pre').eq(0).text().trim() ?? '{}');
    // const output = JSON.parse($('.wsResult pre').eq(0).text().replaceAll('\u{200b}', '').trim() ?? '{}');

    const openApi = $('.wsLinks div.wsTitleW:contains("Démonstration")').parent().parent().attr('href');
    const source = $('.wsLinks div.wsTitleW:contains("source")').parent().parent().attr('href');
    return {
        title,
        name,
        userLevel,
        validationLevel,
        aim,
        method,
        metrics,
        variants,
        others,
        references,
        url,
        // input,
        // output,
        openApi,
        source,
    }
}
