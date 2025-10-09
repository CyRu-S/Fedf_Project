import React from 'react';
import { Box, IconButton } from '@mui/material';
import {
  Dashboard as DashboardIcon,
  Notifications,
  Person,
  Chat,
  MenuBook,
  Logout,
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const NAV_ITEMS = [
  { key: 'dashboard', icon: DashboardIcon, path: '/dashboard' },
  { key: 'notifications', icon: Notifications, path: '/notifications' },
  { key: 'communication', icon: Chat, path: '/communication' },
  { key: 'profile', icon: Person, path: '/profile' },
  { key: 'library', icon: MenuBook, path: '/daily-log' },
];

function AppSidebar({ activeKey }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth();

  const resolvedActive = activeKey ||
    (location.pathname.startsWith('/notifications') ? 'notifications' :
    location.pathname.startsWith('/communication') ? 'communication' :
    location.pathname.startsWith('/daily-log') ? 'library' :
    location.pathname.startsWith('/profile') ? 'profile' :
    location.pathname.startsWith('/dashboard') ? 'dashboard' : undefined);
    
  const handleSignOut = () => {
    const redirectPath = logout();
    navigate(redirectPath || '/login');
  };

  return (
    <Box
      sx={{
        width: 72,
        backgroundColor: '#1f2937',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        py: 4,
        gap: 3,
        borderRadius: 6,
        margin: 1,
      }}
    >
      {NAV_ITEMS.map(({ key, icon: Icon, path }) => (
        <IconButton
          key={key}
          onClick={() => path && navigate(path)}
          sx={{
            width: 48,
            height: 48,
            borderRadius: 12,
            backgroundColor: resolvedActive === key ? '#374151' : 'transparent',
            '&:hover': { backgroundColor: '#4b5563' },
          }}
        >
          <Icon sx={{ color: resolvedActive === key ? '#f3f4f6' : '#9ca3af', fontSize: 28 }} />
        </IconButton>
      ))}
      <Box sx={{ flex: 1 }} />
      <IconButton
        onClick={handleSignOut}
        sx={{ 
          width: 48, 
          height: 48, 
          borderRadius: 12, 
          '&:hover': { 
            backgroundColor: '#4b5563',
            '& .MuiSvgIcon-root': {
              color: '#ef4444',
            }
          } 
        }}
      >
        <Logout sx={{ 
          color: '#9ca3af', 
          fontSize: 28,
          transition: 'color 0.2s ease-in-out'
        }} />
      </IconButton>
    </Box>
  );
}

export default AppSidebar;
