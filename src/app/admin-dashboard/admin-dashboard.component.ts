import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { EventService } from '../services/event.service';
import { AlertService } from '../services/alert.service';
declare var google;
@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  Count;
  usersCount;
  eventCount;
  collectionCount;
  constructor(private route: ActivatedRoute,
    private router: Router, private _eventService: EventService, private alertSerivce: AlertService) {
  }

  ngOnInit() {
    this.getEventCount();
    this.firstChart()

    // chart1
    google.charts.load("current", { packages: ['corechart'] });
    google.charts.setOnLoadCallback(drawChart1);
    function drawChart1() {
      var data = google.visualization.arrayToDataTable([
        ["Element", "Density", { role: "style" }],
        ["Total Payment", 19000, "#4fb964"],
        ["Total Amount Collected", 40000, "#f9a24a"],
        ["Total Amount (Logistic)", 30000, "#48b4d6"],
        ["Total Amount (Commission)", 10000, "#8c6ec5"],
      ]);

      var view = new google.visualization.DataView(data);
      view.setColumns([0, 1,
        {
          calc: "stringify",
          sourceColumn: 1,
          type: "string",
          role: "annotation"
        },
        2]);

      var options = {
        xAxis: {
          gridlines: {
            color: 'transparent'
          }
        },
        vAxis: {
          title: '(Count)'
        },
        fontName: 'Russo One',
        bar: { groupWidth: "80%" },
        legend: { position: "none" },
        backgroundColor: { fill: 'transparent' }
      };
      var chart = new google.visualization.ColumnChart(document.getElementById("columnchart_values2"));
      chart.draw(view, options);
    }

    // chart2

  }

  /**
   * To get total no of counts of events,users,amount
   */
  getEventCount() {
    this._eventService.dashBoardCount()
      .subscribe((data: any) => {
        console.log(data)
        this.Count = data.data;
        this.eventCount = this.Count.totalEventCount;
        console.log(this.eventCount);
        
      }, (err: any) => {
        console.log(err);
        this.alertSerivce.getError(err.message);
      })
  }

  firstChart() {
    google.charts.load("current", { packages: ['corechart'] });
    google.charts.setOnLoadCallback(drawChart);
    function drawChart() {
      var data = google.visualization.arrayToDataTable([
        ["Element", "Density", { role: "style" }],
        ["Total Events", 50, "#8c6ec5"],
        ["Total Users", 10, "#f9a24a"]
      ]);

      var view = new google.visualization.DataView(data);
      view.setColumns([0, 1,
        {
          calc: "stringify",
          sourceColumn: 1,
          type: "string",
          role: "annotation"
        },
        2]);

      var options = {
        xAxis: {
          gridlines: {
            color: 'transparent'
          }
        },
        vAxis: {
          title: '(Count)'
        },
        fontName: 'Russo One',
        bar: { groupWidth: "50%" },
        legend: { position: "none" },
        backgroundColor: { fill: 'transparent' }
      };
      var chart = new google.visualization.ColumnChart(document.getElementById("columnchart_values1"));
      chart.draw(view, options);
    }
  }


}
