interface Sorting {
  field: string;
  reversed: boolean;
}
const STORAGE_KEY = "sorting";

/**
 * Save sorting configuration to local storage.
 * @param value object of sort key (field) and sort direction (reversed or not).
 */
const saveSortKeyToLocalStorage = (value: Sorting) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
};

/**
 * Load sorting configuration from local storage.
 */
const loadSortKeyFromLocalStorage = (): Sorting | null => {
  const item = localStorage.getItem(STORAGE_KEY);
  return item ? JSON.parse(item) : null;
};

export { saveSortKeyToLocalStorage, loadSortKeyFromLocalStorage };
