import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'auth-register-form',
  templateUrl: './register-form.component.html',
  styles: [
  ]
})
export class RegisterFormComponent {
  public myForm: FormGroup = this.formBuilder.group({
    username: [ '', [ Validators.required, Validators.minLength(3), Validators.maxLength(25) ] ],
    email: [ '', [ Validators.required, Validators.email ] ],
    password: [ '', [ Validators.required, Validators.minLength(4), Validators.maxLength(16) ] ],
    admin: [false]
  });

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  isValidField(field: string) {
    return this.myForm.controls[field].errors && this.myForm.controls[field].touched;
  }

  onSubmit(): void {
    if(this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }

    this.authService.register(this.myForm.value).subscribe(response => {
      this.router.navigate(['/auth/login']);
      Swal.fire(
        'Registro exitoso',
        'Te has registrado con exito',
        'success'
      );
    });
  }
}
