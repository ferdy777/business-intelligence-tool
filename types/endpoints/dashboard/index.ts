/* eslint-disable @typescript-eslint/no-namespace */
import { General } from "../general";

export namespace Dashboard {
  export namespace GetAnalytics {
    interface ChartData {
      name: string;
      value: number;
    }

    interface SalesTable {
      name: string;
      email: string;
      sales: number;
    }

    export interface Response extends General.SuccessResponse {
      data: {
        cards: {
          totalUsers: number;
          activeSessions: number;
          salesRevenue: number;
        };
        salesChart: ChartData[];
        growthChart: ChartData[];
        categoryChart: ChartData[];
        salesTable: SalesTable[];
      };
    }
  }
}
