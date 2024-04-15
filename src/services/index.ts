import { END_POINTS } from "./endpoints";
import axios, { AxiosError, type AxiosResponse } from "axios";
import type { CountryInfo } from "./models";
import to from "await-to-js";

export class CountryRest {
  getAll(): Promise<[AxiosError, AxiosResponse<CountryInfo[]>]> {
    return to(axios.get(END_POINTS.ALL()));
  }
  getByRegion(region: string): Promise<[AxiosError, AxiosResponse<CountryInfo[]>]> {
    if (!!region) return to(axios.get(END_POINTS.REGION(region)));
  }

  getByName(name: string): Promise<[AxiosError, AxiosResponse<CountryInfo[]>]> {
    if (!!name) return to(axios.get(END_POINTS.NAME(name)));
  }
}

export const CountryRestService = new CountryRest();
