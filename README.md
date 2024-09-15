# React Frontend Application

## Starting the application

1. Install packages with ```pnpm i```
2. If needed, create a .env file to configure the backend URL containing ```VITE_BACKEND_URL="http://localhost:8080" ```
3. Start application in dev mode with ```pnpm run dev```


## Features implemented:

1. List of devices / vulnerabilities
   - Sortable (asc and desc.)
   - Selection (single, all)
   - Export as .csv

2. Detail View for device / vulnerability
   - Opens on row click 

## What I would do next:
- Implement Repositories for Vulnerability API access (like I did for Devices)
- Implement adapter pattern for data export
- Add Unit tests and UI Tests
- Implement better error handling, e.g. error boundaries
- If amount of data grows: 
  - Virtualization of table
  - Handle sorting on server-side 
- Add translation of text (i18n)

## Third party libraries used: 
- Axios for data fetching 
- React-query for data handling
- React-router-dom for routing
- Mantine UI and Tabler icons


