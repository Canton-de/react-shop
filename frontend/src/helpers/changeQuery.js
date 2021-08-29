/* eslint-disable no-param-reassign */
const changeQuery = (q,changeQ,fQuery) => {
    if (!changeQ) {
      fQuery = fQuery.map((el) => {
        const splitEl = el.split('=')[0];
        if (splitEl === q) return '';
        return el;
      });
    } else {
      let hasQ = false;
      fQuery = fQuery.map((el) => {
        const splitEl = el.split('=')[0];
        if (splitEl === q) {
          hasQ = true;
          return `${splitEl}=${changeQ}`;
        }
        return el;
      });
      if (!hasQ) return `?${q}=${changeQ}&${fQuery.filter((el) => el).join('&')}`;
    }

    return `?${fQuery.filter((el) => el).join('&')}`;
}

export default changeQuery