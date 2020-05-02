export default {
    API: {
        NAME: 'Micro-Servicio Punto de Venta | NodeJS',
        PORT: 5000,
        ENVIRONMENT: 'Development'
    },
    NOTIFY: {
        DELAY: 1000 * 10        // 10 Segundos
    },
    TOKEN: {
        SECRET_KEY: 'starcraft2',
        EXPIRES: '120s'    // 2 Minutos
    },
    MONGODB: {
        HOST: '192.168.211.131',
        PORT: 39018,
        USER_NAME: 'dbo-operador',
        USER_PASSWORD: 'operador123',
        DEFAULT_DATABASE: 'dbMTWDM'
    }
};