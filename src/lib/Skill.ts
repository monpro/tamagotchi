import { SkillType } from '../types';

export default class Skill {
  private _name: string;
  private _type: SkillType;
  private _figure: number;
  private _magic: number;
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

  get figure(): number {
    return this._figure;
  }

  set figure(value: number) {
    this._figure = value;
  }

  get magic(): number {
    return this._magic;
  }

  set magic(value: number) {
    this._magic = value;
  }
}
