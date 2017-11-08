/**
 * Created by Candy on 2017/8/14.
 */
import { handleProjectSave, handleProjectList, handleProjectOwner, handleProjectReport, handleProjectDetail,
  handleProjectDelete } from '../models/project';

module.exports = (app) => {
  app.post('/project/new', async (req, res) => {
    const result = await handleProjectSave(req.body);
    res.send(result);
  });
  app.get('/project/list', async (req, res) => {
    const result = await handleProjectList(req.query);
    res.send(result);
  });
  app.get('/project/owner', async (req, res) => {
    const result = await handleProjectOwner(req.query.uid);
    res.send(result);
  });
  app.post('/project/report', async (req, res) => {
    const result = await handleProjectReport(req.body);
    res.send(result);
  });
  app.get('/project/detail', async (req, res) => {
    const result = await handleProjectDetail(req.query);
    res.send(result);
  });
  app.post('/project/delete', async (req, res) => {
    const result = await handleProjectDelete(req.body.updatedTime);
    res.send(result);
  });
};
