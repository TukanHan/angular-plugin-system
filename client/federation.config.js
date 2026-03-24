const {
    withNativeFederation,
    shareAll,
} = require('@angular-architects/native-federation/config');

module.exports = withNativeFederation({
    name: 'client',

    exposes: {
        './Component': './src/app/app.ts',
        'customer-detail-section':
            './src/app/features/customer-detail-section/customer-detail-section.ts',
        'dashboard-plugin':
            './src/app/features/dashboard-plugin/dashboard-plugin.ts',
    },

    shared: {
        ...shareAll({
            singleton: true,
            strictVersion: true,
            requiredVersion: 'auto',
        }),
    },

    skip: [
        'rxjs/ajax',
        'rxjs/fetch',
        'rxjs/testing',
        'rxjs/webSocket',
        // Add further packages you don't need at runtime
    ],

    // Please read our FAQ about sharing libs:
    // https://shorturl.at/jmzH0

    features: {
        // New feature for more performance and avoiding
        // issues with node libs. Comment this out to
        // get the traditional behavior:
        ignoreUnusedDeps: true,
    },
});
