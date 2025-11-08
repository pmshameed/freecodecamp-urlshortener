# URL Shortener Microservice

## Overview
A URL Shortener Microservice built with Node.js and Express. This is a freeCodeCamp backend development project that provides a simple web interface and API for shortening URLs.

## Project Structure
- `index.js` - Main Express server file
- `views/index.html` - Frontend HTML page
- `public/style.css` - CSS styling
- `package.json` - Node.js dependencies and scripts

## Technology Stack
- **Backend**: Node.js with Express
- **Dependencies**: 
  - express - Web framework
  - cors - Cross-origin resource sharing
  - body-parser - Request body parsing middleware
  - dotenv - Environment variable management

## Configuration
- **Port**: 5000 (configured via PORT environment variable)
- **Host**: 0.0.0.0 (to work with Replit's proxy)

## Current State
- ✅ Dependencies installed
- ✅ Server configured for Replit environment (port 5000, host 0.0.0.0)
- ✅ Workflow configured and running
- ✅ Frontend accessible and displaying correctly
- ✅ Deployment configuration set up (autoscale)
- ⚠️ API endpoints for URL shortening not yet implemented (boilerplate project)

## API Endpoints
- `GET /` - Serves the main HTML page
- `GET /api/hello` - Test endpoint that returns a greeting
- `POST /api/shorturl` - URL shortening endpoint (to be implemented)

## Recent Changes (November 8, 2025)
- Imported from GitHub and configured for Replit environment
- Updated server to bind to 0.0.0.0:5000 for Replit compatibility
- Added body-parser middleware for handling POST requests
- Created deployment configuration for autoscale deployment
- Installed all npm dependencies

## Next Steps
The boilerplate is ready. To complete the URL shortener functionality, you would need to:
1. Implement the POST /api/shorturl endpoint to accept and validate URLs
2. Add data storage (database or in-memory) for URL mappings
3. Implement the GET /api/shorturl/:short_url endpoint to redirect to original URLs
