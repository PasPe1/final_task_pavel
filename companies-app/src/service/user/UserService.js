import { fetched, fetching, fetchingError, usersDeleted, usersFetched } from "../../components/userProfile/userSlice"

const token = localStorage.getItem("AccesToken")

export const fetchSignin = (request, userOnEnter, authenticate) => (dispatch) => {
    dispatch(fetching())
        request("http://localhost:3005/auth/signin", "POST", JSON.stringify(userOnEnter))
            .then(data => {localStorage.setItem("AccesToken", data)})
            .then(data => dispatch(fetchUserByEmail(request, ({"email": userOnEnter.email}))))
            .catch(e => dispatch(fetchingError()))
}

export const fetchUserByEmail = (request, email) => (dispatch) => {
        request("http://localhost:3005/user/byEmail", "POST", JSON.stringify(email), {
            'Authorization': `Bearer ${token}`, 
            'Content-Type': 'application/json'
            })
            .then(data => {localStorage.setItem("user", data); dispatch(fetched())})
}

export const fetchSignUp = (request, navigate, newUser, setSignUpError) => (dispatch) => {
    dispatch(fetching())
        request(`http://localhost:3005/auth/signup`, "POST", JSON.stringify(newUser), {
            'Authorization': `Bearer ${token}`, 
            'Content-Type': 'application/json'
            })
            .then(data => {navigate('/signIn'); dispatch(fetched())})
            .catch(err => {dispatch(fetchingError()); setSignUpError()});
}

export const deleteUser = (request, id) => (dispatch) => {
    dispatch(fetching())
        request(`http://localhost:3005/user/${id}`, "DELETE", null, {
            'Authorization': `Bearer ${token}`, 
            'Content-Type': 'application/json'
            })
            .then(dispatch(usersDeleted(id)))
            .catch(err => dispatch(fetchingError()));
}

export const fetchAllUser = (request) => (dispatch) => {
    dispatch(fetching())
        request(`http://localhost:3005/user/all`, "GET", null, {
            'Authorization': `Bearer ${token}`, 
            'Content-Type': 'application/json'
            })
            .then(data => dispatch(usersFetched(JSON.parse(data))))
            .catch(err => dispatch(fetchingError()));
}

export const fetchOptionSortUser = (request, selectedOption) => (dispatch) => {
    dispatch(fetching());
        request(`http://localhost:3005/user/${selectedOption.value}`, 'GET', null, {
            'Authorization': `Bearer ${token}`, 
            'Content-Type': 'application/json'
            })
        .then(data => dispatch(usersFetched(JSON.parse(data))))
        .catch(err => dispatch(fetchingError()))
}

export const updateUser = (request, userInfo, setSaved) => (dispatch) => {
    dispatch(fetching())
    const token = localStorage.getItem("AccesToken")
        request(`http://localhost:3005/user/update`, "PUT", JSON.stringify(userInfo), {
            'Authorization': `Bearer ${token}`, 
            'Content-Type': 'application/json'
            })
            .then(data => {localStorage.setItem('user', data); dispatch(fetched()); setSaved(true)})
            .catch(err => {dispatch(fetchingError()); setSaved(false)})
}

export const fetchUpdateUser = (request, userInfo, setSaved) => (dispatch) => {
    dispatch(fetching())
    const token = localStorage.getItem("AccesToken")
        request(`http://localhost:3005/user/updateAdmin`, "PUT", JSON.stringify(userInfo), {
            'Authorization': `Bearer ${token}`, 
            'Content-Type': 'application/json'
          })
            .then(data => {dispatch(fetched()); setSaved(true)})
            .catch(err => {dispatch(fetchingError()); setSaved(false)})
}

export const fetchUserSingle = (request, id, setUserInfo) => (dispatch) => {
    dispatch(fetching());
    request(`http://localhost:3005/user/${id}`, 'GET', null ,{
        'Authorization': `Bearer ${token}`, 
        'Content-Type': 'application/json'
      })
    .then(user => {setUserInfo(JSON.parse(user)); dispatch(fetched())})
    .catch(err => dispatch(fetchingError()));
}