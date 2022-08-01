let axios = require('axios');

test('GET questions', async () => {
  let response = await axios.get('http://localhost:3000/qa/questions?product_id=40351&page=1&count=10');
  expect(response.status).toBe(200);
});

test('GET answers', async () => {
  let response1 = await axios.get('http://localhost:3000/products/1/styles/');
  let response2 = await axios.get('http://localhost:3000/products/2/styles/');

  expect(response1.status).toEqual(response2.status);

  expect(response1.data).not.toEqual(response2.data);
});

test('GET correct style', async() => {


  expect(response.status).toBe(200);
  expect(response.data).toEqual(expected);
})