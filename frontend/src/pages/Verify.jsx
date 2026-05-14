import React, { useEffect, useContext } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';

const Verify = () => {
  const [searchParams] = useSearchParams();
  const success = searchParams.get('success');
  const orderId = searchParams.get('orderId');
  const { setCartItems } = useContext(ShopContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (success === 'true') {
      setCartItems({});
      navigate('/orders');
    } else {
      navigate('/cart');
    }
  }, []);

  return <div className='min-h-screen flex items-center justify-center'>Processing...</div>;
};

export default Verify;