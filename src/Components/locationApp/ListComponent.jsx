import React,{Component} from 'react'
import moment from 'moment'
import {Formik, Form ,Field,ErrorMessage} from 'formik'
import AuthenticationService from './AuthenticationService.js'
import LocationDataService from '../../api/location/LocationDataService.js'


class ListComponent extends Component{
    constructor(props) {
        super(props);
    
        this.state = {
          id: this.props.match.params.id,
          title: "",
          description: "",
          targetDate: moment(new Date()).format("YYYY-MM-DD"),
          imageName: null
        };
        this.onSubmit = this.onSubmit.bind(this);
        this.validate = this.validate.bind(this);
      }

      componentDidMount() {
        if (this.state.id === -1) {
          return;
        }
    
        let username = AuthenticationService.getLoggedInUserName();
    
        LocationDataService.retrieveLocation(username, this.state.id).then(response =>
          this.setState({
            title: response.data.title,
            description: response.data.description,
            targetDate: moment(response.data.targetDate).format("YYYY-MM-DD"),
            imageName : response.data.imageName
          })
        );
      }
    
      validate(values) {
        let errors = {};
        if (!values.description) {
          errors.description = "Enter a Description";
        } else if (values.description.length < 5) {
          errors.description = "Enter atleast 5 Characters in Description";
        }
    
        if (!moment(values.targetDate).isValid()) {
          errors.targetDate = "Enter a valid Target Date";
        }
    
        return errors;
      }
    
      onSubmit(values) {
        let username = AuthenticationService.getLoggedInUserName();
      console.log("values: " + values)
        let location = {
          id: this.state.id,
          title : values.title,
          description: values.description,
          targetDate: values.targetDate,
          imageName: values.imageName
        };
    
        if (this.state.id === -1) {
          LocationDataService.createLocation(username, location).then(() =>
            this.props.history.push("/locations")
          );
        } else {
          LocationDataService.updateLocation(username, this.state.id, location).then(() =>
            this.props.history.push("/locations")
          );
        }
    
        console.log(values);
      }


      //FileUpload
      fileSelectHandler = event => {
        this.setState({
          imageName: event.target.files[0]
        })
      }
      onFileChangeHandler = (e) => {
        e.preventDefault();
        this.setState({
            selectedFile: e.target.files[0]
        });
        const formData = new FormData();
        formData.append('file', this.state.selectedFile);
        LocationDataService.upload(formData)
            .then(res => {
                    console.log(res.data);
                    alert("File uploaded successfully.")
            })
    };

      //renderFunktion
      render() {
        let {title, description, targetDate, imageName } = this.state;
        //let targetDate = this.state.targetDate
    
        return (
          <div>
            <h1>Location</h1>
            <div className="container">
              <Formik
                initialValues={{ title ,description, targetDate, imageName }}
                onSubmit={this.onSubmit}
                validateOnChange={false}
                validateOnBlur={false}
                validate={this.validate}
                enableReinitialize={true}
              >
                {props => (
                  <Form>
                    <ErrorMessage
                      name="description"
                      component="div"
                      className="alert alert-warning"
                    />
                    <ErrorMessage
                      name="targetDate"
                      component="div"
                      className="alert alert-warning"
                    />
                    {/* file upload */}
                    {/* <div>
                      <input type="file" onChange={this.onFileChangeHandler}/>
                      <button type="button" onClick={this.fileUploadHandler}>Upload</button>
                    </div> */}
                    <fieldset className="form-group">
                      <label>Image Upload</label>
                      <Field
                        className="form-control"
                        type="file"
                        name="imageName"
                      />
                    </fieldset> 
                    <fieldset className="form-group">
                      <label>Title</label>
                      <Field
                        className="form-control"
                        type="text"
                        name="title"
                      />
                    </fieldset>         
                    <fieldset className="form-group">
                      <label>Description</label>
                      <Field
                        className="form-control"
                        type="text"
                        name="description"
                      />
                    </fieldset>
                    <fieldset className="form-group">
                      <label>Target Date</label>
                      <Field
                        className="form-control"
                        type="date"
                        name="targetDate"
                      />
                    </fieldset>
                    <button className="btn btn-success" type="submit">
                      Save
                    </button>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        );
      }
}
export default ListComponent;