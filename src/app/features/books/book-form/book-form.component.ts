// // import { Component } from '@angular/core';

// // @Component({
// //   selector: 'app-book-form',
// //   standalone: true,
// //   imports: [],
// //   templateUrl: './book-form.component.html',
// //   styleUrl: './book-form.component.scss'
// // })
// // export class BookFormComponent {

// // }

// // import { Component } from '@angular/core';
// // import { CommonModule } from '@angular/common';
// // import { FormsModule } from '@angular/forms';
// // import { RouterModule, Router } from '@angular/router';
// // import { BookService } from '../../../services/book.service';
// // import { Book } from '../../../models/book.model';

// // @Component({
// //   selector: 'app-book-form',
// //   standalone: true,
// //   imports: [CommonModule, FormsModule, RouterModule],
// //   templateUrl: './book-form.component.html',
// //   styleUrl: './book-form.component.scss'
// // })
// // export class BookFormComponent {
// //   // book: Book = {
// //   //   id: 0,
// //   //   title: '',
// //   //   author: '',
// //   //   category: '',
// //   //   published: '',
// //   // };

// //   constructor(private bookService: BookService, private router: Router) {}

// //   submitForm(): void {
// //     this.bookService.addBook(this.book).subscribe(() => {
// //       this.router.navigate(['/books']);
// //     });
// //   }
// // }


// import { Component } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormsModule, NgForm } from '@angular/forms';
// import { RouterModule, Router } from '@angular/router';
// import { BookService } from '../../../services/book.service';
// import { Book } from '../../../models/book.model';

// @Component({
//   selector: 'app-book-form',
//   standalone: true,
//   imports: [CommonModule, FormsModule, RouterModule],
//   templateUrl: './book-form.component.html',
//   styleUrl: './book-form.component.scss'
// })
// export class BookFormComponent {
//   book: Book = {
//     id: 0,
//     title: '',
//     author: '',
//     category: '',
//     published: ''
//   };

//   constructor(private bookService: BookService, private router: Router) {}

//   submitForm(form: NgForm): void {
//     if (form.invalid) return;

//     this.bookService.addBook(this.book).subscribe(() => {
//       this.router.navigate(['/books']);
//     });
//   }
// }



import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { BookService } from '../../../services/book.service';
import { Book } from '../../../models/book.model';

@Component({
  selector: 'app-book-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.scss']
})
export class BookFormComponent implements OnInit {
  book: Book = {
    id: 0,
    title: '',
    author: '',
    category: '',
    published: '',
    genre: '',
    year: 0
  };

  isEditMode = false;

  constructor(
    private bookService: BookService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.isEditMode = true;
      this.bookService.getBookById(id).subscribe((book) => {
        if (book) this.book = book;
      });
    }
  }

  submitForm(): void {
    if (this.isEditMode) {
      this.bookService.updateBook(this.book.id, this.book).subscribe(() => {
        this.router.navigate(['/books']);
      });
    } else {
      this.bookService.addBook(this.book).subscribe(() => {
        this.router.navigate(['/books']);
      });
    }
  }
  
  cancel(): void {
    this.router.navigate(['/books']);
  }
}
