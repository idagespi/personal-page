Ida Espineda Personal Portfolio

A modern, minimalist, single-page portfolio built using React and Tailwind CSS.

📁 Project Structure

Please set up your repository with the following folders and files:

/ida-espineda-portfolio
|-- public/
|   |-- index.html       <-- HTML Entry Point
|   |-- Ida Photo.jpg    <-- **CRITICAL: Place your image file here.**
|-- src/
|   |-- App.jsx          <-- Main Component Logic (Provided)
|   |-- index.js         <-- React Bootstrap (Provided)
|   |-- index.css        <-- Tailwind Directives (Provided)
|-- package.json         <-- Dependencies (Provided)
|-- README.md            <-- This file


🚀 Setup and Deployment

This project uses standard React tooling (react-scripts).

1. Installation

Clone this repository to your local machine.

Navigate into the project directory.

Install the required dependencies:

npm install


2. Running Locally (Development)

To view the portfolio locally before deployment:

npm start


3. Building for Production

To create an optimized build folder (/build):

npm run build


4. Deployment (e.g., GitHub Pages, Netlify, Vercel)

Netlify/Vercel: These services detect the React setup automatically. Simply point the service to your GitHub repository and set the build command to npm run build and the publish directory to build.

GitHub Pages (Manual):

Run npm run build.

The contents of the resulting /build folder should be uploaded to the gh-pages branch or the root of your deployment branch.
