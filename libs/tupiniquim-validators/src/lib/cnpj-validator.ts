// Blacklist common values.
const BLACKLIST: string[] = [
  '00000000000000',
  '11111111111111',
  '22222222222222',
  '33333333333333',
  '44444444444444',
  '55555555555555',
  '66666666666666',
  '77777777777777',
  '88888888888888',
  '99999999999999',
];

const STRICT_STRIP_REGEX: RegExp = /[-\\/.]/g;
const LOOSE_STRIP_REGEX: RegExp = /[^\d]/g;

export class CnpjValidator {
  static isValid(num: string, strict?: boolean): boolean {
    const stripped: string = CnpjValidator.strip(num, strict);

    // CNPJ must be defined
    if (!stripped) {
      return false;
    }

    // CNPJ must have 14 chars
    if (stripped.length !== 14) {
      return false;
    }

    // CNPJ can't be blacklisted
    if (BLACKLIST.includes(stripped)) {
      return false;
    }

    let numbers: string = stripped.substr(0, 12);
    numbers += CnpjValidator.verifierDigit(numbers);
    numbers += CnpjValidator.verifierDigit(numbers);

    return numbers.substr(-2) === stripped.substr(-2);
  }

  static generate(formatted?: boolean): string {
    let nums: string = '';

    for (let i = 0; i < 12; i += 1) {
      nums += Math.floor(Math.random() * 9);
    }

    nums += CnpjValidator.verifierDigit(nums);
    nums += CnpjValidator.verifierDigit(nums);

    return formatted ? CnpjValidator.format(nums) : nums;
  }

  private static verifierDigit(digits: string): number {
    let index: number = 2;
    const reverse: number[] = digits
      .split('')
      .reduce((buffer: number[], num: string) => {
        return [parseInt(num, 10)].concat(buffer);
      }, []);

    const sum: number = reverse.reduce((buffer: number, num: number) => {
      buffer += num * index;
      index = index === 9 ? 2 : index + 1;
      return buffer;
    }, 0);

    const mod: number = sum % 11;
    return mod < 2 ? 0 : 11 - mod;
  }

  private static strip(num: string, strict?: boolean): string {
    const regex: RegExp = strict ? STRICT_STRIP_REGEX : LOOSE_STRIP_REGEX;
    return (num || '').replace(regex, '');
  }

  private static format(num: string): string {
    const result = CnpjValidator.strip(num).replace(
      /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/,
      '$1.$2.$3/$4-$5'
    );
    return result;
  }
}
