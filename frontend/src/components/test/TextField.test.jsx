/* eslint-disable no-unused-vars */
import React from "react";
import { fireEvent, render } from "@testing-library/react";
import { TextField } from "../TextField";

/* eslint-disable no-undef */
describe("Check if Text field works properly", () => {
    test("Check if the text field is rendered", () => {
        const { getByTestId } = render(<TextField />);
        const element = getByTestId("text-field-test-id");
        const label = getByTestId("label-test-id");
        const input = getByTestId("input-test-id");

        expect(element).toBeTruthy();
        expect(label).toBeTruthy();
        expect(input).toBeTruthy();
    });

    test("Check if the text field input value is displayed properly", () => {
        const val = "val";
        const { getByTestId } = render(<TextField value={val} />);
        const inp = getByTestId("input-test-id");
        expect(inp.value).toBe(val);
    });

    test("Check if the text field label is displayed properly", () => {
        const label = "label";
        const { getByTestId } = render(<TextField label={label} />);
        const labelElement = getByTestId("label-test-id");
        expect(labelElement.textContent).toBe(label);
    });

    test("Check if the text field onChange is triggered", () => {
        let paramVal;
        const onChange = jest.fn((e) => {
            paramVal = e.target.value;
        });
        const { getByTestId } = render(<TextField onChange={onChange} />);
        const input = getByTestId("input-test-id");
        const onChangeVal = "changed";
        fireEvent.change(input, { target: { value: onChangeVal } });
        expect(onChange).toHaveBeenCalled();
        expect(paramVal).toBeTruthy();
        expect(paramVal).toBe(onChangeVal);
    });

    test("Check if snapshots are mapped properly", () => {
        const onChange = jest.fn();
        const label = "label";
        const val = "val";
        const { asFragment } = render(<TextField onChange={onChange} label={label} value={val} type="text" name="name" />);
        expect(asFragment()).toMatchSnapshot();
    });

    test("check if error message has been rendered", () => {
        const { getByText } = render(<TextField error="Error" />);
        const element = getByText("Error");
        expect(element.textContent).toBe("Error");
    });

    test("check if input is disabled on passing diabled flag", () => {
        const { getByTestId } = render(<TextField disabled />);
        const input = getByTestId("input-test-id");
        expect(input).toBeDisabled();
    });

    test("check if input type has bee assigned properly", () => {
        const type = "password";
        const { getByTestId } = render(<TextField type={type} />);
        const input = getByTestId("input-test-id");
        expect(input.type).toBeTruthy();
        expect(input.type).toBe(type);
    });
});
