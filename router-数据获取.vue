<template>
    <div>
        <h1> router - 数据获取</h1>
        <p> 导航完成之后获取：先完成导航，然后在接下来的组件生命周期钩子中获取数据。在数据获取期间显示 “加载中” 的提示。</p>
        <p> 导航完成之前获取：导航完成前，在路由进入的守卫中获取数据，在数据获取成功后执行导航。</p>

        <h2> 导航完成后获取数据 </h2>
        <p> 当你使用这种方式时，我们会马上导航和渲染组件，然后在组件的 created 钩子中获取数据。 </p>
        <div class="post">
            <div class="loading" v-if="loading">
                Loading...
            </div>

            <div v-if="error" class="error">
                {{ error }}
            </div>

            <div v-if="post" class="content">
                <h2>{{ post.title }}</h2>
                <p>{{ post.body }}</p>
            </div>
        </div>

        <h2> 在导航完成之前获取数据 </h2>
        <p> 在导航转入新的路由前获取数据。我们可以在接下来的组件的 beforeRouteEnter 守卫中获取数据，当数据获取成功后只调用 next 方法。</p>
    </div>
</template>
<script>
// 导航完成后获取数据
export default {
  data() {
    return {
      loading: false,
      post: null,
      error: null
    };
  },
  created() {
    // 组件创建完后获取数据，
    // 此时 data 已经被 observed 了
    this.fetchData();
  },
  watch: {
    // 如果路由有变化，会再次执行该方法
    $route: "fetchData"
  },
  methods: {
    fetchData() {
      this.error = this.post = null;
      this.loading = true;
      // replace getPost with your data fetching util / API wrapper
      getPost(this.$route.params.id, (err, post) => {
        this.loading = false;
        if (err) {
          this.error = err.toString();
        } else {
          this.post = post;
        }
      });
    }
  }
};

//  导航完成前获取数据
export default {
  data () {
    return {
      post: null,
      error: null
    }
  },
  beforeRouteEnter (to, from, next) {
    getPost(to.params.id, (err, post) => {
      next(vm => vm.setData(err, post))
    })
  },
  // 路由改变前，组件就已经渲染完了
  // 逻辑稍稍不同
  beforeRouteUpdate (to, from, next) {
    this.post = null
    getPost(to.params.id, (err, post) => {
      this.setData(err, post)
      next()
    })
  },
  methods: {
    setData (err, post) {
      if (err) {
        this.error = err.toString()
      } else {
        this.post = post
      }
    }
  }
}
</script>

