export const validateMaxLength = ({ maxLength, value }: { maxLength: number; value: string }) => {
  return value.length <= maxLength;
};

export const validateRegex = ({ regex, value }: { regex: RegExp; value: string }) => {
  return regex.test(value);
};
