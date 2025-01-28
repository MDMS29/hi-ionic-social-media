import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
  standalone: false
})
export class MenuPage implements OnInit {

  menuItems: any = [
    {
      title: 'Perfil',
      url: '/menu/account',
      icon: 'person-outline',
      function: this.log_out
    }
  ]

  constructor(
    private menu: MenuController,
    private navCtrl: NavController,
    private storage: Storage
  ) { }

  async ngOnInit() {
    await this.storage.create();
  }

  closeMenu() {
    this.menu.close();
  }

  log_out() {
    this.storage.remove("user");
    this.storage.remove("isUserLoggedIn");
    this.navCtrl.navigateRoot("/login");
  }

}
