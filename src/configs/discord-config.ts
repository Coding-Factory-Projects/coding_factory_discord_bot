const {
  discord_token: token,
  discord_client_id: clientId,
  discord_guild_id: guildId,
  discord_base_role_id: baseRoleId,
  discord_guest_role_id: guestRoleId,
} = process.env;

export { token, clientId, guildId, baseRoleId, guestRoleId };
