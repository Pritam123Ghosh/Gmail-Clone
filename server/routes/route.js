import experss from "express";
import { saveSentEmails, getEmails, moveEmailsToBin, toggleStarredEmails, deleteEmails, searchEmails } from "../controller/email-controller.js";

const routes = experss.Router();
routes.post('/save', saveSentEmails)
routes.get('/emails/:type', getEmails)
routes.post('/save-draft', saveSentEmails)
routes.post('/bin', moveEmailsToBin)
routes.post("/starred", toggleStarredEmails)
routes.delete('/delete', deleteEmails);
routes.get('/search/:key', searchEmails)

export default routes;