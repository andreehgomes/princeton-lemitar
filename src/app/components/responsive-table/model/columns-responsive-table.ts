export type ArrayColumnResponsiveTable = ColumnResponsiveTable[];
export interface ColumnResponsiveTable {
    prop: string,
    name: string,
    sort?: boolean,
    datePipe?: boolean,
    replaceBooleanValue?: boolean,
    replaceBooleanTrueValue?: string,
    replaceBooleanFalseValue?: string,
}