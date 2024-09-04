import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { QuizService } from '../shared/services/quiz.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  playerName = '';
  isPlayerNameConfirmed = false;

  constructor(
    private router: Router,
    private authService: AuthService,
    private quizService: QuizService
  ) {}

  ngOnInit(): void {
    this.quizService.resetQuiz(); // Reset states to avoid conflicts at start
    this.authService.isUserConnected();
    this.playerName = this.authService.user?.username || '';
  }

  get isPlayerNameFill() {
    return this.playerName.length < 1;
  }

  confirmPseudo() {
    this.isPlayerNameConfirmed = true;
    this.quizService.playerName.next(this.playerName);
  }

  navigateToCategories() {
    this.router.navigate(['/categories']);
  }
}
