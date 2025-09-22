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