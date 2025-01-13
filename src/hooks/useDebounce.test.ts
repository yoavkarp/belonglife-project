import useDebounce from "./useDebounce";
import { renderHook, act } from "@testing-library/react";

jest.useFakeTimers();

describe("useDebounce", () => {
    it("calls the callback after the specified timeout", () => {
        const callback = jest.fn();
        renderHook(({ deps, timeout }) =>
            useDebounce(callback, deps, timeout), {
            initialProps: { deps: [], timeout: 350 },
        });

        // Fast forward time
        act(() => {
            jest.advanceTimersByTime(350);
        });

        expect(callback).toHaveBeenCalled();
    });

    it("clears the timeout when dependencies change", () => {
        const callback = jest.fn();
        const { rerender } = renderHook(({ deps, timeout }) =>
            useDebounce(callback, deps, timeout), {
            initialProps: { deps: [1], timeout: 350 },
        }
        );

        // Change dependencies
        rerender({ deps: [2], timeout: 350 });

        // Fast forward time
        act(() => {
            jest.advanceTimersByTime(350);
        });

        expect(callback).toHaveBeenCalledTimes(1);
    });

    it("does not call the callback before the timeout", () => {
        const callback = jest.fn();
        renderHook(() => useDebounce(callback, [], 350));

        // Fast forward time less than timeout
        act(() => {
            jest.advanceTimersByTime(200);
        });

        expect(callback).not.toHaveBeenCalled();

        // Fast forward remaining time
        act(() => {
            jest.advanceTimersByTime(150);
        });

        expect(callback).toHaveBeenCalledTimes(1);
    });

    it("uses the updated timeout", () => {
        const callback = jest.fn();
        const { rerender } = renderHook(({ timeout }) =>
            useDebounce(callback, [], timeout), {
            initialProps: { timeout: 350 },
        });

        // Fast forward initial timeout
        act(() => {
            jest.advanceTimersByTime(350);
        });

        expect(callback).toHaveBeenCalledTimes(1);

        // Update the timeout
        rerender({ timeout: 500 });

        act(() => {
            jest.advanceTimersByTime(499);
        });

        expect(callback).toHaveBeenCalledTimes(1); // Still waiting for the new timeout

        act(() => {
            jest.advanceTimersByTime(1);
        });

        expect(callback).toHaveBeenCalledTimes(2);
    });
});
