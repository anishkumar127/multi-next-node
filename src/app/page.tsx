"use client";

import {
  InteractionRequiredAuthError,
  PublicClientApplication,
} from "@azure/msal-browser";
import { useEffect } from "react";

export default function Home() {
  // Get Silent Token
  // useEffect(() => {
  //   const getSilentToken = async () => {
  //     const msalConfig = {
  //       auth: {
  //         clientId: "f3a16a31-d908-4145-b5ef-1d7ce6e03f68", // clayfly
  //         authority: "https://login.microsoftonline.com/common/", // multi tanet
  //       },
  //       cache: {
  //         // cacheLocation: BrowserCacheLocation.LocalStorage // "localStorage"
  //         // cacheLocation: BrowserCacheLocation.SessionStorage // "sessionStorage"
  //       },
  //     };
  //     const pca = await PublicClientApplication.createPublicClientApplication(
  //       msalConfig
  //     );

  //     const accounts = await pca.getAllAccounts();
  //     if (accounts.length === 0) {
  //       const loginRequest = {
  //         scopes: [`https://${"cubicdirect"}.sharepoint.com/.default`],
  //       };
  //       const loginResponse = await pca.loginPopup(loginRequest);
  //       await pca.setActiveAccount(loginResponse.account);
  //     } else {
  //       await pca.setActiveAccount(accounts[0]);
  //     }
  //     //acquire token
  //     const acquireTokenScope = {
  //       scopes: [`https://${"cubicdirect"}.sharepoint.com/.default`],
  //       loginHint: `${accounts[0]?.username}`,
  //     };

  //     pca
  //       .acquireTokenSilent(acquireTokenScope)
  //       .then((tokenResponse) => {
  //         console.log("acquire token silent", tokenResponse);
  //         console.log(
  //           "Context acquire token silent=>",
  //           tokenResponse.accessToken
  //         );
  //       })
  //       .catch(async (error) => {
  //         // if (error instanceof InteractionRequiredAuthError) {
  //         //     return await pca.acquireTokenPopup(acquireTokenScope); // fallback to interaction when silent call fails
  //         // }
  //         if (error instanceof InteractionRequiredAuthError) {
  //           const loginResponse = await pca
  //             .loginPopup(acquireTokenScope)
  //             .catch((error) => {
  //               console.log("error popup", error);
  //             });
  //         } else {
  //           console.log("error silent", error);
  //         }
  //         console.log("acquire token silent error", error);
  //       });
  //   };
  //   getSilentToken();
  // }, []);

  return <main>home</main>;
}
