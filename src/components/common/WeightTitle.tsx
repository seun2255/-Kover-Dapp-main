import React from "react";
interface WeightTitleProps {
  title: string;
}

function WeightTitle({ title }: WeightTitleProps) {
  return (
    <div className="flex items-center justify-between mb-6">
      <b className="summary-text">{title}</b>
      <img src="/images/Frame 2937.svg" alt="" />
    </div>
  );
}

export default WeightTitle;