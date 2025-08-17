import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Footer from '../components/FooterComp/Footer';

test("Render Footer Component", () => {
  render(
    <BrowserRouter>
      <Footer />
    </BrowserRouter>
  );
  const FooterId = screen.getByTestId("FooterId");
  expect(FooterId).toBeInTheDocument();
});