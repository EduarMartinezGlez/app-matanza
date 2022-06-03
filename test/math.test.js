//import {suma} from '../test'
const suma = require('../test');

describe('calc mat', ()=>{

    test ('add 1 + 2 to equal 3', ()=>{
        expect(suma(1,1)).toBe(2)
    })
})