import React from 'react';
import { Box, Typography } from '@mui/material';

/**
 * NutriWellBrand Component
 * Reusable brand mark with overlapping circles and label
 */
function NutriWellBrand({
  circleSize = 36,
  primaryColor = '#fbd58d',
  secondaryColor = '#cfc2ff',
  fontSize = 22,
  fontWeight = 700,
  textColor = '#1a1a1d',
  fontFamily = "'Poppins', sans-serif",
  gap = 2.5,
}) {
  const secondarySize = circleSize * 0.66;

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap }}>
      <Box sx={{ position: 'relative', width: circleSize, height: circleSize }}>
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: circleSize * 0.12,
            width: secondarySize,
            height: secondarySize,
            backgroundColor: primaryColor,
            borderRadius: '50%',
            boxShadow: `0 2px 4px ${primaryColor}66`,
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            bottom: 0,
            right: 0,
            width: secondarySize,
            height: secondarySize,
            backgroundColor: secondaryColor,
            borderRadius: '50%',
            boxShadow: `0 2px 4px ${secondaryColor}66`,
          }}
        />
      </Box>
      <Typography sx={{ fontWeight, fontSize, color: textColor, fontFamily }}>
        NutriWell
      </Typography>
    </Box>
  );
}

export default NutriWellBrand;
