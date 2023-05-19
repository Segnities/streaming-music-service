export function isImageFile(fileName: string):boolean {
    const imageFilePattern = /\.(jpg|jpeg|png|gif)$/i;
    return imageFilePattern.test(fileName);
}