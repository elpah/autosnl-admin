function convertToLowerCase(arr) {
  return arr.map((str) => str.toLowerCase());
}

const processArrays = (filterValue, defaultValue = []) => {
  return filterValue ? convertToLowerCase(filterValue) : defaultValue;
};

const parseNums = (value, defaultValue = 0) => {
  return value && !isNaN(value) ? Number(value) : defaultValue;
};

export { convertToLowerCase, processArrays, parseNums };
