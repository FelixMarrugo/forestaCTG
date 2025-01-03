import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor() { }
  public title!: string;

  set(title:string){
    this.title = title
  }

  get(): string{
    return this.title
  }
}
