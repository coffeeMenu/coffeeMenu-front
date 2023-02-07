import { errorHandler } from './errorHandler';
import { pb } from './pocketbase';

export const getCategories = async () => {
  return pb
    .collection('products_category')
    .getFullList(200 /* batch size */, {
      sort: 'nice',
    })
    .then((res: any) => {
      const options = res.map((item: any) => {
        return {
          label: item.name,
          nice: item.nice,
          id: item.id,
        };
      });

      return options;
    })
    .catch((err: any) => {
      errorHandler(err, '[username] - getCategories');
    });
};

let categories: any;
(async () => {
  categories = await getCategories();
})();

export const translateCategoryId = (categoryId: string) => {
  for (let c of categories) {
    if (c.id === categoryId) return c.label;
  }
};

const getCategoryNice = (categoryLabel: string) => {
  for (let c of categories) {
    if (c.label === categoryLabel) return parseInt(c.nice);
  }
  return 0;
};

export const groupByCategory = async (products: any) => {
  let obj: any = {};
  for (let p of products) {
    const group = translateCategoryId(p.category);
    if (obj[group] === undefined) {
      obj[group] = [p];
    } else {
      obj[group].push(p);
    }
  }

  // sorting groups by category nice(like linux nice)
  const keys = Object.keys(obj);
  keys.sort((a, b) => {
    return getCategoryNice(a) > getCategoryNice(b) ? 1 : -1;
  });

  let sortedObj: any = {};
  for (let i in keys) {
    const key = keys[i];
    sortedObj[key] = obj[key];
  }

  return sortedObj;
};
