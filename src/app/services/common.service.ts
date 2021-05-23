import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Card } from '../countries/country-list/country-list.component';
import { map, tap } from 'rxjs/operators'
//  import Card from '../countries/country-list'
@Injectable({
  providedIn: 'root'
})
export class CommonService {

  private selectDataSubject: BehaviorSubject<any>;
  public listenData: Observable<any>;
  private editedSubject: BehaviorSubject<any>;
  public listenEdited: Observable<any>;

  constructor(private http: HttpClient) {

    this.selectDataSubject = new BehaviorSubject<any>('');
    this.listenData = this.selectDataSubject.asObservable();
    this.editedSubject = new BehaviorSubject<any>('');
    this.listenEdited = this.editedSubject.asObservable();
  }


  public get currentCountry() {
    return this.selectDataSubject.value;
  }

  updateSelectSubject(data: any) {
    this.selectDataSubject.next(data)
  }



  covidData() {

    return this.http.get<any>('https://corona.lmao.ninja/v2/all');
  }

  countrydata() {
    return this.http.get<any>('https://corona.lmao.ninja/v2/countries')
      .pipe(
        map(data =>
          data.map((x: Card) => ({
            country: x.country,
            countryInfo: x.countryInfo,
            cases: x.cases,
            deaths: x.deaths,
            recovered: x.recovered,
            tests: x.tests,
            population: x.population
          })
          )))
  }
}
