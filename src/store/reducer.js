const initialState  =  (function(){

    const defaultData =  {
                            userAuth: false,
                            token: null,
                            userName: null,
                            userId: null,
                            host : "https://tmwk-api.herokuapp.com",
                            timeout: Date.now()
                        };

    if (typeof(Storage) !== "undefined") {

        if (typeof(localStorage.user) !== "undefined"){

            const obj = JSON.parse(localStorage.user);

            if (obj.timeout > Date.now()){

                return obj;
            }
            else{

                return defaultData;
            }
        }
        else{

            return defaultData;
        }
    } 
    else {
    
      return defaultData;    
    }
})();


const reducer = ( state = initialState, action ) => {

    let update = {}

    switch ( action.type ) {
        
        case "LOGGED_IN":

            const data = action.data;

            const timeout = Date.now() + 82800000;
            
            update = {
                        ...state, ...data, userAuth: true, timeout: timeout
                    }

            break;

        case "LOGGED_OUT":
            
            update = {
                        ...state,  initialState
                    }

            break;

        default:

                update = state
    }

    /* Save state to local storage */

    if (typeof(Storage) !== "undefined") {

      localStorage.user = JSON.stringify(update);
    }

    return update;
};

export default reducer;