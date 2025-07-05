# 🌦️ WeatherWise

**WeatherWise** is a modern, responsive, and feature-rich weather dashboard application built using React, Tailwind CSS, Shadcn UI, and TanStack Query. It provides real-time weather data, forecasts, and detailed metrics for cities around the world. With powerful search, favorites, and history tracking features, WeatherWise offers a seamless and interactive user experience, backed by OpenWeather APIs and local caching.

---

## 📸 Demo


---

## 🧭 Table of Contents

- [Features](#-features)
- [Project Structure](#-project-structure)
- [Tech Stack](#-tech-stack)
- [APIs Used](#-apis-used)
- [Custom Hooks](#-custom-hooks)
- [Setup & Installation](#-setup--installation)
- [Performance Optimizations](#-performance-optimizations)
- [Known Issues](#-known-issues)
- [Future Improvements](#-future-improvements)
- [Acknowledgements](#-acknowledgements)
- [Author](#-author)
- [License](#-license)

---

## ✨ Features

### 🌐 General
- Fully responsive layout (mobile to desktop)
- Sticky header with logo and theme toggle
- Light/Dark mode using Shadcn + Lucide icons
- Toast notifications for success and errors

### 🌤️ Weather Functionality
- Real-time **Current Weather Data**
- 5-day forecasts for **5 AM and 5 PM**
- Interactive **Hourly Forecast Charts** using Recharts
- Additional weather metrics: humidity, gust, pressure, cloudiness, sunrise,sunset, wind direction
- Weather icons fetched dynamically from OpenWeather CDN

### 🔍 City Search
- Search cities via **Shadcn Command Dialog**
- Accurate suggestions via Geocoding API
- Dynamic routing using `useNavigate`

### 🕘 Recent Search History
- Stores last 10 searches using `localStorage`
- Displayed under the search input
- Clear history option available
- Managed with `useMutation` from TanStack Query

### ⭐ Favourites
- Add/remove cities to/from favourites
- Persistent with `localStorage`
- Displayed as horizontal scrollable cards
- Instant updates using `invalidateQuery`

### 💡 UI/UX
- Clean layout with Tailwind & Shadcn components
- Loading skeletons while fetching data
- Smooth transitions and interactive visuals

---

## 📁 Project Structure

```
src/
├── api/                 # API setup & OpenWeather API class
├── components/          # Main UI components
│   └── ui/              # Shadcn UI components (alert, card, etc.)
├── context/             # ThemeProvider (Shadcn)
├── hooks/               # Custom hooks for location, favourites, history, weather
├── lib/                 # Utilities (date formatting, etc.)
├── pages/               # Route-based pages (Dashboard, CityPage)
├── main.jsx             # App entry: theme, routing, query client setup
├── index.css            # Tailwind & global styles
```

---

## 🛠️ Tech Stack

| Category        | Tech                                                     |
|----------------|-----------------------------------------------------------|
| Frontend       | React, JSX, Tailwind CSS, Shadcn UI, Lucide Icons         |
| API Handling   | TanStack Query + Devtools                                 |
| State Mgmt     | React Context + Local Storage                             |
| Charting       | Recharts                                                  |
| Date Utils     | date-fns                                                  |
| Routing        | React Router (`createBrowserRouter`, `RouterProvider`)    |
| Build Tool     | Vite                                                      |

---

## 🔑 APIs Used

1. **Geocoding API** – search cities by name
2. **Current Weather API** – get weather using `lat/lon`
3. **Forecast API** – 5-day data for 5AM/5PM
4. **Weather Icons** – OpenWeather icon URLs

---

## 🧠 Custom Hooks

- `useGetLocation.js` — fetch geolocation from browser
- `useLocalStorage.js` — reusable hook for persisting key-value data
- `useSearchHistory.jsx` — manages recent search history
- `useFavourites.jsx` — manages favourites add/remove + UI sync
- `useWeatherAPI.js` — handles OpenWeather API calls

---

## 🧪 Setup & Installation

### 🔧 Prerequisites

- Node.js ≥ 16
- NPM ≥ 8

### 📦 Installation

```bash
git clone https://github.com/your-username/WeatherWise.git
cd WeatherWise
npm install
```

### 🔐 Add `.env` File

Create a `.env` file in the root directory:

```env
VITE_OPENWEATHER_API_KEY=your_api_key_here
```

### 🚀 Start Development Server

```bash
npm run dev
```

---

## ⚙️ Performance Optimizations

- Configured TanStack Query with:
  - `staleTime`, `cacheTime`
  - `retry`, `refetchOnWindowFocus: false`
- Data is not re-fetched unless stale
- Mutations update cache in-place using `queryClient.invalidateQueries()`

---

## 🐞 Known Issues

- Current weather API may return inaccurate city name from `lat/lon`
- Reverse geocoding not yet implemented
- Mobile geolocation sometimes fails (under investigation)

---

## 🔮 Future Improvements

- Celsius/Fahrenheit toggle
- Weekly view toggle

---

## 🙌 Acknowledgements

- [Shadcn UI](https://ui.shadcn.com/)
- [TanStack Query](https://tanstack.com/query)
- [OpenWeather](https://openweathermap.org/)
- [Recharts](https://recharts.org/en-US)
- [Lucide Icons](https://lucide.dev/)
- [Date-Fns](https://date-fns.org/)

---

## 👨‍💻 Author

**Krish Goyal**  
WeatherWise © 2025

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).