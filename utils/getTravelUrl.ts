interface GoogleTravelParams {
    /**
     * The name of the hotel to search for.
     */
    hotelName: string;

    /**
     * Language code for the search results (default is 'en-BR' for English, Brazil).
     */
    lang?: string;

    /**
     * Geographic location code for the search (default is 'br' for Brazil).
     */
    geo?: string;

    /**
     * Specific setting for the search (default is 1).
     */
    ssta?: number;

    /**
     * Timestamp or unique identifier for tracking purposes (optional).
     */
    ts?: string;

    /**
     * Query string for internal tracking or session management (optional).
     */
    qs?: string;

    /**
     * Application parameter for additional settings or features (optional).
     */
    ap?: string;

    /**
     * Context parameter that may influence the search results (default is 1).
     */
    ictx?: number;

    /**
     * Tracking or session management parameter used by Google (optional).
     */
    ved?: string;
}

export function generateGoogleTravelUrl(params: GoogleTravelParams): string {
    /**
     * Generate a Google Travel search URL with customizable parameters.
     *
     * @param params - An object containing the parameters for the URL.
     * @returns A fully constructed Google Travel URL.
     */

    // Base URL
    const baseUrl = "https://www.google.com/travel/search";

    // Destructure parameters with defaults
    const {
        hotelName,
        lang = 'en-BR',
        geo = 'br',
        ssta = 1,
        ts,
        qs,
        ap,
        ictx = 1,
        ved
    } = params;

    // URL parameters
    const urlParams: { [key: string]: string | number | undefined } = {
        q: encodeURIComponent(hotelName),
        hl: lang,
        gl: geo,
        ssta: ssta,
        ts: ts,
        qs: qs,
        ap: ap,
        ictx: ictx,
        ved: ved
    };

    // Remove parameters that are undefined
    const filteredParams = Object.entries(urlParams)
        .filter(([_, v]) => v !== undefined)
        .map(([k, v]) => `${k}=${v}`)
        .join('&');

    // Construct final URL
    const url = `${baseUrl}?${filteredParams}`;

    return url;
}
