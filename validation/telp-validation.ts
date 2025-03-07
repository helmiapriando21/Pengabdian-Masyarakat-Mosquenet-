const telpValidation = (value: string, label: string) => {
    if(value === '') {
        return "Tambahkan Nomor Handphone";
    } else if(!/^(\+62|62|0)8[1-9][0-9]{6,11}$/.test(value)) {
        return "Nomor handphone yang anda berikan tidak sesuai dengan format";
    } else {
        return false;
    }
}

export default telpValidation;