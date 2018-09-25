// --- 过渡动效 --- // 

// 使用 transition 添加过渡效果
//<transition>
//<router-view></router-view>
//</transition>

// 基于路由 的动态过渡 
// 使用动态的  transition name
{
    /* <transition :name="transitionName">
      <router-view></router-view>
    </transition> */
}
// 在父组件内 watch  $router 决定使用哪种过渡
// watch: {
//     '$route'(to, from) {
//         const toDepth = to.path.split('/').length
//         const fromDepth = from.path.split('/').length
//         this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
//     }
// }