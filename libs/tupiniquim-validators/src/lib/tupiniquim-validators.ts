import { AbstractControl, ValidatorFn } from '@angular/forms';
import { CpfValidator } from './cpf-validator';
import { CnpjValidator } from './cnpj-validator';

type ValidatorReturnType = { [key: string]: string } | null;

export class TupiniquimValidators {
  static cpf(control: AbstractControl): ValidatorReturnType {
    return TupiniquimValidators.cpfValidator()(control);
  }

  static cnpj(control: AbstractControl): ValidatorReturnType {
    return TupiniquimValidators.cnpjValidator()(control);
  }

  private static cpfValidator(): ValidatorFn {
    const result = (control: AbstractControl): ValidatorReturnType => {
      if (!!control.value && CpfValidator.isValid(control.value, true)) {
        return null;
      }
      return { cpf: control.value };
    };
    return result;
  }

  private static cnpjValidator(): ValidatorFn {
    const result = (control: AbstractControl): ValidatorReturnType => {
      if (!!control.value && CnpjValidator.isValid(control.value, true)) {
        return null;
      }
      return { cnpj: control.value };
    };
    return result;
  }
}
