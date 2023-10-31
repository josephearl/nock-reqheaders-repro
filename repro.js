import axios from "axios";

export const HOST = "http://localhost:54321";

export async function makeRequestWithHeaders() {
   await axios.get(`${HOST}/some/path`, {
       headers: { 'HEADER1': 'value1', 'HEADER2': 'value2' }
   });
}
