const returnExactQuery = (search, qParam) =>
  search
    ?.slice(1)
    ?.split('&')
    ?.find((el) => el.split('=')[0] === qParam)
    ?.split('=');

export default returnExactQuery;