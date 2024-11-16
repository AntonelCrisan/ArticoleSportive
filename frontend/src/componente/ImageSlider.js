import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';

const imagini = [
  {
    src: 'https://gymbeam.ro/media/catalog/product/cache/bf5a31e851f50f3ed6850cbbf183db11/w/o/women_s_limitless_high-waist_leggings_black_-_gymbeam-1.jpg',
    descriere: 'Reduceri de sezon',
  },
  {
    src: 'https://gymbeam.ro/media/catalog/product/cache/bf5a31e851f50f3ed6850cbbf183db11/s/h/shaker_black_gymbeam.jpg',
    descriere: 'Hidratare',
  },
  {
    src: 'https://gymbeam.ro/media/catalog/product/cache/bf5a31e851f50f3ed6850cbbf183db11/y/o/yoga-mat-baby-pink-beastpink_3_.jpg',
    descriere: 'Echipament sportiv',
  },
  {
    src: 'https://gymbeam.ro/media/catalog/product/cache/bf5a31e851f50f3ed6850cbbf183db11/c/o/compression-t-shirt-hg-armour-comp-ls-white-under-armour_4_.png',
    descriere: 'Promoții speciale',
  },
  {
    src: 'https://gymbeam.ro/media/catalog/product/cache/bf5a31e851f50f3ed6850cbbf183db11/c/r/cropped-t-shirt-serenity-beastpink-olivine-1.jpg',
    descriere: 'Lansare produse noi',
  },
];

const ImageSlider = () => {
  const [indexCurent, setIndexCurent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndexCurent((indexCurent + 1) % imagini.length);
    }, 5000);

    return () => clearInterval(interval); // Curăță intervalul la demontare componentă
  }, [indexCurent]);

  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        maxWidth: '100%',
        height: { xs: '300px', md: '400px' }, // Mai înalt pentru desktop, mai mic pentru mobile
        margin: '16px auto',
        overflow: 'hidden',
        borderRadius: '10px',
      }}
    >
      <img
        src={imagini[indexCurent].src}
        alt={`Slider ${indexCurent}`}
        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
      />
      <Typography
        variant="h4"
        sx={{
          position: 'absolute',
          bottom: '30px',
          left: '50px',
          color: '#fff',
          backgroundColor: 'rgba(0, 0, 0, 0.6)',
          padding: '10px 20px',
          borderRadius: '5px',
        }}
      >
        {imagini[indexCurent].descriere}
      </Typography>
    </Box>
  );
};

export default ImageSlider;
