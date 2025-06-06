"use client";

// PLUGINS & OTHERR
import { useState } from "react";
import { FaMapMarkerAlt, FaPhoneAlt, FaClock } from "react-icons/fa";
import { motion } from "framer-motion";

// location, phone, hours info being mapped
const infoSections = [
  {
    icon: <FaMapMarkerAlt className="text-3xl mx-auto mb-2" />,
    title: "Location",
    lines: ["447 Miller Ave", "Mill Valley, CA 94941", "Framing Dragon"]
  },
  {
    icon: <FaPhoneAlt className="text-3xl mx-auto mb-2" />,
    title: "Phone",
    lines: ["(415) 388-1497"]
  },
  {
    icon: <FaClock className="text-3xl mx-auto mb-2" />,
    title: "Hours",
    lines: [
      "Tuesday – Friday: 10am – 5pm",
      "Saturday: 10am – 4pm",
      "Sunday & Monday: CLOSED"
    ]
  }
];

// CONTACT
export default function Contact() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    const name = formData.get("name");
    const email = formData.get("email");
    const message = formData.get("message");

    const res = await fetch("/api/send-email", {
      method: "POST",
      body: JSON.stringify({ name, email, message }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.ok) {
      setIsSubmitted(true);
      form.reset();
    }
  };

  return (
    <main
      role="main"
      className="bg-stone-300 text-white min-h-screen py-16 px-6 md:px-16 max-w-[1200px] mx-auto"
    >
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1, transition: { duration: 1.1 } }}
        viewport={{ once: true }}
      >
        {/* Info Section (Location, Phone, Hours) */}
        <section
          aria-label="Business Contact Information"
          className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center"
        >
          {infoSections.map((section, index) => (
            <div key={index}>
              {section.icon}
              <h2 className="text-lg font-semibold">{section.title}</h2>
              {section.lines.map((line, idx) => (
                <p key={idx} className="text-stone-500">{line}</p>
              ))}
            </div>
          ))}
        </section>

        {/* Google Map & Contact Form */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-12">
          {/* Google Map */}
          <div className="mt-5">
            <iframe
              className="w-full h-110 border-4 border-stone-400"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.443022276179!2d-122.5435429!3d37.8993661!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085938f4968c8b7%3A0x9e2a2b8b7e2a3f37!2s447%20Miller%20Ave%2C%20Mill%20Valley%2C%20CA%2094941!5e0!3m2!1sen!2sus!4v1711742189671!5m2!1sen!2sus"
              allowFullScreen
              loading="lazy"
              aria-label="Google map showing 447 Miller Ave, Mill Valley CA"
            ></iframe>
          </div>

          {/* Contact Form */}
          <form
            className="flex flex-col space-y-4"
            onSubmit={handleSubmit}
            aria-label="Contact Form"
          >
            <label htmlFor="name" className="flex flex-col text-stone-500">
              Name: *
              <input
                id="name"
                name="name"
                type="text"
                className="bg-stone-400 text-white p-2 mt-1 rounded"
                required
              />
            </label>

            <label htmlFor="email" className="flex flex-col text-stone-500">
              Email: *
              <input
                id="email"
                name="email"
                type="email"
                className="bg-stone-400 text-white p-2 mt-1 rounded"
                required
              />
            </label>

            <label htmlFor="message" className="flex flex-col text-stone-500">
              Message: *
              <textarea
                id="message"
                name="message"
                className="bg-stone-400 text-white p-2 mt-1 rounded h-52"
                required
              />
            </label>

            {/* Submit Button */}
            <div aria-live="polite">
              <button
                type="submit"
                className={`py-2 px-6 rounded font-bold transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer ${
                  isSubmitted
                    ? "bg-blue-600 text-white"
                    : "bg-blue-300 text-white hover:bg-blue-400"
                }`}
                disabled={isSubmitted}
              >
                {isSubmitted ? "Message Sent!" : "Send Message"}
              </button>
            </div>
          </form>
        </div>

        {/* Location List */}
        <p className="text-center text-stone-500 mt-10 text-sm">
          object framing – custom fine framing – restoration – and much more
        </p>
      </motion.div>
    </main>
  );
}
