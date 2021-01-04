import axios from 'axios'
import { useState } from "react";
import {Formik} from 'formik'

const SacrificeForm = (props) => {
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

    return (
        <div>
            <form
                onSubmit={handleSubmit}
                style={{
                    // backgroundColor: "blue",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "space-around",
                    width: "25%",
                    height: "35vh",
                }}
                >
                <label>
                    Pick the date and time that you're willing to sacrifice for meeting
                    up with friends. Everything will be updated in real time.
                </label>
                <input
                    type="datetime-local"
                    id="freeTime"
                    name="freeTime"
                    min={new Date()}
                    max="2021-12-31T00:00"
                    onChange={(e) => {
                    setPickedDate(e.target.value);
                    console.log(e.target.value);
                    }}
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
                    // borderRadius: "10%",
                    // marginTop: "10px",
                    }}
                />
                <label>
                    You can add a comment - for exapmle - how much time you'd like to
                    spend or what's your idea for a meeting.
                </label>
                <input
                    type="text"
                    style={{ width: "75%" }}
                    onChange={(e) => {
                    setMsgToDate(e.target.value);
                    }}
                />
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

            <Formik
                initialValues={{
                        date: null,
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
                onSubmit= {(values) => {
                    console.log(values)
                    // const bezZmienianego = data.filter(x=>x.id!==szczegoloweID)
                    // const values2 = {...values,id: szczegoloweID}
                    // setData([...bezZmienianego,values2])
                    // setczyedit("nie")
                    axios.get("http://localhost:8080").then(result => alert(result.data)).catch(err => alert(err))
                }}
            >
                {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleSubmit,
                }) => (
                <form onSubmit={handleSubmit}>
                    <label>Data i czas </label>
                    <input
                        type="datetime-local"
                        name="date"
                        onChange={handleChange}
                        value={values.data}
                    />
                    {errors.data && touched.data && errors.data}
                    <br/>
                    <label>Message </label>
                    <input
                        type="text"
                        name="text"
                        onChange={handleChange}
                        value={values.text}
                    />
                    {errors.text && touched.text && errors.text}
                    <br/>
                    <br/>
                    <button type="submit" style={{backgroundColor: "green",padding: "5px",fontWeight: "bold",color: "lightgray"}}>
                        Submit
                    </button>
                </form>
                )}
            </Formik>

        </div>
    )
}
export default SacrificeForm;