import { sum } from './sum.util';

describe('sum', () => {
  // describe() agrupa os testes relacionados a funcao sum()
  it('deve somar dois numbers corretamente', () => {
    // cada it() é um teste
    // 1. ARRANGE: preparar os dados de entrada
    const a = 2;
    const b = 3;

    // 2. ACT: deve executar a funcao que quero testar
    const resultado = sum(a, b);

    // 3. ASSERT: verificar se o resultado é o esperado.
    expect(resultado).toBe(5); // asserção: verifica se a saida é esperada
    // Arrange -> ACT -> ASSERT: padrao organizacional de raciocinio de tests
  });

  it('deve retornar um numero negativo se a soma for negativa', () => {
    const resultado = sum(-5, 2);

    expect(resultado).toBe(-3);
  });
});

// npm run test src/sum.util.spec.ts
