import Day from "./Day"

const DaysDisplay = (props) => {
    console.log(props)
    return (
        <div style={{width: "100%"}}>
            {props.month.days.map(day=><Day data={day}/>)}
        </div>
    )
}

export default DaysDisplay;