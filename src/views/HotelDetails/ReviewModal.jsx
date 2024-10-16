import React, { useState } from "react";
import { addHotelReview } from "../../services/hotelService";
import { showToast } from "../../utils/toast";
import { useHotelContext } from "../../Context/HotelContext";

const ReviewModal = ({ hotelId, onClose }) => {
  const [rating, setRating] = useState(1);
  const [comment, setComment] = useState("");
  const { fetchHotels } = useHotelContext();

  const handleSubmit = async () => {
    const reviewData = {
      hotelId,
      rating,
      comment,
    };

    console.log("Review submitted:", reviewData);
   const response =  await addHotelReview(reviewData);
    if(response.success){
        alert(response.message);
        await fetchHotels()
    }
    else{
        showToast('Error While adding review',"error")
    }
    onClose(); 
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Submit Your Review</h2>
        <label>
          Rating (1 to 5):
          <input
            type="number"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            min="1"
            max="5"
          />
        </label>
        <br />
        <label>
          Comment:
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </label>
        <br />
        <button onClick={handleSubmit}>Submit</button>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default ReviewModal;
