import React from "react";

const Badge = ({ props }) => {
  const badgeStyles = {
    blue: "bg-blue-500/20 text-blue-300 border border-blue-400/30",
    red: "bg-red-500/20 text-red-300 border border-red-400/30",
    green: "bg-green-500/20 text-green-300 border border-green-400/30",
    yellow: "bg-yellow-500/20 text-yellow-300 border border-yellow-400/30",
  };

  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${badgeStyles[props.color]}`}
    >
      {props.text}
    </span>
  );
};

export default Badge;