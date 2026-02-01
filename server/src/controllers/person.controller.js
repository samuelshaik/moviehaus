/*import responseHandler from "../handlers/response.handler.js";
import tmdbApi from "../tmdb/tmdb.api.js";

const personDetail = async (req, res) => {
  try {
    const { personId } = req.params;

    const person = await tmdbApi.personDetail({ personId });

    responseHandler.ok(res, person);
  } catch {
    responseHandler.error(res);
  }
};

const personMedias = async (req, res) => {
  try {
    const { personId } = req.params;

    const medias = await tmdbApi.personMedias({ personId });

    responseHandler.ok(res, medias);
  } catch {
    responseHandler.error(res);
  }
};


export default { personDetail, personMedias };*/
import responseHandler from "../handlers/response.handler.js";
import tmdbApi from "../tmdb/tmdb.api.js";

const personDetail = async (req, res) => {
  try {
    const { personId } = req.params;

    const response = await tmdbApi.personDetail({ personId });

    // ✅ FIX: send only data, not full axios response
    responseHandler.ok(res, response.data);
  } catch (err) {
    console.error("Person detail error:", err.message);
    responseHandler.error(res);
  }
};

const personMedias = async (req, res) => {
  try {
    const { personId } = req.params;

    const response = await tmdbApi.personMedias({ personId });

    // ✅ FIX: send only data
    responseHandler.ok(res, response.data);
  } catch (err) {
    console.error("Person medias error:", err.message);
    responseHandler.error(res);
  }
};

export default { personDetail, personMedias };