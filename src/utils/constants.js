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
        path:'/alum',
        name:'Alumini',
        icon:'ni ni-single-02 text-primary text-sm opacity-10',       
        children:[]
    },
    {
        path:'/session',
        name:'Session',
        icon:'ni ni-single-02 text-primary text-sm opacity-10',       
        children:[]
    },
    {
        path:'/subscription',
        name:'Subscription',
        Icon:'ni ni-single-02 text-primary text-sm opacity-10',   
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

export const AluminiMenu = [
    {
        path:'/dashboard',
        name:'Dashboard',
        icon:"ni ni-tv-2 text-primary text-sm opacity-10",
        children:[]
    },
    {
        path:'/jobs',
        name:'Jobs',
        icon:'ni ni-single-02 text-primary text-sm opacity-10',
        children:[]
    },
    {
        path:'/emarket',
        name:'Market',
        icon:'ni ni-single-02 text-primary text-sm opacity-10',
        children:[]
    },
    {
        path:'/scholarship',
        name:'Scholarships',
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

export const SCHOOLS_CLASS_LIST= '/school/class/list';
export const SCHOOLS_CLASS_ADD= '/school/class/add';
export const SCHOOLS_CLASS_UPDATE= '/school/class/update';

export const SCHOOLS_YEAR_LIST= '/school/year/list';
export const SCHOOLS_YEAR_ADD= '/school/year/add';
export const SCHOOLS_YEAR_UPDATE= '/school/year/update';


export const SCHOOL_LOGIN_ENDPOINT = '/school/member/login';
export const SCHOOL_REGISTER_ENDPOINT = '/school/register';

export const SCHOOL_SESSION_REGISTER = '/alumni/session/register';
export const SCHOOL_SESSION_DETAILS= '/alumni/session/details';
export const SCHOOL_SESSION_UPDATE= '/alumni/session/update-details';
export const UPLOAD_REGISTER = '/alumni/session/max-register'
export const SCHOOL_SESSION_DELETE = '/alumni/session/remove'


export const SUBSCRIPTION_DETAILS_ENDPOINT= '/subscription/details';
export const SUBSCRIPTION_ADD_ENDPOINT  = '/subscription/add';
export const SUBSCRIPTION_UPDATE_ENDPOINT = '/subscription/update';
export const SUBSCRIPTION_PAYMENT_ENDPOINT  = '/subscription/payment';
export const SUBSCRIPTION_INITIATE_ENDPOINT = '/subscription/initiate-payment';


export const ALUMINI_REGISTER = '/alumni/register';
export const ALUMNI_LOGIN_ENDPOINT = '/alumni/login';
export const ALUMINI_DETAILS = '/alumni/details';
export const ALUMINI_DETAILS_UPDATE = '/alumni/update-details';

export const WALLET_DETAILS = "/wallet/details"
export const WALLET_TRANSACTION = "/wallet/transactions"
export const WALLET_WITHDRAW = "/wallet/withdraw"


export const JOB_ADD = "/job/add"
export const JOB_DETAILS = "/job/details"
export const JOB_UPDATE = "/job/update"


export const SCHOLARSHIP_ADD = "/scholarship/add"
export const SCHOLARSHIP_DETAILS = "/scholarship/details"
export const SCHOLARSHIP_UPDATE = "/scholarship/update"


export const MARKET_ADD = "/market/add"
export const MARKET_DETAILS = "/market/details"
export const MARKET_UPDATE = "/market/update"


export const DONATION_ADD = "/donation/add"
export const DONATION_DETAILS = "/donation/details"
export const DONATION_UPDATE = "/donation/update"
export const DONATION_PAYMENT = "/donation/payment"
export const DONATION_INITIATE = "/donation/initiate-payment"





