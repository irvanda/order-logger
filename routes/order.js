const express = require('express');
const router = express.Router();
const ValidateUser = require('../utils/validateUser');
const ProductItem = require('../model/product-item');
const Order = require('../model/order');
const GetUser = require('../utils/getUser');

router.post('/', async (req, res) => {
  const validation = ValidateUser(req, res);

  if (validation === true) {
    const list = req.body;

    if (!list) {
      return res.status(400).send({ success: false, error: { code: 400, message: 'Missing item list' } });
    }

    let total = 0;
    const productItems = [];
    for (const item of list) {
      const productItem = await ProductItem.findById(item.id);
      productItem._doc.quantity = item.quantity;
      productItems.push(productItem);
      total = total + productItem._doc.price * item.quantity;
    }

    const order = new Order({
      productItems,
      total,
      createdBy: await GetUser(req),
    });
    order
      .save()
      .then((doc) => {
        return res.status(201).send({
          success: true,
          data: doc,
        });
      })
      .catch((error) => {
        return res.status(400).send({
          success: false,
          error: {
            code: (error && error.code) || 400,
            message: `Something went wrong, ${error.message}`,
          },
        });
      });
  }

  return validation;
});

router.get('/list', async (req, res) => {
  const validation = ValidateUser(req, res);

  if (validation === true) {
    const orders = await Order.find();
    return res.status(200).send({ success: true, data: orders });
  }

  return validation;
});

module.exports = router;
