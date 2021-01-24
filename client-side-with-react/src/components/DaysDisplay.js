import Day from "./Day"

const DaysDisplay = (props) => {
    // console.log(props)
    return (
        <div style={{width: "100%"}}>
            {props.month.days.map((day, index)=><Day key={index} data={day}/>)}
        </div>
    )
}

export default DaysDisplay;