import prompt from 'prompt';
import Item from './lib/Item';
import Pet from './lib/Pet';
import { PetType, SkillType } from './types';
import Skill from './lib/Skill';

prompt.start();

console.log('welcome to create your unique pet warrior!!!!');

const pet = new Pet();
pet.items = [];
pet.friends = [];
pet.skills = [];
const sword = new Item();
sword.name = 'master sword';
sword.type = SkillType.Attack;
sword.amount  = 1;
sword.figure = 99;
sword.magic = false;
const properties = {
  name: {
    message: "Please think a name?"
  },
  age: {
    message: "What's the age you prefer (1 - 99)",
    validator: /^(\d?[1-9]|[1-9]0)$/,
    warning: 'age should be between 1 - 99!'
  },
  type: {
    message: "Please choose a type for your pet: 1.Fire 2.Lighting 3.Water 4.Stone",
    validator: /[1-4]/,
    warning: 'please input number between 1 and 4!'
  },
  item: {
    message: "Do you like to have a master sword? (Y or N)",
    validator: /Y|N/,
    warning: 'please input Y or N!'
  }
};

const getLimit = number => {
  switch (number) {
    case 1:
      return [50, 50];
    case 2:
      return [70, 30];
    case 3:
      return [60, 40];
    case 4:
      return [80, 20];
    default:
      return [50, 50];
  }
};

const getPetType = number => {
  switch (number) {
    case 1:
      return PetType.Fire;
    case 2:
      return PetType.Lighting;
    case 3:
      return PetType.Water;
    case 4:
      return PetType.Stone;
    default:
      return PetType.Fire
  }
};

const getDefaultSkill = number => {
  const skill = new Skill()
  skill.type = SkillType.Attack;
  switch (number) {
    case 1:
      skill.figure = 15;
      skill.magic = 10;
      skill.name = 'fire ball';
      break;
    case 2:
      skill.figure = 20;
      skill.magic = 15;
      skill.name = 'lighting ball';
      break;
    case 3:
      skill.figure = 5;
      skill.magic = 10;
      skill.name = 'water ball';
      break;
    case 4:
      skill.figure = 30;
      skill.magic = 20;
      skill.name = 'stone ball';
      break;
    default:
      skill.figure = 15;
      skill.magic = 10;
      skill.name = 'fire ball';
      break;
  }
  return skill;
}

prompt.get({
  properties
}, (error, { name, age, type, item }) => {
  if(error){
    console.log('please try again')
  } else {
    pet.name = name;
    pet.age = Number(age);
    const typeNum = Number(type);
    const [healthLimit, magicLimit] = getLimit(typeNum);
    const skill = getDefaultSkill(typeNum);
    pet.type = getPetType(typeNum);
    pet.healthLimit = healthLimit;
    pet.health = healthLimit;
    pet.magicLimit = magicLimit;
    pet.magic = magicLimit;
    pet.skills.push(skill);

    if (item === 'Y') {
      pet.items.push(sword)
    }
    console.log("you pet warrior is born!!!");
    console.log(pet);
  }
});



