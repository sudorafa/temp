import { Component, inject, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ModalNotImplementedComponent } from '../../components/modal-not-implemented/modal-not-implemented.component';
import { AuthenticationService } from '../../business/services/authentication.service';
import { delay, filter, tap } from 'rxjs';
import { Router, RouterModule } from '@angular/router';

type LoginForm = {
  email: FormControl<string>;
  password: FormControl<string>;
};

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    ModalNotImplementedComponent,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    RouterModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  private dialog = inject(MatDialog);
  private authService = inject(AuthenticationService);
  private router = inject(Router);
  private snack = inject(MatSnackBar);

  loginError = signal(false);
  loadingLogin = signal(false);

  form = new FormGroup<LoginForm>({
    email: new FormControl('', {
      nonNullable: true,
      validators: [Validators.email, Validators.required],
    }),
    password: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });

  loggedUser$ = this.authService.loggedEvent
    .pipe(
      delay(700), // For backend simulation
      filter((_) => this.loadingLogin()),
      filter((loggedUser) => {
        if (loggedUser === null) {
          this.loginError.set(true);
          this.form.enable();
          this.loadingLogin.set(false);
        }
        return loggedUser !== null;
      }),
      tap((loggedUser) => {
        this.snack.open(
          `${loggedUser?.name.split(' ')[0]}, seja bem vindo!`,
          'OK',
          {
            duration: 7000,
          },
        );
        this.router.navigate(['/']);
      }),
    )
    .subscribe();

  emailLoginHandle(): void {
    this.loginError.set(false);
    this.loadingLogin.set(true);
    const userForm = this.form.getRawValue();
    this.form.disable();
    this.authService.login(userForm);
  }

  facebookLoginHandle(): void {
    this.dialog.open(ModalNotImplementedComponent);
  }

  googleLoginHandle(): void {
    this.dialog.open(ModalNotImplementedComponent);
  }
}
