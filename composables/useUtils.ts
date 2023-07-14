export const useUtils = () => {
    const log = (msg: string) => console.log(msg);
    return { log };
}