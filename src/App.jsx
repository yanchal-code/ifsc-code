import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import "./App.css";
import Loader from "./Loader";
// Validation schema
const schema = yup.object().shape({
  search: yup.string().required("IFSC code is required"),
});

function App() {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [loader,setLoader]=useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  // Function to fetch data
  const fetchData = async (formData) => {
    setLoader(true) 
    const delay = ( ) => new Promise((resolve) => setTimeout(resolve, 5000));
 
 
  await delay( );
    const ifscCode = formData.search;
    const url = `https://ifsc.razorpay.com/${ifscCode}`;
    
    const response = await fetch(url);
    if (response.ok) {
      const result = await response.json();
      setData(result);
      setError(""); // Clear error if successful
    } else {
      setError("Invalid IFSC code or not found.");
      setData(null); // Clear previous data
    }
    setLoader(false)
  };

  return (
    <>
    {loader &&  <Loader/>}
 
      <h1 className="text-dark text-center mt-4 mb-3">IFSC <span className="text-primary">Code </span>Finder</h1>
      <div className="container">
        <div className="row">
          <div className="col-sm-4"></div>
          <div className="col-sm-4 shadow height">
            <form onSubmit={handleSubmit(fetchData)}>
              <input
                {...register("search")}
                className="form-control mt-4 mb-3"
                placeholder="Enter your IFSC code"
              />
              {errors.search?.message && (
                <p className="text-danger">{errors.search?.message}</p>
              )}
              <input
                type="submit"
                value="Search"
                className="form-control btn btn-info"
              />
            </form>
          </div>
          <div className="col-sm-4"></div>
        </div>
      </div>

      {/* Table for displaying results */}
      <div className="table-responsive mb-4 container mx-auto mt-5">
        {error && <p className="text-danger text-center">{error}</p>}
        {data && (
          <div className="row">
            <div className="col-sm-6 mx-auto ">
              <table className="table table-dark">
                <thead>
                  <tr>
                    <th>Fields</th>
                    <th>Details</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Bank Name</td>
                    <td>{data.BANK || "N/A"}</td>
                  </tr>
                  <tr>
                    <td>Branch</td>
                    <td>{data.BRANCH || "N/A"}</td>
                  </tr>
                  <tr>
                    <td>City</td>
                    <td>{data.CITY || "N/A"}</td>
                  </tr>
                  <tr>
                    <td>State</td>
                    <td>{data.STATE || "N/A"}</td>
                  </tr>
                  <tr>
                    <td>District</td>
                    <td>{data.DISTRICT || "N/A"}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
