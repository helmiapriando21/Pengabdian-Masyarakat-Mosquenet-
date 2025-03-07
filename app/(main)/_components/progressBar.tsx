"use client"

import Router from "next/router";
import nProgress from "nprogress";
import { useEffect } from "react";

nProgress.configure({showSpinner: true});

export default function ProgressBar() {

  useEffect(() => {
    const handleStart = () => {
      nProgress.start();
    };

    const handleComplete = () => {
      nProgress.done();
    }

    Router.events.on('routeChangeStart', handleStart);
    Router.events.on('routeChangeComplete', handleComplete);
    Router.events.on('routeChangeError', handleComplete);

    return () => {
      Router.events.on('routeChangeStart', handleStart);
      Router.events.on('routeChangeComplete', handleComplete);
      Router.events.on('routeChangeError', handleComplete);
    };
  }, [])

  return <div></div>;
}