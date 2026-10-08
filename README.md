# String Extensions

*[Documentation en français](https://github.com/JetonpecheCorp/string-extension-TS/blob/main/README.fr.md)*

A comprehensive collection of utility extension methods for the native JavaScript/ts `String` object. 

## Installation & Setup

Simply import this file at the entry point of your application to augment the global `String` prototype.

## Methods

### `isNullOrWhiteSpace` (Static)
Checks if a string is `null`, `undefined`, or consists entirely of whitespace characters.

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
Compares two strings based on specific comparison rules. Options include `"ignoreCase"`, `"ignoreCaseAndAccent"`, or `"exact"`.

```ts
let str1 = "Hello";
let str2 = "hello";
str1.equals(str2, "ignoreCase"); // true

let str3 = "Héo";
let str4 = "hEo";
str3.equals(str4, "ignoreCaseAndAccent"); // true
```

### `toDate`
Converts a string into a `Date` instance. It gracefully handles the standard French date format (DD/MM/YYYY) and converts it to strict ISO 8601 under the hood.

```ts
let dateStr1 = "10/01/2020";
let dateStr2 = "10/01/2020 10:00:00";

let date1 = dateStr1.toDate();
let date2 = dateStr2.toDate();
```

### `toBase64`
Encodes a string into Base64 format. It safely handles UTF-8 characters and accents without throwing errors.

```ts
let str = "Hello, I wasn't there";
let base64 = str.toBase64(); 
```

### `fromBase64`
Decodes a Base64 string back into a plain string. You can optionally pass `true` to attempt parsing the decoded string into a JSON object.

```ts
let base64 = "eyJuYW1lIjoiSm9obiJ9"; // {"name":"John"}

// Returns a plain string
let plainText = base64.fromBase64(); 

// Parses the string as JSON and casts it to the generic type
let obj = base64.fromBase64<Person>(true); 
```

### `toTitleCase`
Capitalizes the first letter of every word in the string.

```ts
let str = "i am a title";
let result = str.toTitleCase(); // "I Am A Title"
```

### `toSentenceCase`
Capitalizes the first letter of every sentence in the string.

```ts
let str = "i am a title. but me too! really? yes. ok";
let result = str.toSentenceCase(); // "I am a title. But me too! Really? Yes. Ok"
```

### `countWord`
Counts the total number of words in the string.

```ts
let str = "I am a text. I am 1st John-Doe !";
let count = str.countWord(); // 7
```

### `truncate`
Truncates a string to a maximum length and appends an ellipsis.

```ts
let str = "Hello everyone !";

str.truncate(10); // "Hello e..."
str.truncate(10, "…"); // "Hello eve…"
```

### `mask`
Masks sensitive data (like credit card numbers, phone numbers, or emails) by replacing characters with a mask, while keeping a specific number of characters visible at the start and/or end.

```ts
let phone = "0612345678";
phone.mask(2, 2); // "06******78"
phone.mask(0, 4); // "******5678"

let iban = "FR761234567890";
iban.mask(4, 2, "X"); // "FR76XXXXXXXX90"
```

### `toSlug`
Converts a string into a clean, URL-friendly slug. It strips accents, special characters, and extra spaces. A custom separator can be provided (defaults to `-`).

```ts
let str1 = "Summer in Paris : a real treat !";
str1.toSlug(); // "summer-in-paris-a-real-treat"

let str2 = "Article #42 -- Final Version_v2";
str2.toSlug(); // "article-42-final-version-v2"

// With a custom separator:
str1.toSlug("_"); // "summer_in_paris_a_real_treat"
```

### `toCamelCase`
Converts a string to `camelCase`.

```ts
"hello world".toCamelCase();          // "helloWorld"
"user-first-name".toCamelCase();      // "userFirstName"
"user_last_name".toCamelCase();       // "userLastName"
"Created By User".toCamelCase();      // "createdByUser"
```

### `toKebabCase`
Converts a string to `kebab-case`.

```ts
"helloWorld".toKebabCase();           // "hello-world"
"User First Name".toKebabCase();      // "user-first-name"
"user_api_key".toKebabCase();         // "user-api-key"
```

### `toSnakeCase`
Converts a string to `snake_case`.

```ts
"helloWorld".toSnakeCase();           // "hello_world"
"user-first-name".toSnakeCase();      // "user_first_name"
"User Profile Data".toSnakeCase();    // "user_profile_data"
```