import 'jest-preset-angular/setup-jest';

Object.defineProperty(global.Element.prototype, 'animate', {
    value: jest.fn(), // Mock vacío para evitar errores
  });