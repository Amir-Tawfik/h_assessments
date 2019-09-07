
// __tests__/DynamicFormjs
import '@testing-library/jest-dom/extend-expect'
import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import DynamicForm from '../components/DynamicForm'


describe('<DynamicForm/> List of Rooms selection', () => {

    const TEST_ROOMS_COUNT = 4;
    const TEST_ADDITIONAL_ROOMS = TEST_ROOMS_COUNT - 1;
    const TEST_ADULT_OPTIONS = [1, 2];
    const TEST_CHILDREN_OPTIONS = [0, 1, 2, 3];

    const component_DynamicForm = <DynamicForm roomsCount={TEST_ROOMS_COUNT} childrenOptions={TEST_CHILDREN_OPTIONS} adultOptions={TEST_ADULT_OPTIONS}> </DynamicForm>;



    test('Test props values', () => {
        expect(TEST_ADULT_OPTIONS).toEqual(expect.arrayContaining([1, 2]))
        expect(TEST_ROOMS_COUNT).toBeGreaterThanOrEqual(4)
    })

    test('It populate correct number of rooms unchecked checkboxes', () => {

        const { getAllByLabelText } = render(component_DynamicForm);

        expect(getAllByLabelText(/room/i)).toHaveLength(TEST_ADDITIONAL_ROOMS);

        for (let i = 0; i < getAllByLabelText(/room/i).length; i++) {
            expect(getAllByLabelText(/room/i)[i].checked).toBeFalsy();
        }
    })


    test('If the user checks the Room 4 checkbox, Room 2 and Room 3 should auto-check', () => {

        const { getByLabelText } = render(component_DynamicForm);

        fireEvent.click(getByLabelText("Room 4"));

        expect(getByLabelText("Room 3").checked).toBeTruthy();
        expect(getByLabelText("Room 2").checked).toBeTruthy();
    })


    test('If the user uncheck the Room 3 checkbox, Room 3 and Room 4 should be unselected', () => {

        const { getByLabelText } = render(component_DynamicForm);

        // First select all checboxes by click on last one.
        fireEvent.click(getByLabelText("Room " + TEST_ROOMS_COUNT));

        // Then uncheck Room 3
        fireEvent.click(getByLabelText("Room 3"));

        expect(getByLabelText("Room 3").checked).toBeFalsy();
        expect(getByLabelText("Room 4").checked).toBeFalsy();
    })


    test(`By default, the Adult and Children drop-down fields for rooms 2+ should be disabled.
          Upon checking a checkbox the drop-down fields associated with room should be enabled.`, () => {

        const { getAllByLabelText, getByLabelText } = render(component_DynamicForm);

        // to start after room one
        const index = 1;
        for (let i = index; i < getAllByLabelText(/adults/i).length; i++) {
            expect(getAllByLabelText(/adults/i)[i].disabled).toBeTruthy();
            expect(getAllByLabelText(/children/i)[i].disabled).toBeTruthy();
        }

        // select all checboxes by click on last one.
        fireEvent.click(getByLabelText("Room " + TEST_ROOMS_COUNT));

        // Check that last room inputs are enabled
        const roomIndex = TEST_ROOMS_COUNT - 1;
        expect(getAllByLabelText(/adults/i)[roomIndex].disabled).toBeFalsy();
        expect(getAllByLabelText(/children/i)[roomIndex].disabled).toBeFalsy();

    })


    test(`Any room that is checked should have a selected state, whose presentation is identical to the 'Room 1' field.`, () => {

        const { getAllByLabelText, getByLabelText } = render(component_DynamicForm);

        const firstRoom_AdultsDropdown = getAllByLabelText(/adults/i)[0];
        const firstRoom_childrenDropdown = getAllByLabelText(/children/i)[0];
        const secondRoom_AdultsDropdown = getAllByLabelText(/adults/i)[1];
        const secondroom_childrenDropdown = getAllByLabelText(/children/i)[1];

        fireEvent.change(firstRoom_AdultsDropdown, { target: { value: "2" } })
        fireEvent.change(firstRoom_childrenDropdown, { target: { value: "2" } })

        fireEvent.click(getByLabelText("Room " + 2));

        expect(secondRoom_AdultsDropdown.value).toBe(firstRoom_AdultsDropdown.value);
        expect(secondroom_childrenDropdown.value).toBe(firstRoom_childrenDropdown.value);
    })


    test(`Adults/Children drop-down fields should become disabled and return to default values IF Any room is unchecked`, () => {

        const { getAllByLabelText, getByLabelText } = render(component_DynamicForm);

        //// as first element should be the initial state
        const defaultValues_Adults = "" + TEST_ADULT_OPTIONS[0];
        const defaultValues_Children = "" + TEST_CHILDREN_OPTIONS[0];
        const secondRoom_AdultsDropdown = getAllByLabelText(/adults/i)[1];
        const secondroom_childrenDropdown = getAllByLabelText(/children/i)[1];

        fireEvent.click(getByLabelText("Room " + 2));

        fireEvent.change(secondRoom_AdultsDropdown, { target: { value: "2" } })
        fireEvent.change(secondroom_childrenDropdown, { target: { value: "1" } })
        fireEvent.click(getByLabelText("Room " + 2));

        expect(secondRoom_AdultsDropdown.value).toBe(defaultValues_Adults);
        expect(secondroom_childrenDropdown.value).toBe(defaultValues_Children);
    })
})


describe('<SubmitInput/> Upon clicking Submit,  save correct values to local Storage', () => {

    const TEST_ROOMS_COUNT = 4;
    const TEST_ADULT_OPTIONS = [1, 2];
    const TEST_CHILDREN_OPTIONS = [0, 1, 2, 3];

    const component_DynamicForm = <DynamicForm roomsCount={TEST_ROOMS_COUNT} childrenOptions={TEST_CHILDREN_OPTIONS} adultOptions={TEST_ADULT_OPTIONS}> </DynamicForm>;



    test(`Submitting form with checking 3 rooms and Room 3 only has 2 children`, async () => {

        const { getByText, getByLabelText, getAllByLabelText } = render(component_DynamicForm);

        fireEvent.click(getByLabelText("Room " + 3));
        fireEvent.change(getAllByLabelText(/children/i)[2], { target: { value: "2" } })

        fireEvent.click(getByText(/submit/i))

        await expect(window.localStorage).toHaveProperty('roomsSavedData');

        const roomsSavedData = await JSON.parse(window.localStorage.roomsSavedData);

        expect(roomsSavedData).toHaveLength(3);

        const obj_lastRoom = roomsSavedData[roomsSavedData.length - 1]
        const obj_room3 = {
            roomNumber: 3,
            adultsCount: 1,
            childrenCount: 2
        }
        expect(obj_lastRoom).toMatchObject(obj_room3);
        expect(obj_lastRoom).toEqual(expect.not.objectContaining({ selected: false }));

        window.localStorage.removeItem('roomsSavedData');
    })

    
    test(`Submitting form with checking 4 rooms and all rooms include 2 adults no children`, async () => {

        const { getByText, getByLabelText, getAllByLabelText } = render(component_DynamicForm);

        fireEvent.change(getAllByLabelText(/adults/i)[0], { target: { value: "2" } })
        
        fireEvent.click(getByLabelText("Room " + 2));

        fireEvent.click(getByText(/submit/i))

        await expect(window.localStorage).toHaveProperty('roomsSavedData');

        const roomsSavedData = await JSON.parse(window.localStorage.roomsSavedData);

        expect(roomsSavedData).toHaveLength(2);

        const obj_rooms = {
            adultsCount: 2,
            childrenCount: 0
        }
        for (let i = 0; i < roomsSavedData.length; i++) {
            obj_rooms.roomNumber = i + 1;
            expect(roomsSavedData[i]).toMatchObject(obj_rooms);
        }

        window.localStorage.removeItem('roomsSavedData');
    })
})
