import React, { useState, useEffect } from 'react';
import {
    Row, Col, Label, Input,
} from 'reactstrap';
import InputMask from 'react-input-mask';
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import * as Yup from 'yup';
import { Formik, Form } from 'formik';
import { repository } from '../../../utiles/repository'
import TagsInput from 'react-tagsinput'
import LoadingBar from 'react-top-loading-bar'
import NotificationAlert from 'react-notification-alert';


let cstErrors;

const DisplayingErrorMessagesSchema = Yup.object().shape({
    name: Yup.string().required('Required'),
    category_id: Yup.string().required('Required'),
    input_type: Yup.string().required('Required'),
    // options:Yup.array().min(1)
});



export default (props) => {

    console.log(props,"props")
    const [loaderMain, setloaderMain] = useState(false);

    let [subcategoriesMain, setsubcategoriesMain] = React.useState([]);
    const [showAnimation, setshowAnimation] = React.useState(false);
    let [categories, setcategories] = useState([]);
    const [tags, settags] = useState(props.location&&props.location.state&&props.location.state.data&&props.location.state.data.options?props.location.state.data.options:[]);
    const [progress, setProgress] = useState(0)
    const refContainer = React.useRef(null);
    const [inputTypes, setinputTypes] = useState(["dropdown", "range", "radio", "checkbox"])
    const [hasrange, sethasrange] = useState(false);

    const refmin = React.useRef(null);
    const refmax = React.useRef(null);

    const postData = async (datapost) => {
        setProgress(50);

        const postData = { ...datapost };
        if (hasrange == true) {

            tags[0] = refmin.current.value
            tags[1] = refmax.current.value
        }
        postData.options = JSON.stringify(tags);
        console.log(postData)

        const { data, status } = await repository.edit_category_feature(postData).then(x => x).then(x => x)

        console.log(data, status)
        if (data && data.status == 200 && data.success == true) {
            setshowAnimation(false)
            if (data.response.attribute) {
                setProgress(100);
                notify("tr", 1, data.message);

                // dispatch(updateUser(data.response.user));
                // alert(data.message)
                // dispatch(saveToken(data.response.user.token));
            }

        }
        else {
            // alert(data.message, "Error")
            notify("tr", 4, data.message);

            setshowAnimation(false)
            setProgress(100);
        }
        setProgress(0);


    }

    const notify = (place, color, message) => {

        var type;
        switch (color) {
            case 1:
                type = 'primary';
                break;
            case 2:
                type = 'success';
                break;
            case 3:
                type = 'danger';
                break;
            case 4:
                type = 'warning';
                break;
            case 5:
                type = 'info';
                break;
            default:
                break;
        }
        var options = {};
        options = {
            place: place,
            message: (
                <div className="notification-msg">
                    <div>
                        {message}
                    </div>
                </div>
            ),
            type: type,
            icon: "",
            autoDismiss: 5,
        }
        refContainer.current.notificationAlert(options);
    }
    useEffect(() => {

        const getData = async () => {
            const { data, status } = await repository.catsOnly().then(x => x).then(x => x);
            if (data && data.status == 200 && data.success == true) {
                setshowAnimation(false)
                if (data.response.categories) {
                    let subCat = [];
                    data.response.categories.map(x => {
                        console.log(x, "xxx")
                        x.sub_categories.map(y => {
                            subCat.push(y);
                        })
                    });
                    setcategories(subCat);

                    // dispatch(updateUser(data.response.user));
                    // alert(data.message)
                    // dispatch(saveToken(data.response.user.token));
                }

            }
            else {
                // alert(data.message, "Error")
                setshowAnimation(false)
            }
        }
        getData();
    }, []);
    const handleChange = (tags) => { settags(tags) }
    return (loaderMain ? <></> : <Formik
        initialValues={{
            feature_id:props.location&&props.location.state&&props.location.state.data&&props.location.state.data.id?props.location.state.data.id:"",
            name: props.location&&props.location.state&&props.location.state.data&&props.location.state.data.name?props.location.state.data.name:"",
            category_id: props.location&&props.location.state&&props.location.state.data&&props.location.state.data.category_id?props.location.state.data.category_id:"",
            input_type:props.location&&props.location.state&&props.location.state.data&&props.location.state.data.input_type?props.location.state.data.input_type:"",
            
        }}
        validationSchema={DisplayingErrorMessagesSchema}
        onSubmit={async (values, { setSubmitting }) => {
            await postData(values)
        }}
    >
        {({ errors, touched, getFieldProps, setFieldValue, initialValues }) => {
            cstErrors = errors;

            return (
                <Form>
                    <LoadingBar color="#f11946" progress={progress} height={5} onLoaderFinished={() => setProgress(100)} />

                    <NotificationAlert className="sdfsdfdsf" ref={refContainer} />





                    <div>
                        <div className="content">
                            <Row>
                                <Col xs={12} md={12}>

                                    <div className="page-title">
                                        <div className="float-left">
                                            <h1 className="title">Edit Sub Category Feature</h1>
                                        </div>
                                    </div>





                                    <div className="row margin-0">
                                        <div className="col-12">
                                            <section className="box ">
                                                <header className="panel_header">
                                                    <h2 className="title float-left">Basic Info</h2>

                                                </header>
                                                <div className="content-body">
                                                    <div className="row">
                                                        <div className="col-12 col-sm-12 col-md-10 col-lg-10 col-xl-8">

                                                            <form>
                                                                <div className="form-row">
                                                                    <div className="form-group col-md-6">
                                                                        <label htmlFor="inputState">Sub Category</label>
                                                                        <select value={initialValues.category_id}  {...getFieldProps("category_id")} onChange={(e) => {
                                                                            setFieldValue("category_id", e.target.value)
                                                                        }} className="form-control">
                                                                            <option value={0} >Select Sub Category</option>
                                                                            {categories.map((x, i) => <option ket={i} value={x.id} >{x.name}</option>)}


                                                                        </select>
                                                                        {touched.category_id && errors.category_id && <div style={{ color: 'red', marginTop: 10 }}>{errors.category_id}</div>}

                                                                    </div>
                                                                    <div className="form-group col-md-6">
                                                                        <label htmlFor="inputname4">Name</label>
                                                                        <input  {...getFieldProps("name")} type="text" className="form-control" id="inputname4" placeholder="" />
                                                                        {touched.name && errors.name && <div style={{ color: 'red', marginTop: 10 }}>{errors.name}</div>}

                                                                    </div>
                                                                    <div className="form-group col-md-6">
                                                                        <label htmlFor="inputname4">Input Type</label>
                                                                        <select  value={initialValues.input_type} {...getFieldProps("input_type")} onChange={(e) => {
                                                                            setFieldValue("input_type", e.target.value)
                                                                            if (e.target.value == "range")
                                                                                sethasrange(true)
                                                                            else
                                                                                sethasrange(false)
                                                                        }} className="form-control">
                                                                            <option value={0} >Select Input Type</option>
                                                                            {inputTypes.map((x, i) => <option ket={i} value={x} >{x}</option>)}


                                                                        </select>
                                                                        {touched.input_type && errors.input_type && <div style={{ color: 'red', marginTop: 10 }}>{errors.input_type}</div>}

                                                                    </div>
                                                                    <div className="form-group col-md-12">
                                                                        <label htmlFor="inputname4">Values</label>
                                                                        {
                                                                            hasrange ? <>
                                                                                <div className="row">
                                                                                    <div className="form-group col-md-6">
                                                                                        <label htmlFor="inputname4">Minimum</label>
                                                                                        <input ref={refmin} required type="text" className="form-control" id="minval" placeholder="Min Value" />

                                                                                    </div>
                                                                                    <div className="form-group col-md-6">
                                                                                        <label htmlFor="inputname4">Minimum</label>
                                                                                        <input required ref={refmax} type="text" className="form-control" id="minval" placeholder="Max value" />

                                                                                    </div>
                                                                                </div>
                                                                            </> : <TagsInput value={tags} onChange={handleChange} />
                                                                        }

                                                                    </div>


                                                                </div>



                                                                <button disabled={showAnimation} type="submit" className="btn btn-primary">Save</button>
                                                            </form>

                                                        </div>
                                                    </div>

                                                </div>
                                            </section></div>


                                    </div>







                                </Col>

                            </Row>
                        </div>
                    </div>


                </Form>
            )

        }}
    </Formik>
    )

}
