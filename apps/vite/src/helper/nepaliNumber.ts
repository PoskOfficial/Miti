const nepaliNumber = (str: string) => {
  const numbers = ['०', '१', '२', '३', '४', '५', '६', '७', '८', '९'];
  return str.replace(
    /\d/g,
    (match) => numbers[match as unknown as number] ?? '',
  );
};
export default nepaliNumber;
