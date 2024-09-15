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

## Follow up:
- Unit tests and UI Tests
- Better Error handling, e.g. error boundaries
- If amount of data grows: 
  - Virtualization of table
  - Handle sorting on server-side 
- Make table entries configurable


## Third party libraries used: 
- Axios for data fetching 
- React-query for data handling
- React-router-dom for routing
- Mantine UI and Tabler icons


## Structure: 
- Data: Handle external data access (APIs, Storage)
- Domain: Application domain related things (e.g. domain entities)
- Presentation: Presentation layer (views, components)


