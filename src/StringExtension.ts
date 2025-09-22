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
        toDate(): Date
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

export {}
