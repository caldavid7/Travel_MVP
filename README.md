# ChatGPT + Google Maps Platform Hotel Finder

This project is a Next.js application that integrates ChatGPT and Google Maps Platform to allow users to enter a place and preferences, and get the best hotels with their preview images back. The app uses Tailwind CSS for styling and Framer Motion for animations. There is no backend or database used in this project.

## Features

- Users can enter a place and preferences, such as check-in and check-out dates, number of guests, and hotel rating.
- The app uses the Google Maps Platform to search for hotels based on the user's input.
- The hotels are displayed with their preview images, name, rating, and location on a map.
- Users can click on a hotel to view more details, such as description, amenities, and pricing.
- The app is responsive and optimized for different devices, including desktops, tablets, and mobile phones.

## Technologies Used

- Next.js: A popular React framework for building server-rendered React applications.
- Tailwind CSS: A utility-first CSS framework for building modern user interfaces.
- Framer Motion: A motion library for React that makes it easy to add animations to components.
- Google Maps Platform: A set of APIs and services for adding maps, location search, and other location-based features to web applications.

## Getting Started

To run this project locally, follow these steps:

1. Clone the repository to your local machine using `git clone`.
2. Install the dependencies by running `npm install` or `yarn install` in the project directory.
3. Create a `.env` file in the project root and add your Google Maps and open AI API key as follows:

   ```bash
   NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=YOUR_API_KEY
   NEXT_PUBLIC_OPENAI_API_KEY=YOUR_API_KEY
   ```

4. Start the development server by running
   `npm run dev`
   or
   `yarn dev`.
5. Open your web browser and go to `http://localhost:3000` to see the app in action.

Note: You will need to have a valid Google Maps API key with the necessary permissions to use the Places API for this project to work correctly.

## Contributing

If you would like to contribute to this project, feel free to submit a pull request or open an issue. Please follow the for more information.
