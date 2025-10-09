# NutriWell - Project Structure

## 📁 Clean Project Structure

```
Fedf_project/
├── public/
│   ├── Fruits and Vegies/     # 24 fruit/vegetable images (SVG)
│   ├── Plant.jpg              # Plant image for signup page
│   └── vf.jpg                 # Background image
├── src/
│   ├── App.jsx                # Main routing component
│   ├── AccessPage.jsx         # Split screen access selection
│   ├── SignUpPage.jsx         # Registration form
│   ├── DashboardPage.jsx      # User dashboard (NEW!)
│   └── main.jsx               # React entry point
├── index.html                 # HTML with Chillax font
├── package.json               # Dependencies
├── SETUP_GUIDE.md            # Detailed setup guide
└── PROJECT_STRUCTURE.md      # This file
```

## 🎯 Pages Overview

### 1. **AccessPage** (`/`)
- **Purpose**: User type selection (Professional vs User)
- **Features**:
  - Split screen design
  - Left: Professional Access (dark teal background)
  - Right: User Access (light blue background)
  - Animated fruit/vegetable images from public folder
  - Navigation menu (Features, Pricing, Blog)
  - NutriWell branding
  - Login and Sign up buttons

### 2. **SignUpPage** (`/signup`)
- **Purpose**: User registration form
- **Features**:
  - Split layout with form and branding
  - All registration fields (name, email, password, etc.)
  - Plant image background on right side
  - NutriWell branding
  - Register button (centered)
  - "Already have an account? Login" link

### 3. **DashboardPage** (`/dashboard`) - NEW!
- **Purpose**: User dashboard with health tracking
- **Features**:
  - Dark sidebar with navigation icons
  - Daily Nutrition Overview (circular progress charts)
  - Calories bar chart (monthly data)
  - Habit Tracker with fruit/veggie images
  - Activity metrics (heart rate, steps, calories)
  - Progress bars for Move, Exercise, Steps
  - NutriWell branding in header

## 🚀 Navigation Flow

```
AccessPage (/)
    ↓
    Click "Sign up" (Professional or User)
    ↓
SignUpPage (/signup)
    ↓
    Fill form and click "Register"
    ↓
AccessPage (/) - Back to split screen login

AccessPage (/)
    ↓
    Click "Login" (Professional or User Access)
    ↓
DashboardPage (/dashboard) - User's main dashboard

DashboardPage (/dashboard)
    ↓
    Click "Exit" (bottom of sidebar)
    ↓
AccessPage (/) - Back to login selection
```
```

## 🎨 Design Features

### AccessPage
- **Left Side (Professional)**:
  - Background: Dark teal gradient (#2c7a7b → #285e61)
  - 12 scattered fruit/veggie images
  - White text and buttons
  - Green hover effects (#81e6d9)

- **Right Side (User)**:
  - Background: Light blue/purple gradient
  - 12 scattered fruit/veggie images
  - Dark text
  - Green accent color (#48bb78)

### SignUpPage
- **Background**: Light green (#D0FFD3) with vf.jpg overlay (20% opacity)
- **Form**: White card with all registration fields
- **Right Side**: Plant image with semi-transparent overlay
- **Font**: Chillax throughout

## 📦 Dependencies

```json
{
  "react": "^18.3.1",
  "react-dom": "^18.3.1",
  "react-router-dom": "^6.x",
  "@mui/material": "^7.3.2",
  "@emotion/react": "^11.14.0",
  "@emotion/styled": "^11.14.1"
}
```

## 🔧 Key Technologies

1. **React 18**: Core framework
2. **React Router**: Page navigation
3. **Material-UI**: UI components and styling
4. **Chillax Font**: Custom typography
5. **Vite**: Build tool

## 📝 Code Organization

### App.jsx (Routing)
```jsx
/ → AccessPage
/signup → SignUpPage
/* → Redirect to /
```

### AccessPage.jsx (Single File)
- Component: `AccessPage`
- State: None (stateless)
- Navigation: Uses `useNavigate` from react-router
- Images: 24 fruit/veggie images from public folder
- Sections: Professional (left) | User (right)

### SignUpPage.jsx (Single File)
- Component: `SignUpPage`
- State: `formData` (all form fields)
- Navigation: Uses `useNavigate` from react-router
- Form fields: 11 inputs (firstName, lastName, email, etc.)
- Validation: Ready to add

## 🎓 Beginner-Friendly Features

1. **Single File Components**: Each page is one file
2. **Clear Comments**: Every section explained
3. **Simple State Management**: useState only
4. **Material-UI**: Pre-built components
5. **No Complex Logic**: Straightforward code flow

## 🔄 Adding New Pages

To add a new page (e.g., Dashboard):

1. **Create the component**:
```jsx
// src/DashboardPage.jsx
import React from 'react';
import { Box, Typography } from '@mui/material';

function DashboardPage() {
  return (
    <Box>
      <Typography>Dashboard</Typography>
    </Box>
  );
}

export default DashboardPage;
```

2. **Add route in App.jsx**:
```jsx
import DashboardPage from './DashboardPage';

// In Routes:
<Route path="/dashboard" element={<DashboardPage />} />
```

3. **Navigate from other pages**:
```jsx
import { useNavigate } from 'react-router-dom';

const navigate = useNavigate();
navigate('/dashboard');
```

## 🗑️ Removed Files

The following files were removed from the original split screen access folder:
- All `.tsx` and `.ts` files (converted to `.jsx`)
- Component library files (using Material-UI instead)
- Unnecessary configuration files
- Old Tailwind components

## 🎯 Future Enhancements

1. **Login Page**: Add `/login` route
2. **Dashboard**: Add `/dashboard` for logged-in users
3. **Profile Page**: Add `/profile` for user settings
4. **API Integration**: Connect forms to backend
5. **Form Validation**: Add error messages
6. **Loading States**: Add spinners during submission
7. **Success Messages**: Show confirmation after registration

## 📚 File Descriptions

### Core Files

- **App.jsx** (33 lines)
  - Sets up React Router
  - Defines all routes
  - Handles 404 redirects

- **AccessPage.jsx** (450+ lines)
  - Split screen layout
  - Professional/User access selection
  - Fruit/veggie image positioning
  - Navigation to signup

- **SignUpPage.jsx** (600+ lines)
  - Registration form
  - 11 form fields
  - Form state management
  - Plant image background

- **main.jsx** (10 lines)
  - React app initialization
  - Renders App component

- **index.html** (30 lines)
  - HTML structure
  - Chillax font loading
  - Root div for React

## 🎨 Color Palette

### AccessPage
- **Professional Side**:
  - Primary: `#2c7a7b` (Dark Teal)
  - Secondary: `#285e61` (Darker Teal)
  - Accent: `#81e6d9` (Light Teal)
  - Text: `#ffffff` (White)

- **User Side**:
  - Primary: `#bfdbfe` (Light Blue)
  - Secondary: `#ddd6fe` (Light Purple)
  - Accent: `#48bb78` (Green)
  - Text: `#2d3748` (Dark Gray)

### SignUpPage
- Background: `#D0FFD3` (Light Green)
- Card: `#ffffff` (White)
- Button: `#6fb86d` (Green)
- Text: `#2d3748` (Dark Gray)
- Accent: `#ABC25B` (Yellow-Green)

## 🚦 Getting Started

1. **Install dependencies**:
```bash
npm install
```

2. **Run development server**:
```bash
npm run dev
```

3. **Open browser**:
```
http://localhost:5173
```

4. **Navigate**:
- Start at `/` (AccessPage)
- Click "Sign up" → Goes to `/signup`
- Fill form and register

## 💡 Tips for Customization

### Change Colors
- AccessPage: Lines 100-110 (background gradients)
- SignUpPage: Lines 53-58 (background color)

### Add Form Fields
- Update `formData` state (line 23)
- Add TextField component in form section
- Add handleChange for the new field

### Modify Images
- Replace images in `public/Fruits and Vegies/`
- Update image paths in AccessPage (lines 26-52)

### Change Font
- Update `index.html` (line 14)
- Change fontFamily in all sx props

## 📞 Support

For questions or issues:
1. Check `SETUP_GUIDE.md` for detailed instructions
2. Review component comments in code
3. Check console for error messages

---

**Built with ❤️ using React, Material-UI, and Chillax font**
