# hitch-hike-2.0

 Hitch Hike 2.0 is a web application designed to connect drivers and passengers looking for rides. It aims to reduce the environmental impact of individual car travel by encouraging carpooling and sharing rides.

## Features

- Search for Rides: Users can search for rides based on their source and destination. The app will find the most suitable rides for them, considering factors like date, time, and route.
- Share Rides: Drivers can share their travel details, including the route they're taking, date, time, and a message for passengers. This allows passengers to join the ride if it fits their schedule and route.
- Manage Trips: Users can manage their trips, categorizing them into "Riding" and "Driving". The "Riding" section lists rides they've joined, while the "Driving" section includes rides they've created and any requests they've received from other users.

## Built with

### Frontend Technologies

- Next.js (React Framework for Server-Side Rendering)
- Tailwind CSS (Utility-first CSS Framework)

### Backend Technologies

- Node.js (JavaScript Runtime)
- Express.js (Web Application Framework for Node.js)

### Database

- MongoDB (NoSQL Database)

### Mapping and Location Services

- Mapbox (Maps and Location Data Platform)
- Nominatim (Open-Source Geocoding and Address Search)

### Spatial Analysis

- Turf.js (JavaScript Library for Spatial Operations)

### Tools

- VS Code
- Git and Github

<!-- Getting Started -->
## Getting Started

<!-- Prerequisites -->
### Prerequisites

This project uses MongoDB as database. please install mongodb server in local environment.

<!-- Run Locally -->
### Run Locally

Clone the project

```bash
  git clone https://github.com/himanegi/hitch-hike-2.0.git
```

Go to the project directory

```bash
  cd project-directory
```

Install dependencies

```bash
  cd backend
  npm install
  cd ../frontend
  npm install
  cd ../
  npm install
```

Start the backend server

```bash
  cd backend
  npm start
```

Start the frontend client

```bash
  cd frontend
  npm run dev
```
