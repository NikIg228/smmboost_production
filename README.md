# SMM Boost

Professional social media promotion services for Instagram, TikTok, YouTube, and other platforms.

## 🚀 Features

- **Multi-platform support**: Instagram, TikTok, YouTube, Telegram, VK, Twitter
- **Secure payments**: Multiple payment methods including cards, Kaspi Pay, crypto
- **Real-time processing**: Orders start within 0-30 minutes
- **User authentication**: Secure account management with Supabase
- **Responsive design**: Optimized for all devices
- **24/7 support**: Customer support via Telegram and email

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS
- **Authentication**: Supabase Auth
- **Database**: Supabase PostgreSQL
- **Icons**: Lucide React
- **Deployment**: Netlify

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/smm-boost.git
cd smm-boost
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

Fill in your Supabase credentials in `.env`:
```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. Start the development server:
```bash
npm run dev
```

## 🚀 Deployment

### Netlify Deployment

1. **Connect to GitHub**:
   - Push your code to a GitHub repository
   - Connect your GitHub account to Netlify

2. **Configure build settings**:
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Node version: `18`

3. **Set environment variables** in Netlify dashboard:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`

4. **Deploy**:
   - Netlify will automatically deploy on every push to main branch

### Manual Deployment

```bash
# Build for production
npm run build

# Preview the build
npm run preview
```

## 🔧 Configuration

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_SUPABASE_URL` | Supabase project URL | Yes |
| `VITE_SUPABASE_ANON_KEY` | Supabase anonymous key | Yes |

### Build Configuration

The project uses Vite for building. Configuration is in `vite.config.ts`:

- **Output directory**: `dist/`
- **Asset optimization**: Enabled
- **Code splitting**: Automatic
- **TypeScript**: Full support

## 📁 Project Structure

```
smm-boost/
├── public/                 # Static assets
├── src/
│   ├── components/        # React components
│   ├── data/             # Static data and configurations
│   ├── hooks/            # Custom React hooks
│   ├── lib/              # Utility libraries
│   ├── types/            # TypeScript type definitions
│   ├── App.tsx           # Main application component
│   ├── main.tsx          # Application entry point
│   └── index.css         # Global styles
├── api/                  # Serverless functions
├── netlify.toml          # Netlify configuration
├── package.json          # Dependencies and scripts
└── vite.config.ts        # Vite configuration
```

## 🔐 Security

- **SSL encryption**: All data transmission is encrypted
- **Input validation**: All user inputs are validated
- **CORS protection**: Proper CORS headers configured
- **XSS protection**: Content Security Policy implemented
- **Authentication**: Secure user authentication with Supabase

## 🎨 Design System

- **Colors**: Dark theme with purple/pink gradients
- **Typography**: Inter font family
- **Spacing**: 8px grid system
- **Components**: Consistent button styles and form elements
- **Responsive**: Mobile-first approach

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit changes: `git commit -am 'Add new feature'`
4. Push to branch: `git push origin feature/new-feature`
5. Submit a pull request

## 📄 License

This project is proprietary software. All rights reserved.

## 📞 Support

- **Telegram**: @smm.boost.kz
- **Email**: support.smm.boost.kz@gmail.com
- **Phone**: +7 707 345 12 12

## 🔄 Updates

- **v1.0.0**: Initial release with core functionality
- Regular updates with new features and improvements

---

Made with ❤️ by SMM Boost Team