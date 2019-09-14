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
  totalPayment;
  tot: any;
  constructor(private route: ActivatedRoute,
    private router: Router, private _eventService: EventService, private alertSerivce: AlertService) {
  }

  ngOnInit() {
    this.getEventCount();

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
        this.usersCount = this.Count.totalUserCount;
        this.collectionCount = this.Count.totalCollection;
        this.totalPayment = this.Count.totalTransaction;
        console.log(this.eventCount);
        this.firstChart(this.eventCount, this.usersCount, this.totalPayment);
        this.secondChart(this.collectionCount);
      }, (err: any) => {
        console.log(err);
        this.alertSerivce.getError(err.message);
      })
  }

  firstChart(eventCount, userCoount, paymentCount) {
    google.charts.load("current", { packages: ['corechart'] });
    google.charts.setOnLoadCallback(drawChart);
    function drawChart() {
      console.log("eventCount in chart func", eventCount);
      var data = google.visualization.arrayToDataTable([
        ["Element", "Count", { role: "style" }],
        ["Total Events", eventCount, "#8c6ec5"],
        ["Total Users", userCoount, "#f9a24a"],
        ["Total Payment", paymentCount, "#4fb964"],
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

  secondChart(collection){
    google.charts.load("current", { packages: ['corechart'] });
    google.charts.setOnLoadCallback(drawChart1);
    function drawChart1() {
      var data = google.visualization.arrayToDataTable([
        ["Element", "Amount", { role: "style" }],
       
        ["Total Amount Collected", collection, "#f9a24a"],
        ["Total Amount (Logistic)", "#48b4d6"],
        ["Total Amount (Commission)", "#8c6ec5"],
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
          title: '(Amount)'
        },
        fontName: 'Russo One',
        bar: { groupWidth: "80%" },
        legend: { position: "none" },
        backgroundColor: { fill: 'transparent' }
      };
      var chart = new google.visualization.ColumnChart(document.getElementById("columnchart_values2"));
      chart.draw(view, options);
    }
  }


}
