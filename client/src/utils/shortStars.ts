/*
  input: 100, 1.000, 12.000, 150.000, 30.300.150
  output: 100, 1K,  12K,    150K,     30M
*/

export function shortStars(stars: number) {
  if (stars > 999999) {
    // M
    return stars / 1000000 + "M";
  } else if (stars > 999) {
    // K
    return stars / 1000 + "K";
  } else {
    return stars.toString();
  }
}
