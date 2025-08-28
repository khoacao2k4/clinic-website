import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getDateFromString = (dateStr: string) => new Date(dateStr).toLocaleDateString("en-GB", { timeZone: "UTC"});