import React from 'react';
import { createBrowserHistory } from 'history';
import {
    Router,
    Route,
    Switch
} from 'react-router-dom';
import {useSelector,useDispatch} from 'react-redux'
import indexRoutes from 'routes/index.jsx';
import AuthRoutes from 'routes/auth'
const hist = createBrowserHistory();

export default ()=>{
    const user=useSelector(x=>x.User);
    return   <Router history={hist} basename={process.env.REACT_APP_BASEDIR}>
    <Switch>
        {
           user!=undefined || user!=null?indexRoutes.map((prop,key) => {
            //console.log(prop.path + prop.key);
            return ( 
                <Route
                    path={prop.path}
                    key={key}
                    component={prop.component}
                />
            );
        }):AuthRoutes.map((prop,key) => {
            //console.log(prop.path + prop.key);
            return ( 
                <Route
                    path={prop.path}
                    key={key}
                    component={prop.component}
                />
            );
        })
            
        }
    </Switch>
</Router>

}