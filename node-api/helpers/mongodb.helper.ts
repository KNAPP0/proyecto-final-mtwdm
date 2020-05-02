import { MongoClient } from 'mongodb';
import { DEBUG, COLOR } from '../utils/debug'

const debug = DEBUG();
const color = COLOR();

export default class MongoDB {
    public db: any;
    private cnn: any;
    private port: number;
    private dbUri: string;
    private static _instance: MongoDB;

    constructor(CONFIG: any) {
        this.port = CONFIG.MONGODB.PORT;
        if (CONFIG.MONGODB.USER_NAME != '') {
            this.dbUri = `mongodb://${CONFIG.MONGODB.USER_NAME}:${encodeURIComponent(CONFIG.MONGODB.USER_PASSWORD)}@${CONFIG.MONGODB.HOST}:${CONFIG.MONGODB.PORT}/${CONFIG.MONGODB.DEFAULT_DATABASE}`;
            //${ encodeURIComponent(CONFIG.MONGODB.USER_PASSWORD)} para passwords con carateres especiales
        }
        else {
            this.dbUri = `mongodb://${CONFIG.MONGODB.HOST}:${CONFIG.MONGODB.PORT}/${CONFIG.MONGODB.DEFAULT_DATABASE}`;
        }
    }
    public static getInstance(CONFIG: any) {
        return this._instance || (this._instance = new this(CONFIG));
    }
    async connect() {
        console.log(this.dbUri);
        try {
            await MongoClient.connect(this.dbUri, { useNewUrlParser: true, useUnifiedTopology: true })
                .then((connection) => {
                    //console.log(`Conectado a MongoDB en el puerto ${this.port}`);
                    debug.mongoDB(`El servidor ${color.mongoDB('MongoDB')} se inicio ${color.warning('correctamente')} en el puerto ${color.info(this.port)}`);
                    this.cnn = connection;
                    this.db = this.cnn.db();
                })
                .catch((err) => {
                    console.log('Ocurrió un error al intentar conectarse a MongoDB', err);
                });
        } catch (e) {
            console.log('Catch an error', e);
        }


    }
    setDataBase(dbName: string) {
        this.db = this.cnn.db(dbName);
    }
}