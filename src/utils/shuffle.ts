export function shuffle(arr: any[]) {
    const shuffledArr: any[] = [...arr];

    let currentIndex: number = arr.length;
    let randomIndex: number = arr.length;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        [shuffledArr[currentIndex], shuffledArr[randomIndex]] = [shuffledArr[randomIndex], shuffledArr[currentIndex]];
    }

    return shuffledArr;
}