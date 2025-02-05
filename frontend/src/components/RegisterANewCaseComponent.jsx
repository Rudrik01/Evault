import React, {useState} from "react";


import {ToastContainer, toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Define the initial state
const initialState = {
  UIDOfParty1: "",
  UIDOfParty2: "",
  caseSubject: "",
  associatedLawyers: [],
};

const RegisterANewCaseComponent = () => {
  const [formData, setFormData] = useState({...initialState});

  
  return (
    <div className="flex items-center justify-center md:min-h-screen min-h-[87vh] md:p-5">
      <div className="bg-white md:p-8 font-montserrat md:w-[50%] w-full">
        <p className="md:text-2xl text-xl font-montserrat pb-5 text-center">
          Register A New Legal Case
        </p>

        <form onSubmit={handleSubmit} className="md:text-base text-sm">
          <div className="md:pb-5 pb-3 flex">
            <input
              type="text"
              className="border rounded-sm py-2 px-4 w-full"
              placeholder="Enter UID for Party 1 ?"
              name="UIDOfParty1"
              value={formData.UIDOfParty1}
              onChange={handleChange}
            />
          </div>
          <div className="md:pb-5 pb-3 flex">
            <input
              type="text"
              className="border rounded-sm py-2 px-4 w-full"
              placeholder="Enter UID for Party 2 ?"
              name="UIDOfParty2"
              value={formData.UIDOfParty2}
              onChange={handleChange}
            />
          </div>
          <div className="md:pb-5 pb-3 flex">
            <input
              type="text"
              className="border rounded-sm py-2 px-4 w-full"
              placeholder="Case Subject ?"
              name="caseSubject"
              value={formData.caseSubject}
              onChange={handleChange}
            />
          </div>
          <div className="flex">
            <input
              type="text"
              className="border rounded-sm py-2 px-4 w-full"
              placeholder="Associated Lawyers (comma-separated) ?"
              name="associatedLawyers"
              value={formData.associatedLawyers.join(", ")}
              onChange={(e) =>
                setFormData((prevData) => ({
                  ...prevData,
                  associatedLawyers: e.target.value
                    .split(",")
                    .map((lawyer) => lawyer.trim()),
                }))
              }
            />
          </div>
          <div className="text-center w-full pt-5">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-300 text-white py-2 px-4 rounded-sm w-3/5 md:text-base text-sm"
            >
              Register Case
            </button>
          </div>
        </form>
      </div>

      <ToastContainer
        toastClassName={"font-montserrat bg-blue-500 text-white text-center"}
        bodyClassName={"text-base p-3 rounded-sm"}
      />
    </div>
  );
};

export default RegisterANewCaseComponent;
