import { Book } from './book';
import { BookRatingService } from './book-rating.service';

describe('BookRatingService', () => {
  let book: Book;

  // Arrange
  beforeEach(() => {
    book = {
      isbn: '000',
      title: 'Test',
      description: 'Test',
      rating: 3,
      price: 99
    };
  });

  it('should rate up a book by one', () => {

    // Act
    const ratedBook = BookRatingService.rateUp(book);

    // Assert
    expect(ratedBook.rating).toBe(4);
  });

  it('should rate down a book by one', () => {
    const ratedBook = BookRatingService.rateDown(book);
    expect(ratedBook.rating).toBe(2);
  });

  it('should not be allowed to have a rating greater than 5', () => {
    book.rating = 5;
    const ratedBook = BookRatingService.rateUp(book);
    expect(ratedBook.rating).toBe(5);
  });

  it('should not be allowed to have a rating smaller than 1', () => {
    book.rating = 1;
    const ratedBook = BookRatingService.rateDown(book);
    expect(ratedBook.rating).toBe(1);
  });

  it('should not mutate the book', () => {
    const frozenBook = Object.freeze(book);
    expect(() => BookRatingService.rateUp(frozenBook)).not.toThrow();
    expect(() => BookRatingService.rateDown(frozenBook)).not.toThrow();
  })
});
