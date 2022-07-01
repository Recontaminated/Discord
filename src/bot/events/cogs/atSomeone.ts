import { Message } from "discord.js";

export default async function (message: Message) {
    if (!message.content.toLowerCase().includes("@someone") && message.mentions.roles.first().name !== 'someone')
        return;

    const members = message.guild.members.cache;

    let randomMember = members.random();

    let loop = 0;

    while (true) {
        loop++;
        if (loop > 5)
            break;
        randomMember = members.random();
        if (randomMember.user.bot) continue;
        if (!randomMember.presence) continue;
        if (randomMember.presence.status == "offline") continue;
        break;
    }

    await message.channel.send(`${randomMember.user.toString()}`);
}

export const settings = {
    once: false,
    event: "messageCreate",
};