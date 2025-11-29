# NutriWell Sign Up Page - Setup Guide

## 📁 Project Structure (Simplified)

```
Fedf_project/
├── public/
│   └── Plant.jpg              # Plant image used in the design
├── src/
│   ├── App.jsx                # Main entry component (simplified)
│   ├── SignUpPage.jsx         # Complete signup form (single file)
│   └── main.jsx               # React entry point
├── index.html                 # HTML with Chillax font
└── package.json               # Dependencies
```

## 🎨 Design Features

- **Font**: Chillax (loaded from Fontshare)
- **Colors**: 
  - Green gradient background: `#a7d5a6`, `#d4e8d4`, `#e8f5e8`
  - Button green: `#6fb86d`
  - Purple dot: `#d8b4fe`
- **Layout**: Split design with form on left, branding on right
- **Responsive**: Works on mobile and desktop

## 🚀 How to Use

### Running the App
```bash
npm run dev
```

### Understanding the Code

**SignUpPage.jsx** is a single, self-contained component with:

1. **State Management** (lines 24-36)
   - All form data stored in one `formData` object
   - Easy to add/remove fields

2. **Event Handlers** (lines 38-47)
   - `handleChange`: Updates form fields
   - `handleSubmit`: Processes form submission

3. **Layout Structure**:
   - Background with decorative circles
   - Left side: Form with all input fields
   - Right side: Branding and plant image

### Customizing the Form

**To add a new field:**
```jsx
// 1. Add to state (line 24)
const [formData, setFormData] = useState({
  // ... existing fields
  newField: '',
});

// 2. Add the input field in the form
<Box sx={{ marginBottom: 2.5 }}>
  <Typography sx={{ fontSize: '14px', marginBottom: 1, color: '#4a5568' }}>
    New Field Label
  </Typography>
  <TextField
    fullWidth
    value={formData.newField}
    onChange={handleChange('newField')}
    variant="outlined"
    {% raw %}
    sx={{
      '& .MuiOutlinedInput-root': {
        backgroundColor: '#f3f4f6',
        borderRadius: 2,
        '& fieldset': { border: 'none' },
      },
    }}
    {% endraw %}
  />
</Box>
```

**To change colors:**
- Background gradient: Line 56-58
- Button color: Line 479 (`backgroundColor: '#6fb86d'`)
- Purple dot: Line 533 (`backgroundColor: '#d8b4fe'`)

**To change text:**
- Tagline: Lines 555-569

## 🧹 Cleanup (Optional)

The old component files in `src/components/` are no longer needed. You can safely delete:
- `src/components/ui/` folder (contains old Tailwind components)
- `src/components/figma/` folder

**To delete:**
```bash
# Windows PowerShell
Remove-Item -Recurse -Force src/components
```

Or manually delete the `components` folder from File Explorer.

## 📦 Dependencies Used

- **React 18**: Core framework
- **Material-UI (@mui/material)**: UI components
- **@emotion/react & @emotion/styled**: Styling (required by MUI)

## 🎓 Beginner Tips

1. **State**: Think of it as a container that holds your form data
2. **Props**: Data passed to components (we use `sx` for styling)
3. **Event Handlers**: Functions that run when users interact (like typing)
4. **Material-UI**: Pre-built components that look professional

## 🔧 Common Modifications

### Change form submission behavior
Edit the `handleSubmit` function (line 43):
```jsx
const handleSubmit = (event) => {
  event.preventDefault();
  // Add your API call here
  fetch('/api/signup', {
    method: 'POST',
    body: JSON.stringify(formData),
  });
};
```

### Add form validation
```jsx
const handleSubmit = (event) => {
  event.preventDefault();
  
  // Check if passwords match
  if (formData.password !== formData.confirmPassword) {
    alert('Passwords do not match!');
    return;
  }
  
  // Check if email is valid
  if (!formData.email.includes('@')) {
    alert('Please enter a valid email!');
    return;
  }
  
  console.log('Form submitted:', formData);
};
```

## 📝 Notes

- All styling is done with Material-UI's `sx` prop (inline styles)
- No separate CSS files needed
- Font is loaded from CDN in `index.html`
- Image is imported directly from the `public` folder

## 🆘 Troubleshooting

**Image not showing?**
- Check that `Plant.jpg` exists in the `public` folder
- Clear browser cache (Ctrl+Shift+R)

**Font not loading?**
- Check internet connection (font loads from CDN)
- Fallback to 'Inter' font automatically

**Form not submitting?**
- Check browser console (F12) for errors
- Make sure `handleSubmit` is called

## 📚 Learn More

- [React Docs](https://react.dev)
- [Material-UI Docs](https://mui.com)
- [JavaScript ES6 Guide](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
