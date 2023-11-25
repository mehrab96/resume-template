'use client';
import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';
import { PropsWithChildren } from 'react';

const Providers = ({ children }: PropsWithChildren) => {
  return (
    <>
      {children}
      <ProgressBar
        height="4px"
        color="#41729F"
        options={{ showSpinner: true }}
        shallowRouting
      />
    </>
  );
};

export default Providers;