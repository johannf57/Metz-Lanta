import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {Enigm1Model} from '../model/enigm1.model';
import {Enigm2Model} from '../model/enigm2.model';
import {Enigm3Model} from '../model/enigm3.model';

/**
 * rue des clercs
 * 49.116514, 6.170965
 *  Le bouche à oreille
 * Taverne Maitre Kanter
 *
 * Service enigms
 */
@Injectable()
export class EnigmsService {

  public static readonly PASSWORD: string = 'UHJpYW0gRmFsYW50aW4=';

  constructor(private http: HttpClient) {
  }

  /**
   * reponse enigm 1 '24'
   * @param {Enigm1Model} enigm1
   * @returns {Observable<boolean>}
   */
  public verifyEnigm1(enigm1: Enigm1Model): Observable<boolean> {
    const encodedPwd: string = btoa(enigm1.pwd);
    console.log(encodedPwd);
    console.log(btoa('Priam Falantin'));
    if (encodedPwd === EnigmsService.PASSWORD) {
      // send email
      return Observable.of(true);
    }
    return Observable.of(false);
  }

  /**
   * repoonse enigm 2 'LATITUDE'
   * @param {Enigm2Model} enigm2
   * @param {boolean} isFound
   * @returns {Observable<boolean>}
   */
  public verifyEnigm2(enigm2: Enigm2Model, isFound: boolean): Observable<boolean> {
    // send email
    if (isFound) {
      return Observable.of(true);
    }
    return Observable.of(false);
  }

  /**
   * reponse enigm 3 'LONGITUDE'
   * @param {Enigm3Model} rawValue
   * @returns {Observable<boolean>}
   */
  public verifyEnigm3(isFirstLineCorrect: boolean, isSecondLineCorrect: boolean): Observable<boolean> {
    // send email
    if (isFirstLineCorrect && isSecondLineCorrect) {
      return Observable.of(true);
    }
    return Observable.of(false);
  }
}
