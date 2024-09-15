interface HasOid {
  oid: string;
}
interface ColumnNameMapping<T> {
  key: keyof T;
  label: string;
}

const isKeyOf = <T extends HasOid>(
  key: string | number | symbol,
  obj: T,
): key is keyof T => {
  return key in obj;
};

export type { HasOid, ColumnNameMapping };
export { isKeyOf };
