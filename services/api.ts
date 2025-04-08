/* eslint-disable @typescript-eslint/no-explicit-any */

import nProgress from "nprogress";
import React from "react";
import showAlert from "./showAlert";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

const requestGetApi = async (
  endPoints: string,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>> | null
) => {
  try {
    nProgress.start();
    const response = await fetch(endPoints, {
      method: 'GET'
    });
    const data = await response.json();
    if(setIsLoading)
      setIsLoading(false);
    nProgress.done();
    return data;
  } catch (err) {
    console.error("Error: ", err);
  }
}

const postDataOnly = async (
  endPoints: string,
  data: any,
  method: string = "POST"
) => {
  nProgress.start();
  const response = await fetch(endPoints, {
    method: method,
    body: data instanceof FormData ? data : JSON.stringify(data)
  })
  console.log(response);
  nProgress.done();
  return response;
}

const postDataWithRedirectServices = async (
  endPoints: string,
  data: any,
  router: AppRouterInstance,
  optionalErrorMessages: string,
  method: string = 'POST',
) => {
  const response = method === 'GET' 
    ? await requestGetApi(endPoints, null) 
    : (method === 'POST' || method === "PUT" || method === "DELETE") && await postDataOnly(endPoints, data, method);
    
  const jsonResponse = await response.json();
  if(response.ok) {
    showAlert(jsonResponse.message, router, "success", '/this-page');
  } else {
    showAlert(jsonResponse.error || optionalErrorMessages, router, "error", '/auth');
  }
}

export {
  requestGetApi,
  postDataOnly,
  postDataWithRedirectServices
}