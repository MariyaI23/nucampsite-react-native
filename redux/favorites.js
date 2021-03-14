import * as ActionTypes from "./ActionTypes";

//We are creating this reducer which receives the state as an empty array if nothing has been marked as favorite yet
//Then it will check if the acttion type is ADD_FAVORITE. If that is the case then we want to store the ids of each campsite that was favorited, in the state as an array.
//Then if the user tries to add a new favorite, we will receive the id of the campsite that was added as the payload of the ADD_FAVORITE action.
//First we need to check if that campsite id already exists in the state's array by using the first if statement with the array method "includes".
//The includes method takes a single argument, in this case the action.payload and checks to see if it matches a single item in the array. If so, ti will return with a boolean value of true, otherwise it will be false.
//If true it will return the previous state as nothing needs to change, if false-it'll return a new state with a new campsite id concatenated to the end of the state's array.
//In the DELETE_FAVORITE case we are filtering through the favorites array from the state. The filter method will return a new array that includes all the favorite items that do not match the action.payload(which included all the Ids for the campsites).
//That way we get a new array that includes all the favorites without the ones we have deleted. And we can return that as the new state.


export const favorites = (state = [], action) => {
    switch (action.type) {
        case ActionTypes.ADD_FAVORITE:
            if(state.includes(action.payload)) {
                return state;
            }
            return state.concat(action.payload);

            case ActionTypes.DELETE_FAVORITE:
                return state.filter(favorite => favorite !== action.payload);

            default:
                return state;
    }
};