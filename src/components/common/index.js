import expandTable from './expandTable'
import expandMenu from './expandMenu'
import expandLoading from './expandLoading'

export default {
    install: (Vue) => {
        Vue.component('expandTable', expandTable);
        Vue.component('expandLoading', expandLoading);
        Vue.component('expandMenu', expandMenu);
    }
}