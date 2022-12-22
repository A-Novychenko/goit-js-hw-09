const form = document.querySelector('.form');

let timerId = null;

form.addEventListener('submit', onFormSubmit);

function onFormSubmit(e) {
  e.preventDefault();

  const {
    elements: { delay: delayInput, step: stepInput, amount: amountInput },
  } = e.currentTarget;

  const delay = Number(delayInput.value);
  const step = Number(stepInput.value);
  const amount = Number(amountInput.value);

  let position = 0;
  let delayCount = delay;

  timerId = setInterval(
    (position, delay) => {
      position += 1;
      delayCount += step;

      createPromise(position, delay)
        .then(({ position, delay }) => {
          console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
        })
        .catch(({ position, delay }) => {
          console.log(`❌ Rejected promise ${position} in ${delay}ms`);
        });
    },
    delayCount,
    position,
    delay
  );

  setTimeout(() => clearInterval(timerId), delay + step * amount);
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;

    (position, delay) => {
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
    };
  });
}

// makePromise
// const makePromise = () => {
//   return new Promise((resolve, reject) => {
//     const passed = Math.random() > 0.5;

//     setTimeout(() => {
//       if (passed) {
//         resolve('✅ Куку это resolve');
//       }

//       reject('❌ все пропало это reject');
//     }, 2000);
//   });
// };

// makePromise()
//   .then(result => console.log(result))
//   .catch(error => console.log(error));
