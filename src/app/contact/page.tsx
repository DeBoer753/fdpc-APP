'use client'

import { useState } from "react";
import { FaMapMarkerAlt, FaPhoneAlt, FaClock } from "react-icons/fa";

export default function Contact() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission behavior
    setIsSubmitted(true);
  };

  return (
    <div className="bg-stone-300 text-white min-h-screen py-16 px-6 md:px-16">
      
      {/* Info Section (Location, Phone, Hours) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
        {/* Location */}
        <div>
          <FaMapMarkerAlt className="text-3xl mx-auto mb-2" />
          <h2 className="text-lg font-semibold">Location</h2>
          <p className="text-stone-500">447 Miller Ave</p>
          <p className="text-stone-500">Mill Valley, CA 94941</p>
          <p className="text-stone-500">Framing Dragon</p>
        </div>

        {/* Phone */}
        <div>
          <FaPhoneAlt className="text-3xl mx-auto mb-2" />
          <h2 className="text-lg font-semibold">Phone</h2>
          <p className="text-stone-500">(402) 391-4628</p>
        </div>

        {/* Hours */}
        <div>
          <FaClock className="text-3xl mx-auto mb-2" />
          <h2 className="text-lg font-semibold">Hours</h2>
          <p className="text-stone-500">Tuesday – Friday: 10am – 5pm</p>
          <p className="text-stone-500">Saturday: 10am – 4pm</p>
          <p className="text-stone-500">Sunday & Monday: CLOSED</p>
        </div>
      </div>

      {/* Google Map & Contact Form */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-12">
        {/* Google Map */}
        <div className="mt-5">
          <iframe
            className="w-full h-110 border-4 border-stone-400"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.443022276179!2d-122.5435429!3d37.8993661!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085938f4968c8b7%3A0x9e2a2b8b7e2a3f37!2s447%20Miller%20Ave%2C%20Mill%20Valley%2C%20CA%2094941!5e0!3m2!1sen!2sus!4v1711742189671!5m2!1sen!2sus"
            allowFullScreen
            loading="lazy"
          ></iframe>
        </div>

        {/* Contact Form */}
        <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
          <label className="flex flex-col text-stone-500">
            Name: *
            <input type="text" className="bg-stone-400 text-white p-2 mt-1 rounded" required />
          </label>

          <label className="flex flex-col text-stone-500">
            Email: *
            <input type="email" className="bg-stone-400 text-white p-2 mt-1 rounded" required />
          </label>

          <label className="flex flex-col text-stone-500">
            Message: *
            <textarea className="bg-stone-400 text-white p-2 mt-1 rounded h-32" required />
          </label>

          <label className="flex flex-col text-stone-500">
            Answer A Question To Prevent Spam: 1+1=? *
            <input type="text" className="bg-stone-400 text-white p-2 mt-1 rounded" required />
          </label>

          {/* Submit Button with Transition Effect */}
          <button
            type="submit"
            className={`py-2 px-6 rounded font-bold transition-all ${
              isSubmitted
                ? "bg-blue-500 text-white"
                : "bg-white text-stone-400 hover:bg-blue-100 "
            }`}
            disabled={isSubmitted}
          >
            {isSubmitted ? "Message Sent!" : "Send Message"}
          </button>
        </form>
      </div>

      {/* Location List */}
      <div className="text-center text-stone-500 mt-10 text-sm">
        text of type of service – text of type of service – text of type of service
      </div>
    </div>
  );
}
