const mongoose = require("mongoose");

//Scheme
const Schema = mongoose.Schema;
const PageSchema = new Schema(
  {
    props: {
      type: Object,
    },

    createBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },

    createdAt: {
      type: Date,
      default: Date.now,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
//Model
const Page = mongoose.model("Page", PageSchema);
module.exports = Page;
