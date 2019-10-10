import {
  Component,
  EventEmitter,
  OnInit,
  Output
} from '@angular/core';

@Component({
  selector: 'app-aside-nav',
  templateUrl: './aside-nav.component.html',
  styleUrls: ['./aside-nav.component.scss']
})
export class AsideNavComponent implements OnInit {

  @Output() closeMobileMenu = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  pressed() {
    this.closeMobileMenu.emit(true);
  }
}
