import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../../../../../UserContext/UserContext";
import Review from "./Review";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import "./styles.css";

// import required modules
import { Pagination,Navigation } from "swiper";
import Loading from "../../../../Loading/Loading";

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [ratings, setRatings] = useState("");
  const { user, loading } = useContext(AuthContext);

  const rating = (e) => {
    const ratingData = e.target.value;
    setRatings(ratingData);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const message = form.review.value;
    const reviewName = user?.displayName;
    const reviewerImg = user?.photoURL;

    const review = {
      message,
      reviewName,
      reviewerImg,
      ratings,
    };
    fetch(`https://second-sell.vercel.app/review`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(review),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.acknowledged) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Your Review has been Successfully Saved, Thank You",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
    form.reset();
  };
  useEffect(() => {
    axios
      .get(`https://second-sell.vercel.app/review`)
      .then((res) => setReviews(res.data));
  }, [reviews]);

  if (loading) {
    return <Loading />;
  }
  return (
    <div className=" py-5 my-14 rounded ">
      <h3 className="text-3xl font-semibold text-center my-8">
        What's Our Client Saying
      </h3>
      <div className="overflow-y-hidden">
        {reviews.length && (
          <>
            <Swiper
              slidesPerView={1}
              spaceBetween={10}
              loop={true}
              pagination={{
                clickable: true,
              }}
              navigation={true}
              modules={[Pagination,Navigation]}
              className="mySwiper"
            >
              <div>
                {reviews.map((review) => (
                  <SwiperSlide>
                    <Review key={review._id} review={review} />
                  </SwiperSlide>
                ))}
              </div>
            </Swiper>
          </>
        )}
        {reviews.length === 0 && (
          <p className="text-center"> No Review Available Please Add One</p>
        )}
      </div>

      <div className="flex flex-col justify-center items-center">
        <p className="text-2xl font-bold my-5 p-5">Add Your Review</p>
        {user?.uid ? (
          <form className="form-control" onSubmit={handleFormSubmit}>
            <label className="label">
              <div className="rating ">
                <input
                  type="radio"
                  name="rating-2"
                  value={"one"}
                  className="mask mask-star-2 bg-orange-400"
                  onChange={rating}
                />
                <input
                  type="radio"
                  name="rating-2"
                  className="mask mask-star-2 bg-orange-400"
                  onChange={rating}
                  value={"two"}
                  // checked = {setRatings()}
                />
                <input
                  type="radio"
                  name="rating-2"
                  className="mask mask-star-2 bg-orange-400"
                  onChange={rating}
                  value={"three"}
                />
                <input
                  type="radio"
                  name="rating-2"
                  className="mask mask-star-2 bg-orange-400"
                  value={"four"}
                  onChange={rating}
                />
                <input
                  type="radio"
                  name="rating-2"
                  className="mask mask-star-2 bg-orange-400"
                  value={"five"}
                  onChange={rating}
                />
              </div>
            </label>
            <label className="input-group max-w-md w-full ">
              {/* <span>{user?.email}</span> */}
              <input
                type="text"
                name="review"
                required
                placeholder="Awesome"
                className="input input-bordered"
              />
              <input type="submit" className="btn btn-primary" />
            </label>
          </form>
        ) : (
          <div className="font-bold  ">
            Please{" "}
            <Link to="/login" className="underline text-blue-600">
              Log In
            </Link>{" "}
            To Give A Review{" "}
          </div>
        )}
      </div>
    </div>
  );
};

export default Reviews;
