// tslint:disable:no-expression-statement
import test from 'ava';
import Item from './Item';
import Pet from './Pet';
import Skill from './Skill';
import { PetType, SkillType, Status } from '../types';

const pet = new Pet();
const enemy = new Pet();
test.before( () => {
    pet.name = 'mike';
    pet.status = Status.Die;
    pet.type = PetType.Fire;
    pet.healthLimit = 100;
    pet.health = 100;
    pet.magicLimit = 20;
    pet.magic = 20;
    pet.status = Status.Health;
    pet.age = 90;
    pet.items = [];
    pet.skills = [];
    pet.friends = [];
    enemy.healthLimit = 100;
    enemy.health = 100;
  }
);

test('testName', t => {
  t.deepEqual(pet.name, 'mike')
});

test('test status', t => {
  t.deepEqual(pet.status, Status.Health)
});

test('test age', t => {
  t.deepEqual(pet.age, 90);
});

test('test type', t => {
  t.deepEqual(pet.type, PetType.Fire);
});

test('test friends', t => {
  pet.friends = [];
  const friendFirst = new Pet();
  friendFirst.name = 'good hunter';
  const friendSecond = new Pet();
  friendSecond.name = 'Dark Soul';
  pet.friends.push(friendFirst);
  pet.friends.push(friendSecond);
  t.deepEqual(pet.friends.length, 2);
  t.deepEqual(pet.friends[0], friendFirst);
  t.deepEqual(pet.friends[1], friendSecond)
});

test('attack by random hit', t => {
  enemy.health = enemy.healthLimit;
  const randomHit = pet.attackByHit(enemy);
  t.deepEqual(enemy.health, enemy.healthLimit - randomHit);
  t.deepEqual(pet.attackByHit(null), -1);
});

test('learn skills and attack', t => {
  enemy.health = enemy.healthLimit;
  const skill = new Skill();
  skill.name = 'fireball';
  skill.type = SkillType.Attack;
  skill.magic = 10;
  skill.figure = 20;
  pet.learn(skill);

  t.deepEqual(pet.skills[0], skill);
  t.deepEqual(pet.attackBySkill(enemy, skill), 20);
  t.deepEqual(enemy.health, enemy.healthLimit - skill.figure);
  t.deepEqual(pet.learn(skill), false);
  skill.type = SkillType.Recovery;
  pet.learn(skill);
  t.deepEqual(pet.attackBySkill(enemy, skill), -1);
  enemy.health = -1;
  t.deepEqual(pet.attackBySkill(enemy, skill), -1);
});

test('attack and die', t => {
  pet.magic = 20;
  const superFireBall = new Skill();
  superFireBall.name = 'superFireBall';
  superFireBall.type = SkillType.Attack;
  superFireBall.magic = 10;
  superFireBall.figure = 101;
  pet.learn(superFireBall);
  enemy.health = enemy.healthLimit;
  pet.attackBySkill(enemy, superFireBall);
  t.deepEqual(enemy.status, Status.Die);
  t.deepEqual(enemy.health, 0);
});


test('recoveryByRest', t => {
  pet.health = 80;
  const originalHealth = pet.health;
  let recoveryNumber = pet.recoveryByRest();
  t.deepEqual(pet.health, originalHealth + recoveryNumber );
  pet.health = pet.healthLimit;
  recoveryNumber = pet.recoveryByRest();
  t.deepEqual(pet.health, pet.healthLimit);
  t.deepEqual(recoveryNumber, 0);
});

test('recoveryBySkill', t => {
  const skill = new Skill();
  skill.type = SkillType.Recovery;
  skill.name = 'plushp';
  skill.magic = 5;
  skill.figure = 20;

  pet.health = 70;
  pet.magic = pet.magicLimit;
  pet.skills.push(skill);
  pet.recoveryBySkill(skill);
  t.deepEqual(pet.health, 90);
  t.deepEqual(pet.magic, pet.magicLimit - skill.magic);
});

test('find items', t => {
  const item = new Item();
  item.name = 'hp';
  item.amount = 1;
  item.figure = 20;
  item.type = SkillType.Recovery;
  item.magic = false;
  pet.items.push(item);
  t.deepEqual(item.name, 'hp');
  t.deepEqual(item.amount, 1);
  t.deepEqual(item.figure, 20);
  t.deepEqual(item.type, SkillType.Recovery);
  t.deepEqual(item.magic, false);
  t.deepEqual(pet.items[0], item);
});



