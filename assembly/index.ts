declare function interrupt(): void

export function square(x: i32): i32 {
  if (x === 11) {
    interrupt();
  }
  return x * x;
}