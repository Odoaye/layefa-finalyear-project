import { Product, Vendor, Review, Order, Transaction, VendorAnalytics } from '../types';

export const vendors: Vendor[] = [
  { id: "v1", name: "TechStore NG", logo: "https://picsum.photos/seed/techstore/100/100", location: "Lagos, Computer Village", rating: 4.8, description: "Premium electronics and gadgets at unbeatable prices. Serving Lagos since 2018.", isVerified: true, joinedDate: "2020-05-12", totalSales: 15420, avgRating: 4.8 },
  { id: "v2", name: "Gadget Hub Abuja", logo: "https://picsum.photos/seed/gadgethub/100/100", location: "Abuja, Wuse 2", rating: 4.5, description: "Your go-to destination for all tech gadgets in Abuja.", isVerified: true, joinedDate: "2021-08-22", totalSales: 8900, avgRating: 4.5 },
  { id: "v3", name: "Naija Deals", logo: "https://picsum.photos/seed/naijadeals/100/100", location: "Port Harcourt, GRA", rating: 4.2, description: "Everyday deals for the budget-conscious Nigerian shopper.", isVerified: false, joinedDate: "2022-11-05", totalSales: 4500, avgRating: 4.2 },
  { id: "v4", name: "Prime Electronics", logo: "https://picsum.photos/seed/primeelec/100/100", location: "Lagos, Ikeja", rating: 4.7, description: "Certified Samsung and Apple dealer. All products come with warranty.", isVerified: true, joinedDate: "2019-03-15", totalSales: 22100, avgRating: 4.7 },
  { id: "v5", name: "ValueShop Kano", logo: "https://picsum.photos/seed/valueshop/100/100", location: "Kano, Sabon Gari", rating: 4.0, description: "Affordable electronics serving northern Nigeria.", isVerified: true, joinedDate: "2022-01-10", totalSales: 3200, avgRating: 4.0 },
  { id: "v6", name: "FastTech Enugu", logo: "https://picsum.photos/seed/fasttech/100/100", location: "Enugu, Independence Layout", rating: 4.3, description: "Quick delivery and genuine products guaranteed.", isVerified: true, joinedDate: "2021-06-20", totalSales: 5600, avgRating: 4.3 },
  { id: "v7", name: "Lagos MegaStore", logo: "https://picsum.photos/seed/megastore/100/100", location: "Lagos, Victoria Island", rating: 4.6, description: "The largest electronics store in Nigeria by product range.", isVerified: true, joinedDate: "2018-09-01", totalSales: 31000, avgRating: 4.6 },
  { id: "v8", name: "PhoneWorld Nigeria", logo: "https://picsum.photos/seed/phoneworld/100/100", location: "Lagos, Alaba International", rating: 4.1, description: "Specialists in smartphones and accessories.", isVerified: false, joinedDate: "2023-02-14", totalSales: 2100, avgRating: 4.1 },
  { id: "v9", name: "Abuja TechMart", logo: "https://picsum.photos/seed/techmart/100/100", location: "Abuja, Garki", rating: 4.4, description: "One-stop shop for all your technology needs in Abuja.", isVerified: true, joinedDate: "2020-11-30", totalSales: 7800, avgRating: 4.4 },
  { id: "v10", name: "Delta Gadgets", logo: "https://picsum.photos/seed/deltagadget/100/100", location: "Warri, Delta State", rating: 3.9, description: "Serving the Niger Delta region with quality electronics.", isVerified: false, joinedDate: "2023-05-01", totalSales: 1400, avgRating: 3.9 },
  { id: "v11", name: "ApexStore PHC", logo: "https://picsum.photos/seed/apexstore/100/100", location: "Port Harcourt, D-Line", rating: 4.5, description: "Premium electronics with same-day delivery in Port Harcourt.", isVerified: true, joinedDate: "2020-08-19", totalSales: 9300, avgRating: 4.5 },
  { id: "v12", name: "UniTech Ibadan", logo: "https://picsum.photos/seed/unitech/100/100", location: "Ibadan, Bodija", rating: 4.2, description: "Student-friendly electronics and accessories at fair prices.", isVerified: true, joinedDate: "2021-04-25", totalSales: 4100, avgRating: 4.2 },
];

export const products: Product[] = [
  {
    id: "p1", name: "HP EliteBook 840 G9", category: "Computers",
    description: "A high-performance business laptop with Intel Core i7, 16GB RAM, and 512GB SSD. Perfect for enterprise use.",
    specs: { "Processor": "Intel Core i7-1265U", "RAM": "16GB DDR5", "Storage": "512GB NVMe SSD", "Display": "14\" FHD IPS", "OS": "Windows 11 Pro", "Battery": "56Whr", "Weight": "1.4kg" },
    images: ["https://picsum.photos/seed/hpelite1/600/500", "https://picsum.photos/seed/hpelite2/600/500", "https://picsum.photos/seed/hpelite3/600/500"],
    vendorListings: [
      { vendorId: "v1", price: 450000, stock: 10, shippingDays: 2 },
      { vendorId: "v2", price: 420000, stock: 5, shippingDays: 3 },
      { vendorId: "v3", price: 390000, stock: 2, shippingDays: 4, isHighlighted: true },
      { vendorId: "v7", price: 445000, stock: 8, shippingDays: 1 },
    ],
    avgRating: 4.6, reviewCount: 120, tags: ["laptop", "business", "hp", "intel"]
  },
  {
    id: "p2", name: "Apple iPhone 15 Pro 256GB", category: "Phones & Tablets",
    description: "The latest iPhone with titanium design, A17 Pro chip, and a 48MP main camera system.",
    specs: { "Chip": "A17 Pro", "Storage": "256GB", "Display": "6.1\" Super Retina XDR", "Camera": "48MP + 12MP + 12MP", "Color": "Natural Titanium", "Battery": "3274 mAh", "OS": "iOS 17" },
    images: ["https://picsum.photos/seed/iphone15a/600/500", "https://picsum.photos/seed/iphone15b/600/500", "https://picsum.photos/seed/iphone15c/600/500"],
    vendorListings: [
      { vendorId: "v1", price: 950000, stock: 20, shippingDays: 1 },
      { vendorId: "v4", price: 920000, stock: 15, shippingDays: 2 },
      { vendorId: "v7", price: 880000, stock: 7, shippingDays: 1 },
      { vendorId: "v8", price: 850000, stock: 3, shippingDays: 5, isHighlighted: true },
    ],
    avgRating: 4.9, reviewCount: 340, tags: ["apple", "iphone", "smartphone", "5g"]
  },
  {
    id: "p3", name: "Samsung 65\" QLED 4K Smart TV", category: "Electronics",
    description: "Quantum Dot technology delivers vivid, true-to-life colors. Smart TV with built-in Netflix, YouTube, and more.",
    specs: { "Size": "65 inches", "Resolution": "4K UHD", "Technology": "QLED", "HDR": "HDR10+", "Refresh Rate": "120Hz", "Smart TV": "Tizen OS", "Ports": "4x HDMI, 2x USB" },
    images: ["https://picsum.photos/seed/samtv65a/600/500", "https://picsum.photos/seed/samtv65b/600/500"],
    vendorListings: [
      { vendorId: "v7", price: 680000, stock: 5, shippingDays: 3 },
      { vendorId: "v4", price: 650000, stock: 3, shippingDays: 4 },
      { vendorId: "v1", price: 625000, stock: 2, shippingDays: 2, isHighlighted: true },
    ],
    avgRating: 4.7, reviewCount: 89, tags: ["samsung", "tv", "qled", "4k", "smart-tv"]
  },
  {
    id: "p4", name: "Sony PlayStation 5 Console", category: "Gaming",
    description: "Next-gen gaming with ultra-high speed SSD, haptic feedback controller, and 4K gaming support.",
    specs: { "CPU": "AMD Zen 2 8-core", "GPU": "AMD RDNA 2", "Storage": "825GB SSD", "Resolution": "Up to 8K", "Frame Rate": "Up to 120fps", "Optical Drive": "Yes", "Controller": "DualSense included" },
    images: ["https://picsum.photos/seed/ps5a/600/500", "https://picsum.photos/seed/ps5b/600/500", "https://picsum.photos/seed/ps5c/600/500"],
    vendorListings: [
      { vendorId: "v1", price: 580000, stock: 3, shippingDays: 2 },
      { vendorId: "v7", price: 560000, stock: 5, shippingDays: 1 },
      { vendorId: "v4", price: 545000, stock: 8, shippingDays: 3 },
      { vendorId: "v9", price: 530000, stock: 2, shippingDays: 4, isHighlighted: true },
    ],
    avgRating: 4.8, reviewCount: 210, tags: ["sony", "ps5", "gaming", "console"]
  },
  {
    id: "p5", name: "Apple MacBook Air M2 13\"", category: "Computers",
    description: "Supercharged by the next-generation M2 chip. Fanless design, all-day battery life, and stunning Liquid Retina display.",
    specs: { "Chip": "Apple M2", "RAM": "8GB Unified", "Storage": "256GB SSD", "Display": "13.6\" Liquid Retina", "Battery": "Up to 18hrs", "Weight": "1.24kg", "Color": "Midnight" },
    images: ["https://picsum.photos/seed/macbookm2a/600/500", "https://picsum.photos/seed/macbookm2b/600/500"],
    vendorListings: [
      { vendorId: "v1", price: 1100000, stock: 6, shippingDays: 2 },
      { vendorId: "v4", price: 1050000, stock: 4, shippingDays: 3 },
      { vendorId: "v7", price: 1020000, stock: 2, shippingDays: 1, isHighlighted: true },
    ],
    avgRating: 4.9, reviewCount: 178, tags: ["apple", "macbook", "m2", "laptop"]
  },
  {
    id: "p6", name: "Samsung Galaxy S24 Ultra", category: "Phones & Tablets",
    description: "The ultimate Galaxy experience with built-in S Pen, 200MP camera, and 6.8\" Dynamic AMOLED display.",
    specs: { "Processor": "Snapdragon 8 Gen 3", "RAM": "12GB", "Storage": "256GB", "Camera": "200MP + 12MP + 10MP + 10MP", "Display": "6.8\" Dynamic AMOLED", "Battery": "5000mAh", "S Pen": "Yes" },
    images: ["https://picsum.photos/seed/s24ultra1/600/500", "https://picsum.photos/seed/s24ultra2/600/500", "https://picsum.photos/seed/s24ultra3/600/500"],
    vendorListings: [
      { vendorId: "v4", price: 820000, stock: 12, shippingDays: 2 },
      { vendorId: "v1", price: 790000, stock: 8, shippingDays: 1 },
      { vendorId: "v9", price: 760000, stock: 5, shippingDays: 3, isHighlighted: true },
    ],
    avgRating: 4.7, reviewCount: 295, tags: ["samsung", "galaxy", "s24", "s-pen"]
  },
  {
    id: "p7", name: "Dell XPS 15 9530", category: "Computers",
    description: "Premium laptop with OLED display, 13th Gen Intel Core i9, and RTX 4060 graphics for creatives and professionals.",
    specs: { "Processor": "Intel Core i9-13900H", "RAM": "32GB", "Storage": "1TB SSD", "Display": "15.6\" OLED 3.5K", "GPU": "RTX 4060 8GB", "Battery": "86Whr", "OS": "Windows 11 Pro" },
    images: ["https://picsum.photos/seed/dellxps1/600/500", "https://picsum.photos/seed/dellxps2/600/500"],
    vendorListings: [
      { vendorId: "v1", price: 1450000, stock: 3, shippingDays: 3 },
      { vendorId: "v7", price: 1380000, stock: 2, shippingDays: 2 },
      { vendorId: "v6", price: 1350000, stock: 1, shippingDays: 5, isHighlighted: true },
    ],
    avgRating: 4.8, reviewCount: 67, tags: ["dell", "xps", "laptop", "oled", "gaming"]
  },
  {
    id: "p8", name: "Dyson V15 Detect Vacuum", category: "Home & Kitchen",
    description: "Intelligent vacuum that automatically adapts suction to reveal hidden dust. Laser-powered detection technology.",
    specs: { "Power": "240 AW", "Runtime": "Up to 60 mins", "HEPA Filter": "Yes", "Weight": "3.1kg", "Noise": "71dB", "Bin Volume": "0.77L", "Includes": "7 accessories" },
    images: ["https://picsum.photos/seed/dysonv15a/600/500", "https://picsum.photos/seed/dysonv15b/600/500"],
    vendorListings: [
      { vendorId: "v7", price: 380000, stock: 4, shippingDays: 2 },
      { vendorId: "v1", price: 365000, stock: 3, shippingDays: 3 },
      { vendorId: "v11", price: 350000, stock: 2, shippingDays: 4, isHighlighted: true },
    ],
    avgRating: 4.6, reviewCount: 43, tags: ["dyson", "vacuum", "cleaner", "home"]
  },
  {
    id: "p9", name: "Nike Air Max 270 React", category: "Fashion",
    description: "Engineered for all-day comfort with the largest Air unit in Nike history and React foam cushioning.",
    specs: { "Sizes": "UK 6-12", "Colors": "Black/White, Triple White, University Red", "Material": "Mesh + Synthetic", "Sole": "React foam + Air unit", "Closure": "Lace-up", "Gender": "Unisex" },
    images: ["https://picsum.photos/seed/nikeam270a/600/500", "https://picsum.photos/seed/nikeam270b/600/500", "https://picsum.photos/seed/nikeam270c/600/500"],
    vendorListings: [
      { vendorId: "v3", price: 68000, stock: 30, shippingDays: 3 },
      { vendorId: "v12", price: 62000, stock: 20, shippingDays: 4 },
      { vendorId: "v5", price: 55000, stock: 15, shippingDays: 5, isHighlighted: true },
    ],
    avgRating: 4.5, reviewCount: 186, tags: ["nike", "sneakers", "shoes", "airmax"]
  },
  {
    id: "p10", name: "iPad Pro 12.9\" M2 WiFi 256GB", category: "Phones & Tablets",
    description: "The ultimate iPad with M2 chip, Liquid Retina XDR display, and support for Apple Pencil 2 and Magic Keyboard.",
    specs: { "Chip": "Apple M2", "Display": "12.9\" Liquid Retina XDR", "Storage": "256GB", "Camera": "12MP Wide + 10MP Ultra Wide", "Face ID": "Yes", "Battery": "Up to 10hrs", "Connectivity": "WiFi 6E" },
    images: ["https://picsum.photos/seed/ipadpro1/600/500", "https://picsum.photos/seed/ipadpro2/600/500"],
    vendorListings: [
      { vendorId: "v4", price: 730000, stock: 6, shippingDays: 2 },
      { vendorId: "v1", price: 710000, stock: 4, shippingDays: 1 },
      { vendorId: "v9", price: 690000, stock: 3, shippingDays: 3, isHighlighted: true },
    ],
    avgRating: 4.8, reviewCount: 132, tags: ["apple", "ipad", "tablet", "m2"]
  },
  {
    id: "p11", name: "Sony WH-1000XM5 Headphones", category: "Electronics",
    description: "Industry-leading noise cancellation with Auto NC Optimizer and 30-hour battery. Crystal clear hands-free calling.",
    specs: { "Noise Cancelling": "Yes - Auto NC", "Battery": "30 hours", "Charging": "USB-C, 3 min = 3 hrs", "Bluetooth": "5.2", "Weight": "250g", "Colors": "Black, Silver", "Foldable": "No" },
    images: ["https://picsum.photos/seed/sonywh1a/600/500", "https://picsum.photos/seed/sonywh1b/600/500"],
    vendorListings: [
      { vendorId: "v1", price: 285000, stock: 15, shippingDays: 2 },
      { vendorId: "v7", price: 270000, stock: 10, shippingDays: 1 },
      { vendorId: "v2", price: 255000, stock: 8, shippingDays: 3, isHighlighted: true },
    ],
    avgRating: 4.7, reviewCount: 224, tags: ["sony", "headphones", "noise-cancelling", "wireless"]
  },
  {
    id: "p12", name: "Canon EOS R50 Mirrorless Camera", category: "Electronics",
    description: "Compact and lightweight mirrorless camera with 24.2MP APS-C sensor and subject-tracking autofocus.",
    specs: { "Sensor": "24.2MP APS-C CMOS", "AF System": "Dual Pixel CMOS AF II", "Video": "4K 30fps", "ISO": "100-32000", "Screen": "3\" Vari-Angle Touch LCD", "Battery": "~380 shots", "Kit Lens": "18-45mm" },
    images: ["https://picsum.photos/seed/canonr50a/600/500", "https://picsum.photos/seed/canonr50b/600/500"],
    vendorListings: [
      { vendorId: "v7", price: 520000, stock: 5, shippingDays: 3 },
      { vendorId: "v1", price: 495000, stock: 4, shippingDays: 2 },
      { vendorId: "v9", price: 480000, stock: 2, shippingDays: 4, isHighlighted: true },
    ],
    avgRating: 4.6, reviewCount: 55, tags: ["canon", "camera", "mirrorless", "photography"]
  },
  {
    id: "p13", name: "Samsung Galaxy A54 5G 256GB", category: "Phones & Tablets",
    description: "Mid-range powerhouse with 50MP camera, 5000mAh battery, and smooth 120Hz Super AMOLED display.",
    specs: { "Processor": "Exynos 1380", "RAM": "8GB", "Storage": "256GB", "Camera": "50MP + 12MP + 5MP", "Display": "6.4\" Super AMOLED 120Hz", "Battery": "5000mAh", "OS": "Android 13" },
    images: ["https://picsum.photos/seed/a54a/600/500", "https://picsum.photos/seed/a54b/600/500"],
    vendorListings: [
      { vendorId: "v8", price: 265000, stock: 20, shippingDays: 2 },
      { vendorId: "v5", price: 248000, stock: 15, shippingDays: 4 },
      { vendorId: "v3", price: 235000, stock: 10, shippingDays: 5, isHighlighted: true },
    ],
    avgRating: 4.4, reviewCount: 312, tags: ["samsung", "galaxy", "5g", "android"]
  },
  {
    id: "p14", name: "LG 55\" OLED C3 TV", category: "Electronics",
    description: "Self-lit OLED pixels deliver perfect black and infinite contrast. Ideal for movies, sports, and gaming.",
    specs: { "Size": "55 inches", "Technology": "OLED evo", "Resolution": "4K UHD", "HDR": "Dolby Vision, HDR10", "Refresh Rate": "120Hz", "Gaming": "G-Sync, FreeSync", "Smart TV": "webOS 23" },
    images: ["https://picsum.photos/seed/lgoled1/600/500", "https://picsum.photos/seed/lgoled2/600/500"],
    vendorListings: [
      { vendorId: "v7", price: 720000, stock: 3, shippingDays: 3 },
      { vendorId: "v4", price: 695000, stock: 2, shippingDays: 4 },
      { vendorId: "v1", price: 670000, stock: 1, shippingDays: 2, isHighlighted: true },
    ],
    avgRating: 4.8, reviewCount: 78, tags: ["lg", "oled", "tv", "4k", "dolby"]
  },
  {
    id: "p15", name: "Lenovo ThinkPad X1 Carbon Gen 11", category: "Computers",
    description: "Ultra-lightweight business laptop (1.12kg) with vPro security, 13th Gen Intel Core i7, and carbon fiber chassis.",
    specs: { "Processor": "Intel Core i7-1365U vPro", "RAM": "16GB LPDDR5", "Storage": "512GB SSD", "Display": "14\" IPS 2.8K OLED", "Battery": "Up to 15hrs", "Weight": "1.12kg", "Security": "TPM 2.0, IR Camera" },
    images: ["https://picsum.photos/seed/thinkpadx1a/600/500", "https://picsum.photos/seed/thinkpadx1b/600/500"],
    vendorListings: [
      { vendorId: "v1", price: 980000, stock: 4, shippingDays: 3 },
      { vendorId: "v7", price: 945000, stock: 3, shippingDays: 2 },
      { vendorId: "v6", price: 920000, stock: 1, shippingDays: 5, isHighlighted: true },
    ],
    avgRating: 4.7, reviewCount: 41, tags: ["lenovo", "thinkpad", "business", "laptop", "oled"]
  },
  {
    id: "p16", name: "Apple AirPods Pro 2nd Gen", category: "Electronics",
    description: "Up to 2x more Active Noise Cancellation than the previous generation. Adaptive Transparency mode.",
    specs: { "Noise Cancellation": "Yes - Adaptive", "Transparency Mode": "Yes - Adaptive", "Battery ANC on": "6 hours (30 with case)", "Charging": "MagSafe, Lightning, Qi", "Chip": "Apple H2", "Water Resistance": "IPX4", "Spatial Audio": "Yes" },
    images: ["https://picsum.photos/seed/airpodspro2a/600/500", "https://picsum.photos/seed/airpodspro2b/600/500"],
    vendorListings: [
      { vendorId: "v4", price: 195000, stock: 25, shippingDays: 1 },
      { vendorId: "v1", price: 185000, stock: 20, shippingDays: 2 },
      { vendorId: "v9", price: 178000, stock: 12, shippingDays: 3, isHighlighted: true },
    ],
    avgRating: 4.8, reviewCount: 456, tags: ["apple", "airpods", "earbuds", "anc"]
  },
  {
    id: "p17", name: "Asus ROG Zephyrus G14 Gaming Laptop", category: "Computers",
    description: "Compact gaming powerhouse with Ryzen 9, RTX 4090, and a stunning 14\" QHD+ display with 165Hz.",
    specs: { "Processor": "AMD Ryzen 9 7940HS", "GPU": "RTX 4090 16GB", "RAM": "16GB DDR5", "Storage": "1TB SSD", "Display": "14\" QHD+ 165Hz", "Battery": "76Whr", "Weight": "1.65kg" },
    images: ["https://picsum.photos/seed/rogg14a/600/500", "https://picsum.photos/seed/rogg14b/600/500"],
    vendorListings: [
      { vendorId: "v7", price: 1850000, stock: 2, shippingDays: 3 },
      { vendorId: "v1", price: 1790000, stock: 3, shippingDays: 2, isHighlighted: true },
    ],
    avgRating: 4.9, reviewCount: 34, tags: ["asus", "rog", "gaming", "laptop", "rtx4090"]
  },
  {
    id: "p18", name: "GoPro HERO12 Black", category: "Electronics",
    description: "Capture life in 5.3K video with Max Lens Mod 2.0 and HyperSmooth 6.0 stabilization.",
    specs: { "Video": "5.3K60 + 4K120", "Photo": "27MP", "Stabilization": "HyperSmooth 6.0", "Battery": "2-3 hours", "Waterproof": "10m without housing", "Connectivity": "WiFi, Bluetooth", "Display": "1.4\" Rear LCD" },
    images: ["https://picsum.photos/seed/gopro12a/600/500", "https://picsum.photos/seed/gopro12b/600/500"],
    vendorListings: [
      { vendorId: "v1", price: 235000, stock: 8, shippingDays: 2 },
      { vendorId: "v7", price: 225000, stock: 6, shippingDays: 1 },
      { vendorId: "v11", price: 215000, stock: 4, shippingDays: 4, isHighlighted: true },
    ],
    avgRating: 4.6, reviewCount: 97, tags: ["gopro", "action-camera", "waterproof", "4k"]
  },
  {
    id: "p19", name: "Hisense 85\" 4K ULED Smart TV", category: "Electronics",
    description: "Giant 85\" screen with ULED local dimming and Dolby Atmos audio for a cinema experience at home.",
    specs: { "Size": "85 inches", "Resolution": "4K UHD", "Technology": "ULED", "Dimming Zones": "1000+", "Audio": "Dolby Atmos 50W", "Smart TV": "VIDAA U6", "Ports": "4x HDMI 2.1, 3x USB" },
    images: ["https://picsum.photos/seed/hisense85a/600/500", "https://picsum.photos/seed/hisense85b/600/500"],
    vendorListings: [
      { vendorId: "v7", price: 1100000, stock: 2, shippingDays: 4 },
      { vendorId: "v4", price: 1050000, stock: 1, shippingDays: 5 },
      { vendorId: "v1", price: 990000, stock: 1, shippingDays: 3, isHighlighted: true },
    ],
    avgRating: 4.5, reviewCount: 29, tags: ["hisense", "tv", "85inch", "uled", "4k"]
  },
  {
    id: "p20", name: "Xiaomi Redmi Note 13 Pro+ 5G", category: "Phones & Tablets",
    description: "200MP main camera, 120W HyperCharge, and a 6.67\" curved AMOLED display in a premium glass design.",
    specs: { "Processor": "Dimensity 7200 Ultra", "RAM": "12GB", "Storage": "256GB", "Camera": "200MP + 8MP + 2MP", "Display": "6.67\" Curved AMOLED 120Hz", "Battery": "5000mAh 120W", "OS": "HyperOS" },
    images: ["https://picsum.photos/seed/redminote13a/600/500", "https://picsum.photos/seed/redminote13b/600/500"],
    vendorListings: [
      { vendorId: "v3", price: 210000, stock: 25, shippingDays: 3 },
      { vendorId: "v8", price: 195000, stock: 18, shippingDays: 2 },
      { vendorId: "v5", price: 182000, stock: 12, shippingDays: 5, isHighlighted: true },
    ],
    avgRating: 4.4, reviewCount: 198, tags: ["xiaomi", "redmi", "5g", "200mp"]
  },
  {
    id: "p21", name: "Microsoft Xbox Series X", category: "Gaming",
    description: "Next-gen gaming with 12 teraflops of processing power, Quick Resume, and 4K at 60fps (up to 120fps).",
    specs: { "CPU": "AMD Zen 2 8-core", "GPU": "12 Teraflops RDNA 2", "Storage": "1TB SSD", "Resolution": "Up to 8K", "Frame Rate": "Up to 120fps", "Optical Drive": "Yes", "Controller": "Xbox Wireless" },
    images: ["https://picsum.photos/seed/xboxxsa/600/500", "https://picsum.photos/seed/xboxxsb/600/500"],
    vendorListings: [
      { vendorId: "v7", price: 420000, stock: 6, shippingDays: 2 },
      { vendorId: "v1", price: 400000, stock: 4, shippingDays: 3 },
      { vendorId: "v4", price: 385000, stock: 3, shippingDays: 2, isHighlighted: true },
    ],
    avgRating: 4.7, reviewCount: 143, tags: ["microsoft", "xbox", "gaming", "console"]
  },
  {
    id: "p22", name: "Logitech MX Master 3S Wireless Mouse", category: "Computers",
    description: "Advanced wireless mouse with 8000 DPI sensor, MagSpeed scrolling, and electromagnetic scroll wheel.",
    specs: { "DPI": "200-8000", "Battery": "Up to 70 days", "Connectivity": "Bluetooth + USB-A Nano Receiver", "Buttons": "7 programmable", "Weight": "141g", "Scroll Wheel": "MagSpeed Electromagnetic", "Compatible": "Windows, Mac, Linux" },
    images: ["https://picsum.photos/seed/logimx3a/600/500", "https://picsum.photos/seed/logimx3b/600/500"],
    vendorListings: [
      { vendorId: "v1", price: 48000, stock: 30, shippingDays: 2 },
      { vendorId: "v6", price: 44000, stock: 20, shippingDays: 3 },
      { vendorId: "v12", price: 41000, stock: 15, shippingDays: 4, isHighlighted: true },
    ],
    avgRating: 4.8, reviewCount: 287, tags: ["logitech", "mouse", "wireless", "productivity"]
  },
  {
    id: "p23", name: "Adidas Ultraboost 23 Running Shoes", category: "Fashion",
    description: "Boost cushioning returns 40% more energy than standard EVA foam. Continental rubber outsole for wet and dry grip.",
    specs: { "Sizes": "UK 6-13", "Colors": "Core Black, Cloud White, Solar Orange", "Upper": "Primeknit+", "Cushioning": "Boost™ midsole", "Drop": "10mm", "Weight": "310g (UK 8.5)", "Terrain": "Road" },
    images: ["https://picsum.photos/seed/ultraboost23a/600/500", "https://picsum.photos/seed/ultraboost23b/600/500"],
    vendorListings: [
      { vendorId: "v3", price: 72000, stock: 40, shippingDays: 3 },
      { vendorId: "v12", price: 68000, stock: 25, shippingDays: 4 },
      { vendorId: "v5", price: 63000, stock: 20, shippingDays: 5, isHighlighted: true },
    ],
    avgRating: 4.6, reviewCount: 234, tags: ["adidas", "ultraboost", "running", "shoes"]
  },
  {
    id: "p24", name: "Samsung Galaxy Tab S9+ 12.4\"", category: "Phones & Tablets",
    description: "Flagship Android tablet with Snapdragon 8 Gen 2, Dynamic AMOLED 2X display, and S Pen included.",
    specs: { "Processor": "Snapdragon 8 Gen 2", "RAM": "12GB", "Storage": "512GB", "Display": "12.4\" Dynamic AMOLED 2X 120Hz", "S Pen": "Included", "Camera": "13MP + 8MP", "Battery": "10090mAh" },
    images: ["https://picsum.photos/seed/tabs9plus1/600/500", "https://picsum.photos/seed/tabs9plus2/600/500"],
    vendorListings: [
      { vendorId: "v4", price: 640000, stock: 7, shippingDays: 2 },
      { vendorId: "v1", price: 615000, stock: 5, shippingDays: 1 },
      { vendorId: "v7", price: 595000, stock: 3, shippingDays: 2, isHighlighted: true },
    ],
    avgRating: 4.7, reviewCount: 118, tags: ["samsung", "tablet", "s-pen", "amoled"]
  },
  {
    id: "p25", name: "Nikon Z8 Mirrorless Full Frame", category: "Electronics",
    description: "Professional-grade mirrorless camera with 45.7MP stacked BSI CMOS sensor and 8K RAW video.",
    specs: { "Sensor": "45.7MP Full Frame BSI CMOS", "AF Points": "493 phase-detect", "Video": "8K RAW 60fps", "Buffer": "Unlimited JPEG", "Body Weather Seal": "Yes", "Battery": "~700 shots", "Weight": "910g (body only)" },
    images: ["https://picsum.photos/seed/nikonz8a/600/500", "https://picsum.photos/seed/nikonz8b/600/500"],
    vendorListings: [
      { vendorId: "v7", price: 1850000, stock: 2, shippingDays: 4 },
      { vendorId: "v1", price: 1780000, stock: 1, shippingDays: 3, isHighlighted: true },
    ],
    avgRating: 4.9, reviewCount: 22, tags: ["nikon", "mirrorless", "fullframe", "professional"]
  },
  {
    id: "p26", name: "Vitamix 5200 Blender Professional", category: "Home & Kitchen",
    description: "Variable speed control with laser-cut stainless steel blades to process the toughest ingredients.",
    specs: { "Power": "1380W", "Container": "64oz", "Speed": "Variable + Pulse", "Blade": "Hardened SS 4-point", "Programs": "No preset", "Height": "44cm", "Warranty": "7 years" },
    images: ["https://picsum.photos/seed/vitamix5200a/600/500", "https://picsum.photos/seed/vitamix5200b/600/500"],
    vendorListings: [
      { vendorId: "v7", price: 185000, stock: 5, shippingDays: 3 },
      { vendorId: "v11", price: 172000, stock: 4, shippingDays: 4 },
      { vendorId: "v6", price: 160000, stock: 2, shippingDays: 5, isHighlighted: true },
    ],
    avgRating: 4.8, reviewCount: 64, tags: ["vitamix", "blender", "kitchen", "professional"]
  },
  {
    id: "p27", name: "Apple Watch Series 9 GPS 45mm", category: "Electronics",
    description: "Smarter, brighter, and more powerful. Double tap gesture, precision finding, and new S9 SiP chip.",
    specs: { "Chip": "Apple S9 SiP", "Display": "45mm Always-On Retina", "GPS": "Yes", "Health Sensors": "ECG, Blood Oxygen", "Battery": "Up to 18hrs", "Water Resistance": "WR50", "Strap": "Sport Band" },
    images: ["https://picsum.photos/seed/appwatch9a/600/500", "https://picsum.photos/seed/appwatch9b/600/500"],
    vendorListings: [
      { vendorId: "v4", price: 310000, stock: 18, shippingDays: 1 },
      { vendorId: "v1", price: 295000, stock: 12, shippingDays: 2 },
      { vendorId: "v9", price: 280000, stock: 8, shippingDays: 3, isHighlighted: true },
    ],
    avgRating: 4.7, reviewCount: 382, tags: ["apple", "watch", "smartwatch", "fitness"]
  },
  {
    id: "p28", name: "Bose QuietComfort 45 Headphones", category: "Electronics",
    description: "Acoustic Noise Cancelling technology and clear phone calls with a high-sensitivity microphone.",
    specs: { "Noise Cancelling": "Yes - Acoustic NC", "Battery": "24 hours", "Quick Charge": "15 min = 3 hrs", "Bluetooth": "5.1", "Weight": "238g", "Colors": "Black, White Smoke", "Foldable": "Yes" },
    images: ["https://picsum.photos/seed/boseqc45a/600/500", "https://picsum.photos/seed/boseqc45b/600/500"],
    vendorListings: [
      { vendorId: "v1", price: 220000, stock: 10, shippingDays: 2 },
      { vendorId: "v7", price: 208000, stock: 8, shippingDays: 1 },
      { vendorId: "v2", price: 195000, stock: 5, shippingDays: 3, isHighlighted: true },
    ],
    avgRating: 4.6, reviewCount: 175, tags: ["bose", "headphones", "noise-cancelling", "wireless"]
  },
  {
    id: "p29", name: "Standing Desk Electric Height Adjustable", category: "Home & Kitchen",
    description: "Motorized standing desk with memory settings, anti-collision, and bamboo or MDF top options.",
    specs: { "Height Range": "61-127cm", "Speed": "35mm/s", "Noise": "<50dB", "Load Capacity": "80kg", "Memory Settings": "4", "Motor": "Dual motor", "Top Size": "120x60cm or 140x70cm" },
    images: ["https://picsum.photos/seed/standdesk1/600/500", "https://picsum.photos/seed/standdesk2/600/500"],
    vendorListings: [
      { vendorId: "v7", price: 145000, stock: 8, shippingDays: 5 },
      { vendorId: "v6", price: 132000, stock: 5, shippingDays: 6 },
      { vendorId: "v12", price: 120000, stock: 3, shippingDays: 7, isHighlighted: true },
    ],
    avgRating: 4.4, reviewCount: 48, tags: ["desk", "standing-desk", "office", "ergonomic"]
  },
  {
    id: "p30", name: "Kindle Paperwhite 16GB Signature Edition", category: "Books",
    description: "300 ppi glare-free display, wireless charging, auto-adjusting front light, and up to 3 months of battery.",
    specs: { "Display": "6.8\" 300ppi Paperwhite", "Storage": "16GB", "Lighting": "25 LED adjustable", "Battery": "Up to 12 weeks", "Charging": "USB-C + Wireless", "Waterproof": "IPX8", "Connectivity": "WiFi 5" },
    images: ["https://picsum.photos/seed/kindlepwa/600/500", "https://picsum.photos/seed/kindlepwb/600/500"],
    vendorListings: [
      { vendorId: "v7", price: 92000, stock: 20, shippingDays: 2 },
      { vendorId: "v6", price: 87000, stock: 15, shippingDays: 3 },
      { vendorId: "v12", price: 82000, stock: 10, shippingDays: 4, isHighlighted: true },
    ],
    avgRating: 4.7, reviewCount: 143, tags: ["kindle", "ereader", "amazon", "books"]
  },
  {
    id: "p31", name: "Garmin Fenix 7S Solar Smartwatch", category: "Sports",
    description: "Multi-sport GPS smartwatch with solar charging, mapping, and training load analysis for serious athletes.",
    specs: { "GPS": "Multi-constellation", "Solar": "Yes", "Battery": "Up to 18 days (solar)", "Display": "1.2\" MIP", "Water Rating": "10 ATM", "Sensors": "HR, SpO2, Altimeter, Compass", "Storage": "32GB music" },
    images: ["https://picsum.photos/seed/garminf7sa/600/500", "https://picsum.photos/seed/garminf7sb/600/500"],
    vendorListings: [
      { vendorId: "v1", price: 480000, stock: 4, shippingDays: 3 },
      { vendorId: "v9", price: 455000, stock: 3, shippingDays: 4 },
      { vendorId: "v7", price: 440000, stock: 2, shippingDays: 2, isHighlighted: true },
    ],
    avgRating: 4.8, reviewCount: 67, tags: ["garmin", "watch", "gps", "sports", "running"]
  },
  {
    id: "p32", name: "Philips Hue Starter Kit A19 4-Pack", category: "Home & Kitchen",
    description: "Smart LED bulbs with 16 million colors. Control with app or voice (Alexa, Google, Siri).",
    specs: { "Bulbs": "4x A19 E27", "Lumens": "800lm each", "Colors": "16 million", "Connectivity": "Zigbee + WiFi", "Dimming": "1-100%", "Lifespan": "25,000 hrs", "Includes": "Hue Bridge" },
    images: ["https://picsum.photos/seed/philipshue1/600/500", "https://picsum.photos/seed/philipshue2/600/500"],
    vendorListings: [
      { vendorId: "v7", price: 68000, stock: 15, shippingDays: 2 },
      { vendorId: "v11", price: 62000, stock: 10, shippingDays: 3 },
      { vendorId: "v6", price: 58000, stock: 8, shippingDays: 4, isHighlighted: true },
    ],
    avgRating: 4.5, reviewCount: 92, tags: ["philips", "hue", "smart-home", "led", "lights"]
  },
  {
    id: "p33", name: "DJI Mini 4 Pro Drone", category: "Electronics",
    description: "Under 249g with 4K/60fps video, 48MP RAW photo, and OmniDirectional obstacle sensing.",
    specs: { "Weight": "249g", "Camera": "48MP 1/1.3\" CMOS", "Video": "4K 60fps HDR", "Flight Time": "34 min", "Range": "20km (RC 2)", "Wind Resistance": "Level 5", "Obstacle Sensing": "Omnidirectional" },
    images: ["https://picsum.photos/seed/djimini4a/600/500", "https://picsum.photos/seed/djimini4b/600/500"],
    vendorListings: [
      { vendorId: "v1", price: 575000, stock: 5, shippingDays: 3 },
      { vendorId: "v7", price: 545000, stock: 4, shippingDays: 2 },
      { vendorId: "v9", price: 525000, stock: 2, shippingDays: 4, isHighlighted: true },
    ],
    avgRating: 4.8, reviewCount: 56, tags: ["dji", "drone", "4k", "photography"]
  },
  {
    id: "p34", name: "Corsair K95 RGB Platinum XT Keyboard", category: "Gaming",
    description: "Mechanical gaming keyboard with Cherry MX Speed switches, per-key RGB backlighting, and dedicated macro keys.",
    specs: { "Switches": "Cherry MX Speed", "Backlighting": "Per-key RGB", "Macro Keys": "6 dedicated G keys", "Wrist Rest": "Leatherette included", "Connectivity": "USB-A", "Anti-Ghosting": "100% KRO", "Media Keys": "Dedicated" },
    images: ["https://picsum.photos/seed/corsairk95a/600/500", "https://picsum.photos/seed/corsairk95b/600/500"],
    vendorListings: [
      { vendorId: "v1", price: 78000, stock: 12, shippingDays: 2 },
      { vendorId: "v7", price: 73000, stock: 8, shippingDays: 3 },
      { vendorId: "v6", price: 68000, stock: 5, shippingDays: 4, isHighlighted: true },
    ],
    avgRating: 4.7, reviewCount: 112, tags: ["corsair", "keyboard", "mechanical", "gaming", "rgb"]
  },
  {
    id: "p35", name: "Instant Pot Pro 8Qt Electric Pressure Cooker", category: "Home & Kitchen",
    description: "10-in-1 multi-use cooker: pressure cooker, slow cooker, rice cooker, steamer, sauté pan, and more.",
    specs: { "Capacity": "8 Quarts", "Programs": "28 Smart Programs", "Pressure": "Up to 15psi", "Material": "Stainless Steel", "Safety": "10 safety mechanisms", "Display": "LED touch panel", "Watts": "1200W" },
    images: ["https://picsum.photos/seed/instantpot8a/600/500", "https://picsum.photos/seed/instantpot8b/600/500"],
    vendorListings: [
      { vendorId: "v7", price: 68000, stock: 20, shippingDays: 3 },
      { vendorId: "v11", price: 63000, stock: 15, shippingDays: 4 },
      { vendorId: "v6", price: 58000, stock: 10, shippingDays: 5, isHighlighted: true },
    ],
    avgRating: 4.6, reviewCount: 201, tags: ["instant-pot", "pressure-cooker", "kitchen", "cooking"]
  },
  {
    id: "p36", name: "Huawei MateBook D15 i5 8GB", category: "Computers",
    description: "Thin and light laptop with fingerprint power button, full-view display, and fast charging.",
    specs: { "Processor": "Intel Core i5-1155G7", "RAM": "8GB", "Storage": "512GB SSD", "Display": "15.6\" FHD IPS", "Battery": "56Whr ~10hrs", "Weight": "1.56kg", "OS": "Windows 11 Home" },
    images: ["https://picsum.photos/seed/huaweimate15a/600/500", "https://picsum.photos/seed/huaweimate15b/600/500"],
    vendorListings: [
      { vendorId: "v5", price: 295000, stock: 10, shippingDays: 4 },
      { vendorId: "v3", price: 278000, stock: 8, shippingDays: 5 },
      { vendorId: "v10", price: 260000, stock: 5, shippingDays: 6, isHighlighted: true },
    ],
    avgRating: 4.3, reviewCount: 88, tags: ["huawei", "matebook", "laptop", "student"]
  },
  {
    id: "p37", name: "Vitamix 750 Heritage Pro Blender", category: "Home & Kitchen",
    description: "Self-cleaning, 64oz container, 5 program settings for smoothies, frozen desserts, hot soups, and more.",
    specs: { "Power": "1440W", "Container": "64oz", "Speed": "10-speed variable + 5 programs", "Blade": "Hardened SS 4-point", "Noise": "High", "Height": "45cm", "Warranty": "10 years" },
    images: ["https://picsum.photos/seed/vitamix750a/600/500", "https://picsum.photos/seed/vitamix750b/600/500"],
    vendorListings: [
      { vendorId: "v7", price: 245000, stock: 4, shippingDays: 3 },
      { vendorId: "v11", price: 228000, stock: 3, shippingDays: 4 },
      { vendorId: "v6", price: 215000, stock: 2, shippingDays: 5, isHighlighted: true },
    ],
    avgRating: 4.8, reviewCount: 39, tags: ["vitamix", "blender", "professional", "kitchen"]
  },
  {
    id: "p38", name: "Fitbit Charge 6 Fitness Tracker", category: "Sports",
    description: "Track heart rate, sleep, stress, and exercise with built-in GPS and Google Maps compatibility.",
    specs: { "GPS": "Built-in", "Battery": "7 days", "Display": "Color AMOLED", "HR Monitor": "Yes", "SpO2": "Yes", "Water Rating": "50m", "Compatibility": "Android & iOS" },
    images: ["https://picsum.photos/seed/fitbitcharge6a/600/500", "https://picsum.photos/seed/fitbitcharge6b/600/500"],
    vendorListings: [
      { vendorId: "v1", price: 78000, stock: 20, shippingDays: 2 },
      { vendorId: "v9", price: 73000, stock: 15, shippingDays: 3 },
      { vendorId: "v5", price: 68000, stock: 10, shippingDays: 4, isHighlighted: true },
    ],
    avgRating: 4.4, reviewCount: 165, tags: ["fitbit", "fitness", "tracker", "gps", "health"]
  },
  {
    id: "p39", name: "Samsung Galaxy Watch 6 Classic 47mm", category: "Electronics",
    description: "Rotating bezel, BIA body composition, blood pressure monitoring, and advanced sleep coaching.",
    specs: { "Case": "47mm Stainless Steel", "Bezel": "Rotating", "Display": "1.5\" Super AMOLED 480x480", "Battery": "Up to 3 days", "OS": "Wear OS 4 with One UI Watch 6", "Health": "BIA, ECG, Blood Pressure", "Water Rating": "5 ATM + IP68" },
    images: ["https://picsum.photos/seed/samgalaxywatch6a/600/500", "https://picsum.photos/seed/samgalaxywatch6b/600/500"],
    vendorListings: [
      { vendorId: "v4", price: 185000, stock: 12, shippingDays: 2 },
      { vendorId: "v1", price: 175000, stock: 8, shippingDays: 1 },
      { vendorId: "v7", price: 165000, stock: 5, shippingDays: 2, isHighlighted: true },
    ],
    avgRating: 4.6, reviewCount: 147, tags: ["samsung", "smartwatch", "galaxy", "health"]
  },
  {
    id: "p40", name: "Razer DeathAdder V3 Pro Gaming Mouse", category: "Gaming",
    description: "Iconic ergonomic form factor, Focus Pro 30K optical sensor, and 90-hour battery in HyperSpeed wireless.",
    specs: { "DPI": "100-30000", "Sensor": "Focus Pro 30K Optical", "Connectivity": "HyperSpeed Wireless + Bluetooth", "Battery": "Up to 90 hours", "Weight": "64g", "Buttons": "7 programmable", "Polling Rate": "4000Hz wired" },
    images: ["https://picsum.photos/seed/razerda3a/600/500", "https://picsum.photos/seed/razerda3b/600/500"],
    vendorListings: [
      { vendorId: "v1", price: 92000, stock: 8, shippingDays: 2 },
      { vendorId: "v7", price: 88000, stock: 6, shippingDays: 3 },
      { vendorId: "v6", price: 82000, stock: 4, shippingDays: 4, isHighlighted: true },
    ],
    avgRating: 4.8, reviewCount: 93, tags: ["razer", "mouse", "gaming", "wireless"]
  },
  {
    id: "p41", name: "OnePlus 12 5G 256GB", category: "Phones & Tablets",
    description: "Flagship speed with Snapdragon 8 Gen 3, 50MP Hasselblad Triple Camera, and 100W SUPERVOOC charging.",
    specs: { "Processor": "Snapdragon 8 Gen 3", "RAM": "16GB", "Storage": "256GB", "Camera": "50MP + 48MP + 64MP Hasselblad", "Display": "6.82\" LTPO AMOLED 120Hz", "Battery": "5400mAh 100W", "OS": "OxygenOS 14" },
    images: ["https://picsum.photos/seed/oneplus12a/600/500", "https://picsum.photos/seed/oneplus12b/600/500"],
    vendorListings: [
      { vendorId: "v1", price: 395000, stock: 10, shippingDays: 2 },
      { vendorId: "v8", price: 375000, stock: 8, shippingDays: 3 },
      { vendorId: "v3", price: 360000, stock: 5, shippingDays: 5, isHighlighted: true },
    ],
    avgRating: 4.7, reviewCount: 156, tags: ["oneplus", "5g", "hasselblad", "flagship"]
  },
  {
    id: "p42", name: "ASUS ProArt 27\" 4K OLED Monitor", category: "Computers",
    description: "Professional monitor with 240Hz OLED panel, Delta E < 1 factory calibration, and 1ms GtG response.",
    specs: { "Size": "27 inches", "Resolution": "4K UHD 3840x2160", "Panel": "OLED", "Refresh Rate": "240Hz", "Response": "0.1ms GtG", "Color": "DCI-P3 99%, Delta E < 1", "Ports": "2x HDMI 2.1, DP 1.4, 4x USB-A" },
    images: ["https://picsum.photos/seed/asusproart27a/600/500", "https://picsum.photos/seed/asusproart27b/600/500"],
    vendorListings: [
      { vendorId: "v7", price: 695000, stock: 3, shippingDays: 3 },
      { vendorId: "v1", price: 665000, stock: 2, shippingDays: 4 },
      { vendorId: "v9", price: 645000, stock: 1, shippingDays: 5, isHighlighted: true },
    ],
    avgRating: 4.9, reviewCount: 27, tags: ["asus", "monitor", "oled", "4k", "professional"]
  },
  {
    id: "p43", name: "Polo Ralph Lauren Classic Fit Shirt", category: "Fashion",
    description: "Classic polo shirt in 100% cotton piqué fabric. Rib-knit collar and cuffs, signature embroidered pony.",
    specs: { "Material": "100% Cotton Piqué", "Fit": "Classic Fit", "Sizes": "XS-3XL", "Colors": "Navy, White, Red, Green, Yellow, Pink", "Care": "Machine washable", "Brand": "Polo Ralph Lauren" },
    images: ["https://picsum.photos/seed/poloshirta/600/500", "https://picsum.photos/seed/poloshirtb/600/500"],
    vendorListings: [
      { vendorId: "v3", price: 38000, stock: 50, shippingDays: 3 },
      { vendorId: "v12", price: 34000, stock: 35, shippingDays: 4 },
      { vendorId: "v5", price: 30000, stock: 20, shippingDays: 5, isHighlighted: true },
    ],
    avgRating: 4.5, reviewCount: 218, tags: ["polo", "ralph-lauren", "shirt", "fashion"]
  },
  {
    id: "p44", name: "Whey Protein Gold Standard 5lbs", category: "Health & Beauty",
    description: "Optimum Nutrition 100% Whey Protein with 24g of protein per serving. Double Rich Chocolate flavour.",
    specs: { "Protein per Serving": "24g", "Servings": "74", "Flavour": "Double Rich Chocolate", "Weight": "2.27kg (5lbs)", "Protein Source": "Whey Isolates + Concentrate", "BCAAs": "5.5g", "Glutamine": "4g" },
    images: ["https://picsum.photos/seed/wheyprotein5a/600/500", "https://picsum.photos/seed/wheyprotein5b/600/500"],
    vendorListings: [
      { vendorId: "v11", price: 58000, stock: 30, shippingDays: 3 },
      { vendorId: "v6", price: 53000, stock: 25, shippingDays: 4 },
      { vendorId: "v12", price: 48000, stock: 20, shippingDays: 5, isHighlighted: true },
    ],
    avgRating: 4.7, reviewCount: 342, tags: ["protein", "whey", "fitness", "supplement"]
  },
  {
    id: "p45", name: "KitchenAid Artisan Stand Mixer 4.8L", category: "Home & Kitchen",
    description: "Iconic stand mixer with 10 speeds, planetary mixing action, and 59 compatible attachments.",
    specs: { "Capacity": "4.8L", "Speeds": "10", "Power": "300W", "Attachments": "59 compatible", "Colors": "20+ colors", "Height": "36cm", "Weight": "11.3kg" },
    images: ["https://picsum.photos/seed/kitchenaida/600/500", "https://picsum.photos/seed/kitchenaidb/600/500"],
    vendorListings: [
      { vendorId: "v7", price: 320000, stock: 6, shippingDays: 3 },
      { vendorId: "v11", price: 298000, stock: 4, shippingDays: 4 },
      { vendorId: "v6", price: 285000, stock: 2, shippingDays: 5, isHighlighted: true },
    ],
    avgRating: 4.8, reviewCount: 176, tags: ["kitchenaid", "mixer", "baking", "kitchen"]
  },
  {
    id: "p46", name: "Motorola Edge 50 Pro 5G", category: "Phones & Tablets",
    description: "Curved pOLED display, 50MP Zeiss-tuned camera, and 125W TurboPower charging for busy professionals.",
    specs: { "Processor": "Snapdragon 7s Gen 2", "RAM": "12GB", "Storage": "256GB", "Camera": "50MP Zeiss + 13MP + 10MP", "Display": "6.7\" pOLED 144Hz", "Battery": "4500mAh 125W", "OS": "Android 14" },
    images: ["https://picsum.photos/seed/motorolaedge50a/600/500", "https://picsum.photos/seed/motorolaedge50b/600/500"],
    vendorListings: [
      { vendorId: "v8", price: 285000, stock: 15, shippingDays: 2 },
      { vendorId: "v5", price: 268000, stock: 10, shippingDays: 4 },
      { vendorId: "v3", price: 255000, stock: 8, shippingDays: 5, isHighlighted: true },
    ],
    avgRating: 4.4, reviewCount: 87, tags: ["motorola", "edge", "5g", "zeiss"]
  },
  {
    id: "p47", name: "Anker PowerCore 26800 Portable Charger", category: "Electronics",
    description: "Massive 26800mAh capacity charges iPhone 15 over 6x and Galaxy S24 Ultra 4.5x. Dual input ports.",
    specs: { "Capacity": "26800mAh", "Output Ports": "3x USB-A + 1x USB-C", "Max Output": "65W USB-C", "Input": "Dual micro-USB", "Compatible": "All USB devices", "Safety": "MultiProtect", "Weight": "490g" },
    images: ["https://picsum.photos/seed/ankerpower26a/600/500", "https://picsum.photos/seed/ankerpower26b/600/500"],
    vendorListings: [
      { vendorId: "v1", price: 35000, stock: 40, shippingDays: 2 },
      { vendorId: "v6", price: 32000, stock: 30, shippingDays: 3 },
      { vendorId: "v12", price: 29000, stock: 25, shippingDays: 4, isHighlighted: true },
    ],
    avgRating: 4.6, reviewCount: 412, tags: ["anker", "power-bank", "portable-charger", "usb-c"]
  },
  {
    id: "p48", name: "Herman Miller Aeron Chair Size B", category: "Home & Kitchen",
    description: "The iconic ergonomic chair with 8Z Pellicle suspension, PostureFit SL, and infinite tilt recline.",
    specs: { "Size": "B (Medium)", "Seat Width": "45cm", "Adjustable": "Height, Armrests, Tilt, Lumbar", "Lumbar": "PostureFit SL", "Material": "8Z Pellicle Mesh", "Load": "136kg max", "Warranty": "12 years" },
    images: ["https://picsum.photos/seed/hermanaerona/600/500", "https://picsum.photos/seed/hermanaeronb/600/500"],
    vendorListings: [
      { vendorId: "v7", price: 850000, stock: 2, shippingDays: 5 },
      { vendorId: "v6", price: 820000, stock: 1, shippingDays: 6, isHighlighted: true },
    ],
    avgRating: 4.9, reviewCount: 18, tags: ["herman-miller", "chair", "ergonomic", "office"]
  },
  {
    id: "p49", name: "Tecno Phantom X2 Pro 5G", category: "Phones & Tablets",
    description: "Premium Tecno flagship with retractable portrait lens, 6.8\" AMOLED, and Dimensity 9000 chip.",
    specs: { "Processor": "Dimensity 9000", "RAM": "12GB", "Storage": "512GB", "Camera": "50MP + 50MP Retractable + 13MP", "Display": "6.8\" AMOLED 120Hz", "Battery": "5160mAh 45W", "OS": "HiOS 12" },
    images: ["https://picsum.photos/seed/tecnophantomx2a/600/500", "https://picsum.photos/seed/tecnophantomx2b/600/500"],
    vendorListings: [
      { vendorId: "v3", price: 295000, stock: 12, shippingDays: 3 },
      { vendorId: "v5", price: 278000, stock: 8, shippingDays: 4 },
      { vendorId: "v10", price: 262000, stock: 5, shippingDays: 5, isHighlighted: true },
    ],
    avgRating: 4.3, reviewCount: 124, tags: ["tecno", "phantom", "5g", "african-brand"]
  },
  {
    id: "p50", name: "TP-Link Archer AXE75 WiFi 6E Router", category: "Electronics",
    description: "Tri-band WiFi 6E router with 6GHz band, 2.9Gbps combined speed, and 8 streams for lag-free gaming.",
    specs: { "Standard": "WiFi 6E (802.11axe)", "Bands": "Tri-Band (2.4+5+6GHz)", "Speed": "Up to 4804Mbps 6GHz", "Processor": "1.5GHz Quad-Core", "Ports": "1x 2.5G WAN + 4x Gigabit LAN", "USB": "1x USB 3.0", "Antennas": "8 high-gain" },
    images: ["https://picsum.photos/seed/tplinkax75a/600/500", "https://picsum.photos/seed/tplinkax75b/600/500"],
    vendorListings: [
      { vendorId: "v1", price: 85000, stock: 10, shippingDays: 2 },
      { vendorId: "v6", price: 79000, stock: 8, shippingDays: 3 },
      { vendorId: "v12", price: 74000, stock: 5, shippingDays: 4, isHighlighted: true },
    ],
    avgRating: 4.5, reviewCount: 63, tags: ["tp-link", "router", "wifi6e", "networking"]
  },
  {
    id: "p51", name: "Itel A70 Android 4GB+128GB", category: "Phones & Tablets",
    description: "Budget smartphone with 6.6\" HD+ display, 13MP AI camera, and 5000mAh all-day battery.",
    specs: { "Processor": "Unisoc T606", "RAM": "4GB", "Storage": "128GB", "Camera": "13MP + 2MP", "Display": "6.6\" HD+ 60Hz", "Battery": "5000mAh 10W", "OS": "Android 13 Go" },
    images: ["https://picsum.photos/seed/itela70a/600/500", "https://picsum.photos/seed/itela70b/600/500"],
    vendorListings: [
      { vendorId: "v5", price: 62000, stock: 50, shippingDays: 3 },
      { vendorId: "v10", price: 58000, stock: 35, shippingDays: 4 },
      { vendorId: "v3", price: 54000, stock: 25, shippingDays: 5, isHighlighted: true },
    ],
    avgRating: 4.1, reviewCount: 267, tags: ["itel", "budget", "android", "affordable"]
  },
  {
    id: "p52", name: "Infinix Hot 40 Pro 8GB+256GB", category: "Phones & Tablets",
    description: "Affordable 5G-ready experience with large 6.78\" 90Hz display and triple AI camera setup.",
    specs: { "Processor": "MediaTek Helio G96", "RAM": "8GB", "Storage": "256GB", "Camera": "108MP + 2MP + AI Lens", "Display": "6.78\" HD+ 90Hz", "Battery": "5000mAh 33W", "OS": "XOS 13.6" },
    images: ["https://picsum.photos/seed/infinixhot40a/600/500", "https://picsum.photos/seed/infinixhot40b/600/500"],
    vendorListings: [
      { vendorId: "v8", price: 98000, stock: 40, shippingDays: 2 },
      { vendorId: "v5", price: 92000, stock: 30, shippingDays: 4 },
      { vendorId: "v3", price: 86000, stock: 20, shippingDays: 5, isHighlighted: true },
    ],
    avgRating: 4.2, reviewCount: 189, tags: ["infinix", "hot40", "affordable", "108mp"]
  },
  {
    id: "p53", name: "Ring Video Doorbell 4 Battery", category: "Home & Kitchen",
    description: "HD video doorbell with 1080p, Color Pre-Roll, and improved motion detection. Works with Alexa.",
    specs: { "Video": "1080p HD Color", "Pre-Roll": "Color, 4 seconds", "Field of View": "155° horizontal", "Night Vision": "Yes, Color", "Power": "Rechargeable Battery", "Chime": "Included", "Alexa": "Built-in" },
    images: ["https://picsum.photos/seed/ringdoor4a/600/500", "https://picsum.photos/seed/ringdoor4b/600/500"],
    vendorListings: [
      { vendorId: "v7", price: 95000, stock: 12, shippingDays: 3 },
      { vendorId: "v6", price: 88000, stock: 8, shippingDays: 4 },
      { vendorId: "v11", price: 82000, stock: 5, shippingDays: 4, isHighlighted: true },
    ],
    avgRating: 4.4, reviewCount: 74, tags: ["ring", "doorbell", "security", "smart-home"]
  },
  {
    id: "p54", name: "Oraimo FreePods 4 True Wireless Earbuds", category: "Electronics",
    description: "Active noise cancellation, 30-hour total playtime, and IPX5 water resistance for active users.",
    specs: { "ANC": "Yes", "Total Playtime": "30 hours", "Earbud Battery": "6 hours", "Charging Case": "24 hours", "Water Rating": "IPX5", "Connectivity": "Bluetooth 5.3", "Driver": "11mm" },
    images: ["https://picsum.photos/seed/oraimofp4a/600/500", "https://picsum.photos/seed/oraimofp4b/600/500"],
    vendorListings: [
      { vendorId: "v8", price: 18500, stock: 60, shippingDays: 2 },
      { vendorId: "v5", price: 16800, stock: 45, shippingDays: 3 },
      { vendorId: "v3", price: 15500, stock: 30, shippingDays: 4, isHighlighted: true },
    ],
    avgRating: 4.3, reviewCount: 523, tags: ["oraimo", "earbuds", "anc", "wireless", "african"]
  },
  {
    id: "p55", name: "Thermaltake Tower 900 Full Tower Case", category: "Computers",
    description: "Panoramic tempered glass full tower case with dual E-ATX support and 30cm radiator compatibility.",
    specs: { "Form Factor": "Full Tower", "Motherboard": "Up to E-ATX", "Drive Bays": "6x 3.5\", 6x 2.5\"", "Radiator": "360mm support (front+top+rear)", "Glass Panels": "4-sided Tempered Glass", "Fans": "6x 140mm included", "Weight": "24.5kg" },
    images: ["https://picsum.photos/seed/tt900a/600/500", "https://picsum.photos/seed/tt900b/600/500"],
    vendorListings: [
      { vendorId: "v1", price: 185000, stock: 3, shippingDays: 4 },
      { vendorId: "v7", price: 172000, stock: 2, shippingDays: 5 },
      { vendorId: "v6", price: 162000, stock: 1, shippingDays: 6, isHighlighted: true },
    ],
    avgRating: 4.5, reviewCount: 31, tags: ["thermaltake", "pc-case", "tower", "gaming"]
  },
  {
    id: "p56", name: "Oral-B IO Series 9 Electric Toothbrush", category: "Health & Beauty",
    description: "AI-powered electric toothbrush with 7 modes, pressure sensor, and interactive display.",
    specs: { "Modes": "7 (Clean, Sensitive, Whitening, etc.)", "Battery": "Up to 14 days", "Pressure Sensor": "Yes", "App": "Oral-B app connected", "Charger": "Magnetic charge travel case", "Extras": "2 brush heads included", "AI": "Yes - 3D tracking" },
    images: ["https://picsum.photos/seed/oralb109a/600/500", "https://picsum.photos/seed/oralb109b/600/500"],
    vendorListings: [
      { vendorId: "v7", price: 125000, stock: 8, shippingDays: 3 },
      { vendorId: "v11", price: 118000, stock: 6, shippingDays: 4 },
      { vendorId: "v6", price: 110000, stock: 4, shippingDays: 5, isHighlighted: true },
    ],
    avgRating: 4.6, reviewCount: 96, tags: ["oral-b", "toothbrush", "electric", "health"]
  },
  {
    id: "p57", name: "Jackery Solar Generator 1000 Plus", category: "Electronics",
    description: "Portable power station with 1264Wh capacity, solar charging, and 3000W AC output. Ideal for outages.",
    specs: { "Capacity": "1264Wh", "AC Output": "3000W (6000W surge)", "Solar Input": "400W max", "DC Output": "12V/10A, 4x USB-A", "USB-C": "100W PD", "Battery Type": "LFP", "Weight": "14.4kg" },
    images: ["https://picsum.photos/seed/jackery1000a/600/500", "https://picsum.photos/seed/jackery1000b/600/500"],
    vendorListings: [
      { vendorId: "v7", price: 780000, stock: 3, shippingDays: 4 },
      { vendorId: "v11", price: 748000, stock: 2, shippingDays: 5 },
      { vendorId: "v1", price: 725000, stock: 1, shippingDays: 3, isHighlighted: true },
    ],
    avgRating: 4.7, reviewCount: 28, tags: ["jackery", "solar", "power-station", "generator", "nepa"]
  },
  {
    id: "p58", name: "Reebok Nano X3 Training Shoes", category: "Sports",
    description: "Versatile cross-training shoe built for weightlifting, cardio, and HIIT workouts.",
    specs: { "Sizes": "UK 6-14", "Upper": "Engineered woven mesh", "Midsole": "Float Ride Energy Foam", "Outsole": "Flex-groove rubber", "Drop": "4mm", "Activity": "Cross-Training", "Width": "Standard + Wide available" },
    images: ["https://picsum.photos/seed/reebok-nano-x3a/600/500", "https://picsum.photos/seed/reebok-nano-x3b/600/500"],
    vendorListings: [
      { vendorId: "v3", price: 55000, stock: 30, shippingDays: 3 },
      { vendorId: "v12", price: 50000, stock: 20, shippingDays: 4 },
      { vendorId: "v5", price: 46000, stock: 15, shippingDays: 5, isHighlighted: true },
    ],
    avgRating: 4.5, reviewCount: 139, tags: ["reebok", "training", "crossfit", "shoes"]
  },
  {
    id: "p59", name: "Hisense 55\" A7 Series 4K Smart TV", category: "Electronics",
    description: "Dolby Vision HDR, 60Hz, VIDAA smart TV with voice remote and built-in apps.",
    specs: { "Size": "55 inches", "Resolution": "4K UHD", "HDR": "Dolby Vision, HDR10+", "Refresh Rate": "60Hz", "Smart TV": "VIDAA U6", "Audio": "Dolby Atmos 24W", "Ports": "3x HDMI, 2x USB" },
    images: ["https://picsum.photos/seed/hisense55a7a/600/500", "https://picsum.photos/seed/hisense55a7b/600/500"],
    vendorListings: [
      { vendorId: "v5", price: 265000, stock: 10, shippingDays: 4 },
      { vendorId: "v10", price: 248000, stock: 6, shippingDays: 5 },
      { vendorId: "v3", price: 232000, stock: 4, shippingDays: 6, isHighlighted: true },
    ],
    avgRating: 4.3, reviewCount: 142, tags: ["hisense", "tv", "4k", "dolby", "affordable"]
  },
  {
    id: "p60", name: "Jabra Evolve2 85 ANC Headset", category: "Electronics",
    description: "Professional headset with 37-hour battery, 10-mic call technology, and UC-certified for MS Teams.",
    specs: { "ANC": "Advanced ANC", "Battery": "37 hours", "Mics": "10 mic array", "Connectivity": "Bluetooth 5.0 + USB", "Teams Certified": "Yes", "Charging": "USB-C", "Weight": "340g" },
    images: ["https://picsum.photos/seed/jabraevolve85a/600/500", "https://picsum.photos/seed/jabraevolve85b/600/500"],
    vendorListings: [
      { vendorId: "v1", price: 345000, stock: 5, shippingDays: 3 },
      { vendorId: "v7", price: 328000, stock: 3, shippingDays: 2 },
      { vendorId: "v2", price: 310000, stock: 2, shippingDays: 4, isHighlighted: true },
    ],
    avgRating: 4.7, reviewCount: 44, tags: ["jabra", "headset", "professional", "teams", "anc"]
  },
  {
    id: "p61", name: "Bissell Pet Hair Eraser Lithium Ion Cordless Vacuum", category: "Home & Kitchen",
    description: "Multi-surface cordless stick vacuum with pet hair tangle-free brush roll and 2-in-1 design.",
    specs: { "Power": "Lithium Ion 18V", "Runtime": "Up to 45 mins", "Weight": "2.6kg", "HEPA Filter": "Yes", "Brush Roll": "Tangle-free for pet hair", "Convertible": "2-in-1 Stick + Handheld", "Dust Bin": "0.4L" },
    images: ["https://picsum.photos/seed/bissellerasera/600/500", "https://picsum.photos/seed/bissel-eraserb/600/500"],
    vendorListings: [
      { vendorId: "v7", price: 145000, stock: 7, shippingDays: 3 },
      { vendorId: "v11", price: 135000, stock: 5, shippingDays: 4 },
      { vendorId: "v6", price: 125000, stock: 3, shippingDays: 5, isHighlighted: true },
    ],
    avgRating: 4.4, reviewCount: 58, tags: ["bissell", "vacuum", "pet", "cordless"]
  },
  {
    id: "p62", name: "Nespresso Vertuo Next Premium Coffee Maker", category: "Home & Kitchen",
    description: "Brew single-serve coffee and espresso at the touch of a button with Centrifusion technology.",
    specs: { "Technology": "Centrifusion", "Cup Sizes": "Espresso, Double, Gran Lungo, Mug, Alto", "Water Tank": "1.1L removable", "Heat Up": "35 seconds", "Bluetooth": "Yes", "Compatibility": "Vertuo capsules only", "Capsule Recognition": "RFID barcode" },
    images: ["https://picsum.photos/seed/nespresso-vertuoa/600/500", "https://picsum.photos/seed/nespresso-vertuob/600/500"],
    vendorListings: [
      { vendorId: "v7", price: 92000, stock: 10, shippingDays: 3 },
      { vendorId: "v11", price: 86000, stock: 7, shippingDays: 4 },
      { vendorId: "v6", price: 80000, stock: 4, shippingDays: 5, isHighlighted: true },
    ],
    avgRating: 4.5, reviewCount: 112, tags: ["nespresso", "coffee", "espresso", "kitchen"]
  }
];

export const reviews: Review[] = [
  { id: "r1", productId: "p1", userName: "Chinedu Okafor", rating: 5, comment: "Excellent laptop! Got the best price from Naija Deals. It arrived in perfect condition and the performance is outstanding for my work.", date: "2024-01-15" },
  { id: "r2", productId: "p1", userName: "Amaka Eze", rating: 4, comment: "Good deal. TechStore NG was slightly pricier but delivered in 2 days which was great. Very satisfied with the performance.", date: "2024-01-22" },
  { id: "r3", productId: "p2", userName: "Ibrahim Musa", rating: 5, comment: "The iPhone 15 Pro is worth every kobo! Camera quality is incredible. Found the best deal after comparing all vendors.", date: "2024-02-05" },
  { id: "r4", productId: "p2", userName: "Ngozi Adeyemi", rating: 5, comment: "Absolutely love this phone. The titanium build is premium and the A17 Pro chip is blazing fast. Price comparison saved me ₦100,000!", date: "2024-02-10" },
  { id: "r5", productId: "p3", userName: "Emeka Nwosu", rating: 4, comment: "The 65\" QLED is stunning! Colors are incredibly vivid. Got it from TechStore NG at the best price. Worth every naira.", date: "2024-01-30" },
  { id: "r6", productId: "p4", userName: "Fatima Abubakar", rating: 5, comment: "The PS5 is next-level gaming. Lightning fast load times and those haptic controller vibrations are mind-blowing. Best purchase ever!", date: "2024-02-15" },
  { id: "r7", productId: "p5", userName: "Tunde Babangida", rating: 5, comment: "MacBook Air M2 is a game changer. Battery lasts all day and it never gets warm even under load. Compared prices and saved ₦80,000!", date: "2024-02-20" },
  { id: "r8", productId: "p6", userName: "Chioma Obi", rating: 4, comment: "Samsung S24 Ultra's 200MP camera is insane. S Pen is very useful for sketching and notes. Price comparison feature helped me a lot!", date: "2024-03-01" },
  { id: "r9", productId: "p9", userName: "Ade Williams", rating: 5, comment: "Nike Air Max 270 is extremely comfortable for all-day wear. The Air unit makes a huge difference on long walks in Lagos traffic.", date: "2024-01-18" },
  { id: "r10", productId: "p11", userName: "Kemi Adebayo", rating: 5, comment: "Sony WH-1000XM5 is the best noise-cancelling headphones I've ever used. Works perfectly on Lagos buses. Worth saving up for!", date: "2024-02-28" },
  { id: "r11", productId: "p16", userName: "Seun Ajayi", rating: 5, comment: "AirPods Pro 2 changed my life! Noise cancellation is magical in noisy environments. Used price comparison to get the best deal.", date: "2024-03-05" },
  { id: "r12", productId: "p27", userName: "Bola Adeyinka", rating: 4, comment: "Apple Watch Series 9 is fantastic. ECG feature has been very useful. Battery life could be better but overall excellent product.", date: "2024-03-10" },
  { id: "r13", productId: "p22", userName: "Damilola Okonkwo", rating: 5, comment: "Logitech MX Master 3S is the perfect productivity mouse. MagSpeed scroll wheel is addictive. Best investment for my home office setup!", date: "2024-01-25" },
  { id: "r14", productId: "p33", userName: "Nkechi Eze", rating: 5, comment: "DJI Mini 4 Pro captures incredible aerial footage of Abuja. The omnidirectional sensing makes it easy for beginners. Worth every kobo!", date: "2024-02-22" },
  { id: "r15", productId: "p57", userName: "Chukwuemeka Okafor", rating: 5, comment: "The Jackery Solar Generator has been a lifesaver during power outages! Can power my TV, fan, and phones all night. A must-have in Nigeria!", date: "2024-03-15" },
  { id: "r16", productId: "p44", userName: "Adaeze Nwosu", rating: 4, comment: "Good protein powder, mixes well, and tastes great. Found the cheapest price here vs physical stores. Will definitely reorder!", date: "2024-02-18" },
  { id: "r17", productId: "p54", userName: "Yusuf Abdullahi", rating: 4, comment: "Oraimo FreePods 4 is great value! ANC works well enough for public transport. Sound quality is impressive for the price.", date: "2024-03-08" },
  { id: "r18", productId: "p20", userName: "Mercy Okafor", rating: 4, comment: "Redmi Note 13 Pro+ has an incredible camera for this price. 200MP photos are detailed and the charging is super fast. Love it!", date: "2024-02-12" },
  { id: "r19", productId: "p47", userName: "Emmanuel Eze", rating: 5, comment: "Anker PowerCore 26800 is perfect for travel and power outages. Charged my laptop twice and still had juice left. Great quality!", date: "2024-01-28" },
  { id: "r20", productId: "p7", userName: "Obiageli Nwosu", rating: 5, comment: "Dell XPS 15 with OLED is absolutely stunning for video editing. Colors are true and the i9 processor handles everything I throw at it.", date: "2024-02-25" },
];

export const orders: Order[] = [
  { id: "ord001", customerId: "c1", vendorId: "v3", productId: "p1", quantity: 1, total: 390000, status: "delivered", date: "2024-01-10" },
  { id: "ord002", customerId: "c1", vendorId: "v4", productId: "p2", quantity: 1, total: 920000, status: "shipped", date: "2024-02-15" },
  { id: "ord003", customerId: "c1", vendorId: "v7", productId: "p11", quantity: 1, total: 270000, status: "out-for-delivery", date: "2024-03-01" },
  { id: "ord004", customerId: "c1", vendorId: "v1", productId: "p16", quantity: 2, total: 370000, status: "processing", date: "2024-03-10" },
  { id: "ord005", customerId: "c1", vendorId: "v5", productId: "p9", quantity: 1, total: 55000, status: "placed", date: "2024-03-15" },
  { id: "ord006", customerId: "c1", vendorId: "v7", productId: "p3", quantity: 1, total: 625000, status: "delivered", date: "2023-12-20" },
  { id: "ord007", customerId: "c1", vendorId: "v9", productId: "p4", quantity: 1, total: 530000, status: "cancelled", date: "2024-01-05" },
];

export const transactions: Transaction[] = [
  { id: "txn001", orderId: "ord001", amount: 390000, status: "success", date: "2024-01-10" },
  { id: "txn002", orderId: "ord002", amount: 920000, status: "success", date: "2024-02-15" },
  { id: "txn003", orderId: "ord003", amount: 270000, status: "success", date: "2024-03-01" },
  { id: "txn004", orderId: "ord004", amount: 370000, status: "success", date: "2024-03-10" },
  { id: "txn005", orderId: "ord005", amount: 55000, status: "pending", date: "2024-03-15" },
  { id: "txn006", orderId: "ord006", amount: 625000, status: "success", date: "2023-12-20" },
  { id: "txn007", orderId: "ord007", amount: 530000, status: "failed", date: "2024-01-05" },
];

export const analytics: VendorAnalytics[] = [
  {
    vendorId: "v1",
    revenueByMonth: [
      { month: "Aug", revenue: 3200000 }, { month: "Sep", revenue: 4100000 },
      { month: "Oct", revenue: 3800000 }, { month: "Nov", revenue: 5200000 },
      { month: "Dec", revenue: 7800000 }, { month: "Jan", revenue: 4500000 },
      { month: "Feb", revenue: 5100000 }, { month: "Mar", revenue: 6200000 },
    ],
    ordersByCategory: [
      { category: "Computers", count: 145 }, { category: "Phones & Tablets", count: 220 },
      { category: "Electronics", count: 198 }, { category: "Gaming", count: 87 },
      { category: "Fashion", count: 64 }, { category: "Home & Kitchen", count: 52 },
    ]
  }
];

export const categories = [
  { id: "electronics", name: "Electronics", icon: "Zap", count: 284, color: "bg-blue-500" },
  { id: "phones", name: "Phones & Tablets", icon: "Smartphone", count: 156, color: "bg-green-500" },
  { id: "computers", name: "Computers", icon: "Monitor", count: 98, color: "bg-purple-500" },
  { id: "fashion", name: "Fashion", icon: "ShoppingBag", count: 412, color: "bg-pink-500" },
  { id: "home", name: "Home & Kitchen", icon: "Home", count: 234, color: "bg-orange-500" },
  { id: "sports", name: "Sports", icon: "Activity", count: 178, color: "bg-red-500" },
  { id: "books", name: "Books", icon: "Book", count: 89, color: "bg-yellow-500" },
  { id: "health", name: "Health & Beauty", icon: "Heart", count: 145, color: "bg-rose-500" },
  { id: "gaming", name: "Gaming", icon: "Gamepad", count: 112, color: "bg-indigo-500" },
  { id: "automotive", name: "Automotive", icon: "Car", count: 67, color: "bg-teal-500" },
];

export const formatPrice = (price: number): string => {
  return `₦${price.toLocaleString('en-NG')}`;
};

export const getCheapestListing = (product: Product) => {
  const sorted = [...product.vendorListings].sort((a, b) => a.price - b.price);
  return sorted[0];
};

export const getMostExpensiveListing = (product: Product) => {
  const sorted = [...product.vendorListings].sort((a, b) => b.price - a.price);
  return sorted[0];
};

export const getVendorById = (id: string): Vendor | undefined => {
  return vendors.find(v => v.id === id);
};
