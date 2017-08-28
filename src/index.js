/* ДЗ 1 - Функции */

/*
 Задание 1:

 Функция должна принимать один аргумент и возвращать его
 */
function returnFirstArgument(a) 
{
    return a;
}

/*
Задание 2:

Функция должна принимать два аргумента и возвращать сумму переданных значений
Значение по умолчанию второго аргумента должно быть 100
*/
function defaultParameterValue(a, b) 
{
    if(b === void 100)
        {
            var b = 100;
        }
    return a + b;
}

/*
Задание 3:

Функция должна возвращать все переданные в нее аргументы в виде массива
Количество переданных аргументов заранее неизвестно
*/
function returnArgumentsArray() {
var argsLength = arguments.length,
    argsArray = [];
for (var i = 0; i < argsLength; i++) {
    argsArray.push(arguments[i]);
}

return argsArray;
}

/*
Задание 4:

Функция должна принимать другую функцию и возвращать результат вызова переданной функции
*/
function returnFnResult(fn) {
    return fn();
}

/*
Задание 5:

Функция должна принимать число (значение по умолчанию - 0) и возвращать функцию (F)
При вызове F, переданное число должно быть увеличено на единицу и возвращено из F
*/
function returnCounter(number) {
    if (number === void 0) {
        number = 0;
    }

    function F() {
        return ++number;
    }

    return F;
}

/*
Задание 6 *:

Функция должна принимать другую функцию (F) и некоторое количество дополнительных аргументов
Функция должна привязать переданные аргументы к функции F и вернуть получившуюся функцию
*/
function bindFunction(fn) {
    
    var args = [].slice.call(arguments).slice(1);
    
    fn = fn.bind(fn, ...args);

    return fn;
}



export {
returnFirstArgument,
defaultParameterValue,
returnArgumentsArray,
returnFnResult,
returnCounter,
bindFunction
}
