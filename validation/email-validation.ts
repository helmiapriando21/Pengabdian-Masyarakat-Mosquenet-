const emailValidation = (value: string, label: string) => {
    if(value === '') {
        return "Tambahkan email";
    } else if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        return "Email yang anda berikan tidak sesuai dengan format";
    } else {
        return false;
    }
}

export default emailValidation;