import React from 'react'; // Import React
import moment from 'moment'; // Example for onSort prop
import Datatable from 'react-bs-datatable'; // Import this package;
import { repository } from '../../../utiles/repository';
import SweetAlert from 'react-bootstrap-sweetalert';
import LoadingBar from 'react-top-loading-bar';
import NotificationAlert from 'react-notification-alert';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link, useHistory
} from "react-router-dom";
import {
    Row, Col,
} from 'reactstrap';

const header = [
    { title: 'ID', prop: 'id', sortable: true, filterable: true },
    { title: 'Name', prop: 'name', sortable: true, filterable: true },
    { title: 'Image', prop: 'image', sortable: true, filterable: true },
    { title: 'Category', prop: 'category', sortable: true, filterable: true },
    { title: 'Edit', prop: 'edit', sortable: true, filterable: true },
];



const onSortFunction = {
    date(columnValue) {
        // Convert the string date format to UTC timestamp
        // So the table could sort it by number instead of by string
        return moment(columnValue, 'Do MMMM YYYY').valueOf();
    },
};



const customLabels = {
    first: '<<',
    last: '>>',
    prev: '<',
    next: '>',
    show: 'Display ',
    entries: ' rows',
    noResults: 'There is no data to be displayed',
};


let deleteId=0;
export default () => {
    let history = useHistory();
    let [categories, setCategories] = React.useState([]);
    const [progress, setProgress] = React.useState(0)
    const [show, setshow] = React.useState(false);
    const refContainer = React.useRef(null);
    var BASEDIR = process.env.REACT_APP_BASEDIR;
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
    React.useEffect(() => {
        setProgress(50);
        (async () => {
            const { data, status } = await repository.catsOnly().then(x => x).then(x => x)
            if (data && data.status == 200 && data.success == true) {
                if (data.response.categories) {
                    setProgress(100);
                    console.log(data);
                    let subcategory=[]
                    data.response.categories.map(x => {
                        console.log("subbbb",x)
                       x.sub_categories.map(y=>{
                           subcategory.push({
                            id: y.id ? y.id : "",category:x.name?x.name:"", image: <img src={y.image ? y.image : ""} style={{ width: 58, height: 32, backgroundColor: '#6fbfae' }} alt="Avatar" class="avatar" />, name: y.name ? y.name : "", email: "hbanks0@networkadvertising.org", username: 'user1', phone: "386-(842)278-0044", date: moment().subtract(1, 'days').format('Do MMMM YYYY'), edit: <div className="sdjsafei"><button className="btn btn-primary" onClick={() => {
                                history.push(BASEDIR + "/subcategory/edit",{data:x})
                            }}>Edit</button><button onClick={() => {
                                deleteId=y.id;
                                setshow(true);
                            }} className="btn btn-danger" >Delete</button></div>
                        });
                       })
                    });

                    setCategories(subcategory);
                    // dispatch(updateUser(data.response.user));
                    // alert(data.message)
                    // dispatch(saveToken(data.response.user.token));
                }
            }
            else {
                setProgress(100);

            }


        })();
        setProgress(0);

    }, []);
    const handleDelete=async ()=>{
        setshow(false);
        setProgress(50);
        const { data, status } = await repository.delete_category({"category_id":deleteId}).then(x => x).then(x => x)
        if (data && data.status == 200 && data.success == true) {
            if (data.response) {
                setProgress(100);
                console.log(data);
                const updateCategory =categories.filter(x => x.id!==deleteId);
                setCategories(updateCategory);
                notify("tr",1,data.message);

                // dispatch(updateUser(data.response.user));
                // alert(data.message)
                // dispatch(saveToken(data.response.user.token));
            }
        }
        else {
            notify("tr",4,data.message);
            setProgress(100);

        }
        setProgress(0);

    }
    return (
        <div>
            <SweetAlert
                show={show}
                title="Are you sure?"
                des
                text=""
                showCancelButton
                type="danger"
                showCancel={true}
                confirmBtnText="Delete"
                
                onConfirm={() => {
                    console.log('confirm');
                    handleDelete();
                    //   this.setState({ show: false });
                }}
                onCancel={() => {
                    setshow(false);
                    console.log('cancel');
                    //   this.setState({ show: false });
                }}

            >
                Do you really want to delete record? this process cannot be undone
                </SweetAlert>
            <LoadingBar color="#f11946" progress={progress} height={5} onLoaderFinished={() => setProgress(100)} />
            <NotificationAlert className="sdfsdfdsf"  ref={refContainer}/>

            <div className="content">
                <Row>
                    <Col xs={12} md={12}>

                        <div className="page-title">
                            <div className="float-left">
                                <h1 className="title">Categories</h1>
                            </div>
                        </div>




                        <div className="col-12">
                            <section className="box ">
                                <header className="panel_header">
                                    <h2 className="title float-left">Category Table</h2>

                                </header>
                                <div className="content-body">
                                    <div className="row">
                                        <div className="col-lg-12 dt-disp">

                                            <Datatable
                                                tableHeader={header}
                                                tableBody={categories}
                                                keyName="userTable"
                                                tableClass="striped table-hover table-responsive"
                                                rowsPerPage={10}
                                                rowsPerPageOption={[5, 10, 15, 20]}
                                                initialSort={{ prop: "id", isAscending: true }}
                                                onSort={onSortFunction}
                                                labels={customLabels}
                                            />



                                        </div>
                                    </div>


                                </div>
                            </section>
                        </div>


                    </Col>

                </Row>
            </div>

        </div>
    )
}      