import axios from "axios";
import { GeoIpifyCountry } from "./types";

export class GeoIpify {
  static getGeoIpifyData = async () => {
    const API_KEY = "at_DgheYRT9z8XuRZyvMR44iO5pJHsMN";
    const API_URL = `https://geo.ipify.org/api/v2/country?apiKey=${API_KEY}`;

    const response: GeoIpifyCountry = await axios.get(API_URL);

    return response;
  };
}
