/*import privateClient from "../client/private.client";
import publicClient from "../client/public.client";

const mediaEndpoints = {
  list: ({ mediaType, mediaCategory, page }) => `${mediaType}/${mediaCategory}?page=${page}`,
  detail: ({ mediaType, mediaId }) => `${mediaType}/detail/${mediaId}`,
  search: ({ mediaType, query, page }) => `${mediaType}/search?query=${query}&page=${page}`
};

const mediaApi = {
  getList: async ({ mediaType, mediaCategory, page }) => {
    try {
      const response = await publicClient.get(
        mediaEndpoints.list({ mediaType, mediaCategory, page })
      );

      return { response };
    } catch (err) { return { err }; }
  },
  getDetail: async ({ mediaType, mediaId }) => {
    try {
      const response = await privateClient.get(
        mediaEndpoints.detail({ mediaType, mediaId })
      );

      return { response };
    } catch (err) { return { err }; }
  },
  search: async ({ mediaType, query, page }) => {
    try {
      const response = await publicClient.get(
        mediaEndpoints.search({ mediaType, query, page })
      );

      return { response };
    } catch (err) { return { err }; }
  }
};

export default mediaApi;*/
import privateClient from "../client/private.client";
import publicClient from "../client/public.client";

const mediaEndpoints = {
  // Fixed: Remove the query string, let axios handle params
  list: ({ mediaType, mediaCategory }) => `${mediaType}/${mediaCategory}`,
  detail: ({ mediaType, mediaId }) => `${mediaType}/detail/${mediaId}`,
  search: ({ mediaType }) => `${mediaType}/search`
};

const mediaApi = {
  getList: async ({ mediaType, mediaCategory, page = 1 }) => {
    try {
      console.log("Calling:", mediaEndpoints.list({ mediaType, mediaCategory }), "with page:", page);
      
      const response = await publicClient.get(
        mediaEndpoints.list({ mediaType, mediaCategory }),
        {
          params: { page } // Send page as query parameter
        }
      );

      console.log("Media API Response:", response);
      return { response };
    } catch (err) {
      console.error("Media API Error:", err);
      return { err };
    }
  },
  getDetail: async ({ mediaType, mediaId }) => {
    try {
      const response = await privateClient.get(
        mediaEndpoints.detail({ mediaType, mediaId })
      );

      return { response };
    } catch (err) {
      return { err };
    }
  },
  search: async ({ mediaType, query, page = 1 }) => {
    try {
      const response = await publicClient.get(
        mediaEndpoints.search({ mediaType }),
        {
          params: { query, page } // Send as query parameters
        }
      );

      return { response };
    } catch (err) {
      return { err };
    }
  }
};

export default mediaApi;