function applySubstitution(dayRoles, restingRole) {
  const roles = { ...dayRoles };

  switch (restingRole) {
    case "AP":
      roles.AAP = "AP";
      roles.ACH = "CENTRALE";
      break;
    case "CH":
      roles.ACH = "CH";
      roles.AAP = "CENTRALE";
      break;
    case "ACH":
      roles.AAP = "CENTRALE";
      break;
    case "AAP":
      roles.ACH = "CENTRALE";
      break;
  }
  return roles;
}
