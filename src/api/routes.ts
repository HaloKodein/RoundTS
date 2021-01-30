import { Router } from "express";
import { mainController } from "./UseCases/Main/MainUseController";
import passport from "passport";
const router = Router();

router.get('/', (req, res) => {
  mainController.handler(req, res);
});

router.get('/login', passport.authenticate('discord'));

router.get('/logout', function (req, res) {
  req.logout();
  res.redirect('/api');
});

router.get('/callback', passport.authenticate('discord', {
  failureRedirect: '/autherror'
}), (req, res) => {
  res.redirect('/api');
});

export default router;