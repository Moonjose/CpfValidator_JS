function ValidateCPF(cpfValue) { // Função Construtora que retorna apenas numeros
  Object.defineProperty(this, 'clearCpf', {
    enumerable: true,
    get: function() {
      return cpfValue.replace(/\D+/g, '');
    }
  });
}

ValidateCPF.prototype.validate = function() {
  if(typeof this.clearCpf === 'undefined') return false; // Checa se o cpf enviado foi vazio
  if(this.clearCpf.length !== 11 ) return false; // Checa se não tem 11 digitos
  if(this.isSequence()) return false; // Checa se os numeros foram enviados numa sequencia (ex : 111.111...)

  const partialCpf = this.clearCpf.slice(0, -2); // Retira os dois ultimos digitos
  const digit1 = this.createDigit(partialCpf); // Calcula o primeiro digito
  const digit2 = this.createDigit(partialCpf + digit1); // Calcula o segundo digito

  const newCpf = partialCpf + digit1 + digit2; //Concatena todos os digitos
  return newCpf === this.clearCpf; // Retorna true se for igual ao cpf passado como argumento
};

ValidateCPF.prototype.createDigit = function(partialCpf) {
  const cpfArray = Array.from(partialCpf); // Transforma o argumento passado em array

  let regressiveCount = cpfArray.length + 1; // Cria um contador com o tamanho do array +1
  const total = cpfArray.reduce((ac, val) => { // Faz a conta
    ac += (regressiveCount * Number(val));
    regressiveCount--;
    return ac;
  }, 0);

  const digit = 11 - (total % 11); // Conta
  return digit > 9 ? '0' : String(digit); // Regra de negocio
};

ValidateCPF.prototype.isSequence = function() { // Verifica se o cpf foi enviado em uma sequência de numeros
  const sequence = this.clearCpf[0].repeat(this.clearCpf.length);
  return sequence === this.clearCpf;
};

const cpf = new ValidateCPF('705.484.450-52'); // Cpf gerado aleatoriamente

if(cpf.validate()){
  console.log('Cpf Válido');
} else {
  console.log('Cpf Inválido');
}