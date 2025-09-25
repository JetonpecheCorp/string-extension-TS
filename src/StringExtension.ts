declare global {
    interface String {
        /**
         * Comparer deux chaînes de caractères selon la culture spécifiée
         * 
         * @param _string
         * @param _cultureInfo "ignoreCase", "ignoreCaseAndAccent" ou "exact"
         * 
         * @throws Si le paramètre cultureInfo n'est pas valide
         */
        equals(_string: string, _cultureInfo: "ignoreCase" | "ignoreCaseAndAccent" | "exact"): boolean,

        /**
         * Convertir un string en une instance date  
         * Le format Français (JJ/MM/AAAA) est accepté
         */
        toDate(): Date,

        /**
         * Convertir la chaîne de caractère en base 64
         * 
         * @returns La chaîne convertit en base 64
         */
        toBase64(): string | null,

        /**
         * Convertir la chaîne en base 64 en chaîne de caractère
         * 
         * @returns La chaîne base 64 convertit en chaîne de caractère
         */
        fromBase64(): string | null,

        /**
         * Mettre la première lettre de chaque mot en majuscule
         */
        toTitleCase(): string,

        /**
         * Mettre la première lettre de chaque phrase en majuscule
         */
        toSentenceCase(): string

        /**
         * Compter le nombre de mot
         */
        countWord(): number
    }
}

String.prototype.equals = function(_string: string, _cultureInfo: "ignoreCase" | "ignoreCaseAndAccent" | "exact"): boolean
{
    switch (_cultureInfo)
    {
        case "exact":
            return this === _string;

        case "ignoreCase":
            return this.toLowerCase() === _string.toLowerCase();
        
        case "ignoreCaseAndAccent":
            /**
             * Supprimer les accents
             * 
             * decomposer les caracteres accentués  
             * exemple: "é" devient "e" et "accent du e"
             * 
             * replace => permet de supprimer les accents du decomposeur de la chaine
             */
            const normalize = (str: string) => str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
            return normalize(this.toLowerCase()) === normalize(_string.toLowerCase());

        default:
            throw new Error("Le paramètre cultureInfo doit être 'ignoreCase', 'ignoreCaseAndAccent' ou 'exact'");
    }
}

String.prototype.toDate = function(): Date
{
    let dateString = this;

    if(this.includes("/"))
    {
        let split = this.split(" ");

        // date et heure
        if(split.length > 1)
        {
            dateString = `${split[0].split("/").reverse().join("-")} `;
            split.shift();
            dateString += split.join(" ");
        }
        else
            dateString = this.split("/").reverse().join("-");
    }

    return new Date(dateString as any);
}

String.prototype.toBase64 = function(): string | null
{
    if(this.length == 0)
        return null;

    try 
    {
        return btoa(this as string);
    } 
    catch (error) 
    {
        return null;
    }
}

String.prototype.fromBase64 = function(): string | null
{
    if(this.length == 0 || this[this.length - 1] != "=")
        return null;

    try 
    {
        return atob(this as string);
    } 
    catch (error) 
    {
        return null;    
    }
}

String.prototype.toTitleCase = function(_firstLetterSentence: boolean = false): string
{
    if(this.length == 0)
        return this as string;

    return this.replace(/(^|\s|\.\s*|\?\s*)\S/g, x =>  x.toUpperCase());
}

String.prototype.toSentenceCase = function(): string
{
    if(this.length == 0)
        return this as string;

    return this.replace(/(^|\.\s*|!\s*|\?\s*)[a-zà-ÿ]/g, x => x.toUpperCase());
}

String.prototype.countWord = function(): number
{
    if(this.length == 0)
        return 0;

    return this.match(/[a-zA-Zà-ÿ]+/g)?.length ?? 0;
}

export {}
