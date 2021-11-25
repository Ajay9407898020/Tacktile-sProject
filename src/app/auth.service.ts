export class AuthService {
    loggedIn = false;

    loggedinUser : any ;
    
    constructor() {}

    /***  FETCH THE USER FROM SESSION STORAGE CHECK WEATHER THE USER IS LOGGED IN IF YES THEN RETURN TRUE OTHERWISE FALSE 
     * @param
     * 
     * @returns : boolean
     * 
     * ***/
    isAuthenticated(): boolean {

        let userInfo: any = sessionStorage.getItem('loggedInUser');
        this.loggedinUser = userInfo !== undefined ? JSON.parse(userInfo) : {};

        if (this.loggedinUser !== null && this.loggedinUser!== undefined) {

            return true;
        } else {

            return false;
        }
    }

    // RETURNS THE LOGGED IN USER ID FROM THE SESSION STORAGE
    authInfo(requiredKey : string = "") {

        let userInfo: any = sessionStorage.getItem('loggedInUser');

        this.loggedinUser = userInfo !== undefined ? JSON.parse(userInfo) : {};
        
        if(requiredKey !== '') {

            if(this.loggedinUser.hasOwnProperty(requiredKey)){

                return this.loggedinUser[requiredKey]
            } else {
                
                return null;
            }
        }
        return this.loggedinUser;
    }

}