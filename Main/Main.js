import {Playground} from '../Packages/Components/Playground/Playground.js';


let playground = new Playground({language: 'python'});

playground.text = `
def fib():
    a, b = 1, 1
    while True:
        yield a
        a, b = b, a + b

for index, x in enumerate(fib()):
    if index == 10:
        break
    print("%s" % x)
`;
