import React from "react";

const page = ({ params }) => {
  return <div className="text-white">{params.id}</div>;
};

export default page;
