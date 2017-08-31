/* ДЗ 2 - работа с исключениями и отладчиком */

/*
 Задача 1:
 Функция принимает массив и фильтрующую фукнцию и должна вернуть true или false
 Функция должна вернуть true только если fn вернула true для всех элементов массива
 Необходимо выбрасывать исключение в случаях:
 - array не массив или пустой массив (с текстом 'empty array')
 - fn не является функцией (с текстом 'fn is not a function')
 Зарпещено использовать встроенные методы для работы с массивами
 */
function isAllTrue(array, fn) {

    if (!Array.isArray(array) || array.length === 0) {
        throw new Error('empty array');
    }

    if (typeof (fn) !== 'function') {
        throw new Error('fn is not a function');
    }

    var result = true;

    for (let i = 0; i < array.length; i++) {
        if (fn(array[i]) != true) {
            result = false;
        }
    }

    return result;
}

/*
 Задача 2:
 Функция принимает массив и фильтрующую фукнцию и должна вернуть true или false
 Функция должна вернуть true если fn вернула true хотя бы для одного из элементов массива
 Необходимо выбрасывать исключение в случаях:
 - array не массив или пустой массив (с текстом 'empty array')
 - fn не является функцией (с текстом 'fn is not a function')
 Зарпещено использовать встроенные методы для работы с массивами
 */
function isSomeTrue(array, fn) {

    if (!Array.isArray(array) || array.length === 0) {
        throw new Error('empty array');
    }

    if (typeof (fn) !== 'function') {
        throw new Error('fn is not a function');
    }

    var result = false;

    for (let i = 0; i < array.length; i++) {
        if (fn(array[i]) == true) {
            result = true;
        }
    }

    return result;
}

/*
 Задача 3:
 Функция принимает заранее неизветсное количество аргументов, первым из которых является функция fn
 Функция должна поочередно запусти fn для каждого переданного аргумента (кроме самой fn)
 Функция должна вернуть массив аргументов, для которых fn выбросила исключение
 Необходимо выбрасывать исключение в случаях:
 - fn не является функцией (с текстом 'fn is not a function')
 */
function returnBadArguments(fn, ...args) {

    if (typeof (fn) !== 'function') {
        throw new Error('fn is not a function');
    }

    var arr = [];

    for (var i = 0; i < args.length; i++) {

        try {

            fn(args[i]);
        }

        catch (e) {
            arr.push(args[i]);
        }
    }

    return arr;
}

/*
 Задача 4:
 Функция имеет параметр number (по умолчанию - 0)
 Функция должна вернуть объект, у которого должно быть несколько методов:
 - sum - складывает number с переданными аргументами
 - dif - вычитает из number переданные аргументы
 - div - делит number на первый аргумент. Результат делится на следующий аргумент (если передан) и так далее
 - mul - умножает number на первый аргумент. Результат умножается на следующий аргумент (если передан) и так далее

 Количество передаваемых в методы аргументов заранее неизвестно
 Необходимо выбрасывать исключение в случаях:
 - number не является числом (с текстом 'number is not a number')
 - какой-либо из аргументов div является нулем (с текстом 'division by 0')
 */
function calculator(number) {

    if (number == void 0) {
        number = 0;
    }

    if (typeof (number) != 'number') {
        throw new Error('number is not a number');
    }

    return {
        sum: function () {
            var result = 0,
                length = arguments.length

            for (var i = 0; i < length; i++) {
                result += arguments[i];
            }

            return number + result;
        },
        dif: function () {
            var result = 0,
                length = arguments.length

            for (var i = 0; i < length; i++) {
                result += arguments[i];
            }

            return number - result;

        },
        div: function () {
            var result = 0,
                length = arguments.length

            for (var i = 0; i < length; i++) {
                if (i == 0) {
                    result = number;
                }

                if (result == 0 || arguments[i] == 0) {
                    throw new Error('division by 0');
                }

                result /= arguments[i];
            }

            return result;

        },
        mul: function () {
            var result = 0,
                length = arguments.length

            for (var i = 0; i < length; i++) {
                if (i == 0) {
                    result = number;
                }

                result *= arguments[i];
            }

            return result;
        }
    }
}

export {
    isAllTrue,
    isSomeTrue,
    returnBadArguments,
    calculator
};
