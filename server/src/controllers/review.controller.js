import responseHandler from "../handlers/response.handler.js";
import reviewModel from "../models/review.model.js";

const create = async (req, res) => {
  try {
    // Fix: Get mediaId from body, not params
    const { mediaId } = req.body;

    const review = new reviewModel({
      user: req.user.id,
      mediaId, // Use mediaId from body
      ...req.body
    });

    await review.save();

    responseHandler.created(res, {
      ...review._doc,
      id: review.id,
      user: req.user
    });
  } catch (error) {
    console.error("Error creating review:", error);
    responseHandler.error(res);
  }
};

const remove = async (req, res) => {
  try {
    const { reviewId } = req.params;

    const review = await reviewModel.findOne({
      _id: reviewId,
      user: req.user.id
    });

    if (!review) return responseHandler.notfound(res);

    // Use deleteOne instead of deprecated remove()
    await reviewModel.deleteOne({ _id: reviewId });

    responseHandler.ok(res);
  } catch (error) {
    console.error("Error removing review:", error);
    responseHandler.error(res);
  }
};

const getReviewsOfUser = async (req, res) => {
  try {
    const reviews = await reviewModel.find({
      user: req.user.id
    }).sort("-createdAt");

    responseHandler.ok(res, reviews);
  } catch (error) {
    console.error("Error getting reviews:", error);
    responseHandler.error(res);
  }
};

export default { create, remove, getReviewsOfUser };