/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Button from "../Button";
describe("Check if Button works properly", () => {
    test("Check if the button is rendered", () => {
        const { getByTestId } = render(<Button text="Click" />);
        const element = getByTestId("btn-test-id");
        expect(element).toBeTruthy();
    });
    test("Check if the button text is rendered", () => {
        const text = "Click";
        const { getByText } = render(<Button text={text} />);
        const element = getByText(text);
        expect(element.textContent).toBe(text);
    });

    test("check if onclick is triggered", () => {
        const onClick = jest.fn();
        const { getByTestId } = render(<Button onClickHandler={onClick} />);
        const element = getByTestId("btn-test-id");
        fireEvent.click(element);

        expect(onClick).toHaveBeenCalledTimes(1);
    });

    test("Check if snapshots are mapped properly", () => {
        const onClick = jest.fn();
        const text = "Click";
        const { asFragment } = render(<Button text={text} onClickHandler={onClick} />);
        expect(asFragment()).toMatchSnapshot()
        
    });
});
