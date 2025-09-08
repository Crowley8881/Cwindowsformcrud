class AbrigoAnimais {
  constructor() {
    this.animais = {
      'Rex': { tipo: 'cão', brinquedos: ['RATO', 'BOLA'] },
      'Mimi': { tipo: 'gato', brinquedos: ['BOLA', 'LASER'] },
      'Fofo': { tipo: 'gato', brinquedos: ['BOLA', 'RATO', 'LASER'] },
      'Zero': { tipo: 'gato', brinquedos: ['RATO', 'BOLA'] },
      'Bola': { tipo: 'cão', brinquedos: ['CAIXA', 'NOVELO'] },
      'Bebe': { tipo: 'cão', brinquedos: ['LASER', 'RATO', 'BOLA'] },
      'Loco': { tipo: 'jabuti', brinquedos: ['SKATE', 'RATO'] }
    };

    this.todosBrinquedos = new Set(['RATO', 'BOLA', 'LASER', 'CAIXA', 'NOVELO', 'SKATE']);
  }

  encontraPessoas(brinquedosPessoa1, brinquedosPessoa2, ordemAnimais) {
    const erro = this.validarEntradas(brinquedosPessoa1, brinquedosPessoa2, ordemAnimais);
    if (erro) return { erro };

    //as lista necessarias para garantir o funcionamentos das regras
    const p1Brinquedos = brinquedosPessoa1.split(',');
    const p2Brinquedos = brinquedosPessoa2.split(',');
    const animais = ordemAnimais.split(',');

    const resultados = [];//armazena o resultado do programa
    const animaisPessoa1 = [];
    const animaisPessoa2 = [];
    let locoNome = null;

    //salvar o loco para as regras especiais
    for (const nomeAnimal of animais) {
      if (nomeAnimal === 'Loco') {
        locoNome = nomeAnimal;
        continue;
      }

      const animal = this.animais[nomeAnimal];
      let p1Apto = false;
      let p2Apto = false;
      //seleciona se a pessoa pode adotar
      if (animaisPessoa1.length < 3) {
        p1Apto = this.podeAdotar(animal, p1Brinquedos);
      }
      if (animaisPessoa2.length < 3) {
        p2Apto = this.podeAdotar(animal, p2Brinquedos);
      }
      // abrigo ou adotado
      if (p1Apto && p2Apto) {
        resultados.push(`${nomeAnimal} - abrigo`);
      } else if (p1Apto) {
        resultados.push(`${nomeAnimal} - pessoa 1`);
        animaisPessoa1.push(nomeAnimal);
      } else if (p2Apto) {
        resultados.push(`${nomeAnimal} - pessoa 2`);
        animaisPessoa2.push(nomeAnimal);
      } else {
        resultados.push(`${nomeAnimal} - abrigo`);
      }
    }

  // Verifica se pessoa pode adotar o loco
    if (locoNome) {
      const temCompanheiro = animaisPessoa1.length > 0 || animaisPessoa2.length > 0;
      if (temCompanheiro) {
        const locoPodeAdotarP1 = this.podeAdotarLoco(p1Brinquedos) && animaisPessoa1.length < 3;
        const locoPodeAdotarP2 = this.podeAdotarLoco(p2Brinquedos) && animaisPessoa2.length < 3;

        if (locoPodeAdotarP1 && locoPodeAdotarP2) {
          resultados.push(`${locoNome} - abrigo`);
        } else if (locoPodeAdotarP1) {
          resultados.push(`${locoNome} - pessoa 1`);
        } else if (locoPodeAdotarP2) {
          resultados.push(`${locoNome} - pessoa 2`);
        } else {
          resultados.push(`${locoNome} - abrigo`);
        }
      } else {
        resultados.push(`${locoNome} - abrigo`);
      }
    }

    resultados.sort(); //deixa o resultado em ordem crecente
    return { lista: resultados };
  }
  //regras do gato 
  podeAdotar(animal, brinquedosPessoa) {
    if (animal.tipo === 'gato') {
      const brinquedosGatoStr = animal.brinquedos.join(',');
      const brinquedosPessoaStr = brinquedosPessoa.join(',');
      return brinquedosGatoStr === brinquedosPessoaStr;
    }
//regras do cachorro
    if (animal.tipo === 'cão') {
      let brinquedoIndex = 0;
      for (const brinquedo of brinquedosPessoa) {
        if (brinquedo === animal.brinquedos[brinquedoIndex]) {
          brinquedoIndex++;
        }
      }
      return brinquedoIndex === animal.brinquedos.length;
    }

    return false;
  }

//checa se o loco pode ser adotado
  podeAdotarLoco(brinquedosPessoa) {
    const brinquedosArray = Array.from(brinquedosLoco);
    for (let i = 0; i < brinquedosArray.length; i++) {
      if (!brinquedosPessoa.includes(brinquedosArray[i])) return false;
    }

    return true;
  }

//valida se estão corretas as entradas
  validarEntradas(brinquedosP1, brinquedosP2, animaisStr) {
    //valida os briquedos estão com duplicatas e se são valaidos
    const validarBrinquedos = (brinquedosStr) => {
      const brinquedos = brinquedosStr.split(',');
      const brinquedosUnicos = new Set(brinquedos);
      if (brinquedos.length !== brinquedosUnicos.size) return false;
      for (const b of brinquedos) {
        if (!this.todosBrinquedos.has(b)) return false;
      }
      return true;
    };

    if (!validarBrinquedos(brinquedosP1) || !validarBrinquedos(brinquedosP2)) {
      return 'Brinquedo inválido';
    }

    //valida a lista dops animais e checa duplicatas
    const animais = animaisStr.split(',');
    const animaisUnicos = new Set(animais);
    if (animais.length !== animaisUnicos.size) return 'Animal inválido';
    //percorre a lista para validar se o animal e valido
    for (const animal of animais) {
      if (!this.animais[animal]) return 'Animal inválido';
    }
  }
}

export { AbrigoAnimais as AbrigoAnimais };