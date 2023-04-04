export function getYouTubeVideoId(url) {
    const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com|youtu\.be)\/(?:watch\?v=|embed\/|v\/)?([A-Za-z0-9_-]{11})/;
    const match = url.match(regex);
    const videoId = match ? match[1] : null;

    return videoId;
}
