if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('service-worker.js')
      .then(() => console.log('Service Worker 登録成功'))
      .catch(err => console.error('Service Worker 登録失敗', err));
  });
}

const display = document.getElementById('display');
let current = '', operator = null, prev = null;

function updateDisplay() {
  display.value = current || '0';
}

function calculate() {
  const a = parseFloat(prev), b = parseFloat(current);
  if (operator === '+') return a + b;
  if (operator === '-') return a - b;
  if (operator === '*') return a * b;
  if (operator === '/') return b === 0 ? 'Error' : a / b;
  return b;
}

document.querySelector('.buttons').addEventListener('click', e => {
  const btn = e.target;
  const action = btn.dataset.action, val = btn.dataset.value;
  if (!action) return;

  if (action === 'digit') {
    if (val === '.' && current.includes('.')) return;
    current += val; updateDisplay();

  } else if (action === 'operator') {
    if (current === '') return;
    if (prev !== null) {
      current = calculate().toString();
      updateDisplay();
    }
    operator = val;
    prev = current;
    current = '';

  } else if (action === 'equals') {
    if (!operator || current === '' || prev === null) return;
    current = calculate().toString();
    updateDisplay();
    operator = null; prev = null;

  } else if (action === 'clear') {
    current = ''; operator = null; prev = null;
    updateDisplay();
  }
});
