import 'jest';

import { CpfValidator } from './cpf-validator';
import { CnpjValidator } from './cnpj-validator';
import { TupiniquimValidators } from './tupiniquim-validators';

import { FormControl } from '@angular/forms';

describe('Test Tupini CPF Validator', () => {
  const cpfValidator = TupiniquimValidators.cpf;
  const control = new FormControl('input');

  test('deve ser capaz de validar o CPF apenas como número', async () => {
    const validCpf = CpfValidator.generate();
    control.setValue(validCpf);
    expect(cpfValidator(control)).toBeNull();
  });

  test('deve ser capaz de validar o CPF como string com pontos e barras', async () => {
    const validCpf = CpfValidator.generate(true);
    control.setValue(validCpf);
    expect(cpfValidator(control)).toBeNull();
  });

  test('deve falhar no CPF inválido', async () => {
    const invalidCpf = '01283191283';
    control.setValue(invalidCpf);
    expect(cpfValidator(control)).toEqual({ cpf: '01283191283' });
  });
});

describe('Test Tupini CNPJ Validator', () => {
  const cnpjValidator = TupiniquimValidators.cnpj;
  const control = new FormControl('input');

  test('deve ser capaz de validar o CNPJ apenas como número', async () => {
    const validCnpj = CnpjValidator.generate();
    control.setValue(validCnpj);
    expect(cnpjValidator(control)).toBeNull();
  });

  test('deve ser capaz de validar o CNPJ como uma string com pontos e barras', async () => {
    const validCnpj = CnpjValidator.generate(true);
    control.setValue(validCnpj);
    expect(cnpjValidator(control)).toBeNull();
  });

  test('deve falhar no CNPJ inválido', async () => {
    const invalidCnpj = '0128319128312';
    control.setValue(invalidCnpj);
    expect(cnpjValidator(control)).toEqual({ cnpj: '0128319128312' });
  });
});
