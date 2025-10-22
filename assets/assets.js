import upload_area from "./upload_area.svg";
import hero_model_img from "./Gemini_Generated_Image_deugd3deugd3deug-removebg-preview.png";
import hero_product_img1 from "./hero_product_img1.png";
import hero_product_img2 from "./hero_product_img2.png";
import product_img1 from "./product_img1.png";
import product_img2 from "./product_img2.png";
import product_img3 from "./product_img3.png";
import product_img4 from "./product_img4.png";
import product_img5 from "./product_img5.png";
import product_img6 from "./product_img6.png";
import product_img7 from "./product_img7.png";
import product_img8 from "./product_img8.png";
import product_img9 from "./product_img9.png";
import product_img10 from "./product_img10.png";
import product_img11 from "./product_img11.png";
import product_img12 from "./product_img12.png";
import { ClockFadingIcon, HeadsetIcon, SendIcon } from "lucide-react";
import profile_pic1 from "./profile_pic1.jpg";
import profile_pic2 from "./profile_pic2.jpg";
import profile_pic3 from "./profile_pic3.jpg";

export const assets = {
  upload_area,
  hero_model_img,
  hero_product_img1,
  hero_product_img2,
  product_img1,
  product_img2,
  product_img3,
  product_img4,
  product_img5,
  product_img6,
  product_img7,
  product_img8,
  product_img9,
  product_img10,
  product_img11,
  product_img12,
};

export const categories = [
  "Headphones",
  "Speakers",
  "Watch",
  "Earbuds",
  "Mouse",
  "Decoration",
];

export const dummyRatingsData = [
  {
    id: "rat_1",
    rating: 4.2,
    review:
      "I was a bit skeptical at first, but this product turned out to be even better than I imagined. The quality feels premium, it's easy to use, and it delivers exactly what was promised. I've already recommended it to friends and will definitely purchase again in the future.",
    user: { name: "Kristin Watson", image: profile_pic1 },
    productId: "prod_1",
    createdAt: "Sat Jul 19 2025 14:51:25 GMT+0530 (India Standard Time)",
    updatedAt: "Sat Jul 19 2025 14:51:25 GMT+0530 (India Standard Time)",
    product: {
      name: "Bluetooth Speakers",
      category: "Electronics",
      id: "prod_1",
    },
  },
  {
    id: "rat_2",
    rating: 5.0,
    review:
      "This product is great. I love it!  You made it so simple. My new site is so much faster and easier to work with than my old site.",
    user: { name: "Jenny Wilson", image: profile_pic2 },
    productId: "prod_2",
    createdAt: "Sat Jul 19 2025 14:51:25 GMT+0530 (India Standard Time)",
    updatedAt: "Sat Jul 19 2025 14:51:25 GMT+0530 (India Standard Time)",
    product: {
      name: "Bluetooth Speakers",
      category: "Electronics",
      id: "prod_1",
    },
  },
  {
    id: "rat_3",
    rating: 4.1,
    review:
      "This product is amazing. I love it!  You made it so simple. My new site is so much faster and easier to work with than my old site.",
    user: { name: "Bessie Cooper", image: profile_pic3 },
    productId: "prod_3",
    createdAt: "Sat Jul 19 2025 14:51:25 GMT+0530 (India Standard Time)",
    updatedAt: "Sat Jul 19 2025 14:51:25 GMT+0530 (India Standard Time)",
    product: {
      name: "Bluetooth Speakers",
      category: "Electronics",
      id: "prod_1",
    },
  },
  {
    id: "rat_4",
    rating: 5.0,
    review:
      "This product is great. I love it!  You made it so simple. My new site is so much faster and easier to work with than my old site.",
    user: { name: "Kristin Watson", image: profile_pic1 },
    productId: "prod_4",
    createdAt: "Sat Jul 19 2025 14:51:25 GMT+0530 (India Standard Time)",
    updatedAt: "Sat Jul 19 2025 14:51:25 GMT+0530 (India Standard Time)",
    product: {
      name: "Bluetooth Speakers",
      category: "Electronics",
      id: "prod_1",
    },
  },
  {
    id: "rat_5",
    rating: 4.3,
    review:
      "Overall, I'm very happy with this purchase. It works as described and feels durable. The only reason I didn't give it five stars is because of a small issue (such as setup taking a bit longer than expected, or packaging being slightly damaged). Still, highly recommend it for anyone looking for a reliable option.",
    user: { name: "Jenny Wilson", image: profile_pic2 },
    productId: "prod_5",
    createdAt: "Sat Jul 19 2025 14:51:25 GMT+0530 (India Standard Time)",
    updatedAt: "Sat Jul 19 2025 14:51:25 GMT+0530 (India Standard Time)",
    product: {
      name: "Bluetooth Speakers",
      category: "Electronics",
      id: "prod_1",
    },
  },
  {
    id: "rat_6",
    rating: 5.0,
    review:
      "This product is great. I love it!  You made it so simple. My new site is so much faster and easier to work with than my old site.",
    user: { name: "Bessie Cooper", image: profile_pic3 },
    productId: "prod_6",
    createdAt: "Sat Jul 19 2025 14:51:25 GMT+0530 (India Standard Time)",
    updatedAt: "Sat Jul 19 2025 14:51:25 GMT+0530 (India Standard Time)",
    product: {
      name: "Bluetooth Speakers",
      category: "Electronics",
      id: "prod_1",
    },
  },
];

export const ourSpecsData = [
  {
    title: "Free Shipping",
    description:
      "Enjoy fast, free delivery on every order no conditions, just reliable doorstep.",
    icon: SendIcon,
    accent: "#05DF72",
  },
  {
    title: "7 Days easy Return",
    description: "Change your mind? No worries. Return any item within 7 days.",
    icon: ClockFadingIcon,
    accent: "#FF8904",
  },
  {
    title: "24/7 Customer Support",
    description:
      "We're here for you. Get expert help with our customer support.",
    icon: HeadsetIcon,
    accent: "#A684FF",
  },
];
