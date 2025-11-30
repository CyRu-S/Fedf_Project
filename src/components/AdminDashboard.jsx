import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Avatar,
  IconButton,
  TextField,
  InputAdornment,
  Chip,
  Button,
  Pagination,
  Menu,
  MenuItem,
} from '@mui/material';
import {
  Search,
  Chat,
  Add,
  FilterList,
  Apps,
  DashboardOutlined,
  NotificationsNone,
  RemoveRedEye,
  ViewModule,
  EmojiEmotions,
} from '@mui/icons-material';
import '../AdminDashboard.css';

const AdminDashboard = () => {
  const [searchText, setSearchText] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(7);
  const [menuAnchor, setMenuAnchor] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);

  // Mock data - replace with real API calls
  const [allUsers, setAllUsers] = useState([
    {
      id: 1,
      name: 'Cyrus',
      email: 'Cyrus@email.com',
      avatar: '👨‍💻',
      status: 'Active',
      nutritionistId: 'george_001',
      joinDate: '2024-01-15',
      lastActive: '2024-10-09'
    },
    {
      id: 2,
      name: 'Max',
      email: 'Max@email.com',
      avatar: '👨‍🦱',
      status: 'Active',
      nutritionistId: 'george_001',
      joinDate: '2024-02-20',
      lastActive: '2024-10-08'
    },
    {
      id: 3,
      name: 'Sheron',
      email: 'Sheron@email.com',
      avatar: '👩‍🦰',
      status: 'Active',
      nutritionistId: 'george_001',
      joinDate: '2024-03-10',
      lastActive: '2024-10-09'
    },
    {
      id: 4,
      name: 'Justin',
      email: 'Justin@email.com',
      avatar: '👨‍🦳',
      status: 'Not Active',
      nutritionistId: 'george_001',
      joinDate: '2024-04-05',
      lastActive: '2024-10-01'
    },
    {
      id: 5,
      name: 'Amber',
      email: 'Amber@email.com',
      avatar: '👩‍🦱',
      status: 'Active',
      nutritionistId: 'george_001',
      joinDate: '2024-05-12',
      lastActive: '2024-10-09'
    },
    {
      id: 6,
      name: 'Kalix',
      email: 'Kalix@email.com',
      avatar: '👨‍🦲',
      status: 'Active',
      nutritionistId: 'george_001',
      joinDate: '2024-06-18',
      lastActive: '2024-10-08'
    },
    {
      id: 7,
      name: 'Rover',
      email: 'Rover@email.com',
      avatar: '👨‍🎓',
      status: 'Active',
      nutritionistId: 'george_001',
      joinDate: '2024-07-25',
      lastActive: '2024-10-09'
    },
  ]);

  // Current nutritionist
  const currentNutritionist = {
    id: 'george_001',
    name: 'George',
    email: 'george@nutriwell.com'
  };

  // Filter users
  const myUsers = allUsers.filter(user => user.nutritionistId === currentNutritionist.id);

  // Search functionality
  const filteredUsers = myUsers.filter(user =>
    user.name.toLowerCase().includes(searchText.toLowerCase()) ||
    user.email.toLowerCase().includes(searchText.toLowerCase())
  );

  // Pagination
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
  const startIndex = (currentPage - 1) * usersPerPage;
  const currentUsers = filteredUsers.slice(startIndex, startIndex + usersPerPage);

  // Menu handlers
  const handleMenuClick = (event, user) => {
    setMenuAnchor(event.currentTarget);
    setSelectedUser(user);
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
    setSelectedUser(null);
  };

  const handleChatUser = () => {
    console.log(`Starting chat with ${selectedUser?.name}`);
    handleMenuClose();
  };

  const handleViewProfile = () => {
    console.log(`Viewing profile of ${selectedUser?.name}`);
    handleMenuClose();
  };

  const handleRemoveUser = () => {
    if (selectedUser) {
      setAllUsers(prev => prev.filter(user => user.id !== selectedUser.id));
      console.log(`Removed ${selectedUser.name} from client list`);
    }
    handleMenuClose();
  };

  // Add new user
  const handleAddUser = () => {
    const newUser = {
      id: Date.now(),
      name: `New User ${Math.floor(Math.random() * 1000)}`,
      email: `newuser${Math.floor(Math.random() * 1000)}@email.com`,
      avatar: '👤',
      status: 'Active',
      nutritionistId: currentNutritionist.id,
      joinDate: new Date().toISOString().split('T')[0],
      lastActive: new Date().toISOString().split('T')[0]
    };
    setAllUsers(prev => [...prev, newUser]);
  };

  return (
    <Box className="admin-dashboard">
      {/* Sidebar */}
      <Box className="dashboard-sidebar">
        <Box className="sidebar-header">
          <IconButton className="menu-icon">
            <Apps />
          </IconButton>
        </Box>
        
        <Box className="sidebar-nav">
          <IconButton className="nav-item active">
            <DashboardOutlined />
          </IconButton>
          <IconButton className="nav-item">
            <NotificationsNone />
          </IconButton>
          <IconButton className="nav-item">
            <RemoveRedEye />
          </IconButton>
          <IconButton className="nav-item">
            <Chat />
          </IconButton>
          <IconButton className="nav-item">
            <ViewModule />
          </IconButton>
        </Box>

        <Box className="sidebar-bottom">
          <IconButton className="logout-btn">
            <Typography sx={{ fontSize: '20px', fontWeight: 'bold' }}>↻</Typography>
          </IconButton>
        </Box>
      </Box>

      {/* Main Content */}
      <Box className="dashboard-main">
        {/* Top Header */}
        <Box className="dashboard-header">
          <Box className="brand-section">
            <Box className="brand-icon">N</Box>
            <Typography className="brand-name">NutriWell</Typography>
          </Box>
          <Box className="header-actions">
            <IconButton>
              <Search />
            </IconButton>
            <IconButton>
              <EmojiEmotions />
            </IconButton>
          </Box>
        </Box>

        {/* Content Area */}
        <Box className="dashboard-content">
          <Typography className="page-title">Dashboard</Typography>
          <Typography className="welcome-text">Welcome back, {currentNutritionist.name}!</Typography>

          {/* Controls Bar */}
          <Box className="controls-bar">
            <TextField
              placeholder="Hinted search text"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="search-field"
              size="small"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <FilterList />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton size="small">
                      <Search />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Box className="action-buttons">
              <Button className="status-btn" variant="contained">
                Status
              </Button>
              <Button className="plan-type-btn" variant="contained">
                Plan Type
              </Button>
            </Box>
          </Box>

          {/* Users Table */}
          <TableContainer component={Paper} className="users-table">
            <Table>
              <TableHead>
                <TableRow className="table-header">
                  <TableCell sx={{ width: '60px' }}></TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>E-mail</TableCell>
                  <TableCell sx={{ width: '80px' }}>Chat</TableCell>
                  <TableCell sx={{ width: '120px' }}>Status</TableCell>
                  <TableCell sx={{ width: '80px' }}>Report</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {currentUsers.map((user, index) => (
                  <TableRow key={user.id} className="table-row">
                    <TableCell>
                      <Typography sx={{ fontWeight: 600 }}>
                        {startIndex + index + 1}.
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Box className="user-info">
                        <Avatar className="user-avatar">
                          {user.avatar}
                        </Avatar>
                        <Typography className="user-name">
                          {user.name}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Typography className="user-email">
                        {user.email}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <IconButton className="chat-btn" size="small">
                        <Chat />
                      </IconButton>
                    </TableCell>
                    <TableCell>
                      <Chip 
                        label={user.status}
                        size="small"
                        className={`status-chip ${user.status === 'Active' ? 'active' : 'inactive'}`}
                      />
                    </TableCell>
                    <TableCell>
                      <IconButton 
                        className="more-btn"
                        size="small"
                        onClick={(e) => handleMenuClick(e, user)}
                      >
                        <Add />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Pagination */}
          <Box className="pagination-section">
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={(e, page) => setCurrentPage(page)}
              className="pagination"
              showFirstButton
              showLastButton
              size="small"
            />
          </Box>

          {/* Add User Button */}
          <Button 
            className="add-user-btn"
            onClick={handleAddUser}
            startIcon={<Add />}
            variant="contained"
          >
            Add New Client
          </Button>
        </Box>

        {/* Context Menu */}
        <Menu
          anchorEl={menuAnchor}
          open={Boolean(menuAnchor)}
          onClose={handleMenuClose}
          className="context-menu"
        >
          <MenuItem onClick={handleViewProfile}>
            <RemoveRedEye sx={{ mr: 1 }} /> View Profile
          </MenuItem>
          <MenuItem onClick={handleChatUser}>
            <Chat sx={{ mr: 1 }} /> Start Chat
          </MenuItem>
          <MenuItem onClick={handleRemoveUser} className="danger-item">
            Remove Client
          </MenuItem>
        </Menu>
      </Box>
    </Box>
  );
};

export default AdminDashboard;