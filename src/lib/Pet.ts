import { Behavior, PetType, SkillType, Status } from '../types';
import Item from './Item';
import Skill from './Skill';

export default class Pet implements Behavior {

  private _name: string;
  private _age: number;
  private _type: PetType;
  private _status: Status;
  private _healthLimit: number;
  private _health: number;
  private _magicLimit: number;
  private _magic: number;
  private _items?: Item[];
  private _friends?: Pet[];
  private _skills?: Skill[];


  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  get age(): number {
    return this._age;
  }

  set age(value: number) {
    this._age = value;
  }

  get type(): PetType {
    return this._type;
  }

  set type(value: PetType) {
    this._type = value;
  }

  get status(): Status {
    return this._status;
  }

  set status(value: Status) {
    this._status = value;
  }

  get health(): number {
    return this._health;
  }

  set health(value: number) {
    if (!this.healthLimit ) {
      return
    } else {
      this._health = value > this.healthLimit ? this.healthLimit : value;
    }
  }

  get magic(): number {
    return this._magic;
  }

  set magic(value: number) {
    if (!this.magicLimit ) {
      return
    } else {
      this._magic = value > this.magicLimit ? this.magicLimit : value;
    }
  }

  get magicLimit(): number {
    return this._magicLimit;
  }

  set magicLimit(value: number) {
    this._magicLimit = value;
  }
  get healthLimit(): number {
    return this._healthLimit;
  }

  set healthLimit(value: number) {
    this._healthLimit = value;
  }

  get items(): Item[] {
    return this._items;
  }

  set items(value: Item[]) {
    this._items = value;
  }

  get friends(): Pet[] {
    return this._friends;
  }

  set friends(value: Pet[]) {
    this._friends = value;
  }

  get skills(): Skill[] {
    return this._skills;
  }

  set skills(value: Skill[]) {
    this._skills = value;
  }

  public attackByHit(other: Pet): number {
    if (other === null) {
      return -1;
    } else {
      const randomHit = Math.floor(this.getRandomArbitrary(0.1 * this.healthLimit, 0.3 * this.healthLimit))
      return this.attack(randomHit, other);
    }
  }

  public attackBySkill(other: Pet, skill: Skill): number {
    if(this.magic === undefined || skill.type !== SkillType.Attack) {
      return -1;
    }
    if (this.skills.includes(skill) && skill.magic > this.magic) {
      return 0;
    }else {
      if (other.health > 0) {
        this.magic -= skill.magic;
        return this.attack(skill.figure, other);
      } else {
        return -1;
      }
    }
  }

  public learn(skill: Skill): boolean {
    if (this.skills === null || this.skills.includes(skill)) {
      return false
    } else {
      this.skills.push(skill);
      return true
    }
  }

  public recoveryByRest(): number {
    const recoveryNumber = this.health > 0 ? Math.floor(this.healthLimit * 0.1): 0;
    return this.recovery(recoveryNumber);
  }

  public recoveryBySkill(skill: Skill): number {
    if (this.skills.includes(skill) && skill.type === SkillType.Recovery && skill.magic <= this.magic) {
      this.magic -= skill.magic;
      return this.recovery(skill.figure);
    } else {
      return 0;
    }
  }

  protected getRandomArbitrary(min: number, max: number): number {
    return Math.random() * (max - min) + min;
  }

  private attack(attackNumber: number, other: Pet): number {
    let result = attackNumber
    if (other.health - attackNumber  <= 0) {
      result = other.health;
      other.health = 0;
      other.status = Status.Die;
    } else {
      other.health -= attackNumber;
    }
    return result
  }

  private recovery(recoveryNumber: number): number {
    let result = recoveryNumber;
    if ( this.health + recoveryNumber >= this.healthLimit) {
      result = this.healthLimit - this.health;
      this.health = this.healthLimit;
    } else {
      this.health += recoveryNumber;
    }
    return result;
  }
}
