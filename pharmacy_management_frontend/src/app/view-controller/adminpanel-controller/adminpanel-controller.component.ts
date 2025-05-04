import { Component } from '@angular/core';
import { SidebarComponent } from "../../componenet/sidebar/sidebar.component";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-adminpanel-controller',
  imports: [SidebarComponent, RouterOutlet],
  templateUrl: './adminpanel-controller.component.html',
  styleUrl: './adminpanel-controller.component.css'
})
export class AdminpanelControllerComponent {

}
