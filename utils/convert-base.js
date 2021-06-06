const decimalToBinary = (dnum)=> dnum.toString(2);
const decimalToOctal = (num)=>num.toString(8);
const decimalToHex = (num)=>num.toString(16);

const binaryToDecimal = (num)=>parseInt(num.toString(),2);
const octalToDecimal = (num)=>parseInt(num.toString(),8);
const hexToDecimal = (num)=>parseInt(num.toString(),16);

module.exports = {
    decimalToBinary,decimalToOctal,decimalToHex,binaryToDecimal,octalToDecimal,hexToDecimal
}