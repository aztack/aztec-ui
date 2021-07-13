export function capitalizeFirst(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export function dashToPascalCase (str: string) {
  return str.toLowerCase().split('-').map(capitalizeFirst).join('');
}

export function camelToDashCase (str: string) {
  return str.replace(/([A-Z])/g, (m: string) => `-${m[0].toLowerCase()}`);
}
