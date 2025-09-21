# TestingBackend

A robust Node.js backend API built with TypeScript, Express, and MongoDB, featuring dynamic database management, user authentication, and document verification with third-party OCR integration.

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Setup](#environment-setup)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Project Structure](#project-structure)
- [Database Schema](#database-schema)
- [Third-Party Integrations](#third-party-integrations)
- [Development](#development)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## 🚀 Overview

TestingBackend is a comprehensive backend solution that provides:

- **Dynamic Database Management**: Creates and manages separate databases per user based on email
- **User Authentication**: Secure JWT-based authentication system
- **Document Verification**: Upload and verify documents with OCR processing
- **Multi-tenant Architecture**: Isolated data storage for each user
- **RESTful API**: Well-structured endpoints for all operations

## ✨ Features

- 🔐 **Secure Authentication** - JWT-based user registration and login
- 🗄️ **Dynamic Database Creation** - Automatic database creation per user
- 📄 **Document Verification** - Upload and process documents with OCR
- 🔍 **OCR Integration** - Third-party Surepass API for document text extraction
- 📊 **User Management** - Complete user profile management
- 🛡️ **Middleware Protection** - Route-level authentication middleware
- 📱 **RESTful API** - Clean and consistent API design
- 🔄 **Status Management** - Document verification status tracking

## 🛠️ Tech Stack

### Backend
- **Node.js** - Runtime environment
- **TypeScript** - Type-safe JavaScript
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling

### Authentication & Security
- **JWT** - JSON Web Tokens
- **Passport.js** - Authentication middleware
- **bcryptjs** - Password hashing

### File Processing
- **Multer** - File upload handling
- **Axios** - HTTP client for API calls
- **Form-data** - Form data handling

### Development Tools
- **ts-node** - TypeScript execution
- **nodemon** - Development server
- **CORS** - Cross-origin resource sharing

## 📋 Prerequisites

Before running this project, make sure you have:

- **Node.js** (v14 or higher)
- **npm** or **yarn**
- **MongoDB** (local or cloud instance)
- **TypeScript** knowledge
- **Surepass API Token** (for OCR functionality)

## 🔧 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd TestingBackend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Install additional dependencies for OCR integration**
   ```bash
   npm install axios form-data
   ```

## ⚙️ Environment Setup

Create a `.env` file in the root directory with the following variables:

```env
# Server Configuration
PORT=5050
SECRETKEY=your_jwt_secret_key

# Database Configuration
MONGODBURL=mongodb://localhost:27017/your_database_name
MONGO_USERNAME=your_mongo_username
MONGO_PASSWORD=your_mongo_password
MONGO_CLUSTER=your_mongo_cluster

# Authentication
KEYCLOK_PUBLIC_KEY=your_keycloak_public_key

# Third-party APIs
SUREPASS_API_TOKEN=your_surepass_api_token
```

## 🚀 Usage

### Development Mode
```bash
# Start development server with hot reload
npm run watch

# Or start with ts-node directly
npm run watch:serve
```

### Production Mode
```bash
# Build the project
npm run build

# Start production server
npm start
```

### Health Check
```bash
curl http://localhost:5050/ping
```

## 📡 API Endpoints

### Authentication Routes (`/auth`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/auth/register` | User registration | ❌ |
| POST | `/auth/login` | User login | ❌ |
| GET | `/auth/me` | Get current user info | ✅ |

### Database Management (`/database-create`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/database-create` | Create dynamic database | ✅ |

### Document Verification (`/verification`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/verification/verify-user` | Upload and verify document | ✅ |
| GET | `/verification/list-verifications` | List user verifications | ✅ |
| GET | `/verification/user-verification/:id` | Get verification details | ✅ |
| PUT | `/verification/user-verification/:verificationId/status` | Update verification status | ✅ |

### Example API Calls

#### User Registration
```bash
curl -X POST http://localhost:5050/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "john_doe",
    "password": "secure_password",
    "role": "user"
  }'
```

#### Document Upload
```bash
curl -X POST http://localhost:5050/verification/verify-user \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -F "documentFile=@/path/to/document.pdf" \
  -F "documentId=DOC123"
```

## 📁 Project Structure

```
src/
├── auth/                    # Authentication module
│   ├── controller/         # Auth controllers
│   ├── route/             # Auth routes
│   └── service/           # Auth services
├── config/                # Configuration files
├── createDynamicDatabase/ # Database creation module
│   ├── controller/
│   ├── route/
│   └── service/
├── helpers/               # Utility helpers
├── middleware/            # Express middleware
├── model/                 # Database models
├── userVerification/      # Document verification module
│   ├── controller/
│   ├── route/
│   └── services/
└── index.ts              # Application entry point
```

## 🗄️ Database Schema

### User Model
```typescript
{
  username: String (required)
  password: String (required)
  role: String (enum: ['user', 'admin'])
  timestamps: true
}
```

### User Verification Model
```typescript
{
  userId: ObjectId (ref: 'User')
  documentId: String (required)
  documentData: Mixed
  verificationStatus: String (enum: ['pending', 'verified', 'rejected'])
  timestamps: true
}
```

## 🔗 Third-Party Integrations

### Surepass OCR API
- **Endpoint**: `https://kyc-api.surepass.app/api/v1/voter-id/voter-id`
- **Purpose**: Extract text from uploaded documents
- **Authentication**: Bearer token
- **Response**: Structured OCR data with confidence scores

### OCR Response Format
```json
{
  "data": {
    "client_id": "ocr_voter_id_xxx",
    "ocr_fields": [
      {
        "document_type": "voter_id",
        "full_name": {
          "value": "John Doe",
          "confidence": 95
        },
        "id_number": {
          "value": "ABC1234567",
          "confidence": 98
        }
      }
    ]
  },
  "status_code": 200,
  "success": true
}
```

## 🛠️ Development

### Code Style
- Use TypeScript for type safety
- Follow RESTful API conventions
- Implement proper error handling
- Use async/await for asynchronous operations

### Adding New Features
1. Create service layer for business logic
2. Add controller for request handling
3. Define routes in appropriate route file
4. Update models if needed
5. Add proper error handling

### Testing
```bash
# Run tests (when implemented)
npm test

# Run with coverage
npm run test:coverage
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Contribution Guidelines
- Follow the existing code style
- Add proper documentation
- Include error handling
- Write meaningful commit messages
- Test your changes thoroughly

## 📄 License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## 📞 Contact

**Project Maintainer**: [Your Name]
- **Email**: [your.email@example.com]
- **GitHub**: [@yourusername](https://github.com/yourusername)
- **LinkedIn**: [Your LinkedIn Profile](https://linkedin.com/in/yourprofile)

---

## 🚀 Quick Start

```bash
# Clone and setup
git clone <repository-url>
cd TestingBackend
npm install

# Setup environment
cp .env.example .env
# Edit .env with your configuration

# Start development server
npm run watch

# Test the API
curl http://localhost:5050/ping
```

---

**⭐ If you found this project helpful, please give it a star!**