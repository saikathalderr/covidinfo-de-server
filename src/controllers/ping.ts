import { Get, Route } from 'tsoa';
interface PingResponse {
    message: string;
}

@Route('ping')
export default class PingController {
    @Get('/')
    public async ping(): Promise<PingResponse> {
        return {
            message: 'Ok!',
        };
    }
}
