import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from "@angular/router";

@Component({
  selector: 'app-nx-welcome',
  imports: [CommonModule, RouterModule],
  template: `
    <nav>
      <a routerLink="/">Strona Główna ERP</a> | 
      <a routerLink="/widget">Odpierdolnik Klienta</a>
    </nav>

    <router-outlet></router-outlet>
  `,
  styles: [],
  encapsulation: ViewEncapsulation.None,
})
export class NxWelcome {}
