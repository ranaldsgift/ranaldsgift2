export class StringHelper {
    public static toTitleCase(text: string) {
        return text.replace(/([a-z])([A-Z])/g, '$1 $2');
    }

    public static getNumberFromPixels(pixelCount: string) {
        return parseInt(pixelCount.replace('px',''));
    }

    public static capitalize(str: string) {
        const words = str.split(" ");
        for (let i = 0; i < words.length; i++) {
            const firstLetter = words[i].substring(0, 1);
            const restOfWord = words[i].substring(1);
            words[i] = firstLetter.toUpperCase() + restOfWord.toLowerCase();
        }
        return words.join(" ");
    }
}