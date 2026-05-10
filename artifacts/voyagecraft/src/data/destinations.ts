export interface Activity {
  time: string;
  title: string;
  description: string;
}

export interface DayPlan {
  title: string;
  theme: string;
  activities: Activity[];
}

export interface HotelOption {
  name: string;
  location: string;
  stars: number;
  pricePerNight: number;
  description: string;
  amenities: string[];
}

export interface DestinationInfo {
  id: string;
  name: string;
  country: string;
  image: string;
  heroGradient: string;
  tagline: string;
  timezone: string;
  currency: string;
  days: DayPlan[];
  hotels: Record<string, HotelOption>;
  budgetPerDay: Record<string, number>;
  budgetTotalMultiplier: Record<string, number>;
  groupTitles: Record<string, string>;
  groupDescriptions: Record<string, string>;
  transport: Record<string, string>;
  budgetBreakdown: Record<string, { accommodation: number; activities: number; food: number; transport: number }>;
}

const DESTINATIONS: Record<string, DestinationInfo> = {
  sydney: {
    id: 'sydney',
    name: 'Sydney',
    country: 'Australia',
    image: '/src/assets/sydney.png',
    heroGradient: 'linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%)',
    tagline: 'Harbour city of dreams',
    timezone: 'AEST (UTC+10)',
    currency: 'AUD',
    days: [
      {
        title: 'Iconic Sydney Landmarks',
        theme: 'Architecture & History',
        activities: [
          { time: '9:00 AM', title: 'Sydney Opera House', description: 'UNESCO World Heritage Site — guided tour inside the opera hall and along the iconic waterfront promenade.' },
          { time: '1:00 PM', title: 'Harbour Bridge Climb', description: 'Panoramic 360° views from the top of the world\'s largest steel arch bridge. A truly breathtaking 3-hour experience.' },
          { time: '6:00 PM', title: 'Bondi Beach Sunset', description: 'Watch the golden sunset at Australia\'s most famous beach, followed by dinner at Icebergs Dining Room overlooking the ocean.' },
        ],
      },
      {
        title: 'Blue Mountains & Harbour',
        theme: 'Nature & Scenery',
        activities: [
          { time: '8:00 AM', title: 'Blue Mountains National Park', description: 'Visit the Three Sisters rock formation, Echo Point lookout, and Scenic World railway through ancient rainforest.' },
          { time: '1:30 PM', title: 'Manly Ferry Ride', description: 'Scenic 30-minute harbour ferry from Circular Quay to Manly Beach, offering stunning views of the Sydney skyline.' },
          { time: '7:00 PM', title: 'Night Harbour Cruise', description: 'Dinner cruise past the Opera House and Harbour Bridge under the stars. Wine and fresh Australian seafood included.' },
        ],
      },
      {
        title: 'Cultural Sydney',
        theme: 'Arts & Culture',
        activities: [
          { time: '10:00 AM', title: 'Art Gallery of NSW', description: 'World-class collection of Australian, Asian, and European art. Don\'t miss the Aboriginal and Torres Strait Islander galleries.' },
          { time: '1:00 PM', title: 'The Rocks Markets', description: 'Historic cobblestone district with artisan stalls, fresh produce, local crafts, and authentic Sydney character.' },
          { time: '6:00 PM', title: 'Darling Harbour Dining', description: 'Explore the vibrant waterfront precinct with over 50 restaurants. Cocktails at the Dockside rooftop bar.' },
        ],
      },
      {
        title: 'Coastal Walks & Wildlife',
        theme: 'Nature & Adventure',
        activities: [
          { time: '7:30 AM', title: 'Bondi to Coogee Coastal Walk', description: '6km clifftop walk past rock pools, sculptures, and panoramic ocean views. One of the world\'s great coastal paths.' },
          { time: '12:00 PM', title: 'Taronga Zoo', description: 'Award-winning zoo with 4,000 animals. Iconic ferry ride across the harbour, koala encounters, and giraffe feeding.' },
          { time: '5:00 PM', title: 'Paddington Markets', description: 'Trendy neighbourhood market in a Victorian church grounds — fashion, food, and local artisans every Saturday.' },
        ],
      },
      {
        title: 'Day Trip to Hunter Valley',
        theme: 'Wine & Gastronomy',
        activities: [
          { time: '8:30 AM', title: 'Hunter Valley Wine Region', description: 'Australia\'s oldest wine region, 2 hours north. Private vineyard tours with premium wine tastings and cheese boards.' },
          { time: '1:00 PM', title: 'Bimbadgen Estate Lunch', description: 'Three-course lunch at a vineyard restaurant with views over rolling vine-covered hills.' },
          { time: '4:00 PM', title: 'Sunset Hot Air Balloon', description: 'Glide over the vineyards at golden hour. Champagne breakfast included on landing.' },
        ],
      },
      {
        title: 'Northern Beaches',
        theme: 'Relaxation',
        activities: [
          { time: '9:00 AM', title: 'Palm Beach & Barrenjoey Lighthouse', description: 'Sydney\'s most exclusive beach suburb. Hike to the lighthouse for sweeping coastal panoramas.' },
          { time: '1:00 PM', title: 'Whale Beach Picnic', description: 'Secluded crescent of golden sand, popular with locals. Perfect for swimming and relaxing.' },
          { time: '6:30 PM', title: 'Quay Restaurant Dinner', description: 'Sydney\'s finest degustation experience. Peter Gilmore\'s legendary multi-course tasting menu with harbour views.' },
        ],
      },
      {
        title: 'Olympic Park & Parramatta',
        theme: 'Sports & History',
        activities: [
          { time: '10:00 AM', title: 'Sydney Olympic Park', description: 'Tour the 2000 Olympics venues, including Stadium Australia. Behind-the-scenes access and Olympic history museum.' },
          { time: '1:00 PM', title: 'Parramatta Old Town', description: 'Sydney\'s oldest inland settlement with historic buildings, Aboriginal sites, and the Parramatta River walk.' },
          { time: '6:00 PM', title: 'Star Casino Sydney', description: 'World-class entertainment complex on Darling Harbour — fine dining, live shows, and rooftop views.' },
        ],
      },
    ],
    hotels: {
      budget: { name: 'Wake Up! Sydney', location: 'Central Station', stars: 2, pricePerNight: 45, description: 'Vibrant social hostel with private rooms available, rooftop bar, and daily events.', amenities: ['Free WiFi', 'Rooftop Bar', 'Lockers', 'Social Events'] },
      moderate: { name: 'ibis Sydney Olympic Park', location: 'Olympic Park', stars: 3, pricePerNight: 130, description: 'Modern hotel with excellent transport links and clean, comfortable rooms.', amenities: ['Free WiFi', 'Restaurant', 'Gym', 'Parking'] },
      premium: { name: 'The Darling, Star Sydney', location: 'Pyrmont', stars: 5, pricePerNight: 280, description: 'Award-winning luxury hotel attached to The Star entertainment complex with stunning harbour views.', amenities: ['Spa', 'Infinity Pool', 'Fine Dining', 'Concierge', 'Valet'] },
      luxury: { name: 'Park Hyatt Sydney', location: 'Circular Quay', stars: 5, pricePerNight: 580, description: 'Sydney\'s most coveted address, directly opposite the Opera House with unmatched harbour views from every room.', amenities: ['Butler Service', 'Rooftop Pool', 'Full Spa', 'Michelin Dining', 'Private Transfers'] },
    },
    budgetPerDay: { budget: 80, moderate: 200, premium: 420, luxury: 900 },
    budgetTotalMultiplier: { budget: 1, moderate: 1, premium: 1, luxury: 1 },
    groupTitles: {
      solo: 'Solo Sydney Explorer',
      couple: 'Sydney Romance',
      family: 'Sydney Family Fun',
      friends: 'Sydney Squad',
    },
    groupDescriptions: {
      solo: 'A free-spirited solo adventure through Sydney\'s best neighbourhoods, beaches, and culture.',
      couple: 'A romantic Sydney escape with harbour sunsets, fine dining, and breathtaking views.',
      family: 'A family-friendly Sydney adventure with wildlife, beaches, and kid-friendly activities.',
      friends: 'An action-packed Sydney trip with coastal walks, nightlife, and legendary beaches.',
    },
    transport: {
      budget: 'Public transport (Opal card)',
      moderate: 'Mix of public transport and taxis',
      premium: 'Private transfers and rideshare',
      luxury: 'Dedicated chauffeur service',
    },
    budgetBreakdown: {
      budget: { accommodation: 30, activities: 25, food: 30, transport: 15 },
      moderate: { accommodation: 35, activities: 25, food: 25, transport: 15 },
      premium: { accommodation: 40, activities: 25, food: 20, transport: 15 },
      luxury: { accommodation: 45, activities: 20, food: 25, transport: 10 },
    },
  },

  paris: {
    id: 'paris',
    name: 'Paris',
    country: 'France',
    image: '/src/assets/paris.png',
    heroGradient: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
    tagline: 'The city of light and love',
    timezone: 'CET (UTC+1)',
    currency: 'EUR',
    days: [
      {
        title: 'The Heart of Paris',
        theme: 'Iconic Landmarks',
        activities: [
          { time: '9:00 AM', title: 'Eiffel Tower', description: 'Skip-the-line summit access to Paris\'s most iconic landmark. Breathtaking views over the entire city from 276 metres.' },
          { time: '1:00 PM', title: 'Champs-Élysées & Arc de Triomphe', description: 'Stroll the world\'s most famous avenue, then climb the Arc for a rooftop panorama of 12 radiating avenues.' },
          { time: '7:00 PM', title: 'Seine River Dinner Cruise', description: 'Elegant dinner while gliding past Notre-Dame, the Louvre, and the Eiffel Tower as it sparkles at night.' },
        ],
      },
      {
        title: 'Art & Culture',
        theme: 'Museums & History',
        activities: [
          { time: '9:00 AM', title: 'The Louvre Museum', description: 'The world\'s largest art museum. See the Mona Lisa, Venus de Milo, and thousands of masterpieces across 35,000 exhibits.' },
          { time: '2:00 PM', title: 'Musée d\'Orsay', description: 'France\'s premier impressionist collection housed in a stunning 19th-century railway station. Monet, Renoir, Van Gogh.' },
          { time: '7:00 PM', title: 'Le Marais Evening', description: 'Paris\'s trendiest neighbourhood — Jewish quarter, medieval architecture, galleries, and the best falafel in France.' },
        ],
      },
      {
        title: 'Versailles & Montmartre',
        theme: 'Royalty & Bohemia',
        activities: [
          { time: '8:30 AM', title: 'Palace of Versailles', description: 'The ultimate symbol of French royal power. Hall of Mirrors, manicured gardens, and the Grand Trianon palace.' },
          { time: '4:00 PM', title: 'Montmartre & Sacré-Cœur', description: 'Bohemian hilltop village where Picasso and Toulouse-Lautrec once lived. Basilica with panoramic city views.' },
          { time: '8:00 PM', title: 'Moulin Rouge Show', description: 'The legendary cabaret at the heart of Montmartre. Dazzling costumes, cancan dancing, and French champagne.' },
        ],
      },
      {
        title: 'Food & Neighbourhood Walks',
        theme: 'Gastronomy',
        activities: [
          { time: '9:00 AM', title: 'Marché d\'Aligre Morning', description: 'Paris\'s best local market — fresh baguettes, fromage, oysters, and charcuterie. Breakfast like a Parisian.' },
          { time: '12:00 PM', title: 'French Cooking Class', description: 'Learn to make croissants, crêpes, and coq au vin with a Cordon Bleu-trained chef in a beautiful Parisian kitchen.' },
          { time: '7:00 PM', title: 'Bistro Jules Verne', description: 'Fine French dining on the second floor of the Eiffel Tower with panoramic views and a legendary tasting menu.' },
        ],
      },
      {
        title: 'Luxury Shopping & Gardens',
        theme: 'Fashion & Relaxation',
        activities: [
          { time: '10:00 AM', title: 'Tuileries Garden Morning', description: 'A peaceful walk through Paris\'s finest formal garden between the Louvre and the Place de la Concorde.' },
          { time: '12:00 PM', title: 'Rue Saint-Honoré Shopping', description: 'The world\'s most exclusive shopping street — Chanel, Louis Vuitton, Hermès, and haute couture boutiques.' },
          { time: '6:00 PM', title: 'Rooftop at Galeries Lafayette', description: 'Free rooftop terrace above the iconic Art Nouveau department store. Panoramic Paris view with cocktails.' },
        ],
      },
      {
        title: 'Day Trip to Champagne Region',
        theme: 'Wine & Gastronomy',
        activities: [
          { time: '8:30 AM', title: 'Reims Cathedral', description: 'UNESCO-listed Gothic masterpiece where French kings were crowned. Stunning rose window and ancient royal history.' },
          { time: '11:00 AM', title: 'Moët & Chandon Cellars', description: 'Private tour of the legendary champagne cellars beneath the city. Tasting of vintage cuvées with a sommelier.' },
          { time: '4:00 PM', title: 'Vineyard Sunset Drive', description: 'Scenic drive through the Champagne Route vineyards at golden hour before returning to Paris.' },
        ],
      },
      {
        title: 'Hidden Paris',
        theme: 'Secrets & Discovery',
        activities: [
          { time: '9:00 AM', title: 'The Catacombs', description: 'Explore the underground ossuary holding the remains of six million Parisians beneath the city streets.' },
          { time: '12:00 PM', title: 'Saint-Germain-des-Prés', description: 'Paris\'s literary quarter — Café de Flore, existentialist history, independent bookshops, and jazz clubs.' },
          { time: '6:00 PM', title: 'Eiffel Tower Champagne Toast', description: 'Return to the Eiffel Tower at dusk for champagne on the first floor as the tower illuminates for the evening.' },
        ],
      },
    ],
    hotels: {
      budget: { name: 'Generator Paris', location: 'Canal Saint-Martin', stars: 2, pricePerNight: 55, description: 'Designer hostel in a hip neighbourhood with private rooms, rooftop bar, and buzzing social scene.', amenities: ['Free WiFi', 'Rooftop Bar', 'Café', 'Events'] },
      moderate: { name: 'Hôtel de la Tulipe', location: 'Saint-Germain-des-Prés', stars: 3, pricePerNight: 165, description: 'Charming boutique hotel in a 17th-century convent, walking distance from the Louvre.', amenities: ['Free WiFi', 'Courtyard Garden', 'Breakfast', 'Concierge'] },
      premium: { name: 'Le Burgundy Paris', location: '8th Arrondissement', stars: 5, pricePerNight: 420, description: 'Discreet luxury near the Place Vendôme with a renowned spa and Michelin-starred restaurant.', amenities: ['Spa', 'Pool', 'Michelin Dining', 'Concierge', 'Bar'] },
      luxury: { name: 'Hôtel Ritz Paris', location: 'Place Vendôme', stars: 5, pricePerNight: 1200, description: 'The world\'s most legendary hotel. Coco Chanel\'s residence for 34 years. The pinnacle of Parisian luxury.', amenities: ['Butler', 'Pool', 'Full Spa', 'Bar Hemingway', 'Personal Shopper', 'Michelin Dining'] },
    },
    budgetPerDay: { budget: 90, moderate: 220, premium: 480, luxury: 1100 },
    budgetTotalMultiplier: { budget: 1, moderate: 1, premium: 1, luxury: 1 },
    groupTitles: {
      solo: 'Solo Paris Adventure',
      couple: 'Paris Romance',
      family: 'Paris Family Discovery',
      friends: 'Paris Squad Goals',
    },
    groupDescriptions: {
      solo: 'Wander freely through arrondissements, café-hop, and discover hidden Parisian gems at your own pace.',
      couple: 'The most romantic city on Earth awaits — candlelit dinners, champagne at the Eiffel Tower, and afternoon strolls along the Seine.',
      family: 'Explore Versailles, Disneyland Paris, the Louvre kids\' tour, and boat rides on the Seine.',
      friends: 'Art, nightlife, shopping, and the best food and wine Europe has to offer.',
    },
    transport: {
      budget: 'Métro & bus (Navigo pass)',
      moderate: 'Métro + occasional taxi/Vélib\' bikes',
      premium: 'Private driver + Métro',
      luxury: 'Dedicated chauffeur service throughout',
    },
    budgetBreakdown: {
      budget: { accommodation: 28, activities: 22, food: 35, transport: 15 },
      moderate: { accommodation: 38, activities: 22, food: 28, transport: 12 },
      premium: { accommodation: 42, activities: 23, food: 25, transport: 10 },
      luxury: { accommodation: 48, activities: 20, food: 24, transport: 8 },
    },
  },

  tokyo: {
    id: 'tokyo',
    name: 'Tokyo',
    country: 'Japan',
    image: '/src/assets/tokyo.png',
    heroGradient: 'linear-gradient(135deg, #0d0d0d 0%, #1a0533 50%, #2d1b69 100%)',
    tagline: 'Where tradition meets tomorrow',
    timezone: 'JST (UTC+9)',
    currency: 'JPY',
    days: [
      {
        title: 'Neo-Tokyo Experience',
        theme: 'Modern City',
        activities: [
          { time: '9:00 AM', title: 'Shibuya Crossing & Sky View', description: 'Stand at the world\'s busiest pedestrian crossing at rush hour, then ascend to Shibuya Sky observation deck for city panoramas.' },
          { time: '2:00 PM', title: 'Harajuku & Omotesandō', description: 'Japan\'s fashion capital — Takeshita Street\'s wild youth culture meets the luxury boutiques of Omotesandō Avenue.' },
          { time: '7:00 PM', title: 'Shinjuku at Night', description: 'Golden Gai\'s tiny jazz bars, Omoide Yokochō\'s smoky yakitori alleys, and the neon blaze of Kabukichō entertainment district.' },
        ],
      },
      {
        title: 'Ancient Tokyo',
        theme: 'Culture & History',
        activities: [
          { time: '8:00 AM', title: 'Senso-ji Temple at Dawn', description: 'Asakusa\'s 7th-century Buddhist temple is magical at sunrise before the crowds arrive. Thunder Gate, incense, and sacred halls.' },
          { time: '11:00 AM', title: 'Akihabara Electric Town', description: 'The global hub of anime, manga, electronics, and gaming culture. Eight-storey arcades and otaku culture at its most intense.' },
          { time: '6:00 PM', title: 'Traditional Kaiseki Dinner', description: 'A 10-course seasonal Japanese tasting menu at a ryōtei restaurant — the pinnacle of Japanese culinary artistry.' },
        ],
      },
      {
        title: 'Mount Fuji Day Trip',
        theme: 'Nature',
        activities: [
          { time: '7:00 AM', title: 'Hakone & Lake Ashi', description: 'Japan\'s most famous mountain landscape. Pirate ship cruise on Lake Ashi with Mount Fuji reflections on clear days.' },
          { time: '12:00 PM', title: 'Fuji Five Lakes', description: 'Explore the lakes at the base of Mount Fuji by bicycle or kayak. Crystal-clear views of the sacred peak.' },
          { time: '5:00 PM', title: 'Onsen Hot Spring Bath', description: 'Soak in a traditional Japanese onsen with direct Mount Fuji views. The ultimate relaxation experience.' },
        ],
      },
      {
        title: 'Tokyo Food Tour',
        theme: 'Gastronomy',
        activities: [
          { time: '6:00 AM', title: 'Toyosu Fish Market', description: 'World\'s largest tuna auction (advanced reservation required). Fresh sashimi breakfast at the market\'s finest sushi counters.' },
          { time: '11:00 AM', title: 'Tsukiji Outer Market', description: 'Street food paradise — tamagoyaki, fresh oysters, sea urchin on rice, and the finest sushi at standing counters.' },
          { time: '7:00 PM', title: 'Ramen & Izakaya Crawl', description: 'Expert-guided tour of Tokyo\'s best ramen shops and izakayas — craft beer, yakitori, and authentic Japanese nightlife.' },
        ],
      },
      {
        title: 'Parks & Palaces',
        theme: 'Serenity',
        activities: [
          { time: '9:00 AM', title: 'Imperial Palace East Gardens', description: 'Stroll through the gardens of the Imperial Palace in the heart of Tokyo. Ancient moats, stone bridges, and historic towers.' },
          { time: '12:00 PM', title: 'Yanaka Old Town', description: 'Tokyo\'s best-preserved Edo-era neighbourhood — traditional shotengai shopping streets, temples, and artisan workshops.' },
          { time: '5:00 PM', title: 'TeamLab Borderless', description: 'Mind-bending digital art museum with immersive light and sound installations. One of the world\'s most Instagrammed experiences.' },
        ],
      },
      {
        title: 'Kyoto Day Trip',
        theme: 'UNESCO Heritage',
        activities: [
          { time: '6:30 AM', title: 'Shinkansen to Kyoto', description: 'Board the legendary bullet train and reach Japan\'s ancient capital in just 2 hours 15 minutes.' },
          { time: '9:00 AM', title: 'Fushimi Inari Shrine', description: 'Walk through thousands of vermillion torii gates winding up Mount Inari. The most iconic image in Japan.' },
          { time: '1:00 PM', title: 'Arashiyama Bamboo Grove', description: 'The otherworldly bamboo forest and Tenryu-ji Zen garden on the edge of ancient Kyoto. Tea ceremony included.' },
        ],
      },
      {
        title: 'Shopping & Sky',
        theme: 'Retail & Views',
        activities: [
          { time: '10:00 AM', title: 'Ginza Luxury Shopping', description: 'Tokyo\'s most exclusive shopping district — Chanel, Hermès, Uniqlo flagship, and the world\'s most unusual department stores.' },
          { time: '2:00 PM', title: 'Tokyo Skytree', description: 'Japan\'s tallest structure at 634 metres. Two observation decks with views stretching to Mount Fuji on clear days.' },
          { time: '7:00 PM', title: 'Roppongi Hills Rooftop', description: 'Art + architecture complex with a rooftop observatory and Tokyo\'s best selection of contemporary art galleries.' },
        ],
      },
    ],
    hotels: {
      budget: { name: 'Book and Bed Tokyo', location: 'Shinjuku', stars: 2, pricePerNight: 60, description: 'Cult design hostel inside a bookshop — sleep surrounded by thousands of books. Private rooms available.', amenities: ['Library', 'Free WiFi', 'Great Location', 'Café'] },
      moderate: { name: 'Tokyu Stay Shinjuku', location: 'Shinjuku', stars: 3, pricePerNight: 150, description: 'Comfortable hotel in the heart of Shinjuku with kitchenettes and excellent public transport access.', amenities: ['Free WiFi', 'Kitchenette', 'Laundry', 'Convenience Store'] },
      premium: { name: 'Park Hyatt Tokyo', location: 'Shinjuku', stars: 5, pricePerNight: 500, description: 'The hotel from Lost in Translation. Occupies floors 39–52 of a Shinjuku skyscraper with legendary city views.', amenities: ['Peak Bar', 'Pool', 'Spa', 'New York Grill', 'Concierge'] },
      luxury: { name: 'Aman Tokyo', location: 'Ōtemachi', stars: 5, pricePerNight: 1400, description: 'Japan\'s finest urban resort in a 33-storey tower above the Imperial Palace. Japanese minimalism at its absolute peak.', amenities: ['Full Spa', 'Onsen Pool', 'Teppanyaki', 'Butler', 'Tea Ceremony', 'Private Transfer'] },
    },
    budgetPerDay: { budget: 70, moderate: 180, premium: 400, luxury: 900 },
    budgetTotalMultiplier: { budget: 1, moderate: 1, premium: 1, luxury: 1 },
    groupTitles: {
      solo: 'Solo Tokyo Discovery',
      couple: 'Tokyo Romance',
      family: 'Tokyo Family Adventure',
      friends: 'Tokyo Squad',
    },
    groupDescriptions: {
      solo: 'Navigate Tokyo\'s labyrinthine neighbourhoods solo — you\'ll never be lonely in the world\'s greatest city for solo travellers.',
      couple: 'From cherry blossom picnics to kaiseki dinners and couple\'s onsen, Tokyo is unexpectedly romantic.',
      family: 'DisneySea, teamLab, Pokémon Centre, and Robot Restaurant — Tokyo is a child\'s dream destination.',
      friends: 'Izakaya hopping, karaoke, arcades, and the world\'s best street food — Tokyo with friends is legendary.',
    },
    transport: {
      budget: 'IC card (Suica) for all trains and buses',
      moderate: 'Suica card + occasional taxi',
      premium: 'Private car + bullet train for day trips',
      luxury: 'Full-time private chauffeur + first-class Shinkansen',
    },
    budgetBreakdown: {
      budget: { accommodation: 25, activities: 25, food: 35, transport: 15 },
      moderate: { accommodation: 35, activities: 25, food: 28, transport: 12 },
      premium: { accommodation: 42, activities: 25, food: 23, transport: 10 },
      luxury: { accommodation: 50, activities: 20, food: 22, transport: 8 },
    },
  },

  bali: {
    id: 'bali',
    name: 'Bali',
    country: 'Indonesia',
    image: '/src/assets/bali.png',
    heroGradient: 'linear-gradient(135deg, #134e5e 0%, #71b280 100%)',
    tagline: 'Island of the gods',
    timezone: 'WITA (UTC+8)',
    currency: 'IDR',
    days: [
      {
        title: 'Sacred Ubud',
        theme: 'Culture & Spirituality',
        activities: [
          { time: '8:00 AM', title: 'Tegalalang Rice Terrace', description: 'Walk through Bali\'s most iconic terraced rice fields at sunrise. Emerald-green UNESCO-listed agricultural landscape.' },
          { time: '11:30 AM', title: 'Ubud Sacred Monkey Forest', description: 'Ancient temple complex home to 700 long-tailed macaques. Three Hindu temples hidden among towering banyan trees.' },
          { time: '4:00 PM', title: 'Ubud Palace Kecak Dance', description: 'Witness the mesmerising Kecak fire dance at Ubud Palace as the sun sets behind the stage — spine-tingling and unforgettable.' },
        ],
      },
      {
        title: 'Temple Trail',
        theme: 'Spirituality',
        activities: [
          { time: '6:00 AM', title: 'Sunrise at Mount Batur', description: 'Trek to the summit of Bali\'s active volcano by torchlight. Watch the sunrise over the caldera lake from 1,717 metres.' },
          { time: '11:00 AM', title: 'Tirta Empul Temple', description: 'Holy spring water temple where Balinese Hindus purify themselves. Join a traditional melukat purification ritual.' },
          { time: '4:00 PM', title: 'Tanah Lot Sunset', description: 'Bali\'s most iconic image — a sea temple perched on a rock surrounded by crashing waves at golden hour.' },
        ],
      },
      {
        title: 'Seminyak Beach & Spa',
        theme: 'Relaxation',
        activities: [
          { time: '9:00 AM', title: 'Traditional Balinese Massage', description: 'A 2-hour traditional massage and flower bath at a luxury spa. Aromatherapy oils, volcanic stone treatment, and herbal compress.' },
          { time: '2:00 PM', title: 'Seminyak Beach Club', description: 'Spend the afternoon at Potato Head Beach Club — infinity pool, DJs, cocktails, and the best sunset views on the island.' },
          { time: '7:30 PM', title: 'Sunset Dinner at Ku De Ta', description: 'World-famous oceanfront restaurant with the most coveted sunset seats in Bali. Fresh seafood and signature cocktails.' },
        ],
      },
      {
        title: 'Waterfall & Jungle',
        theme: 'Adventure & Nature',
        activities: [
          { time: '8:00 AM', title: 'Sekumpul Waterfall Trek', description: 'Bali\'s most beautiful waterfall — a 4-hour jungle trek to reach seven cascading falls in a lush gorge.' },
          { time: '1:00 PM', title: 'ATV Quad Bike Adventure', description: 'Race through rice paddies, jungle tracks, river crossings, and traditional villages by ATV quad bike.' },
          { time: '5:00 PM', title: 'White Water Rafting', description: 'Grade III rapids through the Ayung River gorge past ancient temple carvings, waterfalls, and tropical jungle.' },
        ],
      },
      {
        title: 'Nusa Penida Island',
        theme: 'Island Hopping',
        activities: [
          { time: '7:00 AM', title: 'Kelingking Beach', description: 'Bali\'s most dramatic viewpoint — the "T-Rex head" cliff with emerald waters 200 metres below. Unmissable.' },
          { time: '12:00 PM', title: 'Broken Beach & Angel\'s Billabong', description: 'Natural rock arch forming a lagoon, and a natural infinity pool carved into the cliffs by the sea.' },
          { time: '3:00 PM', title: 'Manta Ray Snorkelling', description: 'Swim alongside giant oceanic manta rays in the crystal-clear waters of Manta Point. A life-changing encounter.' },
        ],
      },
      {
        title: 'Cooking & Culture',
        theme: 'Gastronomy',
        activities: [
          { time: '8:30 AM', title: 'Morning Market & Cooking Class', description: 'Visit the local market with a Balinese chef, then cook a traditional feast — nasi goreng, satay, and tempeh.' },
          { time: '1:00 PM', title: 'Penglipuran Traditional Village', description: 'Bali\'s most traditional village — bamboo architecture, daily offerings, and ancient Balinese customs preserved for centuries.' },
          { time: '6:00 PM', title: 'Cliff Dinner at Rock Bar', description: 'Ayana Resort\'s legendary cliff-edge bar 14 metres above the Indian Ocean. Best cocktails in Bali at sunset.' },
        ],
      },
      {
        title: 'Surf & Yoga',
        theme: 'Wellness',
        activities: [
          { time: '7:00 AM', title: 'Sunrise Yoga in the Rice Fields', description: 'An hour of yoga at a platform overlooking rice terraces. Balinese meditation and breathwork with a local guru.' },
          { time: '10:00 AM', title: 'Surf Lesson at Kuta Beach', description: 'Beginner to intermediate surf lessons at one of Asia\'s most famous surf beaches with certified instructors.' },
          { time: '5:00 PM', title: 'Ubud Organic Dinner', description: 'Dinner at Sari Organik — a farm-to-table restaurant reached by walking through the rice fields. Wholesome and magical.' },
        ],
      },
    ],
    hotels: {
      budget: { name: 'Desa Seni Eco Village', location: 'Canggu', stars: 2, pricePerNight: 35, description: 'Eco-friendly yoga retreat with sustainable accommodation and community farming.', amenities: ['Yoga Classes', 'Organic Food', 'Pool', 'Garden'] },
      moderate: { name: 'Bisma Eight', location: 'Ubud', stars: 4, pricePerNight: 120, description: 'Boutique hotel with infinity pool overlooking the Campuhan Ridge jungle valley.', amenities: ['Infinity Pool', 'Spa', 'Restaurant', 'Yoga'] },
      premium: { name: 'Alila Ubud', location: 'Ubud Gorge', stars: 5, pricePerNight: 280, description: 'Award-winning jungle retreat perched above the Ayung River gorge. Legendary infinity pool and Balinese wellness.', amenities: ['Infinity Pool', 'Full Spa', 'Trekking', 'Cooking Class', 'Fine Dining'] },
      luxury: { name: 'Amandari', location: 'Kedewatan, Ubud', stars: 5, pricePerNight: 900, description: 'The original Bali Aman resort. Private pool villas in a traditional Balinese village setting above the Ayung River.', amenities: ['Private Pool Villa', 'Butler', 'Full Spa', 'Jungle Trekking', 'Cooking Class'] },
    },
    budgetPerDay: { budget: 40, moderate: 120, premium: 260, luxury: 600 },
    budgetTotalMultiplier: { budget: 1, moderate: 1, premium: 1, luxury: 1 },
    groupTitles: {
      solo: 'Solo Bali Spirit Journey',
      couple: 'Bali Honeymoon',
      family: 'Bali Family Escape',
      friends: 'Bali Squad Retreat',
    },
    groupDescriptions: {
      solo: 'Find yourself on Bali\'s spiritual trails — from sunrise volcano treks to evening yoga and jungle waterfalls.',
      couple: 'The world\'s honeymoon capital. Private villas, romantic rice field dinners, and couple\'s spa rituals.',
      family: 'White-water rafting, rice terrace walks, monkey forests, and cooking classes the whole family will love.',
      friends: 'Surf, parties, beach clubs, waterfalls, and the best $5 cocktails in the world.',
    },
    transport: {
      budget: 'Motor scooter rental',
      moderate: 'Daily driver hire + scooter',
      premium: 'Private car and driver all day',
      luxury: 'Dedicated resort driver with luxury vehicle',
    },
    budgetBreakdown: {
      budget: { accommodation: 25, activities: 30, food: 30, transport: 15 },
      moderate: { accommodation: 35, activities: 28, food: 25, transport: 12 },
      premium: { accommodation: 42, activities: 25, food: 23, transport: 10 },
      luxury: { accommodation: 50, activities: 22, food: 20, transport: 8 },
    },
  },

  'new york': {
    id: 'new-york',
    name: 'New York',
    country: 'USA',
    image: '/src/assets/newyork.png',
    heroGradient: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)',
    tagline: 'The city that never sleeps',
    timezone: 'EST (UTC-5)',
    currency: 'USD',
    days: [
      {
        title: 'Manhattan Icons',
        theme: 'Iconic Landmarks',
        activities: [
          { time: '9:00 AM', title: 'Central Park Morning', description: 'Start with a run or bike ride through 843 acres of urban parkland. Visit Bethesda Fountain, Strawberry Fields, and the Bow Bridge.' },
          { time: '12:00 PM', title: 'The Metropolitan Museum of Art', description: 'The largest art museum in the Americas — 5,000 years of art across 17 curatorial departments. Allow 3 hours minimum.' },
          { time: '6:00 PM', title: 'Top of the Rock Sunset', description: '70th-floor observatory at Rockefeller Center. Watch the sun set behind the Empire State Building — NYC at its most cinematic.' },
        ],
      },
      {
        title: 'Lower Manhattan & Brooklyn',
        theme: 'History & Culture',
        activities: [
          { time: '9:00 AM', title: 'Statue of Liberty & Ellis Island', description: 'Ferry to Liberty Island and Ellis Island — the gateway through which 12 million immigrants entered America.' },
          { time: '2:00 PM', title: 'Brooklyn Bridge Walk', description: 'Walk or cycle across the iconic 1883 suspension bridge for stunning Manhattan skyline views.' },
          { time: '6:00 PM', title: 'Brooklyn DUMBO & Dinner', description: 'Cobblestone streets under the bridge, with Manhattan skyline views and Brooklyn\'s best restaurants along Water Street.' },
        ],
      },
      {
        title: 'Art & Culture Day',
        theme: 'Museums',
        activities: [
          { time: '10:00 AM', title: 'MoMA — Museum of Modern Art', description: 'Picasso, Warhol, Pollock, and Klimt. The world\'s greatest collection of modern and contemporary art.' },
          { time: '2:00 PM', title: 'Chelsea Art Galleries', description: 'Wander through 300+ contemporary art galleries in former warehouses — free admission, world-class art.' },
          { time: '7:00 PM', title: 'Broadway Show', description: 'The pinnacle of live performance — Hamilton, The Lion King, or whichever show is the talk of the city.' },
        ],
      },
      {
        title: 'Food Tour NYC',
        theme: 'Gastronomy',
        activities: [
          { time: '8:00 AM', title: 'Russ & Daughters Café', description: 'The legendary Lower East Side institution since 1914. Best bagel and lox breakfast in the world — no debate.' },
          { time: '12:00 PM', title: 'Chelsea Market', description: 'Converted factory with 30+ artisanal food vendors — Lobster Place, Dickson\'s Farmstand Meats, and Esposito\'s.' },
          { time: '7:00 PM', title: 'Le Bernardin Dinner', description: 'Three Michelin-starred seafood temple. Consistently rated among the top 10 restaurants in the world.' },
        ],
      },
      {
        title: 'Uptown & The Bronx',
        theme: 'Neighbourhoods',
        activities: [
          { time: '9:00 AM', title: 'Harlem Gospel Church Tour', description: 'Join Sunday morning Gospel service at an authentic Harlem church — soul music, community, and American history.' },
          { time: '12:00 PM', title: 'Yankee Stadium Tour', description: 'Behind-the-scenes tour of the home of the New York Yankees — dugout, clubhouse, and Monument Park.' },
          { time: '6:00 PM', title: 'Arthur Avenue Little Italy', description: 'The "real" Little Italy in the Bronx — authentic Italian bakeries, butchers, and family restaurants since the 1900s.' },
        ],
      },
      {
        title: 'The High Line & Hudson Yards',
        theme: 'Architecture',
        activities: [
          { time: '10:00 AM', title: 'The High Line', description: 'Elevated linear park built on a former railway — 1.45 miles of gardens, art installations, and Hudson River views.' },
          { time: '1:00 PM', title: 'Hudson Yards & The Vessel', description: 'NYC\'s newest neighbourhood — climb the 2,500-step honeycomb sculpture for 360° views over the Hudson.' },
          { time: '6:00 PM', title: 'Edge Observation Deck', description: 'The highest outdoor sky deck in the Western Hemisphere — glass floor, angled glass walls, and 100-mile views.' },
        ],
      },
      {
        title: 'Day Trip to Hamptons',
        theme: 'Escape',
        activities: [
          { time: '8:00 AM', title: 'Long Island Railway to Southampton', description: '2-hour train journey through Long Island to the Hamptons — the playgrounds of Manhattan\'s elite.' },
          { time: '11:00 AM', title: 'East Hampton Village', description: 'America\'s most expensive zip code — art galleries, designer boutiques, and celebrity-spotting on Main Street.' },
          { time: '4:00 PM', title: 'Sagaponack Beach Sunset', description: 'Miles of pristine Atlantic beach dunes. Watch the sun set over the ocean before the train back to the city.' },
        ],
      },
    ],
    hotels: {
      budget: { name: 'HI NYC Hostel', location: 'Upper West Side', stars: 2, pricePerNight: 65, description: 'Landmark 1883 building turned hostel on the Upper West Side, steps from Central Park.', amenities: ['Free WiFi', 'Communal Kitchen', 'Central Park Access', 'Events'] },
      moderate: { name: 'Pod 51', location: 'Midtown East', stars: 3, pricePerNight: 180, description: 'Compact, smartly designed hotel with a rooftop bar and prime midtown Manhattan location.', amenities: ['Rooftop Bar', 'Free WiFi', 'Concierge', 'Prime Location'] },
      premium: { name: '1 Hotel Central Park', location: 'Central Park South', stars: 5, pricePerNight: 550, description: 'Biophilic luxury hotel overlooking Central Park with a rooftop pool and farm-to-table dining.', amenities: ['Rooftop Pool', 'Spa', 'Farm Dining', 'Central Park View', 'Bar'] },
      luxury: { name: 'The Mark Hotel', location: 'Upper East Side', stars: 5, pricePerNight: 1500, description: 'Jean-Georges Vongerichten\'s flagship NYC restaurant and one of the world\'s most celebrated urban hotels.', amenities: ['Butler', 'Penthouse Suite', 'Jean-Georges Restaurant', 'Spa', 'Mark\'s Bar'] },
    },
    budgetPerDay: { budget: 100, moderate: 250, premium: 550, luxury: 1400 },
    budgetTotalMultiplier: { budget: 1, moderate: 1, premium: 1, luxury: 1 },
    groupTitles: {
      solo: 'Solo New York Experience',
      couple: 'New York Romance',
      family: 'New York Family Adventure',
      friends: 'New York Squad',
    },
    groupDescriptions: {
      solo: 'New York is the world\'s greatest solo travel city — every neighbourhood is a world unto itself.',
      couple: 'Rooftop bars, Broadway shows, Central Park carriage rides, and the most romantic skyline on Earth.',
      family: 'Central Park, the Natural History Museum, the High Line, and world-class pizza — perfect for all ages.',
      friends: 'The city where everything happens — nightlife, brunch culture, sports, art, and endless food.',
    },
    transport: {
      budget: 'Subway (MetroCard)',
      moderate: 'Subway + occasional Yellow Cab',
      premium: 'Private SUV + subway for exploration',
      luxury: 'Full-time chauffeur with luxury SUV',
    },
    budgetBreakdown: {
      budget: { accommodation: 30, activities: 25, food: 30, transport: 15 },
      moderate: { accommodation: 38, activities: 22, food: 28, transport: 12 },
      premium: { accommodation: 43, activities: 23, food: 24, transport: 10 },
      luxury: { accommodation: 48, activities: 20, food: 24, transport: 8 },
    },
  },

  dubai: {
    id: 'dubai',
    name: 'Dubai',
    country: 'UAE',
    image: '/src/assets/dubai.png',
    heroGradient: 'linear-gradient(135deg, #c6862a 0%, #a0522d 30%, #2d1b69 100%)',
    tagline: 'Where the future is already here',
    timezone: 'GST (UTC+4)',
    currency: 'AED',
    days: [
      {
        title: 'Vertical Dubai',
        theme: 'Modern Marvels',
        activities: [
          { time: '9:00 AM', title: 'Burj Khalifa — At the Top', description: 'Ascend to the world\'s tallest building observation deck on floor 148. Views stretch 100 km on a clear day.' },
          { time: '1:00 PM', title: 'Dubai Mall & Aquarium', description: 'The world\'s largest shopping mall — Dubai Aquarium with 30,000 marine animals, an indoor ice rink, and over 1,200 stores.' },
          { time: '7:00 PM', title: 'Dubai Fountain Show', description: 'The world\'s largest choreographed fountain shows at the base of the Burj Khalifa, over the Burj Khalifa Lake.' },
        ],
      },
      {
        title: 'Old Dubai & The Creek',
        theme: 'History & Heritage',
        activities: [
          { time: '9:00 AM', title: 'Dubai Creek Abra Ride', description: 'Cross the historic Creek by traditional wooden abra boat — the same journey made by pearl divers 100 years ago.' },
          { time: '11:00 AM', title: 'Gold & Spice Souks', description: 'Wander through the glittering Gold Souk (200+ shops) and the aromatic Spice Souk in Deira — the real Dubai.' },
          { time: '4:00 PM', title: 'Al Fahidi Historical Neighbourhood', description: 'Dubai\'s oldest district — wind-tower architecture, the Dubai Museum, and galleries in restored merchant houses.' },
        ],
      },
      {
        title: 'Desert Adventure',
        theme: 'Adventure',
        activities: [
          { time: '3:00 PM', title: 'Desert Safari & Dune Bashing', description: '4x4 convoy through the red sand dunes of the Arabian Desert at high speed — the adrenaline rush Dubai is famous for.' },
          { time: '5:30 PM', title: 'Camel Riding & Sandboarding', description: 'Ride camels across the dunes and sandboard down 30-metre slopes as the desert glows golden at sunset.' },
          { time: '7:30 PM', title: 'Bedouin Camp Dinner', description: 'Traditional Bedouin dinner under the stars — Arabic mezze, shisha, belly dancing, and a night sky with no light pollution.' },
        ],
      },
      {
        title: 'Palm Jumeirah & Marina',
        theme: 'Luxury',
        activities: [
          { time: '10:00 AM', title: 'Atlantis Aquaventure Waterpark', description: 'Dubai\'s legendary waterpark on the Palm — the Leap of Faith slide, lazy river, and private beach access.' },
          { time: '2:00 PM', title: 'Dubai Marina Walk', description: 'Stunning 7km waterfront promenade lined with 200 towers, yacht clubs, restaurants, and sunset views.' },
          { time: '7:00 PM', title: 'Nobu Dubai Dinner', description: 'The legendary Japanese-Peruvian fusion restaurant with Dubai Marina views and the city\'s finest sushi omakase.' },
        ],
      },
      {
        title: 'Culture & Future',
        theme: 'Arts',
        activities: [
          { time: '10:00 AM', title: 'Museum of the Future', description: 'The world\'s most beautiful building according to UNESCO. A visionary 5 floors of future technology experiences.' },
          { time: '1:00 PM', title: 'Alserkal Avenue Arts', description: 'Dubai\'s creative hub in a warehouse district — 60+ galleries, art studios, independent cinemas, and concept stores.' },
          { time: '6:00 PM', title: 'Dubai Frame at Sunset', description: 'A 150-metre picture frame straddling old and new Dubai. The glass floor walkway offers breathtaking views both ways.' },
        ],
      },
      {
        title: 'Luxury Beach Day',
        theme: 'Relaxation',
        activities: [
          { time: '9:00 AM', title: 'JBR Beach Club Morning', description: 'Jumeirah Beach Residence\'s 1.7km public beach with clear Persian Gulf waters — watersports and beach volleyball.' },
          { time: '1:00 PM', title: 'Jumeirah Beach Hotel Spa', description: '6-hour Royal Treatment at one of Dubai\'s most prestigious hotel spas — hammam, massage, and gold facial.' },
          { time: '7:00 PM', title: 'Sky Views Dubai Dinner', description: 'Restaurant on the 53rd and 54th floor of Address Sky View hotel — glass slide between floors and peerless city views.' },
        ],
      },
      {
        title: 'Abu Dhabi Day Trip',
        theme: 'Culture',
        activities: [
          { time: '7:30 AM', title: 'Sheikh Zayed Grand Mosque', description: 'One of the world\'s largest and most beautiful mosques. 82 domes, 1,000+ columns, and the world\'s largest hand-knotted carpet.' },
          { time: '1:00 PM', title: 'Louvre Abu Dhabi', description: 'The Arab world\'s first universal art museum, designed by Jean Nouvel. Rain of light dome and world masterpieces.' },
          { time: '5:00 PM', title: 'Yas Island — Ferrari World', description: 'The world\'s fastest roller coaster (Formula Rossa, 240 km/h) inside the largest indoor theme park on Earth.' },
        ],
      },
    ],
    hotels: {
      budget: { name: 'Citymax Hotel Al Barsha', location: 'Al Barsha', stars: 3, pricePerNight: 75, description: 'Clean, well-located budget hotel close to Mall of the Emirates and metro access.', amenities: ['Pool', 'Free WiFi', 'Restaurant', 'Gym'] },
      moderate: { name: 'Rove Downtown', location: 'Downtown Dubai', stars: 3, pricePerNight: 180, description: 'Dubai\'s coolest midscale hotel brand — walking distance from Burj Khalifa and Dubai Mall.', amenities: ['Pool', 'Free WiFi', 'Café', 'Gym', 'Great Location'] },
      premium: { name: 'W Dubai – The Palm', location: 'Palm Jumeirah', stars: 5, pricePerNight: 450, description: 'Bold luxury hotel on the Palm with WET deck pools, private beach, and stunning Burj Al Arab views.', amenities: ['Private Beach', 'Pool', 'Spa', 'STAY Restaurant', 'Kids Club'] },
      luxury: { name: 'Burj Al Arab Jumeirah', location: 'Jumeirah', stars: 5, pricePerNight: 2000, description: 'The world\'s most recognisable hotel on its own island. The original definition of ultra-luxury — 24-karat gold iPad and butler.', amenities: ['Butler', 'Helicopter Transfer', 'Private Beach', 'Full Spa', 'Michelin Dining', 'Rolls Royce'] },
    },
    budgetPerDay: { budget: 90, moderate: 230, premium: 520, luxury: 1500 },
    budgetTotalMultiplier: { budget: 1, moderate: 1, premium: 1, luxury: 1 },
    groupTitles: {
      solo: 'Solo Dubai Discovery',
      couple: 'Dubai Luxury Romance',
      family: 'Dubai Family Fun',
      friends: 'Dubai Squad',
    },
    groupDescriptions: {
      solo: 'Dubai rewards the solo explorer — safe, connected, and endlessly interesting from sunrise over the Creek to midnight at the Marina.',
      couple: 'Sundowner desert safaris, private beach dinners, and the most spectacular skyline views — romance elevated.',
      family: 'Waterparks, aquariums, skiing indoors, and the world\'s largest theme parks — children will talk about Dubai forever.',
      friends: 'Yacht parties, rooftop brunches, desert quad bikes, and the world\'s most extravagant nightlife.',
    },
    transport: {
      budget: 'Dubai Metro + RTA buses',
      moderate: 'Metro + Careem app',
      premium: 'Private SUV transfers + Metro',
      luxury: 'Dedicated chauffeur + helicopter transfers',
    },
    budgetBreakdown: {
      budget: { accommodation: 28, activities: 30, food: 28, transport: 14 },
      moderate: { accommodation: 35, activities: 28, food: 25, transport: 12 },
      premium: { accommodation: 42, activities: 27, food: 22, transport: 9 },
      luxury: { accommodation: 50, activities: 22, food: 20, transport: 8 },
    },
  },

  switzerland: {
    id: 'switzerland',
    name: 'Switzerland',
    country: 'Switzerland',
    image: '/src/assets/switzerland.png',
    heroGradient: 'linear-gradient(135deg, #2c3e50 0%, #4a6741 50%, #2980b9 100%)',
    tagline: 'Peaks, lakes, and pure magic',
    timezone: 'CET (UTC+1)',
    currency: 'CHF',
    days: [
      {
        title: 'Jungfrau Region',
        theme: 'Alpine Adventure',
        activities: [
          { time: '8:00 AM', title: 'Jungfraujoch — Top of Europe', description: 'Europe\'s highest railway station at 3,454 metres. Glacier views, the Sphinx Observatory, and eternal snow year-round.' },
          { time: '2:00 PM', title: 'Grindelwald Glacier Canyon', description: 'Hike along the glacial canyon of the Grindelwald glacier — turquoise ice walls and dramatic Alpine scenery.' },
          { time: '7:00 PM', title: 'Interlaken Fondue Evening', description: 'Traditional Swiss fondue and raclette in a mountain chalet in Interlaken, washed down with local white wine.' },
        ],
      },
      {
        title: 'Lucerne & Lake Views',
        theme: 'Lakes & History',
        activities: [
          { time: '9:00 AM', title: 'Chapel Bridge & Old Town', description: 'Europe\'s oldest covered wooden bridge (1333) through the heart of medieval Lucerne. Stunning water tower views.' },
          { time: '12:00 PM', title: 'Lake Lucerne Cruise', description: 'Paddle steamer cruise on one of Europe\'s most beautiful mountain lakes, surrounded by snow-capped Alpine peaks.' },
          { time: '5:00 PM', title: 'Mount Pilatus Sunset', description: 'The world\'s steepest rack railway to the summit. Panorama restaurant with sunset views over 73 Alpine peaks.' },
        ],
      },
      {
        title: 'Zermatt & the Matterhorn',
        theme: 'Iconic Mountains',
        activities: [
          { time: '7:00 AM', title: 'Matterhorn Glacier Paradise', description: 'The highest cable car in the Alps reaches 3,883 metres. The Matterhorn up close — one of the great sights of Europe.' },
          { time: '11:00 AM', title: 'Zermatt Village', description: 'Car-free Alpine village with horse-drawn carriages, haute cuisine restaurants, and luxury watchmakers.' },
          { time: '4:00 PM', title: 'Gorner Gorge & Hiking', description: 'Walk through the dramatic Gorner Gorge with its turquoise glacier-fed river and hanging bridges in the rock face.' },
        ],
      },
      {
        title: 'Geneva & Lake Léman',
        theme: 'International City',
        activities: [
          { time: '9:00 AM', title: 'CERN Large Hadron Collider Tour', description: 'Behind-the-scenes guided tour of the world\'s largest particle accelerator where the Higgs boson was discovered.' },
          { time: '1:00 PM', title: 'Jet d\'Eau & Old Town', description: 'Geneva\'s iconic 140-metre water jet on Lake Léman. Explore the medieval Vieille Ville and St. Pierre Cathedral rooftop.' },
          { time: '6:00 PM', title: 'Watchmaker Workshop', description: 'Private visit to a Swiss watchmaking atelier — see master craftsmen building and finishing luxury timepieces by hand.' },
        ],
      },
      {
        title: 'Bernese Oberland',
        theme: 'Rural Switzerland',
        activities: [
          { time: '9:00 AM', title: 'Lauterbrunnen Valley', description: '72 waterfalls cascade from sheer 1,000-metre cliffs in Switzerland\'s most dramatic valley — the inspiration for Tolkien\'s Rivendell.' },
          { time: '12:00 PM', title: 'Trümmelbach Falls', description: 'Glacier waterfalls inside the mountain — 20,000 litres per second carving through the rock in enormous caverns.' },
          { time: '4:00 PM', title: 'Mürren Village', description: 'Car-free cliffside village accessible only by cable car. Sunset over the Eiger, Mönch, and Jungfrau from 1,638 metres.' },
        ],
      },
      {
        title: 'Chocolate & Cheese Trail',
        theme: 'Gastronomy',
        activities: [
          { time: '9:00 AM', title: 'Gruyères Cheese Dairy', description: 'Visit the working Gruyères cheese dairy and taste freshly made Swiss cheese. Medieval town with authentic fondue restaurants.' },
          { time: '1:00 PM', title: 'Cailler Chocolate Factory', description: 'Switzerland\'s oldest chocolate brand — immersive sensory tour ending in an unlimited chocolate tasting room.' },
          { time: '5:00 PM', title: 'Fribourg Old Town', description: 'One of Switzerland\'s best-preserved medieval towns. Suspension bridge, Gothic cathedral, and local craft beer.' },
        ],
      },
      {
        title: 'St. Moritz & Engadine',
        theme: 'Luxury Alpine',
        activities: [
          { time: '8:00 AM', title: 'Glacier Express Train', description: 'The world\'s slowest express train — 8 hours of spectacular Alpine scenery through 291 bridges and 91 tunnels.' },
          { time: '2:00 PM', title: 'St. Moritz Village', description: 'The birthplace of winter tourism — boutiques, art galleries, and the legendary Badrutt\'s Palace Hotel.' },
          { time: '6:00 PM', title: 'Draghino Sunset Dinner', description: 'Horse-drawn sleigh ride to a candlelit mountain restaurant. Swiss tasting menu with local alpine wines.' },
        ],
      },
    ],
    hotels: {
      budget: { name: 'YHA Geneva', location: 'Geneva', stars: 2, pricePerNight: 55, description: 'Central youth hostel on the lake in Geneva with private rooms, great facilities, and lake views.', amenities: ['Lake View', 'Free WiFi', 'Kitchen', 'Communal Lounge'] },
      moderate: { name: 'Hotel Schweizerhof Bern', location: 'Bern Old Town', stars: 4, pricePerNight: 220, description: 'Classic Swiss hotel in the UNESCO-listed Bern Old Town, minutes from the Federal Palace.', amenities: ['Spa', 'Restaurant', 'Concierge', 'Historic Building'] },
      premium: { name: 'Victoria-Jungfrau Grand Hotel', location: 'Interlaken', stars: 5, pricePerNight: 520, description: 'The grande dame of Swiss hotels since 1865. Direct Jungfrau mountain views, legendary spa, and outdoor pool.', amenities: ['Mountain View', 'Full Spa', 'Outdoor Pool', 'Fine Dining', 'Tennis'] },
      luxury: { name: 'Badrutt\'s Palace Hotel', location: 'St. Moritz', stars: 5, pricePerNight: 1800, description: 'The cradle of alpine tourism since 1896. Princess Diana, Audrey Hepburn, and royalty all stayed here.', amenities: ['Ice Bar', 'Full Spa', 'King\'s Club', 'Skating Rink', 'Multiple Restaurants', 'Butler'] },
    },
    budgetPerDay: { budget: 120, moderate: 280, premium: 580, luxury: 1400 },
    budgetTotalMultiplier: { budget: 1, moderate: 1, premium: 1, luxury: 1 },
    groupTitles: {
      solo: 'Solo Swiss Alpine Adventure',
      couple: 'Swiss Alpine Romance',
      family: 'Swiss Family Mountain Escape',
      friends: 'Swiss Alps Adventure Squad',
    },
    groupDescriptions: {
      solo: 'Hike the Via Alpina, take scenic trains alone, and find peace in the world\'s most beautiful mountain landscapes.',
      couple: 'Fondue by candlelight, cable cars to snow-covered peaks, and sunset champagne overlooking the Matterhorn.',
      family: 'Skiing, sledging, Swiss chocolate factory tours, and cogwheel trains that feel like they\'re from a fairy tale.',
      friends: 'Skiing, paragliding, canyoning, and après-ski parties in the world\'s most spectacular mountain settings.',
    },
    transport: {
      budget: 'Swiss Travel Pass (trains, buses, boats)',
      moderate: 'Swiss Travel Pass + occasional taxi',
      premium: 'Swiss Travel Pass + private transfers for mountains',
      luxury: 'Private helicopter + luxury train journeys',
    },
    budgetBreakdown: {
      budget: { accommodation: 28, activities: 25, food: 30, transport: 17 },
      moderate: { accommodation: 35, activities: 25, food: 25, transport: 15 },
      premium: { accommodation: 42, activities: 25, food: 22, transport: 11 },
      luxury: { accommodation: 48, activities: 22, food: 20, transport: 10 },
    },
  },

  goa: {
    id: 'goa',
    name: 'Goa',
    country: 'India',
    image: '/src/assets/goa.png',
    heroGradient: 'linear-gradient(135deg, #f09819 0%, #ff5858 50%, #c0392b 100%)',
    tagline: 'Sun, spice, and soul',
    timezone: 'IST (UTC+5:30)',
    currency: 'INR',
    days: [
      {
        title: 'North Goa Beach Hop',
        theme: 'Beaches',
        activities: [
          { time: '9:00 AM', title: 'Baga & Calangute Beach', description: 'Goa\'s most famous beaches — sunloungers, watersports, and an uninterrupted stretch of golden sand. Parasailing and jet skiing.' },
          { time: '1:00 PM', title: 'Anjuna Flea Market', description: 'Legendary Wednesday market sprawling across Anjuna beach — clothing, jewelry, spices, and Kashmiri crafts.' },
          { time: '6:00 PM', title: 'Sunset at Vagator Beach', description: 'Dramatic red-cliff beach with the silhouette of Chapora Fort at sunset. Legendary parties begin after dark.' },
        ],
      },
      {
        title: 'Portuguese Old Goa',
        theme: 'History & Culture',
        activities: [
          { time: '9:30 AM', title: 'Basilica of Bom Jesus', description: 'UNESCO World Heritage Site housing the mortal remains of St. Francis Xavier. Baroque architecture from 1605.' },
          { time: '12:00 PM', title: 'Fontainhas Latin Quarter', description: 'Goa\'s Portuguese-era heritage quarter in Panaji — colourful colonial houses, bakeries, and fado music.' },
          { time: '5:00 PM', title: 'Chapora Fort Sunset', description: 'Made famous by Dil Chahta Hai — dramatic coastal fort with panoramic views over Vagator and Anjuna beaches.' },
        ],
      },
      {
        title: 'Spice Plantation & Backwaters',
        theme: 'Nature',
        activities: [
          { time: '9:00 AM', title: 'Tropical Spice Plantation', description: 'Walk through vanilla, cardamom, pepper, and nutmeg plants. Traditional Goan thali lunch prepared with fresh plantation spices.' },
          { time: '2:00 PM', title: 'Mandovi River Cruise', description: 'Sunset cruise on Goa\'s main river with Goan music, traditional food, and views of the estuarine wildlife.' },
          { time: '6:00 PM', title: 'Dudhsagar Waterfalls', description: 'Four-tiered waterfall on the Goa-Karnataka border — 310 metres of cascading white water through dense jungle.' },
        ],
      },
      {
        title: 'South Goa Serenity',
        theme: 'Relaxation',
        activities: [
          { time: '9:00 AM', title: 'Palolem Beach', description: 'Goa\'s most beautiful beach — a crescent of palm-fringed white sand with calm shallow waters and dolphin sightings.' },
          { time: '1:00 PM', title: 'Ayurvedic Wellness Treatment', description: 'Traditional Keralite Ayurveda treatment — Shirodhara oil pouring, Abhyanga full-body massage, and herbal steam.' },
          { time: '5:30 PM', title: 'Agonda Beach Sunset', description: 'One of India\'s cleanest beaches — pristine, uncrowded, and perfect for watching the sun melt into the Arabian Sea.' },
        ],
      },
      {
        title: 'Goa Food Safari',
        theme: 'Gastronomy',
        activities: [
          { time: '9:00 AM', title: 'Local Breakfast — Poha & Chai', description: 'Start with a traditional Goan breakfast at a local café — bebinca cake, pohe, and sweet chai. Watch the market wake up.' },
          { time: '11:00 AM', title: 'Seafood Market & Cooking Class', description: 'Pick fresh tiger prawns and Kingfish from the market, then cook traditional Goan curry with a local family.' },
          { time: '7:00 PM', title: 'Vinayak Family Restaurant Dinner', description: 'The legendary Goan thali restaurant — prawn balchão, fish curry rice, and Goa\'s famous bebinca dessert.' },
        ],
      },
      {
        title: 'Adventure Sports Day',
        theme: 'Adventure',
        activities: [
          { time: '8:00 AM', title: 'Surfing at Ashwem Beach', description: 'Goa\'s best surf spot — lessons for all levels with certified instructors in warm Arabian Sea waves.' },
          { time: '12:00 PM', title: 'Scuba Diving at Grande Island', description: '30-minute speedboat to Grande Island for drift dives with barracuda, rays, and vibrant coral reef at 15 metres depth.' },
          { time: '5:00 PM', title: 'Goa\'s Secret Beach Bar Crawl', description: 'The legendary Curlies, Shiva Valley, and Saturday Night Market — Goa\'s beach party scene at its most iconic.' },
        ],
      },
      {
        title: 'Hampi Day Trip',
        theme: 'UNESCO Heritage',
        activities: [
          { time: '6:00 AM', title: 'Drive to Hampi', description: 'Early morning drive to the UNESCO World Heritage ruins of the Vijayanagara Empire — one of India\'s most spectacular sites.' },
          { time: '10:00 AM', title: 'Virupaksha Temple & Ruins', description: 'Explore the ancient ruins of a 14th-century empire — temples, elephant stables, royal enclosures across 26 sq km.' },
          { time: '4:00 PM', title: 'Sunset at Matanga Hill', description: 'Climb to the summit for a sunset view over the entire Hampi landscape — boulders, temples, and banana plantations.' },
        ],
      },
    ],
    hotels: {
      budget: { name: 'Jungle Guest House', location: 'Anjuna', stars: 2, pricePerNight: 20, description: 'Charming backpacker guesthouse in a coconut grove near Anjuna Beach. Hammocks, community kitchen, and good vibes.', amenities: ['Hammocks', 'Community Kitchen', 'Garden', 'Yoga Space'] },
      moderate: { name: 'Acron Waterfront Resort', location: 'Baga River', stars: 3, pricePerNight: 80, description: 'Riverside resort on the Baga River with a pool, boats, and the greenest setting in North Goa.', amenities: ['Pool', 'Riverside Location', 'Restaurant', 'Kayaking'] },
      premium: { name: 'The Leela Goa', location: 'Cavelossim', stars: 5, pricePerNight: 250, description: 'South Goa\'s iconic luxury resort — 187 acres of private beach, Ayurvedic spa, and Portuguese-inspired architecture.', amenities: ['Private Beach', 'Spa', 'Golf', 'Multiple Pools', 'Fine Dining', 'Watersports'] },
      luxury: { name: 'Taj Exotica Resort & Spa', location: 'Benaulim Beach', stars: 5, pricePerNight: 600, description: 'Goa\'s most exclusive resort on 56 acres of pristine private beachfront. Butler service and ultimate Goan luxury.', amenities: ['Butler', 'Private Beach', 'Full Spa', 'Multiple Restaurants', 'Infinity Pool', 'Water Sports'] },
    },
    budgetPerDay: { budget: 25, moderate: 80, premium: 200, luxury: 500 },
    budgetTotalMultiplier: { budget: 1, moderate: 1, premium: 1, luxury: 1 },
    groupTitles: {
      solo: 'Solo Goa Spirit Journey',
      couple: 'Goa Beach Romance',
      family: 'Goa Family Holiday',
      friends: 'Goa Party Squad',
    },
    groupDescriptions: {
      solo: 'Goa has always been a haven for solo travellers — yoga retreats, backpacker hostels, and a global community of free spirits.',
      couple: 'Private beach dinners, couples\' Ayurveda, dolphin cruises at sunrise — Goa is surprisingly romantic.',
      family: 'Clean south Goa beaches, spice plantation lunches, water sports, and unforgettable Goan food together.',
      friends: 'The legendary Indian beach party destination — beach shacks, nightlife, watersports, and unforgettable sunsets.',
    },
    transport: {
      budget: 'Rented scooter (₹300/day)',
      moderate: 'Rented scooter + occasional Goa taxi',
      premium: 'Private car and driver all day',
      luxury: 'Resort transfers + private car for excursions',
    },
    budgetBreakdown: {
      budget: { accommodation: 22, activities: 28, food: 32, transport: 18 },
      moderate: { accommodation: 32, activities: 27, food: 28, transport: 13 },
      premium: { accommodation: 42, activities: 25, food: 23, transport: 10 },
      luxury: { accommodation: 50, activities: 22, food: 20, transport: 8 },
    },
  },
};

export const DESTINATION_LIST = [
  { id: 'sydney', name: 'Sydney', country: 'Australia', emoji: '🦘' },
  { id: 'paris', name: 'Paris', country: 'France', emoji: '🗼' },
  { id: 'tokyo', name: 'Tokyo', country: 'Japan', emoji: '🗾' },
  { id: 'bali', name: 'Bali', country: 'Indonesia', emoji: '🌴' },
  { id: 'new york', name: 'New York', country: 'USA', emoji: '🗽' },
  { id: 'dubai', name: 'Dubai', country: 'UAE', emoji: '🏙️' },
  { id: 'switzerland', name: 'Switzerland', country: 'Switzerland', emoji: '🏔️' },
  { id: 'goa', name: 'Goa', country: 'India', emoji: '🏖️' },
];

export function findDestination(input: string): DestinationInfo | null {
  const normalized = input.toLowerCase().trim();
  if (DESTINATIONS[normalized]) return DESTINATIONS[normalized];
  for (const key of Object.keys(DESTINATIONS)) {
    const dest = DESTINATIONS[key];
    if (
      dest.name.toLowerCase().includes(normalized) ||
      normalized.includes(dest.name.toLowerCase()) ||
      dest.country.toLowerCase().includes(normalized) ||
      normalized.includes(dest.id)
    ) {
      return dest;
    }
  }
  return null;
}

export function getTripDays(dest: DestinationInfo, numDays: number): DayPlan[] {
  const result: DayPlan[] = [];
  for (let i = 0; i < numDays; i++) {
    result.push(dest.days[i % dest.days.length]);
  }
  return result;
}

export function calculateTotalBudget(
  dest: DestinationInfo,
  numDays: number,
  budgetType: string,
  companion: string
): number {
  const perDay = dest.budgetPerDay[budgetType] || dest.budgetPerDay.moderate;
  let multiplier = 1;
  if (companion === 'couple') multiplier = 1.8;
  else if (companion === 'family') multiplier = 3.2;
  else if (companion === 'friends') multiplier = 2.5;
  return Math.round(perDay * numDays * multiplier);
}

export function getTravelerCount(companion: string): string {
  if (companion === 'solo') return '1 Traveler';
  if (companion === 'couple') return '2 Travelers';
  if (companion === 'family') return '4-5 Travelers';
  if (companion === 'friends') return '4-6 Travelers';
  return '2 Travelers';
}

export const BUDGET_LABELS: Record<string, string> = {
  budget: 'Budget Friendly',
  moderate: 'Moderate',
  premium: 'Premium',
  luxury: 'Luxury',
};

export const COMPANION_LABELS: Record<string, string> = {
  solo: 'Solo Explorer',
  couple: 'Couple',
  family: 'Family',
  friends: 'Friends Group',
};

export default DESTINATIONS;
