import { Book } from './book';

const minRating = 1;
const maxRating = 5;

export class BookRatingService {

  static rateUp(book: Book): Book {

    if (book.rating >= maxRating) {
      return book;
    }

    return {
      ...book,
      rating: book.rating  + 1
    };
  }

  static rateDown(book: Book): Book {

    if (book.rating <= minRating) {
      return book;
    }

    return {
      ...book,
      rating: book.rating - 1
    };
  }
}
