import { SkillType } from '../types';

export default class Item {
  private _name: string;
  private _type: SkillType;
  private _amount: number;
  private _figure: number;
  private _magic?: boolean;

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  get type(): SkillType {
    return this._type;
  }

  set type(value: SkillType) {
    this._type = value;
  }

  get amount(): number {
    return this._amount;
  }

  set amount(value: number) {
    this._amount = value;
  }

  get figure(): number {
    return this._figure;
  }

  set figure(value: number) {
    this._figure = value;
  }

  get magic(): boolean {
    return this._magic;
  }

  set magic(value: boolean) {
    this._magic = value;
  }
}
