# 🍽️ GoodFood – Restaurant Finder

**GoodFood** is an Android restaurant discovery application built with React Native. It helps users discover restaurants near their current location, explore restaurant information, filter by cuisine, and get directions using Google Maps.

The application uses GPS-based location services and the Geoapify Places API to retrieve nearby restaurant information.

## ✨ Features

- **Discover Nearby Restaurants** – Find restaurants based on your current GPS location.
- **Restaurant Details** – View restaurant names, addresses, cuisine types, and location information.
- **Search Restaurants** – Search for restaurants by name.
- **Cuisine Filters** – Filter restaurants by available cuisine categories.
- **Google Maps Directions** – Open Google Maps to navigate to a selected restaurant.
- **Location Services** – Use device location to discover nearby places.
- **User-Friendly Interface** – Clean and intuitive interface designed for a smooth browsing experience.

## Screenshots

<img width="270" height="600" alt="Screenshot_1794028656" src="https://github.com/user-attachments/assets/aeaaa287-45b9-41f8-acf5-0fae707f1725" />
<img width="270" height="600" alt="Screenshot_1794028660" src="https://github.com/user-attachments/assets/71b2a3ad-dbbe-4c8c-86df-c96e96c6b844" />

## 🛠️ Technology Stack

| Technology                       | Purpose                                     |
| -------------------------------- | ------------------------------------------- |
| React Native                     | Cross-platform mobile development framework |
| TypeScript                       | Type-safe application development           |
| React Navigation                 | Screen navigation                           |
| Geoapify Places API              | Nearby restaurant discovery                 |
| React Native Geolocation Service | GPS location access                         |
| React Native Config              | Environment variable management             |
| Google Maps                      | Restaurant directions                       |

## 📁 Project Structure

```text
GoodFood/
├── android/
├── src/
│   ├── components/
│   │   ├── RestaurantCard.tsx
│   │   ├── SearchBar.tsx
│   │   └── CuisineFilter.tsx
│   │
│   ├── config/
│   │   └── api.ts
│   │
│   ├── hooks/
│   │   └── useLocation.ts
│   │
│   ├── navigation/
│   │   └── AppNavigator.tsx
│   │
│   ├── screens/
│   │   ├── HomeScreen.tsx
│   │   └── RestaurantDetailsScreen.tsx
│   │
│   ├── services/
│   │   └── geoapify.ts
│   │
│   └── types/
│       └── restaurant.ts
│
├── .env.example
├── .gitignore
├── App.tsx
├── package.json
└── README.md
```

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:

- Node.js
- npm
- React Native development environment
- Android Studio
- Android SDK
- JDK compatible with your React Native version
- A Geoapify API key

### 1. Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/GoodFood.git
```

### 2. Navigate to the Project

```bash
cd GoodFood
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Configure Environment Variables

Create a `.env` file in the project root directory:

```env
GEOAPIFY_API_KEY=your_geoapify_api_key
```

You can obtain an API key from:

[Geoapify](https://www.geoapify.com/)

**Important:** Never commit your actual `.env` file or expose your API keys in a public repository.

### 5. Start Metro

```bash
npm start
```

### 6. Run the Android Application

Open another terminal and execute:

```bash
npm run android
```

Alternatively:

```bash
npx react-native run-android
```

## 📱 Android Permissions

The application requires location permissions to discover nearby restaurants.

The following permissions are declared in the Android manifest:

```xml
<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
<uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />
<uses-permission android:name="android.permission.INTERNET" />
```

Users must grant location permission and enable device location services for GPS-based restaurant discovery.

## 🔑 API Integration

GoodFood uses the **Geoapify Places API** to retrieve nearby restaurants.

The application uses GPS coordinates to search for restaurants within a defined radius.

API documentation:

[Geoapify Places API Documentation](https://apidocs.geoapify.com/docs/places/)

## 🗺️ Third-Party Services

- [Geoapify](https://www.geoapify.com/) – Location and Places API.
- [Google Maps](https://www.google.com/maps) – Navigation and directions.

## 📄 License

This project is available under the MIT License.

See the `LICENSE` file for details.

---

**GoodFood – Discover great food around you! 🍽️**
