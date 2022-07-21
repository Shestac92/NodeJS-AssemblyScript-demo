import { readFileSync } from 'fs';
import * as readline from 'readline';
import { stdin as input, stdout as output } from 'process';

const importObj = {
  index: {
    interrupt: () => { throw new Error('Abort called from wasm file because X = 11') }
  }
};

const rl = readline.createInterface({ input, output });

// const wasmBuffer = readFileSync(`${__dirname}/build/release.wasm`);
const wasmBuffer = readFileSync(`${__dirname}/build/debug.wasm`);
WebAssembly.instantiate(wasmBuffer, importObj).then(wasmModule => {
  const square  = wasmModule.instance.exports.square as CallableFunction;

  const questionUser = () => {
    rl.question('Enter number (except 11) to square\n', answer => {
      if (isNaN(+answer)) return;
      const result = square(+answer);
      console.log(`Result: ${result}`);
      // repeat
      questionUser();
    });
  }

  questionUser();
});

/*
add source map file to the .wat file manually
file:///Users/aleksandrshestakov/projects/wasm-node/build/debug.wasm.map
*/
