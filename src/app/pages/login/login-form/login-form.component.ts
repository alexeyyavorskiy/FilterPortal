import {
  Component,
  OnInit
} from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from "../../../share/data.service";
import {
  FormBuilder,
  FormGroup,
  Validators
} from "@angular/forms";
import { AuthService } from "../../../share/auth.service";

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {
  public form: FormGroup;
  public user: any = {};
  public class: string;
  public showMessage: boolean;
  public message: string;

  constructor(private router: Router, private authService: AuthService, private fb: FormBuilder, private dataService: DataService) {
    this.form = fb.group({
      'name': [null, Validators.compose([Validators.required, Validators.pattern("^[a-zA-Z0-9.\-_$@*!]{3,30}$")])],
      'password': [null, Validators.compose([Validators.required, Validators.pattern("^[a-zA-Z0-9.\-_$@*!]{3,}$")])],
    });
  }

  hideNotification() {
    this.showMessage = false;
  }

  submitForm() {
    this.authService.login(this.user)
      .then((res) => {
        if (res.result.session) {
          this.authService.setSession(res.result.session);
          sessionStorage.setItem('sessionId', res.result.session);
          this.authService.isLogged = true;
          this.dataService.startTimer();
          this.router.navigate(['/dashboard']);
        } else {
          this.class = 'alert-danger';
          this.showMessage = true;
          this.message = 'Wrong username or password!';
        }
      })
      .catch(
        () => {
          this.class = 'alert-danger';
          this.showMessage = true;
          this.message = 'Server Error';
        })
  }

  ngOnInit() {
  }

}
