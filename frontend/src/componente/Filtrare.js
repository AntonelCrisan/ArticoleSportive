import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';
import ListSubheader from '@mui/material/ListSubheader';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

export default function Filtrare() {
  const [open, setOpen] = useState(false);
  const [expandedCategory, setExpandedCategory] = useState(null);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const handleCategoryClick = (category) => {
    setExpandedCategory(expandedCategory === category ? null : category);
  };

  const categories = [
    {
      name: 'Haine pentru femei',
      subcategories: ['Tricouri', 'Hanorace', 'Pantaloni scurti', 'Pantaloni sport', 'Topuri & sutiene sport', 'Costum de inot', 'Sepci si palarii sport'],
    },
    {
      name: 'Haine pentru barbati',
      subcategories: ['Tricouri', 'Hanorace', 'Pantaloni scurti', 'Pantaloni sport', 'Haine functionale', 'Costum de inot', 'Sepci si palarii sport'],
    },
    {
        name: 'Antrenament acasa',
        subcategories: [''],
      },
    // Adaugă aici și alte categorii cu subcategorii
  ];

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation">
    <List
  component="nav"
  subheader={
    <ListSubheader
      component="div"
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      Filtrare produse
      <ArrowBackIosIcon
        onClick={toggleDrawer(false)}
        sx={{
          cursor: 'pointer',
          fontSize: 18,
          marginLeft: 'auto', 
        }}
      />
    </ListSubheader>
  }
>
        {categories.map((category) => (
          <React.Fragment key={category.name}>
            <ListItem disablePadding>
              <ListItemButton onClick={() => handleCategoryClick(category.name)}>
                <ListItemText primary={category.name} />
                {expandedCategory === category.name ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
            </ListItem>
            <Collapse in={expandedCategory === category.name} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {category.subcategories.map((sub, index) => (
                  <ListItemButton key={index} sx={{ pl: 4 }}>
                    <ListItemText primary={sub} />
                  </ListItemButton>
                ))}
              </List>
            </Collapse>
          </React.Fragment>
        ))}
      </List>
    </Box>
  );

  return (
    <div>
      <Button 
      onClick={toggleDrawer(true)}
      variant='contained'
      sx={{
        backgroundColor: '#257180',
        color: '#fff',
        fontSize: '0.75rem', // Font mai mic pentru buton
        marginTop: '2rem'
      }}
      >
        <FilterAltIcon />
        Filtreaza
      </Button>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </div>
  );
}
