// src/app/layouts/shared/header-top/header-top.component.ts

import { Component, OnInit, OnDestroy, Input, Renderer2 } from '@angular/core';
import { Subscription } from 'rxjs';
import { LayoutService } from '../../services/layout.service';
import { NavigationService } from "../../../shared/services/navigation.service";
import { ThemeService } from '../../../shared/services/theme.service';
import { TranslateService } from '@ngx-translate/core';
import {JwtAuthService} from "../../../views/Robot-Task/Services/jwt-auth-service.service";

@Component({
  selector: 'app-header-top',
  templateUrl: './header-top.component.html'
})
export class HeaderTopComponent implements OnInit, OnDestroy {
  userName = '';
  avatarInitial = 'U';
  avatarBgColor = '#5e72e4';
  avatarTextColor = '#fff';

  layoutConf: any;
  menuItems: any;
  menuItemSub: Subscription;
  matxThemes: any[] = [];
  currentLang = 'en';
  availableLangs = [
    { name: 'English', code: 'en' },
    { name: 'Spanish', code: 'es' }
  ];
  userInitial: string = '';
  @Input() notificPanel;

  constructor(
      private layout: LayoutService,
      private navService: NavigationService,
      public themeService: ThemeService,
      public translate: TranslateService,
      private renderer: Renderer2,
      public jwtAuth: JwtAuthService // ton AuthService

  ) {}

    ngOnInit() {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      this.userName = user?.username || 'User';
      this.userInitial = this.userName.charAt(0).toUpperCase();
      this.avatarBgColor = this.getColorForLetter(this.userInitial);
    this.layoutConf = this.layout.layoutConf;
    this.matxThemes = this.themeService.matxThemes;
    this.menuItemSub = this.navService.menuItems$
        .subscribe(res => {
          res = res.filter(item => item.type !== 'icon' && item.type !== 'separator');
          let limit = 4;
          let mainItems: any[] = res.slice(0, limit);
          if (res.length <= limit) {
            return this.menuItems = mainItems;
          }
          let subItems: any[] = res.slice(limit, res.length - 1);
          mainItems.push({
            name: 'More',
            type: 'dropDown',
            tooltip: 'More',
            icon: 'more_horiz',
            sub: subItems
          });
          this.menuItems = mainItems;
        });
  }

  getColorForLetter(letter: string): string {
    const colors = {
      A: '#e57373', // rouge
      B: '#64b5f6', // bleu
      C: '#81c784', // vert
      D: '#ffd54f', // jaune
    };
    return colors[letter] || '#5e72e4';
  }

  ngOnDestroy() {
    this.menuItemSub.unsubscribe();
  }

  setLang() {
    this.translate.use(this.currentLang);
  }
  changeTheme(theme) {
    this.layout.publishLayoutChange({matTheme: theme.name});
  }
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
}
