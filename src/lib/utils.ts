import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatTime(seconds: number) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds - hours * 3600) / 60);
  const second = Math.floor(seconds - hours*3600 - minutes*60);
  const timer = [];
  if(hours > 0) {
    timer.push(`${hours}h`);
  }
  if(minutes > 0) {
    timer.push(`${minutes}m`);
  }
  if(second > 0) {
    timer.push(`${second}s`);
  }
  return timer.join(" ");
}