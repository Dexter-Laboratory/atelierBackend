let axios = require('axios');

test('GET related', async () => {
  let response = await axios.get('http://localhost:3000/products/1/related/');
  expect(response.status).toBe(200);
  expect(Array.isArray(response.data)).toBe(true);
});

test('GET related', async () => {
  let response1 = await axios.get('http://localhost:3000/products/1/related/');
  let response2 = await axios.get('http://localhost:3000/products/2/related/');

  expect(response1.status).toEqual(response2.status);
  expect(Array.isArray(response1.data)).toEqual(Array.isArray(response2.data));

  expect(response1.data).not.toEqual(response2.data);
});

test('GET correct related', async () => {
  let response = await axios.get('http://localhost:3000/products/20/related/');
  let expected = [
      12,
      16,
      6,
      15,
      11
  ];

  expect(response.status).toEqual(200);
  expect(response.data).toEqual(expected);
})