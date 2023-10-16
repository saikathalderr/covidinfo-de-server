import { Get, Route } from 'tsoa';
interface PingResponse {
    status: string;
}

@Route('ping')
export default class PingController {
    @Get('/')
    public async ping(): Promise<PingResponse> {
        return {
            status: 'Ok!',
        };
    }
}
