import React from 'react';
import { render, screen, within, fireEvent, cleanup } from
'@testing-library/react'; import '@testing-library/jest-dom/extend-expect';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

const testIds = {
  restartButton: "button-restart",
  prevButton: "button-prev",
  nextButton: "button-next",
  title: "title",
  text: "text",
  };
  const makeSlides = (numSlides) => Array.from({length: 10}, (_, idx) => ({
  title: `title ${idx}`, text: `text ${idx}` }));
  const renderApp = (slides) => render(<App slides={slides} />);
  beforeEach(() => {
  });
  afterEach(() => {
  cleanup();
  });
  test('App renders correctly', () => {
  const slides = makeSlides(2);
  const { getByTestId } = renderApp(slides);
  const restartButton = screen.getByTestId(testIds.restartButton);
  expect(restartButton).toHaveTextContent("Restart");
  expect(restartButton).toBeDisabled();
  const prevButton = within(screen.getByTestId(testIds.prevButton));
  expect(prevButton).toHaveTextContent("Prev");
  expect(prevButton).toBeDisabled();
  const nextButton = within(screen.getByTestId(testIds.nextButton));
  expect(nextButton).toHaveTextContent("Next");
  expect(nextButton).toBeEnabled();
  const titleElem = within(screen.getByTestId(testIds.title));
  expect(titleElem).toHaveTextContent(slides[0].title);
  const textElem = within(screen.getByTestId(testIds.text));
  expect(textElem).toHaveTextContent(slides[0].text);
  });
  test('Switching between slides works as expected', () =>
  { const slides = makeSlides(5);
  const { getByTestId } = renderApp(slides);
  const restartButton = within(screen.getByTestId(testIds.restartButton));
  const prevButton = within(screen.getByTestId(testIds.prevButton)); const
  nextButton = within(screen.getByTestId(testIds.nextButton)); const
  titleElem = within(screen.getByTestId(testIds.title));
  const textElem = within(screen.getByTestId(testIds.text));
  const clicks = [
  'next', 'next', 'next', 'prev', 'prev', 'prev', 'next', 'next',
  'restart', 'next', 'next', 'next', 'next', 'prev',
  ];
  let idx = 0;
  for (const click of clicks) {
  if (click === 'restart') {
  fireEvent.click(restartButton);
  idx = 0;
  } else if (click === 'prev') {
  fireEvent.click(prevButton);
  idx -= 1;
  } else if (click === 'next') {
  fireEvent.click(nextButton);
  idx += 1;
  }
  expect(idx >= 0).toEqual(true);
  expect(idx < slides.length).toEqual(true);
  if (idx > 0) {
  expect(restartButton).toBeEnabled();
  expect(prevButton).toBeEnabled(); } else
  {
  expect(restartButton).toBeDisabled();
  expect(prevButton).toBeDisabled(); }
  if (idx+1 < slides.length) {
  expect(nextButton).toBeEnabled(); }
  else {
  expect(nextButton).toBeDisabled(); }
  const { title, text } = slides[idx];
  expect(titleElem).toHaveTextContent(title);
  expect(textElem).toHaveTextContent(text); }
  });
