var $$BLOCALE_DEFAULT: string = "en-US";
var $$BLOCALE_SUPPORTED: string[] = [];
var $$BLOCALE = function (): string {

    if (typeof window === 'undefined' || typeof window.navigator === 'undefined') {
        return $$BLOCALE_DEFAULT;
    }

    let locale: string = window.navigator["languages"] ? window.navigator["languages"][0] : undefined;
    locale = locale || window.navigator.language || window.navigator["browserLanguage"] || window.navigator["userLanguage"];

    if (locale) {

        locale = locale.toLowerCase();

        let bestLocale: string;

        for (let supported of $$BLOCALE_SUPPORTED) {
            supported = supported.toLowerCase();
            let r = supported == locale ? 100 : 0;
            if (supported == locale) {
                return supported;
            } else if (!bestLocale && (supported.indexOf(locale) === 0 || locale.indexOf(supported) === 0)) {
                bestLocale = supported;
            }
        }

        locale = bestLocale;
    }
    
    if (!locale) {
        $$BLOCALE_DEFAULT;
    }

    return locale;
}();
