const express = require("express");
const router = express.Router();
const Page = require("../models/Page");

// const { uploadProduct } = require("../middleware/multer");

//All
router.get("/", async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  var condition = req.query.id ? { _id: req.query.id } : {};
  const page = await Page.find(condition).sort({ createdAt: -1 });
  if (page) {
    res.json(page);
  } else {
    res.status(500).json({ msg: "Fall to load" });
  }
});

//Create
router.post("/", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  const newPage = new Page({
    props: req.body.props,
  });
  newPage.save((error) => {
    if (error) {
      res.status(500).json({ msg: error });
    } else {
      res.json({
        msg: "Saved!",
        data: newPage,
      });
    }
  });
});

//Single Product
router.get("/:id/view", async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  const page = await Page.findById(req.params.id);
  if (page) {
    res.json(page);
  } else {
    res.status(500).json({ msg: "Page Not found!" });
  }
});

//Delete
router.delete("/:id/delete", async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  await Page.findByIdAndRemove(req.params.id, {}, (error, data) => {
    if (error) return res.json(error);
    res.json(data);
  });
});

//Update
router.put("/:id/update", async (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  await Page.findByIdAndUpdate(
    req.params.id,
    {
      props: req.body.props,
    },
    (error) => {
      if (error) return next(error);
      res.send("Updated!");
    }
  );
});

// //Collection
// router.get("/collection", async (req, res) => {
//   res.header("Access-Control-Allow-Origin", "*");
//   var condition =
//     req.query.minPrice && !req.query.maxPrice
//       ? { price: { $gte: req.query.minPrice } }
//       : !req.query.minPrice && req.query.maxPrice
//       ? { price: { $lte: req.query.maxPrice } }
//       : req.query.minPrice && req.query.maxPrice
//       ? { price: { $gte: req.query.minPrice, $lte: req.query.maxPrice } }
//       : {};
//   const page = parseInt(req.query.page, 10) || 0;
//   const limit = parseInt(req.query.limit, 10) || 10;
//   const product = await Products.find(condition)
//     .populate("subcategory")
//     .populate("brand")
//     .skip((page - 1) * limit)
//     .limit(limit)
//     .sort({ createdAt: -1 });
//   if (product) {
//     res.json(product);
//   } else {
//     res.status(500).json({ msg: "Fail to load product" });
//   }
// });

// //Single Product
// router.get("/:id/product", async (req, res) => {
//   res.header("Access-Control-Allow-Origin", "*");
//   const product = await Products.findById(req.params.id)
//     .populate("subcategory")
//     .populate("brand")
//     .populate("review");
//   if (product) {
//     res.json([product]);
//   } else {
//     res.status(500).json({ msg: "Product Not found!" });
//   }
// });

// router.get("/search/test", async (req, res) => {
//   res.header("Access-Control-Allow-Origin", "*");
//   const product = await Products.find({
//     title: new RegExp(req.query.title, "i"),
//   });
//   if (product) {
//     res.json(product);
//   } else {
//     res.status(500).json({ msg: "Product Not found!" });
//   }
// });

// //Create
// router.post("/", uploadProduct.array("images", 20), (req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*");
//   const reqFiles = [];
//   for (var i = 0; i < req.files.length; i++) {
//     reqFiles.push(
//       "http://localhost:4000/uploads/products/" + req.files[i].filename
//     );
//   }
//   const newProduct = new Products({
//     title: req.body.title,
//     price: req.body.price,
//     discount: req.body.discount,
//     color: req.body.color,
//     size: req.body.size,
//     //      subcategory: req.body.subcategory,
//     brand: req.body.brand,
//     quantity: req.body.quantity,
//     images: reqFiles,
//   });
//   newProduct.save((error) => {
//     if (error) return next(error);
//     res.json({ msg: "Saved" });
//   });
// });

// //Delete
// router.delete("/:id", async (req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*");
//   await Products.findByIdAndRemove(req.params.id, {}, (error, data) => {
//     if (error) return next(error);
//     res.json(data);
//   });
// });

// //Update
// router.put(
//   "/:id",
//   uploadProduct.array("images", 12),
//   async (req, res, next) => {
//     res.header("Access-Control-Allow-Origin", "*");
//     const reqFiles = [];
//     for (var i = 0; i < req.files.length; i++) {
//       reqFiles.push("http://localhost:4000/uploads/" + req.files[i].filename);
//     }
//     await Products.findByIdAndUpdate(
//       req.params.id,
//       {
//         title: req.body.title,
//         price: req.body.price,
//         discount: req.body.discount,
//         color: req.body.color,
//         size: req.body.size,
//         subcategory: req.body.subcategory,
//         brand: req.body.brand,
//         quantity: req.body.quantity,
//         images: reqFiles,
//       },
//       (error) => {
//         if (error) return next(error);
//         res.send("Updated!");
//       }
//     );
//   }
// );

module.exports = router;
