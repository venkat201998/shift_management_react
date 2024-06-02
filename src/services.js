import axios from 'axios';

export const createOrUpdateUser = async (userDetails) => {
    return await axios.post(
        `${process.env.REACT_APP_API}/create-user`,
        JSON.stringify(userDetails),
        {
            headers: {
                'Content-Type': 'application/json'
            }
        }
    )
}

export const checkUser = async (email) => {
    return await axios.post(
        `${process.env.REACT_APP_API}/check-user`,
        {
            email
        },
        {
            headers: {
                'Content-Type': 'application/json'
            }
        }
    )
}

export const loginUser = async (email, password) => {
    return await axios.post(
        `${process.env.REACT_APP_API}/login`,
        {
            email,
            password
        },
        {
            headers: {
                'Content-Type': 'application/json'
            }
        }
    )
}

export const getUsers = async () => {
    return await axios.get(
        `${process.env.REACT_APP_API}/users`,
    )
}

export const updateUser = async (employeeDetails) => {
    return await axios.put(
        `${process.env.REACT_APP_API}/update-user/${employeeDetails.id}`,
        JSON.stringify(employeeDetails),
        {
            headers: {
                'Content-Type': 'application/json'
            }
        }
    )
}

export const createShift = async (shiftDetails) => {
    return await axios.post(
        `${process.env.REACT_APP_API}/create-shift`,
        JSON.stringify(shiftDetails),
        {
            headers: {
                'Content-Type': 'application/json'
            }
        }
    )
}

export const getShifts = async () => {
    return await axios.get(
        `${process.env.REACT_APP_API}/shifts`,
    )
}

export const updateShift = async (shiftDetails) => {
    return await axios.put(
        `${process.env.REACT_APP_API}/update-shift/${shiftDetails.id}`,
        JSON.stringify(shiftDetails),
        {
            headers: {
                'Content-Type': 'application/json'
            }
        }
    )
}

export const deleteShift = async (id) => {
    return await axios.delete(
        `${process.env.REACT_APP_API}/delete-shift/${id}`
    )
}