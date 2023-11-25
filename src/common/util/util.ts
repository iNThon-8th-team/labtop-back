export const delimiter = '/|/';

export const separateInput = (input: string): Array<string> => {
  if (!input) return undefined;
  return input.split(delimiter);
};

export const joinInput = (input: Array<string>): string => {
  if (!input) return undefined;
  return input.join(delimiter);
};
