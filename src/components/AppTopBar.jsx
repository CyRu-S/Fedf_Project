import React from 'react';
import { Box, IconButton } from '@mui/material';
import { Search, Settings } from '@mui/icons-material';
import NutriWellBrand from './NutriWellBrand';

function AppTopBar({
  containerSx = {},
  brandProps = {},
  rightIcons = [Search, Settings],
  rightContent = null,
}) {
  const iconConfig = rightIcons.map((item, index) => {
    if (item && typeof item === 'object' && item.Icon) {
      const {
        Icon,
        id = index,
        backgroundColor = index === 0 ? '#e6e6f0' : '#fef3c7',
        hoverBackgroundColor = index === 0 ? '#d1d5f0' : '#fde68a',
        boxShadow = index === 0
          ? '0 2px 6px rgba(203, 183, 255, 0.5)'
          : '0 2px 6px rgba(254, 243, 199, 0.5)',
        iconColor = index === 0 ? '#7a7a7a' : '#fbbf24',
        onClick,
        ...rest
      } = item;

      return {
        Icon,
        id,
        backgroundColor,
        hoverBackgroundColor,
        boxShadow,
        iconColor,
        onClick,
        rest,
      };
    }

    return {
      Icon: item,
      id: index,
      backgroundColor: index === 0 ? '#e6e6f0' : '#fef3c7',
      hoverBackgroundColor: index === 0 ? '#d1d5f0' : '#fde68a',
      boxShadow:
        index === 0
          ? '0 2px 6px rgba(203, 183, 255, 0.5)'
          : '0 2px 6px rgba(254, 243, 199, 0.5)',
      iconColor: index === 0 ? '#7a7a7a' : '#fbbf24',
    };
  });

  return (
    <Box
      sx={{
        backgroundColor: '#f3f4f6',
        px: 6,
        py: 1.5,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderRadius: 6,
        margin: 1,
        border: '1px solid rgba(0, 0, 0, 0.2)',
        position: 'relative',
        zIndex: 10,
        ...containerSx,
      }}
    >
      <NutriWellBrand {...brandProps} />
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
        {iconConfig.map(({ id, Icon, backgroundColor, hoverBackgroundColor, boxShadow, iconColor, onClick }) => (
          <IconButton
            key={id}
            onClick={onClick}
            sx={{
              width: 48,
              height: 48,
              backgroundColor,
              borderRadius: 16,
              boxShadow,
              '&:hover': {
                backgroundColor: hoverBackgroundColor,
              },
            }}
          >
            <Icon sx={{ color: iconColor, fontSize: 24 }} />
          </IconButton>
        ))}
        {rightContent}
      </Box>
    </Box>
  );
}

export default AppTopBar;
