
export function toCurrency(number: Number): string {
    return number.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

export function toCurrencyNumber(stringValue: string): number {
    return parseFloat(stringValue.replace("R$", "").replace(",", "."));
}