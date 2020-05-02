import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { APIUtils, APIStatusEnum } from '../utils/api.utils'
//import ENV from '../enviroments/env.production'

export default (CONFIG: any) => {
    const apiUtils = APIUtils(CONFIG)
    return {
        verify: (req: Request, res: Response, next: NextFunction) => {
            const bearerHeader = req.headers['authorization']
            if (typeof bearerHeader !== 'undefined') {
                const bearer = bearerHeader.split(' ')
                const bearertoken = bearer[1]

                jwt.verify(bearertoken, CONFIG.TOKEN.SECRET_KEY, (err: any, tokenDecoded: any) => {
                    if (err) {
                        return res.status(APIStatusEnum.Forbiden).json(
                            apiUtils.BodyResponse(
                                APIStatusEnum.Forbiden,
                                //Descripción
                                'Acceso Prohibido al verificar el Token (Middleware TOKENs)',
                                //Mensaje
                                'El Token proporcionado, no es un Token Válido. Favor de Verificar',
                                //Result
                                {},
                                //Error
                                err,
                            )
                        )
                    }
                    req.body.authUser = tokenDecoded;
                    next()
                })
            }
            else {
                // Unautorized
                return res.status(APIStatusEnum.Unauthorized).json(
                    apiUtils.BodyResponse(
                        APIStatusEnum.Unauthorized,
                        //Descripción
                        'Acceso NO autorizado (Middleware TOKENs)',
                        //Mensaje
                        'Necesita proporcionar un Token para acceder a la solicitud',
                        //Result
                        {},
                        //Error
                        {}
                    )
                )
            }
        }
    }
}