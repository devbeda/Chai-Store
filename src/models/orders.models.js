import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  items: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
        min: 1,
      },
    }
  ],
  time: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    default: "Ordered",
  },
  customer: {
    type: String,
  },
  coupon: {
    type: String,
    required: true
  },
});

orderSchema.statics.generateCoupon = async function () {
    const startOfDay = new Date()
    startOfDay.setHours(0, 0, 0, 0)

    const endOfDay = new Date()
    endOfDay.setHours(23, 59, 59, 999)

    const lastOrder = await this.findOne({
        time: {$gte:startOfDay, $lte:endOfDay}
    })
    .sort({time:-1})
    .exec()

    const lastCoupon = lastOrder ? parseInt(lastOrder.coupon,10):0;
    const newCoupon = (lastCoupon+1).toString().padStart(4,"0")

    return newCoupon;
}

export const Order = mongoose.model("Order", orderSchema);