export function logger(object: any) {
  console.dir(object, {
    depth: Infinity,
    colors: true,
  });
}
