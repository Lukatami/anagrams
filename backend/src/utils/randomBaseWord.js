import words from "../data/baseWords.js";

function getRandomWord(lang) {
  const language = words[lang] ? lang : "en";
  const wordArray = words[language];

  const randomIndex = Math.floor(Math.random() * wordArray.length);
  return wordArray[randomIndex];
}

// Test getRandomWord()
function testGetRandomWord() {
    console.log("Language (en) random baseWord: " + getRandomWord("en"));
    console.log("Language (ru) random baseWord: " + getRandomWord("ru"));
    console.log("Language (es) random baseWord: " + getRandomWord("es"));
    console.log("Default language (en) random baseWord if (qq) is not defined: " + getRandomWord("qq"));
    console.log("Default language (en) random baseWord if () is not defined: " + getRandomWord())
    console.log("Default language (en) random baseWord if (null) is not defined: " + getRandomWord(null))
}