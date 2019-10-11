const initialState = {
    fetching: false,
    name: null,
    price: null,
    details:null,
    image:null,
    allItems:null
   };
const item = (state = initialState, action) => {
    // console.log("consoling Loggggggg in switch :",action)  
    switch (action.type) {

        case 'ADD_ITEM_REQUEST': {
            return {
                fetching: true
            };
        }
        case 'ADD_ITEM_SUCCESS': {
            return {
                ...state,
                fetching: false,
                ...action.payload,
            };
        }
        case 'ADD_ITEM_FAILED': {
            return {
                ...state,
                fetching: false
            };
        }
        case 'GET_ALL_ITEMS_REQUEST': {
            return {
                fetching: true
            };
        }
        case 'GET_ALL_ITEMS_SUCCESS': {
            return {
                ...state,
                fetching: false,
                ...action.payload,
            };
        }
        case 'GET_ALL_ITEMS_FAILED': {
            return {
                ...state,
                fetching: false
            };
        }
        default:
            return state
    }
};
   export default item;