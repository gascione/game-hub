import axios from "axios";
export interface FetchResponse<T> {
  count: number;
  results: T[];
}

export default axios.create({
  baseURL: "https://api.rawg.io/api",
  params: {
    key: "73b1b80ba2714a8ea8eb131df87de27e",
  },
});
