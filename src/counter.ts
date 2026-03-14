/**
 * Sets up a simple counter on a button element.
 * @param {HTMLButtonElement} element The HTML button element to attach the counter to.
 */
export function setupCounter(element: HTMLButtonElement) {
  let counter = 0
  const setCounter = (count: number) => {
    counter = count
    element.innerHTML = `Count is ${counter}`
  }
  element.addEventListener('click', () => setCounter(counter + 1))
  setCounter(0)
}
