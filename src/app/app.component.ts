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
    { Type: "Code", IsSelected: false },
    { Type: "Country", IsSelected: false },
    { Type: "State", IsSelected: false },
    { Type: "Amount", IsSelected: false }
  ]

  ngOnInit() { }

  public get isOneSelected(): boolean {
    if (this.checkboxOptions.find(x => x.IsSelected == true))
      return true;

    return false;
  }

  /* set values to _fieldSearc and return values */
  public set fieldSearch(content: string) {
    this._fieldSearch = content;
    this.filteredValues = this.values ? this.filterValues(content) : this.values;
  }

  public get fieldSearch() {
    return this._fieldSearch;
  }

  filterValues(content: string) {
    let codes = this.values.filter(x => x.Code.toString() == content);
    let amounties = this.values.filter(x => Array.from(String(x.Amount), Number).indexOf(Number(content)) != -1);
    let states = this.values.filter(x => x.State.toLocaleLowerCase().indexOf(content.toLocaleLowerCase()) != -1);
    let countries = this.values.filter(x => x.Country.toLocaleLowerCase().indexOf(content.toLocaleLowerCase()) != -1);

    let result = this.removeDuplicates([...codes, ...amounties, ...states, ...countries]);

    return result;
  }

  /* set values to _fieldSearchByType and return values */
  public set fieldSearchByType(content: string) {
    this._fieldSearchByType = content;

    this.checkboxOptions.forEach(x => {
      if (x.IsSelected)
        this.filteredValuesByType = this.valuesByType ? this.filterValuesByType(content, x.Type) : this.valuesByType;
    });
  }

  public get fieldSearchByType() {
    return this._fieldSearchByType;
  }

  filterValuesByType(content: string, type: string) {
    let result: LocalEventsDTO[] = [];

    if (type == 'Code')
      result = this.valuesByType.filter(x => x.Code.toString().toLocaleLowerCase().indexOf(content.toLocaleLowerCase()) != -1);

    if (type == 'Country')
      result = this.valuesByType.filter(x => x.Country.toLocaleLowerCase().indexOf(content.toLocaleLowerCase()) != -1);

    if (type == 'State')
      result = this.valuesByType.filter(x => x.State.toLocaleLowerCase().indexOf(content.toLocaleLowerCase()) != -1);

    if (type == 'Amount')
      result = this.valuesByType.filter(x => x.Amount.toString().toLocaleLowerCase().indexOf(content.toLocaleLowerCase()) != -1);

    return result;
  }

  /* useful functions */
  removeDuplicates(arr: LocalEventsDTO[]) {
    for (let i = 0; i < arr.length; i++) {
      for (let j = i + 1; j < arr.length; j++) {
        if (arr[i].Code == arr[j].Code) {
          arr.splice(j, 1);
        }
      }
    }

    return arr;
  }

}
