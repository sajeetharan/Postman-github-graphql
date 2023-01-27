import { Component } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'github-repos';

  constructor(){

  }

  scrollTop(topElement: HTMLElement){
    topElement.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
  }
}
