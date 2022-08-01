let axios = require('axios');

test('GET questions', async () => {
  let response = await axios.get('http://localhost:3000/qa/questions?product_id=40351&page=1&count=10');
  expect(response.status).toBe(200);
});

test('GET answers', async () => {
  let response = await axios.get('http://localhost:3000/qa/questions/3518965/answers&page=1&count=10');
  expect(response.status).toBe(200);
});

