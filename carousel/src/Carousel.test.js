import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Carousel from "./Carousel";
import TEST_IMAGES from "./_testCommon.js";

it("renders without crashing", function() {
  render(
    <Carousel 
      photos={TEST_IMAGES}
      title="images for testing"
    />);
});

it("matches snapshot", function() {
  const { asFragment } = render(
    <Carousel 
      photos={TEST_IMAGES}
      title="images for testing"
    />);
  expect(asFragment()).toMatchSnapshot();
});

it("works when you click on the right arrow", function() {
  const { container } = render(
    <Carousel
      photos={TEST_IMAGES}
      title="images for testing"
    />
  );
  // expect the first image to show, but not the second
  expect(
    container.querySelector('img[alt="testing image 1"]')
  ).toBeInTheDocument();
  expect(
    container.querySelector('img[alt="testing image 2"]')
  ).not.toBeInTheDocument();

  // move forward in the carousel
  const rightArrow = container.querySelector(".bi-arrow-right-circle");
  fireEvent.click(rightArrow);

  // expect the second image to show, but not the first
  expect(
    container.querySelector('img[alt="testing image 1"]')
  ).not.toBeInTheDocument();
  expect(
    container.querySelector('img[alt="testing image 2"]')
  ).toBeInTheDocument();
});

test('clicking left arrow on second image moves to first image', () => {
  const { container } = render(
    <Carousel
      photos={TEST_IMAGES}
      title="images for testing"
    />
  );
  const rightArrow = container.querySelector(".bi-arrow-right-circle");
  const firstImage = container.querySelector('img[alt="testing image 1"]');

  // Click right arrow once to move to the second image
  fireEvent.click(rightArrow);

  // Click left arrow to move back
  fireEvent.click(container.querySelector(".bi-arrow-left-circle"));

  // Check if the first image is active
  expect(firstImage).toBeInTheDocument();
});


test('left arrow is missing on first image', () => {
  const { container } = render(
    <Carousel
      photos={TEST_IMAGES}
      title="images for testing"
    />
  );
  const leftArrow = container.querySelector('.bi-arrow-left-circle');

  // Check if left arrow is missing
  expect(leftArrow).toBeNull();
});

test('right arrow is missing on last image', () => {
  const { container } = render(
    <Carousel
      photos={TEST_IMAGES}
      title="images for testing"
    />
  );
  const rightArrow = container.querySelector('.bi-arrow-right-circle');

  // Click right arrow until the last image
  while (container.querySelector('.bi-arrow-left-circle')) {
    fireEvent.click(rightArrow);
  }

  // Check if right arrow is missing
  expect(container.querySelector('.bi-arrow-left-circle')).toBeNull();
});