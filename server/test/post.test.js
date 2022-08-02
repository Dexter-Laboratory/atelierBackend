let axios = require("axios");

test("POST question", async () => {
  let response = await axios.post("http://localhost:3000/qa/questions", {
    body: "testing from axios hello axios",
    name: "myAxios",
    email: "axiosTest@test.com",
    product_id: 40351,
  });
  expect(response.status).toBe(201);
});

test("POST answer", async () => {
  let response = await axios.post(
    "http://localhost:3000/qa/questions/3518965/answers",
    {
      body: "axiostesttestestestanswer",
      name: "answeraxiostest",
      email: "axiosTESTING@test.com",
      photos: ["fakeURL@urlurl.com", "fakeANOTHER@url.com"],
    }
  );
  expect(response.status).toBe(201);
});
