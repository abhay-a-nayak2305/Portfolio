# Quick Start Guide

## 🚀 Get Started in 5 Minutes

### Option 1: Docker (Easiest)
```bash
# 1. Clone and navigate
cd portfolio

# 2. Start everything
docker-compose up -d

# 3. Access at http://localhost:5173
```

### Option 2: Local Development

#### Prerequisites
- Node.js 18+
- MongoDB (local or Atlas)

#### Steps

**1. Run Setup Script**
```
Double-click: setup.bat    (Windows)
Or run: ./setup.ps1        (PowerShell)
```

**2. Or Manual Setup**

```bash
# Backend
cd backend
cp .env.example .env
# Edit .env with your MongoDB URI
npm install
npm run seed
npm run dev   # Server on http://localhost:5000

# Frontend (new terminal)
cd frontend
npm install
npm run dev   # Site on http://localhost:5173
```

## 📁 Project Structure

```
portfolio/
├── backend/           # Express.js API
│   ├── models/       # MongoDB schemas
│   ├── routes/       # API endpoints
│   ├── seed.js       # Sample data
│   └── server.js     # Entry point
├── frontend/         # React + Vite + Tailwind
│   ├── src/
│   │   ├── components/
│   │   │   ├── sections/  # Hero, Projects, About, Contact, Blog
│   │   │   ├── layout/    # Navbar, Footer
│   │   │   └── ui/        # Spinner, EmptyState
│   │   ├── pages/         # Route pages
│   │   ├── utils/         # API client, helpers
│   │   └── context/       # Dark mode
│   └── tailwind.config.js
├── docker-compose.yml
├── README.md          # Full documentation
└── QUICKSTART.md      # This file
```

## 🔧 Customization

### Update Personal Info

1. **Hero section**: Edit `frontend/src/components/sections/Hero.jsx`
2. **Projects**: Edit `backend/seed.js` or use API to add your own
3. **Skills**: Edit `backend/seed.js`
4. **Contact email**: `frontend/src/components/sections/Contact.jsx`
5. **Social links**: `frontend/src/data/social.js`
6. **Colors**: `frontend/tailwind.config.js`

### replace placeholder content

```javascript
// In frontend/src/components/sections/Hero.jsx
- Change headline: "I Build Digital Experiences"
- Update stats values
- Add your real social links in data/social.js

// In backend/seed.js
- Replace author name, email, social URLs
- Add your actual projects
- Update skills with your proficiency
```

## 📊 Default Data

When you run `npm run seed`, you get:

**Projects** (6 sample):
- E-Commerce Platform (MERN, Stripe, Redis)
- Task Management App (Real-time collaboration)
- AI Content Generator (GPT integration)
- Real-Time Chat (WebRTC)
- DevOps Dashboard (Monitoring)
- Recipe Sharing Platform

**Skills** (20+):
Frontend: React, TypeScript, Tailwind, Next.js, Vue.js
Backend: Node.js, Express, Python, Django, GraphQL
Database: MongoDB, PostgreSQL, Redis, MySQL
DevOps: AWS, Docker, Kubernetes, CI/CD
Mobile: React Native, Flutter

**Articles** (3 sample):
- Building Scalable APIs
- Mastering Tailwind CSS
- State Management comparison

## 🎯 Key Features

### Dark Mode
Click moon icon (bottom-right) to toggle. Persists in localStorage.

### Project Filtering
Projects page supports filtering by category (Fullstack, Frontend, Backend, DevOps, Mobile) and view mode toggle (Grid/List).

### Contact Form
- Backend validation
- Rate limiting (5 per hour per email)
- Spam protection (honeypot)
- Ready for email integration (configure in .env)

### Analytics
Built-in analytics tracks visits, views, device type, and geography.

## 🚀 Deployment

### Vercel + Railway
```bash
# Frontend to Vercel
cd frontend
npm run build
# Deploy dist/ folder

# Backend to Railway/Render
# Push backend/, set env vars
```

### Docker (Production)
```bash
# Build and deploy
docker-compose -f docker-compose.prod.yml up -d

# Or single server
docker build -t portfolio-backend ./backend
docker run -p 5000:5000 portfolio-backend
```

## 🔐 Security Checklist

- [ ] Change JWT_SECRET in backend/.env (minimum 32 chars)
- [ ] Update MONGODB_URI to use strong credentials
- [ ] Set proper CORS origin in production (CLIENT_URL)
- [ ] Enable email service for contact notifications
- [ ] Configure rate limits based on traffic

## 🐛 Troubleshooting

**MongoDB Connection Failed**
- Ensure MongoDB is running: `mongod` or `net start MongoDB`
- For Atlas, check connection string and IP whitelist

**Port Already in Use**
- Backend uses 5000, Frontend uses 5173
- Change ports in respective package.json scripts

**CORS Errors**
- Check CLIENT_URL in backend/.env matches frontend URL
- Restart backend after changing .env

**Docker Issues**
```bash
# Rebuild
docker-compose build --no-cache
# View logs
docker-compose logs -f
```

## 📚 Learn More

- Full documentation: [README.md](README.md)
- API reference: See API endpoints in README
- Customization guide: See README sections

## 💡 Next Steps

1. Add your projects to `backend/seed.js`
2. Customize colors and fonts in `frontend/tailwind.config.js`
3. Set up MongoDB Atlas for production
4. Deploy to Vercel/Railway using Docker compose
5. Connect custom domain
6. Add Google Analytics tracking (optional)
7. Create blog articles and add to database

## 🆘 Support

- Create issue: github.com/yourusername/portfolio/issues
- Email: your.email@example.com

---

**Ready to launch?** Run `docker-compose up -d` and your portfolio is live!
