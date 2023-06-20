import { Component, OnInit  } from '@angular/core';
import { ApiService } from './api.service';

function foundIndex(arrayOfArrays:Array<Array<string | number>>, targetValue: number) {
    let fIndex = -1;
    let i = -1;
    targetValue = Number(targetValue)

    arrayOfArrays.forEach(subArray => {
        i++;
        subArray.forEach(element => {
            if (element === targetValue) {
                fIndex = i;
            }
        });
        if(fIndex !== -1){
            return -1;
        }
    })
    return fIndex;
}

@Component({
    selector: 'my-app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    providers: [ApiService]
})

export class AppComponent implements OnInit { 

    select1: number = 1;
    select2: number = 1;
    input1: number = 10;
    input2: number;
    rates: Array<Array<string | number>> = [["UAH", 1]];
    previousRate: Array<string | number> = this.rates[0]; 

    constructor(private apiService: ApiService) {}
    
    ngOnInit () {
        this.getDataFromApi();
    }

    getDataFromApi(): void {
        this.apiService.getData().subscribe(
          (response) => {
            console.log("response", response)
            response.forEach(element => {
                const currency = [element.cc, element.rate];
                this.rates.push(currency)                
            });
            console.log("rates", this.rates)

          },
          (error) => {
            console.error('An error occurred:', error);
          }
        );
      }


    newPreviousRate(value:number): void {
        let i = foundIndex(this.rates, value);
        this.previousRate = this.rates[i];
    }

    onSelected1(value:number): void {
        this.select1 = value;
        this.newPreviousRate(value)
        this.updateInput2()
    }
    onSelected2(value:number): void {
        this.select2 = value;
        this.newPreviousRate(value)
        this.updateInput1()
    }
    updateInput2() {
        this.input2 = parseFloat(((this.input1 * this.select1) / this.select2).toFixed(4));
    }
    updateInput1() {
        this.input1 = parseFloat(((this.input2 * this.select2) / this.select1).toFixed(4));
    }

}



