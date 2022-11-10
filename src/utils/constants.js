export const menu = [
    {
        path:'/dashboard',
        name:'Dashboard',
        Icon:'',    
        children:[]   
    },
    {
        path:'/subscription',
        name:'Subscription',
        Icon:'',   
        children:[]    
    },
    {
        path:'/yearbook',
        name:'Year Book',
        Icon:'',       
        children:[]
    },
    {
        path:'/activities',
        name:'Year Book',
        Icon:'',
        children:[
            {
                path:'/job',
                name:'Job Post'
            },
            {
                path:'/scholarship',
                name:'Job Post'
            },
            {
                path:'/donation',
                name:'Job Post'
            },
            {
                path:'/emarket',
                name:'eMarket'
            }
        ]
    },
    {
        path:'/manage',
        name:'Manage Credentials',
        Icon:'',       
        children:[]
    }
];
export const ProviderMenu = [
    {
        path:'/dashboard',
        name:'Dashboard',
        icon:"ni ni-tv-2 text-primary text-sm opacity-10",    
        children:[]   
    },
    {
        path:'/profile',
        name:'Profile',
        icon:'ni ni-single-02 text-primary text-sm opacity-10',       
        children:[]
    }
];

export const BASE_URL = 'https://api.gradbook.app';
export const PROVIDER_LOGIN_ENDPOINT = '/provider/member/login';
export const ADMIN_LOGIN_ENDPOINT = '/provider/member/login';
export const ALUMNI_LOGIN_ENDPOINT = '/provider/member/login';