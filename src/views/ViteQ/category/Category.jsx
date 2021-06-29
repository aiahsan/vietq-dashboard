import React, { useState } from 'react';
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


let cstErrors;

const DisplayingErrorMessagesSchema = Yup.object().shape({
    name: Yup.string().required('Required'),

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
    const [loaderMain, setloaderMain] = useState(false);
    const [message, setMessage] = useState("");
    const [showMessage, setShowmessage] = useState(false);
    const [image, setimage] = useState(null);
    const [hasImage, sethasImage] = useState(null);
    const [showAnimation, setshowAnimation] = React.useState(false);
    const [progress, setProgress] = useState(0)
    const refContainer = React.useRef(null);

    const postData = async (datapost) => {
        setProgress(50);
        const postData = { ...datapost };
        postData.image = image.split(',')[1];
        console.log(postData)
        const { data, status } = await repository.add_category(postData).then(x => x).then(x => x)

        console.log(data, status)
        if (data && data.status == 200 && data.success == true) {
            setshowAnimation(false)
            if (data.response.category) {
                setProgress(100);
                notify("tr",1,data.message);
                datapost.name="";
                hasImage(null);
                setimage(null);
                // dispatch(updateUser(data.response.user));
                // alert(data.message)
                // dispatch(saveToken(data.response.user.token));
            }

        }
        else {
            notify("tr",4,data.message);

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
            name: '',
            image: '',
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
                    <NotificationAlert className="sdfsdfdsf" ref={refContainer} />

                    <LoadingBar color="#f11946" progress={progress} height={5} onLoaderFinished={() => setProgress(100)} />






                    <div>
                        <div className="content">
                            <Row>
                                <Col xs={12} md={12}>

                                    <div className="page-title">
                                        <div className="float-left">
                                            <h1 className="title">Add Category</h1>
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
                                                                    <div className="form-group col-md-12">
                                                                        <label htmlFor="inputname4">Name</label>
                                                                        <input  {...getFieldProps("name")} type="text" className="form-control" id="inputname4" placeholder="" />
                                                                        {touched.name && errors.name && <div style={{ color: 'red', marginTop: 10 }}>{errors.name}</div>}

                                                                    </div>


                                                                </div>
                                                                <div className="form-row">
                                                                    <div className="form-group col-md-12">
                                                                        <input {...getFieldProps("image")} type="file" onChange={(e) => {
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
