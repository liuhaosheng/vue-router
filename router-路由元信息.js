// --- 路由元信息 --- // 
// 定义路由的时候可以配置 meta 字段：
const router = new VueRouter({
    routes: [{
        path: '/foo',
        component: Foo,
        children: [{
            path: 'bar',
            component: Bar,
            // a meta field
            meta: {
                requiresAuth: true
            }
        }]
    }]
})
// 首先，我们称呼 routers 配置中的每一个路由对象为路由记录。
// 一个路由匹配到的所有记录会暴露为 $router 对象的 $router.metched 数组。
// 因此只需要遍历 $router.metchde 来检查路由记录中的 meta 字段。
router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (!auth.loggedIn()) {
            next({
                path: '/login',
                query: {
                    redirect: to.fullPath
                }
            })
        } else {
            next()
        }
    } else {
        next() // 确保一定要调用 next()
    }
})