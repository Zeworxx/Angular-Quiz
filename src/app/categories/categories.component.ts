import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, combineLatest, map, Observable } from 'rxjs';
import { Category } from '../shared/models/category';
import { CategoryService } from '../shared/services/categories.service';
import { QuizService } from '../shared/services/quiz.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent implements OnInit {
  public categories$: Observable<Category[]>;
  public playerName = this.quizService.playerName;
  public isPlayerNameEmpty$: Observable<boolean>;

  public searchTerm = '';
  private searchTermSubject = new BehaviorSubject<string>('');
  public searchTerm$ = this.searchTermSubject.asObservable();

  constructor(
    private categoryService: CategoryService,
    private quizService: QuizService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.isPlayerNameEmpty$ = this.playerName.pipe(
      map((name) => name.trim().length === 0)
    );

    this.categories$ = combineLatest([
      this.categoryService.getCategories(),
      this.searchTerm$,
    ]).pipe(
      map(([categories, searchTerm]) =>
        categories.filter((category) =>
          category.categoryLabel
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
        )
      )
    );
  }

  searchCategories() {
    this.searchTermSubject.next(this.searchTerm);
  }

  resetFilter() {
    this.searchTerm = '';
    this.searchTermSubject.next(this.searchTerm);
  }

  public navigateTo(categoryId: number): void {
    this.router.navigate(['/quiz', categoryId]);
  }
}
