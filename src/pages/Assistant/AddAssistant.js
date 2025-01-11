// Code by Prajwal Punekar

import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import Navbar from "../navBar";

const AddAssistant = () => {
  const [formData, setFormData] = useState({
    name: "",
    mobileno: "",
    email: "",
    username: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false); // Modal visibility state

  const navigate = useNavigate(); // Use navigate for navigation

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    const { name, mobileno, email, username, password } = formData;

    if (!name || !mobileno || !email || !username || !password) {
      return "All fields are required!";
    }

    // Mobile number validation (assuming a valid mobile number format)
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(mobileno)) {
      return "Mobile number must be 10 digits.";
    }

    // Email validation (basic email format)
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      return "Please enter a valid email address.";
    }

    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      const response = await axios.post(
        "http://3.109.174.127:3005/addAssistant", // Updated API endpoint
        formData
      );
      setMessage(response.data);

      // Show modal after success
      setShowModal(true);

      // Reset the form after submission
      setFormData({
        name: "",
        mobileno: "",
        email: "",
        username: "",
        password: "",
      });

      // Navigate to the Assistant page after 2 seconds (to give time for the modal to show)
      setTimeout(() => {
        navigate("/assistant"); // Navigate to the assistant page
      }, 4000);
    } catch (err) {
      setError(err.response?.data || "Failed to add assistant");
    }
  };

  // Close the modal and navigate to the Assistant page
  const handleCloseModal = () => {
    setShowModal(false);
    navigate("/assistant"); // Navigate to the assistant page when closing the modal
  };

  return (
    <div className="main-wrapper">
      <Navbar />

      <div className="page-wrapper" style={{ marginTop: "50px" }}>
        {/* Main Content */}
        <div style={{ flex: 1, padding: "20px", backgroundColor: "#fff" }}>
          <h2
            style={{
              fontSize: "28px",
              marginBottom: "20px",
              borderBottom: "1px solid #ddd",
              paddingBottom: "10px",
            }}
          >
            Add Assistant
          </h2>

          {/* Form Section */}
          <form
            onSubmit={handleSubmit}
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "20px",
              maxWidth: "100%",
            }}
          >
            {/* First Row: 2 Fields */}
            {[
              { name: "name", type: "text", placeholder: "Name", row: 1 },
              {
                name: "mobileno",
                type: "text",
                placeholder: "Mobile No.",
                row: 1,
              },
              { name: "email", type: "email", placeholder: "Email", row: 2 },
              {
                name: "username",
                type: "text",
                placeholder: "Username",
                row: 2,
              },
              {
                name: "password",
                type: "password",
                placeholder: "Password",
                row: 2,
              },
            ].map((field) => (
              <div
                key={field.name}
                style={{
                  flex:
                    field.row === 2
                      ? "1 1 calc(50% - 20px)"
                      : "1 1 calc(50% - 20px)",
                  minWidth: "200px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "5px",
                }}
              >
                <input
                  type={field.type}
                  name={field.name}
                  placeholder={field.placeholder}
                  value={formData[field.name]}
                  onChange={handleChange}
                  required
                  style={{
                    padding: "12px",
                    border: "1px solid #ccc",
                    borderRadius: "6px",
                    fontSize: "14px",
                  }}
                />
              </div>
            ))}

            {/* Submit Button */}
            <div
              style={{
                width: "100%",
                textAlign: "center",
                marginTop: "20px",
              }}
            >
              <button
                type="submit"
                style={{
                  padding: "12px 30px",
                  backgroundColor: "#2E37A4",
                  color: "white",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer",
                  fontSize: "16px",
                }}
              >
                Add Assistant
              </button>
            </div>
          </form>

          {/* Success/Error Message */}
          {message && (
            <p
              style={{ color: "green", textAlign: "center", marginTop: "20px" }}
            >
              {message}
            </p>
          )}
          {error && (
            <p style={{ color: "red", textAlign: "center", marginTop: "20px" }}>
              {error}
            </p>
          )}
        </div>
      </div>

      {/* Modal for successful addition */}
      {showModal && (
        <div
          style={{
            position: "fixed",
            top: "0",
            left: "0",
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              padding: "20px",
              borderRadius: "8px",
              textAlign: "center",
              maxWidth: "400px",
              width: "100%",
            }}
          >
            <h3>Assistant Added Successfully!</h3>
            <p>Your assistant has been added successfully.</p>
            <button
              onClick={handleCloseModal} // Call the function to close the modal and navigate
              style={{
                padding: "10px 20px",
                backgroundColor: "#2E37A4",
                color: "white",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
                fontSize: "16px",
                marginTop: "20px",
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddAssistant;
