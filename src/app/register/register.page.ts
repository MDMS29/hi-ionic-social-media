import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegisterData } from './register.dto';
import { Storage } from '@ionic/storage-angular';
import { AuthService } from '../service/auth.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: false
})

export class RegisterPage implements OnInit {
  colorMsg: string = 'danger';
  registerForm: FormGroup;
  errorMessage: any;
  formErrors = {
    name: [
      { type: 'required', message: 'El nombre es obligatorio' },
    ],
    last_name: [
      { type: 'required', message: 'El apellidos es obligatorio' },
    ],
    username: [
      { type: 'required', message: 'El usuario es obligatorio' },
    ],
    email: [
      { type: 'required', message: 'El correo es obligatorio' },
      { type: 'email', message: 'El correo no es valido' }
    ],
    password: [
      { type: 'required', message: 'La contraseña es obligatoria' },
      { type: 'minlength', message: 'La contraseña debe tener al menos 5 caracteres' }
    ],
    password_confirmation: [
      { type: 'required', message: 'La contraseña es obligatoria' },
      { type: 'minlength', message: 'La contraseña debe tener al menos 5 caracteres' }
    ]
  }
  constructor(
    private formBuilder: FormBuilder,
    private storage: Storage,
    private authService: AuthService,
    private nav: NavController
  ) {
    this.registerForm = this.formBuilder.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.email
      ])),
      name: new FormControl('', Validators.compose([
        Validators.required
      ])),
      last_name: new FormControl('', Validators.compose([
        Validators.required
      ])),
      username: new FormControl('', Validators.compose([
        Validators.required
      ])),
      password: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(5)
      ])),
      password_confirmation: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(5)
      ]))
    })
  }

  private cambiandoEstadoForm() {
    Object.keys(this.registerForm.controls).forEach((controlName) => {
      const control = this.registerForm.get(controlName);
      if (control) {
        control.valueChanges.subscribe(() => {
          this.errorMessage = '';
        });
      }
    });
  }

  ngOnInit() {
    this.cambiandoEstadoForm();
  }

  registerUser(registerData: RegisterData) {

    if (registerData.password !== registerData.password_confirmation) {
      this.errorMessage = 'Las contraseñas no coinciden';
      return;
    }

    this.authService.register(registerData).then((res: any) => {

      if (res.success) {
        this.colorMsg = 'success';
        this.storage.set('user', res.user);
        this.storage.set('isUserLoggedIn', true);
        setTimeout(() => {
          this.nav.navigateRoot('/login');
        }, 3000)
        return;
      } else {
        this.colorMsg = 'danger';
        this.errorMessage = res.msg;

        setTimeout(() => {
          this.errorMessage = '';
        }, 3000)
      }
    }).catch((err: any) => {
      console.log("REGISTER ERROR:\n", err, "\nFIN REGISTER ERROR")
      this.errorMessage = 'Ha ocurrido un error intentelo mas tarde';
    });
  }

}
