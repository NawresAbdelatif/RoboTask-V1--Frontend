import { Component, OnInit, Input, ViewChildren, Renderer2 } from '@angular/core';
import { ThemeService } from '../../services/theme.service';
import { LayoutService } from '../../services/layout.service';
import { TranslateService } from '@ngx-translate/core';
import { JwtAuthService } from '../../services/auth/jwt-auth.service';
import { MatxNotifications2Component } from '../matx-notifications2/matx-notifications2.component';
import { RobotTaskService } from "../../../views/Robot-Task/Services/robot-task.service";
import { Notification } from '../../../views/Robot-Task/Models/notfication.model';
import {getColorForUser} from "../../../views/Robot-Task/Components/color.util";

@Component({
  selector: 'app-header-side',
  templateUrl: './header-side.template.html'
})
export class HeaderSideComponent implements OnInit {
  @Input() notificPanel;
  @ViewChildren(MatxNotifications2Component) noti;
  public availableLangs = [{
    name: 'EN',
    code: 'en',
    flag: 'us'
  }, {
    name: 'ES',
    code: 'es',
    flag: 'es'
  }];
  userName = '';
  avatarBgColor = '#5e72e4';
  avatarTextColor = '#fff';
  currentLang = this.availableLangs[0];

  public matxThemes;
  public layoutConf: any;
  // notifications: Notification[] = [];
  unreadCount = 0;
  notifications: Notification[] = [];
  constructor(
      private robotaskService: RobotTaskService,
      private themeService: ThemeService,
      private layout: LayoutService,
      public translate: TranslateService,
      private renderer: Renderer2,
      public jwtAuth: JwtAuthService,
  ) {}

  ngOnInit() {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    this.userName = user?.username || 'User';
    this.avatarBgColor = getColorForUser(this.userName);
    this.fetchNotifications();

    this.matxThemes = this.themeService.matxThemes;
    this.layoutConf = this.layout.layoutConf;
    this.translate.use(this.currentLang.code);
  }

  // fetchNotifications() {
  //   this.robotaskService.getNotifications().subscribe(n => {
  //     this.notifications = n.filter(notif => !notif.read);
  //   });
  //   this.robotaskService.getUnreadCount().subscribe(c => this.unreadCount = c.unreadCount);
  // }
  //
  // openNotifications(panel) {
  //   panel.toggle();
  //   this.fetchNotifications();
  // }
  fetchNotifications() {
    this.robotaskService.getNotifications().subscribe(n => {
      this.notifications = n; // on garde toutes
    });
    this.robotaskService.getUnreadCount().subscribe(c => this.unreadCount = c.unreadCount);
  }

  // onNotificationsMenuOpened() {
  //   this.robotaskService.markAllAsRead().subscribe(() => {
  //     this.fetchNotifications();
  //   });
  // }

  onNotificationsMenuOpened() {
    // UX instantanée
    this.unreadCount = 0;
    this.notifications.forEach(n => n.read = true);

    this.robotaskService.markAllAsRead().subscribe(() => {
      // Optionnel : actualise le back ou recharge la liste
      this.fetchNotifications();
    });
  }



  timeAgo(dateStr: string): string {
    const now = new Date();
    const date = new Date(dateStr);
    const diff = Math.floor((+now - +date) / 60000); // minutes
    if (diff < 1) return 'just now';
    if (diff < 60) return diff + ' min ago';
    const hours = Math.floor(diff / 60);
    if (hours < 24) return hours + ' h ago';
    return date.toLocaleDateString();
  }

  clearAllNotifications() {
    this.robotaskService.clearNotifications().subscribe(() => {
      this.notifications = [];
      this.unreadCount = 0;
    });
  }

  setLang(lng) {
    this.currentLang = lng;
    this.translate.use(lng.code);
  }

  changeTheme(theme) {
    // this.themeService.changeTheme(theme);
  }

  // PLUS BESOIN de getColorForLetter ! Supprimé

  toggleNotific() {
    this.notificPanel.toggle();
  }
  toggleSidenav() {
    if (this.layoutConf.sidebarStyle === 'closed') {
      return this.layout.publishLayoutChange({
        sidebarStyle: 'full'
      });
    }
    this.layout.publishLayoutChange({
      sidebarStyle: 'closed'
    });
  }

  toggleCollapse() {
    if (this.layoutConf.sidebarStyle === 'compact') {
      return this.layout.publishLayoutChange({
        sidebarStyle: 'full',
        sidebarCompactToggle: false
      }, {transitionClass: true});
    }
    this.layout.publishLayoutChange({
      sidebarStyle: 'compact',
      sidebarCompactToggle: true
    }, {transitionClass: true});
  }

  onSearch(e) {}
}
