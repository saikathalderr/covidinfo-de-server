interface PingResponse {
  message: string;
}

export default class PingController {
  public static async ping(): Promise<PingResponse> {
    return { message: "pong" };
  }
}
