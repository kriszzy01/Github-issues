export const truncateText = (text: string, maxLength=30) => {
    const wordsArray =  text.split(" "); //Create an array of words in the given text

    if (wordsArray.length <= maxLength) {
        return text;
    } else {
        const truncatedWordsArray: string[] = []; 

        for (let i = 0; i < maxLength; i++) {
            truncatedWordsArray.push(wordsArray[i]); //Push only words from wordsArray who's indexes less than maxlenght
        }
    
        truncatedWordsArray[maxLength] = "..."; //Add "..." as the last word
    
        return truncatedWordsArray.join(" ");  //Return truncated Sentence
    }
};