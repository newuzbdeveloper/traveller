import * as React from 'react';
import { useState } from 'react';

import CameraEnhanceIcon from '@mui/icons-material/CameraEnhance';
import ChecklistIcon from '@mui/icons-material/Checklist';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import ReceiptIcon from '@mui/icons-material/Receipt';
import { Box, Tab, Tabs } from '@mui/material';

import type { Trip } from '../../types';
import TripInfoAndPlaces from './TripInfoAndPlaces';

interface Props {
  trip: Trip;
  onTripUpdate: (data: Partial<Trip>) => void;
}

function CustomTabPanel({
  children,
  value,
  index,
}: {
  children?: React.ReactNode;
  index: number;
  value: number;
}) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`trip-edit-${index}`}
      aria-labelledby={`trip-edit-${index}`}
    >
      {children}
    </div>
  );
}

export default function TripTabs({ trip, onTripUpdate }: Props) {
  const [selectedTab, setselectedTab] = useState(0);

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setselectedTab(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Tabs
        value={selectedTab}
        onChange={handleTabChange}
        aria-label="Edit Trip Info Tabs."
        selectionFollowsFocus
        variant="scrollable"
        scrollButtons={false}
        sx={{ mb: { xs: 2, md: 3 } }}
      >
        <Tab
          id="trip-edit-1"
          label="Details"
          icon={<InfoOutlinedIcon />}
          iconPosition="start"
        />
        <Tab
          id="trip-edit-2"
          label="Documents"
          icon={<ReceiptIcon />}
          iconPosition="start"
        />
        <Tab
          id="trip-edit-3"
          label="Packing Lists"
          icon={<ChecklistIcon />}
          iconPosition="start"
        />
        <Tab
          id="trip-edit-4"
          label="Expenses"
          icon={<MonetizationOnIcon />}
          iconPosition="start"
        />
        <Tab
          id="trip-edit-5"
          label="Photos"
          icon={<CameraEnhanceIcon />}
          iconPosition="start"
        />
      </Tabs>
      <CustomTabPanel value={selectedTab} index={0}>
        <TripInfoAndPlaces trip={trip} onUpdate={onTripUpdate} />
      </CustomTabPanel>
      <CustomTabPanel value={selectedTab} index={1}>
        Item Two
      </CustomTabPanel>
      <CustomTabPanel value={selectedTab} index={2}>
        Item Three
      </CustomTabPanel>
      <CustomTabPanel value={selectedTab} index={3}>
        Item Three
      </CustomTabPanel>
      <CustomTabPanel value={selectedTab} index={4}>
        Item Three
      </CustomTabPanel>
    </Box>
  );
}
