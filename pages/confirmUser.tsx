// lib
import * as React from 'react';

// components
import { Box, Typography } from '@mui/material';
import { LoadingButton } from 'reusable/loadingButton';
import { CommonPageLayout, SLOT_NAMES } from 'containers/CommonPageLayout';

// config
import { RealmApp } from 'config/realm';

// constants
import { centerVertically } from 'styles/styleObjects';

// types
import { GetServerSideProps } from 'next';

const ConfirmUser = ({ token, tokenId }: { token: string; tokenId: string }): JSX.Element => {
  const [state, setState] = React.useState<{
    loading: boolean;
    isConfirmed?: boolean;
    error?: string;
  }>({ loading: false });

  const onConfirm = React.useCallback(async () => {
    setState({ loading: true });
    try {
      await RealmApp.emailPasswordAuth.confirmUser({ token, tokenId });

      setState({ loading: false, isConfirmed: true });
    } catch (err: any) {
      setState({ loading: false, error: err?.error });
    }
  }, [token, tokenId]);

  return (
    <CommonPageLayout title="Verify Account">
      <CommonPageLayout.Slot name={SLOT_NAMES.MAIN}>
        <Box gap={2} {...centerVertically} mt={4} flexDirection="column">
          <LoadingButton
            loading={state.loading}
            variant="contained"
            sx={{ width: '200px' }}
            onClick={onConfirm}
          >
            Confirm User
          </LoadingButton>
          <Typography>
            {state.error ? `${state.error}. Please try again later` : null}
            {state.isConfirmed ? 'User Confirmed' : null}
            {!state.error && !state.isConfirmed
              ? 'Please Click this button to confirm your account'
              : null}
          </Typography>
        </Box>
      </CommonPageLayout.Slot>
    </CommonPageLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => ({
  props: { token: query.token, tokenId: query.tokenId },
});

export default ConfirmUser;
