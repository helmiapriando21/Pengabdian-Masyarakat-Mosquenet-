const checkUser = async (setRole: any, setIsLogin: any) => {
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
          console.log(check);
        } else {
          setRole("Jamaah");
        }
    }
    setIsLogin(check.isLogin);
    return check;
}

export default checkUser;