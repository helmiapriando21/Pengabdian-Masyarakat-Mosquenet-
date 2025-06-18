"use client"

import { useEffect } from "react";
import FeedbacksItems from "./items";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchFeedback } from "@/action/feedbackAction";

export default function ListFeedbacks() {
  const dispatch = useAppDispatch();
  const {feedbacks, loading} = useAppSelector((state) => state.feedback);

  useEffect(() => {
    if(!loading && !feedbacks) {
      dispatch(fetchFeedback());
    }
  }, [dispatch, feedbacks]);

  if(!loading && feedbacks && feedbacks.length !== 0)
    return (
      <div className="flex flex-col w-full h-full">
        {
          feedbacks.map((value: { message: string }, index: number) => (
            <FeedbacksItems key={index} data={value} />
          ))
        }
      </div>
    );
}