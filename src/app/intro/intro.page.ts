import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.page.html',
  styleUrls: ['./intro.page.scss'],
  standalone: false
})
export class IntroPage implements OnInit {

  constructor(private navCtrl: NavController, private storage: Storage) { }

  async ngOnInit() {
    await this.storage.set('viLaIntro', true);
  }

  finish() {
    this.navCtrl.navigateRoot('/login');
  }

}
