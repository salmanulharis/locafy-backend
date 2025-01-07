import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { useDispatch } from 'react-redux';
import { setUserId } from '../../redux/slices/userSlice';
import './Login.css';

const Login = () => {
  const { user, login } = useContext(AuthContext);
  const [verified, setVerified] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const storedUser = localStorage.getItem('locafy-user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      dispatch(setUserId(parsedUser.userId));
      navigate('/');
    }
  }, [dispatch, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await login(phoneNumber, otp);
    if (success) {
      setVerified(true);
      setTimeout(() => {
        navigate('/');
      }, 1000);
    } else {
      alert('Login failed! Please check your credentials.');
    }
  };

  useEffect(() => {
    if (verified && user) {
      dispatch(setUserId(user.userId));
      localStorage.setItem('locafy-user', JSON.stringify(user));
    }
  }, [user, verified, dispatch]);

  return (
    <div className='login-container'>
      <h1>Login</h1>
      <form onSubmit={handleSubmit} className='login-form'>
        <input
          type="text"
          placeholder="Phone Number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
        <input
          type="text"
          placeholder="OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        />
        <button className='primary-btn' type="submit" disabled={verified}>{ verified ? "Verified" : "Verify"}</button>
      </form>
    </div>
  );
};

export default Login;
