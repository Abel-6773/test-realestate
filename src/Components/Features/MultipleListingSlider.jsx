import { db } from "../../firebase.config";
import { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { Swiper, SwiperSlide } from "swiper/react";
import { v4 as uuid } from "uuid";
import {
  Autoplay,
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
} from "swiper/modules";
import Loading from "../UI/Loading";
import { useNavigate } from "react-router-dom";
export default function MultipleListingSlider() {
  // const q = query(collection(db, "listings"), where("type", "===", "rent"));
  const [loading, setLoading] = useState(true);
  const [houseListing, setHouseListing] = useState(null);
  let navigate = useNavigate();
  let listings = [];
  useEffect(() => {
    const getListings = async () => {
      const querySnapshot = await getDocs(query(collection(db, "listings")));
      querySnapshot.forEach((doc) => {
        listings.push({ data: doc.data(), id: doc.id });
      });
      setHouseListing(listings);
      setLoading(false);
    };

    getListings();
  }, []);
  if (loading) {
    return <Loading />;
  }
  return (
    <div>
      <p className="exploreHeading">Recommended</p>
      <Swiper
        // style={{ height: "500px" }}
        modules={[Autoplay, Navigation, Pagination, Scrollbar, A11y]}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        className="mySwuiper"
      >
        {houseListing.map((listing, idx) => {
          return (
            <SwiperSlide
              key={uuid()}
              style={{ height: "450px" }}
              onClick={() =>
                navigate(`/category/${listing.data.type}/${listing.id}`)
              }
            >
              <div
                className="swiperSlideDiv"
                style={{
                  background: `url(${listing.data.imgUrls[0]}) center no-repeat`,
                  backgroundSize: "cover",
                }}
              >
                <p className="swiperSlideText">{listing.data.name}</p>
                <p className="swiperSlidePrice">
                  ${listing.data.discountedPrice ?? listing.data.regularPrice}{" "}
                  {listing.data.type === "rent" && "/ month"}
                </p>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}
