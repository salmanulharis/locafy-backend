import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { useDispatch } from 'react-redux';
import { setUserId } from '../../redux/slices/userSlice';

const Login = () => {
  const { user, login } = useContext(AuthContext);
  const [verified, setVerified] = useState(false);
  const [userVerified, setUserVerified ] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await login(phoneNumber, otp);
    if (success) {
      setVerified(true);
    } else {
      alert('Login failed! Please check your credentials.');
    }
  };

  useEffect(() => {
    if (verified && user) {
      dispatch(setUserId(user.userId));
      localStorage.setItem('locafy-user', JSON.stringify(user));
      setUserVerified(true);
    }
  }, [user]);

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
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
        <button type="submit" disabled={verified}>{ verified ? "Verified" : "Verify"}</button>
      </form>
      {verified && userVerified && <button onClick={() => navigate('/')}>Go to Dashboard</button>}
    </div>
  );
};

export default Login;
