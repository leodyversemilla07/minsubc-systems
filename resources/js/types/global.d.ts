export {};

declare global {
    function route(
        name: string,
        params?: Record<string, string | number> | string | number,
        absolute?: boolean,
    ): string;
}