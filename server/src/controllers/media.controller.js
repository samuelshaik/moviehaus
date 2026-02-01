
import responseHandler from "../handlers/response.handler.js";
import tmdbApi from "../tmdb/tmdb.api.js";
import userModel from "../models/user.model.js";
import favoriteModel from "../models/favorite.model.js";
import reviewModel from "../models/review.model.js";
import tokenMiddlerware from "../middlewares/token.middleware.js";

const getList = async (req, res) => {
  try {
    const { page } = req.query;
    const { mediaType, mediaCategory } = req.params;

    const response = await tmdbApi.mediaList({ mediaType, mediaCategory, page });

    // Fixed: Changed res.data to response.data
    console.log(response.data);
    return responseHandler.ok(res, response.data); 
  } catch (err) {
    console.log(err);
    responseHandler.error(res);
  }
};

const getGenres = async (req, res) => {
  try {
    const { mediaType } = req.params;

    const response = await tmdbApi.mediaGenres({ mediaType });

    return responseHandler.ok(res, response.data);
  } catch (err) {
    console.log(err);
    responseHandler.error(res);
  }
};

const search = async (req, res) => {
  try {
    const { mediaType } = req.params;
    const { query, page } = req.query;
    
    console.log("Backend search params:", { mediaType, query, page });
    
    const searchParams = {
      query,
      page,
      mediaType: mediaType === "people" ? "person" : mediaType
    };
    
    console.log("TMDB search params:", searchParams);
    
    const response = await tmdbApi.mediaSearch(searchParams);
    
    console.log("TMDB search response:", response.data);

    responseHandler.ok(res, response.data);
  } catch (err) {
    console.log("Search error:", err.message);
    responseHandler.error(res);
  }
};

const getDetail = async (req, res) => {
  try {
    const { mediaType, mediaId } = req.params;
    const params = { mediaType, mediaId };

    // 1️⃣ Get main media info
    const media = (await tmdbApi.mediaDetail(params)).data;

    // 2️⃣ Fetch extra data safely (no crash if one fails)
    const results = await Promise.allSettled([
      tmdbApi.mediaCredits(params),
      tmdbApi.mediaVideos(params),
      tmdbApi.mediaRecommend(params),
      tmdbApi.mediaImages(params)
    ]);

    media.credits =
      results[0].status === "fulfilled" ? results[0].value.data : { cast: [] };

    media.videos =
      results[1].status === "fulfilled" ? results[1].value.data : { results: [] };

    media.recommend =
      results[2].status === "fulfilled" ? results[2].value.data.results : [];

    media.images =
      results[3].status === "fulfilled"
        ? results[3].value.data
        : { backdrops: [], posters: [] };

    // 3️⃣ Favorites check (optional auth)
    const tokenDecoded = tokenMiddlerware.tokenDecode(req);
    if (tokenDecoded) {
      const user = await userModel.findById(tokenDecoded.data);
      if (user) {
        const isFavorite = await favoriteModel.findOne({ user: user.id, mediaId });
        media.isFavorite = !!isFavorite;
      }
    }

    // 4️⃣ Reviews
    media.reviews = await reviewModel
      .find({ mediaId })
      .populate("user")
      .sort("-createdAt");

    return responseHandler.ok(res, media);
  } catch (error) {
    console.error("Error in getDetail:", error.message);
    responseHandler.error(res);
  }
};

export default { getList, getGenres, search, getDetail };