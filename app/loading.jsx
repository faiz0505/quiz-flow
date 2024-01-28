import React from "react";
import { Spinner } from "@nextui-org/spinner";
const loading = () => {
  return (
    <div className="h-[80vh] w-full bg-transparent grid place-items-center z-50">
      <div>
        <Spinner size="lg" color="success" />
      </div>
    </div>
  );
};

export default loading;
