import React, { Component } from "react"
import { StyleSheet, Text, SafeAreaView, View } from "react-native";

import Button from "./src/components/Button";
import Display from "./src/components/Display";

const inicialState = {
  displayValue: "0",
  clearDisplay: false,
  operation: null,
  values: [0, 0],
  current: 0,
};

export default class App extends Component {
  //Com os tres pontos ele faz um clone do objeto acima e nao exatamente o objeto mesmo
  state = { ...inicialState };

  addDigit = (n) => {
      
    //Dessa forma se o primeiro numero for zero, ele nao aceitará 00, mas sim deixara somente 0 EX: 08 ficará somente 8
    const clearDisplay = this.state.displayValue === '0' || this.state.clearDisplay
    
    //console.debug(typeof this.state.displayValue)
    //Dessa forma se foi colocado o primeiro ponto, não irá adicionar novamente um segundo ponto
    //O includes procura a string solicitada dentro da variavel
    if (n === '.' && !clearDisplay && this.state.displayValue.includes('.')) {
    return
  }
   

    //Aqui ele pega o valor atual, se a tela for zerada, ele vai pegar o valor vazio, caso contrário pega o valor do display
    const currentValue = clearDisplay ? '' : this.state.displayValue
    //Concatena os valores digitados para formar o numero certinho 1 2 7 vai ficar 127
    const displayValue = currentValue + n
    
    //Aqui faz a exibicao do numero montado e também seta com o clearDisplay como false
    this.setState({displayValue, clearDisplay:false})

    if (n !=='.'){

      const newValue = parseFloat(displayValue)
      //Somente para constar que ... é um operador spread
      const values = [...this.state.values]

      values [this.state.current]= newValue
      this.setState({values})
    }
  };

  clearMemory = () => {
    this.setState({ ...inicialState });
  };
  setOperation = operation => {
    if (this.state.current === 0) {
      this.setState({ operation, current: 1, clearDisplay: true })
    } else {
      const equals = operation === '='
      const values = [...this.state.values]
      try {
        //Eval faz a soma de valores de forma declarada e atribui o valor na primeira posicao do array
        values[0] = eval(`${values[0]} ${this.state.operation} ${values[1]}`)

      } catch (e) {
        //Se for feito uma operacao e der erro, ele irá voltar o
        values[0] = this.state.values[0]
      }

      values[1] = 0
      this.setState({
       //O resultado sempre irá para o indice 0 mas também com o template string irá garantir que fique como string. Comentado codigo com erro
      // displayValue: values[0],
       displayValue: `${values[0]}`,
        operation: equals ? null : operation,

        current: equals ? 0 : 1,
        //clearDisplay: !equals,
        clearDisplay: true,
        values,
      })
    }

  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Display value={this.state.displayValue} />
        <View style={styles.buttons}>
          <Button label="AC" triple onClick={this.clearMemory} />
          <Button label="/" operation onClick={() => this.setOperation("/")} />
          <Button label="7" onClick={this.addDigit} />
          <Button label="8" onClick={this.addDigit} />
          <Button label="9" onClick={this.addDigit} />
          <Button label="*" operation onClick={this.setOperation} />
          <Button label="4" onClick={this.addDigit} />
          <Button label="5" onClick={this.addDigit} />
          <Button label="6" onClick={this.addDigit} />
          <Button label="-" operation onClick={this.setOperation} />
          <Button label="1" onClick={this.addDigit} />
          <Button label="2" onClick={this.addDigit} />
          <Button label="3" onClick={this.addDigit} />
          <Button label="+" operation onClick={this.setOperation} />
          <Button label="0" double onClick={this.addDigit} />
          <Button label="." onClick={this.addDigit} />
          <Button label="=" operation onClick={this.setOperation} />
        </View>
      </SafeAreaView>
    );
  }
}
styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttons: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
});
