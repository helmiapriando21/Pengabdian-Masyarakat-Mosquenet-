import React from "react";
import { requestGetApi } from "./api";

const checkUser = async (
  setRole?: React.Dispatch<React.SetStateAction<string | undefined>>, 
  setIsLogin?: React.Dispatch<React.SetStateAction<boolean>>
) => {
    const check = await requestGetApi('/api/check-user', null);
    if(check && check.isLogin && setRole) {
        if(check.masterStatus) {
          setRole("Master Admin");
        } else if(check.adminStatus) {
          setRole(check.adminRole);
        } else {
          setRole("Jamaah");
        }
    }

    if(setIsLogin) setIsLogin(check.isLogin);

    return check;
}

export default checkUser;