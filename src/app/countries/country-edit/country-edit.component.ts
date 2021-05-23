import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'


@Component({
  selector: 'app-country-edit',
  templateUrl: './country-edit.component.html',
  styleUrls: ['./country-edit.component.scss']
})
export class CountryEditComponent implements OnInit {

  editForm: FormGroup;
  submitted: boolean = false;
  countryname: any;

  constructor(private commonService: CommonService, private router: Router,
    private formBuilder: FormBuilder,) {

    if (this.commonService.currentCountry) {
      this.countryname = this.commonService.currentCountry.country;


    } else {
      this.router.navigate(['/country'])
    }
  }

  ngOnInit(): void {


    this.editForm = this.formBuilder.group({
      cases: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
      deaths: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
      recovered: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
      tests: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
    })

    this.editForm.patchValue({
      cases: this.commonService.currentCountry.cases,
      deaths: this.commonService.currentCountry.deaths,
      recovered: this.commonService.currentCountry.recovered,
      tests: this.commonService.currentCountry.tests
    });
  }
  get f() {
    return this.editForm.controls;
  }

  formSubmit() {

    this.submitted = true;
    if (this.editForm.invalid) {
      return;
    }
    this.commonService.currentCountry.cases = this.editForm.value.cases;
    this.commonService.currentCountry.deaths = this.editForm.value.deaths;
    this.commonService.currentCountry.recovered = this.editForm.value.recovered;
    this.commonService.currentCountry.tests = this.editForm.value.tests;

    this.commonService.updateSelectSubject(this.commonService.currentCountry);
    this.router.navigate(['/country'])
  }

  cancelSubmit() {
    this.router.navigate(['/country'])
  }

}
