import Notiflix from 'notiflix';
import refs from './refs.js ';
import services from './services.js';
const {getSearchData, createGallery} = services
const { form, gallery, loadMore } = refs;
let search = ''
let images = [];
let page = 1;

const searchImages = async () => {
    try {
        const allData = await getSearchData(search, page);
        allData.hits.forEach(element => {
            images.push(element)
        });

        gallery.innerHTML = createGallery(images);

        if(page === 1){
            if(images.length === 0){
                Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.')
                loadMore.classList.add('hidden')
            }else{
                Notiflix.Notify.success(`Hooray! We found ${allData.totalHits} images.`)
                loadMore.classList.remove('hidden')
            }
        }
    } catch (error) {
        console.error('ERROR:', error);
    }   
}


form.addEventListener('submit', e => {
    e.preventDefault();
    search = form.elements.searchQuery.value;
    page = 1
    images = []
    searchImages()
    
}); 

loadMore.addEventListener('click', async e =>{
    page += 1;
    searchImages()
})

