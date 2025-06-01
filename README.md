# Mini CRM Platform - Xeno SDE Internship Assignment

A modern Customer Relationship Management (CRM) platform that enables customer segmentation, personalised campaign delivery, and intelligent insights using AI-powered features.
https://excalidraw.com/#json=4_gmrDm96LAtph_dh5_f2,Xtp8UAT8VHRhuGhVtJk1LA  (visit this link for dataflow, architecture, etc.)

## 🚀 Features

### 1. Data Ingestion & Management
- Secure REST APIs for customer and order data ingestion
- Real-time data validation and processing
- Efficient data storage and retrieval

### 2. Campaign Management
- Dynamic audience segmentation with flexible rule builder
- Real-time audience size preview
- Campaign history tracking
- Delivery statistics and analytics
- Personalized message delivery system

### 3. AI-Powered Features
- Natural Language to Segment Rules conversion
- AI-driven message suggestions
- Campaign performance summarization
- Smart scheduling recommendations

### 4. Authentication & Security
- Google OAuth 2.0 integration
- Secure session management
- Protected API endpoints

## 🛠️ Tech Stack

### Frontend
- React.js
- Tailwind CSS for styling
- React Router for navigation
- React Hot Toast for notifications
- Custom hooks for state management

### Backend
- Node.js with Express
- MongoDB for database
- JWT for authentication
- OpenAI API for AI features

## 📦 Installation

### Prerequisites
- Node.js (v16 or higher)
- MongoDB
- Google OAuth credentials
- OpenAI API key

### Setup Instructions

1. Clone the repository
```bash
git clone <repository-url>
cd mini-crm-platform
```

2. Install dependencies
```bash
# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

3. Environment Setup
Create `.env` files in both client and server directories:

Server (.env):
```
PORT=5000
MONGODB_URI=your_mongodb_uri
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
OPENAI_API_KEY=your_openai_api_key
```

Client (.env):
```
VITE_API_URL=http://localhost:5173
VITE_GOOGLE_CLIENT_ID=your_google_client_id
```

4. Start the application
```bash
# Start server
cd server
npm run dev

# Start client
cd ../client
npm run dev
```

## 🏗️ Architecture

```
├── Client (React.js)
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/         # Page components
│   │   ├── context/       # React context providers
│   │   ├── utils/         # Utility functions
│   │   └── hooks/         # Custom React hooks
│   │
├── Server (Node.js)
│   ├── src/
│   │   ├── controllers/   # Route controllers
│   │   ├── models/        # Database models
│   │   ├── routes/        # API routes
│   │   ├── middleware/    # Custom middleware
│   │   └── utils/         # Utility functions
```

## 🔄 Data Flow

1. **Data Ingestion**
   - Client sends data to API endpoints
   - Data validation at API layer
   - Data persistence in MongoDB

2. **Campaign Creation**
   - User creates segment rules
   - Real-time audience size calculation
   - Campaign creation and scheduling
   - Message personalization

3. **Campaign Delivery**
   - Message delivery to customers
   - Delivery status updates
   - Performance tracking and analytics
   - AI-powered insights generation

## 🤖 AI Integration

The platform leverages OpenAI's API for various AI features:

1. **Natural Language Processing**
   - Converts user queries to segment rules
   - Generates campaign message suggestions
   - Analyzes campaign performance

2. **Predictive Analytics**
   - Campaign success probability
   - Optimal sending time suggestions

## 📊 API Documentation

API documentation is available at `/api-docs` when running the server locally.

## 🧪 Testing

```bash
# Run server tests
cd server
npm test

# Run client tests
cd ../client
npm test
```

## 🔒 Security Features

- Input validation and sanitization
- CORS configuration
- Secure session management
- Data encryption

## 📈 Performance Optimizations

- Database indexing
- Lazy loading
- Code splitting
- Image optimization
- API response compression

## 🚀 Deployment

The application can be deployed on:
- Frontend: Vercel/Netlify
- Backend: Railway/Render
- Database: MongoDB Atlas

## 📝 Known Limitations

- Maximum segment size: 100,000 customers
- Campaign scheduling: Minimum 1-hour intervals
- API rate limit: 100 requests per minute
- File upload size: 10MB maximum

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Author

[Your Name]
- GitHub: [Your GitHub]
- LinkedIn: [Your LinkedIn]

## 🙏 Acknowledgments

- OpenAI for AI capabilities
- Google for OAuth integration
- MongoDB for database

## 🎯 Project Approach

### Problem-Solving Strategy
1. **Requirements Analysis**
   - Broke down the assignment into core components
   - Identified key technical challenges
   - Prioritized features based on complexity and impact

2. **Architecture Design**
   - Implemented RESTful API architecture
   - Designed modular frontend for maintainability
   - Focused on scalability and performance

3. **Development Process**
   - Started with core authentication and data models
   - Built campaign management features incrementally
   - Integrated AI features progressively
   - Focused on user experience and performance

### Key Decisions
1. **Technology Choices**
   - React.js for dynamic UI and component reusability
   - Node.js for efficient operations
   - MongoDB for flexible data modeling

2. **Feature Implementation**
   - Custom rule builder for flexible segmentation
   - Real-time audience preview for immediate feedback
   - AI-powered insights for better decision making

## ⚖️ Trade-offs Made

### 1. Frontend Architecture
- **Chose React Router over Next.js**
  - Pros: Simpler setup, easier to understand for beginners
  - Cons: Missing server-side rendering benefits, slower initial page load
  - Reason: Focused on rapid development and learning curve

- **State Management**
  - Used React Context instead of Redux
  - Pros: Simpler implementation, less boilerplate
  - Cons: Less scalable for very large applications
  - Reason: Project scope didn't require complex state management

### 2. Backend Design
- **Monolithic vs Microservices**
  - Chose monolithic architecture
  - Pros: Easier to develop and maintain, simpler deployment
  - Cons: Less scalable for very high traffic
  - Reason: Project requirements didn't justify microservices complexity

- **Database Choice**
  - MongoDB over SQL databases
  - Pros: Flexible schema, easier to modify data structure
  - Cons: Less strict data consistency, no built-in relationships
  - Reason: Better suited for evolving data models

### 3. Feature Implementation
- **Rule Builder Complexity**
  - Simple rule builder vs Advanced query builder
  - Pros: More user-friendly, faster to implement
  - Cons: Limited advanced filtering capabilities
  - Reason: Focused on core functionality first

- **Real-time Updates**
  - Polling vs WebSocket
  - Chose polling for simplicity
  - Pros: Easier to implement, works everywhere
  - Cons: Higher server load, less real-time
  - Reason: Project requirements didn't need true real-time

### 4. AI Integration
- **OpenAI API Usage**
  - Direct API calls vs Caching responses
  - Pros: Always fresh, accurate results
  - Cons: Higher API costs, slower response times
  - Reason: Focused on accuracy over performance

- **Message Generation**
  - Simple templates vs AI-generated
  - Pros: More reliable, faster
  - Cons: Less personalized
  - Reason: Balanced between automation and reliability

### 5. Security vs Usability
- **Authentication**
  - Google OAuth only vs Multiple providers
  - Pros: Simpler implementation, secure by default
  - Cons: Limited to Google users
  - Reason: Quick to implement, secure enough for MVP

- **API Security**
  - Basic JWT vs Complex token system
  - Pros: Simpler to implement and maintain
  - Cons: Less granular control
  - Reason: Sufficient for project scope

### 6. Performance Considerations
- **Data Loading**
  - Eager loading vs Lazy loading
  - Pros: Better initial performance
  - Cons: Higher initial load time
  - Reason: Better user experience for small datasets

- **Image Optimization**
  - Basic optimization vs Advanced CDN
  - Pros: Simpler implementation
  - Cons: Higher bandwidth usage
  - Reason: Project scale didn't justify CDN costs

### 7. Development Speed vs Code Quality
- **Code Organization**
  - Feature-based structure vs Domain-driven
  - Pros: Easier to understand and maintain
  - Cons: Less scalable for very large applications
  - Reason: Better for rapid development

- **Testing Strategy**
  - Manual testing vs Comprehensive automated tests
  - Pros: Faster development
  - Cons: Higher risk of bugs
  - Reason: Time constraints of the assignment

## 🤖 AI Features Implementation

### 1. Natural Language to Segment Rules
- Implemented using OpenAI's GPT-3.5
- Custom prompt engineering for accurate rule conversion
- Real-time validation of generated rules

### 2. Campaign Message Suggestions
- Context-aware message generation
- Tone and style customization
- Performance tracking and optimization

### 3. Campaign Performance Analysis
- Automated insights generation
- Trend analysis and pattern recognition
- Success rate prediction

### 4. Smart Scheduling
- Historical data analysis
- Time zone optimization
- Automated scheduling suggestions

## 🎥 Demo Video

[Link to Demo Video]
- Features walkthrough
- Technical implementation details
- Trade-offs explanation
- AI features demonstration 
