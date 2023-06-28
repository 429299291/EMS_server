import { Injectable } from '@nestjs/common';
import {Repository} from 'typeorm'
import {InjectRepository} from '@nestjs/typeorm'
import { Dashboard } from './entities/ entities';

@Injectable()
export class DashboardService {
    constructor(@InjectRepository(Dashboard) private readonly Dashboard:Repository<Dashboard>){
        
    }
    getDashboard(){

    }
    addDashboard(){
        const data = new Dashboard()
        data.name = "nest davis"
        data.age=22
        console.log(this.Dashboard);
        
        return this.Dashboard.save(data)
    }
    getDashboardById(id:number){
        let dashboard:any ={}
        return{
            name:'davis1',
            id:id
        }
    }
}
