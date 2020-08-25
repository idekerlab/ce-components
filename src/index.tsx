import React, { FC, HTMLAttributes, ReactChild } from 'react';

export interface Props extends HTMLAttributes<HTMLDivElement> {
  children?: ReactChild;
}

// Please do not use types off of a default export module or else Storybook Docs will suffer.
// see: https://github.com/storybookjs/storybook/issues/9556
export const Thing: FC<Props> = ({ children }) => {
  return <div>{children || `the snozzberries taste like snozzberries`}</div>;
};

export { default as OpenInCytoscapeButton } from './OpenInCytoscapeButton';
export * from './OpenInCytoscapeButton';

export { default as NDExSignInButton } from './NDExSignIn';
export * from './NDExSignIn';

export { default as SaveToNDExButton } from './SaveToNDExButton';
export * from './SaveToNDExButton';

export { CyNDExProvider } from './CyNDExContext';
export { NDExAccountProvider } from './NDExAccountContext';