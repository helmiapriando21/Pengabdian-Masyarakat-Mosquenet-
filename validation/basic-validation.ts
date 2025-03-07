const basicValidation = (value: string, label: string) => {
    if(value === '') {
        return `Tambahkan ${label}`;
    } else {
        return false;
    }
}

export default basicValidation;