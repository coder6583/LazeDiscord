#!/usr/bin/env node
"use strict";
exports.__esModule = true;
var discord_js_1 = require("discord.js");
var Discord = require('discord.js');
var dotenv = require('dotenv');
var exec = require('child_process').exec;
var fs = require('fs');
var errorfileSize = 0;
// fs.readFile('/home/laze-admin/laze-server-stderr.log', (err: Error, data: string) => {
//   errorfileSize = data.length;
// });
var client = new Discord.Client({ intents: [discord_js_1.Intents.FLAGS.GUILDS, discord_js_1.Intents.FLAGS.GUILD_MESSAGES] });
dotenv.config();
client.on('ready', function () {
    console.log('a');
    console.log("Logged in as ".concat(client.user.tag, "!"));
});
client.on('message', function (msg) {
    if (msg.author.bot) {
        console.log("bot");
        return;
    }
    // return;
    msg.channel.send('ping');
    console.log(msg.content);
    var line = msg.content;
    // msg.channel.send(line);
    if (msg.author.bot) {
        console.log("bot");
        return;
    }
    if (line[0] == '!') {
        var command = line.slice(1);
        if (command == 'start') {
            msg.channel.send('Starting...');
            exec('sudo systemctl start laze-server', function (err, stdout, stderr) {
                msg.channel.send('標準出力');
                if (stdout)
                    msg.channel.send(stdout);
                msg.channel.send('標準エラー');
                if (stderr)
                    msg.channel.send(stderr);
                if (err)
                    msg.channel.send('Command Failed');
                else
                    msg.channel.send('Command Successful');
            });
            fs.writeFile(__dirname + '//home/laze-admin/laze-server-stderr.log', '', function (err) {
                if (err)
                    msg.channel.send('Could not empty error log file');
                else
                    msg.channel.send('Start process complete');
            });
        }
        else if (command == 'stop') {
            msg.channel.send('Stopping...');
            exec('sudo systemctl stop laze-server', function (err, stdout, stderr) {
                msg.channel.send('標準出力');
                if (stdout)
                    msg.channel.send(stdout);
                msg.channel.send('標準エラー');
                if (stderr)
                    msg.channel.send(stderr);
                if (err)
                    msg.channel.send('Command Failed');
                else
                    msg.channel.send('Command Successful');
            });
        }
        else if (command == 'restart') {
            msg.channel.send('Restarting...');
            exec('sudo systemctl restart laze-server', function (err, stdout, stderr) {
                msg.channel.send('標準出力');
                if (stdout)
                    msg.channel.send(stdout);
                msg.channel.send('標準エラー');
                if (stderr)
                    msg.channel.send(stderr);
                if (err)
                    msg.channel.send('Command Failed');
                else
                    msg.channel.send('Command Successful');
            });
            fs.writeFile(__dirname + '//home/laze-admin/laze-server-stderr.log', '', function (err) {
                if (err)
                    msg.channel.send('Could not empty error log file');
                else
                    msg.channel.send('Restart complete');
            });
        }
        else if (command == 'update') {
            msg.channel.send("Updating... スパムしないで頑張ってるから");
            exec('git -C /home/laze-admin/LazeNext stash', function (err, stdout, stderr) {
                if (err)
                    msg.channel.send('Compiler Stash Failed');
                else
                    msg.channel.send('Compiler Stash Successful');
                exec('git -C /home/laze-admin/LazeNext pull ', function (err, stdout, stderr) {
                    msg.channel.send('標準出力');
                    if (stdout)
                        msg.channel.send(stdout);
                    msg.channel.send('標準エラー');
                    if (stderr)
                        msg.channel.send(stderr);
                });
            });
        }
    }
    else {
        var command = line;
        msg.channel.send(command);
        exec(command, function (err, stdout, stderr) {
            msg.channel.send('標準出力');
            if (stdout)
                msg.channel.send(stdout);
            msg.channel.send('標準エラー');
            if (stderr)
                msg.channel.send(stderr);
            if (err)
                msg.channel.send('Command Failed');
            else
                msg.channel.send('Command Successful');
        });
    }
});
// fs.watchFile(__dirname + '//home/laze-admin/laze-server-stderr.log', (curr: any, prev: any) =>{
//   console.log('file changed');
//   fs.readFile(__dirname + '//home/laze-admin/laze-server-stderr.log', (err: Error, data: string) =>{
//     if(data.length == 0)
//     {
//       errorfileSize = 0;
//     }
//     else
//     {
//       console.log(data.length);
//       console.log(errorfileSize);
//       let change = data.slice(errorfileSize);
//       console.log(change.toString());
//       client.channels.fetch('824546860655837194').then((channel: any) => {
//         (<TextChannel> channel).send('```' + change.toString()+ '```');
//       });
//       errorfileSize = data.length;
//     }
//   })
// })
client.login(process.env.TOKEN);
