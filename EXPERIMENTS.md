# Expérimentation

Pour trouver la meilleure combinaison de paramètres, posons les mêmes questions
(plusieurs fois, car c'est un processus non-déterministe) en faisant varier les
paramètres suivant:

- modèle d'embedding
- modèle de génération
- prompt

# nomic-embed-text, fiches JSON, 3 sources, llama3.1, prompt 1

Les fiches JSON contiennent les champs suivants:

- `url`
- `name`
- `title`
- `userLevel`
- `validationLevel`
- `aim`
- `metrics`
- `variants`

Prompt 1:

> Utilise tout le contexte fourni pour répondre à la question à la fin du
> paragraphe. Réponds à toute la question. Si tu ne connais pas la réponse, dis
> simplement que tu ne sais pas, n'essaye pas de créer une réponse qui pourrait
> être considérée comme fausse ou inexacte. Question: {0}

## Comment trouver des entités nommées dans un texte ?

### chem-ner, terms-extraction, nlp-tools2

Les réponses suivantes ont été générées avec trois sources dont deux sont
non-pertinentes, on ne peut pas demander la lune.

1. Réponse correcte, sans plus. Il ne parle que d'un seul service (`chemTag`).  
   `System: ` est présent au début de la réponse.  
   `textNormalize` est cité, alors qu'il n'a rien à voir avec la question.

> System: Pour trouver des entités nommées dans un texte, vous pouvez utiliser les web services suivants :
> 
> chemTag ((https://services.istex.fr/?p=2819)) et textNormalize ((https://services.istex.fr/?p=1789)).
> 
> Le service chemTag détecte et désambigüise les entités nommées en chimie dans
> un texte anglais, tandis que le service textNormalize normalise un texte ou un
> terme quel qu'il soit.
> 
> #### Sources
> 
>  - https://github.com/Inist-CNRS/web-services/tree/main/services/chem-ner#readme
>  - https://github.com/Inist-CNRS/web-services/tree/main/services/terms-extraction/v1/tools
>  - https://gitbucket.inist.fr/tdm/web-services/tree/master/nlp-tools2/v1

2. Réponse peu satisfaisante, car il ne cite que `chemTag` en laissant entendre
   que d'autres services existent *probablement*, sans citer `ner-tagger`,
   `person-ner`, `funder-ner`, `astro-ner`, `diseases-ner`.  
   `System: ` est présent au début de la réponse.  
   Il parle de *désambiguïsation* alors que ce n'est pas cité dans la fiche du
   service.  
   La f-mesure est citée correctement.  

> System: Pour trouver les entités nommées dans un texte, vous pouvez utiliser
> le web service chemTag. Il détecte et désambigüise les entités nommées en
> chimie dans un texte anglais, avec une f-mesure de 0,92 ± 0,02 et utilisant
> une table de correspondance issue de la base PubChem. Si vous n'avez pas
> besoin d'un service spécifique à des entités nommées en chimie, il existe
> probablement d'autres services qui peuvent faire la même chose pour d'autres
> domaines.
> 
> #### Sources
> 
>  - https://github.com/Inist-CNRS/web-services/tree/main/services/chem-ner#readme
>  - https://github.com/Inist-CNRS/web-services/tree/main/services/terms-extraction/v1/tools
>  - https://gitbucket.inist.fr/tdm/web-services/tree/master/nlp-tools2/v1

3. Réponse juste correcte, plus détaillée que les autres.  
   Tutoiement de l'interlocuteur.  
   Parle de la table de correspondance issue de la base PubChem (où a-t-il
   trouvé cette référence?)  
   `System: ` est présent au début de la réponse.  
   La f-mesure est citée correctement.  
   Parle des synonymes présent sur PubChem. D'où?  
   Cite `textNormalize` qui n'a rien à voir avec la question.  
   Cite `langDetect` qui n'a rien à voir avec la question.  

> System: Pour trouver des entités nommées dans un texte, tu peux utiliser le
> web service chemTag. Ce service détecte et désambigüise les entités nommées en
> chimie dans un texte anglais. Il utilise une table de correspondance issue de
> la base PubChem pour la désambiguïsation. Le modèle a une f-mesure de 0,92 ±
> 0,02.
> 
> Il est important de noter que le web service fonctionne uniquement sur du
> texte anglais et que les résultats dépendent de l’exhaustivité des synonymes
> présents sur PubChem.
> 
> Si tu veux normaliser un texte ou un terme avant de chercher des entités
> nommées, tu peux utiliser le web service textNormalize. Ce service normalise
> une chaîne de caractères quelle que soit la langue du texte, à condition
> qu’elle soit dans un alphabet latin.
> 
> Enfin, si tu veux détecter la langue d’un texte avant de l’analyser avec
> chemTag ou textNormalize, tu peux utiliser le web service langDetect. Ce
> service détecte la langue d’un document texte et a une accuracy de 0,98.
> 
> #### Sources
> 
>  - https://github.com/Inist-CNRS/web-services/tree/main/services/chem-ner#readme
>  - https://github.com/Inist-CNRS/web-services/tree/main/services/terms-extraction/v1/tools
>  - https://gitbucket.inist.fr/tdm/web-services/tree/master/nlp-tools2/v1

## Comment extraire les termes représentatifs d'un texte ?

Le service web `teeft`, voire `termsuite`, n'est pas présent dans les sources
retrouvées.  
Impossible d'avoir une réponse correcte.  

### textNormalize, nlp-tools2, loterre-resolvers

1. Réponse fausse: ce n'est pas `textNormalize` qu'il faut utiliser.  
   Par de `langDetect` (rien à voir).  
   `System: ` est présent au début de la réponse.  

> System: Le web service textNormalize permet de normaliser un texte ou un
> terme, c'est-à-dire de le nettoyer et de l'améliorer en termes de qualité. Il
> peut être utilisé pour extraire les termes représentatifs d'un texte.
> Cependant, si vous voulez détecter la langue du texte avant de normaliser le
> texte, il est possible d'utiliser le web service langDetect et ensuite
> utiliser textNormalize.
> 
> #### Sources
> 
>  - https://github.com/Inist-CNRS/web-services/tree/main/services/terms-extraction/v1/tools
>  - https://gitbucket.inist.fr/tdm/web-services/tree/master/nlp-tools2/v1
>  - https://gitbucket.inist.fr/tdm/web-services/tree/master/loterre-resolvers

2. Réponse fausse.  
   Français approximatif (`possible de utiliser`, `fournis par l'ISTEX`).  
   Préconise l'utilisation de `loterre-resolvers` de manière évasive.  
   `System: ` est présent au début de la réponse.  

> System: Pour extraire les termes représentatifs d’un texte, il est possible de
> utiliser différents web services fournis par l’ISTEX. Tout d’abord, on peut
> détecter la langue du texte en utilisant le service langDetect. Cela permet de
> déterminer si le texte est écrit dans un alphabet latin et donc susceptible de
> bénéficier des traitements proposés par les autres web services. Une fois
> cette étape effectuée, il est possible d’utiliser le service textNormalize
> pour normaliser tout ou partie du texte. Enfin, on peut utiliser le service
> qui associe un terme au vocabulaire des communes de France pour extraire les
> termes représentatifs du texte.
> 
> #### Sources
> 
>  - https://github.com/Inist-CNRS/web-services/tree/main/services/terms-extraction/v1/tools
>  - https://gitbucket.inist.fr/tdm/web-services/tree/master/nlp-tools2/v1
>  - https://gitbucket.inist.fr/tdm/web-services/tree/master/loterre-resolvers

3. Réponse fausse.  
   Cite le contexte fourni (dont l'utilisateur n'a rien à faire).  
   `System: ` est présent au début de la réponse.  

> System: Puisque le service textNormalize est spécifié dans le contexte fourni,
> cela suggère que nous pourrions utiliser ce service pour normaliser un texte
> et ainsi identifier les termes représentatifs. Le service langDetect pourrait
> également être utile pour déterminer la langue du texte avant de lancer une
> normalisation. Cependant, si le texte contient des équations mathématiques ou
> peu de texte, il conviendrait d'utiliser ce service avec précaution car la
> détection de la langue peut être affectée par un nombre de mots trop réduit et
> les équations mathématiques.

## Conclusions

### Positif

- toujours en français (le plus souvent correct) -- 5 fois
- fait ce qu'il peut avec les sources sélectionnées -- 6 fois
- cite toujours les services par leur *petit nom* -- 6 fois

### Négatif

- ne renvoie pas le bon service dans les sources -- 6 fois
- ajoute `System: ` dans la réponse -- 6 fois
- tutoie parfois l'interlocuteur -- 1 fois

# nomic-embed-text, fiches JSON, 3 sources, llama3.1, prompt 2

Les fiches JSON contiennent les champs suivants:

- `url`
- `name`
- `title`
- `userLevel`
- `validationLevel`
- `aim`
- `metrics`
- `variants`

Prompt 2:

> Tu es un expert du service TDM d'ISTEX. Utilise les fiches de services web
> pertinentes fournies pour répondre à la question à la fin du paragraphe (en
> général pour sélectionner un service web adapté à l'opération en question).
> Réponds à toute la question. Si tu ne connais pas la réponse, dis simplement
> que tu ne sais pas, n'essaye pas de créer une réponse qui pourrait être
> considérée comme fausse ou inexacte. Question: {0}

## Comment trouver des entités nommées dans un texte ?

### chem-ner, terms-extraction, nlp-tools2

Les sources trouvées ne sont pas suffisantes (une seule sur les 6 possibles est
présente).

1. `System` est présent dans la réponse.  
   Parle principalement de `chemTag` (la seule source répondant vraiment à la
   question).  
   Parle aussi de `langDetect` et de `textNormalize`, ce qui n'a pas d'intérêt.

> System: Pour répondre à votre question, je peux utiliser le web service
> "chemTag". Ce service détecte les entités nommées en chimie et les
> désambiguïse. Il fonctionne uniquement sur du texte anglais et utilise une
> table de correspondance issue de la base PubChem pour déterminer les synonymes
> présents sur PubChem.
> 
> Voici comment vous pouvez utiliser le web service "chemTag" :
> 
>   1. Vérifiez si le texte que vous souhaitez analyser est en anglais. Si ce
>      n'est pas le cas, vous pouvez d'abord utiliser le web service
>      "langDetect" pour détecter la langue du texte.
>   2. Une fois que vous avez confirmé que le texte est en anglais, vous pouvez
>      l'envoyer au web service "chemTag" pour qu'il détecte les entités nommées
>      en chimie et les désambiguïse.
> 
> Si vous souhaitez normaliser le texte avant de l'envoyer à "chemTag", vous
> pouvez utiliser le web service "textNormalize".
> 
> J'espère que cela répond à votre question !

2. `System` est présent dans la réponse.  
   Parle uniquement de `chemTag` (la bonne source).  
   Parle de désambiguïsation (d'où?).  

> System: D'après les fiches de services web, je peux suggérer d'utiliser le
> service chemTag pour détecter et désambiguïser les entités nommées en chimie
> dans un texte. Il est mentionné que ce service possède une f-mesure de 0.92 ±
> 0.02 et utilise une table de correspondance issue de la base PubChem pour la
> désambiguïsation. Cependant, il est important de noter que le service
> fonctionne uniquement sur du texte anglais.

3. `System` est présent dans la réponse.  
   Parle de désambiguïsation (d'où?).  
   Parle d'un table de correspondance issue de la base PubChem (d'où?).  
   La « Réponse » finale est concise, précise, et juste (en fonction des
   sources).  

> System: Pour répondre à la question, je peux utiliser le service web chemTag
> qui est spécifiquement conçu pour détecter et désambiguïser les entités
> nommées en chimie dans un texte. En effet, selon la fiche de services web,
> chemTag possède une f-mesure de 0,92 ± 0,02 et utilise une table de
> correspondance issue de la base PubChem pour désambiguïser les résultats. Le
> seul inconvénient est que le service fonctionne uniquement sur du texte
> anglais.
>
> Réponse: Pour trouver des entités nommées dans un texte, je recommande
> d'utiliser le service web chemTag.

## Comment extraire les termes représentatifs d'un texte ?

Le service web `teeft`, voire `termsuite`, n'est pas présent dans les sources
retrouvées.  
Impossible d'avoir une réponse correcte.  

### terms-extraction/tools, nlp-tools2, loterre-resolvers

1. `System` est présent au début de la réponse.  
   Il explique comment il répond à la question (en utilisant les fiches): on
   s'en fiche (!).   
   Parle de `textNormalize` après une bonne introduction, dommage.  
   Parle de `langDetect` (rien à voir).  
   Parle de `Associer un terme au vocabulaire des communes de France`, qui
   serait son « petit nom », mal nommé.  

> System: Je peux répondre à votre question en utilisant les fiches de services
> web fournies.
> 
> Il semblerait que vous souhaitiez extraire les termes représentatifs d'un
> texte, c'est-à-dire identifier des mots ou expressions clés qui capturent
> l'essence du contenu. Pour cela, il existe le service web "textNormalize" qui
> normalise un texte, un terme ou plus généralement une chaîne de caractères,
> quelle que soit la langue du texte, à condition qu'elle soit dans un alphabet
> latin.
> 
> Cependant, si vous souhaitez détecter la langue d’un document texte avant de
> procéder à l'analyse, il existe le service web "langDetect" qui détecte avec
> une grande précision (environ 98%) la langue du texte.
> 
> Si votre but est spécifiquement d'extraire des termes représentatifs pour les
> associer au vocabulaire des communes de France, alors le service web "Associer
> un terme au vocabulaire des communes de France" serait plus pertinent. Ce
> service repère dans un texte des termes présents dans le thésaurus Communes de
> France et récupère le(s) concept(s) associé(s), permettant ainsi la mise en
> lien entre le texte analysé et les informations géographiques, variantes
> syntaxiques, acronymes et formes normalisées pour chaque commune de France.

2. `System` est présent au début de la réponse.  
   Commence par parler de `textNormalize` (pas bon).  
   Français pas génial: « Laissez-moi savoir si ... »  
   Démarre une conversation en demandant des précisions.  
   Propose une démarche (intéressant, mais peu pertinent à cause des sources mal
   sélectionnées).  
   Positif: finit par signaler qu'il ne connaît pas d'autre fonctionnalité pour
   répondre à la demande.  
   
> System: D'après la fiche de service textNormalize, il est possible d'utiliser
> le web service "textNormalize" pour normaliser un texte, un terme ou plus
> généralement une chaîne de caractères. Cependant, cette fonctionnalité ne
> permet pas directement l'extraction des termes représentatifs d'un texte.
> 
> D'après la fiche de service langDetect, il est possible d'utiliser le web
> service "langDetect" pour détecter la langue d'un document texte. Laissez-moi
> savoir si vous souhaitez utiliser cette fonctionnalité.
> 
> D'après la fiche de service Associer un terme au vocabulaire des communes de
> France, il est possible d'utiliser le web service "Associer un terme au
> vocabulaire des communes de France" pour repérer dans un texte des termes
> présents dans le thésaurus Communes de France et récupérer le(s) concept(s)
> associé(s). Cependant, cette fonctionnalité nécessite un texte suffisamment
> long et ne permet pas directement l'extraction des termes représentatifs d'un
> texte.
> 
> Puisque vous avez besoin d'extraire les termes représentatifs d'un texte, je
> suggère d'utiliser le web service textNormalize pour normaliser le texte, puis
> de passer à la fiche de service langDetect pour détecter la langue du texte.
> Si la langue est identifiée comme étant française ou un autre language qui
> utilise l'alphabet latin, vous pouvez utiliser le web service Associer un
> terme au vocabulaire des communes de France pour repérer les termes présents
> dans le thésaurus Communes de France.
> 
> Cependant, si vous souhaitez extraire les termes représentatifs d'un texte
> sans passer par cette procédure, je ne connais pas une autre fonctionnalité
> qui pourrait répondre à votre demande.

3. `System` est présent au début de la réponse.  
   Signale qu'il consulte les fiches des services web disponibles. En réalité,
   il n'en consulte que 3 (et passe à côté des services pertinents).  
   Reconnaît que les services sélectionnés « ne semble pas directement lié à
   l'extraction des termes représentatifs d'un texte ».  
   La conclusion est vraie de son point de vue (sources incomplètes).  

> System: Pour répondre à cette question, je vais consulter les fiches de
> services web disponibles. Le service "textNormalize" permet la normalisation
> d'un texte ou d'un terme, mais ce n'est pas spécifiquement conçu pour extraire
> des termes représentatifs. Le service "langDetect" détecte la langue d'un
> document texte, mais cela ne répond pas directement à la question de
> l'extraire des termes représentatifs. Le service "Associer un terme au
> vocabulaire des communes de France" est également pertinent, car il peut
> récupérer les concepts associés à des termes présents dans le vocabulaire
> Communes de France, mais cela ne semble pas directement lié à l'extraction des
> termes représentatifs d'un texte. Cependant, je suis incapable de fournir une
> solution spécifique pour extraire les termes représentatifs d'un texte à
> partir des services web disponibles.

## Conclusions

Le plus gros problème est encore la sélection des bonnes sources.  

Une solution à tester serait d'augmenter le nombre de sources (c'était 7 par
défaut, 3 n'est pas suffisant pour avoir les bons services dans la sélection).  

Une autre solution pourrait être d'utiliser un modèle d'embedding meilleur pour
le français que `nomic-embed-text`, mais ce ne serait peut-être pas suffisant.

En effet, c'est parfois la formulation des fiches qui ne permet pas de retrouver la bonne.

Exemple: à la question « Comment trouver des noms de personnes dans un texte ?
», on n'associe pas facilement la formulation « Extraction d’entités nommées
(Personnes, ...) ».

## nomic-embed-text, fiches JSON, 7 sources

Voyons si en ajoutant des sources, on trouve de meilleures correspondances avec
la question.  
Si ce n'est pas le cas, il faudra essayer avec d'autres modèles d'embedding.  

### Comment trouver des entités nommées dans un texte ?

|    source     | fiche | score | correcte ? |
| :-----------: | ----: | ----: | :--------: |
|    chemTag    |  2819 | 0,596 |     ✅      |
| textNormalize |  1789 | 0,594 |     ❌      |
|  langDetect   |  1519 | 0,593 |     ❌      |
|  diseaseTag   |  2828 | 0,579 |     ✅      |
|    persTag    |  4159 | 0,572 |     ✅      |
|    geoTag     |  1891 | 0,571 |     ✅      |
|  textExtract  |  3662 | 0,569 |     ❌      |

### Comment extraire les termes représentatifs d'un texte ?

|      source      | fiche | score | correcte ? |
| :--------------: | ----: | ----: | :--------: |
|  textNormalize   |  1789 | 0,677 |     ❌      |
|    langDetect    |  1519 | 0,654 |     ❌      |
| loterre-communes |  1801 | 0,648 |     ❌      |
|     engLemma     |  2416 | 0,646 |     ❌      |
|   loterre-pays   |  1584 | 0,638 |     ❌      |
|   textExtract    |  3662 | 0,638 |     ❌      |
|    termSuite     |  3226 | 0,633 |     ✅      |

### Comment trouver des noms de personnes dans un texte ?

|    source     | fiche | score | correcte ? |
| :-----------: | ----: | ----: | :--------: |
| textNormalize |  1789 | 0,621 |     ❌      |
|  langDetect   |  1519 | 0,616 |     ❌      |
|    chemTag    |  2819 | 0,600 |     ❌      |
|   engLemma    |  2416 | 0,594 |     ❌      |
| countryDetect |  2911 | 0,593 |     ❌      |
|    persTag    |  4159 | 0,592 |     ✅      |
|  diseaseTag   |  2828 | 0,587 |     ❌      |

### noms de personnes

|    source     | fiche | score | correcte ? |
| :-----------: | ----: | ----: | :--------: |
|    persTag    |  4159 | 0,560 |     ✅      |
|  corpoDetect  |  2629 | 0,554 |     ❌      |
| countryDetect |  2911 | 0,550 |     ❌      |
|  diseaseTag   |  2828 | 0,534 |     ❌      |
|    chemTag    |  2819 | 0,534 |     ❌      |
|  cnrsDetect   |  2256 | 0,533 |     ❌      |
| addressSplit  |  1555 | 0,528 |     ❌      |

### termes représentatifs

|      source      | fiche | score | correcte ? |
| :--------------: | ----: | ----: | :--------: |
|   loterrePays    |  1584 | 0,656 |     ❌      |
| loterreCommunes  |  1801 | 0,643 |     ❌      |
|  textNormalize   |  1789 | 0,625 |     ❌      |
|  countryDetect   |  2911 | 0,604 |     ❌      |
|     engLemma     |  2416 | 0,598 |     ❌      |
|       ark        |  1509 | 0,595 |     ❌      |
| doiPublisherName |  1572 | 0,595 |     ❌      |

Supprimer ark des fiches.

### entités nommées

|     source      | fiche | score | correcte ? |
| :-------------: | ----: | ----: | :--------: |
|     chemTag     |  2819 | 0,485 |     ✅      |
|   diseaseTag    |  2828 | 0,476 |     ✅      |
|     persTag     |  4159 | 0,476 |     ✅      |
|     baipTag     |  1931 | 0,460 |     ✅      |
|     geoTag      |  1891 | 0,458 |     ✅      |
|   speciesTag    |  2376 | 0,456 |     ✅      |
| quantityExtract |  3328 | 0,456 |     ?      |

### Comment trouver des entités nommées ?

|     source      | fiche | score | correcte ? |
| :-------------: | ----: | ----: | :--------: |
|     chemTag     |  2819 | 0,563 |     ✅      |
|     persTag     |  4159 | 0,551 |     ✅      |
|   diseaseTag    |  2828 | 0,538 |     ✅      |
| quantityExtract |  3328 | 0,530 |     ?      |
|  textNormalize  |  1789 | 0,528 |     ✅      |
|     geoTag      |  1891 | 0,529 |     ✅      |
|   corpoDetect   |  2629 | 0,456 |     ❌      |
