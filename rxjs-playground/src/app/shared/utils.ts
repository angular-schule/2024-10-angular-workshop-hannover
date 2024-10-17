export function generateRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

export function generateRandomString(): string {
  return Math.random().toString(36).substr(2, 5).toUpperCase();
}
