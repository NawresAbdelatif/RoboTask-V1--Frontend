import { Component, OnInit, OnDestroy, AfterViewInit } from "@angular/core";
import { NavigationService } from "../../../shared/services/navigation.service";
import { ThemeService } from "../../services/theme.service";
import { Subscription } from "rxjs";
import { ILayoutConf, LayoutService } from "app/shared/services/layout.service";
import { JwtAuthService } from "../../../views/Robot-Task/Services/jwt-auth-service.service"
import { getColorForUser } from "../../../views/Robot-Task/Components/color.util";

@Component({
  selector: "app-sidebar-side",
  templateUrl: "./sidebar-side.component.html"
})
export class SidebarSideComponent implements OnInit, OnDestroy, AfterViewInit {
  public menuItems: any[];
  public hasIconTypeMenuItem: boolean;
  public iconTypeMenuTitle: string;
  private menuItemsSub: Subscription;
  public layoutConf: ILayoutConf;
  userName: string = '';
  avatarLetter: string = 'U';
  avatarBgColor = '#5e72e4';
  avatarTextColor = '#fff';

  constructor(
      private navService: NavigationService,
      public themeService: ThemeService,
      private layout: LayoutService,
      public jwtAuth: JwtAuthService
  ) {}

  ngOnInit() {
    const user = this.getUser();
    this.userName = user?.username || user?.email || 'Utilisateur';
    this.avatarLetter = this.userName[0]?.toUpperCase() || 'U';
    this.avatarBgColor = getColorForUser(this.userName);

    this.iconTypeMenuTitle = this.navService.iconTypeMenuTitle;
    this.menuItemsSub = this.navService.menuItems$.subscribe(menuItem => {
      this.menuItems = menuItem;
      this.hasIconTypeMenuItem = !!this.menuItems.filter(
          item => item.type === "icon"
      ).length;
    });
    this.layoutConf = this.layout.layoutConf;
  }

  ngAfterViewInit() {}
  ngOnDestroy() {
    if (this.menuItemsSub) {
      this.menuItemsSub.unsubscribe();
    }
  }
  toggleCollapse() {
    if (this.layoutConf.sidebarCompactToggle) {
      this.layout.publishLayoutChange({
        sidebarCompactToggle: false
      });
    } else {
      this.layout.publishLayoutChange({
        sidebarCompactToggle: true
      });
    }
  }

  getUser() {
    return JSON.parse(localStorage.getItem('user') || '{}');
  }

  isAdmin(): boolean {
    const user = this.getUser();
    return user.roles && user.roles.includes('ROLE_ADMIN');
  }
}
