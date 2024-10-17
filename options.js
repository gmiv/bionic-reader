const opacitySlider = document.getElementById('opacity-slider');
const opacityValueLabel = document.getElementById('opacity-value');

chrome.storage.sync.get('nonBoldOpacity', (data) => {
  const nonBoldOpacity = data.nonBoldOpacity || 0.7;
  opacitySlider.value = nonBoldOpacity;
  opacityValueLabel.textContent = nonBoldOpacity;
});

opacitySlider.addEventListener('input', (event) => {
  const opacity = event.target.value;
  opacityValueLabel.textContent = opacity;

  chrome.storage.sync.set({ nonBoldOpacity: opacity }, () => {
    console.log('Non-bold opacity saved:', opacity);
  });

  chrome.runtime.sendMessage({ type: 'updateOpacity', opacity: opacity });
});
