let quote;
let image;
let error;
let twitter;
let switcher;
let refresher;
let isQuote = true;

document.addEventListener('DOMContentLoaded', () => {
  quote = document.getElementById('quote');
  image = document.getElementById('image');
  error = document.getElementById('error');
  twitter = document.getElementById('twitter');
  switcher = document.getElementById('switcher');
  refresher = document.getElementById('refresher');

  quote.style.opacity = '1';
  image.onload = () => image.style.opacity = '1';
}, false);

const setLoading = (loading) => {
  switcher.disabled = loading;
  refresher.disabled = loading;
}

const refresh = () => isQuote ? fetchQuote() : fetchImage();

const fetchQuote = async () => {
  try {
    setLoading(true);
    quote.style.opacity = '0';

    const response = await fetch('https://api.taylor.rest');
    const data = await response.json();

    if (quote.innerHTML === data.quote) return fetchQuote();

    quote.innerHTML = `“${data.quote}”`;
    twitter.href = `https://twitter.com/intent/tweet?text=${data.quote}`;

    setLoading(false);
    quote.style.opacity = '1';
  } catch (error) {
    console.error(error);
    showError();
  }
}

const fetchImage = async () => {
  try {
    setLoading(true);
    image.style.opacity = '0';

    const response = await fetch('https://api.taylor.rest/image');
    const data = await response.json();

    if (image.src === data.url) return fetchImage();

    image.src = data.url;
    twitter.href = `https://twitter.com/intent/tweet?text=${data.url}`;
    setLoading(false);
  } catch (error) {
    console.error(error);
    showError();
  }
}

const showError = () => {
  quote.style.display = 'none';
  image.style.display = 'none';
  error.style.display = 'flex';
}

const switchView = () => {
  quote.style.opacity = '0';
  image.style.opacity = '0';

  switcher.innerHTML = isQuote ? 'To quotes!' : 'To images!'

  setTimeout(() => {
    quote.style.display = isQuote ? 'none' : 'flex';
    image.style.display = isQuote ? 'flex' : 'none';

    isQuote = !isQuote;

    refresh();
  }, 110);
}
