import React, { useEffect, useState } from "react";
import Badge from "./Badge";
import { Link } from "react-router-dom";

const Task = ({ props, onDelete }) => {
  const [badgecolor, setBadgecolor] = useState();

  useEffect(() => {
    if (props.status === "Pending") {
      setBadgecolor("blue");
    } else if (props.status === "Running") {
      setBadgecolor("yellow");
    } else if (props.status === "Completed") {
      setBadgecolor("green");
    } else if (props.status === "Failed") {
      setBadgecolor("red");
    }
  }, [props.status]);

  const handleDelete = async () => {
    await onDelete(props._id);
  };

  return (
    <div className="rounded-3xl bg-white/10 border border-white/10 backdrop-blur-lg p-6 shadow-xl hover:scale-[1.02] transition duration-300">
      <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 flex-wrap mb-3">
            <h3 className="text-xl font-bold text-white">{props.title}</h3>
            <Badge props={{ color: badgecolor, text: props.status }} />
          </div>

          <p className="text-gray-300 leading-relaxed line-clamp-3">
            {props.description}
          </p>
          {props.dueDate && (
    <p className="text-sm text-indigo-300 mt-3 font-medium">
      Due Date: {new Date(props.dueDate).toLocaleDateString()}
    </p>
  )}
        </div>

        <div className="flex gap-3">
          <Link
            to={`/show-task/${props._id}`}
            className="p-3 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg hover:scale-110 transition duration-300"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8S1 12 1 12Z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
          </Link>

          <button
            onClick={handleDelete}
            className="p-3 rounded-2xl bg-red-500/80 text-white shadow-lg hover:scale-110 transition duration-300"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 7h14M10 11v6M14 11v6M9 4h6l1 3H8l1-3ZM6 7h12v13H6V7Z"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Task;