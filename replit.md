# FoodFusion - Restaurant Food Delivery Application

## Overview

FoodFusion is a full-stack food delivery application built with a modern tech stack featuring React frontend, Express.js backend, and PostgreSQL database. The application provides a complete food ordering experience with features like menu browsing, cart management, order tracking, and user authentication.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Styling**: TailwindCSS with shadcn/ui component library
- **State Management**: React Context API for cart management
- **Data Fetching**: TanStack Query (React Query) for server state management
- **Routing**: React Router for client-side navigation
- **Build Tool**: Vite for fast development and optimized builds

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ESM modules
- **Database**: PostgreSQL with Drizzle ORM
- **Database Provider**: Neon Database (serverless PostgreSQL)
- **Session Management**: Express sessions with PostgreSQL store
- **Development**: Hot reload with tsx and Vite middleware integration

### Data Storage
- **Primary Database**: PostgreSQL hosted on Neon
- **ORM**: Drizzle ORM with Zod schema validation
- **Migrations**: Drizzle Kit for database schema management
- **Development Storage**: In-memory storage class for development/testing

## Key Components

### Frontend Components
1. **Pages**: Home, Menu, Cart, Orders, Profile, Authentication (Login/Register)
2. **UI Components**: Comprehensive shadcn/ui component library including buttons, cards, forms, navigation, modals, and more
3. **Context Providers**: Cart management with local state
4. **Navigation**: Responsive navigation with mobile support

### Backend Components
1. **Storage Interface**: Abstracted storage layer with both memory and database implementations
2. **Route Handlers**: Express route registration system
3. **Database Schema**: User management schema with extensible design
4. **Development Tools**: Vite integration for SSR development experience

### Database Schema
- **Users Table**: Basic user authentication with username/password
- **Extensible Design**: Schema structure allows for easy addition of orders, restaurants, dishes, and reviews tables

## Data Flow

1. **Client Requests**: React components make API calls through TanStack Query
2. **Server Processing**: Express routes handle requests and interact with storage layer
3. **Database Operations**: Drizzle ORM manages database queries and mutations
4. **Response Handling**: JSON responses with proper error handling and logging
5. **State Management**: Client-side state updates through React Query cache and Context API

## External Dependencies

### Frontend Dependencies
- **UI Framework**: React ecosystem with modern hooks
- **Component Library**: Radix UI primitives with shadcn/ui styling
- **Form Handling**: React Hook Form with Zod validation
- **Date Utilities**: date-fns for date manipulation
- **Icons**: Lucide React icon library

### Backend Dependencies
- **Database**: Neon serverless PostgreSQL
- **ORM**: Drizzle with PostgreSQL adapter
- **Session Store**: connect-pg-simple for PostgreSQL session storage
- **Development**: tsx for TypeScript execution, esbuild for production builds

### Development Tools
- **Replit Integration**: Vite plugins for Replit development environment
- **Error Handling**: Runtime error overlay for development
- **Code Mapping**: Source map support for debugging

## Deployment Strategy

### Development Environment
- **Local Development**: Vite dev server with Express API integration
- **Hot Reload**: Full-stack hot reload with Vite middleware
- **Database**: Neon development database with environment variables
- **Asset Handling**: Vite handles static assets and bundling

### Production Build
- **Frontend**: Vite production build with optimized assets
- **Backend**: esbuild bundling for Node.js deployment
- **Database**: Production PostgreSQL on Neon with connection pooling
- **Static Assets**: Served through Express static middleware

### Configuration
- **Environment Variables**: DATABASE_URL for database connection
- **Build Scripts**: Separate development and production commands
- **Database Migrations**: Drizzle push for schema synchronization

## User Preferences

Preferred communication style: Simple, everyday language.

## Changelog

Changelog:
- July 02, 2025. Initial setup