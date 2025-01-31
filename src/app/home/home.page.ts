import { Component } from '@angular/core';
import { PostService } from '../service/post.service';
import { ModalController } from '@ionic/angular';
import { AddPostModalPage } from '../add-post-modal/add-post-modal.page';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {
  posts: any;
  constructor(private postService: PostService, private modalController: ModalController) { }

  ngOnInit() {
    this.postService.getPosts().then((data: any) => this.posts = data)
  }

  async addPost() {
    const modal = await this.modalController.create({
      component: AddPostModalPage,
      componentProps: {}
    });
    return await modal.present();
  }

}
