import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  @Input() showSidebar: boolean;
  @Input() isLoggedIn: boolean;
  @Input() activeMenu: string[];

  constructor() {
    this.showSidebar = false;
    this.isLoggedIn = false;
    this.activeMenu = [];
  }

  ngOnInit(): void {}

  toggleSidebar(): void {
    this.showSidebar = !this.showSidebar;
  }
}
