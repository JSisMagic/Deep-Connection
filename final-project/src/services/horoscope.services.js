import { HOROSCOPE_API_KEY } from "../common/horoscope-constants";

const myHeaders = new Headers();
myHeaders.append(`Authorization`, `Bearer ${HOROSCOPE_API_KEY}`);

const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
};

export const getHoroscope = async (sunsign, timeframe = "daily") => {
    return fetch(
        `https://zylalabs.com/api/891/horoscope+api/694/get+horoscope?sunsign=${sunsign}&timeframe=${timeframe}`,
        requestOptions
    );
};