import { ArrowBack, ArrowForward } from '@mui/icons-material';
import MobileStepper from '@mui/material/MobileStepper';

import AppButton from '@features/ui/AppButton';
import { useBreakpoints } from '@hooks/useBreakpoints';
import { useAppDispatch, useAppSelector } from '@store/index';

import { WIZARD_STEPS } from '../../data';
import { previousStep, selectCurrentStep } from '../../store/tripWizardSlice';

interface Props {
  isLoading?: boolean;
}
export default function Pagination({ isLoading }: Props) {
  const dispatch = useAppDispatch();
  const currentStep = useAppSelector(selectCurrentStep);
  const { md, lg } = useBreakpoints();

  const onClickButton = () => dispatch(previousStep());
  return (
    <MobileStepper
      variant={lg ? 'dots' : 'text'}
      position="static"
      activeStep={currentStep}
      steps={WIZARD_STEPS.length}
      nextButton={
        <AppButton
          type="submit"
          fullWidth={!md}
          loading={isLoading}
          endIcon={<ArrowForward />}
        >
          Next
        </AppButton>
      }
      backButton={
        <AppButton
          onClick={onClickButton}
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
