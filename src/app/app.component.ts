import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { interval, startWith, switchMap } from 'rxjs';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  providers: [],
  template: `
    <div class="container">
        {{ text }}
    </div>
  `,
  styles: [],
})
export class AppComponent implements OnInit {
  text = 'Loading...';

  httpClient = inject(HttpClient);

  ngOnInit() {
    interval(1000).pipe(
      startWith(-1),
      switchMap(() => {
        return this.httpClient.get<any>('https://yesno.wtf/api');
      })
    ).subscribe((res) => {
      this.text = res.answer;
    });
  }

}
