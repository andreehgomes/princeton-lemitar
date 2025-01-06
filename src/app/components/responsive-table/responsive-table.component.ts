import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  NgForm,
  ReactiveFormsModule,
} from '@angular/forms';
import {
  NgbCollapseModule,
  NgbDropdown,
  NgbDropdownModule,
  NgbModule,
  NgbPaginationModule,
  NgbTypeaheadModule,
} from '@ng-bootstrap/ng-bootstrap';
import {
  AsyncPipe,
  CommonModule,
  DatePipe,
  DecimalPipe,
} from '@angular/common';
import { ArrayColumnResponsiveTable } from './model/columns-responsive-table';
import { ArrayContextMenu } from './model/context-menu';
import { FeatherModule } from 'angular-feather';

@Component({
  selector: 'responsive-table',
  standalone: true,
  imports: [
    DecimalPipe,
    AsyncPipe,
    NgbTypeaheadModule,
    NgbPaginationModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    FeatherModule,
    NgbModule,
    NgbDropdownModule,
    NgbCollapseModule
  ],
  templateUrl: './responsive-table.component.html',
  styleUrl: './responsive-table.component.scss'
})
export class ResponsiveTableComponent implements OnInit {

  @ViewChild("formDirective") private formDirective: NgForm;
  @Input() dataN: any;
  @Input() columnsN: ArrayColumnResponsiveTable;
  @Input() pageSizeN: number;
  @Input() totalItens: number = 0;
  @Input() titulo?: string = 'Lista'
  @Input() colunaAcoes?: boolean = true;
  @Input() btnDetail?: boolean = true;
  @Input() btnEdit?: boolean = true;
  @Input() btnDelete?: boolean = true;
  @Input() showButtonFiltro?: boolean = true;
  @Input() propValidateRowRed?: string = "";
  @Input() contextMenu: ArrayContextMenu = [];
  @Output() pageNav: EventEmitter<number> = new EventEmitter<number>()
  @Output() changeQtdItensNav: EventEmitter<number> = new EventEmitter<number>()
  @Output() clickBtnEdit: EventEmitter<any> = new EventEmitter<any>();
  @Output() clickBtnSort: EventEmitter<any> = new EventEmitter<any>()
  @Output() clickBuscar: EventEmitter<any> = new EventEmitter<any>();
  @Output() clickBtnDetail: EventEmitter<any> = new EventEmitter<any>();
  @Output() clickBtnDelete: EventEmitter<any> = new EventEmitter<any>();
  @Output() clickBtnLimparFiltro: EventEmitter<any> = new EventEmitter<any>();
  @Output() clickContextMenu: EventEmitter<{ propAction: string, data: any }> = new EventEmitter<{ propAction: string, data: any }>();

  @ViewChild('myDropDown') myDropDown!: NgbDropdown;
  @HostListener('document:wheel', ['$event'])
  onDocumentScroll(event: Event) {
    this.myDropDown.close();
  }
  menuStyles: { top?: string; left?: string, position?: string } = {};

  lengthBody: number;
  lengthTable: number;
  lengthScroll: number;
  lengthScrollRazao: number;
  scroll = 0;
  blockBtnLeft: boolean = true;
  blockBtnRigth: boolean = false;
  showFormGroupFilter: boolean = false;
  tableRowRed: boolean = false;

  page = 0;
  maxSize = 5;

  constructor(private datePipe: DatePipe) { }

  formGroupFilter = new FormGroup({
    campoTexto: new FormControl("")
  });

  ngOnInit() {
    this.formFilterBuilder();
  }

  pageChange(event) {
    let filter = this.formFilter();
    Object.defineProperty(filter, "page", {
      value: event - 1,
      enumerable: true
    })

    if (this.getSortedCol()) {
      Object.defineProperty(filter, "sort", {
        value: this.getSortedCol(),
        enumerable: true
      })
    }
    this.pageNav.emit(filter)
  }

  edit(event) {
    this.clickBtnEdit.emit(event);
  }

  detail(event) {
    this.clickBtnDetail.emit(event);
  }

  delete(event) {
    this.clickBtnDelete.emit(event);
  }

  changeQtdItens() {
    this.changeQtdItensNav.emit(this.pageSizeN)
  }

  navScrollTable(direction: string) {
    this.lengthBody = document.getElementById("card-body").scrollWidth;
    this.lengthTable = document.getElementById("table").clientWidth;
    this.lengthScroll = this.lengthTable / (this.lengthTable / this.lengthBody);

    if (direction == 'left') {
      this.scroll = this.scroll - this.lengthScroll;
      document.getElementById("content-table").scrollTo({ left: this.scroll, top: 0, behavior: "smooth" });
      this.blockBtnRigth = false;
      if (this.scroll <= 0) this.blockBtnLeft = true;
    } else {
      this.scroll = this.scroll + this.lengthScroll;
      document.getElementById("content-table").scrollTo({ left: this.scroll, top: 0, behavior: "smooth" });
      this.blockBtnLeft = false;

      if (this.scroll + this.lengthScroll > this.lengthTable) this.blockBtnRigth = true;
    }

  }


  sortClick(id: string) {
    const formFilter = this.formFilter();
    const sortDirection: string = this.rotateBtnSort(id);
    this.clickBtnSort.emit({ sort: id.slice(5), sortDir: sortDirection, page: this.page - 1, size: this.pageSizeN, ...formFilter })
  }

  rotateBtnSort(id: string): string {
    this.columnsN.forEach((col) => {
      let sortCol = `sort-${col.prop}`
      if (sortCol != id && col.sort) {
        var btnRest = document.getElementById(sortCol);
        btnRest.style.transform = "rotate(0deg)";
      }
    })
    var btnSort = document.getElementById(id);
    btnSort.style.transform = btnSort.style.transform == "rotate(180deg)" ? "rotate(0deg)" : "rotate(180deg)";
    return btnSort.style.transform == "rotate(0deg)" ? "ASC" : "DESC";
  }

  getSortedCol(): string {
    let colSort;
    this.columnsN.forEach((col) => {
      var btnSort = document.getElementById(`sort-${col.prop}`);
      if (btnSort && btnSort.style.transform == "rotate(180deg)") colSort = `${col.prop},DESC`;
    })
    return colSort;
  }

  formFilterBuilder() {
    this.formGroupFilter.controls['campoTexto'].setValue("");
    this.showFormGroupFilter = true;

  }

  onSubmit() {
    this.clickBuscar.emit(this.formFilter());
  }

  formFilter(): any {
    const formFilter = {};

    Object.defineProperty(formFilter, "size", {
      value: this.pageSizeN,
      enumerable: true
    });

    let countControl = 1;
    for (let control in this.formGroupFilter.controls) {

      if (this.formGroupFilter.controls[control].value) {
        Object.defineProperty(formFilter, control, {
          value: this.formGroupFilter.controls[control].value,
          enumerable: true
        })
      }

      if (countControl != Object.keys(this.formGroupFilter.controls).length) {
        countControl++;
      } else {
        return formFilter;
      }
    };
  }

  zerarFormFilter() {
    this.formGroupFilter.reset();
    this.formDirective.resetForm();
    this.formGroupFilter.controls['campoTexto'].setValue("");
    this.clickBtnLimparFiltro.emit(true);
  }

  returnPropSubProp(objValue: Object, prop: string): any {
    const props = prop.split('.');
    let obj = objValue;

    for (let i = 0; i < props.length; i++) {
      obj = obj[props[i]];
    }

    return obj;
  }

  validateRowRed(data, prop): boolean {
    return data[prop];
  }

  getUserTimeZone(): string {

    const dt = new Date();
    let diffTZ = dt.getTimezoneOffset();
    return diffTZ.toString();

  }

  onRigthClick($event: MouseEvent, data) {
    if (this.contextMenu.length > 0) {
      $event.preventDefault();
      this.menuStyles = {
        top: `${$event.clientY}px`,
        left: `${$event.clientX}px`,
        position: 'fixed'
      };
      this.myDropDown.open();
    }
  }

  actionContextMenu(actionProp: string, data: any): void {
    this.clickContextMenu.emit({ propAction: actionProp, data: data })
  }
}

