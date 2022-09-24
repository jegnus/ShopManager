import { ApolloClient, InMemoryCache, ApolloProvider, gql } from "@apollo/client";
//
//
// export const client = new ApolloClient({
//   uri: "https://jegnus.com/graphql",
//   headers: {
//     authorization: "JWT " + await asyncStorage.getItem("userToken") || "",
//   },
//   cache: new InMemoryCache(),
// });

import {  createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
    uri: "https://jegnus.com/graphql",
 //   uri: "http://127.0.0.1:8000/graphql",

});

const authLink = setContext ( (_, { headers }) => {
    // get the authentication token from local storage if it exists
    const userToken =  localStorage.getItem("token");
    //console.log("client",userToken);
    // return the headers to the context so httpLink can read them
    return {
        headers: {
            ...headers,
            authorization: userToken ? `JWT ${userToken}` : "",
        }
    }
});

export const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
});




// export const client = new ApolloClient({
//   uri: "http://7783-2401-4900-563d-b424-2db0-f485-ed8d-b0ee.eu.ngrok.io/graphql",
//   headers: {
//     authorization: "token eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6ImFuaWxtYWl0eSIsImV4cCI6MTY2MDU0NDY3NCwib3JpZ0lhdCI6MTY2MDU0NDM3NH0.0fkeub93E5GcIHoaAqu43g5eVvgpufCxEE10w2J-aC0" ,
//   },
//   cache: new InMemoryCache(),
// });

