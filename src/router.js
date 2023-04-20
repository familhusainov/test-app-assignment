import {
    createRouter,
    createWebHashHistory
} from 'vue-router';
const routes = [{
        path: '/',
        name: 'dashboard',
        exact: true,
        component: () => import('./App.vue'),
        meta: {
            requiresAuth: true,
            breadcrumb: [{
                label: ' '
            }],

        },
    },
    {
        path: '/assignment',
        name: 'assignment',
        exact: true,
        component: () => import('./pages/AssignmentPage.vue'),

    }

];
const router = createRouter({
    history: createWebHashHistory(),
    routes,
    scrollBehavior() {
        return {
            left: 0,
            top: 0
        };
    }
});
router.beforeEach((to, from, next) => {
    // handle routes
    next();
});
export default router;