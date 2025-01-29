import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController, ToastController } from '@ionic/angular';
import { defineCustomElements } from '@ionic/pwa-elements/loader';
import { UserService } from '../service/user.service';
import { Storage } from '@ionic/storage-angular';
import { Router } from '@angular/router';

defineCustomElements(window);

@Component({
  selector: 'app-update-account-modal',
  templateUrl: './update-account-modal.page.html',
  styleUrls: ['./update-account-modal.page.scss'],
  standalone: false
})
export class UpdateAccountModalPage implements OnInit {
  accountForm: FormGroup;


  constructor(
    private fb: FormBuilder,
    private mdCtrl: ModalController,
    private userService: UserService,
    private storage: Storage,
    private toast: ToastController,
  ) {
    this.accountForm = this.fb.group({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      last_name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      username: new FormControl('', [Validators.required, Validators.minLength(3)]),
      email: new FormControl('', [Validators.required, Validators.email])
    });

  }

  async ngOnInit() {
    const user = await this.storage.get('user');
    this.accountForm.setValue({
      name: user.name,
      last_name: user.last_name,
      username: user.username,
      email: user.email
    })
  }

  async updateAccount(account_data: any) {
    const userStorage = await this.storage.get('user');
    account_data.id = userStorage.id;

    this.userService.updateUser(account_data).then((data: any) => {
      if (data.status === 'OK') {
        this.storage.set('user', data.user);
        this.showToast('Perfil actualizado exitosamente 🎉', 'success');

        setTimeout(() => {
          window.location.reload();
        }, 2000);
      }
    }).catch((error: any) => {
      console.log(error);
    });
  }

  closeModal() {
    this.mdCtrl.dismiss();
  }

  getErrorMessage(field: string): string {
    const control = this.accountForm.get(field);
    if (control?.hasError('required')) return 'Este campo es obligatorio';
    if (control?.hasError('minlength')) return 'Debe tener al menos 3 caracteres';
    if (control?.hasError('email')) return 'Correo inválido';
    return '';
  }

  async showToast(message: string, type: 'success' | 'danger') {
    const toast = await this.toast.create({
      message,
      duration: 2000,
      position: 'top',
      color: type
    });
    toast.present();
  }
}
