import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import LandingPage from '../../../views/LandingPage/LandingPage';

test('Landing Page testing ', () => {
  render(
    <BrowserRouter>
      <LandingPage />
    </BrowserRouter>
  );

  const landingpageId = screen.getByTestId("LandingPageID");
  expect(landingpageId).toBeInTheDocument();
});
