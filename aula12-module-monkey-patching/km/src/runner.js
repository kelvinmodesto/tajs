import Service from './service';

export async function run(item) {
  const heroes = new Service('heroes');
  const hero = heroes.createHero(item);
  console.log('createHero', hero);
  const list = heroes.listHeroes();
  console.log('listHeroes', list);
}
