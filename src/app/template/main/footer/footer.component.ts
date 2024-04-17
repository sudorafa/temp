import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  template: `
    <span>Vibbra MEINF ©</span>
    <span>Version 1.0.0 - {{ year() }}</span>
  `,
  styles: `
    :host {
      margin-top: auto;
      background: var(--secondary-color);
      color: var(--light-color);
      padding: 0.6rem;
      font-size: 0.8rem;
      display: flex;
      justify-content: space-between;
    }
  `,
})
export class FooterComponent {
  year = signal(new Date().getFullYear());
}
