import React from "react";

const checkUser = async (
  setRole: React.Dispatch<React.SetStateAction<string | undefined>>, 
  setIsLogin: React.Dispatch<React.SetStateAction<boolean>>
) => {
    const response = await fetch(
        '/api/check-user', 
        { method: 'GET' }
    );
    const check = await response.json();
    if(check.isLogin) {
        if(check.masterStatus.value === "true") {
          setRole("Master Admin");
        } else if(check.adminStatus.value === "true") {
          setRole(check.adminRole.value);
        } else {
          setRole("Jamaah");
        }
    }
    setIsLogin(check.isLogin);
    return check;
}

export default checkUser;