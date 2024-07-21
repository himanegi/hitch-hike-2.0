# hitch-hike-2.0

 Hitch Hike 2.0 is a web application designed to connect drivers and passengers looking for rides. It aims to reduce the environmental impact of individual car travel by encouraging carpooling and sharing rides.

## Features

- Search for Rides: Users can search for rides based on their source and destination. The app will find the most suitable rides for them, considering factors like date, time, and route.
- Share Rides: Drivers can share their travel details, including the route they're taking, date, time, and a message for passengers. This allows passengers to join the ride if it fits their schedule and route.
- Manage Trips: Users can manage their trips, categorizing them into "Riding" and "Driving". The "Riding" section lists rides they've joined, while the "Driving" section includes rides they've created and any requests they've received from other users.

## Built With

### Frontend Technologies

- [Next.js](https://nextjs.org/) - React framework for server-side rendering
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework

### Backend Technologies

- [Node.js](https://nodejs.org/) - JavaScript runtime
- [Express.js](https://expressjs.com/) - Web application framework for Node.js

### Database

- [MongoDB](https://www.mongodb.com/) - NoSQL database

### Mapping and Location Services

- [Mapbox](https://www.mapbox.com/) - Maps and location data platform
- [Nominatim](https://nominatim.org/) - Open-source geocoding and address search

### Spatial Analysis

- [Turf.js](https://turfjs.org/) - JavaScript library for spatial operations

### Tools

- [VS Code](https://code.visualstudio.com/) - Code editor
- [Git](https://git-scm.com/) and [GitHub](https://github.com/) - Version control

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
