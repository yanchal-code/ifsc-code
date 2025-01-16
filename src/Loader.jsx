import React from "react";
import { Oval } from "react-loader-spinner";

const Loader = () => {
  return (
    <>
      <div className="loader-container">
        <Oval
          visible={true}
          height={150}
          width={150}
          color="orange"
          ariaLabel="oval-loading"
          secondaryColor="orange" /* Match secondaryColor */
          wrapperStyle={{}}
          wrapperClass=""
        />
      </div>
    </>
  );
};

export default Loader;
