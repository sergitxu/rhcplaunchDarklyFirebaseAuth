import { Component } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import * as LDClient from 'ldclient-js';

interface Song {
  name: string,
  LP: string
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  songs: Song[] = [
    { name: 'These are the ways', LP: 'Unlimited Love' },
    { name: 'Dark Necessities', LP: 'The Getaway' },
    { name: 'Under the bridge', LP: 'Blood Sugar Sex Magik' }
  ]

  newSong: Song = {
    name: '',
    LP: ''
  }

  add() {
    if (this.newSong.name.trim().length === 0) { return; }

    this.songs.push(this.newSong);

    this.newSong = {
      name: '',
      LP: ''
    }
  }

  /* LaunchDarkly */

  user: Object = {
    key: 'key'
    /* TODO add real uidTODO essage */
  }

  editableSongList: boolean = false;

  ldclient = LDClient.initialize('62165020fea3b214d035cbe8', this.user);


  onLaunchDarklyReady() {
    this.editableSongList = this.ldclient.variation('EditableSongList');
  }

  constructor(public authService: AuthService) {
    this.ldclient.on('ready', this.onLaunchDarklyReady.bind(this));
    this.ldclient.on('change', this.onLaunchDarklyReady.bind(this));
  }

}
