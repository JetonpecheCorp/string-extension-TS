# Methode d'extension string

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