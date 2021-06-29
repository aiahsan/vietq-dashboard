import React from 'react';
import {
    Row, Col,
} from 'reactstrap';

import {

} from 'components';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { repository } from 'utiles/repository';
import { useDispatch, useSelector } from 'react-redux';
import { Login } from 'redux/actionMethodes/User/index'
const DisplayingErrorMessagesSchema = Yup.object().shape({

    password: Yup.string()
        .required('Required'),
    //.matches(
    //     /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
    //     "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
    // ),
    username: Yup.string()
        .required('Required'),
});
export default () => {
    const dispatch = useDispatch();
    const postCat = async (datapost) => {
        const { data, status } = await repository.login(datapost).then(x => x).then(x => x)
        console.log(data, status)
        if (data && data.status === 200 && data.success === true) {
            if (data.response.user) {
                dispatch(Login(data.response.user));
            }

        }
        else {

        }

    }
    return <Formik
        initialValues={{
            username: '',
            password: '',
        }}
        validationSchema={DisplayingErrorMessagesSchema}
        onSubmit={async (values, { setSubmitting }) => {
            await postCat(values)
        }}
    >
        {({ errors, touched, getFieldProps }) => {
            // cstErrors = errors;

            return (
                <div>
                    <div className="wrapper login_page">
                        <Row>
                            <Col xs={12} md={12}>

                                <div className="container-fluid">
                                    <div className="login-wrapper row">
                                        <div id="login" className="login loginpage offset-xl-4 offset-lg-3 offset-md-3 offset-0 col-12 col-md-6 col-xl-4">
                                            <h1><a href="#!" title="Login Page" tabIndex="-1">&nbsp;</a></h1>

                                            <Form>
                                                <p>
                                                    <label htmlFor="user_login">Username<br />
                                                        <input {...getFieldProps("username")}  className="form-control" />
                                                        {touched.username && errors.username && <div style={{ color: 'red', marginTop: 10 }}>{errors.password}</div>}

                                                    </label>
                                                </p>
                                                <p>
                                                    <label htmlFor="user_pass">Password<br />
                                                        <input  {...getFieldProps("password")} type="password"  className="input" size="20" /></label>
                                                    {touched.password && errors.password && <div style={{ color: 'red', marginTop: 10, maxWidth: 320 }}>{errors.password}</div>}

                                                </p>
                                                <p className="submit">
                                                    <input type="submit" name="wp-submit" id="wp-submit" className="btn btn-accent btn-block" value="Sign In" />
                                                </p>

                                            </Form>




                                        </div>
                                    </div>
                                </div>






                            </Col>

                        </Row>
                    </div>
                </div>

            )

        }}
    </Formik>
}