/*import { useEffect, useState } from "react";
import { SwiperSlide } from "swiper/react";
import mediaApi from "../../api/modules/media.api";
import AutoSwiper from "./AutoSwiper";
import { toast } from "react-toastify";
import MediaItem from "./MediaItem";

const MediaSlide = ({ mediaType, mediaCategory }) => {
  const [medias, setMedias] = useState([]);

  useEffect(() => {
    const getMedias = async () => {
      const { response, err } = await mediaApi.getList({
        mediaType,
        mediaCategory,
        page: 1
      });

      if (response) setMedias(response.results);
      if (err) toast.error(err.message);
    };

    getMedias();
  }, [mediaType, mediaCategory]);

  return (
    <AutoSwiper>
      {medias.map((media, index) => (
        <SwiperSlide key={index}>
          <MediaItem media={media} mediaType={mediaType} />
        </SwiperSlide>
      ))}
    </AutoSwiper>
  );
};

export default MediaSlide;*/
import { useEffect, useState } from "react";
import { SwiperSlide } from "swiper/react";
import mediaApi from "../../api/modules/media.api";
import AutoSwiper from "./AutoSwiper";
import { toast } from "react-toastify";
import MediaItem from "./MediaItem";

const MediaSlide = ({ mediaType, mediaCategory }) => {
  const [medias, setMedias] = useState([]);

  useEffect(() => {
    const getMedias = async () => {
      console.log("Fetching medias:", { mediaType, mediaCategory });
      
      const { response, err } = await mediaApi.getList({
        mediaType,
        mediaCategory,
        page: 1
      });

      console.log("MediaSlide - API Response:", response);
      console.log("MediaSlide - API Error:", err);

      if (response) {
        // Handle the response data structure
        const results = response.results || response;
        console.log("Results:", results);
        setMedias(Array.isArray(results) ? results : []);
      } else {
        setMedias([]);
      }
      
      if (err) {
        console.error("Media fetch error:", err);
        toast.error(err.message || "Failed to fetch media");
      }
    };

    getMedias();
  }, [mediaType, mediaCategory]);

  return (
    <AutoSwiper>
      {medias.map((media, index) => (
        <SwiperSlide key={index}>
          <MediaItem media={media} mediaType={mediaType} />
        </SwiperSlide>
      ))}
    </AutoSwiper>
  );
};

export default MediaSlide;