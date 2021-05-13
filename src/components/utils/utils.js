export const firstLetterC = (word) => {
  const newWord = word.charAt(0).toUpperCase() + word.slice(1);
  return newWord;
};

export function firstLetterFunc(word) {
  const newWord = word.charAt(0).toUpperCase() + word.slice(1);
  return newWord;
}
