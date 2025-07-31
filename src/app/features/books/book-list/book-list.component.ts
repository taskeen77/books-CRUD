// // // import { Component } from '@angular/core';

// // // @Component({
// // //   selector: 'app-book-list',
// // //   standalone: true,
// // //   imports: [],
// // //   templateUrl: './book-list.component.html',
// // //   styleUrl: './book-list.component.scss'
// // // })
// // // export class BookListComponent {

// // // }



// // // src/app/components/book-list/book-list.component.ts
// // import { Component, OnInit } from '@angular/core';
// // import { BookService } from '../../../services/book.service';
// // import { Book } from '../../../models/book.model';

// // @Component({
// //   selector: 'app-book-list',
// //   standalone: true,
// //   imports: [],
// //   templateUrl: './book-list.component.html',
// //   styleUrl: './book-list.component.scss'
// // })
// // export class BookListComponent implements OnInit {
// //   books: Book[] = [];
// //   loading = true;

// //   constructor(private bookService: BookService) {}

// //   ngOnInit(): void {
// //     this.fetchBooks();
// //   }

// //   fetchBooks(): void {
// //     this.loading = true;
// //     this.bookService.getBooks().subscribe({
// //       next: (data) => {
// //         this.books = data;
// //         this.loading = false;
// //       },
// //       error: (err) => {
// //         console.error('Error fetching books:', err);
// //         this.loading = false;
// //       }
// //     });
// //   }

// //   deleteBook(id: number): void {
// //     if (confirm('Are you sure you want to delete this book?')) {
// //       this.bookService.deleteBook(id).subscribe(() => {
// //         this.books = this.books.filter(book => book.id !== id);
// //       });
// //     }
// //   }
// // }


// import { Component, OnInit } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { RouterModule, Router } from '@angular/router';
// import { BookService } from '../../../services/book.service';
// import { Book } from '../../../models/book.model';

// @Component({
//   selector: 'app-book-list',
//   standalone: true,
//   imports: [CommonModule, RouterModule],
//   templateUrl: './book-list.component.html',
//   styleUrls: ['./book-list.component.scss']
// })
// export class BookListComponent implements OnInit {
//   books: Book[] = [];

//   constructor(private bookService: BookService, private router: Router) {}

//   ngOnInit(): void {
//     this.loadBooks();
//   }

//   loadBooks(): void {
//     this.bookService.getBooks().subscribe((data) => {
//       this.books = data;
//     });
//   }

//   deleteBook(id: number): void {
//     if (confirm('Are you sure you want to delete this book?')) {
//       this.bookService.deleteBook(id).subscribe(() => {
//         this.loadBooks();
//       });
//     }
//   }

//   editBook(id: number): void {
//     this.router.navigate(['/books/edit', id]);
//   }
// }


import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { BookService } from '../../../services/book.service';
import { Book } from '../../../models/book.model';

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent implements OnInit {
  books: Book[] = [];
  loading = true;

  constructor(private bookService: BookService, private router: Router) {}

  ngOnInit(): void {
    this.loadBooks();
  }

  loadBooks(): void {
    this.loading = true;
    this.bookService.getBooks().subscribe({
      next: (data) => {
        this.books = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading books:', err);
        this.loading = false;
      }
    });
  }

  deleteBook(id: number): void {
    if (confirm('Are you sure you want to delete this book?')) {
      this.bookService.deleteBook(id).subscribe(() => {
        this.books = this.books.filter(book => book.id !== id);
      });
    }
  }

  editBook(id: number): void {
    this.router.navigate(['/books/edit', id]);
  }
}
