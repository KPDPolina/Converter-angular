import { Component, OnInit} from '@angular/core';
import { ApiService } from './api.service';
import { FormGroup, FormBuilder } from '@angular/forms';

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

    myForm: FormGroup;

    r1: Array<string | number>;
    r2: Array<string | number>;

    rates: Array<Array<string | number>> = [["UAH", 1]];
    previousRate: Array<string | number> = this.rates[0]; 
    

    ngOnInit () {
        this.getDataFromApi();
    }

    getDataFromApi(): void {
        this.apiService.getData().subscribe(
            (response) => {
                this.r1 = [response[24].cc, response[24].rate];
                this.r2 = [response[31].cc, response[31].rate];
                response.forEach(element => {
                    const currency = [element.cc, element.rate];
                    this.rates.push(currency)                
                });
            },
            (error) => {
                console.error('An error occurred:', error);
            }
        );
    }


    constructor(private apiService: ApiService, private formBuilder: FormBuilder) {
        this.myForm = this.formBuilder.group({
          select1: 1,
          select2: 1,
          input1: 1,
          input2: 1
        });

        this.myForm.controls.select1.valueChanges.subscribe(() => {
            this.updatePreviousRate(this.myForm.controls.select1.value);
            this.updateInput2Value();
        });
    
        this.myForm.controls.select2.valueChanges.subscribe(() => {
            this.updatePreviousRate(this.myForm.controls.select2.value);
            this.updateInput1Value();
        });
    
        this.myForm.controls.input1.valueChanges.subscribe(() => {
            this.updateInput2Value();
        });
    
        this.myForm.controls.input2.valueChanges.subscribe(() => {
            this.updateInput1Value();
        });
    }

    updateInput2Value(): void {
        const input1Value: number = this.myForm.controls.input1.value;
        const select1Value: number = this.myForm.controls.select1.value;
        const select2Value: number = this.myForm.controls.select2.value;
    
        if (input1Value && select1Value && select2Value) {
            const calculatedValue: number = parseFloat(((input1Value * select1Value) / select2Value).toFixed(4));
            this.myForm.controls.input2.setValue(calculatedValue);} 
            else {
            this.myForm.controls.input2.setValue(null);
        }
    }
    
    updateInput1Value(): void {
        const input2Value: number = this.myForm.controls.input2.value;
        const select1Value: number = this.myForm.controls.select1.value;
        const select2Value: number = this.myForm.controls.select2.value;
    
        if (input2Value && select1Value && select2Value) {
            const calculatedValue: number = parseFloat(((input2Value * select2Value) / select1Value).toFixed(4));
            this.myForm.controls.input1.setValue(calculatedValue);}
            else {
            this.myForm.controls.input1.setValue(null);
        }
    }
    
    updatePreviousRate(value:number): void {
        let i = foundIndex(this.rates, value);
        this.previousRate = this.rates[i];
    }
}