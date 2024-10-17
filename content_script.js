let bionicReadingActive = false;
let wordColorsActive = false;

async function applyBionicReading() {
  const { nonBoldOpacity } = await getFromStorage('nonBoldOpacity', 0.7);
  const textNodes = getTextNodesIn(document.body);
  textNodes.forEach((textNode) => boldText(textNode, nonBoldOpacity));
  bionicReadingActive = true;
}

function getFromStorage(key, defaultValue) {
  return new Promise((resolve) => {
    chrome.storage.sync.get(key, (data) => {
      resolve({ [key]: data[key] || defaultValue });
    });
  });
}

function boldText(textNode, nonBoldOpacity) {
  const words = textNode.nodeValue.split(/\s+/);
  const boldedWords = words.map((word) => {
    const halfLength = Math.ceil(word.length / 2);
    const boldPart = word.slice(0, halfLength);
    const regularPart = word.slice(halfLength);
    return `<span class="bionic-bold">${boldPart}</span><span class="bionic-light" style="opacity:${nonBoldOpacity};">${regularPart}</span>`;
  });
  const wrapper = document.createElement('span');
  wrapper.classList.add('bionic-wrapper');
  wrapper.innerHTML = boldedWords.join(' ');
  wrapper._originalTextNode = textNode; // Store the original text node
  textNode.replaceWith(wrapper);
}

function updateNonBoldOpacity(opacity) {
  const nonBoldElements = document.querySelectorAll('.bionic-light');
  nonBoldElements.forEach((element) => {
    element.style.opacity = opacity;
  });
}

function removeBionicReading() {
  const bionicElements = document.querySelectorAll('.bionic-wrapper');
  bionicElements.forEach((element) => {
    if (element._originalTextNode) {
      element.replaceWith(element._originalTextNode);
    } else {
      // Fallback in case the original text node isn't stored
      const textNode = document.createTextNode(element.textContent);
      element.replaceWith(textNode);
    }
  });
  bionicReadingActive = false;
}

function toggleBionicReading() {
  if (bionicReadingActive) {
    removeBionicReading();
  } else {
    applyBionicReading();
  }
}

function getTextNodesIn(node) {
  const walk = document.createTreeWalker(node, NodeFilter.SHOW_TEXT, null, false);
  let textNodes = [];

  while (walk.nextNode()) {
    const textNode = walk.currentNode;

    // Skip nodes that are already processed
    if (
      textNode.parentNode &&
      (textNode.parentNode.classList.contains('bionic-wrapper') ||
        textNode.parentNode.classList.contains('color-wrapper'))
    ) {
      continue;
    }

    if (textNode.textContent.trim() !== '') {
      textNodes.push(textNode);
    }
  }

  return textNodes;
}

// Listen for messages from background.js or popup.js
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log('Received message:', request);
  if (request.action === 'toggleBionicReading') {
    toggleBionicReading();
  } else if (request.action === 'toggleWordColors') {
    toggleWordColors();
  }
});

function toggleWordColors() {
  if (wordColorsActive) {
    removeWordColors();
  } else {
    applyWordColors();
  }
}

function getRandomReadableColor() {
  const hue = Math.floor(Math.random() * 360);
  const saturation = 100; // Full saturation for bright colors
  const lightness = 50;   // 50% lightness for vibrancy
  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}

function colorizeText(textNode) {
  const words = textNode.nodeValue.split(/\s+/);
  const coloredWords = words.map((word) => {
    const color = getRandomReadableColor();
    return `<span class="colored-word" style="color:${color};">${word}</span>`;
  });
  const wrapper = document.createElement('span');
  wrapper.classList.add('color-wrapper');
  wrapper.innerHTML = coloredWords.join(' ');
  wrapper._originalTextNode = textNode;
  textNode.replaceWith(wrapper);
}

function applyWordColors() {
  const textNodes = getTextNodesIn(document.body);
  textNodes.forEach((textNode) => colorizeText(textNode));
  wordColorsActive = true;
}

function removeWordColors() {
  const colorElements = document.querySelectorAll('.color-wrapper');
  colorElements.forEach((element) => {
    if (element._originalTextNode) {
      element.replaceWith(element._originalTextNode);
    } else {
      const textNode = document.createTextNode(element.textContent);
      element.replaceWith(textNode);
    }
  });
  wordColorsActive = false;
}
