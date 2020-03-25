/**
 * Used for handling errors in fetch requests
 * @param res Fetch API response
 */
export const handleFetchErrors = (res: Response) => {
    if (!res.ok) {
        // throw new Error(res.statusText);
        throw res;
    }
    return res.json();
}
