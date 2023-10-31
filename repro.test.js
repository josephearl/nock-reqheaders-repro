import { HOST, makeRequestWithHeaders } from "./repro";
import nock from "nock";

describe("reqheaders", () => {
    it("works when used in mock creation", async () => {
        const mock = nock(HOST, {
            reqheaders: { 'HEADER1': 'value1', 'HEADER2': 'value1' }
        });
        mock.get('/some/path').reply(200);

        // HEADER2 has incorrect value, so we expect no match
        await expect(async () => await makeRequestWithHeaders()).rejects.toThrow(Error);
    });

    it("works when used in mock method with null requestBody", async () => {
        const mock = nock(HOST);
        // Using null here, but technically null is not a valid requestBody type
        // it must be either undefined | RequestBodyMatcher
        mock.get('/some/path', null, {
            reqheaders: { 'HEADER1': 'value1', 'HEADER2': 'value1' }
        }).reply(200);

        // HEADER2 has incorrect value, so we expect no match
        await expect(async () => await makeRequestWithHeaders()).rejects.toThrow(Error);
    });

    it("does not work when used in mock method with undefined requestBody", async () => {
        const mock = nock(HOST);
        mock.get('/some/path', undefined, {
            reqheaders: { 'HEADER1': 'value1', 'HEADER2': 'value1' }
        }).reply(200);

        // HEADER2 has incorrect value, so we expect no match
        // but the headers are ignored so no error is thrown
        // and the test fails with `Received promise resolved instead of rejected`
        await expect(async () => await makeRequestWithHeaders()).rejects.toThrow(Error);
    });
});
