import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';

const host = 'http://intravision-task.test01.intravision.ru';
const token = 'f2780be4-c840-4a25-bd39-314079d0cd18';

const options = {
  params: new HttpParams()
    .set('tenantguid', token)
};

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private httpClient: HttpClient) { }

  public getTasksList(): Observable<any> {
    return this.httpClient.get(`${host}/odata/tasks`, options);
  }

  public postTaskById(id): Observable<any> {
    return this.httpClient.get(`${host}/api/${token}/tasks/${id}`);
  }

  public postNewTask(data): Observable<any> {
    return this.httpClient.post(`${host}/api/${token}/tasks`, data);
  }
}
