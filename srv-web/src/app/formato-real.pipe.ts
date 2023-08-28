import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatoReal'
})
export class FormatoRealPipe implements PipeTransform {
  transform(valor: number, moedaCorrente: string = 'BRL', mostrarCifrao: boolean = true, digits?: string): string {
    if (!valor) {
      return '';
    }
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 
     moedaCorrente }).format(valor);
    }
}