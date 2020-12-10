import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: Http ) {}
  getAllPeople() {
    return this.http.get('https://swapi.dev/api/people/', {})
  }
  getDetailPeople(url: string) {
    return this.http.get(url, {})
  }
}