import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-modal-not-implemented',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, MatIconModule],
  template: `
    <h1 mat-dialog-title>Ops...</h1>
    <div mat-dialog-content>
      <div class="sorry-box">
        <img src="assets/images/sorry.png" />
        <p>
          Sentimos muito, mas essa funcionalidade ainda não está disponível.
        </p>
      </div>
    </div>
    <div mat-dialog-actions>
      <button mat-stroked-button mat-dialog-close cdkFocusInitial>
        Então... tá bom.
      </button>
    </div>
  `,
  styles: `
    .sorry-box {
      display: flex;
      gap: 1rem;
      align-items: center;
      justify-content: center;
      flex-direction: column;
    }

    img {
      width: 100px;
    }

    p {
      font-size: 1rem;
      text-align: center;
    }

    .mat-mdc-dialog-actions {
      justify-content: center;
      padding-bottom: 2.5rem;
    }
  `,
})
export class ModalNotImplementedComponent {}
