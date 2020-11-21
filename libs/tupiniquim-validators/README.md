# tupiniquim-validators

Brazilian CPF and CNPJ Validators for Angular Forms;\
This library was generated with [Nx](https://nx.dev).

## Running unit tests
Run `npx nx test tupiniquim-validators` to execute the unit tests.

## Build
Run `npx nx build tupiniquim-validators` to build the TupiniquimValidators lib. The built artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## How to use

Import TupiniValidator into your component class:\
`import { TupiniquimValidators } from '@tupini-tech/tupiniquim-validators';`

Validating cpf field:\
`control = new FormControl(null, {validators: [TupiniquimValidators.cpf]})`

Validating cnpj field:\
 `control = new FormControl(null, {validators: [TupiniquimValidators.cnpj]})`





## Further help

Visit the [Nx Documentation](https://nx.dev) to learn more.
