import { Component, OnInit } from '@angular/core';
import { LocalEventsDTO } from './DTOs/LocalEventsDTO';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'Angular-SearchFilter';
  txtFilter: string = '';
  private _fieldSearch: string = '';
  
  values: LocalEventsDTO[] = [
    {Code:1, Country: 'Brazil', State: 'Rio de Janeiro', Amount: 30000},
    {Code:2, Country: 'Brazil', State: 'São Paulo', Amount: 120000},
    {Code:3, Country: 'Canada', State: 'Montreal', Amount: 75000},
    {Code:4, Country: 'Australia', State: 'Somewhere', Amount: 50000}
  ]
  filteredValues: LocalEventsDTO[] = this.values;

  checkboxOptions = [
    {Name:"Code", IsSelected: false},
    {Name:"Country", IsSelected: false},
    {Name:"State", IsSelected: false},
    {Name:"Amount", IsSelected: false}
  ]

  ngOnInit(){ }

  public get fieldSearch(){
    return this._fieldSearch;
  }

  public set fieldSearch(content: string){
    this._fieldSearch = content;
    this.filteredValues = this.values ? this.filterValues(content) : this.values;
  }

  filterValues(content: string){
    return this.values.filter(x => x.State.toLocaleLowerCase().indexOf(content.toLocaleLowerCase()) != -1)
  }  
  
}
