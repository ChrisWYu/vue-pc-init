import expandTable from './expandTable'
import loading from './loading'

export default {
    install: (Vue) => {
        Vue.component('expandTable', expandTable);
        Vue.component('loading', loading);
    }
}