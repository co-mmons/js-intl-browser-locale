declare var INTL_DEFAULT_LOCALE: string;
declare var INTL_SUPPORTED_LOCALE: string[] | string;
declare var INTL_LOCALE_URL_PARAM: string;

var INTL_LOCALE = function (): string {

    if (typeof window === "undefined" || typeof window.navigator === "undefined") {
        return INTL_DEFAULT_LOCALE;
    }

    let browserLocale: string = window.navigator["languages"] ? window.navigator["languages"][0] : undefined;
    browserLocale = browserLocale || window.navigator.language || window.navigator["browserLanguage"] || window.navigator["userLanguage"];
    browserLocale = browserLocale ? browserLocale.toLowerCase() : undefined;

    let queryLocaleMatch = new RegExp('[?&]' + INTL_LOCALE_URL_PARAM + '=([^&]*)').exec(window.location.search);
    let queryLocale = queryLocaleMatch && decodeURIComponent(queryLocaleMatch[1].replace(/\+/g, ' ')).toLowerCase();

    let bestLocale: string;

    if (browserLocale || queryLocale) {

        let bestLocaleRanking: number;
        let supported = INTL_SUPPORTED_LOCALE;

        for (let l of (typeof supported == "string" ? supported.split(",") : supported)) {
            let s = l.toLowerCase();

            if (s == queryLocale) {
                return l;

            } else if (s == browserLocale) {
                bestLocale = l;
                bestLocaleRanking = 20;

            } else if (queryLocale && (!bestLocale || bestLocaleRanking < 30) && (s.indexOf(queryLocale) === 0 || queryLocale.indexOf(s) === 0)) {
                bestLocale = l;
                bestLocaleRanking = 30;
                
            } else if (browserLocale && (!bestLocale || bestLocaleRanking < 10) && (s.indexOf(browserLocale) === 0 || browserLocale.indexOf(s) === 0)) {
                bestLocale = l;
                bestLocaleRanking = 10;
            }
        }
    }
    
    if (!bestLocale) {
        return INTL_DEFAULT_LOCALE;
    }

    return bestLocale;
}();
