import express from "express";
import appRoot from "app-root-path";

const configPublic = (app) => {
  app.use(express.static(appRoot + "/src/public/"));
};
export default configPublic;
