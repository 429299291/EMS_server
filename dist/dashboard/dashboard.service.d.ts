import { Repository } from 'typeorm';
import { Dashboard } from './entities/ entities';
export declare class DashboardService {
    private readonly Dashboard;
    constructor(Dashboard: Repository<Dashboard>);
    getDashboard(): void;
    addDashboard(): Promise<Dashboard>;
    getDashboardById(id: number): {
        name: string;
        id: number;
    };
}
