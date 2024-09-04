import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../models/category';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private baseUrl = 'http://localhost:3000/category';
  private categories: Category[] = [];

  constructor(private http: HttpClient) {
    this.getCategories().subscribe((categories) => {
      this.categories = categories;
    });
  }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.baseUrl);
  }

  getCategoryLabel(categoryId: number): string {
    const category = this.categories.find((c) => c.id === categoryId);
    return category ? category.categoryLabel : '';
  }
}
