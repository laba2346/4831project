var config = {
    production: {
        cn: {
            host: 'ec2-54-235-193-34.compute-1.amazonaws.com',
            port: 5432,
            database: 'dbkt5tfgdagmv7',
            user: 'fhttwaphawybpt',
            password: 'd888c67b12c6aaf6f7bcd61926302aa6d1b882d1a068adfb5419ec9da650b8f4'
        }
    },
    default: {
        cn: {
            host: 'localhost',
            port: 5432,
            database: 'landon',
            user: '',
            password: ''
        }
    }
}

exports.get = function get(env) {
    return config[env] || config.default;
}
