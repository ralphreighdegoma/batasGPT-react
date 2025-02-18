import React, { useState } from 'react';
import { Box, Typography, Button } from '@mui/material';

interface BioComponentProps {
  bio: string;
}

const BioComponent: React.FC<BioComponentProps> = ({ bio }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const maxLength = 240;
  const shouldTruncate = bio.length > maxLength;
  
  const displayedBio = shouldTruncate && !isExpanded 
    ? `${bio.substring(0, maxLength)}...` 
    : bio;

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="body1">
        {displayedBio}
      </Typography>
      {shouldTruncate && (
        <Button 
          onClick={() => setIsExpanded(!isExpanded)}
          sx={{ mt: 1 }}
        >
          {isExpanded ? 'Show Less' : 'Read More'}
        </Button>
      )}
    </Box>
  );
};

export default BioComponent;

