import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user.service';
import { Storage } from '@ionic/storage-angular';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { defineCustomElements } from '@ionic/pwa-elements/loader';
import { AlertController, ModalController } from '@ionic/angular';
import { UpdateAccountModalPage } from '../update-account-modal/update-account-modal.page';

defineCustomElements(window);
@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
  standalone: false
})

export class AccountPage implements OnInit {
  user_data: any = {
    name: '',
    email: '',
    image: '',
    followees: [],
    followers: []
  };

  constructor(
    private userService: UserService,
    private storage: Storage,
    private modalController: ModalController,
    public alertController: AlertController
  ) { }

  async ngOnInit() {
    let user: any = await this.storage.get('user');
    this.userService.getUser(user.id).then((data: any) => {
      this.storage.set('user', data);
      this.user_data = data;
    }
    ).catch((error: any) => {
      console.log(error);
    });
  }

  async takePhoto(source: CameraSource) {
    console.log('Take Photo');
    const capturedPhoto = await Camera.getPhoto({
      resultType: CameraResultType.DataUrl,
      source: source,
      quality: 100
    });
    this.user_data.image = capturedPhoto.dataUrl;
    this.update();
  }

  async presentPhotoOptions() {
    const alert = await this.alertController.create({
      header: "Seleccione una opción",
      message: "¿De dónde desea obtener la imagen?",
      buttons: [
        {
          text: "Cámara",
          handler: () => {
            this.takePhoto(CameraSource.Camera);
          }
        },
        {
          text: "Galería",
          handler: () => {
            this.takePhoto(CameraSource.Photos);
          }
        },
        {
          text: "Cancelar",
          role: "cancel",
          handler: () => {
            console.log('Cancelado');
          }
        }
      ]
    });
    await alert.present();
  }

  async update() {
    this.userService.updateUser(this.user_data).then((data: any) => {
      console.log(data);
    }).catch((error: any) => {
      console.log(error);
    });
  }

  async openModalUpdate() {
    const modal = await this.modalController.create({
      component: UpdateAccountModalPage,
      componentProps: {}
    });
    return await modal.present();
  }

}
