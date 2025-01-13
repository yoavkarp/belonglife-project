import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import DebounceInput from "./DebounceInput";

jest.useFakeTimers();

describe("DebounceInput", () => {
    it("calls only once after changes", () => {
        const onChange = jest.fn();
        render(<DebounceInput onTimeout={onChange} delay={300} />);

        const input = screen.getByPlaceholderText("Search...");

        // Simulate rapid typing
        fireEvent.change(input, { target: { value: "a" } });
        fireEvent.change(input, { target: { value: "ab" } });
        fireEvent.change(input, { target: { value: "abc" } });

        // Fast forward time (less than the debounce delay)
        jest.advanceTimersByTime(200);
        expect(onChange).not.toHaveBeenCalled();

        // Fast forward past the debounce delay
        jest.advanceTimersByTime(100);
        expect(onChange).toHaveBeenCalledTimes(1);
        expect(onChange).toHaveBeenCalledWith("abc");
    });
});
