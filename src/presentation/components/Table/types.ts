interface HasOid {
  oid: string;
}
interface ColumnNameMapping<T> {
  key: keyof T;
  label: string;
}

export type { HasOid, ColumnNameMapping };
