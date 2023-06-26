export declare class DashboardService {
    getDashboard(): {
        code: number;
        data: string;
    };
    addDashboard(): {
        code: number;
        data: {
            name: string;
            age: number;
        };
        msg: string;
    };
    getDashboardById(id: number): {
        name: string;
        id: number;
    };
}
