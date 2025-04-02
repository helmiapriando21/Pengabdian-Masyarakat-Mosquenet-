const fileValidation = (
  value: File | String | undefined | null, 
  label: string, 
  formatFile: string,
  formatFileErrorMessage: string
) => {
  if(!value) {
      return `Tambahkan ${label}`;
  }

  if(value instanceof File) {
    if(value.type !== formatFile) {
      return `Format file tidak didukung. Hanya mendukung ${formatFileErrorMessage}.`
    }
  } 

  return false;
}

export default fileValidation;