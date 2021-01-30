import express from "express";
import bodyParser from "body-parser";
import session from 'express-session';
import cors from "cors";
import router from "./routes";
import config from "../config";
import passport from "passport";
import PassportDiscord from "passport-discord";
import { client } from "../bot";
import { database } from "./UseCases/Main";
const app = express();
const DiscordStrategy = PassportDiscord.Strategy;

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((obj, done) => {
  done(null, obj);
});

passport.use(new DiscordStrategy({
  clientID: client.user.id,
  clientSecret: config.OAUTHSECRET,
  callbackURL: `${config.BASEURL}/api/callback`,
  scope: ['identify', 'guilds']
},
async (accessToken, refreshToken, profile, done) => {
  const user = await database.findUser({ _id: profile.id });
  if (user) process.nextTick(() => done(null, profile));
    else {
      await database.wrapperUser({_id: profile.id,username: profile.username,economy: {money: 0,rep: 0,backgrounds: [],badges: []}})
      process.nextTick(() => done(null, profile));
    };
}))

app.use(session({
  secret: config.OAUTHSECRET,
  resave: true,
  saveUninitialized: false,
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use("/api", router);

export { app };