function api(method, params){
    return new Promise((resolve, reject) => {
        VK.Api.call(method, params, data => {
            if (data.error) {
                reject(new Error(data.error.error_msg));
            } else {
                resolve(data.response);
            }
        })
    })
}

class Friends{
    constructor(dataArray = [], favoriteArray = []){
        this.downloadArray = dataArray;                 //downloaded list
        this.filterDownloadArray = this.downloadArray;  //filtered download list
        this.favoriteArray = favoriteArray;                        //favorite list
        this.filterFavoriteArray = this.favoriteArray;  //filtered favorite list
    }

    renderElements(renderArray, side = 'left'){
        let container, wrap;
        if(side === 'left'){
            container = document.querySelector('.left');
        } else if (side === 'right'){
            container = document.querySelector('.right');
        }

        if(renderArray !== void 0){
            container.innerHTML = '';
        } else {
            renderArray = this.downloadArray ;
        }

        renderArray.forEach((element) => {
            let li = `<li id=${element.id} class="friends__item" draggable="true">
                        <span class="friends__avatar"><img src=${element.photo_100} alt=""></span>
                        <span class="friends__name">${element.first_name} ${element.last_name}</span>
                        ${(side === 'right') ? '<button class="friends__remove"></button>' : '<button class="friends__add"></button>' }
                    </li>`
    
            wrap = (wrap !== void 0) ? wrap + li : wrap = li; 
        });
        container.innerHTML = wrap;
    }
/**
 * 
 * @param {string} array - 'download' or other
 * @param {string} chunk 
 */
    filterElements(array, chunk){
        let data = (array === 'download') ? this.downloadArray : this.favoriteArray;
        let filterFriends = (array === 'download') ? this.filterDownloadArray = [] : this.filterFavoriteArray = [];
        data.forEach((element) => {
            let full = `${element.first_name} ${element.last_name}`;
            if (full.toLowerCase().match(chunk.toLowerCase()) !== null) {
                filterFriends.push(element)
            }
        });
        (array === 'download') ? this.renderElements(filterFriends, 'left') : this.renderElements(filterFriends, 'right');
    }

    removeElement(id, index){
        document.getElementById(id).children[index].remove();
    }

    findIndex(array, findData){
        let act
        array.forEach((element, index) => {
            if(element.id == findData){
                act = index;
            }
        });
        return act
    }
/**
 * 
 * @param {number} findData 
 * @param {boolean} favorite - true default. true -> from download to favorite, false -> from favorite to download
 */
    moveElement(findData, favorite = true, dragNDrop = false){
        let delElemDownloadIndex,
            delElementFilterIndex;

        if(favorite){
            delElemDownloadIndex = this.findIndex(this.downloadArray, findData)

            delElementFilterIndex = this.findIndex(this.filterDownloadArray, findData)

            if(delElemDownloadIndex !== void 0) {
                this.favoriteArray.push(this.downloadArray[delElemDownloadIndex])
                this.downloadArray.splice(delElemDownloadIndex, 1);
                if(this.downloadArray.length != this.filterDownloadArray.length) this.filterDownloadArray.splice(delElementFilterIndex, 1);
                if(!dragNDrop) this.removeElement('js-left-friends', delElementFilterIndex)
                this.renderElements(this.favoriteArray, 'right');
            }
        } else {
            delElemDownloadIndex = this.findIndex(this.favoriteArray, findData);
            
            delElementFilterIndex = this.findIndex(this.filterFavoriteArray, findData);
            
            if(delElemDownloadIndex !== void 0) {
                this.downloadArray.push(this.favoriteArray[delElemDownloadIndex])
                this.favoriteArray.splice(delElemDownloadIndex, 1);
                if(this.favoriteArray.length != this.filterFavoriteArray.length) this.filterFavoriteArray.splice(delElementFilterIndex, 1);
                if(!dragNDrop) this.removeElement('js-right-friends', delElementFilterIndex)
                this.renderElements(this.downloadArray, 'left');
            }
        }
    }

    saveData(){
        localStorage.savedDownloadArray = JSON.stringify(this.downloadArray);
        localStorage.savedFavoriteArray = JSON.stringify(this.favoriteArray);
    }
}

const promise = new Promise((resolve, reject) => {
    VK.init({
        apiId: 6193579
    });

    VK.Auth.login(data => {
        if (data.session) {
            resolve(data);
        } else{
            reject(new Error('Can`t connected'));
        }
    }, 8);
})

promise
    .then(data => {
        if(localStorage.hasOwnProperty('savedDownloadArray') && localStorage.hasOwnProperty('savedFavoriteArray')){
            return {
                savedDownloadArray: JSON.parse(localStorage.savedDownloadArray),
                savedFavoriteArray: JSON.parse(localStorage.savedFavoriteArray)
            }
        } else {
            return api('friends.get', {fields: 'nickname,photo_100', v: 5.68})
        }
    })
    .then((data) => {
        let vkFriends
        if('items' in data){
            vkFriends = new Friends(data.items);
        } else {
            vkFriends = new Friends(data.savedDownloadArray, data.savedFavoriteArray);
            vkFriends.renderElements(data.savedFavoriteArray, 'right');
        }
        vkFriends.renderElements();
        return vkFriends;
    })
    .then((vkFriends) => {
        const inputDownload = document.querySelector('#download');
        const inputFavorite = document.querySelector('#favorite');

        inputDownload.addEventListener('input', function() {
            let val = this.value;
            let filterFriends = vkFriends.filterElements('download', val)
        })
        inputFavorite.addEventListener('input', function() {
            let val = this.value;
            let filterFriends = vkFriends.filterElements('favorite', val)
        })

        let leftFriends = document.getElementById('js-left-friends'),
            saveBtn = document.querySelector('.save');
        
        document.addEventListener('click', function(e) {
            let target = e.target,
                targetId = target.parentElement.id;
            if(target.classList.contains('friends__add')){
                vkFriends.moveElement(targetId);
            }
            if(target.classList.contains('friends__remove')){
                vkFriends.moveElement(targetId, false);
            }
        })
        document.addEventListener('dragstart', (e) => {
            let target = e.target;
            if(target.classList.contains('friends__item')){
                e.dataTransfer.setData("text", e.target.id);
                e.dataTransfer.effectAllowed = "move";
            }
        })
        document.addEventListener('dragover', (e) => {
            let target = e.target;
            if(target.classList.contains('friends__list')){
                e.preventDefault();
            }
        })
        document.addEventListener('drop', (e) => {
            let target = e.target;
            if(target.classList.contains('friends__list')){
                let data = e.dataTransfer.getData('text');
                target.appendChild(document.getElementById(data));
                if (target.id == 'js-left-friends') vkFriends.moveElement(data, false, true);
                if (target.id == 'js-right-friends') vkFriends.moveElement(data, true, true);
                e.preventDefault();
            }
        })
        saveBtn.addEventListener('click', () => {
            vkFriends.saveData();
        })
    })