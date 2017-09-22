var INTL_LOCALE = function () {
    if (typeof window === "undefined" || typeof window.navigator === "undefined") {
        return INTL_DEFAULT_LOCALE;
    }
    var browserLocale = window.navigator["languages"] ? window.navigator["languages"][0] : undefined;
    browserLocale = browserLocale || window.navigator.language || window.navigator["browserLanguage"] || window.navigator["userLanguage"];
    browserLocale = browserLocale ? browserLocale.toLowerCase() : undefined;
    var queryLocaleMatch = new RegExp('[?&]' + INTL_LOCALE_URL_PARAM + '=([^&]*)').exec(window.location.search);
    var queryLocale = queryLocaleMatch && decodeURIComponent(queryLocaleMatch[1].replace(/\+/g, ' ')).toLowerCase();
    var bestLocale;
    if (browserLocale || queryLocale) {
        var bestLocaleRanking = void 0;
        var supported = INTL_SUPPORTED_LOCALE;
        for (var _i = 0, _a = (typeof supported == "string" ? supported.split(",") : supported); _i < _a.length; _i++) {
            var l = _a[_i];
            var s = l.toLowerCase();
            if (s == queryLocale) {
                return l;
            }
            else if (s == browserLocale) {
                bestLocale = l;
                bestLocaleRanking = 20;
            }
            else if (queryLocale && (!bestLocale || bestLocaleRanking < 30) && (s.indexOf(queryLocale) === 0 || queryLocale.indexOf(s) === 0)) {
                bestLocale = l;
                bestLocaleRanking = 30;
            }
            else if (browserLocale && (!bestLocale || bestLocaleRanking < 10) && (s.indexOf(browserLocale) === 0 || browserLocale.indexOf(s) === 0)) {
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
