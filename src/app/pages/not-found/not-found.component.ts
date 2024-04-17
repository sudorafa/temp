import { Component } from '@angular/core';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [],
  template: `
    <h1>Ops... página não encontrada.</h1>
    <img src="assets/images/404.jpeg" />
  `,
  styles: `
    :host {
      display: flex;
      flex-direction: column;
      justify-content: center;
      padding: 2rem;
      text-align: center;
      gap: 1.2rem;

      h1 {
        font-size: 1.2rem;
        color: var(--accent-color);
      }

      img {
        max-width: 300px;
        margin: 0 auto;
      }
    }
  `,
})
export class NotFoundComponent {}
