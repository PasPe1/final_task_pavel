import { companyFetched, fetched, fetching, fetchingError, userCompanyCreated, userCompanyDeleted } from "../../components/userProfile/userSlice";

const token = localStorage.getItem("AccesToken")

export const fetchListCompany = (request, url, setInternetError) => (dispatch) => {
    dispatch(fetching())
        request(`http://localhost:3005/company/${url}`, "GET", null, {
            'Authorization': `Bearer ${token}`, 
            'Content-Type': 'application/json'
            })
            .then(data => {dispatch(companyFetched(JSON.parse(data))); setInternetError(false)})
            .catch(err => {dispatch(fetchingError()); setInternetError(true)});
}

export const deleteCompany = (request, id) => (dispatch) => {
    dispatch(fetching())
        request(`http://localhost:3005/company/delete/${id}`, "DELETE", null, {
            'Authorization': `Bearer ${token}`, 
            'Content-Type': 'application/json'
            })
            .then(dispatch(userCompanyDeleted(id)))
            .catch(err => dispatch(fetchingError()));
}

export const fetchOptionSortCompany = (request, selectedOption) => (dispatch) => {
    dispatch(fetching())
        request(`http://localhost:3005/company/${selectedOption.value}`, 'GET', null, {
            'Authorization': `Bearer ${token}`, 
            'Content-Type': 'application/json'
            })
            .then(data => dispatch(companyFetched(JSON.parse(data))))
            .catch(err => dispatch(fetchingError()))
}

export const fetchCreateCompany = (request, companyInfo, setFilled) => (dispatch) => {
    dispatch(fetching())
        request(`http://localhost:3005/company/add`, "POST", JSON.stringify(companyInfo), {
            'Authorization': `Bearer ${token}`, 
            'Content-Type': 'application/json'
            })
            .then(data => {dispatch(userCompanyCreated(JSON.parse(data))); setFilled(false)})
            .catch(err => {dispatch(fetchingError()); setFilled(true)});
}

export const fetchUpdateCompany = (request, id, companyInfo, setSaved) => (dispatch) => {
    dispatch(fetching())
    const token = localStorage.getItem("AccesToken")
        request(`http://localhost:3005/company/update/${id}`, "PUT", JSON.stringify(companyInfo), {
            'Authorization': `Bearer ${token}`, 
            'Content-Type': 'application/json'
          })
            .then(data => {dispatch(fetched()); setSaved(true)})
            .catch(err => {dispatch(fetchingError()); setSaved(true)})
}

export const fetchCompanySingle = (request, id, setCompanyInfo) => (dispatch) => {
    dispatch(fetching());
    request(`http://localhost:3005/company/${id}`, 'GET', null ,{
        'Authorization': `Bearer ${token}`, 
        'Content-Type': 'application/json'
      })
    .then(user => {setCompanyInfo(JSON.parse(user)); dispatch(fetched())})
    .catch(err => dispatch(fetchingError()));
}