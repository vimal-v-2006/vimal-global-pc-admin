export type RequestHistoryItem = {
  action: string;
  at: string;
};

export type AdminRequest = {
  id: string;
  name: string;
  phone: string;
  email: string;
  contactApp: string;
  country: string;
  services: string[];
  customRequest: string;
  pcSpecs: {
    cpu?: string;
    gpu?: string;
    ram?: string;
    storage?: string;
    osVersion?: string;
    formFactor?: string;
    gpuVendor?: string;
  };
  paymentStatus: "Paid" | "Pending";
  paymentMode: "Screenshot payment" | "Pay later";
  paymentScreenshot?: string;
  paymentScreenshotDataUrl?: string;
  requestStatus: "Pending" | "Contacted" | "In Progress" | "Completed";
  submittedDate: string;
  history?: RequestHistoryItem[];
};

export function formatAdminDate(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat("en-IN", {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
    timeZone: "Asia/Kolkata",
  }).format(date) + " IST";
}
