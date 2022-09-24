import { gql } from '@apollo/client';


export const Login = gql`
    mutation {
        tokenAuth(
            password:"jegnus@123",
            username:"D1",

        ) {
            token
            success
            errors
            unarchiving
            refreshToken
        }

    }
`

export const Logout = gql`
    mutation {
        tokenAuth(
            password:"jegnus@123",
            username:"D1",

        ) {
            token
            success
            errors
            unarchiving
            refreshToken
        }

    }
`

export const GetRestaurants = gql`
    query{
        Restaurants{
            id
        }
    }
`


