export function randomString(length) {
  var characters =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let str = "";
  while (str.length < length) {
    var randomCharacterIndex = Math.floor(Math.random() * characters.length);
    var randomCharacter = characters.charAt(randomCharacterIndex);
    str += randomCharacter;
  }
  return str;
}

// random number between min and max, including possibility for both min and max
export function getRandomNumber(min, max) {
  const range = max - min + 1;
  return Math.floor(Math.random() * range) + min;
}

// random float, not including the max value
export function getRandomFloat(min, max) {
  const range = max - min;
  return Math.random() * range + min;
}

export function getRandomColor(minBrightness = 0, maxBrightness = 255) {
  const r = getRandomNumber(minBrightness, maxBrightness);
  const g = getRandomNumber(minBrightness, maxBrightness);
  const b = getRandomNumber(minBrightness, maxBrightness);
  return `rgb(${r}, ${g}, ${b})`;
}
