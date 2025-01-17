// Code by Prajwal Punekar

import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const EditAssistant = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    mobileno: "",
    email: "",
    username: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Error state for each field
  const [fieldErrors, setFieldErrors] = useState({
    name: "",
    mobileno: "",
    email: "",
    username: "",
    password: "",
  });

  useEffect(() => {
    const fetchAssistantDetails = async () => {
      try {
        const response = await fetch(
          `http://3.109.174.127:3005/getAssistantById/${id}`
        );
        const data = await response.json();

        // Populate form fields with fetched data
        if (data) {
          setFormData({
            name: data.name,
            mobileno: data.mobileno,
            email: data.email,
            username: data.username,
            password: data.password,
          });
        }
      } catch (error) {
        console.error("Failed to fetch assistant details:", error);
      }
    };

    fetchAssistantDetails();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setFieldErrors({
      ...fieldErrors,
      [name]: "", // Clear the error when user starts typing
    });
  };

  const validateForm = () => {
    const { name, mobileno, email, username, password } = formData;
    const newErrors = {};

    // Name validation (letters and spaces only)
    const nameRegex = /^[a-zA-Z\s]+$/;
    if (!name) {
      newErrors.name = "Name is required!";
    } else if (!nameRegex.test(name)) {
      newErrors.name = "Name must contain only letters and spaces.";
    }

    // Mobile number validation
    if (!mobileno) {
      newErrors.mobileno = "Mobile number is required!";
    } else if (!/^[0-9]{10}$/.test(mobileno)) {
      newErrors.mobileno = "Mobile number must be 10 digits.";
    }

    // Email validation
    if (!email) {
      newErrors.email = "Email is required!";
    } else if (
      !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)
    ) {
      newErrors.email = "Please enter a valid email address.";
    }

    // Username and password validation
    if (!username) newErrors.username = "Username is required!";
    if (!password) newErrors.password = "Password is required!";

    return newErrors;
  };

  const handleSave = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");

    // Validate the form and set errors
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setFieldErrors(validationErrors);
      return;
    }

    try {
      const response = await fetch(
        `http://3.109.174.127:3005/updateAssistant/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const result = await response.json();
      if (response.ok) {
        setMessage(result);
        setIsModalOpen(true);
      } else {
        setError(result);
      }
    } catch (error) {
      console.error("Error updating assistant:", error);
      setError("An error occurred while updating the assistant.");
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    navigate("/assistant");
  };

  return (
    <div
      style={{
        padding: "30px",
        fontFamily: "'Roboto', sans-serif",
        backgroundColor: "#f9fafc",
        minHeight: "100vh",
      }}
    >
      <div
        style={{
          maxWidth: "600px",
          margin: "0 auto",
          background: "#fff",
          borderRadius: "10px",
          boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
          padding: "30px",
        }}
      >
        <h2
          style={{
            marginBottom: "20px",
            color: "#4e73df",
            textAlign: "center",
          }}
        >
          Edit Assistant
        </h2>

        {/* Form */}
        <form onSubmit={handleSave}>
          {/* Name */}
          <label style={{ fontWeight: "bold", marginBottom: "5px" }}>
            Name:
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter name"
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "15px",
              fontSize: "1rem",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
          />
          {fieldErrors.name && (
            <p style={{ color: "red", fontSize: "0.9rem" }}>
              {fieldErrors.name}
            </p>
          )}

          {/* Mobile Number */}
          <label style={{ fontWeight: "bold", marginBottom: "5px" }}>
            Mobile Number:
          </label>
          <input
            type="text"
            name="mobileno"
            value={formData.mobileno}
            onChange={handleChange}
            placeholder="Enter mobile number"
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "15px",
              fontSize: "1rem",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
          />
          {fieldErrors.mobileno && (
            <p style={{ color: "red", fontSize: "0.9rem" }}>
              {fieldErrors.mobileno}
            </p>
          )}

          {/* Email */}
          <label style={{ fontWeight: "bold", marginBottom: "5px" }}>
            Email:
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter email"
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "15px",
              fontSize: "1rem",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
          />
          {fieldErrors.email && (
            <p style={{ color: "red", fontSize: "0.9rem" }}>
              {fieldErrors.email}
            </p>
          )}

          {/* Username */}
          <label style={{ fontWeight: "bold", marginBottom: "5px" }}>
            Username:
          </label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Enter username"
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "15px",
              fontSize: "1rem",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
          />
          {fieldErrors.username && (
            <p style={{ color: "red", fontSize: "0.9rem" }}>
              {fieldErrors.username}
            </p>
          )}

          {/* Password */}
          <label style={{ fontWeight: "bold", marginBottom: "5px" }}>
            Password:
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter password"
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "20px",
              fontSize: "1rem",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
          />
          {fieldErrors.password && (
            <p style={{ color: "red", fontSize: "0.9rem" }}>
              {fieldErrors.password}
            </p>
          )}

          {/* Error Message */}
          {error && <p style={{ color: "red", fontSize: "0.9rem" }}>{error}</p>}

          {/* Save Button */}
          <button
            type="submit"
            style={{
              width: "100%",
              padding: "10px",
              fontSize: "1rem",
              backgroundColor: "#2E37A4",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Save Changes
          </button>
        </form>

        {/* Success Modal */}
        {isModalOpen && (
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 1000,
            }}
          >
            <div
              style={{
                backgroundColor: "#fff",
                padding: "30px",
                borderRadius: "10px",
                textAlign: "center",
                boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
              }}
            >
              <h3 style={{ marginBottom: "20px", color: "#4e73df" }}>
                Assistant Updated Successfully!
              </h3>
              <button
                onClick={closeModal}
                style={{
                  padding: "8px 16px",
                  fontSize: "1rem",
                  backgroundColor: "#4e73df",
                  color: "#fff",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EditAssistant;
