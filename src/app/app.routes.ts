import { Routes } from '@angular/router';
import { BookListComponent } from './features/books/book-list/book-list.component';
import { BookFormComponent } from './features/books/book-form/book-form.component';
import { BookAnalyticsComponent } from './features/books/book-analytics/book-analytics.component';

export const routes: Routes = [
    { path: '', redirectTo: 'books', pathMatch: 'full' },
    { path: 'books', component: BookListComponent },
    { path: 'books/new', component: BookFormComponent },
    { path: 'books/edit/:id', component: BookFormComponent },
    { path: 'books/analytics', component: BookAnalyticsComponent },
];
