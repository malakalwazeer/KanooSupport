import { Component } from '@angular/core';
import { FormBuilder, FormGroup ,Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;
  loading: boolean = false;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      UserName: ['', [Validators.required]],
      Password: ['', Validators.required]
    });
  }
  
  onSubmit() {
    if (this.loginForm.valid) {
      this.loading = true;
      this.authService.login(this.loginForm.value).subscribe({
        next: (response) => {
          this.loading = false
          this.router.navigate(['/home']); 
        },
        error: (error) => {
          this.loading = false;
          console.error('Login failed', error);
        }
      });
    }
  }


}
