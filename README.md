# Methode d'extension string

## isNullOrWhiteSpace
Permet de savoir si la chaîne est composé que d'espace ou null / undefined

```js
    let chaine1 = " ";
    let chaine2 = "\t";
    let chaine3 = "\u3000";
    let chaine4 = " Salut ";

    String.isNullOrWhiteSpace(chaine1);
    String.isNullOrWhiteSpace(chaine2);
    String.isNullOrWhiteSpace(chaine3);
    String.isNullOrWhiteSpace(chaine4);
```

## equals

Permet de comparer deux chaines de caractère

```js
    let chaine1 = "Salut";
    let chaine2 = "salut";

    chaine1.equals(chaine2, "ignoreCase");

    let chaine1 = "Héo";
    let chaine2 = "hEo";

    chaine1.equals(chaine2, "ignoreCaseAndAccent");
```

## toDate

Permet de convertir une chaine de caractère en une instance `Date`  
Le format français (JJ/MM/AAAA) est accepté

```js
let chaine = "10/01/2020";
let chaine = "10/01/2020 10:00:00";

let date = chaine.toDate();
```

## toBase64

Permet de convertir une chaine de caractère en base 64

```js
let chaine = "Salut j'étais pas là";

let base64 = chaine.toBase64();
```

## fromBase64

Permet de convertir un base64 en chaine de caractère  
ou un object

```js
let base64 = "SOngbPQ=";

let chaine = base64.fromBase64();
let object = base64.fromBase64<Personne>();
```

## toTitleCase

Permet de mettre la 1ere lettre de chaque mot en majuscule

```js
let chaine = "je suis un titre";

let retour = chaine.toTitleCase();
```

## toSentenceCase

Permet de mettre la 1ere lettre de chaque phrase en majuscule

```js
let chaine = "je suis un titre. mais moi aussi!a bon?oui.ok";

let retour = chaine.toSentenceCase();
```

## countWord

Permet de compter le nombre de mot

```js
let chaine = "je suis un text. Je suis 1er Jean-michel !";

let nb = chaine.countWord();
```

## truncate
Coupe une chaine de caractères

```js
let chaine = "Bonjour tout le monde !";

chaine.truncate(10); // "Bonjoi..."
chaine.truncate(10, "…"); // "Bonjour t…"
```

## mask
Permet de masquer une donnée sensible (numéro de carte, téléphone, e-mail) en conservant des caractères visibles au début et/ou à la fin.

```js
let telephone = "0612345678";
telephone.mask(2, 2); // "06******78"
telephone.mask(0, 4); // "******5678"

let rib = "FR761234567890";
rib.mask(4, 2, "X"); // "FR76XXXXXXXX90"
```

## toSlug
Permet de convertir une chaîne de caractères en slug d'URL propre (supprime accents, caractères spéciaux, espaces superflus).  
Un séparateur personnalisé peut être fourni en option (par défaut `-`).

```js
let chaine1 = "L'été à Paris : un vrai régal !";
chaine1.toSlug(); // "l-ete-a-paris-un-vrai-regal"

let chaine2 = "Article #42 -- Version Finale_v2";
chaine2.toSlug(); // "article-42-version-finale-v2"

// Avec séparateur personnalisé :
chaine1.toSlug("_"); // "l_ete_a_paris_un_vrai_regal"
```

## toCamelCase

Convertit une chaîne en format `camelCase`.

```js
"hello world".toCamelCase();      // "helloWorld"
"user-first-name".toCamelCase();  // "userFirstName"
"user_last_name".toCamelCase();   // "userLastName"
"Créé Par Utilisateur".toCamelCase(); // "creeParUtilisateur"
```

## toKebabCase
Convertit une chaîne en format `kebab-case`.

```js
"helloWorld".toKebabCase();      // "hello-world"
"User First Name".toKebabCase(); // "user-first-name"
"user_api_key".toKebabCase();    // "user-api-key"
```

## toSnakeCase
Convertit une chaîne en format `snake_case`.

```js
"helloWorld".toSnakeCase();      // "hello_world"
"user-first-name".toSnakeCase(); // "user_first_name"
"User Profile Data".toSnakeCase(); // "user_profile_data"
```