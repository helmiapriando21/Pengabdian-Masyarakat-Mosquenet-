const numberValidation = (value: number | undefined, label?: string) => {
  if(!value) {
      return `Tambahkan ${label}`;
  } else {
      return false;
  }
}

export default numberValidation;