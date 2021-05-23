import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-dash',
  templateUrl: './dash.component.html',
  styleUrls: ['./dash.component.scss']
})
export class DashComponent implements OnInit {

  totalCases: Number;
  totalDeaths: Number;
  totalRecovery: Number;
  todayCases: Number;
  todayDeaths: Number;
  todayRecovery: Number;


  constructor(private commonService: CommonService) { }

  ngOnInit(): void {

    this.getCovidData();
  }

  getCovidData() {

    this.commonService.covidData().subscribe(data => {
      this.totalCases = data.cases;
      this.totalDeaths = data.deaths;
      this.totalRecovery = data.recovered;
      this.todayCases = data.todayCases;
      this.todayDeaths = data.todayDeaths;
      this.todayRecovery = data.todayRecovered;
    })
  }

}
