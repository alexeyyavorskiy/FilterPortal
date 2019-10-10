import {Component, OnInit} from '@angular/core';
import {AuthService} from './../../share/auth.service';

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.scss']
})
export class AsideComponent implements OnInit {
  public year: number;

  constructor(public authService: AuthService) {
  }

  ngOnInit() {
    this.year = new Date().getFullYear();
  }

}
