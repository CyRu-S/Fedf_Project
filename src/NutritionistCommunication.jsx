import React from 'react';
import { Box, Typography, Card, TextField, InputAdornment, IconButton, Avatar, Button } from '@mui/material';
import { SearchRounded, MicRounded, MoreHoriz, SendRounded, AddRounded, SettingsRounded } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import AppSidebar from './components/AppSidebar';
import AppTopBar from './components/AppTopBar';

// Extended user data with individualized diet plans
const chatUsers = [
  {
    id: 1,
    name: 'Emily Rose',
    note: 'Increase carbs consumption',
    avatarBg: '#cbb7ff',
    dietPlan: [
      { title: 'Healthy Fats', subtitle: 'Avocado, Almonds, Olive Oil', emoji: '🥑' },
      { title: 'Lean Proteins', subtitle: 'Salmon, Greek Yogurt, Lentils', emoji: '🐟' },
      { title: 'Carbs & Fiber', subtitle: 'Quinoa, Oats, Berries', emoji: '🥣' },
    ],
  },
  {
    id: 2,
    name: 'John Smith',
    note: 'Increase carbs consumption',
    avatarBg: '#fde68a',
    dietPlan: [
      { title: 'Muscle Fuel', subtitle: 'Chicken, Brown Rice, Broccoli', emoji: '🍗' },
      { title: 'Hydration', subtitle: 'Water, Coconut Water, Cucumber', emoji: '💧' },
      { title: 'Recovery Snack', subtitle: 'Banana, Whey, Peanut Butter', emoji: '🍌' },
    ],
  },
  {
    id: 3,
    name: 'Mike Tyson',
    note: 'Increase carbs consumption',
    avatarBg: '#bfdbfe',
    dietPlan: [
      { title: 'Power Breakfast', subtitle: 'Eggs, Sweet Potato, Spinach', emoji: '🥚' },
      { title: 'Energy Boost', subtitle: 'Apple, Almonds, Honey', emoji: '🍎' },
      { title: 'Evening Fuel', subtitle: 'Tuna, Quinoa, Greens', emoji: '🥬' },
    ],
  },
  {
    id: 4,
    name: 'Jane Doe',
    note: 'Increase carbs consumption',
    avatarBg: '#fcd34d',
    dietPlan: [
      { title: 'Skin Glow', subtitle: 'Berries, Chia Seeds, Yogurt', emoji: '🫐' },
      { title: 'Omega Boost', subtitle: 'Salmon, Walnuts, Flax Seeds', emoji: '🐟' },
      { title: 'Greens', subtitle: 'Kale, Broccoli, Peas', emoji: '🥦' },
    ],
  },
  {
    id: 5,
    name: 'Robert William',
    note: 'Increase carbs consumption',
    avatarBg: '#fca5a5',
    dietPlan: [
      { title: 'Heart Health', subtitle: 'Oats, Olive Oil, Avocado', emoji: '❤️' },
      { title: 'Iron Rich', subtitle: 'Beans, Spinach, Pumpkin Seeds', emoji: '🫘' },
      { title: 'Midday Snack', subtitle: 'Carrots, Hummus, Apple', emoji: '🥕' },
    ],
  },
];

function NutritionistCommunication() {
  const navigate = useNavigate();
  const [activeId, setActiveId] = React.useState(1);
  const [search, setSearch] = React.useState('');
  // messages per user (id => array)
  const [messages, setMessages] = React.useState({
    1: ['Hello Emily, sharing your updated carb plan.', 'Let me know how you feel after lunch.'],
    2: ['John, increase complex carbs pre-workout.'],
    3: ['Mike, hydrate well today.'],
    4: ['Jane, focus on balanced breakfast.'],
    5: ['Robert, monitor fiber intake.'],
  });
  const [draft, setDraft] = React.useState('');

  const activeUser = chatUsers.find(u => u.id === activeId);
  const filteredUsers = chatUsers.filter(u => u.name.toLowerCase().includes(search.toLowerCase()));

  const handleSend = () => {
    if (!draft.trim()) return;
    setMessages(prev => ({ ...prev, [activeId]: [...(prev[activeId] || []), draft.trim()] }));
    setDraft('');
  };

  const handleKey = (e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); } };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f9fafb', fontFamily: 'Chillax, sans-serif' }}>
      <AppSidebar activeKey="communication" />
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <AppTopBar
          brandProps={{ circleSize: 36, fontSize: 22, gap: 3 }}
          rightIcons={[
            {
              Icon: SearchRounded,
              backgroundColor: '#efeafd',
              hoverBackgroundColor: '#e2d6ff',
              boxShadow: '0 4px 16px rgba(188, 173, 255, 0.25)',
              iconColor: '#8b8fb4',
            },
            {
              Icon: SettingsRounded,
              backgroundColor: '#fdf0c3',
              hoverBackgroundColor: '#fde7a2',
              iconColor: '#f2a516',
            },
          ]}
        />

        {/* Main Content */}
        <Box sx={{ flex: 1, overflow: 'auto', display: 'flex', flexDirection: 'column' }}>
          {/* Communication Content */}
          <Box sx={{ px: { xs: 2.5, md: 5 }, py: 3, flex: 1, display: 'flex', flexDirection: 'column' }}>
            {/* Header Section */}
            <Box
              sx={{
                mb: 4,
                display: 'flex',
                alignItems: { xs: 'flex-start', md: 'flex-end' },
                justifyContent: 'space-between',
                gap: 2,
              }}
            >
              <Box>
                <Typography sx={{ color: '#6b7280', fontSize: 18, mb: 0.75, fontFamily: 'Chillax, sans-serif' }}>
                  Overview
                </Typography>
                <Typography
                  variant="h3"
                  sx={{ fontFamily: 'Chillax, sans-serif', fontWeight: 500, letterSpacing: 0.2 }}
                >
                  Communication Overview
                </Typography>
              </Box>
              <Typography
                sx={{
                  display: { xs: 'none', md: 'block' },
                  fontSize: 13,
                  color: '#9ca3af',
                  maxWidth: 260,
                  textAlign: 'right',
                }}
              >
                Manage your patient conversations, notes, and personalized diet plans in one focused view.
              </Typography>
            </Box>

            {/* Grid Layout */}
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', lg: '320px minmax(0, 1.5fr) 340px' },
                gap: 3,
                alignItems: 'stretch',
                flex: 1,
                minHeight: { lg: 620 },
              }}
            >
              {/* Chat List */}
              <Card
                sx={{
                  p: 3,
                  borderRadius: 5,
                  backgroundColor: '#ffffff',
                  boxShadow: '0 10px 40px rgba(15,23,42,0.06)',
                  border: '1px solid rgba(148, 163, 184, 0.35)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 2,
                  minHeight: 620,
                }}
              >
                <Typography sx={{ fontFamily: 'Chillax, sans-serif', fontWeight: 600, fontSize: 22 }}>
                  Your Chats
                </Typography>
                <TextField
                  size="small"
                  placeholder="Search patients or notes"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchRounded sx={{ fontSize: 20, color: '#64748b' }} />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <MicRounded sx={{ fontSize: 20, color: '#64748b' }} />
                      </InputAdornment>
                    ),
                    sx: {
                      borderRadius: 999,
                      background: '#f1f5f9',
                      '& fieldset': { border: 'none' },
                      px: 0.5,
                    },
                  }}
                />
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 1.25,
                    overflow: 'auto',
                    pr: 0.5,
                    mt: 0.5,
                  }}
                >
                  {filteredUsers.map(u => (
                    <Card
                      key={u.id}
                      onClick={() => setActiveId(u.id)}
                      sx={{ cursor: 'pointer', p: 1.25, display: 'flex', alignItems: 'center', gap: 1.5, background: u.id === activeId ? '#eae4ff' : '#ffffff', border: '1px solid #e5e7eb', boxShadow: '0 2px 4px rgba(0,0,0,0.03)', transition: 'background .25s' }}>
                      <Avatar sx={{ bgcolor: u.avatarBg, width: 46, height: 46, fontWeight: 600 }}>{u.name.split(' ').map(p => p[0]).join('').slice(0, 2)}</Avatar>
                      <Box sx={{ flex: 1, minWidth: 0 }}>
                        <Typography sx={{ fontWeight: 600, fontSize: 14, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{u.name}</Typography>
                        <Typography sx={{ fontSize: 12, color: '#64748b', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{u.note}</Typography>
                      </Box>
                      <IconButton size="small"><MoreHoriz sx={{ fontSize: 22, color: '#475569' }} /></IconButton>
                    </Card>
                  ))}
                  {filteredUsers.length === 0 && (
                    <Typography sx={{ fontSize: 12, color: '#64748b', textAlign: 'center', py: 2 }}>No matches</Typography>
                  )}
                </Box>
              </Card>

              {/* Chat Panel */}
              <Card
                sx={{
                  p: 0,
                  borderRadius: 5,
                  backgroundColor: '#ffffff',
                  boxShadow: '0 10px 40px rgba(15,23,42,0.06)',
                  border: '1px solid rgba(148, 163, 184, 0.35)',
                  display: 'flex',
                  flexDirection: 'column',
                  minHeight: 620,
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                    background: 'linear-gradient(135deg,#fef3c7 0%, #fffbeb 60%)',
                    px: 3,
                    py: 2,
                    borderTopLeftRadius: 5,
                    borderTopRightRadius: 5,
                    borderBottom: '1px solid rgba(248, 250, 252, 0.9)',
                  }}
                >
                  <Avatar sx={{ bgcolor: activeUser.avatarBg, width: 50, height: 50, fontWeight: 600 }}>{activeUser.name.split(' ').map(p => p[0]).join('').slice(0, 2)}</Avatar>
                  <Box>
                    <Typography sx={{ fontWeight: 600, fontFamily: 'Chillax, sans-serif' }}>{activeUser.name}</Typography>
                    <Typography sx={{ fontSize: 12, color: '#64748b' }}>{activeUser.note}</Typography>
                  </Box>
                </Box>
                <Box
                  sx={{
                    flex: 1,
                    p: 3,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 1.75,
                    overflow: 'auto',
                    background:
                      'radial-gradient(circle at top left, rgba(239, 246, 255, 0.9), #f9fafb 55%)',
                  }}
                >
                  {(messages[activeId] || []).map((m, i) => (
                    <Box key={i} sx={{ alignSelf: i % 2 ? 'flex-start' : 'flex-end', maxWidth: '70%' }}>
                      <Box sx={{ background: i % 2 ? '#e2e8f0' : '#6366f1', color: i % 2 ? '#111827' : '#ffffff', px: 2, py: 1, borderRadius: 3, fontSize: 13, fontFamily: 'Chillax, sans-serif', boxShadow: '0 2px 4px rgba(0,0,0,0.08)' }}>{m}</Box>
                    </Box>
                  ))}
                </Box>
                <Box
                  sx={{
                    px: 3,
                    py: 2,
                    borderTop: '1px solid #e2e8f0',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1.25,
                    backgroundColor: '#f9fafb',
                  }}
                >
                  <IconButton sx={{ background: '#f1f5f9', borderRadius: 3 }}><AddRounded /></IconButton>
                  <TextField
                    fullWidth
                    size="small"
                    placeholder="Send a message..."
                    value={draft}
                    onChange={(e) => setDraft(e.target.value)}
                    onKeyDown={handleKey}
                    InputProps={{ sx: { background: '#f1f5f9', borderRadius: 3, '& fieldset': { border: 'none' } } }}
                  />
                  <IconButton onClick={handleSend} sx={{ background: '#6366f1', color: '#ffffff', '&:hover': { background: '#4f46e5' } }}><SendRounded /></IconButton>
                </Box>
              </Card>

              {/* Personalized Diet Plan Column */}
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, minHeight: 620 }}>
                <Card
                  sx={{
                    p: 0,
                    borderRadius: 5,
                    overflow: 'hidden',
                    boxShadow: '0 10px 40px rgba(15,23,42,0.06)',
                    border: '1px solid rgba(148, 163, 184, 0.35)',
                    background:
                      'linear-gradient(145deg, rgba(224,231,255,1) 0%, rgba(237,233,254,1) 45%, rgba(238,242,255,1) 100%)',
                    display: 'flex',
                    flexDirection: 'column',
                    flexGrow: 1,
                    minHeight: 380,
                  }}
                >
                  <Box sx={{ background: 'rgba(129,140,248,0.12)', px: 3, py: 2.25 }}>
                    <Typography sx={{ fontWeight: 700, fontSize: 20, fontFamily: 'Chillax, sans-serif' }}>
                      Personalized Diet Plan
                    </Typography>
                    <Typography sx={{ fontSize: 12, color: '#4b5563', mt: 0.5 }}>
                      For {activeUser.name}
                    </Typography>
                  </Box>
                  <Box sx={{ p: 2.5, display: 'flex', flexDirection: 'column', gap: 2 }}>
                    {activeUser.dietPlan.map(item => (
                      <Card key={item.title} sx={{ display: 'flex', gap: 2, alignItems: 'center', p: 2, boxShadow: 'none', border: '1px solid #eef1f6', background: '#ffffff', borderRadius: 3 }}>
                        <Box sx={{ fontSize: 34 }}>{item.emoji}</Box>
                        <Box sx={{ flex: 1 }}>
                          <Typography sx={{ fontWeight: 600, fontSize: 15 }}>{item.title}</Typography>
                          <Typography sx={{ fontSize: 12, color: '#64748b' }}>{item.subtitle}</Typography>
                        </Box>
                        <Button size="small" sx={{ textTransform: 'none', fontSize: 11, fontWeight: 600, color: '#6366f1' }}>View</Button>
                      </Card>
                    ))}
                  </Box>
                </Card>
                <Card
                  onClick={() => navigate('/diet-plan')}
                  sx={{
                    p: 3.5,
                    background: 'linear-gradient(135deg,#bbf7d0 0%, #a5f3fc 40%, #bfdbfe 100%)',
                    borderRadius: 5,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    boxShadow: '0 12px 30px rgba(15,23,42,0.18)',
                    cursor: 'pointer',
                    mt: 0.5,
                    border: '1px solid rgba(34,197,94,0.45)',
                  }}
                >
                  <Box>
                    <Typography
                      sx={{
                        fontSize: 14,
                        letterSpacing: 1.5,
                        textTransform: 'uppercase',
                        color: 'rgba(15,23,42,0.7)',
                        fontWeight: 600,
                      }}
                    >
                      Quick Access
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: 26,
                        fontWeight: 700,
                        color: '#111827',
                        fontFamily: 'Chillax, sans-serif',
                        mt: 0.5,
                      }}
                    >
                      Diet Plan
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      px: 2.5,
                      py: 1,
                      borderRadius: 999,
                      backgroundColor: 'rgba(15,23,42,0.08)',
                      fontSize: 13,
                      fontWeight: 600,
                      color: '#111827',
                    }}
                  >
                    Open
                  </Box>
                </Card>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default NutritionistCommunication;