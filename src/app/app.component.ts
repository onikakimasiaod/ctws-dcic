import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SectionHeaderComponent } from '@sections/section-header/section-header.component';

@Component({
  selector: 'app-root',
  imports: [
    SectionHeaderComponent,
    RouterOutlet,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
}
