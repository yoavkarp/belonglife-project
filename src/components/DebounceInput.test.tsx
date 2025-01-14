import { render, screen, fireEvent, act } from "@testing-library/react";
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
        act(() => {
            jest.advanceTimersByTime(200);
        })

        expect(onChange).not.toHaveBeenCalled();

        // Fast forward past the debounce delay
        act(() => {
            jest.advanceTimersByTime(100);
        })
        expect(onChange).toHaveBeenCalledTimes(1);
        expect(onChange).toHaveBeenCalledWith("abc");
    });

    it("does not call onChange if input is cleared before the delay", () => {
        const onChange = jest.fn();
        render(<DebounceInput onTimeout={onChange} delay={400} />);

        const input = screen.getByPlaceholderText("Search...");

        // Simulate typing and clearing the input quickly
        fireEvent.change(input, { target: { value: "text" } });
        fireEvent.change(input, { target: { value: "" } });

        // Fast forward time
        act(() => {
            jest.advanceTimersByTime(400);
        })
        expect(onChange).not.toHaveBeenCalled();
    });

});
