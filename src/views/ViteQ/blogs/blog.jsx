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
import LoadingBar from 'react-top-loading-bar'
import NotificationAlert from 'react-notification-alert';
import { EditorState, convertToRaw,  } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
//import htmlToDraft from 'html-to-draftjs';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import { convertFromRaw } from 'draft-js';
let cstErrors;

const DisplayingErrorMessagesSchema = Yup.object().shape({
   
    title:  Yup.string().required('Required'),
    blog_cat_id:  Yup.string().required('Required'),
    meta_title:  Yup.string().required('Required'),
    meta_description:  Yup.string().required('Required'),
    meta_keywords:  Yup.string().required('Required'),
    short_content:  Yup.string().required('Required'),
});
const ImgUpload = ({
    onChange,
    src
}) =>
    <label htmlFor="photo-upload" className="custom-file-upload fas">
        <div className="img-wrap img-upload" >
            <img for="photo-upload" src={src} className="img-custm" />
        </div>
        <input id="photo-upload" type="file" onChange={onChange} />
    </label>


function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}

export default () => {
    let [startDate, setStartDate] = useState(moment);
    let [categories, setcategories] = useState([]);
    const [loaderMain, setloaderMain] = useState(false);
    const [message, setMessage] = useState("");
    const [showMessage, setShowmessage] = useState(false);
    const [showAnimation, setshowAnimation] = React.useState(false);
    const [image, setimage] = useState(null);
    const [hasImage, sethasImage] = useState(null);
    const [progress, setProgress] = useState(0)
    const refContainer = React.useRef(null);
    const [editorState,seteditorState]=useState(EditorState.createEmpty());
    useEffect(() => {

        const getData = async () => {
            const { data, status } = await repository.get_blog_categories().then(x => x).then(x => x);
            if (data && data.status == 200 && data.success == true) {
                setshowAnimation(false)
                if (data.response.categories) {
                    setcategories(data.response.categories);

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
    }, [])
    const postData = async (datapost) => {
        setProgress(50);
        const postData = { ...datapost };
        postData.cover_image = image.split(',')[1];
        postData.full_content = draftToHtml(convertToRaw(editorState.getCurrentContent()));
        console.log(postData);
        const { data, status } = await repository.add_blog(postData).then(x => x).then(x => x)

        console.log(data, status)
        if (data && data.status == 200 && data.success == true) {
            setshowAnimation(false)
            if (data.response.blog) {
                setProgress(100);
                notify("tr", 1, data.message);
                datapost.name = "";
                datapost.parent_id = "";

                hasImage(null);
                setimage(null);
                // dispatch(updateUser(data.response.user));
                // alert(data.message)
                // dispatch(saveToken(data.response.user.token));
            }

        }
        else {
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
    return (loaderMain ? <></> : <Formik
        initialValues={{
            title: '',
            cover_image: '',
            blog_cat_id: '',
            meta_title: '',
            meta_description: '',
            meta_keywords: '',
            short_content: '',
            full_content: ''
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
                                            <h1 className="title">Add Blog</h1>
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
                                                                        <label htmlFor="inputname4">Title</label>
                                                                        <input  {...getFieldProps("title")} type="text" className="form-control" id="inputname4" placeholder="" />
                                                                        {touched.title && errors.title && <div style={{ color: 'red', marginTop: 10 }}>{errors.title}</div>}

                                                                    </div>
                                                                    <div className="form-group col-md-6">
                                                                        <label htmlFor="inputState">Category</label>
                                                                        <select  {...getFieldProps("blog_cat_id")} onChange={(e) => {
                                                                            setFieldValue("blog_cat_id", e.target.value)
                                                                        }} className="form-control">
                                                                            <option value={0} >Select Category</option>
                                                                            {categories.map((x, i) => <option ket={i} value={x.id} >{x.name}</option>)}


                                                                        </select>
                                                                        {touched.blog_cat_id && errors.blog_cat_id && <div style={{ color: 'red', marginTop: 10 }}>{errors.blog_cat_id}</div>}

                                                                    </div>

                                                                    <div className="form-group col-md-6">
                                                                        <label htmlFor="inputname4">Meta Title</label>
                                                                        <input  {...getFieldProps("meta_title")} type="text" className="form-control" id="inputname4" placeholder="" />
                                                                        {touched.meta_title && errors.meta_title && <div style={{ color: 'red', marginTop: 10 }}>{errors.meta_title}</div>}

                                                                    </div>

                                                                 
                                                                    <div className="form-group col-md-6">
                                                                        <label htmlFor="inputname4">Meta Description</label>
                                                                        <input  {...getFieldProps("meta_description")} type="text" className="form-control" id="inputname4" placeholder="" />
                                                                        {touched.meta_description && errors.meta_description && <div style={{ color: 'red', marginTop: 10 }}>{errors.meta_description}</div>}

                                                                    </div>
                                                                    <div className="form-group col-md-6">
                                                                        <label htmlFor="inputname4">Meta keywords</label>
                                                                        <input  {...getFieldProps("meta_keywords")} type="text" className="form-control" id="inputname4" placeholder="" />
                                                                        {touched.meta_keywords && errors.meta_keywords && <div style={{ color: 'red', marginTop: 10 }}>{errors.meta_keywords}</div>}

                                                                    </div>
                                                                    <div className="form-group col-md-6">
                                                                        <label htmlFor="inputname4">Short Content</label>
                                                                        <input  {...getFieldProps("short_content")} type="text" className="form-control" id="inputname4" placeholder="" />
                                                                        {touched.short_content && errors.short_content && <div style={{ color: 'red', marginTop: 10 }}>{errors.short_content}</div>}

                                                                    </div>
                                                                    <div className="form-group col-md-12">
                                                                        
                                      <div className="form-group">
                                        <label className="form-label" htmlFor="field-1">Full Content</label>
                                          <div>
                                              <Editor
                                                editorState={editorState}
                                                wrapperClassName="demo-wrapper"
                                                editorClassName="demo-editor"
                                                onEditorStateChange={(content)=>{seteditorState(content)}}
                                              />

                                            </div>
                                          </div>

                                         
                                                                    </div>

                                                                    <div className="form-group col-md-12">
                                                                        <input {...getFieldProps("cover_image")} type="file" onChange={(e) => {
                                                                            e.preventDefault();
                                                                            const reader = new FileReader();
                                                                            const file = e.target.files[0];
                                                                            getBase64(file).then(
                                                                                data => {
                                                                                    setimage(data)
                                                                                    sethasImage(true);
                                                                                    console.log(data)
                                                                                }
                                                                            );

                                                                        }} />
                                                                        {
                                                                            hasImage == false ? <div style={{ color: 'red', marginTop: 10 }}>Image Required</div> : <></>
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
