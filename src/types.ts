/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface ServiceItem {
  id: string;
  name: string;
  duration: string;
  price: string;
  category: "men" | "women" | "unisex";
  description?: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  experience: string;
  photoUrl: string;
  bio: string;
  specialty: string[];
  objectPosition?: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: "all" | "transformation" | "ambiance" | "team_at_work" | "bridal";
  type: "image" | "video";
  url: string; // fallback high-res Unsplash links
  beforeUrl?: string; // for transformation comparison slider
  afterUrl?: string;
  videoUrl?: string; // video embed or local-like url
  description: string;
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  rating: number;
  text: string;
  date: string;
}

export interface BookingDetails {
  fullName: string;
  phone: string;
  email: string;
  serviceId: string;
  stylistId: string;
  date: string;
  time: string;
  notes: string;
}

