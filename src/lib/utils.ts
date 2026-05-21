export function cn(...inputs: (string | boolean | undefined | null)[]) {
  return inputs.filter(Boolean).join(" ");
}

export function formatNumber(num: number): string {
  if (num >= 1000) {
    return num.toLocaleString();
  }
  return num.toString();
}
