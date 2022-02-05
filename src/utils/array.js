export function getRandomItem(array) {
    array = array || [];
    const randomInt = Math.floor(Math.random() * array.length);
    return array[randomInt];
}