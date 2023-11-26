import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Camera } from 'expo-camera';

import { BarCodeScanner } from "expo-barcode-scanner";



export default class TransactionScreen extends Component {
   //Desafio 1: Definir os estados iniciais em nosso App:
   constructor(props){
    super(props);
    this.state = {
      domState: "normal", //Estado do modo: Modo Digitalizar ou Modo Digitalizado
      hasCameraPermissions: null, //Estado de permissões: Se o usuário deu ou não permissão 
      scanned: false, //Estado Digitalizado: Digitalização foi concluída ou não.
      scannedData: "" //Estado dos dados digitalizados: Mantendo os dados após a digitalização
    };
  }

     //Desafio 2: Criar a função para solicitar permissão para a câmera
     getCameraPermissions = async (domState) => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      this.setState({
        hasCameraPermissions: status === "granted",
        domState: domState,
        scanned: false,
      });
    };
    

 //Desafio 5: Criar função para digitalização concluída
 handleBarCodeScanned = async ({ type, data }) => {
  this.setState({
    scannedData: data,
    domState: "normal",
    scanned: true
  });
};
render() {
  //Desafio 3: Chamar os estados iniciais
  const { domState, hasCameraPermissions, scannedData, scanned } = this.state;
  
  //Desafio 6: Condição para análise de "domState" para ação de scanear
  if (domState === "scanner") {
    return (
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
    );
  }
     //Desafio 4: Depois de View, ANTES TouchableOpacity exibir um texto "Solicitar permissão da câmera?"
     return (
      <View style={styles.container}>
        <Text style={styles.text}>
          {hasCameraPermissions 
            ? scannedData 
            : "Solicitar permissão da Camera"
          }
        </Text>
        <TouchableOpacity 
          style = {styles.button}
          onPress={() => this.getCameraPermissions("scanner")}
        >
          <Text style = {styles.buttonText}> Digitalizar QRCode </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#5653D4"
  },
  text: {
    color: "#ffff",
    fontSize: 30
  },
  button: {
    width: "43%",
    marginTop: 25,
    height: 55,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F48D20",
    borderRadius: 15
  },
  buttonText: {
    fontSize: 15,
    color: "#FFFFFF"
  }
});