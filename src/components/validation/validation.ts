import { Component } from '@angular/core';

/**
 * Generated class for the ValidationComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'validation',
  templateUrl: 'validation.html'
})
export class ValidationComponent {

  text: string;

  constructor() {
    console.log('Hello ValidationComponent Component');
    this.text = 'Hello World';
  }

}
