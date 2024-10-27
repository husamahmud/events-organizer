/**
 * Returns a promise that resolves after a random delay between 500ms and
 * `max` milliseconds (default is 2500ms).
 */
export function delay(max: number = 2500) {
  const randomDelay = Math.floor(Math.random() * (max - 500 + 1))
  return new Promise((resolve) => setTimeout(resolve, randomDelay))
}
