import {Injectable} from '@angular/core';
import {TranslateService} from 'ng2-translate';
import {Subject} from 'rxjs/Subject';

/**
 * Global localization service based on ng2-translate.
 */
@Injectable()
export class LocalizationService {

  public currentLang: Subject<any> = new Subject();
  private lang = 'en';

  constructor(private translate: TranslateService) {
    this.translate.setDefaultLang(this.lang);
    const lang = sessionStorage.getItem('lang');
    this.lang = (lang) ? lang : this.lang;
    this.translate.use(this.lang);
  }

  /**
   * Get current language.
   * @returns {string} - current language
   */
  public getLang() {
    return this.lang;
  }

  /**
   * Set current language and save it to local storage.
   * @param {string} lang - language
   */
  public setLang(lang) {
    this.lang = lang;
    this.currentLang.next(lang);
    sessionStorage.setItem('lang', lang);
    this.translate.use(this.lang);
  }
}
