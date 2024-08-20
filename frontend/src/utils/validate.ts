export const validateMaxLength = ({
  maxLength,
  value,
}: {
  maxLength: number;
  value: string;
}): boolean => {
  return value.length <= maxLength;
};

export const validateRegex = ({ regex, value }: { regex: RegExp; value: string }): boolean => {
  return regex.test(value);
};

export const validateValidDate = (date: Date): boolean => {
  return !isNaN(date.getTime());
};
