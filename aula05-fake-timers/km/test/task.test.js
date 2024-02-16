import { describe, expect, it, jest, beforeEach } from '@jest/globals';
import Task from '../src/task.js';
import { setTimeout } from 'node:timers/promises';

describe('Fake Timers Test Suite', () => {
  let _logMock;
  let _task;
  beforeEach(() => {
    _logMock = jest.spyOn(console, console.log.name).mockImplementation();
    _task = new Task();
  });
  it.skip('should only run tasks that are due without fake timers (slow)', async () => {
    // AAA = Arrange, Act, Assert

    // Arrange
    const tasks = [
      {
        name: 'Task-Will-Run-In-5-Secs',
        dueAt: new Date(Date.now() + 5000), // 5 secs
        fn: jest.fn(),
      },
      {
        name: 'Task-Will-Run-In-5-Secs',
        dueAt: new Date(Date.now() + 10000), // 10secs
        fn: jest.fn(),
      },
    ];

    // Act
    _task.save(tasks.at(0));
    _task.save(tasks.at(1));

    _task.run(200); // 200ms

    await setTimeout(11000); // 11_0000
    expect(tasks.at(0).fn).toHaveBeenCalled();
    expect(tasks.at(1).fn).toHaveBeenCalled();
  }, // configurar para o jest aguardar 15 segundos nesse test
  15e3);
  it('should only run tasks that are due with fake timers (fast)', async () => {
    jest.useFakeTimers();

    // Arrange
    const tasks = [
      {
        name: 'Task-Will-Run-In-5-Secs',
        dueAt: new Date(Date.now() + 5000), // 5 secs
        fn: jest.fn(),
      },
      {
        name: 'Task-Will-Run-In-10-Secs',
        dueAt: new Date(Date.now() + 10000), // 10 secs
        fn: jest.fn(),
      },
    ];

    // Act
    _task.save(tasks[0]);
    _task.save(tasks[1]);

    _task.run(200); // 200ms

    jest.advanceTimersByTime(11000); // 11_0000

    // Assert
    expect(tasks[0].fn).toHaveBeenCalled();
    expect(tasks[1].fn).toHaveBeenCalled();
  });
});
