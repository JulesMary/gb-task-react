const saveSortKeyToLocalStorage = (key: string) => {
  localStorage.setItem("sortKey", key);
};

const loadSortKeyFromLocalStorage = (): string | null => {
  return localStorage.getItem("sortKey");
};

export { saveSortKeyToLocalStorage, loadSortKeyFromLocalStorage };
