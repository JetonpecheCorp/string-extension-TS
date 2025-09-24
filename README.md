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

```js
let base64 = "SOngbPQ=";

let chaine = base64.fromBase64();
```
