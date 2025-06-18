const passwordValidation = (value: string) => {
    if(value === '') {
        return "Tambahkan password";
    } else if(value.length < 6 && value.length > 24) {
        return "Password yang anda berikan tidak boleh kurang dari 6 karakter dan tidak melebihi 24 karakter";
    } else {
        return false;
    }
}

export default passwordValidation;