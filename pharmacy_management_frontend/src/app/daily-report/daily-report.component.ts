import { Component, OnInit } from '@angular/core';
import { DailyReportService } from '../services/daily-report.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-daily-report',
  templateUrl: './daily-report.component.html',
  styleUrl: './daily-report.component.css',
  imports:[CommonModule]
})
export class DailyReportComponent implements OnInit {
  todaySales: any[] = [];
  todayReceives: any[] = [];
  totalSalesAmount = 0;

  constructor(private reportService: DailyReportService) {}

  ngOnInit(): void {
    this.loadSales();
    this.loadReceives();
  }

  loadSales() {
  this.reportService.getTodaySales().subscribe(data => {
    console.log("Today’s sales:", data); 
    this.todaySales = data;
    this.totalSalesAmount = data.reduce((sum, item) => sum + item.netPayable, 0);
  });
}

loadReceives() {
  this.reportService.getTodayReceives().subscribe(data => {
    console.log("Today’s receives:", data); 
    this.todayReceives = data;
  });
}

}
