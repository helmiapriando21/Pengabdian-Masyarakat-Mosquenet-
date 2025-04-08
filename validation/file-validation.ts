const fileValidation = (
  value: File | String | undefined | null, 
  label: string, 
  formatFile: string,
  formatFileErrorMessage: string,
  formatFileMustSame: boolean = true
) => {
  if(!value) {
      return `Tambahkan ${label}`;
  }

  if(value instanceof File) {
    const typeWantedFile = formatFile.split('/')[0];
    const typeSendFile = value.type.split('/')[0];
    const formatWantedFile = formatFile.split('/')[1];
    const formatSendFile = value.type.split('/')[1];

    if(typeWantedFile !== typeSendFile) {
      return `Tipe file tidak didukung. Hanya mendukung ${typeWantedFile}.`
    }

    if(formatFileMustSame && (formatSendFile !== formatWantedFile)) {
      return `Format file tidak didukung. Hanya mendukung ${formatFileErrorMessage}.`
    }
  } 

  return false;
}

export default fileValidation;