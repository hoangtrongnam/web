import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from '@/_services/authentication.service';
import { AlertService } from '@/_components/alert/_services';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  returnUrl: string;
  submitted: boolean = false;
  isLoading: boolean = false;

  constructor(
    private titleService: Title,
    private authenticationService: AuthenticationService,
    private alertService: AlertService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    // redirect to home if already logged in
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/']);
    }

    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/transaction/in';
    //this.isLoading = true;
    // this.authenticationService.verify().toPromise().then(rs =>{
    //   this.isLoading = false;
    //   this.router.navigate([this.returnUrl]);
    // },error => {
    //   this.isLoading = false;
    //   this.alertService.error(error.error.message);
    // });
  }

  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    this.isLoading = true;
    this.authenticationService.login((this.f.username.value).toLowerCase(), this.f.password.value)
      .pipe(first())
      .subscribe(
        rs => {
          this.isLoading = false;
          this.router.navigate([this.returnUrl]);
        },
        error => {
          this.isLoading = false;
          this.alertService.error(error.error.message);
        }
      )
  }
}
