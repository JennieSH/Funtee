const initState = {
    fruit:[
        { name : "banana" },
        { name : "apple" }
    ]
};
const testReducer = ( state = initState, action) =>{
    switch (action.type) {
        case "CREATE_FRUIT":
            console.log("create fruit", action.fruit);
            return state;
        case "CREATE_FRUIT_ERROR":
            console.log("create fruit error", action.err);
            return state;
        default:
            return state;
    }
}

export default testReducer