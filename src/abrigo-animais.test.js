const { AbrigoAnimais } = require("./abrigo-animais");

describe('Abrigo de Animais', () => {

  // Substitua o teste antigo por este
  test('Deve retornar a lista correta para o exemplo do README', () => {
    const abrigo = new AbrigoAnimais();
    
    // Entradas do exemplo do README.md
    const brinquedosPessoa1 = 'RATO,BOLA';
    const brinquedosPessoa2 = 'RATO,NOVELO';
    const ordemAnimais = 'Rex,Fofo';

    const resultado = abrigo.encontraPessoas(brinquedosPessoa1, brinquedosPessoa2, ordemAnimais);
    
    // Saída esperada do exemplo do README.md
    const saidaEsperada = {
      lista: ['Fofo - abrigo', 'Rex - pessoa 1']
    };

    expect(resultado).toEqual(saidaEsperada);
  });

  // Você pode adicionar mais testes aqui!
  test('Deve retornar erro para animal inválido', () => {
    const abrigo = new AbrigoAnimais();
    const resultado = abrigo.encontraPessoas('CAIXA,RATO', 'RATO,BOLA', 'Lulu');
    expect(resultado).toEqual({ erro: 'Animal inválido' });
  });

});