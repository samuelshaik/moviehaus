# MovieHaus - MERN Stack Movie Review Platform

A full-stack web application built with the MERN stack that allows users to discover movies, write reviews, and maintain watchlists. Inspired by Letterboxd.

## 🚀 Features

- **Movie Discovery**: Browse trending and popular movies using TMDB API
- **User Authentication**: Secure registration and login with JWT
- **Movie Reviews**: Write, edit, and delete movie reviews with star ratings
- **Watchlists**: Add/remove movies to personal watchlist
- **Search**: Search movies by title with pagination
- **User Profiles**: View user profiles and review history
- **Responsive Design**: Mobile-first design with Tailwind CSS
- **Dark Mode**: Automatic dark mode support

## 🛠️ Tech Stack

### Frontend
- **React.js** - UI library
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client
- **React Context** - State management

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication tokens
- **bcryptjs** - Password hashing

### External APIs
- **TMDB API** - Movie data and images

## 📦 Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB Atlas account or local MongoDB
- TMDB API key

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/moviehaus.git
cd moviehaus
```

### 2. Backend Setup
```bash
# Navigate to server directory
cd server

# Install dependencies
npm install

# Create .env file with your configurations
cp .env.example .env

# Start development server
npm run dev
```

### 3. Frontend Setup
```bash
# Navigate to client directory (from root)
cd client

# Install dependencies
npm install

# Install Tailwind CSS
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

# Start React development server
npm start
```

### 4. Environment Variables

Create a `.env` file in the root directory:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=mongodb+srv://username:password@cluster0.mongodb.net/moviehaus

# JWT Secret
JWT_SECRET=your_super_secret_jwt_key

# TMDB API
TMDB_API_KEY=your_tmdb_api_key
```

## 🗄️ Database Schema

### User Model
```javascript
{
  username: String (unique),
  password: String (hashed),
  avatar: String,
  bio: String,
  createdAt: Date
}
```

### Review Model
```javascript
{
  user: ObjectId (ref: User),
  movieId: Number,
  movieTitle: String,
  moviePoster: String,
  movieYear: Number,
  rating: Number (1-5),
  review: String,
  isPublic: Boolean,
  createdAt: Date
}
```

### Watchlist Model
```javascript
{
  user: ObjectId (ref: User),
  movies: [{
    movieId: Number,
    movieTitle: String,
    moviePoster: String,
    movieYear: Number,
    addedAt: Date
  }]
}
```

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile (protected)

### Movies
- `GET /api/movies/trending` - Get trending movies
- `GET /api/movies/popular` - Get popular movies
- `GET /api/movies/search/:query` - Search movies
- `GET /api/movies/:id` - Get movie details

### Reviews
- `POST /api/reviews` - Create review (protected)
- `GET /api/reviews/movie/:movieId` - Get movie reviews
- `GET /api/reviews/user/:userId` - Get user reviews
- `GET /api/reviews/my` - Get current user reviews (protected)
- `PUT /api/reviews/:id` - Update review (protected)
- `DELETE /api/reviews/:id` - Delete review (protected)

### Watchlist
- `GET /api/watchlist` - Get user watchlist (protected)
- `POST /api/watchlist` - Add to watchlist (protected)
- `DELETE /api/watchlist/:movieId` - Remove from watchlist (protected)

## 🚀 Deployment

### Backend Deployment (Railway/Render)
1. Connect your GitHub repository
2. Set environment variables
3. Deploy from main branch

### Frontend Deployment (Vercel/Netlify)
1. Build the React app: `npm run build`
2. Deploy the build folder
3. Configure API base URL for production

### Database
- Use MongoDB Atlas for cloud database
- Configure network access and database users

## 🎯 Key Features for Resume

1. **Full-Stack Development**: Complete MERN stack implementation
2. **Authentication & Security**: JWT-based auth with password hashing
3. **External API Integration**: TMDB API for movie data
4. **Database Design**: Well-structured MongoDB schemas with relationships
5. **Responsive UI**: Mobile-first design with Tailwind CSS
6. **State Management**: React Context for global state
7. **RESTful API**: Well-designed REST endpoints
8. **Error Handling**: Comprehensive error handling on both ends

## 🛡️ Security Features

- Password hashing with bcryptjs
- JWT token authentication
- Protected routes
- Input validation and sanitization
- CORS configuration
- Environment variable protection

## 📱 Responsive Design

- Mobile-first approach
- Tailwind CSS for consistent styling
- Dark mode support
- Optimized for all screen sizes

## 🔮 Future Enhancements

- Social features (follow users, activity feed)
- Advanced filtering and sorting
- Movie recommendations
- Image upload for user avatars
- Email notifications
- Movie lists and collections
- Rating statistics and charts

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Developer

**Your Name**
- GitHub: [@yourusername](https://github.com/yourusername)
- LinkedIn: [Your LinkedIn](https://linkedin.com/in/yourprofile)
- Email: your.email@example.com

---

Built with ❤️ using the MERN Stack
