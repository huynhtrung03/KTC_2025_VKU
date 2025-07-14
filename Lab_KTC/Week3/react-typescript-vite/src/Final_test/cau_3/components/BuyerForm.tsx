


import React, { useState } from 'react';

interface BuyerFormData {
  name: string;
  email: string;
  address: string;
}

interface BuyerFormErrors {
  name?: string;
  email?: string;
  address?: string;
}

export default function BuyerForm() {
  const [formData, setFormData] = useState<BuyerFormData>({
    name: '',
    email: '',
    address: '',
  });

  const [errors, setErrors] = useState<BuyerFormErrors>({});

  const validate = (): boolean => {
    const newErrors: BuyerFormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Minimum 2 characters';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Invalid email';
    }

    if (!formData.address.trim()) {
      newErrors.address = 'Address is required';
    } else if (formData.address.trim().length < 5) {
      newErrors.address = 'Minimum 5 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      console.log('Submitted Buyer Info:', formData);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto mt-8 p-6 border border-gray-300 rounded-xl shadow-lg bg-white"
    >
      <h2 className="text-2xl font-bold mb-4 text-center">Form</h2>

      <div className="mb-4">
        <label className="block font-medium text-gray-700 mb-1">Name:</label>
        <input
          type="text"
          name="name"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
          value={formData.name}
          onChange={handleChange}
        />
        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
      </div>

      <div className="mb-4">
        <label className="block font-medium text-gray-700 mb-1">Email:</label>
        <input
          type="email"
          name="email"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
          value={formData.email}
          onChange={handleChange}
        />
        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
      </div>

      <div className="mb-4">
        <label className="block font-medium text-gray-700 mb-1">Address:</label>
        <input
          type="text"
          name="address"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
          value={formData.address}
          onChange={handleChange}
        />
        {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
      </div>

      <button
        type="submit"
        className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition"
      >
        Submit
      </button>
    </form>
  );
}


