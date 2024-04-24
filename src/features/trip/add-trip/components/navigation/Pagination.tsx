import { ArrowBack, ArrowForward } from '@mui/icons-material';
import MobileStepper from '@mui/material/MobileStepper';

import AppButton from '@features/ui/AppButton';
import { useBreakpoints } from '@hooks/useBreakpoints';

import { WIZARD_STEPS } from '../../data';

export default function Pagination() {
  const currentStep = 0;
  const { md, lg } = useBreakpoints();
  
  return (
    <MobileStepper
      variant={lg ? 'dots' : 'text'}
      position="static"
      activeStep={currentStep}
      steps={WIZARD_STEPS.length}
      nextButton={
        <AppButton type="submit" fullWidth={!md} endIcon={<ArrowForward />}>
          Next
        </AppButton>
      }
      backButton={
        <AppButton
          fullWidth={!md}
          variant="outlined"
          startIcon={<ArrowBack />}
          sx={{ visibility: currentStep === 0 ? 'hidden' : 'visible' }}
        >
          Back
        </AppButton>
      }
      sx={{
        '.MuiMobileStepper-dots': {
          visibility: 'hidden',
        },
        display: 'flex',
        whiteSpace: 'nowrap',
        position: 'absolute',
        gap: 2,
        width: '100%',
        bottom: 0,
        left: 0,
        borderRadius: 4,
        padding: { xs: 2, md: 3 },
      }}
    />
  );
}
