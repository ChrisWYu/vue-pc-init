import expandTable from './expandTable'
import expandMenu from './expandMenu'
import loading from './loading'

export default {
    install: (Vue) => {
        Vue.component('expandTable', expandTable);
        Vue.component('loading', loading);
        Vue.component('expandMenu', expandMenu);
    }
}