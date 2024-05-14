import React from "react";
import DoctorCard from "./../../components/Doctors/DoctorCard";
import { doctors } from "../../assets/data/doctors";
import Testimonial from "../../components/Testimonial/Testimonial";

const Doctors = () => {
  return (
    <>
      <section className="bg-[#fff9ea]">
        <div className="container text-center">
          <h1 className="heading">Find a Doctor</h1>
          <div className="max-w-[570px] mt-[30px] mx-auto bg-[#0066ff2c] rounded-md flex items-center justify-between">
            <input
              type="search"
              className="py-4 pl-4 pr-2 bg-transparent w-full focus:outline-none cursor-pointer placeholder:text-textColor"
              placeholder="Search Doctor"
            />
            <button className="btn mt-0 rounded-[0px] rounded-r-md">
              Search
            </button>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  lg:grid-cols-3 gap-5 lg:gap-[30px] ">
            {doctors.map((doctor) => (
              <DoctorCard doctor={doctor} key={doctor.id} />
            ))}
          </div>
        </div>
      </section>

      {/* testimonial start */}
      <section>
        <div className="container">
          <div className="lg:w-[470px] mx-auto">
            <h2 className="heading text-center">What our patient says.</h2>
            <p className="text_para text-center">
              World-class care for everyone. Our health system offers unmatched,
              expert health care.
            </p>
          </div>
          {/* testimonial page */}
          <Testimonial />
        </div>
      </section>
      {/* testimonial end */}
    </>
  );
};

export default Doctors;
