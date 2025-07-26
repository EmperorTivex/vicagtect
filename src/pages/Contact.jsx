import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { motion } from "framer-motion";

function Contact() {
  const form = useRef();
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();
    setLoading(true);

    emailjs
      .sendForm(
        "Tise123456",
        "template_2mp696s",
        form.current,
        "3qYOjiCyNnp-2DJXr"
      )
      .then(
        (result) => {
          console.log(result.text);
          setSuccess(true);
          setLoading(false);
          form.current.reset();
        },
        (error) => {
          console.log(result.text);
          setSuccess(true);
          setLoading(false);
          form.current.reset();
        },
        (error) => {
          console.log(error.text);
          setLoading(false);
        }
      );
  };
  return (
    <motion.section
      className="py-16 px-4 bg-white"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 2.7, ease: "easeOut" }}
    >
      <div className="max-w-5xl mx-auto">
        <motion.h2
          className="text-3xl font-bold text-center text-orange-500 mb-8"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 2.7, ease: "easeOut" }}
        >
          Get in Touch
        </motion.h2>
        <p className="text-center text-gray-600 mb-12">
          We'd love to hear from you! Reach out for inquiries, partnerships, or
          project discussions.
        </p>
        <div className="grid md:grid-cols-2 gap-10">
          <div>
            <h3 className="text-xl font-semibold mb-4 text-gray-700">
              {" "}
              Contact Details
            </h3>
            <p className=" mb-2 text-gray-600">
              Office: Lotto Road, Mowe Nigeria.
            </p>
            <p className=" mb-2 text-gray-600"> Phone: 08035021494</p>
            <p className=" mb-2 text-gray-600">
              {" "}
              Email: vicagtectnigerialimited@gmail.com
            </p>
          </div>
          <motion.form
            ref={form}
            onSubmit={sendEmail}
            className="space-y-6"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.5, delay: 2 }}
          >
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                name="user_name"
                required
                className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-orange-400"
                placeholder="Your Name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                {" "}
                Email
              </label>
              <input
                type="email"
                name="user_email"
                required
                className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-orange-400"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                {" "}
                Message{" "}
              </label>
              <textarea
                name="message"
                rows="4"
                required
                className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-orange-400"
                placeholder="Type your message......"
              >
                {" "}
              </textarea>
            </div>
            <motion.button
              type="submit"
              disabled={loading}
              className="bg-orange-500 text-white px-6 py-2 rounded-full hover:bg-orange-600 transition"
              whileHover={{ scale: 1.25 }}
              whileTap={{ scale: 0.97 }}
            >
              {loading ? "Sending..." : "Send Message"}
            </motion.button>
            {success && (
              <p className="text-green-600 mt-2">
                {" "}
                Message sent successfully! ✅
              </p>
            )}
          </motion.form>
        </div>
      </div>
    </motion.section>
  );
}

export default Contact;
