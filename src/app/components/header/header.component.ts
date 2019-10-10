import {Component, OnDestroy, OnInit} from '@angular/core';
import {DataService} from "../../share/data.service";
import {GlobalService} from "../../core/global.service";
import {LocalizationService} from "../../share/localization.service";
import {AuthService} from "../../share/auth.service";
import {Subscription} from "rxjs/Subscription";
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  public lang = 'en';
  public supportedLangs: [string, string];
  public userMenuItems: [string, string];
  private subscription: Subscription;
  menuMobile = false;
  public statusClass: string;
  public year: number;

  constructor(public authService: AuthService,
              public localization: LocalizationService,
              private globalService: GlobalService,
              private dataService: DataService,
              private router: Router) {
    this.supportedLangs = ['en', 'ger'];
    this.userMenuItems = ['LogOut', 'Cancel'];
  }

  public selectLang(lang: string) {
    this.localization.setLang(lang);
  }

  public isCurrentLang(lang) {
    return lang === this.localization.getLang();
  }

  public onChangeLangHandler(lang: string) {
    this.lang = lang;
    this.localization.setLang(this.lang);
  }

  public onUserMenuClick(val) {
    if (val === 'LogOut') {
      this.dataService.stopTimer();
      this.logOut();
    }
  }

  private logOut() {
    this.authService.logOut(this.authService.session);
    sessionStorage.removeItem('sessionId');
    this.authService.isLoggedUser();
    this.router.navigate(['']);
  }

  ngOnInit() {
    this.year = new Date().getFullYear();
    this.lang = this.localization.getLang();
    this.subscription = this.globalService._status.subscribe((status) => {
      this.statusClass = this.getStatusClass(status);
    })
  }

  openMobileHeader() {
    this.menuMobile = !this.menuMobile;
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  onNavigate() {
    window.open('https://ult.portal.sonixc.com/', "_blank");
    return false;
  }

  getStatusClass(status) {
    if (status === 2) {
      return 'header--yellow';
    } else if (status === 3 || status === 4) {
      return 'header--red';
    } else {
      return '';
    }
  }

}
