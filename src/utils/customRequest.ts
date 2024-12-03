import { JwtPayload} from '../models/user.model'
import { Request } from 'express'
export interface CustomRequest extends Request {
    currentUser?: JwtPayload,
}