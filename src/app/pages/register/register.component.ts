import { Component, inject, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Router, RouterModule } from '@angular/router';
import {
  debounceTime,
  delay,
  distinctUntilChanged,
  filter,
  switchMap,
  tap,
} from 'rxjs';
import { AuthenticationService } from '../../business/services/authentication.service';
import { RegisterService } from '../../business/services/register.service';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { VibbraValidators } from '../../business/validators/vibbra.validator';

type RegisterForm = {
  name: FormControl<string>;
  cnpj: FormControl<string>;
  email: FormControl<string>;
  company: FormControl<string>;
  phone: FormControl<string>;
  password: FormControl<string>;
};

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    RouterModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSnackBarModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    NgxMaskDirective,
  ],
  providers: [provideNgxMask()],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  private authService = inject(AuthenticationService);
  private registerService = inject(RegisterService);
  private snack = inject(MatSnackBar);
  private router = inject(Router);

  errors = signal({
    cnpj: false,
    email: false,
  });

  errorsHandler = new Map<string, CallableFunction>([
    ['reset', () => this.errors.update((e) => ({ email: false, cnpj: false }))],
    ['resetCnpj', () => this.errors.update((e) => ({ ...e, cnpj: false }))],
    ['resetEmail', () => this.errors.update((e) => ({ ...e, email: false }))],
    ['cnpj', () => this.errors.update((e) => ({ ...e, cnpj: true }))],
    ['email', () => this.errors.update((e) => ({ ...e, email: true }))],
  ]);

  loadingRegister = signal(false);

  form = new FormGroup<RegisterForm>({
    name: new FormControl('', {
      nonNullable: true,
      validators: [
        Validators.minLength(3),
        Validators.required,
        VibbraValidators.withoutWhiteSpace,
      ],
    }),
    cnpj: new FormControl('', {
      nonNullable: true,
      validators: [Validators.minLength(14), Validators.required],
    }),
    company: new FormControl('', {
      nonNullable: true,
      validators: [
        Validators.minLength(3),
        Validators.required,
        VibbraValidators.withoutWhiteSpace,
      ],
    }),
    phone: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    email: new FormControl('', {
      nonNullable: true,
      validators: [Validators.email, Validators.required],
    }),
    password: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });

  cnpjValidation$ = this.form.controls.cnpj.valueChanges
    .pipe(
      filter((_) => this.form.controls.cnpj.valid),
      distinctUntilChanged(),
      tap(() => (this.errorsHandler.get('resetCnpj') as CallableFunction)()),
      switchMap((cnpj) => this.registerService.cnpjCheck(cnpj)),
      filter((exists) => !exists),
      tap(() => (this.errorsHandler.get('cnpj') as CallableFunction)()),
    )
    .subscribe();

  emailValidation$ = this.form.controls.email.valueChanges
    .pipe(
      filter((_) => this.form.controls.email.valid),
      debounceTime(1000),
      distinctUntilChanged(),
      tap(() => (this.errorsHandler.get('resetEmail') as CallableFunction)()),
      switchMap((cnpj) => this.registerService.emailCheck(cnpj)),
      filter((exists) => !exists),
      tap(() => (this.errorsHandler.get('email') as CallableFunction)()),
    )
    .subscribe();

  registerNewUser$ = this.registerService.registerEvent
    .pipe(
      delay(700), // For backend simulation
      filter((_) => this.loadingRegister()),
      tap((newUser) => {
        this.authService.login({
          email: newUser.email,
          password: this.form.getRawValue().password,
        });
      }),
    )
    .subscribe();

  loggedUser$ = this.authService.loggedEvent
    .pipe(
      filter((_) => this.loadingRegister()),
      tap((loggedUser) => {
        this.snack.open(
          `${loggedUser?.name.split(' ')[0]}, seja bem vindo!`,
          'OK',
          {
            duration: 7000,
          },
        );
        this.loadingRegister.set(false);
        this.router.navigate(['/']);
      }),
    )
    .subscribe();

  error$ = this.registerService.errorEvent
    .pipe(
      filter((_) => this.loadingRegister()),
      tap((error: string) =>
        (this.errorsHandler.get(error) as CallableFunction)(),
      ),
    )
    .subscribe();

  registerHandle(): void {
    (this.errorsHandler.get('reset') as CallableFunction)();
    this.loadingRegister.set(true);
    const registerForm = this.form.getRawValue();
    this.registerService.register(registerForm);
  }
}
