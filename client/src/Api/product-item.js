import fetch from '../Utils/fetch';

const GetList = async (product = 1) => {
  return await fetch('GET', `/product-items/${product}`);
};

const ProductItems = {
  GetList,
};

export default ProductItems;
