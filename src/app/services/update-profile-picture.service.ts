import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UpdateProfilePictureService {
  image;
  constructor() { }
  updateProfile(event) {
    /* update image */
    this.image.setAttribute('src', URL.createObjectURL(event.target.files[0]));
  }
}
