import { Component, output } from '@angular/core';
import { Book } from '../shared/book';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-book-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './book-form.component.html',
  styleUrl: './book-form.component.scss'
})
export class BookFormComponent {

  create = output<Book>();

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

  c = this.bookForm.controls;

  isInvalid(control: FormControl): boolean {
    return control.invalid && control.touched
  }

  submitForm() {

    const newBook: Book = {
      ...this.bookForm.getRawValue(),
      rating: 1,
      price: 1
    }

    this.create.emit(newBook);
    this.bookForm.reset();
  }
}
