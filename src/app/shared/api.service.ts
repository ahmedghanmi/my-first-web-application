import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {map} from 'rxjs/operators'


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private _http:HttpClient) { }

//faire l'ajout
poststudent(data:any){

return this._http.post<any>("http://localhost:3000/posts",data).
pipe(map((res:any)=>{
  return res;
}))



}

getstudent(){

  return this._http.get<any>("http://localhost:3000/posts").
  pipe(map((res:any)=>{
    return res;

}))

}

//modification

updatestudent(data:any,id:number){
  return this._http.put("http://localhost:3000/posts/"+id,data).
  pipe(map((res:any)=>{
    return res ;
  }))

}
//suppression
deletestudent(id:number){

    return this._http.delete<any>("http://localhost:3000/posts/"+id).
    pipe(map((res:any)=>{
      return res ;
    }))


}




}
