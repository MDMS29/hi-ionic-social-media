import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user.service';
import { Storage } from '@ionic/storage-angular';
import { ToastController } from '@ionic/angular';
import { AlertTypes } from 'src/helper/constanst';

@Component({
  selector: 'app-search-users',
  templateUrl: './search-users.page.html',
  styleUrls: ['./search-users.page.scss'],
  standalone: false
})

export class SearchUsersPage implements OnInit {
  users: any[] = [];
  page: number = 1;
  limit: number = 10;
  query: string = '';
  hasHoreUsers: boolean = true;
  current_user: any;

  constructor(
    private userService: UserService,
    private storage: Storage,
    private toast: ToastController,
  ) { }
  ngOnInit() {
    this.loadUsers();
  }
  async loadUsers(event?: any) {
    this.current_user = await this.storage.get('user');
    const followingUers = this.current_user.followees || [];
    this.userService.listUsers(this.page, this.limit, this.query).then(
      (data: any) => {
        if (data.users.length > 0) {
          const updateUsers = data.users.map((user: any) => ({
            ...user,
            is_following: followingUers.some((followedUser: any) => followedUser.id == user.id),
          }));
          this.users = updateUsers;
          this.page++;
        } else {
          this.hasHoreUsers = false;
        }
        if (event) {
          event.target.complete();
        }
      }
    ).catch((error: any) => {
      console.log(error);
      event.target.complete();
    }
    );
  }
  searchUsers(event?: any) {
    this.query = event.target.value || '';
    this.page = 1;
    this.users = [];
    this.hasHoreUsers = true;
    this.loadUsers();
  }

  follow(followee_id: any) {
    const user_id = this.current_user.id;
    this.userService.followUser(user_id, followee_id).then((data: any) => {

      if (data.msg) {
        this.showToast(`${data.msg} 🎉`, 'primary');

        this.users = this.users.map((user: any) => {
          if (user.id == followee_id) {
            return { ...user, is_following: true }
          }

          return user;
        });
      }
    }).catch((error: any) => {
      console.log(error);
    });
  }
  unfollow(unfollowee_id: any) {
    const user_id = this.current_user.id;
    this.userService.unfollowUser(user_id, unfollowee_id).then((data: any) => {
      if (data.msg) {
        this.showToast(`${data.msg} 🎉`, 'primary');

        this.users = this.users.map((user: any) => {
          if (user.id == unfollowee_id) {
            return { ...user, is_following: false }
          }

          return user;
        });
      }
    }).catch((error: any) => {
      console.log(error);
    });
  }


  toggleFollow(user: any) {
    if (user.is_following) {
      this.unfollow(user.id);
    } else {
      this.follow(user.id);
    }
  }

  async showToast(message: string, type: AlertTypes) {
    const toast = await this.toast.create({
      message,
      duration: 2000,
      position: 'top',
      color: type
    });
    toast.present();
  }
}