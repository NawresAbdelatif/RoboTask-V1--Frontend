import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import {RobotTaskService} from "../../../views/Robot-Task/Services/robot-task.service";
function filterMenu(items: any[], isAdmin: boolean): any[] {
  return (items || [])
      .filter(item => !item.adminOnly || isAdmin)
      .map(item =>
          item.sub
              ? { ...item, sub: filterMenu(item.sub, isAdmin) }
              : item
      );
}
@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.template.html'
})
export class SidenavComponent {
  @Input('items') public menuItems: any[] = [];
  public filteredMenu: any[] = [];
  @Input('hasIconMenu') public hasIconTypeMenuItem: boolean;
  @Input('iconMenuTitle') public iconTypeMenuTitle: string;
  @ViewChild('sidenav') sidenav:ElementRef;

  constructor(private authService: RobotTaskService) {}
  ngOnInit() {
    const isAdmin = this.authService.hasRole('ROLE_ADMIN');
    console.log('isAdmin?', isAdmin);
    this.filteredMenu = filterMenu(this.menuItems, isAdmin);
  }

  ngAfterViewInit() {
    setTimeout(() => {
      const links = this.sidenav.nativeElement.querySelectorAll('li[appdropdownlink]');
      [...links].forEach(link => {
        if(link.querySelector('a.open')) {
          link.classList.add('open');
        }
      })
    })
  }

  // Only for demo purpose
  addMenuItem() {
    this.menuItems.push({
      name: 'ITEM',
      type: 'dropDown',
      tooltip: 'Item',
      icon: 'done',
      state: 'material',
      sub: [
        {name: 'SUBITEM', state: 'cards'},
        {name: 'SUBITEM', state: 'buttons'}
      ]
    });
  }
}
