import { Component } from '@angular/core';
import { TopbarComponent } from "../../topbar/topbar.component";
import { SidebarComponent } from "../../sidebar/sidebar.component";
import { BottombarComponent } from "../../bottombar/bottombar.component";
import { RouterOutlet  } from '@angular/router';

@Component({
    selector: 'app-back-layout',
    standalone: true,
    templateUrl: './back-layout.component.html',
    styleUrl: './back-layout.component.scss',
    imports: [TopbarComponent, SidebarComponent, BottombarComponent, RouterOutlet]
})
export class BackLayoutComponent {

}
