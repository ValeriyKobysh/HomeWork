/* ДЗ 3 - работа с массивами и объеектами */

/*
 Задача 1:
 Напишите аналог встроенного метода forEach для работы с массивами
 */
function forEach(array, fn) {
    for (var i = 0; i < array.length; i++) {
        fn(array[i], i, array);
    }
}

/*
 Задача 2:
 Напишите аналог встроенного метода map для работы с массивами
 */
function map(array, fn) {
    var newArray = [];

    for (var i = 0; i < array.length; i++) {
        newArray.push(fn(array[i], i, array));
    }

    return newArray;
}

/*
 Задача 3:
 Напишите аналог встроенного метода reduce для работы с массивами
 */
function reduce(array, fn, initial) {

    let previousValue, 
        startPosition = 0;
    
    if (initial === void 0) {
        previousValue = array[0];
        startPosition = 1;
    } else {
        previousValue = initial;
    }

    for (var i = startPosition; i < array.length; i++) {

        previousValue = fn(previousValue, array[i], i, array);
    }

    return previousValue;
}

/*
 Задача 4:
 Функция принимает объект и имя свойства, которое необходиом удалить из объекта
 Функция должна удалить указанное свойство из указанного объекта
 */
function deleteProperty(obj, prop) {

    delete obj[prop];
}

/*
 Задача 5:
 Функция принимает объект и имя свойства и возвращает true или false
 Функция должна проверить существует ли укзаанное свойство в указанном объекте
 */
function hasProperty(obj, prop) {

    return obj.hasOwnProperty(prop);
}

/*
 Задача 6:
 Функция должна получить все перечисляемые свойства объекта и вернуть их в виде массива
 */
function getEnumProps(obj) {

    return Object.keys(obj)
}

/*
 Задача 7:
 Функция должна перебрать все свойства объекта, преобразовать их имена в верхний регистра и вернуть в виде массива
 */
function upperProps(obj) {

    let props = Object.keys(obj);

    let propsUpper = props.map((element) => {
        return element.toUpperCase();
    });

    return propsUpper;
}

/*
 Задача 8 *:
 Напишите аналог встроенного метода slice для работы с массивами
 */
function slice(array, from = 0, to = array.length) {
    
    let value = [],
        length = array.length;

    if (to < 0) { 

        to = length + to 
    }

    if (to > length) {

        to = length
    }

    if (from < 0) {

        if ((length + from) <= 0) {

            from = 0;
        } else {

            from = length + from + 1;
        }
    }
    
    for (let i = from; i < to; i++) {
        value.push(array[i]);
    }
    
    return value
}

/*
 Задача 9 *:
 Функция принимает объект и должна вернуть Proxy для этого объекта
 Proxy должен перехватывать все попытки записи значений свойств и возводить это значение в квадрат
 */
function createProxy(obj) {
    let proxy = new Proxy(obj, {

        set: function(obj, prop, value) {
            obj[prop] = value * value;

            return true
        }
    })

    return proxy;
}

export {
    forEach,
    map,
    reduce,
    deleteProperty,
    hasProperty,
    getEnumProps,
    upperProps,
    slice,
    createProxy
};
