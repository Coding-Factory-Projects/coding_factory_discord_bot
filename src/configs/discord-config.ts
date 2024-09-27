const {
  discord_token: token,
  discord_client_id: clientId,
  discord_guild_id: guildId,
  discord_base_role_id: baseRoleId,
  discord_guest_role_id: guestRoleId,
  discord_admin_role_id: adminRoleId,
  discord_everyone_role_id: everyoneRoleId,
  discord_product_owners_role_id: productOwnersRoleId,
} = process.env;

export { token, clientId, guildId, baseRoleId, guestRoleId, adminRoleId, everyoneRoleId, productOwnersRoleId };
