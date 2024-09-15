interface Sorting {
  field: string;
  reversed: boolean;
}
const STORAGE_KEY = "sorting";
const saveSortKeyToLocalStorage = (value: Sorting) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
};

const loadSortKeyFromLocalStorage = (): Sorting | null => {
  const item = localStorage.getItem(STORAGE_KEY);
  return item ? JSON.parse(item) : null;
};

export { saveSortKeyToLocalStorage, loadSortKeyFromLocalStorage };
