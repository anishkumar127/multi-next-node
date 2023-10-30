"use client";
import useToken from "@/app/useToken";
import {
  InteractionRequiredAuthError,
  PublicClientApplication,
} from "@azure/msal-browser";
import axios from "axios";
import { useEffect, useState } from "react";
const GetById = ({ params }: any) => {
  console.log(params);
  const site = params?.id;
  // const x = useToken({site:site});
  const [token, setToken] = useState("");
  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/token/${site}`
        );
        // if (Object.keys(response?.data || {}).length > 0) {
          console.log("C",response?.data?.tokens);
          setToken(response?.data?.tokens);
        // } else {
        //   throw new Error("Not found token!");
        // }
      } catch (error) {
        console.error("api calls error", error);
        // const getSilentToken = async () => {
        //   const msalConfig = {
        //     auth: {
        //       clientId: "f3a16a31-d908-4145-b5ef-1d7ce6e03f68", // clayfly
        //       authority: "https://login.microsoftonline.com/common/", // multi tanet
        //     },
        //     cache: {
        //       // cacheLocation: BrowserCacheLocation.LocalStorage // "localStorage"
        //       // cacheLocation: BrowserCacheLocation.SessionStorage // "sessionStorage"
        //     },
        //   };
        //   const pca =
        //     await PublicClientApplication.createPublicClientApplication(
        //       msalConfig
        //     );

        //   const accounts = await pca.getAllAccounts();
        //   if (accounts.length === 0) {
        //     const loginRequest = {
        //       scopes: [`https://${site}.sharepoint.com/.default`],
        //     };
        //     const loginResponse = await pca.loginPopup(loginRequest);
        //     await pca.setActiveAccount(loginResponse.account);
        //   } else {
        //     await pca.setActiveAccount(accounts[0]);
        //   }
        //   //acquire token
        //   const acquireTokenScope = {
        //     scopes: [`https://${site}.sharepoint.com/.default`],
        //     loginHint: `${accounts[0]?.username}`,
        //   };

        //   pca
        //     .acquireTokenSilent(acquireTokenScope)
        //     .then((tokenResponse: any) => {
        //       console.log("acquire token silent", tokenResponse);
        //       console.log(
        //         "Context acquire token silent=>",
        //         tokenResponse.accessToken
        //       );
        //       setToken(tokenResponse.accessToken);
        //     })
        //     .catch(async (error: any) => {
        //       // if (error instanceof InteractionRequiredAuthError) {
        //       //     return await pca.acquireTokenPopup(acquireTokenScope); // fallback to interaction when silent call fails
        //       // }
        //       if (error instanceof InteractionRequiredAuthError) {
        //         const loginResponse = await pca
        //           .loginPopup(acquireTokenScope)
        //           .catch((error: any) => {
        //             console.log("error popup", error);
        //           });
        //       } else {
        //         console.log("error silent", error);
        //       }
        //       console.log("acquire token silent error", error);
        //     });
        // };
        // getSilentToken();
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
        console.log("api call b token",token);
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      try {
        const response = await axios.get(
          `https://${site}.sharepoint.com/sites/anish/_api/web/lists/getByTitle('HR365HDMTickets')/items`,
          {
            headers,
          }
        );
        console.log("HDMTICKETS", response);
      } catch (error:any) {
        console.log("other tanet error", error);
        console.log("Status code Error", error?.response?.status);
        const StatusCode = error?.response?.status;
        // if(StatusCode===401){
        //     const getSilentToken = async () => {
        //         const msalConfig = {
        //           auth: {
        //             clientId: "f3a16a31-d908-4145-b5ef-1d7ce6e03f68", // clayfly
        //             authority: "https://login.microsoftonline.com/common/", // multi tanet
        //           },
        //           cache: {
        //             // cacheLocation: BrowserCacheLocation.LocalStorage // "localStorage"
        //             // cacheLocation: BrowserCacheLocation.SessionStorage // "sessionStorage"
        //           },
        //         };
        //         const pca =
        //           await PublicClientApplication.createPublicClientApplication(
        //             msalConfig
        //           );
      
        //         const accounts = await pca.getAllAccounts();
        //         if (accounts.length === 0) {
        //           const loginRequest = {
        //             scopes: [`https://${site}.sharepoint.com/.default`],
        //           };
        //           const loginResponse = await pca.loginPopup(loginRequest);
        //           await pca.setActiveAccount(loginResponse.account);
        //         } else {
        //           await pca.setActiveAccount(accounts[0]);
        //         }
        //         // acquire token
        //         const acquireTokenScope = {
        //           scopes: [`https://${site}.sharepoint.com/.default`],
        //           loginHint: `${accounts[0]?.username}`,
        //         };
      
        //         pca
        //           .acquireTokenSilent(acquireTokenScope)
        //           .then((tokenResponse: any) => {
        //             console.log("acquire token silent", tokenResponse);
        //             console.log(
        //               "Context acquire token silent=>",
        //               tokenResponse.accessToken
        //             );
        //             setToken(tokenResponse.accessToken);
        //           })
        //           .catch(async (error: any) => {
        //             // if (error instanceof InteractionRequiredAuthError) {
        //             //     return await pca.acquireTokenPopup(acquireTokenScope); // fallback to interaction when silent call fails
        //             // }
        //             if (error instanceof InteractionRequiredAuthError) {
        //               const loginResponse = await pca
        //                 .loginPopup(acquireTokenScope)
        //                 .catch((error: any) => {
        //                   console.log("error popup", error);
        //                 });
        //             } else {
        //               console.log("error silent", error);
        //             }
        //             console.log("acquire token silent error", error);
        //           });
        //       };
        //       getSilentToken();
        // }
        
      }
    })();
  }, [token]);

  return <div>{JSON.stringify(token, null, 4)}</div>;
};

export default GetById;
