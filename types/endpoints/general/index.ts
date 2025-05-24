/* eslint-disable @typescript-eslint/no-namespace */

export namespace General {
  export interface SuccessResponse {
    success: boolean;
    message: string;
  }

  export interface User {
    id: string;
    name: string;
    email: string;
  }
}
