import React from 'react';
import { Container } from './GlobalStyles';
import { DNDList } from './DNDList';

export const App: React.FC = () => {
  return (
    <Container>
      <DNDList />
    </Container>
  );
};
