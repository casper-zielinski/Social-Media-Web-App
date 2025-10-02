# ChatAI - Social Media Platform

A modern, real-time social media application built with Next.js 14, Firebase, and Redux. Features include user authentication, post creation, comments, replies, guest login and dark mode support.

![Next.js](https://img.shields.io/badge/Next.js-14.2-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue?style=flat-square&logo=typescript)
![Firebase](https://img.shields.io/badge/Firebase-12.2-orange?style=flat-square&logo=firebase)
![TailwindCSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8?style=flat-square&logo=tailwind-css)

## ✨ Features

- 🔐 **Authentication System**

  - Email/Password authentication
  - Guest login functionality
  - Persistent login with Firebase Auth

- 📝 **Post Management**

  - Create, view, and delete posts
  - Real-time post updates
  - Like/Unlike functionality
  - Timestamp tracking with relative time display

- 💬 **Interactive Comments**

  - Nested comment system
  - Reply to comments
  - Like comments and replies
  - Real-time comment synchronization

- 🎨 **Modern UI/UX**

  - Responsive design (mobile-first approach)
  - Dark mode support with next-themes
  - Smooth animations using Framer Motion
  - DaisyUI component library

- 👤 **User Profile**
  - Profile display across the app
  - Username and display name management
  - Profile settings page

## 🚀 Tech Stack

### Frontend

- **Framework:** Next.js 14.2 (React 18)
- **Language:** TypeScript 5.9
- **Styling:**
  - Tailwind CSS 3.4
  - DaisyUI 5.0
  - Custom CSS modules
- **State Management:** Redux Toolkit 2.8
- **Animations:** Framer Motion 12.23

### Backend & Database

- **Backend-as-a-Service:** Firebase 12.2
  - Authentication
  - Firestore (NoSQL Database)
  - Real-time listeners
- **Hosting:** Vercel (recommended)

### Developer Tools

- **Package Manager:** npm
- **Linting:** ESLint (Next.js config)
- **Type Checking:** TypeScript strict mode

## 📦 Installation

### Prerequisites

- Node.js 18.17.0 or higher
- npm or yarn
- Firebase project with Firestore enabled

### Steps

1. **Clone the repository**

```bash
git clone https://github.com/yourusername/chatai.git
cd chatai
```

2. **Install dependencies**

```bash
npm install
```

3. **Set up environment variables**

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

4. **Run the development server**

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🏗️ Project Structure

```
chatai/
├── app/
│   ├── components/
│   │   ├── layout/              # Layout components
│   │   ├── MainComponents/      # Main feed components
│   │   ├── PopUpModals/         # Modal components
│   │   ├── Logo.tsx
│   │   ├── Profile.tsx
│   │   └── TruncateText.tsx
│   ├── hooks/                   # Custom React hooks
│   ├── settings/                # Settings page
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── redux/
│   ├── slices/                  # Redux slices
│   ├── store.ts
│   └── StoreProvider.tsx
├── public/                      # Static assets
├── firebase.ts                  # Firebase configuration
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

## 🔑 Key Components

### Authentication

- `LoginModal.tsx` - Email/password login
- `SignUpModal.tsx` - New user registration
- `LogInAsGuestButton.tsx` - Quick guest access

### Posts & Feeds

- `PostFeed.tsx` - Main post feed with real-time updates
- `Poster.tsx` - Create new posts
- `MainButtons.tsx` - Post interaction buttons (like, comment, bookmark)

### Comments System

- `CommentShower.tsx` - Display comments on posts
- `CommentModal.tsx` - Create comments and replies
- `ReplyShower.tsx` - Nested reply display

### Settings

- `UserSetting.tsx` - User profile management
- `AppearanceSettings.tsx` - Theme switcher
- `PrivacySettings.tsx` - Account security settings

## 🔥 Firebase Setup

### Firestore Collections

#### `posts`

```javascript
{
  text: string,
  name: string,
  username: string,
  useremail: string,
  timeStamp: Timestamp,
  likes: string[],
  NumberOfComments: number
}
```

#### `posts/{postId}/comments`

```javascript
{
  name: string,
  username: string,
  text: string,
  timeStamp: Timestamp,
  likes: string[],
  NumberOfReplys: number
}
```

#### `posts/{postId}/comments/{commentId}/replys`

```javascript
{
  name: string,
  username: string,
  text: string,
  timeStamp: Timestamp,
  likes: string[],
  replyTo: {
    userId: string,
    userName: string,
    userUsername: string,
    textToReplyTo: string
  }
}
```

### Security Rules (Recommended)

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /posts/{postId} {
      allow read: if true;
      allow create: if request.auth != null;
      allow update, delete: if request.auth.uid == resource.data.useremail;

      match /comments/{commentId} {
        allow read: if true;
        allow create: if request.auth != null;
        allow update, delete: if request.auth.uid == resource.data.username;

        match /replys/{replyId} {
          allow read: if true;
          allow create: if request.auth != null;
          allow update, delete: if request.auth.uid == resource.data.username;
        }
      }
    }
  }
}
```

## 🎨 Theme Customization

The app uses DaisyUI themes with custom Tailwind configuration. Dark mode is handled by `next-themes`.

### Available Themes

- Light mode (default)
- Dark mode (gray-950 background)

Switch themes using the toggle in Settings → Appearance.

## 📱 Responsive Design

The application is fully responsive:

- **Mobile:** < 640px (simplified navigation)
- **Tablet:** 640px - 1024px
- **Desktop:** > 1024px (full sidebar navigation)

## 🔐 Guest Login

For testing purposes, use the "Login as Guest" button:

- Email: `guest123@gmail.com`
- Password: `MeinPasswort1!`

## 🚧 Known Limitations

- No image upload functionality yet
- No direct messaging system
- No notification system implementation
- Search functionality not yet implemented
- AI Chatbot feature is placeholder

## 🤝 Contributing

Contributions are welcome! Please follow these guidelines:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Commit Convention

This project follows [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation changes
- `style:` Code style changes (formatting)
- `refactor:` Code refactoring
- `perf:` Performance improvements
- `test:` Adding tests

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👤 Author

Your Name

- GitHub: [@casper-zielinski](https://github.com/casper-zielinski)
- Email: casper.zielinski@edu.fh-joanneum.at

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/)
- [Firebase](https://firebase.google.com/)
- [DaisyUI](https://daisyui.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [React Icons](https://react-icons.github.io/react-icons/)

## 📞 Support

For support, email casper.zielinski@edu.fh-joanneum.at or create an issue in the repository.

---

**Built with ❤️ using Next.js and Firebase**
