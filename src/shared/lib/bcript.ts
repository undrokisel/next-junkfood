'use server';

import { compare, hashSync } from 'bcrypt';

export const getHash = (str: string, num: number) => {
  return hashSync(str, num);
};

export const customCompare = async (str1: string, str2: string) => {
  // eslint-disable-next-line
  return await compare(str1, str2);
};
