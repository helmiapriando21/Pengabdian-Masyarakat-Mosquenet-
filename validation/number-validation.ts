const numberValidation = (value?: number, label?: string) => {
  if(value === undefined) {
      return `Tambahkan ${label}`;
  } else {
      return false;
  }
}

export default numberValidation;