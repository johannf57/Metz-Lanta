import {Component, OnDestroy, OnInit} from '@angular/core';
import {EnigmsService} from '../shared/service/enigms.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Message} from 'primeng/components/common/message';

@Component({
  selector: 'app-enigm1',
  templateUrl: './enigm1.component.html',
  styleUrls: ['./enigm1.component.scss']
})
export class Enigm1Component implements OnInit, OnDestroy {

  enigm1Form: FormGroup;
  messages: Message[] = [];
  tries = 0;
  showAnswer = false;

  constructor(private service: EnigmsService) {
  }

  ngOnInit() {
    this.enigm1Form = new FormGroup({
      login: new FormControl('', [Validators.maxLength(20), Validators.required]),
      pwd: new FormControl('', [Validators.required])
    });
  }

  ngOnDestroy(): void {
  }

  onSubmit() {
    this.tries = parseFloat(this.tries + '') + 1;
    this.service.verifyEnigm1(this.enigm1Form.getRawValue()).subscribe(
      (isValid: boolean) => {
        this.messages = [];
        if (isValid) {
          this.messages.push({
            severity: 'info',
            summary: 'You have found the first indice'
          });
          this.showAnswer = true;
        } else {
          this.showAnswer = false;
          if (parseFloat(this.tries + '') < parseFloat('10')) {
            this.messages.push({
              severity: 'error',
              summary: 'Please try again, use the BASEics'
            });
          } else if ((parseFloat('10') <= parseFloat(this.tries + '')) && (parseFloat(this.tries + '') < parseFloat('50'))) {
            this.messages.push({
              severity: 'error',
              summary: 'Please try again, use BASE64 encoding'
            });
          } else if (parseFloat(this.tries + '') >= parseFloat('50')) {
            this.messages.push({
              severity: 'error',
              summary: 'Here is the password : ' + EnigmsService.PASSWORD
            });
          }
        }
      },
      error => {
        this.messages = [];
        this.messages.push({severity: 'error', summary: 'Error', detail: error});
        this.showAnswer = false;
      });
  }
}
