import {connect} from 'react-redux'


const MonthDisplay = (props) => {

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
    
    const handleNext = () => {
        // console.log(props.month)
        // console.log(months.indexOf(props.month.name))
        if (months.indexOf(props.month.name)+1>11){
            props.nextYear()
        }
        console.log("next")
    } 

    const handlePrevious = () => {
        // console.log(props.month)
        // console.log(months.indexOf(props.month.name))
        if (months.indexOf(props.month.name)-1<0){
            props.prevYear()
        } else {

        }
        console.log("prev")
    } 

    return (
        <div
            id="datesElement"
            style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-around",
                alignItems: "center",
                width: "40%",
                borderLeft: "solid white 2px",
                borderRight: "solid white 2px",
                padding: "0 40px",
            }}
            >
                <div 
                style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
                }}
                >
                    <button
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
                    onClick={handlePrevious}
                    >
                    🢀 Previous
                    </button>
                    <h2>{props.year.month_to_display.name}</h2>
                    <button
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
                    onClick={handleNext}
                    >
                    Next 🢂
                    </button>
                </div>
        </div>
    )
}

function mapStateToProps(state) {
    return {
        month: state.displayedDays,
        year: state.year,
        auth: state.auth,
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        nextMonth: (month) => dispatch(({type: "NEXT_MONTH", payload: {month: month}})),
        prevMonth: (month) => dispatch(({type: "PREV_MONTH", payload: {month: month}})),
        nextYear: () => dispatch(({type: "NEXT_YEAR"})),
        prevYear: () => dispatch(({type: "PREV_YEAR"})),
        swapYear: (year, month) => dispatch(({type: "SWAP", payload: {year: year, month_to_display: month}}))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MonthDisplay);