function applyFullCoverage(dayRoles, restingRole) {
  const roles = { ...dayRoles };

  // reset ruoli
  Object.keys(roles).forEach(r => roles[r] = null);

  if (restingRole === "AP") {
    roles.AP = "AAP";
    roles.CH = "ACH";
    roles.CENTRALE = "CH";
  }

  if (restingRole === "CH") {
    roles.CH = "ACH";
    roles.AP = "AAP";
    roles.CENTRALE = "CH";
  }

  if (restingRole === "AAP") {
    roles.AP = "AP";
    roles.CH = "ACH";
    roles.CENTRALE = "AAP";
  }

  if (restingRole === "ACH") {
    roles.AP = "AP";
    roles.CH = "CH";
    roles.CENTRALE = "AAP";
  }

  return roles;
}
