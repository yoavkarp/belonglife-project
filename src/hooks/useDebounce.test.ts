import useDebounce from "./useDebounce";
import { renderHook, act } from "@testing-library/react";

jest.useFakeTimers();

describe("useDebounce", () => {
    it("clears the timeout when dependencies change", () => {
        const callback = jest.fn();
        const { rerender } = renderHook(({ text, timeout }) =>
            useDebounce(callback, text, timeout), {
            initialProps: { text: "", timeout: 350 },
        }
        );

        // Change dependencies
        rerender({ text: "a", timeout: 350 });

        // Fast forward time
        act(() => {
            jest.advanceTimersByTime(400);
        });

        expect(callback).toHaveBeenCalledTimes(1);
    });

    it("does not call the callback before the timeout", () => {
        const callback = jest.fn();
        renderHook(() => useDebounce(callback, "", 350));

        // Fast forward time less than timeout
        act(() => {
            jest.advanceTimersByTime(100);
        });

        expect(callback).not.toHaveBeenCalled();
    });
});
