import { Component } from '@angular/core';
import { PostService } from '../service/post.service';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {
  posts: any;
  constructor(private postService: PostService) { }

  ngOnInit() {
    this.postService.getPosts().then((data: any) => this.posts = data)
  }

}
