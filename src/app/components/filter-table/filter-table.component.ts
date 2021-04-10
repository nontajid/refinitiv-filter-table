import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-filter-table',
  templateUrl: './filter-table.component.html',
  styleUrls: ['./filter-table.component.scss']
})
export class FilterTableComponent implements OnInit, OnDestroy {

  private data: string[];
  private componentDestroy$ = new Subject();

  filterInput = new FormControl('');
  displayTableData: string[] = [];

  @Input()
  set tableData(data) {
    if (data) {
      this.data = data;
      this.displayTableData = this.filterTableData(this.filterInput?.value, data);
    }
  }

  ngOnInit(): void {
    this.filterInput.valueChanges.pipe(
      takeUntil(this.componentDestroy$)
    ).subscribe(value => {
      this.displayTableData = this.filterTableData(value, this.data);
    });
  }

  private filterTableData(filterText: string, tableData: string[]): string[] {
    return tableData.filter(item => item.includes(filterText));
  }

  ngOnDestroy() {
    this.componentDestroy$.next();
    this.componentDestroy$.complete();
  }

}
