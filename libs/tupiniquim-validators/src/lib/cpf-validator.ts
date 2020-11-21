// Blacklist common values.
const BLACKLIST: string[] = [
  '00000000000',
  '11111111111',
  '22222222222',
  '33333333333',
  '44444444444',
  '55555555555',
  '66666666666',
  '77777777777',
  '88888888888',
  '99999999999',
  '12345678909',
];

const STRICT_STRIP_REGEX: RegExp = /[.-]/g;
const LOOSE_STRIP_REGEX: RegExp = /[^\d]/g;

export class CpfValidator {
  static isValid(num: string, strict?: boolean): boolean {
    const stripped: string = CpfValidator.strip(num, strict);

    // CPF must be defined
    if (!stripped) {
      return false;
    }

    // CPF must have 11 chars
    if (stripped.length !== 11) {
      return false;
    }

    // CPF can't be blacklisted
    if (BLACKLIST.includes(stripped)) {
      return false;
    }

    let numbers: string = stripped.substr(0, 9);
    numbers += CpfValidator.verifierDigit(numbers);
    numbers += CpfValidator.verifierDigit(numbers);

    return numbers.substr(-2) === stripped.substr(-2);
  }

  static generate(formatted?: boolean): string {
    let numbers: string = '';

    for (let i = 0; i < 9; i += 1) {
      numbers += Math.floor(Math.random() * 9);
    }

    numbers += CpfValidator.verifierDigit(numbers);
    numbers += CpfValidator.verifierDigit(numbers);

    return formatted ? CpfValidator.format(numbers) : numbers;
  }

  private static verifierDigit(digits: string): number {
    const nums: number[] = digits.split('').map((num: string) => {
      return parseInt(num, 10);
    });

    const modulus: number = nums.length + 1;
    const multiplied: number[] = nums.map(
      (num: number, index: number) => num * (modulus - index)
    );
    const mod: number =
      multiplied.reduce((buffer: number, num: number) => buffer + num) % 11;

    return mod < 2 ? 0 : 11 - mod;
  }

  private static strip(num: string, strict?: boolean): string {
    const regex: RegExp = strict ? STRICT_STRIP_REGEX : LOOSE_STRIP_REGEX;
    return (num || '').replace(regex, '');
  }

  private static format(num: string): string {
    const result = CpfValidator.strip(num).replace(
      /^(\d{3})(\d{3})(\d{3})(\d{2})$/,
      '$1.$2.$3-$4'
    );
    return result;
  }
}
