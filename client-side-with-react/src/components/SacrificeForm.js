import operations from '../operations/index'
import { connect } from "react-redux";
import { Formik, Field, Form, FieldArray } from 'formik';
import React from 'react';
import { Button, Card } from 'react-bootstrap';
import * as Yup from 'yup';
import DatePicker from 'react-datepicker'
import { useState } from 'react' 
import "react-datepicker/dist/react-datepicker.css";
const {v4: uuidv4} = require('uuid')


const SacrificeForm = (props) => {
    // console.log(props)
    // const [pickedDate, setPickedDate] = useState(new Date());
    const error = {
        color: "#ff7575"
    }

    // function handleSubmit(event) {
    //     event.preventDefault();
    //     event.target.reset();
    //   }
    
    // const [msgToDate, setMsgToDate] = useState("");

    const initialValues = {
        comments: [
            // { author: props.user, content: '' }
        ],
        message: '',
        date: ''
      };


    const postSchema = Yup.object().shape({
        comments: Yup.array()
            .of(Yup.object().shape({
                content: Yup.string().min(3, 'Write something more :)')
                .test('noswearing', 'Stop swearing!',
                function(value) {
                if (value) {
                    return !value.includes('kurde');
                }
                else {
                    return true;
                }
                })
                .max(30, 'Hola hola, stop it right there')
                .required('Required')
            })),
        message: Yup.string().min(3, 'Write something more :)')
        .test('noswearing', 'Stop swearing!',
                function(value) {
                if (value) {
                    return !value.includes('kurde');
                }
                else {
                    return true;
                }
                })
        .max(30, 'Hola hola, stop it right there').required('Required'),
        date: Yup.date().required('Required')
    });
    const [startDate, setStartDate] = useState(new Date());
    const DatePickerField = ({ name, value, onChange }) => {
        return (
            <DatePicker
                style={{autocomplete: "off"}}
                name="date"
                // value={values.date}
                selected={(value && new Date(value)) || null}
                // onChange={date => setStartDate(date)}
                // onChange={setFieldValue}
                showTimeSelect
                dateFormat="Pp"
                timeFormat="p"
                timeIntervals={5}
                onChange={val => {
                    onChange(name, val);
                }}
            />
        );
    };

    return (
        <div>
            <Card style={{ color: "black", margin: "50px 0" }} className="text-center" bg="dark" text="white">
                <Card.Body>
                    <Card.Header>Suggest a meeting</Card.Header>
                    {/* <Card.Text>
                    Some quick example text to build on the card title and make up the bulk of
                    the card's content.
                    </Card.Text>
                    <Button variant="primary">Go somewhere</Button> */}
                    <Formik
                        initialValues={initialValues}
                        validationSchema={postSchema}
                        validateOnChange={true}
                        onSubmit={async (values, actions) => {
                            // await new Promise((r) => setTimeout(r, 500));
                            // alert(JSON.stringify(values, null, 2));
                            const obj = {...values, user: props.auth.user}
                            console.log(obj)
                            props.addPost(obj)
                            actions.resetForm()
                        }}
                    >
                        {({ values, errors, handleChange, handleReset, setFieldValue }) =>
                        (<Form>
                            <label>Pick the date and time that you're willing to sacrifice for meeting
                                up with friends. Everything will be updated in real time. </label>
                            <br/>
                            {/* <Field
                                // selected={new Date()}
                                label="Pick the date and time that you're willing to sacrifice for meeting
                                up with friends. Everything will be updated in real time."
                                name={"date"}
                                type="datetime-local"
                                onChange={handleChange}
                                // onChange={date => setFieldValue('date', date)}
                                value={values.date}
                                error={errors.date && Boolean(errors.date)}
                                // helperText={errors.date && errors.date}
                            /> */}
                            {/* <DatePicker selected={startDate} onChange={date => setStartDate(date)} /> */}
                            {/* <DatePicker
                                name="date"
                                value={values.date}
                                selected={new Date()}
                                // onChange={date => setStartDate(date)}
                                // onChange={setFieldValue}
                                showTimeSelect
                                dateFormat="Pp"
                                // onChange={val => {
                                //     onChange(name, val);
                                // }}
                            /> */}
                            <DatePickerField
                                name="date"
                                value={values.date}
                                onChange={setFieldValue}
                            />
                            {errors &&
                                errors.date &&
                                // errors.comments[index] &&
                                // errors.comments[index].content &&
                                (
                                    <div style={error}>
                                        {/* {errors.comments[index].content} */}
                                        {errors.date}
                                    </div>
                                )}
                            <br/>
                            <label>You can add a comment - for exapmle - how much time you'd like to
                                spend or what's your idea for a meeting. </label>
                            <br/>
                            <Field 
                                label="Pick the date and time that you're willing to sacrifice for meeting
                                up with friends. Everything will be updated in real time."
                                name={"message"}
                                onChange={handleChange}
                                value={values.message}
                                error={errors.message && Boolean(errors.message)}
                                // helperText={errors.message && errors.message}
                            />
                            {errors &&
                                errors.message &&
                                // errors.comments[index] &&
                                // errors.comments[index].content &&
                                (
                                    <div style={error}>
                                        {/* {errors.comments[index].content} */}
                                        {errors.message}
                                    </div>
                                )}
                            {/* <label htmlFor={`friends.${index}.email`}>Email</label>
                            <Field
                                name={`friends.${index}.email`}
                                placeholder="jane@acme.com"
                                type="email"
                            />
                            <ErrorMessage
                                name={`friends.${index}.name`}
                                component="div"
                                className="field-error"
                            /> */}
                            <FieldArray name="comments" className={"field-array"}>
                                {({remove, push }) => (
                                    <div>
                                        {/* <button onClick={() => push({ author: props.auth.user, content: '', id: uuidv4() })}>
                                            Add comment
                                        </button> */}
                                        {values.comments.length > 0 &&
                                        values.comments.map((comment, index) => (
                                            <div key={index} style={{display: "flex", flexDirection: "column"}}>
                                                <div style={{display: "flex", flexDirection: "row", justifyContent: "space-betwen", alignItems: "center", margin: "10px 0"}}>
                                                    <label style={{margin: "0"}}>{props.auth.user}:</label>
                                                    <div id="spacer" style={{width: "5px", background: "none"}}></div>
                                                    <Field
                                                        style={{flexGrow: "1"}}
                                                        fullWidth={true}
                                                        label={"Comments"}
                                                        name={`comments.${index}.content`}
                                                        value={values.comments[index].content}
                                                        onChange={handleChange}
                                                        // error={!!errors.questions?.[index].question}
                                                        // helperText={errors.questions?.[index].question}
                                                    />
                                                    <button style={{background: "none", border: "none"}} onClick={() => remove(index)}>❌</button>
                                                </div>
                                                {errors &&
                                                    errors.comments &&
                                                    errors.comments[index] &&
                                                    errors.comments[index].content &&
                                                    (
                                                    <div style={error}>
                                                        {errors.comments[index].content}
                                                    </div>
                                                    )}
                                                {/* <div>
                                                    <label>{props.auth.user}:</label>
                                                    <div id="spacer" style={{width: "5px", background: "none"}}></div>
                                                    <Field
                                                        // style={{width: "80%"}}
                                                        fullWidth={true}
                                                        label={"Comments"}
                                                        name={`comments.${index}.content`}
                                                        value={values.comments[index].content}
                                                        onChange={handleChange}
                                                        // error={!!errors.questions?.[index].question}
                                                        // helperText={errors.questions?.[index].question}
                                                    />
                                                    {errors &&
                                                    errors.comments &&
                                                    errors.comments[index] &&
                                                    errors.comments[index].content &&
                                                    (
                                                    <div style={error}>
                                                        {errors.comments[index].content}
                                                    </div>
                                                    )}
                                                </div> */}
                                                
                                                {/* <Button variant="danger" onClick={() => remove(index)}>❌</Button> */}
                                                {/* <div style={{display: "flex", flexGrow: "1", justifyContent: "center", alignItems: "flex-start", alignSelf: "flex-start"}}>
                                                    <Button variant="danger" onClick={() => remove(index)}>❌</Button>
                                                </div> */}
                                            </div>
                                        ))}
                                        <Button type="button"
                                            style={{marginTop: "5px"}}
                                            // variant="contained" color="primary"
                                            // onClick={() => push({ question: '', type: 'boolean' , difficulty: 'easy', correct_answer: "", incorrect_answers: []})}
                                            onClick={() => push({ author: props.auth.user, content: '', id: uuidv4(), likes: 0, dislikes: 0 })}
                                        >
                                            Add comment
                                        </Button>
                                    </div>
                                )}
                            </FieldArray>
                            <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}>
                                <div className={"reset-btn"} >
                                    <Button onClick={handleReset} variant="danger">Reset</Button>
                                </div>
                                <Button type={"submit"} variant="success">Publish</Button>
                            </div>
                        </Form>)}
                    </Formik>
                </Card.Body>
            </Card>
            {/* <Formik
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
            </Formik> */}
            
            {/* <Formik
            initialValues={initialValues2}
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
            onSubmit={async (values) => {
                await new Promise((r) => setTimeout(r, 500));
                alert(JSON.stringify(values, null, 2));
            }}
            >
            {({ values }) => (
            <Form>
                <TextField
                    label="Pick the date and time that you're willing to sacrifice for meeting
                        up with friends. Everything will be updated in real time."
                    name={"date"}
                    onChange={handleChange}
                    value={values.data}
                    error={errors.data && touched.data && errors.data}
                />
                {/* <label>Whar's your idea for a meeting? </label>
                <Field
                name={`message`}
                placeholder="Sample text"
                type="text"
                />
                <ErrorMessage
                name={`message`}
                component="div"
                className="field-error"
                /> */}
                {/* <FieldArray name="comments">
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
                            </div> */}
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
                            {/* <div className="col">
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
            </Formik> */}
 
        </div>
    )
}

function mapStateToProps(state) {
    return {
        year: state.year,
        auth: state.auth
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        setYear: (year, month) => dispatch(operations.getYearAndMonth(year, month)),
        addPost: (data_obj) => dispatch(operations.addPost(data_obj))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SacrificeForm);