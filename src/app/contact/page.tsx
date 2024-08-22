'use client';

import React, { useState } from 'react';

export default function AboutPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission logic here
    setSubmitted(true);
  };

  return (
    <div className="p-8 bg-cream-white min-h-screen">
      <h1 className="text-soft-blue text-4xl mb-4">Contact Us</h1>
      <p className="text-gray-700 mb-6">We would love to hear from you! Please fill out the form below to get in touch with us.</p>
      
      {submitted ? (
        <div className="text-center text-green-500">
          <p>Thank you for reaching out! We will get back to you soon.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 mb-2">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 mb-2">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          
          <div className="mb-4">
            <label htmlFor="message" className="block text-gray-700 mb-2">Message</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              rows={4}
              required
            />
          </div>
          
          <button
            type="submit"
            className="bg-soft-blue text-white p-2 rounded"
          >
            Send Message
          </button>
        </form>
      )}
    </div>
  );
}
