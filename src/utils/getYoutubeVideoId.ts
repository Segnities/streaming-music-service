export function getYouTubeVideoId(url: string): string | undefined {
    const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com|youtu\.be)\/(?:watch\?v=|embed\/|v\/)?([A-Za-z0-9_-]{11})/;
    const match = url.match(regex);
    const videoId = match ? match[1] : undefined;

    return videoId;
}
