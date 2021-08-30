const callback = entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
    }
  });
};

const options = {};
const observer = new intersectionObserver(callback, options);
const sentinel = document.getElementById('sentinel');
observer.observe(sentinel);
