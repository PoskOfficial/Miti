export function classNames(...classes: Array<string | undefined | boolean>) {
  return classes.filter(Boolean).join(' ');
}
