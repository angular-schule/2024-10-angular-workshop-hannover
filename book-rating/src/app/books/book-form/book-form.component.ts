import { ChangeDetectionStrategy, Component, input, output, effect } from '@angular/core';
import { Book } from '../shared/book';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-book-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './book-form.component.html',
  styleUrl: './book-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookFormComponent {

  create = output<Book>();
  edit = output<Book>();

  currentBook = input<Book | undefined>();

  updateForm = effect(() => {
    // console.log('Current Book', this.currentBook());
    const currentBook = this.currentBook();
    const isbnControl = this.bookForm.controls.isbn;

    if (currentBook) {
      this.bookForm.patchValue(currentBook);
      isbnControl.disable();
    } else {
      isbnControl.enable();
    }
  });


  bookForm = new FormGroup({

    isbn: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(3)]
    }),

    title: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required]
    }),

    description: new FormControl('', {
      nonNullable: true
    })
  });

  isInvalid(control: FormControl): boolean {
    return control.invalid && control.touched
  }

  submitForm() {

    const currentBook = this.currentBook();
    if (currentBook) {

      const { rating, price } = currentBook;
      const changedBook: Book = {
        ...this.bookForm.getRawValue(),
        rating,
        price
      }
      this.edit.emit(changedBook);

    } else {

      const newBook: Book = {
        ...this.bookForm.getRawValue(),
        rating: 1,
        price: 1
      }
      this.create.emit(newBook);

    }
    this.bookForm.reset();
  }
}
