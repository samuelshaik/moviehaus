
/*import axiosClient from "../axios/axios.client.js";

const tmdbApi = {
  mediaList: ({ mediaType, mediaCategory, page = 1 }) =>
    axiosClient.get(`/${mediaType}/${mediaCategory}`, { params: { page } }),

  mediaGenres: ({ mediaType }) =>
    axiosClient.get(`/genre/${mediaType}/list`),

  mediaDetail: ({ mediaType, mediaId }) =>
    axiosClient.get(`/${mediaType}/${mediaId}`),

  mediaCredits: ({ mediaType, mediaId }) =>
    axiosClient.get(`/${mediaType}/${mediaId}/credits`),

  mediaVideos: ({ mediaType, mediaId }) =>
    axiosClient.get(`/${mediaType}/${mediaId}/videos`),

  mediaImages: ({ mediaType, mediaId }) =>
    axiosClient.get(`/${mediaType}/${mediaId}/images`),

  mediaRecommend: ({ mediaType, mediaId }) =>
    axiosClient.get(`/${mediaType}/${mediaId}/recommendations`),

  mediaSearch: ({ mediaType, query, page = 1 }) =>
    axiosClient.get(`/search/${mediaType}`, { params: { query, page } })
};

export default tmdbApi;
*/import axiosClient from "../axios/axios.client.js";

const tmdbApi = {
  mediaList: ({ mediaType, mediaCategory, page = 1 }) =>
    axiosClient.get(`/${mediaType}/${mediaCategory}`, { params: { page } }),

  mediaGenres: ({ mediaType }) =>
    axiosClient.get(`/genre/${mediaType}/list`),

  mediaDetail: ({ mediaType, mediaId }) =>
    axiosClient.get(`/${mediaType}/${mediaId}`),

  mediaCredits: ({ mediaType, mediaId }) =>
    axiosClient.get(`/${mediaType}/${mediaId}/credits`),

  mediaVideos: ({ mediaType, mediaId }) =>
    axiosClient.get(`/${mediaType}/${mediaId}/videos`),

  mediaImages: ({ mediaType, mediaId }) =>
    axiosClient.get(`/${mediaType}/${mediaId}/images`),

  mediaRecommend: ({ mediaType, mediaId }) =>
    axiosClient.get(`/${mediaType}/${mediaId}/recommendations`),

  mediaSearch: ({ mediaType, query, page = 1 }) =>
    axiosClient.get(`/search/${mediaType}`, { params: { query, page } }),

  
  personDetail: ({ personId }) =>
    axiosClient.get(`/person/${personId}`),

  personMedias: ({ personId }) =>
    axiosClient.get(`/person/${personId}/combined_credits`)
};

export default tmdbApi;