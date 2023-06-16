import { Component, OnInit  } from '@angular/core';

// Функция принимает число currencyNum; забирает с АПИ json; Находит элемент(является объектом) массива по номеру currencyNum; отдает 2 значения из найденого объекта.
async function getCurrency(currencyNum: number) { 

    const response = await fetch('https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json'); 
    const data = await response.json(); 
    const result = data[currencyNum]; 
    return  [result.cc, result.rate];
} 

// Собирает инфу о нужных валютах и отдает их в виде массива.
async function getAllCurrency() {

    let currency = [["UAH", 1]];
    const cur1 = await getCurrency(24);
    currency.push(cur1);
    const cur2 = await getCurrency(31);
    currency.push(cur2);

    for (let i = 5; i < 17; i++) {
        const cur = await getCurrency(i);
        currency.push(cur);
    }

    return currency;
}

function foundIndex(arrayOfArrays:Array<any>, targetValue: number) {
    let fIndex = -1;
    targetValue = Number(targetValue)

    for (let i = 0; i < arrayOfArrays.length; i++) {
        const subArray = arrayOfArrays[i];
        
        for (let j = 0; j < subArray.length; j++) {
            const element = subArray[j];
          
            if (element === targetValue) {
                fIndex = i;
                break;
            }
        }
        
        if (fIndex !== -1) {
            break;
        }
    }
    return fIndex;
}


@Component({
    selector: 'my-app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit { 

    previousRate: Array<any> = ["UAH", 1];

    select1: number = 1;
    select2: number = 1;
    input1: number;
    input2: number;
    rates: Array<any> = [["UAH", 1]];

    ngOnInit () {
        (async () => {
          const data = await getAllCurrency();
            this.rates = data;
        })();
        
    }

    onSelected1(value:number): void {
        this.select1 = value;
        let i = foundIndex(this.rates, value);
        this.previousRate = this.rates[i];
        this.input2 = parseFloat(((this.input1 * this.select1) / this.select2).toFixed(4));
    }
    onSelected2(value:number): void {
        this.select2 = value;
        let i = foundIndex(this.rates, value);
        this.previousRate = this.rates[i];
        this.input1 = parseFloat(((this.input2 * this.select2) / this.select1).toFixed(4));
    }

    updateInput2() {
        this.input2 = parseFloat(((this.input1 * this.select1) / this.select2).toFixed(4));
    }
    updateInput1() {
        this.input1 = parseFloat(((this.input2 * this.select2) / this.select1).toFixed(4));
    }

}



