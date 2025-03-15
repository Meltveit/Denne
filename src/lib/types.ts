// lib/types.ts
export type UserRole = "private" | "business";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  interests?: string[];
  profileImage?: string;
}

export interface Company extends User {
  role: "business";
  description?: string;
  lat?: number;
  lng?: number;
  address?: string;
  orgNumber?: string;
  website?: string;
  images?: string[];
}

export interface Post {
  id: string;
  businessId: string;
  content: string;
  image?: string;
  file?: string;
  link?: string;
  timestamp: number;
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  file?: string;
  timestamp: number;
}