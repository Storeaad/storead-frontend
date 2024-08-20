type ObjectValue = string | File | Blob | BufferSource | FormData;

export const appendObjectToFormData = (
  obj: Record<string, ObjectValue>,
  formData: FormData | undefined = new FormData(),
): FormData => {
  for (const [key, value] of Object.entries(obj)) {
    if (value instanceof Blob) {
      formData.append(key, value);
    } else if (value instanceof FormData) {
      for (const [formDataKey, formDataValue] of value.entries()) {
        formData.append(`${key}.${formDataKey}`, formDataValue);
      }
    } else {
      formData.append(key, value as string);
    }
  }
  return formData;
};
