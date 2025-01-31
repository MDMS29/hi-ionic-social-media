import { Component } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { register } from 'swiper/element/bundle';

register();
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent {
  constructor(private storage: Storage) { }

  ngOnInit() {
    this.storage.create();
  }
}
