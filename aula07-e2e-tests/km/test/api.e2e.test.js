import { describe, expect, it, jest } from '@jest/globals';
import Person from '../src/person.js';

describe('e2e Suite Test', () => {
  describe('#validate', () => {
    it('should throw if the name is not present', () => {
      const mockInvalidPerson = {
        name: '',
        cpf: '123.456.789-00',
      };

      expect(() => Person.validate(mockInvalidPerson)).toThrow(
        new Error('name is required')
      );
    });

    it('should throw if the cpf is not present', () => {
      const mockInvalidPerson = {
        name: 'Steph Curry',
        cpf: '',
      };

      expect(() => Person.validate(mockInvalidPerson)).toThrow(
        new Error('cpf is required')
      );
    });

    it('should not throw if the person is valid', () => {
      const mockValidPerson = {
        name: 'Steph Curry',
        cpf: '123.456.789-30',
      };

      expect(() => Person.validate(mockValidPerson)).not.toThrow();
    });
  });
  describe('#format', () => {
    it('should format the person name and cpf', () => {
      // AAA
      // Arrange
      const mockPerson = {
        name: 'Steph Curry',
        cpf: '123.456.789-30',
      };
      // Act
      const formattedPerson = Person.format(mockPerson);

      // Assert
      const expected = {
        name: 'Steph',
        cpf: '12345678930',
        lastName: 'Curry',
      };

      expect(formattedPerson).toStrictEqual(expected);
    });
  });
  describe('#process', () => {
    it('should process a valid person', () => {
      // Uma outra ideia é não retestar o que já foi testado
      // lembra dos checkpoints?
      // Testou do caminho A ao caminho B,
      //      agora testa do caminho B ao caminho C
      // Então aqui, eu pulo o caminho A (validate), caminho B (format)
      // e vou direto para o caminho C (save) pois estes caminhos
      // ja foram validados
      // Este método abaixo faz mais sentido para quando se tem interações externas como
      // chamadas de API, bancos de dados, etc (que será mostrado na próxima aula)
      // Mocks são simulações de funções que você pode fazer ao testar o comportamento!!
      /// AAA = Arrange, Act, Assert

      // Arrange
      const mockPerson = {
        name: 'Steph Curry',
        cpf: '123.456.789-30',
      };

      jest.spyOn(Person, Person.validate.name).mockReturnValue();
      jest.spyOn(Person, Person.format.name).mockReturnValue({
        cpf: '12345678930',
        name: 'Steph',
        lastName: 'Curry',
      });
      // Act
      const result = Person.process(mockPerson);

      // Assert
      const expected = 'ok';
      expect(result).toStrictEqual(expected);
    });
  });
});
