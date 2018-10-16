import {Component, OnDestroy, OnInit} from '@angular/core';
import {EnigmsService} from '../shared/service/enigms.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Message} from 'primeng/components/common/message';

@Component({
    selector: 'app-enigm3',
    templateUrl: './enigm3.component.html',
    styleUrls: ['./enigm3.component.scss']
})
export class Enigm3Component implements OnInit, OnDestroy {

    enigm3Form: FormGroup;
    messages: Message[] = [];
    tries = 0;
    private isFirstlineCorrect = false;
    private isSecondlineCorrect = false;
    public showAnswer = false;

    constructor(private petsService: EnigmsService) {
    }

    ngOnInit() {
        this.enigm3Form = new FormGroup({
            isFirstline: new FormControl('', [Validators.required]),
            isSecondline: new FormControl('', [Validators.required])
        });
    }

    ngOnDestroy(): void {
    }

    onSubmit() {
        this.tries = parseFloat(this.tries + '') + 1;
        console.log(this.isFirstlineCorrect, this.isSecondlineCorrect);
        this.petsService.verifyEnigm3(this.isFirstlineCorrect, this.isSecondlineCorrect).subscribe(
            (isValid: boolean) => {
                console.log(isValid);
                this.messages = [];
                if (isValid) {
                    this.messages = [];
                    this.messages.push({
                        severity: 'info',
                        summary: 'You have found the third indice'
                    });
                    this.showAnswer = true;
                } else {
                    if (parseFloat(this.tries + '') < parseFloat('10')) {
                        this.messages = [];
                        this.messages.push({
                            severity: 'error',
                            summary: 'Please try again,'
                        });
                        this.showAnswer = false;
                    }
                }
            },
            error => {
                this.messages = [];
                this.messages.push({severity: 'error', summary: 'Error', detail: error});
            });
    }

    inputFirstDominoClick(event: any): void {
        if (event.target.value === '4') {
            this.isFirstlineCorrect = true;
        } else {
            this.isFirstlineCorrect = false;
        }
    }

    inputDominoClick(event: any): void {
        if (event.target.value === '2') {
            this.isSecondlineCorrect = true;
        } else {
            this.isSecondlineCorrect = false;
        }
    }

    lblDominoClick(id: string): void {
        document.getElementById(id).click();
    }

}
