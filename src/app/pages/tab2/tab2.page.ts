import { Component } from '@angular/core';
import {PhotoService} from '../../services/photo.service';
import {ServerService} from '../../services/server.service';
import {Order} from '../../interfaces/order';
import {OrderModel} from '../../models/order-model';
import {OrderService} from '../../services/order.service';
import {AudioService} from '../../services/audio.service';
import {ActionSheetController} from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  photos = this.photoService.photos;
  audioRecording = false;
  audioList: any[] = [];

  constructor(public photoService: PhotoService,
              private orderService: OrderService,
              private audioService: AudioService,
              public actionSheetController: ActionSheetController) {}

  addPhoto() {
    this.photoService.addNewToGallery();
  }

  OnInit() {
    this.photoService.loadSaved();
  }

  public async showActionSheet(photo, position) {
    const actionSheet = await this.actionSheetController.create({
      header: 'Job photos',
      buttons: [{
        text: 'Delete',
        role: 'destructive',
        icon: 'trash-outline',
        handler: () => {
          this.photoService.deletePicture(photo, position);
        }
      }, {
        text: 'Cancel',
        icon: 'close-circle-outline',
        role: 'cancel',
        handler: () => {
          // Nothing to do, action sheet is automatically closed
        }
      }]
    });
    await actionSheet.present();
  }

  startRecord() {
    this.audioRecording = true;
    // this.audioService.startRecord();
  }

  stopRecord() {
    this.audioService.stopRecord();
    this.audioRecording = false;
  }

  playAudio(file, idx) {
    this.audioService.playAudio(file);
  }

  getAudioList() {
    this.audioList = this.audioService.getAudioList();
  }

  placeOrder(){
    // const order: OrderModel = {
    //   orderNo: '',
    //   orderStatus: 'New',
    //   orderTime: new Date(),
    //   description: '',
    //   location: {
    //     latitude: 0.0,
    //     longitude: 0.0
    //   }
    // };
    // this.orderService.placeOrder(order);
  }
}
