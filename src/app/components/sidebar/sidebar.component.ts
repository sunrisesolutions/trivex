import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/club-members', title: 'Club Members',  icon:'ni-bullet-list-67 text-red', class: '' },
    { path: '/member-connect', title: 'Member Connect',  icon:'ni-planet text-blue', class: '' }
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  public menuItems: any[];
  public exampleMenuItems: any[];
  public isCollapsed = true;

  constructor(private router: Router) { }

  ngOnInit() {
    this.menuItems = ROUTES;
    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
   });
  }
}
