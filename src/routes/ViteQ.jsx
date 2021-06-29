import MainDashBoard from 'views/ViteQ/dashboard.jsx'
import User from 'views/ViteQ/users/user'
import Users from 'views/ViteQ/users/users'
import EditUser from 'views/ViteQ/users/edituser'
import Categories from 'views/ViteQ/category/Categories'
import Category from 'views/ViteQ/category/Category'
import EditCategory from 'views/ViteQ/category/editCategory'
import SubCategories from 'views/ViteQ/subCategory/subCategories'
import SubCategory from 'views/ViteQ/subCategory/subCategory'
import SubEditCategory from 'views/ViteQ/subCategory/subeditCategory'
import States from 'views/ViteQ/state/states'
import State from 'views/ViteQ/state/state'
import EditState from 'views/ViteQ/state/editstate'
import Cities from 'views/ViteQ/City/cities'
import City from 'views/ViteQ/City/city'
import EditCity from 'views/ViteQ/City/editcity'
import Categoryfeatue from 'views/ViteQ/categoryFeature/Categoryfeatue'
import CategoryEditfeatue from 'views/ViteQ/categoryFeature/CategoryEditfeatue'
import Listing from 'views/ViteQ/property/listing'
import Listings from 'views/ViteQ/property/listings'
import Calendar from 'views/general/Calendar/Calendar.jsx';
import CategoryFeatures from '../views/ViteQ/categoryFeature/Categoryfeatures';
import BlogCategory from '../views/ViteQ/blogs/blogcategory';
import BlogCategories from '../views/ViteQ/blogs/blogscategory';
import Blog from '../views/ViteQ/blogs/blog';
import Blogs from '../views/ViteQ/blogs/blogs';
import EditBlogCategory from '../views/ViteQ/blogs/editblogcategory';
import EditBlog from '../views/ViteQ/blogs/editblog';



var BASEDIR = process.env.REACT_APP_BASEDIR;

var dashRoutes = [

    //{ path: "#", name: "Main", type: "navgroup"},
    /* { path: BASEDIR+"/dashboard", name: "Dashboard", icon: "dashboard", badge: "", component: General },*/
    { path: BASEDIR + "/home", name: "Home", icon: "home", component: MainDashBoard },

    {


        path: "#", name: "Users", icon: "people", type: "dropdown", parentid: "users",
        child: [
            { path: BASEDIR + "/user/new", name: "Add New" },
            { path: BASEDIR + "/user/view", name: "View Users" },

        ]
    },
    { path: BASEDIR + "/User/New", component: User, type: "child" },
    { path: BASEDIR + "/User/view", component: Users, type: "child" },
    { path: BASEDIR + "/user/edit", component: EditUser, type: "child" },

    
    {


        path: "#", name: "Category", icon: "menu", type: "dropdown", parentid: "categories",
        child: [
            { path: BASEDIR + "/category/new", name: "Add New Category" },
            { path: BASEDIR + "/category/view", name: "View Categories" },
          

        ]
    },
    { path: BASEDIR + "/category/new", component: Category, type: "child" },
    { path: BASEDIR + "/category/view", component: Categories, type: "child" },
    { path: BASEDIR + "/category/edit", component: EditCategory, type: "child" },
    {


        path: "#", name: "Sub Category", icon: "menu", type: "dropdown", parentid: "categories",
        child: [
            { path: BASEDIR + "/subcategory/new", name: "Add New Sub Category" },
            { path: BASEDIR + "/subcategory/view", name: "View Sub Categories" },
            { path: BASEDIR + "/subcategory/feature/new", name: "Add New Category Features" },
            { path: BASEDIR + "/subcategory/feature/view", name: "View Category Features" },
        ]
    },
    { path: BASEDIR + "/subcategory/new", component: SubCategory, type: "child" },
    { path: BASEDIR + "/subcategory/view", component: SubCategories, type: "child" },
    { path: BASEDIR + "/subcategory/edit", component: SubEditCategory, type: "child" },
    { path: BASEDIR + "/subcategory/feature/new", component: Categoryfeatue, type: "child" },
    { path: BASEDIR + "/subcategory/feature/view", component: CategoryFeatures, type: "child" },
    { path: BASEDIR + "/subcategory/feature/edit", component: CategoryEditfeatue, type: "child" },

    {


        path: "#", name: "Listings", icon: "list", type: "dropdown", parentid: "listings",
        child: [
            { path: BASEDIR + "/listing/add", name: "Add New Listing" },
            { path: BASEDIR + "/listing/view", name: "View Listings" },
      

        ]
    },
    { path: BASEDIR + "/listing/add", component: Listing, type: "child" },
    { path: BASEDIR + "/listing/view", component: Listings, type: "child" },
    
    {


        path: "#", name: "States", icon: "list", type: "dropdown", parentid: "listings",
        child: [
            { path: BASEDIR + "/state/new", name: "Add New State" },
            { path: BASEDIR + "/state/view", name: "View States" },
            
        ]
    },
    { path: BASEDIR + "/state/new", component: State, type: "child" },
    { path: BASEDIR + "/state/view", component: States, type: "child" },
    { path: BASEDIR + "/state/Edit", component: EditState, type: "child" },
    
    {


        path: "#", name: "Cities", icon: "list", type: "dropdown", parentid: "listings",
        child: [
            { path: BASEDIR + "/city/new", name: "Add New City" },
            { path: BASEDIR + "/city/view", name: "View Cities" },
            
        ]
    },
    { path: BASEDIR + "/city/new", component: City, type: "child" },
    { path: BASEDIR + "/city/view", component: Cities, type: "child" },
    { path: BASEDIR + "/city/Edit", component: EditCity, type: "child" },
   
    {


        path: "#", name: "Blogs", icon: "notebook", type: "dropdown", parentid: "blogs",
        child: [
            { path: BASEDIR + "/blogs/category/new", name: "Add New Blog Category" },
            { path: BASEDIR + "/blogs/category/view", name: "View Blogs Categories" },
            { path: BASEDIR + "/blogs/new", name: "Add New Blog" },
            { path: BASEDIR + "/blogs/view", name: "View Blogs" },
         

        ]
    },
    { path: BASEDIR + "/blogs/category/new", component: BlogCategory, type: "child" },
    { path: BASEDIR + "/blogs/category/view", component: BlogCategories, type: "child" },
    { path: BASEDIR + "/blogs/category/Edit", component: EditBlogCategory, type: "child" },
    { path: BASEDIR + "/blogs/new", component: Blog, type: "child" },
    { path: BASEDIR + "/blogs/view", component: Blogs, type: "child" },
    { path: BASEDIR + "/blogs/Edit", component: EditBlog, type: "child" },
   

    { path: BASEDIR + "/calendar1", name: "About", icon: "direction", component: Calendar },
    { path: BASEDIR + "/calendar1", name: "Contact Us", icon: "phone", component: Calendar },
    { path: BASEDIR + "/logout", name: "Logout", icon: "logout", component: Calendar, type: "logout" },
  //  {
    //     path: "#", name: "Dashboards", icon: "speedometer", type: "dropdown", parentid: "dashboards",
    //     child: [
    //         { path: BASEDIR + "/dashboard2", name: "Dashboard 2" },
           
    //     ]
    // },

    // { path: BASEDIR + "/dashboard2", component: Dashboard2, type: "child" },
 
    { redirect: true, path: BASEDIR + "/", pathTo: BASEDIR + "/home", name: "Dashboard" },
    { redirect: true, path: "/", pathTo: BASEDIR + "/home", name: "Dashboard" }

];
export default dashRoutes;
