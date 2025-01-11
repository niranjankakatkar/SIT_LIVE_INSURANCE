import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../navBar";

const AddLaboratory = () => {
  const [formData, setFormData] = useState({
    title: "",
    country: "",
    state: "",
    city: "",
    pincode: "",
    address: "",
    name: "",
    mobileno: "",
    email: "",
    username: "",
    password: "",
    client_name: "",
    client_email: "",
    client_address: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    const {
      title,
      country,
      state,
      city,
      pincode,
      address,
      name,
      mobileno,
      email,
      username,
      password,
      client_name,
      client_email,
      client_address,
    } = formData;

    if (
      !title ||
      !country ||
      !state ||
      !city ||
      !address ||
      !pincode ||
      !name ||
      !mobileno ||
      !email ||
      !username ||
      !password ||
      !client_name ||
      !client_email ||
      !client_address
    ) {
      return "All fields are required!";
    }

    // Pincode validation
    if (isNaN(pincode) || pincode.length !== 6) {
      return "Pincode must be a 6-digit number.";
    }

    // Mobile number validation
    if (isNaN(mobileno) || mobileno.length !== 10) {
      return "Mobile number must be a 10-digit number.";
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email) || !emailRegex.test(client_email)) {
      return "Please enter valid email addresses.";
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
        "http://3.109.174.127:3005/addLaboratory",
        formData
      );
      setMessage(response.data);

      // Show modal after success
      setShowModal(true);

      // Reset the form after submission
      setFormData({
        title: "",
        country: "",
        state: "",
        city: "",
        pincode: "",
        address: "",
        name: "",
        mobileno: "",
        email: "",
        username: "",
        password: "",
        client_name: "",
        client_email: "",
        client_address: "",
      });

      // Navigate to the Laboratory page after 2 seconds
      setTimeout(() => {
        navigate("/laboratory");
      }, 4000);
    } catch (err) {
      setError(err.response?.data || "Failed to add laboratory");
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    navigate("/laboratory");
  };

  return (
    <div className="main-wrapper">
      <Navbar />

      <div className="page-wrapper" style={{ marginTop: "50px" }}>
        <div style={{ flex: 1, padding: "20px", backgroundColor: "#fff" }}>
          <h2
            style={{
              fontSize: "28px",
              marginBottom: "20px",
              borderBottom: "1px solid #ddd",
              paddingBottom: "10px",
            }}
          >
            Add Laboratory
          </h2>

          <form
            onSubmit={handleSubmit}
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "20px",
              maxWidth: "100%",
            }}
          >
            {/* Laboratory Details */}
            {[
              { name: "title", type: "text", placeholder: "Title" },
              { name: "country", type: "text", placeholder: "Country" },
              { name: "state", type: "text", placeholder: "State" },
              { name: "city", type: "text", placeholder: "City" },
              { name: "pincode", type: "number", placeholder: "Pincode" },
              { name: "address", type: "textarea", placeholder: "Address" },
              { name: "name", type: "text", placeholder: "Name" },
              {
                name: "mobileno",
                type: "number",
                placeholder: "Mobile Number",
              },
              { name: "email", type: "email", placeholder: "Email" },
              { name: "username", type: "text", placeholder: "Username" },
              { name: "password", type: "password", placeholder: "Password" },
            ].map((field) => (
              <div
                key={field.name}
                style={{
                  flex:
                    field.name === "address"
                      ? "1 1 100%"
                      : "1 1 calc(33.33% - 20px)",
                  minWidth: field.name === "address" ? "100%" : "200px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "5px",
                }}
              >
                {field.type === "textarea" ? (
                  <textarea
                    name={field.name}
                    placeholder={field.placeholder}
                    value={formData[field.name]}
                    onChange={handleChange}
                    required
                    style={{
                      padding: "12px",
                      border: "1px solid #ccc",
                      borderRadius: "6px",
                      resize: "none",
                      fontSize: "14px",
                      height: "80px",
                    }}
                  ></textarea>
                ) : (
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
                )}
              </div>
            ))}

            {/* Client Information Section */}
            <h3 style={{ width: "100%", marginTop: "20px" }}>
              Client Information
            </h3>
            {[
              { name: "client_name", type: "text", placeholder: "Client Name" },
              {
                name: "client_email",
                type: "email",
                placeholder: "Client Email",
              },
              {
                name: "client_address",
                type: "textarea",
                placeholder: "Client Address",
              },
            ].map((field) => (
              <div
                key={field.name}
                style={{
                  flex:
                    field.name === "client_address"
                      ? "1 1 100%"
                      : "1 1 calc(33.33% - 20px)",
                  minWidth: field.name === "client_address" ? "100%" : "200px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "5px",
                }}
              >
                {field.type === "textarea" ? (
                  <textarea
                    name={field.name}
                    placeholder={field.placeholder}
                    value={formData[field.name]}
                    onChange={handleChange}
                    required
                    style={{
                      padding: "12px",
                      border: "1px solid #ccc",
                      borderRadius: "6px",
                      resize: "none",
                      fontSize: "14px",
                      height: "80px",
                    }}
                  ></textarea>
                ) : (
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
                )}
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
                Add Laboratory
              </button>
            </div>
          </form>

          {/* Success Modal */}
          {showModal && (
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
                  maxWidth: "500px", // Max width for larger screens
                  width: "90%", // 90% width for smaller screens
                  transition: "all 0.3s ease", // Smooth transition for resizing
                }}
              >
                <h3
                  style={{
                    marginBottom: "20px",
                    color: "#4e73df",
                    fontSize: "24px", // Responsive font size
                  }}
                >
                  Laboratory Added Successfully!
                </h3>
                <button
                  onClick={handleCloseModal}
                  style={{
                    padding: "8px 16px",
                    fontSize: "1rem",
                    backgroundColor: "#4e73df",
                    color: "#fff",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                    transition: "background-color 0.3s ease", // Smooth hover effect
                  }}
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
        <footer
          style={{
            marginTop: "20px",
            padding: "10px 20px",
            backgroundColor: "#f1f1f1",
            textAlign: "center",
            fontSize: "14px",
          }}
        >
          © {new Date().getFullYear()}{" "}
          <a
            href="https://sitsolutions.co.in/"
            target="_blank"
            rel="noopener noreferrer"
          >
            S IT Solutions Pvt. Ltd.
          </a>{" "}
          All Rights Reserved.
        </footer>
      </div>
    </div>
  );
};

export default AddLaboratory;
