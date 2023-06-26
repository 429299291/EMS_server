import { DashboardService } from './dashboard.service';
export declare class DashboardController {
    private dashboardService;
    constructor(dashboardService: DashboardService);
    getDashboard(): any;
    addDashboard(body: any): any;
    getDashboardById(req: any): any;
}
