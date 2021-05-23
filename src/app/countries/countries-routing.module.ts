import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CountryEditComponent } from './country-edit/country-edit.component';
import { CountryListComponent } from './country-list/country-list.component';

const routes: Routes = [
  {
    path: "",
    component: CountryListComponent
  },
  {
    path: "edit",
    component: CountryEditComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CountriesRoutingModule { }
