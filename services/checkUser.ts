import React from "react";
import { requestGetApi } from "./api";

const checkUser = async (
  setRole: React.Dispatch<React.SetStateAction<string | undefined>>, 
  setIsLogin: React.Dispatch<React.SetStateAction<boolean>>
) => {
    const check = await requestGetApi('/api/check-user', null);
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