let axios = require("axios");

test("GET questions", async () => {
  let response = await axios(
    "http://localhost:3000/qa/questions?product_id=40300&count=20&page=1"
  );
  console.log(response.status);
  expect(response.status).toBe(200);
});

test("GET answers", async () => {
  let response = await axios(
    "http://localhost:3000/qa/questions/3073936/answers?page=1&count=10"
  );
  expect(response.status).toBe(200);
});
