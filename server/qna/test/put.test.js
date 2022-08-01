let axios = require('axios');

test('GET products', async () => {
  let response = await axios.get('http://localhost:3000/products');
  expect(response.status).toBe(200);
  expect(response.data.length).toBe(5);
});

test('GET products count = 100', async () => {
  let response = await axios.get('http://localhost:3000/products?count=100');
  expect(response.status).toBe(200);
  expect(response.data.length).toBe(100);
});

test('GET products page is not same', async () => {
  let response1 = await axios.get('http://localhost:3000/products');
  let response2 = await axios.get('http://localhost:3000/products?page=2');

  expect(response1.status).toEqual(response2.status);
  expect(response1.data.length).toEqual(response2.data.length);

  expect(response1.data).not.toEqual(response2.data);
});

test('GET correct product', async() => {
  let response = await axios.get('http://localhost:3000/products/1');

  let expected = {
      "product_id": 1,
      "name": "Camo Onesie",
      "slogan": "Blend in to your crowd",
      "description": "The So Fatigues will wake you up and fit you in. This high energy camo will have you blending in to even the wildest surroundings.",
      "category": "Jackets",
      "default_price": "140",
      "created_at": "2022-07-29T16:25:19.665Z",
      "updated_at": "2022-07-29T16:25:19.665Z",
      "features": [
          {
              "feature": "Fabric",
              "value": "Canvas"
          },
          {
              "feature": "Buttons",
              "value": "Brass"
          }
      ]
  };

  expect(response.status).toBe(200);

  expect(response.data).toEqual(expected);
})