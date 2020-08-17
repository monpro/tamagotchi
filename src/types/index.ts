import Pet from '../lib/Pet';
import Skill from '../lib/Skill';

export enum PetType {
  Fire = 'Fire',
  Lighting = 'Lighting',
  Water = 'Water',
  Stone = 'Stone'
}

export enum Status {
  Health = 'Health',
  Risk = 'Risk',
  Die = 'Die'
}

export enum SkillType {
  Recovery = 'Recovery',
  Attack = 'Attack'
}


export interface Behavior {
  learn(skill: Skill): boolean
  attackByHit(other: Pet): number
  attackBySkill(other: Pet, skill: Skill): number
  recoveryByRest(): void
  recoveryBySkill(skill: Skill): number
}
