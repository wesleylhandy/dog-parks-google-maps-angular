import { Component } from '@angular/core';
import { faTimes, faChevronDown, faCopyright, faCoffee } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'dog-map';
  checked: boolean = false;
  faTimes = faTimes;
  faChevronDown = faChevronDown;
  faCopyright = faCopyright;
  faCoffee = faCoffee;
  
  date: Number;

  toggleChecked():void {
    this.checked = !this.checked
  }

  ngOnInit() {
    this.date = new Date().getFullYear();
  }

}
