# Extensions pour les chaînes de caractères (String Extensions)

*[Read this documentation in English](README.md)*

Une collection complète de méthodes d'extension utilitaires pour l'objet natif `String` de JavaScript/ts.

## Installation et configuration

Il suffit d'importer ce fichier au point d'entrée de votre application pour enrichir le prototype global `String`.

## Méthodes

### `isNullOrWhiteSpace` (Statique)
Vérifie si une chaîne est `null`, `undefined` ou composée uniquement de caractères d'espacement.

```ts
let str1 = " ";
let str2 = "\t";
let str3 = "\u3000";
let str4 = " Hello ";

String.isNullOrWhiteSpace(str1); // true
String.isNullOrWhiteSpace(str2); // true
String.isNullOrWhiteSpace(str3); // true
String.isNullOrWhiteSpace(str4); // false
```

### `equals`
Compare deux chaînes selon des règles spécifiques. Les options incluent `"ignoreCase"`, `"ignoreCaseAndAccent"` ou `"exact"`.

```ts
let str1 = "Hello";
let str2 = "hello";
str1.equals(str2, "ignoreCase"); // true

let str3 = "Héo";
let str4 = "hEo";
str3.equals(str4, "ignoreCaseAndAccent"); // true
```

### `toDate`
Convertit une chaîne en une instance `Date`. Elle gère correctement le format de date français standard (JJ/MM/AAAA) et le convertit en interne au format strict ISO 8601.

```ts
let dateStr1 = "10/01/2020";
let dateStr2 = "10/01/2020 10:00:00";

let date1 = dateStr1.toDate();
let date2 = dateStr2.toDate();
```

### `toBase64`
Encode une chaîne au format Base64. Elle gère en toute sécurité les caractères UTF-8 et les accents sans générer d'erreur. 

```ts
let str = "Hello, I wasn't there";
let base64 = str.toBase64();
```

### `fromBase64`

Convertit une chaîne codée en base64 en une chaîne normale.  
Il tente automatiquement d'analyser la chaîne décodée en tant qu'objet JSON si possible. Vous pouvez fournir un type générique `<T>` pour la structure d'objet attendue.

```ts
// Basic string decoding
let base64String = "U2FsdXQgamfDqXRhaXMgcGFzIGzDoA==";
let decoded = base64String.fromBase64(); // "Salut j'étais pas là"

// JSON object decoding
let base64Json = "eyJuYW1lIjoiSm9obiIsImFnZSI6MzB9";
let user = base64Json.fromBase64<User>(); // { name: "John", age: 30 }
```

### `toTitleCase`
Met en majuscule la première lettre de chaque mot de la chaîne.

```ts
let str = "i am a title";
let result = str.toTitleCase(); // "I Am A Title"
```

### `toSentenceCase`
Met en majuscule la première lettre de chaque phrase de la chaîne.

```ts
let str = "i am a title. but me too! really? yes. ok";
let result = str.toSentenceCase(); // "I am a title. But me too! Really? Yes. Ok"
```

### `countWord`
Compte le nombre total de mots dans la chaîne.

```ts
let str = "I am a text. I am 1st John-Doe !";
let count = str.countWord(); // 7
```

### `truncate`
Tronque une chaîne à une longueur maximale et y ajoute des points de suspension.

```ts
let str = "Hello everyone !";

str.truncate(10); // "Hello e..."
str.truncate(10, "…");
``` // "Hello eve…"
```

### `mask`
Masque les données sensibles (comme les numéros de carte de crédit, les numéros de téléphone ou les e-mails) en remplaçant les caractères par un masque, tout en conservant un nombre spécifique de caractères visibles au début et/ou à la fin.

```ts
let phone = "0612345678";
phone.mask(2, 2); // "06******78"
phone.mask(0, 4); // "******5678"

let iban = "FR761234567890";
iban.mask(4, 2, "X"); // "FR76XXXXXXXX90"
```

### `toSlug`
Convertit une chaîne de caractères en un slug propre et adapté aux URL. Elle supprime les accents, les caractères spéciaux et les espaces superflus. Un séparateur personnalisé peut être fourni (par défaut : `-`).

```ts
let str1 = "Summer in Paris : a real treat !";
str1.toSlug(); // "summer-in-paris-a-real-treat"

let str2 = "Article #42 -- Final Version_v2";
str2.toSlug(); // "article-42-final-version-v2"

// Avec un séparateur personnalisé :
str1.toSlug("_"); // "summer_in_paris_a_real_treat"
```

### `toCamelCase`
Convertit une chaîne de caractères en `camelCase`.

```ts
"hello world".toCamelCase(); // "helloWorld"
"user-first-name".toCamelCase(); // "userFirstName"
"user_last_name".toCamelCase(); // "userLastName"
"Created By User".toCamelCase(); // "createdByUser"
```

### `toKebabCase`
Convertit une chaîne de caractères en `kebab-case`.

```ts
"helloWorld".toKebabCase(); // "hello-world"
"User First Name".toKebabCase(); // "user-first-name"
"user_api_key".toKebabCase(); // "user-api-key"
```

### `toSnakeCase`
Convertit une chaîne de caractères en `snake_case`.

```ts
"helloWorld".toSnakeCase(); // "hello_world"
"user-first-name".toSnakeCase(); // "user_first_name"
"User Profile Data".toSnakeCase(); // "user_profile_data"
```