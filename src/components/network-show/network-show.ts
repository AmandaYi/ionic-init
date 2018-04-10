import { Component, Output, EventEmitter } from '@angular/core';

/**
 * Generated class for the NetworkShowComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'network-show',
  templateUrl: 'network-show.html'
})
export class NetworkShowComponent {

  @Output() willEnt = new EventEmitter();

  reload() {
    this.willEnt.emit();
  }

  constructor() {
  }

}
