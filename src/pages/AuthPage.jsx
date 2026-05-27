import React from 'react'
import {useState} from 'react'
import LoginComp from '../components/LoginComp';
import RegisterComp from '../components/RegisterComp';


const AuthPage = () => {

  const [isLogin, setIsLogin] =
    useState(true);

  return (
    <div>

      {
        isLogin
          ? <LoginComp />
          : <RegisterComp />
      }

      <button
        onClick={() =>
          setIsLogin(!isLogin)
        }
      >
        {
          isLogin
            ? "Create Account"
            : "Already have account?"
        }
      </button>

    </div>
  );
};

export default AuthPage