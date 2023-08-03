
export const hasRTLCharacters = (text) => {
    // Regular expression to check for RTL characters (Arabic, Hebrew, etc.)
    const rtlRegex = /[\u0600-\u06FF\u0590-\u05FF]/;
    return rtlRegex.test(text);
};
