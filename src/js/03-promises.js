const form = document.querySelector('.form');

let position = 0;

form.addEventListener('submit', onFormSubmit);

function onFormSubmit(e) {
  e.preventDefault();

  const {
    elements: { delay: delayInput, step: stepInput, amount: amountInput },
  } = e.currentTarget;

  let delay = Number(delayInput.value);
  const step = Number(stepInput.value);
  const amount = Number(amountInput.value);
  // const startDelay = Math.abs(delay - step);

  ///////

  setTimeout(() => {
    const timerID = setInterval(() => {
      position += 1;

      createPromise(position, delay)
        .then(({ position, delay }) => {
          console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
        })
        .catch(({ position, delay }) => {
          console.log(`❌ Rejected promise ${position} in ${delay}ms`);
        });

      delay += step;

      if (amount === position) {
        clearInterval(timerID);
      }
    }, step);
  }, delay);

  // createPromise(position, delay)
  //   .then(({ position, delay }) => {
  //     console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
  //   })
  //   .catch(({ position, delay }) => {
  //     console.log(`❌ Rejected promise ${position} in ${delay}ms`);
  //   });
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;

    if (shouldResolve) {
      resolve({
        position,
        delay,
      });
    } else {
      reject({
        position,
        delay,
      });
    }
  });
}
