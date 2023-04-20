import {API} from './js/api.js'
import {VIEW} from './js/view.js'
import {Search} from './js/search.js'

const api = new API();

new Search(api, new VIEW(api));
