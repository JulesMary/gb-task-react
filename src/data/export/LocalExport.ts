import { ColumnNameMapping } from "../../presentation/components/Table/types.ts";

const exportToCSV = <T>(
  headers: ColumnNameMapping<T>[],
  rowData: T[],
  fileName: string,
) => {
  if (rowData.length === 0) {
    console.warn("No data to export.");
    return;
  }
  const csvContent =
    "sep=,\n" +
    headers.map((header) => header.label).join(",") +
    "\n" +
    rowData
      .map((row) => {
        return headers.map((header) => `"${row[header.key]}"`).join(",");
      })
      .join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });

  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${fileName}.csv`;
  document.body.appendChild(a);
  a.click();
  window.URL.revokeObjectURL(url);
  a.remove();
};

export { exportToCSV };
