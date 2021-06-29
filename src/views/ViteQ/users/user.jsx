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
import {repository} from '../../../utiles/repository'
import LoadingBar from 'react-top-loading-bar'
import NotificationAlert from 'react-notification-alert';

let cstErrors;

const DisplayingErrorMessagesSchema = Yup.object().shape({
    name: Yup.string().required('Required'),
    phone: Yup.string()
        .required('Required'),
  
    role: Yup.number()
        .required('Required').min(1, "Please Select Role"),
    username: Yup.string()
        .required('Required'),
       
    email: Yup.string()
        .required('Required').email(),
    password: Yup.string()
        .required('Required').matches(
            /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
            "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
        ),
    confirmPassword: Yup.string()
        .required('Required').oneOf([Yup.ref('password'), null], 'Passwords must match'),

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
    const [image,setimage]=useState(null);
    const [hasImage,sethasImage]=useState(null);
    const [showAnimation, setshowAnimation] = React.useState(false);
    const [progress, setProgress] = useState(0)
    const refContainer = React.useRef(null);

    const postData = async (datapost) => {
        setProgress(50);
        const postData={...datapost};
        postData.image=image.split(',')[1];
            console.log(postData,"postdata")
        const { data, status } = await repository.register(postData).then(x => x).then(x => x)

        if (data && data.status == 200 && data.success == true) {
            setshowAnimation(false)
            if (data.response.user) {
                setProgress(100);
                notify("tr",1,data.message);
                datapost.name="";
                datapost.username="";
                datapost.email="";
                datapost.password="";
                datapost.confirmPassword="";
                datapost.phone="";
                datapost.latitude='';
                datapost.longitude='';
                hasImage(null);
                setimage(null);
                setdisplayimg('https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/480px-No_image_available.svg.png')
                // dispatch(updateUser(data.response.user));
                // alert(data.message)
                // dispatch(saveToken(data.response.user.token));
            }

        }
        else {
            // alert(data.message, "Error")
            notify("tr",4,data.message);

            setshowAnimation(false)
            setProgress(100);

        }
        setProgress(0);



    }

    const   notify=(place,color,message)=>{
        
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

    let [displayimg,setdisplayimg]=React.useState('https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/480px-No_image_available.svg.png')
   
    return (loaderMain ? <></> : <Formik
        initialValues={{
            name: '',
            phone: '',
            image: '',
            username: '',
            email: '',
            confirmPassword: '',
            password: '',
            latitude:'',
            longitude:'',
            role: 2,
        }}
        validationSchema={DisplayingErrorMessagesSchema}
        onSubmit={async (values, { setSubmitting }) => {
            console.log(hasImage)
            if(hasImage==null)
            {
                sethasImage(false)
            }
            else
            {
                
                await postData(values)
            }
        }}
    >
        {({ errors, touched, getFieldProps, setFieldValue, initialValues }) => {
            cstErrors = errors;

            return (
                <Form>
      <NotificationAlert className="sdfsdfdsf"  ref={refContainer}/>

      <LoadingBar color="#f11946" progress={progress} height={5} onLoaderFinished={() => setProgress(100)} />




                    <div>
                        <div className="content">
                            <Row>
                                <Col xs={12} md={12}>

                                    <div className="page-title">
                                        <div className="float-left">
                                            <h1 className="title">Add User</h1>
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
                                                                        <label htmlFor="inputname4">User Name</label>
                                                                        <input  {...getFieldProps("username")} type="text" className="form-control" id="inputname4" placeholder="" />
                                                                        {touched.username && errors.username && <div style={{ color: 'red', marginTop: 10 }}>{errors.username}</div>}

                                                                    </div>


                                                                </div>
                                                                <div className="form-row">
                                                                    <div className="form-group col-md-12">
                                                                        <label htmlFor="inputname4">Email</label>
                                                                        <input  {...getFieldProps("email")} type="text" className="form-control" id="inputname4" placeholder="" />
                                                                        {touched.email && errors.email && <div style={{ color: 'red', marginTop: 10 }}>{errors.email}</div>}

                                                                    </div>


                                                                </div>

                                                                <div className="form-row">
                                                                    <div className="form-group col-md-6">
                                                                        <label htmlFor="inputname4">Password</label>
                                                                        <input  {...getFieldProps("password")} type="text" className="form-control" id="inputname4" placeholder="" />
                                                                        {touched.password && errors.password && <div style={{ color: 'red', marginTop: 10 }}>{errors.password}</div>}

                                                                    </div>
                                                                    <div className="form-group col-md-6">
                                                                        <label htmlFor="inputname4">Confirm Password</label>
                                                                        <input  {...getFieldProps("confirmPassword")} type="text" className="form-control" id="inputname4" placeholder="" />
                                                                        {touched.confirmPassword && errors.confirmPassword && <div style={{ color: 'red', marginTop: 10 }}>{errors.confirmPassword}</div>}

                                                                    </div>


                                                                </div>
                                                                <div className="form-row">
                                                                    <div className="form-group col-md-6">
                                                                        <label htmlFor="inputname4">Phone Number</label>
                                                                        <input  {...getFieldProps("phone")} type="text" className="form-control" id="inputname4" placeholder="" />
                                                                        {touched.phone && errors.phone && <div style={{ color: 'red', marginTop: 10 }}>{errors.phone}</div>}

                                                                    </div>
                                                                    <div className="form-group col-md-6">
                                                                        <label htmlFor="inputname4">Latitude</label>
                                                                        <input  {...getFieldProps("latitude")} type="text" className="form-control" id="inputname4" placeholder="" />
                                                                        {touched.latitude && errors.latitude && <div style={{ color: 'red', marginTop: 10 }}>{errors.latitude}</div>}

                                                                    </div>
                                                                    <div className="form-group col-md-6">
                                                                        <label htmlFor="inputname4">Longitude</label>
                                                                        <input  {...getFieldProps("longitude")} type="text" className="form-control" id="inputname4" placeholder="" />
                                                                        {touched.longitude && errors.longitude && <div style={{ color: 'red', marginTop: 10 }}>{errors.longitude}</div>}

                                                                    </div>
                                                                    <div className="form-group col-md-6">
                                                                        <label htmlFor="inputState">Role</label>
                                                                        <select  {...getFieldProps("role")} onChange={(e) => {
                                                                            setFieldValue("role", e.target.value)
                                                                        }} className="form-control">
                                                                            <option value={0} >Choose Role</option>
                                                                            <option value={1}>Admin</option>
                                                                            <option value={2}>User</option>
                                                                            
                                                                        </select>
                                                                        {touched.role && errors.role && <div style={{ color: 'red', marginTop: 10 }}>{errors.role}</div>}

                                                                    </div>


                                                                </div>
                                                                <div className="form-row">
                                                                    <div className="form-group col-md-12">
                                                                        <input {...getFieldProps("image")} type="file" onChange={(e) => {
                                                                            e.preventDefault();
                                                                            const reader = new FileReader();
                                                                            const file = e.target.files[0];
                                                                            getBase64(file).then(
                                                                                data =>{
                                                                                    setimage(data)
                                                                                    sethasImage(true);
                                                                                    setdisplayimg(data)
                                                                                    console.log(data)
                                                                                    }
                                                                              );
                                                                            
                                                                        }} />
                                                                        <img src={displayimg} alt="Avatar" className="sadjas-sadasimg" />

                                                                        {
                                                                            
                                                                            hasImage==false?<div style={{ color: 'red', marginTop: 10 }}>Image Required</div>:<></>
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
