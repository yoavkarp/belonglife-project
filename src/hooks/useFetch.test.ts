import { renderHook, act } from "@testing-library/react";
import useFetch from "./useFetch";

beforeEach(() => {
    global.fetch = jest.fn();
});


describe("useFetch", () => {
    it("fetches the data from the url", async () => {

        const mockData = { name: "Yoav Karpassi" };
        (fetch as jest.Mock).mockResolvedValueOnce({
            json: async () => mockData,
        });

        const { result } = renderHook(() =>
            useFetch<{ name: string }>("")
        );

        expect(result.current).toEqual({
            data: null,
            error: null,
            isLoading: true,
        });

        expect(result.current.data).toBeNull();
        expect(result.current.error).toBeNull();
        expect(result.current.isLoading).toBe(true);

        // Wait for the hook to update
        await act(async () => { return null; });

        expect(result.current).toEqual({
            data: mockData,
            error: null,
            isLoading: false,
        });

    });

});
