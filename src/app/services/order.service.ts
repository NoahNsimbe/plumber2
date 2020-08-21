import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, retry } from 'rxjs/operators';
import { throwError} from 'rxjs';
import { environment } from '../../environments/environment';
import {Order} from '../interfaces/order';
import {OrderModel} from '../models/order-model';

@Injectable({
  providedIn: 'root'
})
export class OrderService implements Order{

  constructor(private httpClient: HttpClient) { }

  private static handleError(error: HttpErrorResponse) {

    let response: any;
    if (error.error instanceof ErrorEvent) {
      response = error.error.message;
      console.error('An error occurred:', response);
    }

    else {

      if (error.status === 500){
        response = error.error;
      }
      else if (error.status === 400){
        response = error.error;
      }
      else{
        response = error.status;
      }
      console.error(
          `Backend returned code ${error.status}, ` +
          `body was: ${error.error}`);
    }
    // response = error.message;

    return throwError(response);
  }

  placeOrder(order: OrderModel) {

    return this.httpClient.post<any>(environment.orderApi, order)
        .pipe(
            retry(3),
            catchError(OrderService.handleError)
        );
  }

  cancelOrder(model: OrderModel) {
  }
}
