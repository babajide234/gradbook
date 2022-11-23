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
        path:'/schools',
        name:'Schools',
        icon:'ni ni-single-02 text-primary text-sm opacity-10',       
        children:[]
    },
    {
        path:'/subscription',
        name:'Subscriptions',
        icon:'ni ni-single-02 text-primary text-sm opacity-10',       
        children:[]
    },
    {
        path:'/profile',
        name:'Profile',
        icon:'ni ni-single-02 text-primary text-sm opacity-10',       
        children:[]
    }
];
export const SchoolMenu = [
    {
        path:'/dashboard',
        name:'Dashboard',
        icon:"ni ni-tv-2 text-primary text-sm opacity-10",    
        children:[]   
    },
    {
        path:'/class',
        name:'Class',
        icon:'ni ni-single-02 text-primary text-sm opacity-10',       
        children:[]
    },
    {
        path:'/year',
        name:'Year',
        icon:'ni ni-single-02 text-primary text-sm opacity-10',       
        children:[]
    },
    {
        path:'/donations',
        name:'Donations',
        icon:'ni ni-single-02 text-primary text-sm opacity-10',       
        children:[]
    },
    {
        path:'/wallet',
        name:'Wallets',
        icon:'ni ni-single-02 text-primary text-sm opacity-10',       
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

// PROVIDER ENDPOINTS
export const PROVIDER_LOGIN_ENDPOINT = '/provider/member/login';
export const PROVIDER_DETAILS = '/provider/member/details';
export const PROVIDER_UPDATE_DETAILS = '/provider/member/update-details';
export const PROVIDER_METRICS = '/provider/metrics';


export const SCHOOLS_DETAILS= '/school/details';
export const SCHOOL_LOGIN_ENDPOINT = '/school/member/login';
export const SCHOOL_REGISTER_ENDPOINT = '/school/register';


export const SUBSCRIPTION_DETAILS_ENDPOINT = '/subscription/details';
export const SUBSCRIPTION_ADD_ENDPOINT = '/subscription/add';
export const SUBSCRIPTION_UPDATE_ENDPOINT = '/subscription/update';
export const SUBSCRIPTION_PAYMENT_ENDPOINT = '/subscription/payment';
export const SUBSCRIPTION_INITIATE_ENDPOINT = '/subscription/initiate-payment';


export const ALUMNI_LOGIN_ENDPOINT = '/alumni/login';