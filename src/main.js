import getRandomCount from './utils/getRandomCount.js';

const MIN = 30;
const MAX = 60;
const FPS = 1000 / 60;
const ORIGIN_TITLE = document.title;

(/* init */() => {

  const rootNode = document.getElementById('root');

  const appNode = document.createElement('div');
  appNode.classList.add('app');

  const outputNode = document.createElement('output');
  outputNode.classList.add('randomCounter');
  outputNode.value = 0;

  const buttonNode = document.createElement('button');
  buttonNode.classList.add('retryButton');
  buttonNode.textContent = '재실행';
  buttonNode.type = 'button;'

  appNode.append(outputNode);
  appNode.append(buttonNode);
  rootNode.append(appNode);

  main();

})();


function setDocumentTitle(targetCount) {
  document.title = `(${targetCount}) ${ORIGIN_TITLE}`;
}


function main() {
  
  const appNode = document.querySelector('.app');
  const counter = appNode.querySelector('.randomCounter');
  const button = appNode.querySelector('.retryButton');

  const TARGET_COUNT = getRandomCount(MIN, MAX);
  
  let count = 0;
  let isComplete = false;

  function render() {
    if (isComplete) counter.style.animationName = 'none';
    counter.value = count;
  }

  function animate() {
    count += 1;
    button.disabled = true;
    isComplete = count >= TARGET_COUNT;

    render();

    if (!isComplete) {
      window.requestAnimationFrame(animate);
    } else {
      button.disabled = false;
    }
  }

  animate();

  setDocumentTitle(TARGET_COUNT);

  button.addEventListener('click', main);

}
