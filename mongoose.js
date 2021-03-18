const review = new Schema({
  productId: Number,
  firstName: String,
  lastName: String,
  email: String,
  summary: String,
  body: String,
  rating: Number,
  reported: {type: Boolean, default: false},
  recommended: Boolean,
  photos: Array,
  characteristics: {
    quality: Number,
    fit: Number,
    width: Number,
    size: Number,
    length: Number,
    comfort: Number,
    },
  date: String,
})

const reviewResponses = new Schema({
  reviewId: Number,
  response: [{
    body: String,
    email: String,
  }],
})

const productMeta = new Schema({
  productId: Number,
  oneStar: {type: Number, default: 0},
  twoStar: {type: Number, default: 0},
  threeStar: {type: Number, default: 0},
  fourStar: {type: Number, default: 0},
  fiveStar: {type: Number, default: 0}
  helpful: {type: Number, default: 0},
  recommended: {type: Number, default: 0},
  notRecommended: {type: Number, default: 0},
  reported: {type: Boolean, default: false}
})