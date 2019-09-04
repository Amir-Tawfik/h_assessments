import React, { useState } from 'react';

export default function DynamicForm(props) {

    ///// Constructor and initiations
    let roomsSet = [];
    var count;
    // retrieve saved data if submitted before and set room fields
    if (localStorage.getItem('roomsSavedData')) {
        const roomsSavedData = JSON.parse(localStorage.getItem('roomsSavedData'))
        roomsSet = roomsSet.concat(roomsSavedData);
        count = roomsSet.length;
    } else {
        // else 
        roomsSet = [{ roomNumber: 1, adultsCount: 1, childrenCount: 0, selected: true }]
        count = 1;
    }
    for (let num = count + 1; num <= props.roomsCount; num++) {
        roomsSet.push({ roomNumber: num, adultsCount: 1, childrenCount: 0, selected: false })
    }
    const [rooms, setRooms] = useState(roomsSet);


    ///// Handling functions
    const handleDropdownChange = roomNumber => event => {
        const name = event.target.name
        const value = event.target.value
        const index = rooms.findIndex(r => r.roomNumber === roomNumber)
        const newRooms = rooms.map((room, sidx) => {
            if (index !== sidx) return room;
            return { ...room, [name]: parseInt(value) };
        });
        setRooms(newRooms);
    }

    const handleCheckboxChange = roomNumber => event => {
        const checked = event.target.checked;
        const newRooms = rooms.map((room) => {
            if (checked === true && roomNumber < room.roomNumber) return room;
            if (checked === false && roomNumber > room.roomNumber) return room;
            return {
                ...room, selected: checked,
                adultsCount: checked ? room.selected ? room.adultsCount : rooms[0].adultsCount : props.adultOptions[0],
                childrenCount: checked ? room.selected ? room.childrenCount : rooms[0].childrenCount : props.childrenOptions[0]
            };
        });
        setRooms(newRooms);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const roomsToSubmit = rooms.filter(r => r.selected)
        localStorage.setItem('roomsSavedData', JSON.stringify(roomsToSubmit));
    }

    const clearSavedData = (event) => {
        event.preventDefault();
        localStorage.removeItem('roomsSavedData');
        window.location.reload(false);
    }



    ///// HTML Contents
    const Checkbox = (props) => {
        return props.roomNumber > 1 ?
            <input id={"checkbox-" + props.roomNumber} checked={props.selected} onChange={handleCheckboxChange(props.roomNumber)} type="checkbox"></input> : ''
    }

    const SubmitField = () =>
        <fieldset className="submit-field">
            <input className="btn btn-primary" type="submit" value="Submit" />
            <button className="btn btn-default" onClick={clearSavedData}>Clear Saved Data</button>
        </fieldset>;

    return (
        <main>
            <form className="dynamic-form container" onSubmit={handleSubmit}>
                <section className="row">
                    {rooms.map((room, key) =>
                        <fieldset key={room.roomNumber} className="input-field">
                            <h6>
                                <Checkbox roomNumber={room.roomNumber} selected={room.selected}></Checkbox>
                                <label htmlFor={"checkbox-" + room.roomNumber} ><strong>Room {room.roomNumber}</strong></label>
                            </h6>
                            <div className={room.selected ? "row" : "disabled row"}>
                                <section className="col-sm-6">
                                    <label htmlFor={"adultsCount-" + room.roomNumber}>Adults (18+)</label>
                                    <select name="adultsCount" value={room.adultsCount} onChange={handleDropdownChange(room.roomNumber)}
                                        disabled={!room.selected} id={"adultsCount-" + room.roomNumber}>
                                        {props.adultOptions.map((number) => <option key={number} value={number}>{number}</option>)}
                                    </select>
                                </section>
                                <section className="col-sm-6">
                                    <label htmlFor={"childrenCount-" + room.roomNumber} >Children (0-17)</label>
                                    <select name="childrenCount" value={room.childrenCount} onChange={handleDropdownChange(room.roomNumber)}
                                        disabled={!room.selected} id={"childrenCount-" + room.roomNumber}>
                                        {props.childrenOptions.map((number) => <option key={number} value={number}>{number}</option>)}
                                    </select>
                                </section>
                            </div>
                        </fieldset>)}
                </section>
                <section className="row">
                    <SubmitField></SubmitField>
                </section>
            </form>
        </main>
    )
}
