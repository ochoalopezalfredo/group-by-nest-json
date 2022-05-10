import { Component, Input } from '@angular/core';
import { MapperService } from './mapper.service';
import jsonData from './events_data.json';
import causeCodeData from './cause_codes.json';
@Component({
  selector: 'hello',
  template: `
  <ul *ngFor="let main of causeCodes ">
  {{main.key}}
 
    <ul (click)="subItem.collapsed = !subItem.collapsed " [class]="subItem.collapsed? 'collapsed':'expanded'"
    *ngFor="let subItem of main.items ">
    {{subItem.key}}
    <li [hidden]="subItem.collapsed" *ngFor="let item of subItem.items">
        {{item.causeCodeDetail}}
      </li>
    </ul>
  </ul>`,
  styles: [
    `  /* ⌄ */
  ul{
    color:gray
    font-weight: bold;
  }
  ul ul {
    color:darkgrey;
  }
  ul ul.collapsed:before { content:"›" }
  ul ul.expanded:before { content:"⌄" }

  
  ul li{
    text-indent: 2em;
    list-style-type: none;
    color:#0d98ba;
    transition:visibility 0.3s linear,opacity 0.3s linear;  }`,
  ],
})
export class HelloComponent {
  @Input() name: string;
  listItems;
  causeCodes;
  constructor(ms: MapperService) {
    this.listItems = ms.parse(jsonData, [
      'eventCategory',
      'eventCategoryDetail',
    ]);
    this.causeCodes = ms.parse(causeCodeData, [
      'causeCodeCategory',
      'causeCode',
    ]);
  }
}
