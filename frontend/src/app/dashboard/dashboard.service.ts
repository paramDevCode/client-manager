import { inject, Injectable } from '@angular/core';
import{HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';
import { environment } from '../../environments/environments';  
import{DashboardStats} from '../dashboard/models/dashoard-model'
@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private apiUrl = environment.apiUrl
   constructor(private http:HttpClient) { }

   getDashboardStatus():Observable<DashboardStats>{
    return this.http.get<DashboardStats>(`${this.apiUrl}/dashboard/stats`)
   }
}
