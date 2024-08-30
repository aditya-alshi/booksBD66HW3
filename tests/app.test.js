let request = require('supertest');
let http = require('http');
let { app } = require('../index');
let {
  getallBooks,
  getBookById
} = require('../data');
const { describe } = require('node:test');
let server;

jest.mock('../data', () => ({
  ...jest.requireActual('../data'),
  getallBooks: jest.fn(),
  getBookById: jest.fn()
}))

beforeAll(() => {
  server = http.createServer(app);
  server.listen(3001);
});

afterAll(() => {
  server.close();
});

describe("Endpoints Testing", () => {

  beforeEach(() => {
    jest.clearAllMocks();
  })
  
  it('GET /books should return books array with status code 200', async () => {
    let books = [
        {
            'bookId': 1,
            'title': 'To Kill a Mockingbird',
            'author': 'Harper Lee',
            'genre': 'Fiction'
        },
        {
            'bookId': 2,
            'title': '1984',
            'author': 'George Orwell',
            'genre': 'Dystopian'
        },
        {
            'bookId': 3,
            'title': 'The Great Gatsby',
            'author': 'F. Scott Fitzgerald',
            'genre': 'Classic'
        }
    ]
    getallBooks.mockReturnValue(books);
    let res = await request(server).get('/books');
    expect(res.statusCode).toBe(200);
    expect(res.body.books).toEqual(books);
  })

  it('GET /books/details/1', async () => {
    let book = 
      {
          'bookId': 1,
          'title': 'To Kill a Mockingbird',
          'author': 'Harper Lee',
          'genre': 'Fiction'
      }
    getBookById.mockReturnValue(book);
    let res = await request(server).get('/books/details/1');
    expect(res.statusCode).toBe(200);
    expect(res.body.book).toEqual(book);
  })
  
})

describe("Function Testing", () => {

  it('should return all books', () => {
    let books = [
      {
          'bookId': 1,
          'title': 'To Kill a Mockingbird',
          'author': 'Harper Lee',
          'genre': 'Fiction'
      },
      {
          'bookId': 2,
          'title': '1984',
          'author': 'George Orwell',
          'genre': 'Dystopian'
      },
      {
          'bookId': 3,
          'title': 'The Great Gatsby',
          'author': 'F. Scott Fitzgerald',
          'genre': 'Classic'
      }
    ]
    getallBooks.mockReturnValue(books);
    expect(getallBooks()).toEqual(books);
  })
  
})