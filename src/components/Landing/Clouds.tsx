import { makeClouds } from '@/utils/clouds';
import React from 'react';
import Clouds from '../Clouds';

export const MakeClouds = ({
  cloudCount,
  mult,
}: {
  cloudCount: number;
  mult: number;
}) => {
  // Stable values keep the server HTML and hydrated styles identical.
  const value = (index: number, seed: number, min: number, max: number) => {
    const fraction = Math.abs(Math.sin((index + 1) * seed) * 10000) % 1;
    return (min + fraction * (max - min)).toFixed(3);
  };
  const cloudArray = makeClouds(cloudCount * mult);
  return (
    <>
      {cloudArray.map((i) => {
        return (
          <React.Fragment key={`cloud-${i}`}>
            <Clouds
              variant={3 + (i % 2)}
              roll={`${value(i, 7, 120, 300)}s`}
              top={`${value(i, 13, 12, 90)}vh`}
              pulse={`${value(i, 19, 7, 12)}s`}
              size={`${value(i, 23, 0.5, 7)}rem`}
              offset={`${value(i, 31, -10, 90)}vw`}
            />
          </React.Fragment>
        );
      })}
    </>
  );
};

