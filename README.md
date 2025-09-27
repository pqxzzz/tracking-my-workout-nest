# 💪 Tracking My Workout - Backend API

A comprehensive workout tracking backend API built with NestJS, designed to provide robust data management and authentication for fitness applications.

## 🚀 Features

### 🔐 Authentication & User Management

- **JWT Authentication**: Secure token-based authentication system
- **User Registration**: Complete user registration with email confirmation
- **Password Security**: Bcrypt password hashing for secure storage
- **Email Verification**: SendGrid integration for email confirmation
- **User Profiles**: Comprehensive user profile management with personal data

### 🏋️ Workout Management System

- **Workout Sets**: Create and manage custom workout routines
- **Exercise Library**: Comprehensive exercise database with muscle group categorization
- **Workout Logging**: Track daily workout sessions and progress
- **Muscle Groups**: Organize exercises by muscle groups for better categorization
- **Workout History**: Complete workout session tracking and analytics

### 📊 Weight & Progress Tracking

- **Weight Logging**: Record and track weight measurements over time
- **Progress Analytics**: Data aggregation for weight progression analysis
- **User Metrics**: Track height, birth date, and other personal metrics
- **Historical Data**: Complete weight history with timestamps

### 🗄️ Database & Data Management

- **PostgreSQL Integration**: Robust database with TypeORM
- **Database Migrations**: Version-controlled database schema management
- **Entity Relationships**: Well-structured data models with proper relationships
- **Data Validation**: Class-validator integration for input validation

## 🛠️ Tech Stack

- **Framework**: NestJS 11.x with TypeScript
- **Database**: PostgreSQL with TypeORM
- **Authentication**: JWT with Passport.js
- **Email Service**: SendGrid for email notifications
- **Password Hashing**: Bcrypt for secure password storage
- **Validation**: Class-validator and class-transformer
- **Testing**: Jest for unit and e2e testing
- **Code Quality**: ESLint and Prettier

## 📦 Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd tracking-my-workout-nest
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   ```bash
   cp .env.example .env
   # Configure your environment variables:
   # - DATABASE_URL
   # - JWT_SECRET
   # - SENDGRID_API_KEY
   # - PORT
   ```

4. **Set up the database**

   ```bash
   # Run database migrations
   npm run migration:run
   ```

5. **Start the development server**

   ```bash
   npm run start:dev
   ```

6. **API will be available at**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🏗️ Project Structure

```
src/
├── auth/                   # Authentication module
│   ├── auth.controller.ts  # Auth endpoints
│   ├── auth.service.ts     # Auth business logic
│   ├── jwt.strategy.ts     # JWT strategy
│   └── jwt-auth.guard.ts   # JWT guard
├── users/                  # User management
│   ├── users.controller.ts # User endpoints
│   ├── users.service.ts    # User business logic
│   ├── user.entity.ts      # User data model
│   └── dtos/               # Data transfer objects
├── exercises/              # Exercise management
│   ├── exercises.controller.ts
│   ├── exercises.service.ts
│   └── entities/
├── muscles/                # Muscle group management
│   ├── muscles.controller.ts
│   ├── muscles.service.ts
│   └── entities/
├── workouts/               # Workout management
│   ├── workouts.controller.ts
│   ├── workouts.service.ts
│   └── entities/
├── workoutSets/            # Workout set management
│   ├── workoutsets.controller.ts
│   ├── workoutsets.service.ts
│   └── entities/
├── workout-log/            # Workout logging
│   ├── workout-log.controller.ts
│   ├── workout-log.service.ts
│   └── entities/
├── weight/                 # Weight tracking
│   ├── weight.controller.ts
│   ├── weight.service.ts
│   └── entities/
├── common/                 # Shared utilities
│   ├── middleware/         # Custom middleware
│   ├── helpers/            # Helper functions
│   └── providers/          # Shared providers
├── config/                 # Configuration files
│   └── typeorm.config.ts   # Database configuration
└── migrations/             # Database migrations
```

## 🎯 API Endpoints

### Authentication

- `POST /auth/register` - User registration
- `POST /auth/login` - User login
- `POST /auth/confirm-email` - Email confirmation
- `POST /auth/resend-confirmation` - Resend confirmation email

### Users

- `GET /users/profile` - Get user profile
- `PUT /users/profile` - Update user profile
- `POST /users/finish-registration` - Complete user registration

### Exercises

- `GET /exercises` - Get all exercises
- `POST /exercises` - Create new exercise
- `PUT /exercises/:id` - Update exercise
- `DELETE /exercises/:id` - Delete exercise

### Workouts

- `GET /workouts` - Get user workouts
- `POST /workouts` - Create new workout
- `PUT /workouts/:id` - Update workout
- `DELETE /workouts/:id` - Delete workout

### Workout Sets

- `GET /workout-sets` - Get user workout sets
- `POST /workout-sets` - Create workout set
- `PUT /workout-sets/:id` - Update workout set
- `DELETE /workout-sets/:id` - Delete workout set

### Weight Tracking

- `GET /weight` - Get weight history
- `POST /weight` - Log new weight
- `PUT /weight/:id` - Update weight entry
- `DELETE /weight/:id` - Delete weight entry

### Workout Log

- `GET /workout-log` - Get workout history
- `POST /workout-log` - Log workout session
- `PUT /workout-log/:id` - Update workout log
- `DELETE /workout-log/:id` - Delete workout log

## 🗄️ Database Schema

### Core Entities

- **User**: User profiles with authentication data
- **Exercise**: Exercise library with muscle group associations
- **Muscle**: Muscle group definitions
- **Workout**: Individual workout sessions
- **WorkoutSet**: Collections of workouts
- **WorkoutLog**: Daily workout session logs
- **Weight**: Weight tracking entries

### Key Relationships

- User → WorkoutSets (One-to-Many)
- User → Weight (One-to-Many)
- WorkoutSet → Workouts (One-to-Many)
- Workout → Exercises (One-to-Many)
- Exercise → Muscles (Many-to-Many)

## 🚀 Getting Started

1. **Set up the database** with PostgreSQL
2. **Configure environment variables** for database and services
3. **Run database migrations** to create tables
4. **Start the development server**
5. **Register a new user** via the API
6. **Create your first workout set** with exercises
7. **Start logging workouts** and tracking progress

## 🔧 Development

### Available Scripts

- `npm run start` - Start the application
- `npm run start:dev` - Start in development mode with hot reload
- `npm run start:debug` - Start in debug mode
- `npm run build` - Build the application
- `npm run test` - Run unit tests
- `npm run test:e2e` - Run e2e tests
- `npm run test:cov` - Run tests with coverage
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier

### Database Management

- `npm run migration:generate` - Generate new migration
- `npm run migration:run` - Run pending migrations
- `npm run migration:revert` - Revert last migration

### Code Quality

- **TypeScript**: Full type safety throughout the application
- **ESLint**: Code linting and style enforcement
- **Prettier**: Consistent code formatting
- **Jest**: Comprehensive testing framework
- **Class-validator**: Input validation and sanitization

## 🌟 Key Features in Detail

### Authentication System

- JWT-based authentication with secure token management
- Email confirmation system with SendGrid integration
- Password hashing with bcrypt for security
- Protected routes with JWT guards

### Workout Management

- Complete workout set creation and management
- Exercise library with muscle group categorization
- Workout session logging and tracking
- Historical workout data analysis

### Data Validation

- Comprehensive input validation with class-validator
- DTOs for all API endpoints
- Type-safe data transfer objects
- Automatic validation error handling

### Database Design

- Well-structured entity relationships
- Proper indexing for performance
- Migration-based schema management
- Support for both development and production environments

## 🔒 Security Features

- JWT token authentication
- Password hashing with bcrypt
- CORS configuration for frontend integration
- Input validation and sanitization
- SQL injection protection through TypeORM

## 📊 Performance Considerations

- Database connection pooling
- Efficient query optimization
- Proper indexing strategy
- Migration-based schema updates
- Production-ready configuration

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with [NestJS](https://nestjs.com/)
- Database powered by [TypeORM](https://typeorm.io/)
- Authentication with [Passport.js](http://www.passportjs.org/)
- Email service by [SendGrid](https://sendgrid.com/)

---

**Power your fitness tracking application with a robust backend!** 💪
