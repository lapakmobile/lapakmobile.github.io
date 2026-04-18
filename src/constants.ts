import { Product, Testimonial, FAQItem } from './types';

export const WHATSAPP_NUMBER = "6281290006080"; // Nomor admin LapakMobile

export const GAMES: Product[] = [
  {
    id: 'ml',
    name: 'Mobile Legends',
    category: 'Game',
    description: 'Mobile Legends: Bang Bang adalah game mobile MOBA 5v5 yang sangat populer. Bertarung bersama teman-temanmu melawan pemain asli dari seluruh dunia! Pilih hero favoritmu dan bangun tim yang sempurna dengan kawan seperjuanganmu!',
    image: 'https://vip-reseller.co.id/library/assets/images/product/ML_A-01.webp',
    isBestSeller: true,
    packages: [
      { name: '19 Diamonds (17 + 2 Bonus)', price: 'Rp 6.296' },
      { name: '59 Diamonds (53 + 6 Bonus)', price: 'Rp 17.401' },
      { name: '1x Weekly Diamond Pass', price: 'Rp 29.967' },
      { name: '170 Diamonds (154 + 16 Bonus)', price: 'Rp 49.279' },
      { name: '384 Diamonds (336 + 48 Bonus)', price: 'Rp 110.807' },
      { name: '716 Diamonds (637 + 79 Bonus)', price: 'Rp 196.780' },
      { name: '792 Diamonds (707 + 85 Bonus)', price: 'Rp 215.989' },
      { name: '1000 Diamonds (887 + 113 Bonus)', price: 'Rp 259.091' },
      { name: '1220 Diamonds (1083 + 138 Bonus)', price: 'Rp 320.281' },
      { name: '2010 Diamonds (1708 + 302 Bonus)', price: 'Rp 498.742' },
    ]
  },
  {
    id: 'hok',
    name: 'Honor of Kings',
    category: 'Game',
    description: 'Honor of Kings adalah game mobile MOBA yang paling banyak dimainkan di dunia. Memberikan pengalaman kompetitif terbaik di perangkat mobile dengan grafis memukau dan gameplay yang adu strategi.',
    image: 'https://vip-reseller.co.id/library/assets/images/product/honor-of-kings.webp',
    isBestSeller: true,
    packages: [
      { name: '80 Tokens', price: 'Rp 14.700' },
      { name: '240 Tokens', price: 'Rp 42.901' },
      { name: '400 Tokens', price: 'Rp 71.586' },
      { name: '560 Tokens', price: 'Rp 100.502' },
      { name: '800 Tokens', price: 'Rp 143.477' },
      { name: '1200 Tokens', price: 'Rp 215.204' },
      { name: '2400 Tokens', price: 'Rp 434.594' },
      { name: '4000 Tokens', price: 'Rp 724.400' },
      { name: '8000 Tokens', price: 'Rp 1.431.748' },
    ]
  },
  {
    id: 'pb',
    name: 'Point Blank',
    category: 'Game',
    image: 'https://vip-reseller.co.id/library/assets/images/game/pointblank.jpg',
    packages: [
      { name: '1200 PB Cash', price: 'Rp 8.979' },
      { name: '2400 PB Cash', price: 'Rp 17.958' },
      { name: '6000 PB Cash', price: 'Rp 44.895' },
      { name: '12000 PB Cash', price: 'Rp 89.781' },
      { name: '36000 PB Cash', price: 'Rp 268.728' },
      { name: '60000 PB Cash', price: 'Rp 447.864' },
    ]
  },
  {
    id: 'pubg',
    name: 'PUBG Mobile',
    category: 'Game',
    image: 'https://vip-reseller.co.id/library/assets/images/game/pubgm-a-icon.jpg',
    packages: [
      { name: '60 UC', price: 'Rp 15.793' },
      { name: '120 UC (120 + 0)', price: 'Rp 30.680' },
      { name: '385 UC (360 + 25)', price: 'Rp 89.040' },
      { name: '445 UC (420 + 25)', price: 'Rp 103.880' },
      { name: '720 UC (600 + 120)', price: 'Rp 163.240' },
      { name: '660 UC', price: 'Rp 157.855' },
      { name: '1320 UC (1200 + 120)', price: 'Rp 296.800' },
      { name: '1860 UC (1560 + 300)', price: 'Rp 385.840' },
      { name: '1800 UC', price: 'Rp 394.596' },
      { name: '2125 UC (1800 + 325)', price: 'Rp 445.200' },
      { name: '2460 UC (2100 + 360)', price: 'Rp 519.400' },
      { name: '3850 UC (3000 + 850)', price: 'Rp 742.000' },
      { name: '3850 UC', price: 'Rp 789.167' },
      { name: '3925 UC (3300 + 625)', price: 'Rp 816.200' },
      { name: '8100 UC (6000 + 2100)', price: 'Rp 1.484.000' },
      { name: '8100 UC', price: 'Rp 1.610.247' },
    ]
  },
  {
    id: 'ff',
    name: 'Free Fire',
    category: 'Game',
    description: 'Free Fire adalah game mobile battle royale yang memungkinkan pemain bertanding dalam durasi 10 menit melawan 49 pemain lainnya. Bertahanlah menjadi yang terakhir untuk mendapatkan Booyah!',
    image: 'https://vip-reseller.co.id/library/assets/images/product/free-fire.webp',
    isBestSeller: true,
    packages: [
      { name: '120 Diamonds', price: 'Rp 15.845' },
      { name: 'Membership Mingguan Lite', price: 'Rp 16.933' },
      { name: '130 Diamonds', price: 'Rp 17.680' },
      { name: '140 Diamonds', price: 'Rp 18.200' },
      { name: '145 Diamonds', price: 'Rp 19.098' },
      { name: '210 Diamonds', price: 'Rp 27.870' },
      { name: 'Membership Mingguan', price: 'Rp 28.259' },
      { name: '250 Diamonds', price: 'Rp 32.783' },
      { name: '260 Diamonds', price: 'Rp 34.363' },
      { name: '2400 Diamonds', price: 'Rp 306.664' },
      { name: '3000 Diamonds', price: 'Rp 383.555' },
      { name: '3310 Diamonds', price: 'Rp 422.944' },
      { name: '4450 Diamonds', price: 'Rp 564.506' },
      { name: '4800 Diamonds', price: 'Rp 610.376' },
      { name: '6900 Diamonds', price: 'Rp 873.441' },
      { name: '7650 Diamonds', price: 'Rp 965.819' },
      { name: '8010 Diamonds', price: 'Rp 1.010.838' },
      { name: '36500 Diamonds', price: 'Rp 4.667.441' },
      { name: '73100 Diamonds', price: 'Rp 9.345.072' },
    ]
  },
  {
    id: 'valorant',
    name: 'Valorant',
    category: 'Game',
    image: 'https://vip-reseller.co.id/library/assets/images/game/valorant-new.jpg',
    packages: [
      { name: '475 Points', price: 'Rp 53.019' },
      { name: '1475 Points', price: 'Rp 159.057' },
      { name: '2525 Points', price: 'Rp 265.096' },
      { name: '3050 Points', price: 'Rp 318.115' },
      { name: '3650 Points', price: 'Rp 368.295' },
      { name: '4125 Points', price: 'Rp 421.314' },
      { name: '4650 Points', price: 'Rp 474.333' },
      { name: '5825 Points', price: 'Rp 582.265' },
      { name: '6350 Points', price: 'Rp 635.284' },
      { name: '7400 Points', price: 'Rp 741.322' },
      { name: '9000 Points', price: 'Rp 897.540' },
    ]
  },
  {
    id: 'genshin',
    name: 'Genshin Impact',
    category: 'Game',
    image: 'https://vip-reseller.co.id/library/assets/images/product/genshin-impact.webp',
    packages: [
      { name: '60 Genesis Crystals', price: 'Rp 10.818' },
      { name: '300+30 Genesis Crystals', price: 'Rp 54.404' },
      { name: 'Blessing Of The Welkin Moon 2x', price: 'Rp 113.263' },
      { name: 'Blessing Of The Welkin Moon 4x', price: 'Rp 226.526' },
      { name: '1980+260 Genesis Crystals', price: 'Rp 350.345' },
      { name: '3280+600 Genesis Crystals', price: 'Rp 574.735' },
      { name: '6480+1600 Genesis Crystals', price: 'Rp 1.100.474' },
    ]
  },
  {
    id: 'codm',
    name: 'Call of Duty Mobile',
    category: 'Game',
    image: 'https://cdn1.codashop.com/S/content/mobile/images/product-tiles/codmobile_tile.jpg',
    packages: [
      { name: '63 CP', price: 'Rp 9.377' },
      { name: '321 CP', price: 'Rp 46.371' },
      { name: '645 CP', price: 'Rp 92.818' },
      { name: '1373 CP', price: 'Rp 185.405' },
      { name: '2060 CP', price: 'Rp 278.094' },
      { name: '2750 CP', price: 'Rp 358.257' },
      { name: '3564 CP', price: 'Rp 463.472' },
      { name: '7656 CP', price: 'Rp 926.919' },
      { name: '15312 CP', price: 'Rp 2.024.165' },
    ]
  },
  {
    id: 'hsr',
    name: 'Honkai Star Rail',
    category: 'Game',
    image: 'https://vip-reseller.co.id/library/assets/images/game/honkai-impact-3.png',
    packages: [
      { name: '60 Oneiric Shard', price: 'Rp 10.987' },
      { name: 'Express Supply Pass', price: 'Rp 54.337' },
      { name: '300 + 30 Oneiric Shard', price: 'Rp 54.794' },
      { name: 'Express Supply Pass x 2', price: 'Rp 108.335' },
      { name: 'Express Supply Pass x 3', price: 'Rp 162.502' },
      { name: '980 + 110 Oneiric Shard', price: 'Rp 169.470' },
      { name: 'Express Supply Pass x 4', price: 'Rp 216.671' },
      { name: '1280 + 140 Oneiric Shard', price: 'Rp 224.265' },
    ]
  },
  {
    id: 'fc-mobile',
    name: 'FC Mobile / FIFA',
    category: 'Game',
    image: 'https://vip-reseller.co.id/library/assets/images/product/fc-mobile.jpg',
    packages: [
      { name: '40 FC POINTS', price: 'Rp 6.325' },
      { name: '39 Silver', price: 'Rp 6.325' },
      { name: '100 FC POINTS', price: 'Rp 15.570' },
      { name: '99 Silver', price: 'Rp 15.570' },
      { name: '520 FC POINTS', price: 'Rp 76.878' },
      { name: '499 Silver', price: 'Rp 76.878' },
      { name: '1070 FC POINTS', price: 'Rp 154.729' },
      { name: '999 Silver', price: 'Rp 154.729' },
      { name: '2200 FC POINTS', price: 'Rp 320.162' },
      { name: '1999 Silver', price: 'Rp 320.162' },
      { name: '5750 FC POINTS', price: 'Rp 777.535' },
    ]
  },
  {
    id: 'magic-chess',
    name: 'Magic Chess',
    category: 'Game',
    image: 'https://vip-reseller.co.id/library/assets/images/product/magic-chess.png',
    packages: [
      { name: 'Pass', price: 'Rp 50.000' },
    ]
  },
  {
    id: 'blood-strike',
    name: 'Blood Strike',
    category: 'Game',
    image: 'https://vip-reseller.co.id/library/assets/images/product/blood-strike.jpg',
    packages: [
      { name: '100 Gold', price: 'Rp 15.000' },
      { name: '500 Gold', price: 'Rp 70.000' },
    ]
  },
  {
    id: 'castle-duels',
    name: 'Castle Duels',
    category: 'Game',
    image: 'https://vip-reseller.co.id/library/assets/images/product/castle-duels.webp',
    packages: [
      { name: 'Small Pack', price: 'Rp 15.000' },
    ]
  },
  {
    id: 'chimeraland',
    name: 'Chimeraland',
    category: 'Game',
    image: 'https://vip-reseller.co.id/library/assets/images/game/chimeraland.jpg',
    packages: [
      { name: 'Sage Petals', price: 'Rp 20.000' },
    ]
  },
  {
    id: 'clash-of-clans',
    name: 'Clash of Clans',
    category: 'Game',
    image: 'https://vip-reseller.co.id/library/assets/images/product/clash-of-clans.jpg',
    packages: [
      { name: '80 Gems', price: 'Rp 15.000' },
      { name: '500 Gems', price: 'Rp 75.000' },
      { name: 'Gold Pass', price: 'Rp 120.000' },
    ]
  },
  {
    id: 'conquer-online',
    name: 'Conquer Online',
    category: 'Game',
    image: 'https://vip-reseller.co.id/library/assets/images/product/conquer-online-point-card.webp',
    packages: [
      { name: 'Point Card', price: 'Rp 50.000' },
    ]
  },
  {
    id: 'delta-force',
    name: 'Delta Force',
    category: 'Game',
    image: 'https://vip-reseller.co.id/library/assets/images/product/delta-force.png',
    packages: [
      { name: 'Credits', price: 'Rp 50.000' },
    ]
  },
  {
    id: 'dragon-raja',
    name: 'Dragon Raja',
    category: 'Game',
    image: 'https://vip-reseller.co.id/library/assets/images/game/dragon-raja.jpg',
    packages: [
      { name: 'Coupons', price: 'Rp 30.000' },
    ]
  },
  {
    id: 'dragonheir',
    name: 'Dragonheir: Silent Gods',
    category: 'Game',
    image: 'https://vip-reseller.co.id/library/assets/images/product/dragonheir.jpg',
    packages: [
      { name: 'Dragon Crystals', price: 'Rp 50.000' },
    ]
  },
  {
    id: 'dynasty-warriors',
    name: 'Dynasty Warriors: Overlords',
    category: 'Game',
    image: 'https://vip-reseller.co.id/library/assets/images/product/dynasty-warriors-overlords.png',
    packages: [
      { name: 'Ingots', price: 'Rp 25.000' },
    ]
  },
  {
    id: 'eggy-party',
    name: 'Eggy Party',
    category: 'Game',
    image: 'https://vip-reseller.co.id/library/assets/images/product/eggy-party.webp',
    packages: [
      { name: '60 Egg Coins', price: 'Rp 15.000' },
    ]
  },
  {
    id: 'farlight-84',
    name: 'Farlight 84',
    category: 'Game',
    image: 'https://vip-reseller.co.id/library/assets/images/product/farlight-84.webp',
    packages: [
      { name: 'Diamonds', price: 'Rp 20.000' },
    ]
  },
  {
    id: 'football-master',
    name: 'Football Master 2',
    category: 'Game',
    image: 'https://vip-reseller.co.id/library/assets/images/product/football-master-2.jpg',
    packages: [
      { name: 'Tokens', price: 'Rp 30.000' },
    ]
  },
  {
    id: 'growtopia',
    name: 'Growtopia',
    category: 'Game',
    image: 'https://vip-reseller.co.id/library/assets/images/product/Growtopia.webp',
    packages: [
      { name: 'Gems', price: 'Rp 15.000' },
    ]
  },
  {
    id: 'hay-day',
    name: 'Hay Day',
    category: 'Game',
    image: 'https://vip-reseller.co.id/library/assets/images/product/hayday.jpg',
    packages: [
      { name: 'Diamonds', price: 'Rp 20.000' },
    ]
  },
  {
    id: 'honkai-impact',
    name: 'Honkai Impact 3',
    category: 'Game',
    image: 'https://vip-reseller.co.id/library/assets/images/game/honkai-impact-3.png',
    packages: [
      { name: 'Crystals', price: 'Rp 50.000' },
    ]
  },
  {
    id: 'identity-v',
    name: 'Identity V',
    category: 'Game',
    image: 'https://vip-reseller.co.id/library/assets/images/product/identity-v.jpg',
    packages: [
      { name: 'Echoes', price: 'Rp 25.000' },
    ]
  },
  {
    id: 'lords-mobile',
    name: 'Lords Mobile',
    category: 'Game',
    image: 'https://cdn1.codashop.com/S/content/mobile/images/product-tiles/lords_mobile_tile.png',
    packages: [
      { name: 'Diamonds', price: 'Rp 30.000' },
    ]
  },
  {
    id: 'love-deepspace',
    name: 'Love and Deepspace',
    category: 'Game',
    image: 'https://vip-reseller.co.id/library/assets/images/product/love-and-deepspace.png',
    packages: [
      { name: 'Crystals', price: 'Rp 50.000' },
    ]
  },
  {
    id: 'hyper-front',
    name: 'Hyper Front',
    category: 'Game',
    image: 'https://vip-reseller.co.id/library/assets/images/game/hyper-front.png',
    packages: [
      { name: 'Star Quartz', price: 'Rp 30.000' },
    ]
  },
  {
    id: 'infinite-borders',
    name: 'Infinite Borders',
    category: 'Game',
    image: 'https://vip-reseller.co.id/library/assets/images/product/infinite-border.jpg',
    packages: [
      { name: 'Jade', price: 'Rp 50.000' },
    ]
  },
  {
    id: 'king-of-avalon',
    name: 'King of Avalon',
    category: 'Game',
    image: 'https://vip-reseller.co.id/library/assets/images/product/king-of-valon.webp',
    packages: [
      { name: 'Gold', price: 'Rp 75.000' },
    ]
  },
  {
    id: 'league-of-legends',
    name: 'League of Legends',
    category: 'Game',
    image: 'https://cdn1.codashop.com/S/content/mobile/images/product-tiles/lolwildrift_tile.png',
    packages: [
      { name: 'Wild Cores', price: 'Rp 50.000' },
    ]
  },
  {
    id: 'lifeafter',
    name: 'LifeAfter',
    category: 'Game',
    image: 'https://cdn1.codashop.com/S/content/mobile/images/product-tiles/lifeafter_tile.jpeg',
    packages: [
      { name: 'Credits', price: 'Rp 40.000' },
    ]
  },
  {
    id: 'light-of-thel',
    name: 'Light of Thel',
    category: 'Game',
    image: 'https://cdn1.codashop.com/S/content/mobile/images/product-tiles/LightofThel_tile.png',
    packages: [
      { name: 'Crystals', price: 'Rp 30.000' },
    ]
  },
  {
    id: 'likee',
    name: 'Likee',
    category: 'Sosmed',
    image: 'https://vip-reseller.co.id/library/assets/images/product/Likee.png',
    packages: [
      { name: 'Diamonds', price: 'Rp 20.000' },
    ]
  },
  {
    id: 'lita',
    name: 'Lita',
    category: 'Apps',
    image: 'https://vip-reseller.co.id/library/assets/images/game/lita-icon.webp',
    packages: [
      { name: 'Coins', price: 'Rp 15.000' },
    ]
  }
];

export const DIGITAL_PRODUCTS: Product[] = [
  {
    id: 'bstation',
    name: 'Bstation (Bilibili)',
    category: 'Streaming',
    description: 'Bstation (Bilibili) adalah platform streaming video yang populer di kalangan pengguna di Asia dan khususnya di Indonesia. Bilibili menyajikan beragam konten video, termasuk anime, game, musik, vlog, serta konten buatan pengguna lainnya. Pengguna dapat menonton video secara gratis atau memilih layanan berlangganan untuk menikmati konten tanpa iklan dan fitur eksklusif lainnya.',
    image: 'https://play-lh.googleusercontent.com/IUpJ8qD8C96sDq7q3R1w_U6d_uL9X-hWb5U_E-MvS5k2_U8rS7_mG9G_zW_Xm_X-f=w240-h480-rw',
    packages: [
      { name: '7 Days Premium', price: 'Rp 8.610' },
      { name: '14 Days Premium', price: 'Rp 13.377' },
      { name: '30 Days Premium', price: 'Rp 28.500' },
      { name: '93 Days Premium', price: 'Rp 71.663' },
      { name: '366 Days Premium', price: 'Rp 209.255' },
    ]
  },
  {
    id: 'pulsa',
    name: 'Isi Pulsa All Operator',
    category: 'Digital',
    image: 'https://vip-reseller.co.id/library/assets/images/menu/013-5g.svg',
    packages: [
      { name: 'Pulsa 5K', price: 'Rp 7.000' },
      { name: 'Pulsa 10K', price: 'Rp 12.000' },
      { name: 'Pulsa 20K', price: 'Rp 22.000' },
      { name: 'Pulsa 50K', price: 'Rp 52.000' },
      { name: 'Pulsa 100K', price: 'Rp 102.000' },
    ]
  },
  {
    id: 'paket-data',
    name: 'Paket Data Internet',
    category: 'Digital',
    image: 'https://vip-reseller.co.id/library/assets/images/menu/013-5g.svg',
    packages: [
      { name: 'Data 1GB', price: 'Rp 10.000' },
      { name: 'Data 5GB', price: 'Rp 45.000' },
      { name: 'Data 10GB', price: 'Rp 85.000' },
    ]
  },
  {
    id: 'token-listrik',
    name: 'Token Listrik',
    category: 'Digital',
    image: 'https://vip-reseller.co.id/library/assets/images/menu/015-wireless.svg',
    packages: [
      { name: '20K', price: 'Rp 21.500' },
      { name: '50K', price: 'Rp 51.500' },
      { name: '100K', price: 'Rp 101.500' },
      { name: '200K', price: 'Rp 201.500' },
    ]
  },
  {
    id: 'ig-followers',
    name: 'Followers Instagram',
    category: 'Sosmed',
    image: 'https://vip-reseller.co.id/library/assets/images/menu/016-chatting.svg',
    packages: [
      { name: '100 Followers', price: 'Rp 5.000' },
      { name: '500 Followers', price: 'Rp 20.000' },
      { name: '1000 Followers', price: 'Rp 35.000' },
    ]
  },
  {
    id: 'canva-pro',
    name: 'Canva Pro',
    category: 'Apps',
    image: 'https://th-live-05.slatic.net/p/eb6e9b42a3ee41f31451c7bc6d29e86e.jpg_720x720q80.jpg_.webp',
    isBestSeller: true,
    packages: [
      { name: 'Canva Pro 1 Bulan', price: 'Rp 10.000' },
      { name: 'Canva Pro 1 Tahun', price: 'Rp 50.000' },
    ]
  },
  {
    id: 'capcut-pro',
    name: 'Capcut Pro',
    category: 'Apps',
    image: 'https://vip-reseller.co.id/library/assets/images/product/capcut-logo.jpg',
    packages: [
      { name: 'Capcut Pro 1 Bulan', price: 'Rp 15.000' },
      { name: 'Capcut Pro 1 Tahun', price: 'Rp 80.000' },
    ]
  },
  {
    id: 'chatgpt',
    name: 'ChatGPT Plus',
    category: 'Apps',
    image: 'https://vip-reseller.co.id/library/assets/images/product/chatgpt.webp',
    packages: [
      { name: 'ChatGPT Plus Sharing', price: 'Rp 50.000' },
    ]
  },
  {
    id: 'perplexity',
    name: 'Perplexity AI',
    category: 'Apps',
    image: 'https://vip-reseller.co.id/library/assets/images/product/perplexity.webp',
    packages: [
      { name: 'Perplexity Pro 1 Bulan', price: 'Rp 60.000' },
    ]
  },
  {
    id: 'getcontact',
    name: 'Getcontact Premium',
    category: 'Apps',
    image: 'https://vip-reseller.co.id/library/assets/images/product/get-contact.png',
    packages: [
      { name: 'Getcontact Premium 1 Bulan', price: 'Rp 15.000' },
    ]
  },
  {
    id: 'gemini-ai',
    name: 'Gemini AI Pro',
    category: 'Apps',
    image: 'https://vip-reseller.co.id/library/assets/images/product/gemini.webp',
    packages: [
      { name: 'Gemini Advanced 1 Bulan', price: 'Rp 50.000' },
    ]
  },
  {
    id: 'netflix',
    name: 'Netflix Premium',
    category: 'Streaming',
    image: 'https://vip-reseller.co.id/library/assets/images/game/netflix.jpg',
    isBestSeller: true,
    packages: [
      { name: 'Sharing 1 Akun 1 User (1P1U)', price: 'Rp 35.000' },
      { name: 'Private Full Akun', price: 'Rp 150.000' },
    ]
  },
  {
    id: 'spotify',
    name: 'Spotify Premium',
    category: 'Streaming',
    image: 'https://vip-reseller.co.id/library/assets/images/game/spotify.jpg',
    packages: [
      { name: '1 Bulan Individual', price: 'Rp 15.000' },
      { name: '3 Bulan Individual', price: 'Rp 40.000' },
    ]
  },
  {
    id: 'disney-hotstar',
    name: 'Disney+ Hotstar',
    category: 'Streaming',
    image: 'https://vip-reseller.co.id/library/assets/images/game/disney-hotstar-icon.jpg',
    packages: [
      { name: 'Disney+ 1 Bulan', price: 'Rp 25.000' },
    ]
  },
  {
    id: 'iqiyi',
    name: 'iQIYI Premium',
    category: 'Streaming',
    image: 'https://vip-reseller.co.id/library/assets/images/product/iqiyi-icon.webp',
    packages: [
      { name: 'iQIYI VIP 1 Bulan', price: 'Rp 20.000' },
    ]
  },
  {
    id: 'youtube-premium',
    name: 'YouTube Premium',
    category: 'Streaming',
    image: 'https://vip-reseller.co.id/library/assets/images/game/youtube-new.jpg',
    isBestSeller: true,
    packages: [
      { name: 'YouTube Premium 1 Bulan', price: 'Rp 10.000' },
      { name: 'YouTube Premium 4 Bulan', price: 'Rp 35.000' },
    ]
  },
  {
    id: 'vision-plus',
    name: 'Vision+',
    category: 'Streaming',
    image: 'https://vip-reseller.co.id/library/assets/images/product/vision-plus.png',
    packages: [
      { name: 'Vision+ Premium 1 Bulan', price: 'Rp 15.000' },
    ]
  },
  {
    id: 'vidio',
    name: 'Vidio Premiere',
    category: 'Streaming',
    image: 'https://vip-reseller.co.id/library/assets/images/game/vidio-premier.jpg',
    packages: [
      { name: 'Vidio Platinum 1 Bulan', price: 'Rp 25.000' },
      { name: 'Vidio Diamond (EPL) 1 Bulan', price: 'Rp 79.000' },
    ]
  },
  {
    id: 'rcti-plus',
    name: 'RCTI+',
    category: 'Streaming',
    image: 'https://vip-reseller.co.id/library/assets/images/product/rcti-plus.webp',
    packages: [
      { name: 'RCTI+ Premium', price: 'Rp 10.000' },
    ]
  },
  {
    id: 'sewa-grup-fb',
    name: 'Sewa Grup Facebook',
    category: 'Jasa',
    image: 'public/grup-facebook.png',
    packages: [
      { name: 'Paid Promote (1 Post)', price: 'Rp 25.000' },
      { name: 'Sewa Mingguan (Affiliate)', price: 'Rp 100.000' },
      { name: 'Sewa Bulanan (Affiliate)', price: 'Rp 350.000' },
      { name: 'Paket Shopee/Tokopedia/Lazada', price: 'Mulai Rp 50.000' },
    ]
  },
  {
    id: 'rekber-fb',
    name: 'Jasa Rekber Facebook',
    category: 'Jasa',
    image: 'public/rekber_rekening_bersama.jpg',
    isBestSeller: true,
    packages: [
      { name: 'Transaksi s/d 100rb', price: 'Fee Rp 5.000' },
      { name: 'Transaksi 101rb - 500rb', price: 'Fee Rp 10.000' },
      { name: 'Transaksi 501rb - 1jt', price: 'Fee Rp 20.000' },
      { name: 'Transaksi > 1jt', price: 'Fee 2.5%' },
    ]
  }
];

export const ALL_PRODUCTS = [...GAMES, ...DIGITAL_PRODUCTS];

export const TESTIMONIALS: Testimonial[] = [
  { id: '1', name: 'Andi Saputra', text: 'Proses cepet banget, gak sampe 5 menit diamond udah masuk! Recommended banget buat para gamer.', rating: 5, avatar: 'https://picsum.photos/seed/user1/100/100' },
  { id: '2', name: 'Budi Hermawan', text: 'Langganan di sini terus, harganya paling murah dibanding yang lain. Pelayanan mantap!', rating: 5, avatar: 'https://picsum.photos/seed/user2/100/100' },
  { id: '3', name: 'Citra Lestari', text: 'Admin ramah, fast respon pas tanya-tanya paket streaming. Netflix-nya lancar jaya.', rating: 5, avatar: 'https://picsum.photos/seed/user3/100/100' },
  { id: '4', name: 'Dedi Kurniawan', text: 'Top up ML di sini paling aman. Gak perlu khawatir akun kenapa-napa. Sukses terus LapakMobile!', rating: 5, avatar: 'https://picsum.photos/seed/user4/100/100' },
  { id: '5', name: 'Eka Putri', text: 'Baru pertama kali coba beli Canva Pro di sini, langsung aktif. Makasih ya admin!', rating: 5, avatar: 'https://picsum.photos/seed/user5/100/100' },
  { id: '6', name: 'Fajar Ramadhan', text: 'Harga bersaing, proses kilat. Gak nyesel langganan di sini. Top up HOK juga murah.', rating: 5, avatar: 'https://picsum.photos/seed/user6/100/100' },
];

export const FAQS: FAQItem[] = [
  { question: 'Berapa lama proses top-up?', answer: 'Proses top-up biasanya memakan waktu 1-10 menit setelah pembayaran dikonfirmasi.' },
  { question: 'Apakah layanan ini aman?', answer: '100% aman dan legal. Kami menggunakan jalur resmi untuk setiap produk digital.' },
  { question: 'Bagaimana cara ordernya?', answer: 'Pilih produk, pilih paket, lalu klik tombol WhatsApp untuk diarahkan ke admin kami.' },
];
