import { Component, OnInit } from '@angular/core';
import { LocalEventsDTO } from './DTOs/LocalEventsDTO';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'Angular-SearchFilter';
  txtFilter: string = '';
  private _fieldSearch: string = '';
  private _fieldSearchByType: string = '';

  values: LocalEventsDTO[] = [
    { Code: 1, Country: 'Brazil', State: 'Rio de Janeiro', Amount: 30000 },
    { Code: 2, Country: 'Brazil', State: 'São Paulo', Amount: 120000 },
    { Code: 3, Country: 'Canada', State: 'Montreal', Amount: 75000 },
    { Code: 4, Country: 'Australia', State: 'Somewhere', Amount: 50000 }
  ]
  filteredValues: LocalEventsDTO[] = this.values;

  valuesByType: LocalEventsDTO[] = [
    { Code: 1, Country: 'Argentina', State: 'Buenos Aires', Amount: 70000 },
    { Code: 2, Country: 'Marrocos', State: 'Rabat', Amount: 40000 },
    { Code: 3, Country: 'Canada', State: 'Quebec', Amount: 53000 },
    { Code: 4, Country: 'Australia', State: 'Camberra', Amount: 10000 }
  ]
  filteredValuesByType: LocalEventsDTO[] = this.valuesByType;

  checkboxOptions = [
    { Name: "Code", IsSelected: false },
    { Name: "Country", IsSelected: false },
    { Name: "State", IsSelected: false },
    { Name: "Amount", IsSelected: false }
  ]

  ngOnInit() { }

  public get isOneSelected(): boolean{
    if(this.checkboxOptions.find(x => x.IsSelected == true))
      return true;

    return false;
  }

  public get fieldSearch() {
    return this._fieldSearch;
  }

  public set fieldSearch(content: string) {
    this._fieldSearch = content;
    this.filteredValues = this.values ? this.filterValues(content) : this.values;
  }

  public get fieldSearchByType() {
    return this._fieldSearchByType;
  }

  public set fieldSearchByType(content: string) {
    this._fieldSearchByType = content;

    this.checkboxOptions.forEach(x => {
      if (x.IsSelected)
        this.filteredValuesByType = this.valuesByType ? this.filterValuesByType(content, x.Name) : this.valuesByType;
    });

  }

  filterValues(content: string) {
    return this.values.filter(x => x.State.toLocaleLowerCase().indexOf(content.toLocaleLowerCase()) != -1);
  }

  filterValuesByType(content: string, type: string) {
    let result: LocalEventsDTO[] = [];

    if (type == 'Country')
      result = this.valuesByType.filter(x => x.Country.toLocaleLowerCase().indexOf(content.toLocaleLowerCase()) != -1);

    if (type == 'State')
      result = this.valuesByType.filter(x => x.State.toLocaleLowerCase().indexOf(content.toLocaleLowerCase()) != -1);

    return result;
  }

}
