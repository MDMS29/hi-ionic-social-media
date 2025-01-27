import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { formValidator } from 'src/helper/form.validator';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false,
})

export class LoginPage implements OnInit {
  loginForm: FormGroup;
  errorMessage: any;
  formErrors: any = {
    email: [
      { type: 'required', message: 'El correo es obligatorio' },
      { type: 'email', message: 'El correo no es valido' }
    ],
    password: [
      { type: 'required', message: 'La contraseña es obligatoria' },
      { type: 'minlength', message: 'La contraseña debe tener al menos 5 caracteres' }
    ]
  }
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private navCtrl: NavController,
    private storage: Storage
  ) {
    this.loginForm = new FormGroup({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.email
      ])),
      password: new FormControl('', Validators.compose([
        Validators.minLength(5),
        Validators.required
      ]))
    })
  }

  private cambiandoEstadoForm() {
    Object.keys(this.loginForm.controls).forEach((controlName) => {
      const control = this.loginForm.get(controlName);
      if (control) {
        control.valueChanges.subscribe(() => {
          this.errorMessage = '';
        });
      }
    });
  }

  async ngOnInit() {
    await this.storage.create();
    this.cambiandoEstadoForm();
  }

  loginUser(credentials: any) {
    this.errorMessage = formValidator(this.loginForm, this.formErrors);

    if (this.errorMessage) {
      return;
    }

    this.authService.login(credentials).then((res: any) => {
      this.errorMessage = res;
    }).catch((err: any) => {
      console.log("LOGIN ERROR:\n", err, "\nFIN LOGIN ERROR")
      this.errorMessage = 'Ha ocurrido un error intentelo mas tarde';
    });
  }

}
