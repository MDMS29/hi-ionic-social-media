import { Component, OnInit } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { defineCustomElements } from '@ionic/pwa-elements/loader';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PostService } from '../service/post.service';
import { Storage } from '@ionic/storage-angular';
import { ModalController, ToastController } from '@ionic/angular';

defineCustomElements(window);

@Component({
  selector: 'app-add-post-modal',
  templateUrl: './add-post-modal.page.html',
  styleUrls: ['./add-post-modal.page.scss'],
  standalone: false,
})
export class AddPostModalPage implements OnInit {
  post_image: string | null = null;
  addPostForm!: FormGroup;
  isSubmitting = false; // Para evitar doble envío

  constructor(
    private formBuilder: FormBuilder,
    private postService: PostService,
    private storage: Storage,
    private modalController: ModalController,
    private toastController: ToastController
  ) { }

  ngOnInit() {
    this.addPostForm = this.formBuilder.group({
      description: ['', [Validators.required, Validators.minLength(5)]],
      image: ['', Validators.required]
    });
  }

  async uploadPhoto() {
    try {
      const photo = await Camera.getPhoto({
        resultType: CameraResultType.DataUrl,
        source: CameraSource.Photos,
        quality: 100
      });

      if (photo?.dataUrl) {
        this.post_image = photo.dataUrl;
        this.addPostForm.patchValue({ image: this.post_image });
      }
    } catch (error) {
      console.error('Error al tomar foto:', error);
      this.showToast('No se pudo cargar la imagen');
    }
  }

  async addPost() {
    if (this.addPostForm.invalid) {
      this.showToast('Completa todos los campos antes de publicar.');
      return;
    }

    this.isSubmitting = true; // Evitar múltiples envíos

    try {
      const user = await this.storage.get('user');
      if (!user) throw new Error('Usuario no encontrado en el almacenamiento.');

      const post_param = {
        post: {
          description: this.addPostForm.value.description,
          image: this.addPostForm.value.image,
          user_id: user.id
        }
      };

      await this.postService.createPost(post_param);
      this.showToast('Post creado exitosamente 🎉');
      this.modalController.dismiss(); // Cerrar modal después de publicar
    } catch (error) {
      console.error('Error al crear post:', error);
      this.showToast('Hubo un error al crear el post.');
    } finally {
      this.isSubmitting = false;
    }
  }

  closeModal() {
    this.modalController.dismiss();
  }

  async showToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      position: 'top',
      color: 'success'
    });
    toast.present();
  }
}
