declare global
{
    interface String
    {
        /**
         * Compares two strings based on the specified culture option.
         * 
         * @param _string - The string to compare with.
         * @param _cultureInfo - Comparison strategy: "ignoreCase", "ignoreCaseAndAccent", or "exact".
         * @returns `true` if strings match according to the rules, otherwise `false`.
         * @throws {Error} When the `_cultureInfo` parameter is invalid.
         */
        equals(_string: string, _cultureInfo: "ignoreCase" | "ignoreCaseAndAccent" | "exact"): boolean;

        /**
         * Converts the string into a `Date` instance.
         * Supports standard formats as well as the French format (DD/MM/YYYY).
         * 
         * @returns The parsed Date instance.
         */
        toDate(): Date;

        /**
         * Encodes the string into Base64 format (supports UTF-8 characters).
         * 
         * @returns The Base64 encoded string, or `null` if encoding fails.
         */
        toBase64(): string | null;

        /**
         * Decodes a Base64 string back into a plain UTF-8 string, or parses it as JSON if a generic type is provided.
         * 
         * @template T - The target type if the decoded string is expected to be a JSON object.
         * @returns The decoded string or parsed object, or `null` if decoding fails.
         */
        fromBase64<T = string>(): T | string | null;

        /**
         * Capitalizes the first letter of each word in the string.
         * 
         * @returns The formatted title-cased string.
         */
        toTitleCase(): string;

        /**
         * Capitalizes the first letter of each sentence in the string.
         * 
         * @returns The formatted sentence-cased string.
         */
        toSentenceCase(): string;

        /**
         * Counts the number of words in the string.
         * 
         * @returns The total word count.
         */
        countWord(): number;

        /**
         * Truncates the string to a maximum length and appends an ellipsis.
         * 
         * @param _maxLength - The maximum allowed character length.
         * @param _ellipsis - The string appended when truncated (defaults to "...").
         * @returns The truncated string.
         */
        truncate(_maxLength: number, _ellipsis?: string): string;

        /**
         * Masks sensitive characters while keeping a defined number of characters visible at the start and end.
         * 
         * @param _indexVisibleStart - Number of visible characters at the start.
         * @param _indexVisibleEnd - Number of visible characters at the end.
         * @param _replaceBy - Character used for masking (defaults to "*").
         * @returns The masked string.
         */
        mask(_indexVisibleStart: number, _indexVisibleEnd?: number, _replaceBy?: string): string;

        /**
         * Converts the string into a clean URL-friendly slug.
         * Strips accents, special characters, and replaces spaces with the specified separator.
         * 
         * @param _separator - The separator character to use between words (defaults to "-").
         * @returns The generated slug.
         */
        toSlug(_separator?: string): string;

        /**
         * Converts the string to camelCase.
         * Handles spaces, hyphens, underscores, accents, and transitions between lower and upper case letters.
         * 
         * @returns The string formatted in camelCase.
         */
        toCamelCase(): string;

        /**
         * Converts the string to kebab-case (dash-case).
         * Replaces spaces and separators with hyphens, removes accents and special characters.
         * 
         * @returns The string formatted in kebab-case.
         */
        toKebabCase(): string;

        /**
         * Converts the string to snake_case (underscore_case).
         * Replaces spaces and separators with underscores, removes accents and special characters.
         * 
         * @returns The string formatted in snake_case.
         */
        toSnakeCase(): string;
    }

    interface StringConstructor
    {
        /**
         * Checks whether a string is null, undefined, or consists only of whitespace characters.
         * 
         * @param _string - The string to evaluate.
         * @returns `true` if the value is null, undefined, or whitespace only; otherwise `false`.
         */
        isNullOrWhiteSpace(_string: string | null | undefined): boolean;
    }
}

String.isNullOrWhiteSpace = function (_string: string | null | undefined): boolean
{
    return !_string || _string.trim().length === 0;
};

String.prototype.equals = function (_string: string, _cultureInfo: "ignoreCase" | "ignoreCaseAndAccent" | "exact"): boolean
{
    switch (_cultureInfo)
    {
        case "exact":
            return this.toString() === _string;

        case "ignoreCase":
            return this.localeCompare(_string, undefined, { sensitivity: "accent" }) === 0;

        case "ignoreCaseAndAccent":
            return this.localeCompare(_string, undefined, { sensitivity: "base" }) === 0;

        default:
            throw new Error("Le paramètre cultureInfo doit être 'ignoreCase', 'ignoreCaseAndAccent' ou 'exact'");
    }
};

String.prototype.toDate = function (): Date
{
    let dateChaine = this.toString();

    if (this.includes("/"))
    {
        let parties = this.split(" ");

        // Date et heure
        if (parties.length > 1)
        {
            // Inverse la date (DD/MM/YYYY devient YYYY-MM-DD)
            const dateISO = parties[0].split("/").reverse().join("-");
            parties.shift(); // Retire la date du tableau
            
            // Reconstruit la partie heure et fusionne avec un "T"
            const heureISO = parties.join(" ");
            dateChaine = `${dateISO}T${heureISO}`;
        } 
        else
        {
            // Seulement la date
            dateChaine = this.split("/").reverse().join("-");
        }
    }

    return new Date(dateChaine);
};

String.prototype.toBase64 = function (): string | null
{
    if (this.length == 0)
        return null;

    try
    {
        // Support Node.js
        if (typeof Buffer !== "undefined")
            return Buffer.from(this.toString(), "utf-8").toString("base64");

        // Support Navigateur avec encodage UTF-8
        const octets = new TextEncoder().encode(this.toString());
        const chaineBinaire = Array.from(octets, (octet) => String.fromCharCode(octet)).join("");

        return btoa(chaineBinaire);
    } 
    catch (erreur)
    {
        return null;
    }
};

String.prototype.fromBase64 = function <T = string>(): T | string | null
{
    if (this.length == 0)
        return null;

    try
    {
        let chaineDecodee: string;

        // Décodage Base64 vers texte UTF-8
        if (typeof Buffer !== "undefined")
        {
            chaineDecodee = Buffer.from(this.toString(), "base64").toString("utf-8");
        } 
        else
        {
            const chaineBinaire = atob(this.toString());
            const octets = Uint8Array.from(chaineBinaire, (caractere) => caractere.charCodeAt(0));
            chaineDecodee = new TextDecoder().decode(octets);
        }

        // Tente de parser en objet JSON, sinon renvoie la chaîne décodée brute
        try
        {
            return JSON.parse(chaineDecodee) as T;
        } 
        catch
        {
            return chaineDecodee;
        }
    } 
    catch (erreur)
    {
        return null;
    }
};

String.prototype.toTitleCase = function (): string
{
    if (this.length == 0)
        return this as string;

    return this.replace(/(^|\s|\.\s*|\?\s*)\S/g, (element) => element.toUpperCase());
};

String.prototype.toSentenceCase = function (): string
{
    if (this.length == 0)
        return this as string;

    return this.replace(/(^|\.\s*|!\s*|\?\s*)[a-zà-ÿ]/g, (element) => element.toUpperCase());
};

String.prototype.countWord = function (): number
{
    if (this.length == 0)
        return 0;

    return this.match(/[a-zA-Zà-ÿ0-9'-]+/g)?.length ?? 0;
};

String.prototype.truncate = function (_maxLength: number, _ellipsis: string = "..."): string
{
    if (_maxLength <= 0)
        return "";

    if (this.length <= _maxLength)
        return this.toString();

    if (_maxLength <= _ellipsis.length)
        return _ellipsis.slice(0, _maxLength);

    return this.slice(0, _maxLength - _ellipsis.length) + _ellipsis;
};

String.prototype.mask = function (_indexVisibleStart: number, _indexVisibleEnd: number = 0, _replaceBy: string = "*"): string
{
    const chaine = this.toString();
    let longueurChaine = chaine.length;

    // Si on demande plus que la longueur de la chaîne
    if (_indexVisibleStart + _indexVisibleEnd >= longueurChaine)
        return chaine;

    let debutVisible = chaine.slice(0, _indexVisibleStart);
    let finVisible = _indexVisibleEnd > 0 ? chaine.slice(longueurChaine - _indexVisibleEnd) : "";
    let longueurMasquee = longueurChaine - _indexVisibleStart - _indexVisibleEnd;

    return debutVisible + _replaceBy.repeat(longueurMasquee) + finVisible;
};

String.prototype.toSlug = function (_separator: string = "-"): string
{
    // Échappe le séparateur au cas où on passe un caractère spécial de regex (ex: '.')
    const separateurEchappe = _separator.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");

    return (
        this.toString()
            // Décompose les accents et les supprimes
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .toLowerCase()
            // Remplace tout ce qui n'est pas alphanumérique par le séparateur
            .replace(/[^a-z0-9]+/g, _separator)
            // Supprime les répétitions de séparateurs (ex: "---" -> "-")
            .replace(new RegExp(`${separateurEchappe}+`, "g"), _separator)
            // Supprime le séparateur au tout début et à la toute fin
            .replace(new RegExp(`^${separateurEchappe}|${separateurEchappe}$`, "g"), "")
    );
};

function decouperEnMots(texte: string): string[]
{
    return texte
        // Décompose les accents et les supprimes
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        // Insère un espace entre les minuscules et les majuscules (ex: "helloWorld" -> "hello World")
        .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
        // Remplace tout ce qui n'est pas alphanumérique par un espace
        .replace(/[^a-zA-Z0-9]+/g, " ")
        .trim()
        .toLowerCase()
        .split(/\s+/)
        .filter(Boolean);
}

String.prototype.toCamelCase = function (): string
{
    const mots = decouperEnMots(this.toString());
    if (mots.length == 0)
        return "";

    return mots[0] + mots.slice(1).map((mot) => mot.charAt(0).toUpperCase() + mot.slice(1)).join("");
};

String.prototype.toKebabCase = function (): string
{
    return decouperEnMots(this.toString()).join("-");
};

String.prototype.toSnakeCase = function (): string
{
    return decouperEnMots(this.toString()).join("_");
};

export { };