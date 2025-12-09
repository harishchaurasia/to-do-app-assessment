# Todo Application - Full Stack

A full-stack todo application built with Node.js, Express.js, TypeScript for the backend, and React.js, Redux Toolkit, and TypeScript for the frontend. The application allows users to manage tasks across multiple categories with comprehensive CRUD operations, filtering, and sorting capabilities.

## Features

### User Stories Implemented

- Create a new todo item with title, description, and due date
- Assign a category to each todo item
- View all todo items grouped by their categories
- Mark a todo item as complete or incomplete
- Edit the details of an existing todo item
- Delete a todo item
- Create new categories for organizing todo items
- Filter todo items by completion status (all, active, completed)
- Sort todo items by due date or creation date

## Tech Stack

### Backend

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **TypeScript** - Type-safe JavaScript
- **In-Memory Database** - Simple data storage for this assessment

### Frontend

- **React.js** - UI library
- **Redux Toolkit** - State management
- **TypeScript** - Type-safe JavaScript
- **Vite** - Build tool and development server
- **React Router** - Routing (if needed)

## Project Structure

```
beacon-dan/
├── backend/              # Backend API
│   ├── src/
│   │   ├── routes/      # API routes
│   │   ├── controllers/ # Route controllers
│   │   ├── models/      # Data models
│   │   ├── middleware/  # Custom middleware (validation, error handling)
│   │   └── server.ts    # Express server entry point
│   ├── package.json
│   └── tsconfig.json
├── frontend/             # Frontend React app
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── store/       # Redux store and slices
│   │   ├── types/       # TypeScript type definitions
│   │   ├── services/    # API service functions
│   │   └── App.tsx
│   ├── package.json
│   └── vite.config.ts
└── README.md
```

## Prerequisites

- **Node.js** (v18 or higher)
- **npm** (v9 or higher) or **yarn**

## Setup Instructions

### 1. Clone the Repository

```bash
git clone <repository-url>
cd beacon-dan
```

### 2. Backend Setup

Navigate to the backend directory and install dependencies:

```bash
cd backend
npm install
```

### 3. Frontend Setup

Navigate to the frontend directory and install dependencies:

```bash
cd ../frontend
npm install
```

### 4. Running the Application

#### Start the Backend Server

From the `backend` directory:

```bash
npm run dev
```

The backend server will start on `http://localhost:3001` (or the port specified in the environment variables).

#### Start the Frontend Development Server

From the `frontend` directory (in a new terminal):

```bash
npm run dev
```

The frontend application will start on `http://localhost:5173` (or the port specified by Vite).

### 5. Access the Application

Open your browser and navigate to `http://localhost:5173` to access the Todo application.

## API Endpoints

### Categories

- `GET /api/categories` - Get all categories
- `POST /api/categories` - Create a new category
- `GET /api/categories/:id` - Get a specific category
- `PUT /api/categories/:id` - Update a category
- `DELETE /api/categories/:id` - Delete a category

### Todos

- `GET /api/todos` - Get all todos (supports query params: `status`, `sortBy`)
- `POST /api/todos` - Create a new todo
- `GET /api/todos/:id` - Get a specific todo
- `PUT /api/todos/:id` - Update a todo
- `DELETE /api/todos/:id` - Delete a todo
- `PATCH /api/todos/:id/toggle` - Toggle todo completion status

## Development Scripts

### Backend

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build TypeScript to JavaScript
- `npm start` - Start production server
- `npm run lint` - Run ESLint

### Frontend

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Environment Variables

### Backend (.env)

```
PORT=3001
NODE_ENV=development
```

### Frontend (.env)

```
VITE_API_URL=http://localhost:3001/api
```

## Testing the API

You can test the API endpoints using tools like:

- **Postman**
- **curl**
- **Thunder Client** (VS Code extension)
- **Browser DevTools** (for GET requests)

Example API call:

```bash
# Creates a category
curl -X POST http://localhost:3001/api/categories \
  -H "Content-Type: application/json" \
  -d '{"name": "Work", "color": "#3b82f6"}'

# Creates a todo
curl -X POST http://localhost:3001/api/todos \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Complete project",
    "description": "Finish the todo app",
    "dueDate": "2024-12-31",
    "categoryId": "1"
  }'
```

## Features Breakdown

### Category Management

- Create custom categories with names and colors
- Assign todos to categories
- View todos grouped by category

### Todo Management

- Full CRUD operations
- Toggle completion status
- Due date tracking
- Rich descriptions

### Filtering & Sorting

- Filter by: All, Active, Completed
- Sort by: Due Date (ascending/descending), Creation Date (newest/oldest)

### UI/UX Features

- Responsive design
- Modern and intuitive interface
- Real-time updates
- Form validation
- Error handling and user feedback

## Code Quality

- TypeScript for type safety
- Proper error handling and validation
- RESTful API design
- Clean code organization
- Redux Toolkit best practices
- Component-based architecture

## Future Enhancements (Bonus Ideas)

- User authentication
- Persistent database (PostgreSQL, MongoDB)
- Drag and drop reordering
- Search functionality
- Todo item priorities
- Recurring todos
- Todo item attachments
- Dark mode toggle
- Export/Import functionality

## License

This project is created for assessment purposes.

## Author

Harish Chaurasia
