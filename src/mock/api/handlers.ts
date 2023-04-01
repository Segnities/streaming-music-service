import { rest } from "msw";

const SHAZAM_CORE_V1:string = "https://shazam-core.p.rapidapi.com/v1"; 

const RAPID_HOST: string = "shazam-core.p.rapidapi.com";
const RAPID_KEY: string = "e60eb95ad5msh3b2acc1834b3709p1474b2jsnf25468328f98"

const discoverHandler = [
    rest.get(`${SHAZAM_CORE_V1}/charts/genre-world?genre_code=POP`, (req, res, ctx) => {
        return res(ctx.status(200), ctx.set({
            "X-RapidAPI-Key": RAPID_KEY,
            "X-Rapid-Host": RAPID_HOST
        }))
    })
];

const topChartsHandler = [
    rest.get(`${SHAZAM_CORE_V1}/charts/world`, (req, res, ctx)=> {
        return res(ctx.status(200), ctx.set({
            "X-RapidAPI-Key": RAPID_KEY,
            "X-Rapid-Host": RAPID_HOST
        }))
    })
]

export  { discoverHandler, topChartsHandler };