import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class Snack {
  constructor() { }

  public serverError = {
    type: 'error',
    message: 'Произошла ошибка запроса, попробуйте позже..',
    delay: 5000,
  };

  public taskSuccessUpdate = {
    type: 'success',
    message: 'Заявка обновлена',
    delay: 5000,
  };
}
