import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent {
  public static urlPattern: string = '^https?:\\/\\/(?:www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\\.[a-zA-Z0-9()]{1,6}\\b(?:[-a-zA-Z0-9()@:%_\\+.~#?&\\/=]*)$';
  public static emailPattern: string = "^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$";
  public static phonePattern: string = '^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$';

  @Input() type: string = '';
  @Input() name: string = '';
  @Input() disabled: boolean = false; 
  @Input() control: FormControl = new FormControl();

  public isUrlPattern(): boolean {
    return this.isPattern(InputComponent.urlPattern);
  }
  public isEmailPattern(): boolean {
    return this.isPattern(InputComponent.emailPattern);
  }
  public isPhonePattern(): boolean {
    return this.isPattern(InputComponent.phonePattern);
  }
  public isPattern(pattern: string): boolean {
    return this.control.errors?.pattern.requiredPattern === pattern;
  }
}
