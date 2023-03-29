const { Telegraf, Markup } = require("telegraf");
require("dotenv").config();
const text = require("./const");

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.start((ctx) => {
  ctx.reply(
    `Hello ${ctx.message.from.first_name ? ctx.message.from.first_name : ""}! Please click Menu.`
  );
});
bot.help((ctx) => ctx.reply(text.commands));

bot.command("game_pass_tariff", async (ctx) => {
  try {
    await ctx.replyWithHTML(
      "<b>Choose game pass tariff</b>",
      Markup.inlineKeyboard(
        [
          [Markup.button.callback("300UAH/1_month", "btn_1"), Markup.button.callback("700UAH/3_months", "btn_2"), Markup.button.callback("1000UAH/6_months", "btn_3"),],
          [Markup.button.callback("1500UAH/12+1_months", "btn_4"), Markup.button.callback("2600UAH/24+2_months", "btn_5")],
          [Markup.button.callback("3600UAH/36+3_months - the best offer ", "btn_6")],
        ]
      )
    );
  } catch (err) {
    console.error(err);
  } 
});

function addActionBot(name, src, text) {
  bot.action(name, async (ctx) => {
    try {
      await ctx.answerCbQuery();
      if (src !== false) {
        await ctx.replyWithPhoto({
          source: src
        });
      }
      await ctx.replyWithHTML(text, {
        disable_web_page_preview: true //
      });
    } catch (err) {
      console.error(err)
    }
  });
}
addActionBot('btn_1', false, text.text);
addActionBot('btn_2', false, text.text);
addActionBot('btn_3', false, text.text);
addActionBot('btn_4', false, text.text);
addActionBot('btn_5', false, text.text);
addActionBot('btn_6', false, text.text);


bot.on("message", (ctx) => {
  const message = ctx.message.text.toLowerCase();
  if (message === "hello" || message === "hi") {
    ctx.reply("Hello there!");
  } else if (message === "bye" || message === "goodbye") {
    ctx.reply("Goodbye!");
  } else {
    ctx.reply("Sorry, I didn't understand that.");
  }
});

bot.launch();
