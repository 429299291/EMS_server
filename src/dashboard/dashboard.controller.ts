import { Controller, Get,Post,Request,Query,Body,Headers,Param } from '@nestjs/common';
import {DashboardService} from './dashboard.service'
@Controller('dashboard')
export class DashboardController {
    constructor(private dashboardService:DashboardService){}
    @Get('/add')
    getDashboard():any{        
        return this.dashboardService.addDashboard()
    }

    // @Get()
    // getDashboard():any{        
    //     return this.dashboardService.getDashboard()
    // }

    // @Post("/add")
    // addDashboard(@Body() body):any{
    //     return this.dashboardService.addDashboard()
    // }
    // @Get("/getDashboardById")
    // getDashboardById(@Request() req,@Headers() header):any{
    //     console.log(header);
    //     let id:number = parseInt(req.query.id)
    //     return this.dashboardService.getDashboardById(id)
    // }
}
