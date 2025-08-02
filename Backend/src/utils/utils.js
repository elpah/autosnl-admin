function convertToLowerCase(arr) {
  return arr.map((str) => str.toLowerCase());
}

const processArrays = (filterValue, defaultValue = []) => {
  return filterValue ? convertToLowerCase(filterValue) : defaultValue;
};

const parseNums = (value, defaultValue = 0) => {
  return value && !isNaN(value) ? Number(value) : defaultValue;
};


function normalizeQueryArray(value) {
  if (Array.isArray(value)) return value;
  if (typeof value === "string" && value.length > 0) return [value];
  return [];
}

export { convertToLowerCase, processArrays, parseNums, normalizeQueryArray };
