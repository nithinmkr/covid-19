import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort, MatSortable } from '@angular/material/sort';
import { Observable } from 'rxjs';
import { CommonService } from 'src/app/services/common.service';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

export interface Card {
  country: string;
  countryInfo: any;
  cases: number;
  deaths: number;
  recovered: number;
  tests: number;
  population: number;
}

const DATA: Card[] = [];


@Component({
  selector: 'app-country-list',
  templateUrl: './country-list.component.html',
  styleUrls: ['./country-list.component.scss']
})
export class CountryListComponent implements OnInit {

  picurl: string = 'https://material.angular.io/assets/img/examples/shiba1.jpg'

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) matSort: MatSort;
  obs: Observable<any>;
  dataSource: MatTableDataSource<Card> = new MatTableDataSource(DATA);
  selectedColumn: any = 'country';
  displayedColumns: any = [
    {
      name: 'country', title: 'Country Name'
    },
    {
      name: 'cases', title: 'Number of cases'
    },
    {
      name: 'deaths', title: 'Number of deaths'
    },
    {
      name: 'recovered', title: 'Number of recovered'
    }
  ]
  editCountryData: any;

  constructor(private changeDetectorRef: ChangeDetectorRef, private commonService: CommonService,
    private router: Router) {

    if (this.commonService.currentCountry) {
      console.log(this.commonService.currentCountry)
    }
  }


  ngOnInit() {
    this.changeDetectorRef.detectChanges();

    this.getCountryData();

  }

  getCountryData() {
    this.commonService.countrydata().subscribe(data => {

      this.dataSource = new MatTableDataSource<Card>(data);
      this.dataSource.paginator = this.paginator;
      this.obs = this.dataSource.connect();

      if (this.commonService.currentCountry) {
        const editData = this.commonService.currentCountry;
        this.dataSource.data = this.dataSource.data.map(x => {
          if (x.countryInfo._id === editData.countryInfo._id) {
            x = editData;
          }
          return x;
        })


      }

      this.dataSource.sort = this.matSort;
      this.changeSortedColumn();
    })
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  changeSortedColumn() {

    this.dataSource.sort?.sort(<MatSortable>({ id: this.selectedColumn, start: 'asc' }));
    this.dataSource.data = this.dataSource.data.sort((a: any, b: any) => {

      if (this.selectedColumn == 'deaths') {
        return a.deaths - b.deaths;
      }
      else if (this.selectedColumn === 'cases') {
        return a.cases - b.cases;
      }
      else if (this.selectedColumn === 'recovered') {
        return a.recovered - b.recovered;
      }
      else {
        let nameA = a.country.toUpperCase();
        let nameB = b.country.toUpperCase();
        if (nameA < nameB) {
          return -1;
        }
        else if (nameA > nameB) {
          return 1;
        } else {
          return 0;
        }
      }

    });

  }

  editData(selectedData: any) {
    this.commonService.updateSelectSubject(selectedData);
    this.router.navigate(['/country/edit'])

  }

  ngOnDestroy() {
    if (this.dataSource) {
      this.dataSource.disconnect();
    }
  }

}
