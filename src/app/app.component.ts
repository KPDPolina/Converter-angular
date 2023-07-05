import { Component, OnInit} from '@angular/core';
import { ApiService } from './api.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import {foundIndex } from './utils/service'; 

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
            this.updateInputValue(this.myForm.controls.input1.value, this.myForm.controls.input2, this.myForm.controls.select1.value, this.myForm.controls.select2.value);
        });
    
        this.myForm.controls.select2.valueChanges.subscribe(() => {
            this.updatePreviousRate(this.myForm.controls.select2.value);
            this.updateInputValue(this.myForm.controls.input2.value, this.myForm.controls.input1, this.myForm.controls.select2.value, this.myForm.controls.select1.value);
        });
    
        this.myForm.controls.input1.valueChanges.subscribe(() => {
            this.updateInputValue(this.myForm.controls.input1.value, this.myForm.controls.input2, this.myForm.controls.select1.value, this.myForm.controls.select2.value);
        });
    
        this.myForm.controls.input2.valueChanges.subscribe(() => {
            this.updateInputValue(this.myForm.controls.input2.value, this.myForm.controls.input1, this.myForm.controls.select2.value, this.myForm.controls.select1.value);
        });

    }

    updateInputValue(inputValue1, inputValue2, selectValue1, selectValue2 ): void {
        if (inputValue1 && selectValue1 && selectValue2) {
            const calculatedValue: number = parseFloat(((inputValue1 * selectValue1) / selectValue2).toFixed(4));
            inputValue2.setValue(calculatedValue);} 
            else {
                inputValue2.setValue(null);
        }
    }
    
    updatePreviousRate(value:number): void {
        let i = foundIndex(this.rates, value);
        this.previousRate = this.rates[i];
    }
}

