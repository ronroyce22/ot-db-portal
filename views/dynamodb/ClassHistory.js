
import { CCard, CCardBody, CContainer, CRow, CCol, CLabel, CInput, CButton, CToaster, CToast, CToastBody, CToastHeader  } from '@coreui/react';
import React, { Component, useState } from 'react';

import axios from "axios";

import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

class ClassHistory extends Component {

  constructor(props) {
    super(props);

    this.state = {
      studios: [],
      isLoaded: false,
      classDate: new Date(),
      startTime: new Date(),
      dbEnv: "dev",
      studioNumber: "",
      classDuration: 60,
      coach: "",
      classType: "",
      totalPoints: 0,
      totalMembers: 0,
      totalCalories: 0,
      toastrMsg: "",
      showToastr: false,
    };
  }
  

  componentDidMount() {
    if (this.state.isLoaded) {
      return;
    }

    fetch('http://localhost:3000/rds/studios')
      .then(res => res.json())
      .then(result => {
        if (result.success) {
          console.log("Successful api");
          this.setState({
            isLoaded: true,
            studios: result.data,
            classDate: new Date(),
            startTime: new Date(),
            studioNumber: result.data[0]["LegacyStudioNumber"],
            classDuration: 60,
            coach: "",
            classType: "",
            totalPoints: 0,
            totalMembers: 0,
            totalCalories: 0,
            toastrMsg: "",
            showToastr: false,
          });  
        }
      });
  }


  handleChangeClassDate = (classDate) => {
    alert('handleClassDateChange');

    this.setState({
      classDate: classDate,
      startTime: classDate
    });
  };

  handleChangeStartTime = (startTime) => {
    if (!this.state.isLoaded) {
      return;
    }
    
    console.log("handleChangeStartTimeChange");
    this.setState({
      startTime: startTime
    });
  };

  handleAddButtonClick = () => {
    if (!this.state.isLoaded) {
      return;
    }
    
    let data = {
      classDate: this.state.classDate,
      classDuration: this.state.classDuration,
      classType: this.state.classType,
      coach: this.state.coach,
      dbEnv: this.state.dbEnv,
      startTime: this.state.startTime,
      studioNumber: this.state.studioNumber,
      totalCalories: this.state.totalCalories,
      totalMembers: this.state.totalMembers,
      totalPoints: this.state.totalPoints,
    }

    let self = this
    
    axios.post('http://localhost:3000/dynamodb/classhistory', data)
        .then(response => {
          if (!response.data.success) {
            this.setState({ toastrMsg: response.data.errormsg, showToastr: true })
          }
          else {
            this.setState({ toastrMsg: "ClassHistory row has been added successfully", showToastr: true })
          }
        })
        .catch(function (error) {
          self.setState( {toastrMsg: error.message, showToastr: true});
        });        

    console.log(this.state);
  }

  handleEnvironmentChange = (event) => {
    this.setState({
      dbEnv: event.target.value
    });    
  }

  handleStudioChange = (event) => {
    this.setState({
      studioNumber: event.target.value
    });    
  }

  handleChangeCoach = (event) => {
    this.setState({
      coach: event.target.value
    });    
  }

  handleChangeClassType = (event) => {
    this.setState({
      classType: event.target.value
    });    
  }

  handleChangeClassDuration = (event) => {
    this.setState({
      classDuration: event.target.value
    });    
  }


  handleChangeTotalPoints = (event) => {
    this.setState({
      totalPoints: event.target.value
    });    
  }

  

  handleChangeTotalMembers = (event) => {
    this.setState({
      totalMembers: event.target.value
    });    
  }



  handleChangeTotalCalories = (event) => {
    this.setState({
      totalCalories: event.target.value
    });    
  }

  toastrStateChanged = (event) => {
    if (!event) {
      this.setState( {
        showToastr: false
      });
    }
    return true;
  }

  render() {
    const { studios, isLoaded, classDate, startTime, dbEnv, studioNumber, classDuration, coach, classType, totalPoints, totalMembers, totalCalories, toastrMsg, showToastr } = this.state;

   
    
    if (!isLoaded) {
      return <div>Loading ... </div>;
    } else {
      return (
        <CContainer>
      <CToaster
          position={'static'}
        >
            <CToast
              show={showToastr}
              autohide={5000}
              fade={true}
              onStateChange={this.toastrStateChanged}
            >
              <CToastHeader closeButton={true}>
                Message
              </CToastHeader>
              <CToastBody>
                {toastrMsg}
              </CToastBody>
            </CToast>
        </CToaster>          
          <h1 className="text-center mb-2">Add ClassHistory Row</h1>
          <div className="ml-auto mr-auto mb-3 col-sm-3">
            <label>Environment</label>
            <select className="form-control" defaultValue={dbEnv} onChange={this.handleEnvironmentChange}>
              <option value="dev">Development</option>
              <option value="sit">SIT</option>
              <option value="uat">UAT</option>
            </select>
        </div>
        <CRow>
          <CCol sm="6" className="m-auto">        
              <CCard>
                <CCardBody>
                 <CLabel>Studio</CLabel>
                  <select className="form-control" defaultValue={studioNumber} onChange={this.handleStudioChange} >
                  {studios.map(item => (
                    <option key={item.LegacyStudioNumber} value={item.LegacyStudioNumber}>
                      {item.LongStudioName}
                    </option>
                  ))}
                </select>
                  <CLabel className="mt-3">Class Date</CLabel>
                  <DatePicker selected={classDate} onChange={this.handleChangeClassDate}   showTimeSelect  dateFormat="Pp" />
                  <CLabel className="mt-3">Class Start Time</CLabel>
                  <DatePicker selected={startTime} onChange={this.handleChangeStartTime}   showTimeSelect  dateFormat="Pp" />
                  <CLabel className="mt-3">Coach</CLabel>
                  <CInput defaultValue={coach}  onChange={this.handleChangeCoach}></CInput>
                  <CLabel className="mt-3">Class Type</CLabel>
                  <CInput defaultValue={classType}  onChange={this.handleChangeClassType}></CInput>
                </CCardBody>
              </CCard>
            </CCol>
            <CCol sm="6" className="ml-auto mr-auto pb-5">        
              <CCard>
                <CCardBody>
                  <CLabel className="mt-3">Class Duration</CLabel>
                  <CInput type="number" defaultValue={classDuration} onChange={this.handleChangeClassDuration}></CInput>
                  <CLabel className="mt-3">Total points</CLabel>
                  <CInput type="number" defaultValue={totalPoints} onChange={this.handleChangeTotalPoints}></CInput>
                  <CLabel className="mt-3">Total Members</CLabel>
                  <CInput type="number" defaultValue={totalMembers} onChange={this.handleChangeTotalMembers}></CInput>
                  <CLabel className="mt-3">Total Calories</CLabel>
                  <CInput type="number" defaultValue={totalCalories} onChange={this.handleChangeTotalCalories}></CInput>
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>
          <CRow>
            <CButton className="btn-primary ml-auto mr-auto mt-5 pl-7 pr-7" onClick={this.handleAddButtonClick}>Add</CButton>
          </CRow>
     
          </CContainer>
      );
    }
  }
}

export default ClassHistory
