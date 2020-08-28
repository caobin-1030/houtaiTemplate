import Vue from 'vue'
import VueRouter from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

Vue.use(VueRouter)

const routes = [
  // 路由控制
  {
    path: '/',
    name: '/',
    redirect: '/index', // 重定向
    meta: {
      auth: true // 页面鉴权
    },
    component: () => import('../views/Index/Index.vue'),
    children: [
      {
        path: '/index',
        name: '/index',
        component: () => import('../views/Index/Home/Home.vue'),
        meta: {
          auth: true,
          breadcrumbTitle: '首页'
        }
      },
      {
        path: '/notice',
        name: '/notice',
        component: () => import('../views/Index/Notice/Notice.vue'),
        meta: {
          auth: true,
          breadcrumbTitle: '通知公告'
        }
      },
      {
        path: '/excel',
        name: '/excel',
        component: () => import('../views/Index/Excel/Excel.vue'),
        meta: {
          auth: true,
          breadcrumbTitle: '报表管理'
        }
      },
      {
        path: '/user',
        name: '/user',
        component: () => import('../views/Index/User-Center/User.vue'),
        meta: {
          auth: true,
          breadcrumbTitle: '用户中心',
          breadcrumbTitleChildren: '用户管理'
        }
      },
      {
        path: '/backstage-user',
        name: '/backstage-user',
        component: () => import('../views/Index/User-Center/Backstage-user.vue'),
        meta: {
          auth: true,
          breadcrumbTitle: '用户中心',
          breadcrumbTitleChildren: '系统用户管理'
        }
      },
      {
        path: '/role',
        name: '/role',
        component: () => import('../views/Index/User-Center/Role.vue'),
        meta: {
          auth: true,
          breadcrumbTitle: '用户中心',
          breadcrumbTitleChildren: '角色管理'
        }
      },
      {
        path: '/root',
        name: '/root',
        component: () => import('../views/Index/User-Center/Root.vue'),
        meta: {
          auth: true,
          breadcrumbTitle: '用户中心',
          breadcrumbTitleChildren: '权限管理'
        }
      },
      {
        path: '/images',
        name: '/images',
        component: () => import('../views/Index/Files-Center/Images.vue'),
        meta: {
          auth: true,
          breadcrumbTitle: '文件中心',
          breadcrumbTitleChildren: '图片管理'
        }
      },
      {
        path: '/files',
        name: '/files',
        component: () => import('../views/Index/Files-Center/Files.vue'),
        meta: {
          auth: true,
          breadcrumbTitle: '文件中心',
          breadcrumbTitleChildren: '文件管理'
        }
      },
      {
        path: '/region',
        name: '/region',
        component: () => import('../views/Index/Public-Service/Region.vue'),
        meta: {
          auth: true,
          breadcrumbTitle: '公共服务',
          breadcrumbTitleChildren: '城市管理'
        }
      },
      {
        path: '/dictionaries',
        name: '/dictionaries',
        component: () => import('../views/Index/Public-Service/Dictionaries.vue'),
        meta: {
          auth: true,
          breadcrumbTitle: '公共服务',
          breadcrumbTitleChildren: '字典管理'
        }
      },
      {
        path: '/log',
        name: '/log',
        component: () => import('../views/Index/Log-Center/Log.vue'),
        meta: {
          auth: true,
          breadcrumbTitle: '日志记录'
        }
      },
      {
        path: '/download',
        name: '/download',
        component: () => import('../views/Index/Download-Center/Download.vue'),
        meta: {
          auth: true,
          breadcrumbTitle: '下载中心'
        }
      },
      {
        path: '/order',
        name: '/order',
        component: () => import('../views/Index/Order/Order.vue'),
        meta: {
          auth: true,
          breadcrumbTitle: '下载中心'
        }
      },
      {
        path: '/links',
        name: '/links',
        component: () => import('../views/Index/Links/Links.vue'),
        meta: {
          auth: true,
          breadcrumbTitle: '外链管理'
        }
      },
      {
        path: '/system-api',
        name: '/system-api',
        component: () => import('../views/Index/Api-Center/System-Api.vue'),
        meta: {
          auth: true,
          breadcrumbTitle: '接口管理',
          breadcrumbTitleChildren: '系统服务'
        }
      }
    ]
  },
  // 登录页面
  {
    path: '/login',
    name: '/login',
    component: () => import('../views/Login/Index.vue')
  },
  // test页面
  {
    path: '/test',
    name: '/test',
    component: () => import('../views/Test/Index.vue')
  },
  // 帮助中心页面
  {
    path: '/help',
    name: '/help',
    component: () => import('../views/Help/Index.vue')
  },
  // 404页面（必须放在最下面，否则会对已有页面造成阻塞）
  {
    path: '/*',
    name: '/*',
    component: () => import('../views/Error/404.vue')
  }
]

// vueRouter反复点击跳转同一路由报错的解决方案（属于官方bug，此为唯一解决方案）
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  NProgress.start()
  next()
})

router.afterEach(() => {
  NProgress.done()
})

export default router
