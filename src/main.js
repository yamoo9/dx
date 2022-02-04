import getRandomCount from './utils/getRandomCount.js';

const MIN = 30;
const MAX = 60;
const FPS = 1000 / 60;
const ORIGIN_TITLE = document.title;


window.jQuery(document).ready(($) => {

  const $root = $('#root');
  const $app = $('<div class="app" />');
  const $counter = $('<output class="randomCounter">0</output>');
  const $button = $('<button type="button" class="retryButton">재실행</button>');

  $root.append($app.append($counter, $button));

  main({ $app, $counter, $button });
});

function setDocumentTitle(targetCount) {
  document.title = `(${targetCount}) ${ORIGIN_TITLE}`;
}

function main({ $app, $counter, $button }) {
  console.log('call main')

  const TARGET_COUNT = getRandomCount(MIN, MAX);

  let count = 0;
  let isComplete = false;

  function render() {
    if (isComplete) $counter.css('animation-name', 'none');
    $counter.val(count);
  }

  function animate() {
    count += 1;
    $button.attr('disabled', true);
    isComplete = count === TARGET_COUNT;

    render();

    if (!isComplete) {
      window.requestAnimationFrame(animate);
    } else {
      $button.attr('disabled', false);
    }
  }

  setDocumentTitle(TARGET_COUNT);
  animate();

  $button.on('click', function once() {
    main({ $app, $counter, $button });
    $button.off('click', once);
  });

}
