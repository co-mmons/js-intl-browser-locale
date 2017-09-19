var $$BLOCALE_DEFAULT = "en-US";
var $$BLOCALE_SUPPORTED = [];
var $$BLOCALE = function () {
    if (typeof window === 'undefined' || typeof window.navigator === 'undefined') {
        return $$BLOCALE_DEFAULT;
    }
    var locale = window.navigator["languages"] ? window.navigator["languages"][0] : undefined;
    locale = locale || window.navigator.language || window.navigator["browserLanguage"] || window.navigator["userLanguage"];
    if (locale) {
        locale = locale.toLowerCase();
        var bestLocale = void 0;
        for (var _i = 0, $$BLOCALE_SUPPORTED_1 = $$BLOCALE_SUPPORTED; _i < $$BLOCALE_SUPPORTED_1.length; _i++) {
            var supported = $$BLOCALE_SUPPORTED_1[_i];
            supported = supported.toLowerCase();
            var r = supported == locale ? 100 : 0;
            if (supported == locale) {
                return supported;
            }
            else if (!bestLocale && (supported.indexOf(locale) === 0 || locale.indexOf(supported) === 0)) {
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
