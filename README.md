# 🏋️ FitTrackPro

**Professional Fitness Monitoring Dashboard for Gym Trainers**

A comprehensive, mobile-first Single Page Application (SPA) built with Preact and Vite, designed to help gym trainers manage their clients, track progress, and streamline their daily operations.

## 🚀 **Quick Start**

### **Prerequisites**
- Node.js (v16 or higher)
- npm or yarn

### **Installation**

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd FitTrackPro
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

## 🛠️ **Tech Stack**

- **Frontend Framework:** Preact (React-like, lightweight)
- **Build Tool:** Vite (fast development and building)
- **Styling:** Tailwind CSS v4 (utility-first CSS framework)
- **State Management:** Preact Signals (reactive state)
- **Deployment:** Netlify (static site hosting)

## 📱 **Features**

### **Core Functionality**
- ✅ **Dashboard Overview** - Real-time metrics and quick actions
- ✅ **Client Management** - Add, edit, and track client information
- ✅ **Workout Plans** - Create and assign exercise routines
- ✅ **Progress Tracking** - Weight, measurements, and visual charts
- ✅ **Nutrition Management** - Meal plans and macro tracking
- ✅ **Scheduling** - Calendar integration and session booking
- ✅ **Communication** - Chat system and internal notes
- ✅ **Reports** - PDF generation and analytics
- ✅ **Mobile-First Design** - Optimized for mobile and desktop

### **Mobile Optimizations**
- 📱 **Touch-friendly interfaces** (44px minimum touch targets)
- 📱 **Responsive design** with mobile-first approach
- 📱 **Swipe gestures** and **pull-to-refresh**
- 📱 **Offline capability** for critical functions
- 📱 **Fast loading** on 3G networks

## 🏗️ **Project Structure**

```
FitTrackPro/
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── TopNav.jsx          # Top navigation bar
│   │   │   ├── SideNav.jsx         # Side navigation menu
│   │   │   └── Layout.jsx          # Main layout wrapper
│   │   ├── dashboard/              # Dashboard components
│   │   ├── clients/                # Client management
│   │   ├── workouts/               # Workout plans
│   │   ├── progress/               # Progress tracking
│   │   ├── nutrition/              # Nutrition management
│   │   ├── schedule/               # Calendar and scheduling
│   │   ├── communication/          # Chat and messaging
│   │   ├── settings/               # App configuration
│   │   ├── api-tools/              # External API integration
│   │   └── reports/                # Analytics and reports
│   ├── hooks/                      # Custom React hooks
│   ├── utils/                      # Utility functions
│   ├── services/                   # API services
│   ├── styles/                     # Global styles
│   ├── App.jsx                     # Main app component
│   ├── main.jsx                    # App entry point
│   └── index.css                   # Global CSS with Tailwind
├── public/                         # Static assets
├── package.json                    # Dependencies and scripts
├── vite.config.js                  # Vite configuration
└── README.md                       # Project documentation
```

## 🎨 **Design System**

### **Color Palette**
- **Primary Blue:** `#2563eb` - Main brand color
- **Success Green:** `#10b981` - Positive actions
- **Warning Yellow:** `#f59e0b` - Caution states
- **Error Red:** `#ef4444` - Error states
- **Neutral Grays:** Various shades for text and backgrounds

### **Typography**
- **Font Family:** System fonts (San Francisco, Segoe UI, etc.)
- **Mobile-first** responsive typography
- **Accessible** color contrast ratios

## 📋 **Development Scripts**

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint (when configured)
```

## 🌐 **Deployment**

### **Netlify Deployment**
1. Connect your repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Deploy automatically on push to main branch

### **Environment Variables**
```env
VITE_API_BASE_URL=https://api.exercisedb.io
VITE_NUTRITION_API_KEY=your_api_key
VITE_APP_ENV=production
```

## 📊 **Performance Targets**

- **Lighthouse Score:** > 90 in all categories
- **First Contentful Paint:** < 1.5s
- **Largest Contentful Paint:** < 2.5s
- **Bundle Size:** < 500KB gzipped
- **Mobile Usability:** > 90%

## 🤝 **Contributing**

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 **License**

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 **Support**

For support and questions:
- 📧 Email: support@fittrackpro.com
- 📱 Mobile: Optimized for iOS and Android
- 🖥️ Desktop: Full functionality on all modern browsers

---

**Built with ❤️ for gym trainers worldwide**
