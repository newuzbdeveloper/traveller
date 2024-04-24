import { ArrowBack, ArrowForward } from '@mui/icons-material';
import MobileStepper from '@mui/material/MobileStepper';

import AppButton from '@features/ui/AppButton';

import { WIZARD_STEPS } from '../../data';

export default function Pagination() {
  const currentStep = 0;

  return (
    <MobileStepper
      variant="text"
      position="static"
      activeStep={currentStep}
      steps={WIZARD_STEPS.length}
      nextButton={
        <AppButton type="submit" endIcon={<ArrowForward />}>
          Next
        </AppButton>
      }
      backButton={
        <AppButton
          variant="outlined"
          startIcon={<ArrowBack />}
          sx={{ visibility: currentStep === 0 ? 'hidden' : 'visible' }}
        >
          Back
        </AppButton>
      }
      sx={{
        position: 'absolute',
        width: '100%',
        bottom: 0,
        left: 0,
        borderRadius: 4,
        padding: { xs: 2, md: 3 },
      }}
    />
  );
}
