/* ДЗ 6.1 - Асинхронность и работа с сетью */

/**
 * Функция должна создавать Promise, который должен быть resolved через seconds секунду после создания
 *
 * @param {number} seconds - количество секунд, через которое Promise должен быть resolved
 * @return {Promise}
 */
function delayPromise(seconds) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, seconds * 1000)
    })
}

/**
 * Функция должна вернуть Promise, который должен быть разрешен массивом городов, загруженным из
 * https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json
 * Элементы полученного массива должны быть отсортированы по имени города
 *
 * @return {Promise<Array<{name: String}>>}
 */
function loadAndSortTowns() {
    return new Promise((resolve) => {
        let cityList = new XMLHttpRequest();

        cityList.open('GET', 'https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json')
        cityList.send();
        cityList.addEventListener('load', () => {

            let newCityList = JSON.parse(cityList.response).slice().sort(function (a, b) {

                let first = a.name,
                    second = b.name;
                if (first < second) {
                    
                    return -1;
                } else if (first > second) {

                    return 1
                }
                
                return 0;
            })
            resolve(newCityList)
        })
    })
}

export {
    delayPromise,
    loadAndSortTowns
};
