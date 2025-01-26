import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user.service';
import { Storage } from '@ionic/storage-angular';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { defineCustomElements } from '@ionic/pwa-elements/loader';
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
    followed_users: [],
    following_users: []
  };
  constructor(private userService: UserService, private storage: Storage) { }

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

  async takePhoto() {
    const capturedPhoto = await Camera.getPhoto({
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Camera,
      quality: 100
    });
    this.user_data.image = capturedPhoto.dataUrl;
    this.update();
  }

  async update() {
    this.userService.updateUser(this.user_data).then((data: any) => {
      console.log(data);
    }).catch((error: any) => {
      console.log(error);
    });
  }

}
