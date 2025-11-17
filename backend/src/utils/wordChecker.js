async function wordChecker(word, lang) {
  try {
    const response = await fetch(
      `https://freedictionaryapi.com/api/v1/entries/${lang}/${word}`
    );

    if (!response.ok) {
      return false;
    }

    const data = await response.json();

    if (data && data.entries && data.entries.length > 0) {
      const match = data.entries.some(
        (entry) => entry.language && entry.language.code === lang
      );
      return match;
    }

    return false;
  } catch {
    console.error(error);
    return false;
  }
}

// Test wordChecker()
function testWordChecker () {
    wordChecker("dog", "en").then(result => console.log(`Word "dog" exists for "en" language, result: ` + result))
    wordChecker("fsdf", "en").then(result => console.log(`Word "fsdf" does not exist for "en" language, result: ` + result))
    wordChecker("чай", "ru").then(result => console.log(`Word "чай" exists for "ru" language, result: ` + result))
    wordChecker("вапф", "ru").then(result => console.log(`Word "вапф" does not exist for "ru" language, result: ` + result))
    wordChecker("gato", "es").then(result => console.log(`Word "gato" exists for "es" language, result: ` + result))
    wordChecker("sfgd", "es").then(result => console.log(`Word "sfgd" does not exist for "es" language, result: ` + result))
}
