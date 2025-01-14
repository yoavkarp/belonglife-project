import useDebounce from "./useDebounce";
import { renderHook, act } from "@testing-library/react";

jest.useFakeTimers();

describe("useDebounce", () => {
    it("clears the timeout when dependencies change", () => {
        const callback = jest.fn();
        const { rerender } = renderHook(({ query, timeout }) =>
            useDebounce(callback, query, timeout), {
            initialProps: { query: "", timeout: 350 },
        }
        );

        // Change dependencies
        rerender({ query: "a", timeout: 350 });

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

    it("does not call the callback if same query called before timeout", () => {
        const callback = jest.fn();
        const { rerender } = renderHook(({ query, timeout }) =>
            useDebounce(callback, query, timeout), {
            initialProps: { query: "", timeout: 350 },
        }
        );

        // Change dependencies
        rerender({ query: "a", timeout: 350 });

        // Fast forward time
        act(() => {
            jest.advanceTimersByTime(100);
        });

        rerender({ query: "", timeout: 350 });

        act(() => {
            jest.advanceTimersByTime(350);
        });

        expect(callback).not.toBeCalled();
    });
});
