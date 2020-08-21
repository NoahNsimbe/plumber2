import { Injectable } from '@angular/core';
import {MediaObject} from '@ionic-native/media';
import {Media} from '@ionic-native/media/ngx';
import {Platform} from '@ionic/angular';
import { File } from '@ionic-native/file/ngx';

@Injectable({
  providedIn: 'root'
})
export class AudioService {

  audio: MediaObject;
  filePath: string;
  fileName: string;
  audioList: any[] = [];

  constructor(private media: Media,
              private file: File,
              public platform: Platform) { }

  startRecord() {

    this.fileName = 'record' + new Date().getDate() + new Date().getMonth() + new Date().getFullYear() + new Date().getHours() +
        new Date().getMinutes() + new Date().getSeconds() + '.3gp';

    if (this.platform.is('ios')) {

      this.filePath = this.file.documentsDirectory.replace(/file:\/\//g, '') + this.fileName;
      this.audio = this.media.create(this.filePath);

    } else if (this.platform.is('android')) {

      this.filePath = this.file.externalDataDirectory.replace(/file:\/\//g, '') + this.fileName;
      this.audio = this.media.create(this.filePath);

    }

    this.audio.startRecord();
  }

  stopRecord() {
    this.audio.stopRecord();
    const data = { filename: this.fileName };
    this.audioList.push(data);
    localStorage.setItem('audioList', JSON.stringify(this.audioList));
    this.getAudioList();
  }

  playAudio(file: string) {

    if (this.platform.is('ios')) {
      this.filePath = this.file.documentsDirectory.replace(/file:\/\//g, '') + file;
      this.audio = this.media.create(this.filePath);

    } else if (this.platform.is('android')) {
      this.filePath = this.file.externalDataDirectory.replace(/file:\/\//g, '') + file;
      this.audio = this.media.create(this.filePath);

    }
    this.audio.play();
    this.audio.setVolume(0.8);
  }


  getAudioList() {
    if (localStorage.getItem('audioList')) {
      this.audioList = JSON.parse(localStorage.getItem('audioList'));
      console.log(this.audioList);
    }
    return this.audioList;
  }
}
