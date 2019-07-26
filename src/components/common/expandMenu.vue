<template>
    <el-menu
            :default-active="default_menu_active" class="el-menu-vertical-demo" @open="handleOpen"
            @close="handleClose"
            @select="handleSelect"
            :collapse="isCollapse"
            :default-openeds="defaultExpandMenu"
    >
        <template v-for="(item,index) in left_menu">
            <template v-if="!item.hidden">
                <template v-if="item.leaf">
                    <el-submenu :index="item.name" v-if="item.children">
                        <template slot="title">
                            <i :class="item.icon"></i>
                            <span>{{item.title}}</span>
                        </template>
                        <el-menu-item-group>
                            <!--<template slot="title" style="display: none"></template>-->
                            <el-menu-item v-for="(it,ind) in item.children" :index="it.name"
                                          :key="it.path">
                                {{it.title}}
                            </el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.name">
                        <i class="icon iconfont" :class="item.icon"></i>
                        <span slot="title"
                              style="margin-left: 14px;letter-spacing:1px;vertical-align: top;">{{item.title}}</span>
                    </el-menu-item>
                </template>
            </template>
        </template>
    </el-menu>
</template>

<script>
    export default {
        mounted() {
            let left_menu = this.left_menu;
            let temp = [];
            for (let i = 0; i < left_menu.length; i++) {
                temp.push(left_menu[i].name);
            }
            let left_menu_children = this.left_menu_children;
            for (let j = 0; j < left_menu_children.length; j++) {
                temp.push(left_menu_children[j].name);
            }
            this.defaultExpandMenu = temp;
        },
        computed: {
            left_menu: function () {
                let router = this.$router.options.routes;
                for (let i = 0; i < router.length; i++) {
                    if (router[i].name === 'app') {
                        return router[i].children;
                    }
                }

            },
            left_menu_children: function () {
                let left_menu = this.left_menu;
                let left_menu_children = [];
                let temp = [];
                for (let i = 0; i < left_menu.length; i++) {
                    if (left_menu[i].children && left_menu[i].children.length) {
                        left_menu_children = left_menu[i].children;
                        for (let j = 0; j < left_menu_children.length; j++) {
                            temp.push(left_menu_children[j]);
                        }
                    }
                }
                return temp;
            },
            default_menu_active: function () {
                let current_name = this.$route.name;
                let is_hidden = current_name.indexOf("/");
                return is_hidden === -1 ? current_name : current_name.substring(0, is_hidden);
            }
        },
        components: {},
        data: function () {
            return {
                test: '&#xe620;',
                defaultExpandMenu: [],
                isCollapse: false
            }
        },
        methods: {
            routeGo(e) {
                this.$router.push({
                    name: e,
                });
            },
            handleOpen() {
                //console.log('handleopen');
            },
            handleClose() {
                //console.log('handleclose');
            },
            handleSelect: function (a, b) {
                this.$router.push({
                    name: a,
                });
            },
        }
    }
</script>
<style>
    #app .el-menu-item {
        height: 44px;
        line-height: 44px;
        margin: 21px 10px 0;
        padding: 0 14px !important;
        font-size: 16px;
        color: #727272;
        border-radius: 2px;
        font-family: "PingFang SC";
    }

    #app .el-menu .el-menu-item.is-active, #app .el-menu .el-menu-item.is-active:hover {
        background-color: rgba(241, 61, 61, 1);
        color: #FFFFFF;
    }

    #app .el-header {
        background-color: #DF0615;
        color: #333;
        line-height: 56px;
        height: 56px !important;
    }

    #app .el-menu-item-group > div {
        padding: 0 !important;
    }

    #app .el-aside {
        border-right: solid 1px #e6e6e6;
    }

    #app .el-menu {
        border-right: 0;
    }

    #app .el-tooltip__popper.is-dark {
        background: rgba(39, 45, 51, 0.7);
    }
</style>