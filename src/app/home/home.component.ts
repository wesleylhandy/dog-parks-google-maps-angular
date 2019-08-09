import { Component, OnInit } from '@angular/core';
import { DogService } from '../dog.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  dogNumber: Number;

  constructor(private dogService: DogService) { }

  ngOnInit() {
    this.getNumber()
  }

  getNumber() :void{
    this.dogService.getNumber().subscribe(num => {
      this.dogNumber = num;
    })
  }

  updateNum(event){
    event.preventDefault();
    this.dogService.updateNum(this.dogNumber)
  }

}
