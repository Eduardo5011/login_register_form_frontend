import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import axios from '../components/axios';


const REGISTER_URL = '/register';

const Register = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const generateError = (err) => toast.error(err, {
    position: 'bottom-right',
  })


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(REGISTER_URL, {
        ...values,
      }, {
        withCredentials: true,
      });
      
      if(data) {
        if(data.errors) {
          const {email, password} = data.errors
          if(email) generateError(email)
          else if(password) generateError(password)
        } else {
          navigate("/login");
        }
      }
    } catch (err) {
      console.log(err);
    }
  };
  
  return (
    <div className="container">
      <h2>Register Account</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={(e) =>
              setValues({ ...values, [e.target.name]: e.target.value })
            }
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            placeholder="password"
            onChange={(e) =>
              setValues({ ...values, [e.target.name]: e.target.value })
            }
          />
        </div>
        <button type="submit">Submit</button>
        <span>
          Already have an account? <Link to="/login">Login</Link>
        </span>
      </form>
      <ToastContainer />
    </div>
  );
};
export default Register;
