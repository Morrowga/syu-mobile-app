import React, { useState } from 'react';
import { Image, ActivityIndicator } from 'react-native';
import { Box } from 'native-base';

const LazyLoadImage = ({ source, alt, width = '100%', height = '100%'}) => {
  const [loading, setLoading] = useState(true);

  const handleLoadStart = () => {
    setLoading(true);
  };

  const handleLoadEnd = () => {
    setLoading(false);
  };

  return (
    <Box>
        <Image
            source={{ uri: source }}
            alt={alt}
            onLoadStart={handleLoadStart}
            onLoadEnd={handleLoadEnd}
            style={{ width: width, height: height }}
        />
        {loading && (
            <Box
            position="absolute"
            top={0}
            left={0}
            right={0}
            bottom={0}
            justifyContent="center"
            alignItems="center"
            backgroundColor="rgba(255, 255, 255, 0.5)"
            >
            <ActivityIndicator size="large" color="#000" />
          </Box>
        )}
    </Box>
  );
};

export default LazyLoadImage;
