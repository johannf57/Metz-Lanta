import {Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Message} from 'primeng/components/common/message';
import {EnigmsService} from '../shared/service/enigms.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
    selector: 'app-enigm2',
    templateUrl: './enigm2.component.html',
    styleUrls: ['./enigm2.component.scss']
})
export class Enigm2Component implements OnInit, OnDestroy {

    @ViewChild('verso')
    el: ElementRef;

    enigm2Form: FormGroup;
    messages: Message[] = [];
    isFound = false;
    showAnswer = false;
    showGame = false;

    versoModel: any;

    private isInit = true;

    constructor(private service: EnigmsService) {
    }

    ngOnInit() {
        this.enigm2Form = new FormGroup({
            email: new FormControl('', [Validators.required]),
        });
        this.isInit = true;
    }

    ngOnDestroy(): void {
    }

    onSubmit(event: MouseEvent) {
        this.service.verifyEnigm2(this.enigm2Form.getRawValue(), this.isFound).subscribe(value => {
            if (value) {
                this.messages = [];
                this.messages.push({severity: 'info', summary: 'You have found the second indice'});
                this.showAnswer = true;
            } else {
                this.messages = [];
                this.messages.push({severity: 'error', summary: 'Not this one'});
                this.showAnswer = false;
            }
        });
        event.stopPropagation();
    }

    onPandaClick(event: MouseEvent): void {
        console.log(event);
        console.log('good position');
        if (event) {
            this.isFound = true;
            this.messages = [];
            this.messages.push({severity: 'info', summary: 'Yes, you have found the Panda', detail: 'Submit'});
        }
        event.stopPropagation();
    }

    @HostListener('window:click', ['$event'])
    checkPandaClick(event: any): void {
        if (event.srcElement.id === 'snowmanImg') {
            console.log(event);
            console.log('bad position');
            if (this.isFound) {
                return;
            } else if (this.isInit) {
                this.isInit = false;
                return;
            }
            this.isFound = false;
            this.messages = [];
            this.messages.push({severity: 'error', summary: 'Not this one'});
        }
        event.stopPropagation();
    }

    showVerso(event: MouseEvent): void {
        this.showGame = this.el.nativeElement.value.toUpperCase().trim() === 'VERSO';
        event.stopPropagation();
    }

}
