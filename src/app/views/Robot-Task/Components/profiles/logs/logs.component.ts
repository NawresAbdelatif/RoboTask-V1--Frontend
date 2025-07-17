import { Component, OnInit, ViewChild } from '@angular/core';
import { RobotTaskService } from "../../../Services/robot-task.service";
import { LogEntry } from "../../../Models/log-entry.model";
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.scss']
})
export class LogsComponent implements OnInit {
  displayedColumns: string[] = ['timestamp', 'level', 'message', 'username', 'ip'];
  dataSource = new MatTableDataSource<LogEntry>([]);
  loading = true;
  page = 0;
  size = 8;
  totalElements = 0;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private logService: RobotTaskService) {}
  isMobile = false;
  ngOnInit() {
    this.checkMobile();
    window.addEventListener('resize', this.checkMobile.bind(this));
    this.loadLogs();
  }
  checkMobile() {
    this.isMobile = window.innerWidth < 800;
  }
  ngOnDestroy() {
    window.removeEventListener('resize', this.checkMobile);
  }



  loadLogs() {
    this.loading = true;
    this.logService.getLogs(this.page, this.size).subscribe({
      next: data => {
        this.dataSource.data = data.content;
        this.totalElements = data.totalElements;
        this.loading = false;
      },
      error: err => {
        this.loading = false;
      }
    });
  }

  onPageChange(event: PageEvent) {
    this.page = event.pageIndex;
    this.size = event.pageSize;
    this.loadLogs();
  }



  getLogLevelColor(level: string): string {
    switch (level) {
      case 'INFO': return 'primary';
      case 'WARN': return 'accent';
      case 'ERROR': return 'warn';
      default: return '';
    }
  }

  clearAllLogs() {
    if (confirm('Voulez-vous vraiment supprimer tous les logs ?')) {
      this.logService.clearLogs().subscribe({
        next: () => {
          this.loadLogs();
        }
      });
    }
  }

}
