import InfiniteScroll from 'infinite-scroll';

const infScroll = new InfiniteScroll('.container', {
  responseType: 'text',
  path() {
    return '';
  },
});

infScroll.loadNextPage();

infScroll.on('load', (body, path, response) => {
  console.log(path);
});
