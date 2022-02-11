require("dotenv").config();
const express = require("express")
const app = express();
const { default: axios } = require("axios");
const Discord = require("discord.js");
const ms = require("ms");
var cron = require("cron");
const client = new Discord.Client({
  partials: ["MESSAGE"],
});

let data = [] 
let newCase = 0
let newRecovery = 0
let newDeath = 0
let totalCase = 0
let totalRecovery = 0
let totalDeath = 0
let time = ''
client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
  axios
  .get("https://disease.sh/v3/covid-19/countries/thailand")
  .then((res) => { 
      data = res.data 
      console.log("Success!")
    })
    .catch((err) => {
      console.log(err)
    })
  client.user.setActivity("IJericko The Handsome Man", { type: "WATCHING" })
});

let scheduledMessage = new cron.CronJob('00 00 12 * * *', () => {
let channel = client.channels.cache.get('876310958191042590');
// let channel = client.channels.cache.get('790578744166973461');
    axios
      .get("https://disease.sh/v3/covid-19/countries/thailand")
      .then((res) => {
        data = res.data
        newCase = data.todayCases;
        newRecovery = data.todayRecovered
        newDeath = data.todayDeaths
        totalCase = data.cases
        totalRecovery = data.recovered
        totalDeath = data.deaths
        time = data.updated
        let date = new Date().toLocaleDateString('th-TH');
        channel.send({
            embed: {
                title: `:loudspeaker:    รายงานยอดผู้ติดเชื้อประจำวันที่ ${date}`,
                color: 16514839,
                fields: [
                  {
                    name: `:thermometer_face:   ยอดผู้ติดเชื้อวันนี้ `,
                    value: `>>>    ${newCase}    คน`,
                    inline: true
                  },
                  {
                    name: `||   :muscle:   หายป่วยวันนี้ `,
                    value: `>>>    ${newRecovery}    คน`,
                    inline: true
                  },
                  {
                    name: `||   :skull_crossbones:   เสียชีวิตวันนี้ `,
                    value: `>>>    ${newDeath}    คน`,
                    inline: true
                  },
                  {
                      name: `🦠   ยอดติดเชื้อรวม `,
                      value: `>>>    ${totalCase}    คน`,
                      inline: true
                  },
                  {
                      name: `||   💉   รักษาหายแล้วทั้งหมด `,
                      value: `>>>    ${totalRecovery}    คน`,
                      inline: true
                  },
                  {
                      name: `||   :skull_crossbones:   เสียชีวิตรวม `,
                      value: `>>>   ${totalDeath}    คน`,
                      inline: true
                  },
                  {
                    name: `Powered by IJericko`,
                    value: `Ref: https://disease.sh/`,
                  },
                ],
              },
        })
      })
      .catch((err) => {
        console.log(err)
      })
  })
  

client.on("message", (msg) => {
  if (msg.content === "!covid") {
    if(msg.channel.id == "876310958191042590"){
    // if(msg.channel.id == "790578744166973461"){
        newCase = data.todayCases;
        newRecovery = data.todayRecovered
        newDeath = data.todayDeaths
        totalCase = data.cases
        totalRecovery = data.recovered
        totalDeath = data.deaths
        time = data.updated
        let date = new Date().toLocaleDateString('th-TH');
        
        msg.channel.send({
            embed: {
              title: `:loudspeaker:    รายงานยอดผู้ติดเชื้อประจำวันที่ ${date}`,
              color: 16514839,
              fields: [
                {
                  name: `:thermometer_face:   ยอดผู้ติดเชื้อวันนี้ `,
                  value: `>>>    ${newCase}    คน`,
                  inline: true
                },
                {
                  name: `||   :muscle:   หายป่วยวันนี้ `,
                  value: `>>>    ${newRecovery}    คน`,
                  inline: true
                },
                {
                  name: `||   :skull_crossbones:   เสียชีวิตวันนี้ `,
                  value: `>>>    ${newDeath}    คน`,
                  inline: true
                },
                {
                    name: `🦠   ยอดติดเชื้อรวม `,
                    value: `>>>    ${totalCase}    คน`,
                    inline: true
                },
                {
                    name: `||   💉   รักษาหายแล้วทั้งหมด `,
                    value: `>>>    ${totalRecovery}    คน`,
                    inline: true
                },
                {
                    name: `||   :skull_crossbones:   เสียชีวิตรวม `,
                    value: `>>>   ${totalDeath}    คน`,
                    inline: true
                },
                {
                  name: `Powered by IJericko`,
                  value: `Ref: https://disease.sh/`,
                },
              ],
            }
        });
    }
        
  }
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Our app is running on port ${ PORT }`);
});
scheduledMessage.start()
client.login(process.env.BOT_TOKEN);
