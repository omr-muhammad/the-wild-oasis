export default function useFilterSort(cabins, options = {}) {
  const { sortBy, filterBy } = options;

  const filteredCabins =
    filterBy === 'all'
      ? cabins
      : cabins.filter((cabin) => {
          return filterBy === 'with-discount'
            ? cabin.discount > 0
            : cabin.discount === 0;
        });

  const fnsObj = {
    asc: (field) => (a, b) => a[field] - b[field],
    desc: (field) => (a, b) => b[field] - a[field],
  };
  const [field, order] = sortBy.split('-');
  const compFn = fnsObj[order](field);

  const sortedCabins = filteredCabins.sort(compFn);

  return sortedCabins;
}
