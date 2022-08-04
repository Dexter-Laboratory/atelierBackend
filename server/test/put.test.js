let axios = require("axios");

test("PUT mark question helpful", async () => {
  let response = await axios.put(
    "http://localhost:3000/qa/questions/141817/helpful"
  );
  expect(response.status).toBe(204);
});
test("PUT report answer", async () => {
  let response = await axios.put(
    "http://localhost:3000/qa/questions/141817/report"
  );
  expect(response.status).toBe(204);
});
test("PUT mark answer helpful", async () => {
  let response = await axios.put(
    "http://localhost:3000/qa/answers/3073936/helpful"
  );
  expect(response.status).toBe(204);
});
test("PUT report answer", async () => {
  let response = await axios.put(
    "http://localhost:3000/qa/answers/3073936/report"
  );
  expect(response.status).toBe(204);
});
