import { useState } from "react";
import "./Signup.css";
const Signup = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };
  const [confirmation, setConfirmation] = useState(null);
  const handleSubmit = (event) => {
    event.preventDefault();

    fetch("http://localhost:8081/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Registration successful:", data);
        // Handle other actions if needed
        setConfirmation("Registration successful!");
      })
      .catch((error) => {
        console.error("Error during registration:", error.message);
        // Handle error feedback to the user if needed
        setConfirmation("Registration failed. Please try again.");
      });
  };

  return (
    <>
      <div className="class1">
        <form onSubmit={handleSubmit}>
          <div className="class2">
            <label htmlFor="name" className="cls">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={values.name}
              placeholder="Enter Name"
              onChange={handleChange}
              className="cls bx"
            />
          </div>
          <div className="class3">
            <label htmlFor="email" className="cls">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={values.email}
              placeholder="Enter Email"
              onChange={handleChange}
              className="cls bx"
            />
          </div>
          <div className="class4">
            <label htmlFor="password" className="cls">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={values.password}
              placeholder="Enter Password"
              onChange={handleChange}
              className="cls bx"
            />
          </div>
          <div className="class5">
            <button type="submit" className="signup-button">
              Sign Up
            </button>
          </div>
        </form>
      </div>

      <div className="confirmation">{<p>{confirmation}</p>}</div>
    </>
  );
};

export default Signup;
