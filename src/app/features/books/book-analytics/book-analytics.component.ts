// // import { Component } from '@angular/core';

// // @Component({
// //   selector: 'app-book-analytics',
// //   standalone: true,
// //   imports: [],
// //   templateUrl: './book-analytics.component.html',
// //   styleUrl: './book-analytics.component.scss'
// // })
// // export class BookAnalyticsComponent {

// // }


// import { Component, OnInit } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { BookService } from '../../../services/book.service';
// import { Book } from '../../../models/book.model';
// import { ChartConfiguration, ChartType } from 'chart.js';
// import { NgChartsModule } from 'ng2-charts';

// @Component({
//   selector: 'app-book-analytics',
//   standalone: true,
//   imports: [CommonModule, NgChartsModule, ],
//   templateUrl: './book-analytics.component.html',
//   styleUrls: ['./book-analytics.component.scss']
// })
// export class BookAnalyticsComponent implements OnInit {
//   books: Book[] = [];
//   loading = true;

//   // Chart Data
//   lineChartLabels: string[] = [];
//   lineChartData: number[] = [];
//   genreCounts: Record<string, number> = {};
//   categoryCounts: Record<string, number> = {};

//   constructor(private bookService: BookService) {}

//   ngOnInit(): void {
//     this.bookService.getBooks().subscribe({
//       next: (data) => {
//         this.books = data;
//         this.prepareChartData();
//         this.loading = false;
//       },
//       error: () => {
//         this.loading = false;
//       }
//     });
//   }

//   prepareChartData() {
//     const yearMap: Record<string, number> = {};
//     this.genreCounts = {};
//     this.categoryCounts = {};

//     this.books.forEach(book => {
//       // Line chart: Published year count
//       yearMap[book.year] = (yearMap[book.year] || 0) + 1;

//       // Bar chart: Genre count
//       this.genreCounts[book.genre] = (this.genreCounts[book.genre] || 0) + 1;

//       // Pie chart: Category count
//       this.categoryCounts[book.category] = (this.categoryCounts[book.category] || 0) + 1;
//     });

//     // Sort years
//     this.lineChartLabels = Object.keys(yearMap).sort();
//     this.lineChartData = this.lineChartLabels.map(year => yearMap[year]);
//   }
// }



import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookService } from '../../../services/book.service';
import { Book } from '../../../models/book.model';
import { NgChartsModule } from 'ng2-charts';
import { Router } from '@angular/router';

@Component({
  selector: 'app-book-analytics',
  standalone: true,
  imports: [CommonModule, NgChartsModule],
  templateUrl: './book-analytics.component.html',
  styleUrls: ['./book-analytics.component.scss']
})
export class BookAnalyticsComponent implements OnInit {
  books: Book[] = [];
  loading = true;

  // Line Chart
  lineChartLabels: string[] = [];
  lineChartData: number[] = [];

  // Pie Chart (Genre)
  genreLabels: string[] = [];
  genreData: number[] = [];

  // Bar Chart (Category)
  categoryLabels: string[] = [];
  categoryData: number[] = [];

  constructor(private bookService: BookService, private router: Router) {}

  ngOnInit(): void {
    this.bookService.getBooks().subscribe({
      next: (data) => {
        this.books = data;
        this.prepareChartData();
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  prepareChartData() {
    const yearMap: Record<string, number> = {};
    const genreMap: Record<string, number> = {};
    const categoryMap: Record<string, number> = {};

    this.books.forEach(book => {
      // Line chart: Published year count
      yearMap[book.year] = (yearMap[book.year] || 0) + 1;

      // Pie chart: Genre
      genreMap[book.genre] = (genreMap[book.genre] || 0) + 1;

      // Bar chart: Category
      categoryMap[book.category] = (categoryMap[book.category] || 0) + 1;
    });

    // Line Chart
    this.lineChartLabels = Object.keys(yearMap).sort();
    this.lineChartData = this.lineChartLabels.map(year => yearMap[year]);

    // Pie Chart
    this.genreLabels = Object.keys(genreMap);
    this.genreData = this.genreLabels.map(genre => genreMap[genre]);

    // Bar Chart
    this.categoryLabels = Object.keys(categoryMap);
    this.categoryData = this.categoryLabels.map(cat => categoryMap[cat]);
  }

  goBack() {
    this.router.navigate(['/books']);
  }
  
}
