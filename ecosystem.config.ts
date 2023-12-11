module.exports = {
    apps: [
        {
            name: "resume",
            script: "./node_modules/.bin/next",
            args: "start -p " + (process.env.PORT || 3001),
            watch: false,
            autorestart: true,
            env: {
                COMMON_VARIABLE: true
            },
            env_production: {
                NODE_ENV: "production"
            },
            env_develpomemt: {
                NODE_ENV: "development"
            }
        },
    ],
};