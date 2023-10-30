"use client";
import {
  InteractionRequiredAuthError,
  PublicClientApplication,
} from "@azure/msal-browser";
import axios from "axios";
import { useEffect, useState } from "react";
const GetById = ({ params }: any) => {
  console.log(params);
  const site = params?.id;
  const [token, setToken] = useState("");
  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/token/${site}`
        );
        console.log("C", response?.data?.tokens);
        setToken(response?.data?.tokens);
        // if not authenticated.
        if (response.status === 401) {
          const getAccessToken = async () => {
            try {
              const msalConfig = {
                auth: {
                  clientId: 'afb54906-660f-4a68-8178-74c638699fcc',
                  // authority: `https://login.microsoftonline.com/${tenantId}`,
                  authority: "https://login.microsoftonline.com/common/", // multi tanet
                },
                cache: {
                  // cacheLocation: BrowserCacheLocation.LocalStorage // "localStorage"
                  // cacheLocation: BrowserCacheLocation.SessionStorage // "sessionStorage"
                }
              };
              const pca = await PublicClientApplication.createPublicClientApplication(msalConfig);

              const loginRequest = {
                scopes: [`https://${site}.sharepoint.com/.default`],
                // scopes: ["Sites.Read.All", "user.read", "mail.send"]
              };

              const loginResponse = await pca.loginPopup(loginRequest);
              const myAccounts: any = pca.getAllAccounts();
              console.log("LIST MY All ACCounts====>", myAccounts);
              console.log("%c --->loginResponse", "color:hotpink", loginResponse)

              const urlTanets = myAccounts[0]?.username?.split("@")[1];
              console.log("urlTanets", urlTanets);
              if (loginResponse && loginResponse.account) {
                const silentRequest = {
                  account: loginResponse.account,
                  scopes: [`https://${site}.sharepoint.com/.default`],
                  // scopes: ["Sites.Read.All", "user.read", "mail.send"]
                };
                // const authResult = await pca.ssoSilent(silentRequest);
                let authResult;
                try {
                  authResult = await pca.ssoSilent(silentRequest);
                } catch (err) {
                  if (err instanceof InteractionRequiredAuthError) {
                    const loginResponse = await pca.loginPopup(silentRequest).catch(error => {
                      console.log("error popup", error);
                    });
                  } else {
                    console.log("error silent", err);
                  }
                }
                /*
                // //acquire token 
                const acquireTokenScope = {
                    scopes: ["Sites.Read.All", "user.read", "mail.send"],
                    loginHint: 'johnt@clayfly.com'
                };
                // try {
                const accounts = pca.getAllAccounts();
 
                if (accounts.length === 0) {
                    // No accounts available, prompt user to login
                    const loginResponse = await pca.loginPopup();
                    pca.setActiveAccount(loginResponse.account);
                } else {
                    // Use the first available account for token acquisition
                    pca.setActiveAccount(accounts[0]);
                }
 
                pca.acquireTokenSilent(acquireTokenScope).then(tokenResponse => {
                    console.log("acquire token silent", tokenResponse);
                    console.log("acquire token silent=>", tokenResponse.accessToken);
                }).catch(async (error) => {
                    if (error instanceof InteractionRequiredAuthError) {
                        return pca.acquireTokenPopup(acquireTokenScope); // fallback to interaction when silent call fails
                    }
                    console.log("acquire token silent error", error);
                })
*/
                const access_token = authResult?.accessToken;
                console.log("%c ----TokenData", "color:red", authResult)
                console.log("access token others,", site, access_token);
              }
            } catch (error) {
              console.error("Error fetching access token:", error);
            }
          }
          getAccessToken();

          // if response is ok.
        } else if (response?.status === 200) {

          // fetch tenant site url via token.
          const getSiteUrl = async () => {
            try {
              let tanetSiteUrl = '';
              const url =
                "https://prod-27.centralindia.logic.azure.com:443/workflows/abd0fd21d1e74a0d8799f663183f9199/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=JCCa0LvJT0wMFUuDlG9gxjp-fEtpn5H2tuvvTho3_8s";
              const header = {
                UserTenant: `${site}`,
              };
              const data = await axios.post(url, header);
              console.log("Cubic PowerAutomate Calls Response", data);
              const siteUrlWorkbench = await data?.data?.d?.results[0]?.NewTenant?.indexOf("workbench");
              const siteUrlTeamsHostedApp = await data?.data?.d?.results[0]?.NewTenant?.indexOf("teamshostedapp");
              if (siteUrlWorkbench === -1 || siteUrlTeamsHostedApp === -1) {
                const url = data?.data?.d?.results[0]?.NewTenant?.split("_layout")[0];
                if (url) {
                  tanetSiteUrl = url;
                }
              } else {
                const url = data?.data?.d?.results[0]?.NewTenant;
                if (url) {
                  tanetSiteUrl = url;
                }
              }

              const FetchTickets = async ()=>{
                  const token = response?.data?.tokens;
                  console.log("api call b token", token);
                  console.log("site url",tanetSiteUrl);
                  const headers = {
                    Authorization: `Bearer ${token}`,
                  };
                  try {
                    const response = await axios.get(
                      `${tanetSiteUrl}/_api/web/lists/getByTitle('HR365HDMTickets')/items`,
                      {
                        headers,
                      }
                    );
                    console.log("HDMTICKETS", response);
                  } catch (error: any) {
                    console.log("other tanet error", error);
                    console.log("Status code Error", error?.response?.status);
                  }
              }
              await FetchTickets();
            } catch (error) {
              console.error("Error Getting Cubic Tanet PowerAutomate Calls", error);
            }
          };
         await getSiteUrl();
        } else {
          throw new Error("Not found!");
        }
      } catch (error) {
        console.error("api calls error", error);

      }
    })();
  }, []);

  return <div>{JSON.stringify(token, null, 4)}</div>;
};

export default GetById;
