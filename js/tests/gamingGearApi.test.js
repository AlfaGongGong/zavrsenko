const { fetchAndInsertItems } = require('../API/gamingGearApi');
const mysql = require('mysql2/promise');
const axios = require('axios');

jest.mock('mysql2/promise');
jest.mock('axios');

describe('fetchAndInsertItems', () => {
  let mockPool;
  let mockResponse;

  beforeEach(() => {
    mockPool = {
      query: jest.fn(),
      end: jest.fn(),
    };
    mysql.createPool.mockReturnValue(mockPool);

    mockResponse = {
      data: {
        content: {
          offers: [
            {
              name: 'Item 1',
              asin: 'B0000001',
              link: 'https://example.com/item1',
              image: 'https://example.com/item1.jpg',
              review_rating: 4.5,
              review_count: 100,
              is_amazon_choice: true,
              is_bestseller: false,
              is_prime: true,
              price: 19.99,
            },
            {
              name: 'Item 2',
              asin: 'B0000002',
              link: 'https://example.com/item2',
              image: 'https://example.com/item2.jpg',
              review_rating: 4.0,
              review_count: 50,
              is_amazon_choice: false,
              is_bestseller: true,
              is_prime: true,
              price: 29.99,
            },
          ],
        },
      },
    };
    axios.request.mockResolvedValue(mockResponse);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch and insert items into the database', async () => {
    await fetchAndInsertItems();

    expect(mysql.createPool).toHaveBeenCalledTimes(1);
    expect(mysql.createPool).toHaveBeenCalledWith(expect.any(Object));

    expect(axios.request).toHaveBeenCalledTimes(2);
    expect(axios.request).toHaveBeenCalledWith(expect.any(Object));

    expect(mockPool.query).toHaveBeenCalledTimes(2);
    expect(mockPool.query).toHaveBeenCalledWith(expect.any(String), [
      'Item 1',
      'B0000001',
      'https://example.com/item1',
      'https://example.com/item1.jpg',
      4.5,
      100,
      true,
      false,
      true,
      19.99,
    ]);
    expect(mockPool.query).toHaveBeenCalledWith(expect.any(String), [
      'Item 2',
      'B0000002',
      'https://example.com/item2',
      'https://example.com/item2.jpg',
      4.0,
      50,
      false,
      true,
      true,
      29.99,
    ]);

    expect(mockPool.end).toHaveBeenCalledTimes(1);
  });

  it('should stop fetching items when item limit is reached', async () => {
    const mockItems = Array.from({ length: 300 }, (_, i) => ({
      name: `Item ${i}`,
      asin: `B000000${i}`,
      link: `https://example.com/item${i}`,
      image: `https://example.com/item${i}.jpg`,
      review_rating: 4.5,
      review_count: 100,
      is_amazon_choice: true,
      is_bestseller: false,
      is_prime: true,
      price: 19.99,
    }));
    mockResponse.data.content.offers = mockItems;

    await fetchAndInsertItems();

    expect(mysql.createPool).toHaveBeenCalledTimes(1);
    expect(mysql.createPool).toHaveBeenCalledWith(expect.any(Object));

    expect(axios.request).toHaveBeenCalledTimes(3);
    expect(axios.request).toHaveBeenCalledWith(expect.any(Object));
    expect(axios.request).toHaveBeenCalledWith(expect.any(Object));
    expect(axios.request).toHaveBeenCalledWith(expect.any(Object));

    expect(mockPool.query).toHaveBeenCalledTimes(250);
    expect(mockPool.query).toHaveBeenCalledWith(expect.any(String), expect.any(Array));

    expect(mockPool.end).toHaveBeenCalledTimes(1);
  });

  it('should handle errors', async () => {
    const mockError = new Error('Database error');
    mockPool.query.mockRejectedValue(mockError);

    await fetchAndInsertItems();

    expect(mysql.createPool).toHaveBeenCalledTimes(1);
    expect(mysql.createPool).toHaveBeenCalledWith(expect.any(Object));

    expect(axios.request).toHaveBeenCalledTimes(1);
    expect(axios.request).toHaveBeenCalledWith(expect.any(Object));

    expect(mockPool.query).toHaveBeenCalledTimes(1);
    expect(mockPool.query).toHaveBeenCalledWith(expect.any(String), expect.any(Array));

    expect(mockPool.end).toHaveBeenCalledTimes(1);

    expect(console.error).toHaveBeenCalledTimes(1);
    expect(console.error).toHaveBeenCalledWith('Error:', mockError);
  });
});