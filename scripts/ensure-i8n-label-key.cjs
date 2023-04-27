const enUS = require('../lang/en-us.json');
const zhCN = require('../lang/zh-cn.json');

const flattenJSON = (obj = {}, res = {}, extraKey = '') => {
  for(const key in obj) {
     if(typeof obj[key] !== 'object'){
        res[extraKey + key] = obj[key];
     } else {
        flattenJSON(obj[key], res, `${extraKey}${key}.`);
     }
  }
  return res;
};

const differenceWith = (arr1 = [], arr2 = []) => {
  return arr1.concat(arr2).filter((v, i, arr) => {
      return arr.indexOf(v) === arr.lastIndexOf(v);
  });
}

const enUSKeys = Object.keys(flattenJSON(enUS)).sort();
const zhCNKeys = Object.keys(flattenJSON(zhCN)).sort();

const difference = differenceWith(enUSKeys,zhCNKeys);

// 国际化文案的key不一致，即认为不合法，请检查json文件
if (difference.length > 0) {
  throw new Error(`国际化文案校验不通过: ${difference}`);
}
