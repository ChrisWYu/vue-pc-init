export const page404 = {
    path: '*',
    name: '404',
};
export const page403 = {
    path: '/forbidden',
    name: '403',
};
export const otherRouter = {
    path: '/other',
    name: 'other',
};
export const appRouter = {
    path: '/',
    redirect: '/buttonExample',
    name:'app',
    leaf: true,
    icon: 'home',
    component: () => import('../layouts/mainLayout.vue'),
    children: [
        {
            path: 'tableExample',
            name: 'tableExample',
            title: '表格例子',
            icon:'iconweibiaoti--3',
            component: () => import('../pages/tableExample.vue')
        },
        {
            path: 'buttonExample',
            name: 'buttonExample',
            title: '按钮例子',
            icon:'iconweibiaoti--4',
            component: () => import('../pages/buttonExample.vue')
        },
    ]
};
export const routes = [
    page404,
    page403,
    appRouter,
    otherRouter
];