import { Component } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
import {Router} from '@angular/router';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  constructor(private router: Router, private actionSheetCtrl: ActionSheetController) {}

  async openActionSheetMore() {
    const actionSheet = await this.actionSheetCtrl.create({
      buttons: [
        {
          text: 'My Account',
          icon: 'person-outline',
          handler: () => {
            this.navigateTo('account');
          }
        },
        {
          text: 'About',
          icon: 'information-outline',
          handler: () => {
            this.navigateTo('about');
          }
        },
        {
          text: 'Help and FAQs',
          icon: 'help-outline',
          handler: () => {
            this.navigateTo('help');
          }
        },
        {
          text: 'Send Feedback',
          icon: 'mail-outline',
          handler: () => {
            this.navigateTo('feedback');
          }
        }
      ]
    });
    await actionSheet.present();
  }

  navigateTo(route: string){

    this.router.navigate([`/${route}`]);

  }
}
