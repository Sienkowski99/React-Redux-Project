import axios from 'axios'
import { useState } from "react";
// import {Formik} from 'formik'
import operations from '../operations/index'
import { connect } from "react-redux";
import { Formik, Field, Form, ErrorMessage, FieldArray } from 'formik';
import React from 'react';
import ReactDOM from 'react-dom';

const SacrificeForm = (props) => {
    console.log(props)
    const [pickedDate, setPickedDate] = useState(new Date());

    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];

    function handleSubmit(event) {
        event.preventDefault();
        event.target.reset();
      }
    
    const [msgToDate, setMsgToDate] = useState("");

    const initialValues2 = {
        comments: [
            { author: props.user, content: '' }
        ],
      };

    return (
        <div>
            <Formik
                initialValues={{
                        date: "",
                        text: ""
                        // symbol: data.find(x=>x.id===szczegoloweID).symbol,
                        // type: data.find(x=>x.id===szczegoloweID).type,
                        // rank: data.find(x=>x.id===szczegoloweID).rank,
                        // is_new: data.find(x=>x.id===szczegoloweID).is_new,
                        // is_active: data.find(x=>x.id===szczegoloweID).is_active
                    }}
                validate={values => {
                    const errors = {};
                    if (!values.date) {
                        errors.name = 'Uzupełnij to pole!';
                    }
                    if (!values.text) {
                        errors.text = 'Uzupełnij to pole!';
                    }
                    // if (!values.name) {
                    //     errors.name = 'Uzupełnij to pole!';
                    // }
                    // if (!values.symbol) {
                    //     errors.symbol = 'Uzupełnij to pole!';
                    // }
                    // else if (!/^[A-Z]*$/.test(values.symbol)) {
                    //     errors.symbol = 'Niepoprawny format!';
                    // }
                    // if (isNaN(values.rank) || !values.rank) {
                    //     errors.rank = 'Podaj wartość liczbową!'
                    // }
                    return errors;
                }}
                onSubmit= {async (values, actions) => {
                    console.log(values)
                    // const bezZmienianego = data.filter(x=>x.id!==szczegoloweID)
                    // const values2 = {...values,id: szczegoloweID}
                    // setData([...bezZmienianego,values2])
                    // setczyedit("nie")
                    const obj = {...values, user: props.user}
                    console.log(obj)
                    props.addPost(obj)
                    // await axios.post("http://localhost:8080/add_post", obj)
                    // .then(result => {
                    //     console.log(result.data); 
                    //     // props.setYear(props.year.name, props.year.month_to_display.name)
                    //     actions.resetForm()
                    //     // this.reset()
                    // }).catch(err => alert(err))
                    actions.resetForm()
                }}
            >
                {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleSubmit,
                }) => (
                <form onSubmit={handleSubmit} style={{
                    // backgroundColor: "blue",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "space-around",
                    // width: "25%",
                    // height: "35vh",
                    padding: "50px 0",
                    borderBottom: "solid white 2px"
                }}>
                    <label>
                        Pick the date and time that you're willing to sacrifice for meeting
                        up with friends. Everything will be updated in real time.
                    </label>
                    <br/>
                    <input
                        type="datetime-local"
                        name="date"
                        onChange={handleChange}
                        value={values.data}
                    />
                    {errors.data && touched.data && errors.data}
                    <br/>
                    <label>
                        You can add a comment - for exapmle - how much time you'd like to
                        spend or what's your idea for a meeting.
                    </label>
                    <input
                        type="text"
                        name="text"
                        onChange={handleChange}
                        value={values.text}
                        style={{ width: "75%" }}
                    />
                    {errors.text && touched.text && errors.text}
                    <br/>
                    <br/>
                    <button
                    type="submit"
                    style={{
                    backgroundColor: "#e7e7e7",
                    color: "black",
                    border: "none",
                    padding: "5px 10px",
                    textAlign: "center",
                    textDecoration: "none",
                    display: "inline-block",
                    fontSize: "15px",
                    fontWeight: "bold",
                    borderRadius: "10%",
                    }}
                    >
                        Sacrifice 🙏
                    </button>
                </form>
                )}
            </Formik>
            
            <Formik
            initialValues={initialValues2}
            onSubmit={async (values) => {
                await new Promise((r) => setTimeout(r, 500));
                alert(JSON.stringify(values, null, 2));
            }}
            >
            {({ values }) => (
                <Form>
                <FieldArray name="comments">
                    {({ insert, remove, push }) => (
                    <div>
                        {values.comments.length > 0 &&
                        values.comments.map((post, index) => (
                            <div className="row" key={index}>
                            <div className="col">
                                <label htmlFor={`comments.${index}.content`}>Content</label>
                                <Field
                                name={`comments.${index}.content`}
                                placeholder="Sample text"
                                type="text"
                                />
                                <ErrorMessage
                                name={`comments.${index}.content`}
                                component="div"
                                className="field-error"
                                />
                            </div>
                            {/* <div className="col">
                                <label htmlFor={`friends.${index}.email`}>Email</label>
                                <Field
                                name={`friends.${index}.email`}
                                placeholder="jane@acme.com"
                                type="email"
                                />
                                <ErrorMessage
                                name={`friends.${index}.name`}
                                component="div"
                                className="field-error"
                                />
                            </div> */}
                            <div className="col">
                                <button
                                type="button"
                                className="secondary"
                                onClick={() => remove(index)}
                                >
                                Remove comment
                                </button>
                            </div>
                            </div>
                        ))}
                        <button
                        type="button"
                        className="secondary"
                        onClick={() => push({ author: props.user, content: '' })}
                        >
                        Add comment
                        </button>
                    </div>
                    )}
                </FieldArray>
                <button type="submit">Add Post</button>
                </Form>
            )}
            </Formik>
 
        </div>
    )
}

function mapStateToProps(state) {
    return {
        year: state.year,
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        setYear: (year, month) => dispatch(operations.getYearAndMonth(year, month)),
        addPost: (data_obj) => dispatch(operations.addPost(data_obj))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SacrificeForm);