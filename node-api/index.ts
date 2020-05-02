// Express Imports
import Express from 'express';
import { Request, Response } from 'express';
// Debug and Color Imports
import { DEBUG, COLOR } from './utils/debug';
// API Utils Import
import { APIUtils, APIStatusEnum } from './utils/api.utils';
//JsonWebTokens Import
import jwt from 'jsonwebtoken';
//Acceder a las variables de entorno
import ENV from './enviroments/env.production'
// jSON Web Token Middleware
import AuthToken from './middlewares/token.middleware'
const token = AuthToken(ENV)
//MongoDBHelper Import
import MongoDBCliente, { Code } from 'mongodb'
import MongoDBHelper from './helpers/mongodb.helper'

// Variables Declaration
const debug = DEBUG();
const color = COLOR();
const app = Express();
const apiUtils = APIUtils(ENV);
const mongodb = MongoDBHelper.getInstance(ENV);

app.use(Express.urlencoded({ extended: true }));
app.use(Express.json());

//cors
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    next();
});
// Routes
app.post('/login', (req: Request, res: Response) => {

    const { userName, password } = req.body;

    const mockUser = {
        fullName: 'Gustavo Knapp Rivera',
        userName: 'knapp',
        password: 'Perla02',
        email: 'gusi-123@hotmail.com'
    }

    console.log(req.body);

    console.log(mockUser);

    if (userName == mockUser.userName) {
        console.log('OK');
    }


    const mockRoles = ['Capture_Rol', 'Admon_Catalogs_Rol', 'Print_Rol']

    //validar usuario y contraseña
    if (userName == mockUser.userName && password == mockUser.password) {
        const payload = {
            fullName: mockUser.fullName,
            userName: mockUser.userName,
            email: mockUser.email,
            roles: mockRoles
        }

        //Generar el token para ese usuario
        jwt.sign(payload, ENV.TOKEN.SECRET_KEY, { expiresIn: ENV.TOKEN.EXPIRES }, (err, token) => {
            //Existe error  
            if (err) {
                return res.status(500).json(
                    apiUtils.BodyResponse(APIStatusEnum.Internal_Server_Error, 'Internal Server Error', 'Error al intentar crear el Token', null, err)
                )
            }
            //OK
            res.status(200).json(
                apiUtils.BodyResponse(
                    APIStatusEnum.Success, 'Ok', 'Token generado de forma correcta',
                    {
                        userName: mockUser.userName,
                        token
                    },
                    null
                )
            )
        })
    }
    else {
        res.status(403).json(
            apiUtils.BodyResponse(
                APIStatusEnum.Forbiden, 'La soliciutd fue legal, pero el servidor rehúsa responderla dado que el cliente no tiene los privilegios para realizarla',
                'Credenciales Invalidas. El usuario y/o constraseña no son válidos, favor de verificar',
                {
                    msg: 'Invalid Credentials'
                },
                null
            )
        )
    }
});

//todos
app.get('/products', async (req: Request, res: Response) => {

    const productos = await mongodb.db.collection('cars').find({}).toArray();
    res.status(200).json(
        apiUtils.BodyResponse(
            APIStatusEnum.Success, 'OK', 'La solicitud ha tenido éxito',
            {
                productos,
                authUser: req.body.authUser
            }
        )
    );
});

//por id
app.get('/product/:code', async (req: Request, res: Response) => {
    const { code } = req.params;
    //const _id = new MongoDBCliente.ObjectID(id);
    const productos = await mongodb.db.collection('cars').findOne({ 'codigo': code });
    //console.log('API-Productos: ', productos);
    res.status(200).json(
        productos
        // apiUtils.BodyResponse(
        //     APIStatusEnum.Success, 'OK', 'La solicitud ha tenido éxito',
        //     {
        //         productos,
        //         authUser: req.body.authUser
        //     }
        // )
    );
});

//const productos = await mongodb.db.collection('cars').find({ 'categoria': { '$regex': categoria, '$options': 'i' } }).toArray();

//por categoría
app.get('/products/category/:categoria', async (req: Request, res: Response) => {
    // const { categoria } = req.params;
    // const productos = await mongodb.db.collection('cars').find({ 'categoria': categoria }).toArray();
    const { categoria } = req.params;
    const productos = await mongodb.db.collection('cars').find({ 'categoria': { '$regex': categoria, '$options': 'i' } }).toArray();
    //const filter = productos.filter((item: any) => item.categoria == category || item.categoria.indexOf(category) >= 0);
    //console.log('API-Productos: ', productos);
    res.status(200).json(
        productos
        // apiUtils.BodyResponse(
        //     APIStatusEnum.Success, 'OK', 'La solicitud ha tenido éxito',
        //     {
        //         productos
        //         //authUser: req.body.authUser
        //     }
        // )
    );
});

//por criterio
app.get('/products/descripcion/:criterio', async (req: Request, res: Response) => {

    const { criterio } = req.params;

    const productos = await mongodb.db.collection('cars').find({ "descripcion": { $regex: criterio, $options: 'i' } }).toArray();
    //console.log('API-Productos: ', productos);
    res.status(200).json(
        productos
        // apiUtils.BodyResponse(
        //     APIStatusEnum.Success, 'OK', 'La solicitud ha tenido éxito',
        //     {
        //         productos,
        //         //authUser: req.body.authUser
        //     }
        // )
    );
});


// Start Express Server
app.listen(ENV.API.PORT, async () => {
    //conectando con MongoDB
    try {
        await mongodb.connect();
    } catch (error) {
        process.exit();
    }
    debug.express(`El servidor ${color.express('Express')} se inicio ${color.warning('correctamente')} en el puerto ${color.info(ENV.API.PORT)}`);
});