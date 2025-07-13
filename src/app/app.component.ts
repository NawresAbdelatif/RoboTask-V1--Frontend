import { Component, OnInit, AfterViewInit, Renderer2 } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, NavigationEnd, ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';

import { RoutePartsService } from './shared/services/route-parts.service';

import { filter } from 'rxjs/operators';
import { UILibIconService } from './shared/services/ui-lib-icon.service';
import { ThemeService } from './shared/services/theme.service';
import { LayoutService } from './shared/services/layout.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {
  appTitle = 'RoboTask';
  pageTitle = '';

  constructor(
    public title: Title,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private routePartsService: RoutePartsService,
    private iconService: UILibIconService,
    private layoutService: LayoutService
  ) {
    iconService.init()
  }

  ngOnInit() {
    this.changePageTitle();
    // this.themeService.applyMatTheme(this.layoutService.layoutConf.matTheme);
  }

  ngAfterViewInit() {
  }

  changePageTitle() {
    this.title.setTitle('RoboTask');

  }
}
