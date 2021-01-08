const DaysDisplay = (props) => {
    console.log(props)
    return (
        <div>
            {props.month.days.map(day=><p>{day.day}</p>)}
        </div>
    )
}

export default DaysDisplay;