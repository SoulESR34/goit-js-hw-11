import axios from "axios";

const services = {
    async getSearchData(searched, Numpages){
        const url = 'https://pixabay.com/api/'
        const params = {
            key: '40877193-2f3f91e469707163be2cd03eb',
            q: searched,
            safeSearch: true,
            orientation: "horizontal",
            page: Numpages
        }
        try{
            const response = await axios.get(url, { params })
            const images = response.data;
            return images
        } catch(error){
            console.log('ERROR:', error);
        };
    },

    createGallery(data) {
        const cardsHTML = data.map(element => {
            return `
                <div class="cat__card">
                    <img class="cat__img" src="${element.webformatURL}" alt="photo" loading="lazy">

                    <ul class="cat__info">
                        <li class="cat__data">
                            <h4 class="cat__data__title">Likes</h4>
                            <p class="cat__data__value">${element.likes}</p>
                        </li>

                        <li class="cat__data">
                            <h4 class="cat__data__title">Views</h4> 
                            <p class="cat__data__value">${element.views}</p>
                        </li>

                        <li class="cat__data"> 
                            <h4 class="cat__data__title">Comments</h4>
                            <p class="cat__data__value">${element.comments}</p>
                        </li>

                        <li class="cat__data"> 
                            <h4 class="cat__data__title">Downloads</h4>
                            <p class="cat__data__value">${element.downloads}</p>
                        </li>
                    </ul>
                </div>
                `;
        }).join('');

        return cardsHTML;
    }
}



export default services;