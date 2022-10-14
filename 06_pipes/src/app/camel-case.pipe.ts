import { LowerCasePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'camelCase'
})
export class CamelCasePipe implements PipeTransform {

  transform(value: string): string {
    let vetorPalavras = value.split(' ');
    let vetorPalavrasSemAPrimeira;
    let resultado = '';

    if (vetorPalavras != null) {
      resultado = vetorPalavras[0].toLowerCase();
      vetorPalavrasSemAPrimeira = vetorPalavras.splice(1);
      vetorPalavrasSemAPrimeira.forEach((palavra: string) => {
        resultado += palavra[0].toUpperCase() + palavra.slice(1);
      });
    }

    return resultado;
  }

}
