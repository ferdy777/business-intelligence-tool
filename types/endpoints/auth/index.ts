/* eslint-disable @typescript-eslint/no-namespace */
import { General } from "../general";

export namespace Auth {
  export namespace Login {
    export interface Request {
      email: string;
      password: string;
    }

    export interface Response extends General.SuccessResponse {
      data: General.User;
    }
  }

  export namespace Register {
    export interface Request {
      fullName: string;
      email: string;
      password: string;
    }

    export type Response = General.SuccessResponse;
  }
}
