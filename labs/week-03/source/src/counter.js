export function setupCounter(element) {
  let counter = 0
  const setCounter = (count) => {
    counter = count
    element.innerHTML = `Count is ${counter}`
  }
  element.addEventListener('click', () => setCounter(counter + 1))
  setCounter(0)
<<<<<<< HEAD
}
=======
}
>>>>>>> 174a4c6bcbf2a9633a26e8f7919e0d24d57ebe8a
