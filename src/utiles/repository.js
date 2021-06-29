import {api} from './baseUrl';
const headers={ headers: { 'secret': '064422b802876605155a4a549b3a6195', 'user_id':'1' } }
const login =async (data)=>{
   return await api.post('/login',data) 
}
const register =async (data)=>{
   return await api.post('/register',data) 
}
const add_category =async (data)=>{
   return await api.post('/add_category',data,headers) 
}
const add_state =async (data)=>{
   return await api.post('/add_states',data,headers) 
}
const add_city =async (data)=>{
   return await api.post('/add_cities',data,headers) 
}

const getCategories =async ()=>{
   return await api.get('/getCategories',headers) 
}
const getSubCategories =async ()=>{
   return await api.get('/getSubCategories',headers) 
}
const catsOnly =async ()=>{
   return await api.get('/catsOnly',headers) 
}
const users =async ()=>{
   return await api.get('/users',headers) 
}
const get_states =async ()=>{
   return await api.get('/get_states',headers) 
}
const get_blogs =async ()=>{
   return await api.get('/get_blogs',headers) 
}
const getProducts =async ()=>{
   return await api.get('/getProducts',headers) 
}
const get_blog_categories =async ()=>{
   return await api.get('/get_blog_categories',headers) 
}
const get_cities =async ()=>{
   return await api.get('/get_cities',headers) 
}
const add_category_feature =async (data)=>{
   return await api.post('/add_category_feature',data,headers) 
}
const add_blog_category =async (data)=>{
   return await api.post('/add_blog_category',data,headers) 
}

const delete_category =async (data)=>{
   return await api.post('/delete_category',data,headers) 
}
const delete_blog =async (data)=>{
   return await api.post('/delete_blog',data,headers) 
}
const delete_category_feature =async (data)=>{
   return await api.post('/delete_category_feature',data,headers) 
}
const delete_states =async (data)=>{
   return await api.post('/delete_states',data,headers) 
}
const delete_blog_category =async (data)=>{
   return await api.post('/delete_blog_category',data,headers) 
}

const delete_cities =async (data)=>{
   return await api.post('/delete_cities',data,headers) 
}
const delete_user =async (data)=>{
   return await api.post('/delete_user',data,headers) 
}
const delete_product =async (data)=>{
   return await api.post('/delete_product',data,headers) 
}
const add_product =async (data)=>{
   return await api.post('/add_product',data,headers) 
}
const add_blog =async (data)=>{
   return await api.post('/add_blog',data,headers) 
}
const edit_profile =async (data)=>{
   return await api.post('/edit_profile',data,headers) 
}
const edit_category =async (data)=>{
   return await api.post('/edit_category',data,headers) 
}
const edit_blog_category =async (data)=>{
   return await api.post('/edit_blog_category',data,headers) 
}
const edit_states =async (data)=>{
   return await api.post('/edit_states',data,headers) 
}
const edit_category_feature =async (data)=>{
   return await api.post('/edit_category_feature',data,headers) 
}
const edit_cities =async (data)=>{
   return await api.post('/edit_cities',data,headers) 
}
const edit_blog =async (data)=>{
   return await api.post('/edit_blog',data,headers) 
}

export const repository= {
    login,
    register,
    add_category,
    getCategories,
    add_category_feature,
    add_state,
    add_city,
    delete_category,
    catsOnly,
    delete_category_feature,
    getSubCategories,
    add_product,
    get_states,
    delete_states,
    get_cities,
    delete_cities,
    add_blog_category,
    get_blog_categories,
    delete_blog_category,
    add_blog,
    users,
    edit_profile,
    delete_user,
    edit_category,
    edit_category_feature,
    getProducts,
    delete_product,
    edit_states,
    edit_cities,
    edit_blog_category,
    get_blogs,
    delete_blog,
    edit_blog
}