export default class Person {
  static validate(person) {
    if (!person.name) throw new Error('name is required');
    if (!person.cpf) throw new Error('cpf is required');
  }

  static format(person) {
    const [name, ...lastName] = person.name.split(' ');

    return {
      name,
      cpf: person.cpf.replace(/\D/g, ''),
      lastName: lastName.join(' '),
    };
  }
  static save(person) {
    if (!['name', 'cpf', 'lastName'].every((prop) => person[prop])) {
      throw new Error(`cannot save invalid person: ${JSON.stringify(person)}`);
    }

    // .. banco de dados, api, etc
    console.log('registred successfully', person);
  }
  static process(person) {
    this.validate(person);
    const personFormatted = this.format(person);
    this.save(personFormatted);

    return 'ok';
  }
}

// Person.process({
//     name: 'Steph Curry',
//     cpf: '123.456.789-00'
//  })
