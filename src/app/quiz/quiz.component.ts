import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { CategoryService } from '../shared/services/categories.service';
import { QuizService } from '../shared/services/quiz.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss'],
})
export class QuizComponent implements OnInit {
  public isQuizFinished = this.quizService.isQuizFinished;
  public playerName: BehaviorSubject<string> = this.quizService.playerName;
  public categoryId: number;
  public categoryLabel: string;

  constructor(
    private quizService: QuizService,
    private categoryService: CategoryService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.categoryId = params['categoryId'];
    });

    this.categoryLabel = this.categoryService.getCategoryLabel(this.categoryId);
  }

  goToResultPage() {
    this.router.navigate(['/result']);
  }
}
