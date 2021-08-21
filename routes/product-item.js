const express = require('express');
const router = express.Router();
const ValidateUser = require('../utils/validateUser');
const ProductItem = require('../model/product-item');

// Get Product Items
router.get('/', async (req, res) => {
  const validation = ValidateUser(req, res);
  if (validation === true) {
    const productItems = await ProductItem.find();
    return res.status(200).send({ success: true, data: productItems });
  } else {
    return validation;
  }
});

router.post('/create', async (req, res) => {
  const validation = ValidateUser(req, res);

  if (validation === true) {
    const body = req.body;
    const { product, name, price } = body;

    if (!(product && name && price)) {
      return res.status(400).send({ success: false, error: { code: 400, message: 'Missing product / name / price' } });
    }

    const productItem = new ProductItem(body);
    productItem
      .save()
      .then((doc) => {
        return res.status(201).send({
          success: true,
          data: doc,
        });
      })
      .catch((error) => {
        console.log(error);
        return res
          .status(400)
          .send({ success: false, error: { code: 400, message: `Something went wrong, ${error.message}` } });
      });
  } else {
    return validation;
  }
});

module.exports = router;
