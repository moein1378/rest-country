import { CountryInfo } from "@/services/models";

export type NEEDED_INFO =
  | "flags"
  | "name"
  | "region"
  | "subregion"
  | "population"
  | "capital"
  | "tld"
  | "currencies"
  | "languages"
  | "borders";
export type NeededCountryInfo = Pick<CountryInfo, NEEDED_INFO>;
