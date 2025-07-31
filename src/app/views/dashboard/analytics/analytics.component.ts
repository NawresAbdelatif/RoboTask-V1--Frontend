import {
  Component,
  OnInit,
  AfterViewInit
} from "@angular/core";
import { matxAnimations } from "app/shared/animations/matx-animations";
import { ThemeService } from "app/shared/services/theme.service";
import { RobotTaskService } from "../../Robot-Task/Services/robot-task.service";

@Component({
  selector: "app-analytics",
  templateUrl: "./analytics.component.html",
  styleUrls: ["./analytics.component.scss"],
  animations: matxAnimations
})
export class AnalyticsComponent implements OnInit, AfterViewInit {
  dailyTrafficChartBar: any;
  doughNutPieOptions: any;
  activeUsersCount: number = 0;
  activeProjectsCount: number = 0;
  totalPiecesCount: number = 0;
  totalPiecesQuantite: number = 0;
  totalOutilsCount: number = 0;
  totalOutilsQuantite: number = 0;

  statCardList = [
    { icon: "people", title: "New Leads", amount: "3,050", color: "primary" },
    { icon: "attach_money", title: "This week Sales", amount: "$80,500", color: "primary" },
    { icon: "store", title: "Inventory Status", amount: "8.5% Stock Surplus", color: "accent" },
    { icon: "shopping_cart", title: "Orders to deliver", amount: "305 Orders", color: "accent" }
  ];

  productList = [
    { imgUrl: "/assets/images/products/headphone-2.jpg", name: "earphone", price: 100, available: 15 },
    { imgUrl: "/assets/images/products/headphone-3.jpg", name: "earphone", price: 1500, available: 30 },
    { imgUrl: "/assets/images/products/iphone-2.jpg", name: "iPhone x", price: 1900, available: 35 },
    { imgUrl: "/assets/images/products/iphone-1.jpg", name: "iPhone x", price: 100, available: 0 },
    { imgUrl: "/assets/images/products/headphone-3.jpg", name: "Head phone", price: 1190, available: 5 }
  ];

  onGoingProjectList = [
    { icon: "start_border", color: "warn", title: "project 1" },
    { icon: "date_range", color: "primary", title: "project 2" },
    { icon: "start_border", color: "warn", title: "project 3" },
    { icon: "date_range", color: "accent", title: "project 4" }
  ];

  displayedColumns: string[] = ["name", "price", "available", "action"];

  constructor(
      private themeService: ThemeService,
      private projectService: RobotTaskService
  ) {}

  ngAfterViewInit() {}

  ngOnInit() {

    this.projectService.getProjectsCountByYear().subscribe(data => {
      const years = Object.keys(data);
      const counts = Object.values(data);

      this.dailyTrafficChartBar = {
        grid: { top: 16, left: 36, right: 16, bottom: 32 },
        tooltip: {
          show: true,
          trigger: "axis",
          axisPointer: { type: "cross", lineStyle: { opacity: 0 } },
          crossStyle: { color: "#000" }
        },
        series: [
          {
            data: counts,
            type: "line",
            areaStyle: {},
            smooth: true,
            lineStyle: { width: 2, color: "#fff" }
          }
        ],
        xAxis: {
          show: true,
          type: "category",
          showGrid: false,
          boundaryGap: false,
          data: years,
          axisLabel: { color: "#ccc", margin: 20 },
          axisLine: { show: false },
          axisTick: { show: false }
        },
        yAxis: {
          type: "value",
          min: 0,
          max: Math.max(...counts, 10) + 2,
          axisLabel: {
            color: "#ccc",
            margin: 20,
            fontSize: 13,
            fontFamily: "roboto"
          },
          splitLine: {
            show: true,
            lineStyle: { color: "rgba(255, 255, 255, .1)" }
          },
          axisLine: { show: false },
          axisTick: { show: false }
        },
        color: [
          {
            type: "linear",
            x: 0, y: 0, x2: 0, y2: 1,
            colorStops: [
              { offset: 0, color: "rgba(255,255,255,0.3)" },
              { offset: 1, color: "rgba(255,255,255,0)" }
            ],
            global: false
          }
        ]
      };
    });

    this.themeService.onThemeChange.subscribe(activeTheme => {
      this.initDoughNutPieOptions(activeTheme);
    });
    this.initDoughNutPieOptions(this.themeService.activatedTheme);

    // Récupérer la répartition des projets par statut
    this.projectService.getProjectsCountByStatus().subscribe(data => {
      // data = {PLANNED: 7, IN_PROGRESS: 5, COMPLETED: 11}
      const statusLabels = {
        'BROUILLON': 'Brouillon',
        'COMPLETE': 'Complété',
        'ARCHIVE': 'Archivé'
      };

      const chartData = Object.keys(data).map(key => ({
        value: data[key],
        name: statusLabels[key] || key
      }));

      const chartColors = [
        '#ff9e43',// Archive - orange
        '#43a047',// COMPLété - vert
        '#0084FA',// Brouilon-bleu

      ];

      this.doughNutPieOptions = {
        backgroundColor: "transparent",
        color: chartColors,
        legend: {
          show: true,
          itemGap: 20,
          icon: "circle",
          bottom: 0,
          textStyle: { fontSize: 13, fontFamily: "roboto" }
        },
        tooltip: {
          show: true,
          trigger: "item",
          formatter: "{b}: {c} ({d}%)"
        },
        series: [
          {
            name: "Projets par statut",
            type: "pie",
            radius: ["45%", "72.55%"],
            center: ["50%", "50%"],
            avoidLabelOverlap: false,
            hoverOffset: 0,
            emphasis: { disabled: true },
            stillShowZeroSum: false,
            label: { show: false },
            labelLine: { show: false },
            data: chartData,
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
          }
        ]
      };
    });
    this.projectService.getEnabledUsersCount().subscribe(count => {
      this.activeUsersCount = count;
    });
    this.projectService.getActiveProjectsCount().subscribe(count => {
      this.activeProjectsCount = count;
    });
    this.projectService.getTotalPieces().subscribe(count => {
      this.totalPiecesCount = count;
    });
    this.projectService.getTotalPiecesQuantite().subscribe(count => {
      this.totalPiecesQuantite = count;
    });
    this.projectService.getTotalOutils().subscribe(count => {
      this.totalOutilsCount = count;
    });
    this.projectService.getTotalOutilsQuantite().subscribe(count => {
      this.totalOutilsQuantite = count;
    });
  }

  initDoughNutPieOptions(theme) {
    this.doughNutPieOptions = {
      backgroundColor: "transparent",
      color: [
        "#f44336",
        "#ff9e43",
        "rgba(116, 103, 239, 1)"
      ],
      legend: {
        show: true,
        itemGap: 20,
        icon: "circle",
        bottom: 0,
        textStyle: { fontSize: 13, fontFamily: "roboto" }
      },
      tooltip: {
        show: true,
        trigger: "item",
        formatter: "{a} <br/>{b}: {c} ({d}%)"
      },
      xAxis: [
        {
          axisLine: { show: false },
          splitLine: { show: false }
        }
      ],
      yAxis: [
        {
          axisLine: { show: false },
          splitLine: { show: false }
        }
      ],
      series: [
        {
          name: "Traffic Rate",
          type: "pie",
          radius: ["45%", "72.55%"],
          center: ["50%", "50%"],
          avoidLabelOverlap: false,
          hoverOffset: 0,
          emphasis: { disabled: true },
          stillShowZeroSum: false,
          label: {
            normal: {
              show: false,
              position: "center",
              textStyle: { fontSize: "13", fontWeight: "normal" },
              formatter: "{a}"
            },
            emphasis: {
              show: true,
              textStyle: { fontSize: "15", fontWeight: "normal", color: "rgba(116, 103, 239, 1)" },
              formatter: "{b} \n{c} ({d}%)"
            }
          },
          labelLine: { normal: { show: false } },
          data: [
            { value: 65, name: "Google" },
            { value: 20, name: "Facebook" },
            { value: 15, name: "Others" }
          ],
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)"
            }
          }
        }
      ]
    };
  }

  getProductStatus(value) {
    if (value) {
      if (value < 20) {
        return { color: "accent", status: `${value} available` };
      } else {
        return { color: "primary", status: `in stock` };
      }
    } else {
      return { color: "warn", status: `out of stock` };
    }
  }
}
