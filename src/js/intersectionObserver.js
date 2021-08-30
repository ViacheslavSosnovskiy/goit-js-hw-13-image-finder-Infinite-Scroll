const callback = entries => {
  entries.forEach(entry => {
    if (entry.intersecting) {
    }
  });
};

const options = {};
const observer = new intersectionObserver(callback, options);

observer.observe(WHAT - TO - OBSERVE);
