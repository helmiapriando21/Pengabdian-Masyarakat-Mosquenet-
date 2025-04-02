/* eslint-disable @typescript-eslint/no-explicit-any */

const generateFormData = (data: any) => {
  const formData = new FormData();
  Object.entries(data || {}).forEach(([key, value]) => {
    if (value !== null && value !== undefined) {
      if (value instanceof File) {
        formData.append(key, value as File);
      } else if (typeof value === "number") {
        formData.append(key, String(value));
      } else {
        formData.append(key, value as string);
      }
    }
  });
  return formData;
}

export default generateFormData;