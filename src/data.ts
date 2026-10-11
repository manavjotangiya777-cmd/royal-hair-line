/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ServiceItem, TeamMember, GalleryItem, Testimonial } from "./types";
import receptionDeskImg from "./assets/images/salon_reception_desk_1779605166122.png";
import loungeSofaImg from "./assets/images/salon_lounge_sofa_1779605150647.png";
import productShelfImg from "./assets/images/salon_product_shelf_1779605181045.png";
import team1Img from "./assets/images/team_1.jpeg";
import team2Img from "./assets/images/team_2.jpeg";

export const servicesData: ServiceItem[] = [
  // Men's Services
  {
    id: "m_haircut",
    name: "Regular Haircut",
    duration: "30 mins",
    price: "Rs.200",
    category: "men",
    description: "Classic scissors and clipper cut tailored to your facial geometry, finished with a hot towel."
  },
  {
    id: "m_fade",
    name: "Fade / Taper Cut",
    duration: "45 mins",
    price: "Rs.300",
    category: "men",
    description: "Premium skin fade, shadow fade, or drop taper with razor-sharp contours."
  },
  {
    id: "m_beard",
    name: "Beard Trim & Shape",
    duration: "20 mins",
    price: "Rs.150",
    category: "men",
    description: "Sculpting, line-up, and trimming with soothing pre-shave oil and cologne mist."
  },
  {
    id: "m_combo",
    name: "Hair + Beard Combo",
    duration: "60 mins",
    price: "Rs.400",
    category: "men",
    description: "Signature haircut combined with master beard line-up and relaxing hair wash."
  },
  {
    id: "m_color",
    name: "Hair Color (Men)",
    duration: "60-90 mins",
    price: "Rs.800",
    category: "men",
    description: "Natural gray coverage, custom root touches, or striking blonde transformations."
  },
  {
    id: "m_scalp",
    name: "Scalp Treatment",
    duration: "45 mins",
    price: "Rs.600",
    category: "men",
    description: "Exfoliating detox scrub with nourishing serum to stimulate healthy hair growth."
  },
  {
    id: "m_head_msg",
    name: "Head Massage",
    duration: "30 mins",
    price: "Rs.300",
    category: "men",
    description: "Traditional deep pressure massage using luxury organic essential oils."
  },
  {
    id: "m_royal_groom",
    name: "Royal Grooming Package",
    duration: "120 mins",
    price: "Rs.1,200",
    category: "men",
    description: "The ultimate royal experience: Premium cut, beard spa, facial detox, and hot oil therapy."
  },

  // Women's Services
  {
    id: "w_haircut",
    name: "Haircut & Styling",
    duration: "60 mins",
    price: "Rs.400",
    category: "women",
    description: "Advanced designer haircuts, layers, steps, or custom shaping styled to perfection."
  },
  {
    id: "w_blowout",
    name: "Blowout / Blowdry",
    duration: "45 mins",
    price: "Rs.350",
    category: "women",
    description: "Voluminous, sleek, or curly bouncy blowouts for transitions, brunch, or events."
  },
  {
    id: "w_global_color",
    name: "Hair Color (Global)",
    duration: "90-120 mins",
    price: "Rs.1,500",
    category: "women",
    description: "Ammonia-free uniform premium hair color using L'Oreal Professional or Schwarzkopf."
  },
  {
    id: "w_balayage",
    name: "Highlights / Balayage",
    duration: "120-180 mins",
    price: "Rs.2,500",
    category: "women",
    description: "Artistic hand-painted sun-kissed high-dimension color with nourishing gloss."
  },
  {
    id: "w_keratin",
    name: "Keratin Treatment",
    duration: "180 mins",
    price: "Rs.3,000",
    category: "women",
    description: "Intense frizz reduction, structural rehabilitation & absolute silky smoothness."
  },
  {
    id: "w_spa",
    name: "Hair Spa",
    duration: "60 mins",
    price: "Rs.800",
    category: "women",
    description: "Nourishing steam treatment, deep hydration locks, scalp massage, and vital elements."
  },
  {
    id: "w_bridal_trial",
    name: "Bridal Hair (Trial)",
    duration: "90 mins",
    price: "Rs.1,500",
    category: "women",
    description: "Explora-session with master stylist to design your supreme bridal crown design."
  },
  {
    id: "w_bridal_day",
    name: "Bridal Hair (Day-of)",
    duration: "120 mins",
    price: "Rs.3,000",
    category: "women",
    description: "The signature crown styling, setting, accessorizing, and veil pinning with supreme hold."
  },
  {
    id: "w_royal_bridal",
    name: "Royal Bridal Package",
    duration: "Full Day",
    price: "On Request",
    category: "women",
    description: "Full-day absolute pampering: Bridal hair, premium makeup, body polishing, and high-shine spa."
  },

  // Unisex Services
  {
    id: "u_threading",
    name: "Eyebrow Threading",
    duration: "15 mins",
    price: "Rs.80",
    category: "unisex",
    description: "Symmetrical eyebrow mapping, arch definition, and precision threading."
  },
  {
    id: "u_facial",
    name: "Facial (Basic)",
    duration: "45 mins",
    price: "Rs.600",
    category: "unisex",
    description: "Deep-pore cleansing, soft exfoliation, soothing clay mask, and moisture lock."
  },
  {
    id: "u_mehndi",
    name: "Mehndi (Henna)",
    duration: "60-120 mins",
    price: "On Request",
    category: "unisex",
    description: "Exquisite traditional, Arabic, or modern bridal organic henna designs."
  },
  {
    id: "u_manicure",
    name: "Manicure",
    duration: "45 mins",
    price: "Rs.400",
    category: "unisex",
    description: "Nail shaping, cuticle therapy, dead-skin scrubbing, luxury gold spa cream massage."
  },
  {
    id: "u_pedicure",
    name: "Pedicure",
    duration: "60 mins",
    price: "Rs.500",
    category: "unisex",
    description: "Signature foot bath, skin filing, mask application, and long relaxing pressure massage."
  }
];

export const teamData: TeamMember[] = [
  {
    id: "Owner Of Royals",
    name: "Vinod Gondaliya",
    role: "Master Gents Stylist & Grooming Maestro",
    experience: "20+ Years",
    photoUrl: team1Img,
    bio: "Vinod trained at the Toni&Guy Academy in London. He specializes in bespoke haircuts, razor fades, and classic traditional barbering with a modern, high-precision edge.",
    specialty: ["Bespoke Haircuts", "Closer Razor Fades", "Traditional Shaves", "Hair Botox"],
    objectPosition: "center"
  },
  {
    id: "CEO Of Royals",
    name: "Yash Gondaliya",
    role: "Senior Director of Color & Transformations",
    experience: "10+ Years",
    photoUrl: team2Img,
    bio: "Yash is an expert colorist with a passion for creative hand-painted highlights, structural repair, and high-fashion hair coloring. Her transformations are nothing short of art.",
    specialty: ["High-Dimension Balayage", "Global Color", "Keratin Therapy", "Hair Spa Locks"],
    objectPosition: "center"
  }
];

export const GALLERY_MOCK_VIDEOS = [
  "https://assets.mixkit.co/videos/preview/mixkit-stylist-combing-hair-of-a-client-44445-large.mp4",
  "https://assets.mixkit.co/videos/preview/mixkit-hair-stylist-cutting-blonde-hair-in-a-salon-44444-large.mp4"
];

export const galleryData: GalleryItem[] = [
  {
    id: "gal_trans_1",
    title: "Signature Golden Balayage",
    category: "transformation",
    type: "image",
    url: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80",
    beforeUrl: "https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?auto=format&fit=crop&w=800&q=80", // brunette
    afterUrl: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80", // shiny gold balayage
    description: "From dull uneven brassy locks to a glorious multi-dimensional golden honey balayage."
  },
  {
    id: "gal_amb_1",
    title: "Emerald Fluted Reception Desk",
    category: "ambiance",
    type: "image",
    url: receptionDeskImg,
    description: "Our signature curved fluted reception counter, painted in custom Pine Emerald Green with an illuminated warm LED under-glow."
  },
  {
    id: "gal_work_1",
    title: "Artistry in Motion",
    category: "team_at_work",
    type: "video",
    url: "https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&w=800&q=80",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-stylist-combing-hair-of-a-client-44445-large.mp4",
    description: "Our master stylist Vikram meticulous styling under warm studio lights."
  },
  {
    id: "gal_bridal_1",
    title: "The Regal Maharani Bun",
    category: "bridal",
    type: "image",
    url: "https://images.unsplash.com/photo-1632345031435-8797b2d58045?auto=format&fit=crop&w=800&q=80",
    description: "Classic bridal braided bun adorned with traditional fresh jasmine flowers and delicate gold jewelry."
  },
  {
    id: "gal_trans_2",
    title: "Gentleman's Royal Fade",
    category: "transformation",
    type: "image",
    url: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=800&q=80",
    beforeUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80", // unkept
    afterUrl: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=800&q=80", // perfect fade
    description: "A meticulously executed shadow high skin fade paired with flawless beard grooming contours."
  },
  {
    id: "gal_amb_2",
    title: "Plush Waiting Sanctuary Lounge",
    category: "ambiance",
    type: "image",
    url: loungeSofaImg,
    description: "Comfortable charcoal tufted Chesterfield corner leather sofa set before a stunning golden-brick-tiled decorative archway window."
  },
  {
    id: "gal_amb_3",
    title: "Royal Product Showcase",
    category: "ambiance",
    type: "image",
    url: productShelfImg,
    description: "Backlit product display cabinet stocked with premium luxury styling products, incorporating a vertical digital model portfolio screen."
  },
  {
    id: "gal_bridal_2",
    title: "Modern Reception Waves",
    category: "bridal",
    type: "image",
    url: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80",
    description: "Soft voluminous cascading curls framed with a subtle gold pearlescent tiara."
  },
  {
    id: "gal_work_2",
    title: "Slicing through Precision",
    category: "team_at_work",
    type: "video",
    url: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-hair-stylist-cutting-blonde-hair-in-a-salon-44444-large.mp4",
    description: "Sophia executing specialized slicing-slide techniques for lightweight bouncy contours."
  }
];

export const testimonialsData: Testimonial[] = [
  {
    id: "test_amee",
    name: "Amee Patel",
    location: "Maninagar, Ahmedabad",
    rating: 5,
    text: "Very good hair cut and transformation service! The staff is extremely polite, patient, and professional. They listen carefully to what you want and do the job perfectly. Highly satisfied.",
    date: "June 2026"
  },
  {
    id: "test_dhaval",
    name: "Dhaval Shah",
    location: "Maninagar, Ahmedabad",
    rating: 5,
    text: "The best salon in Maninagar for men's grooming. Excellent haircut and precision beard setting. The team is skilled and experienced. Great hygiene standards and polite behavior.",
    date: "May 2026"
  },
  {
    id: "test_mansi",
    name: "Mansi Trivedi",
    location: "Maninagar, Ahmedabad",
    rating: 5,
    text: "Amazing experience for hair spa and coloring! They use premium, genuine products and give great suggestions based on your hair texture. Highly recommend visiting this salon.",
    date: "May 2026"
  },
  {
    id: "test_rohan",
    name: "Rohan Sharma",
    location: "Maninagar, Ahmedabad",
    rating: 5,
    text: "I have been coming to Royal Hair Line for over 2 years now. Consistently top-notch service, clean environment, and friendly staff. It's safe, affordable, and incredibly premium.",
    date: "April 2026"
  }
];
