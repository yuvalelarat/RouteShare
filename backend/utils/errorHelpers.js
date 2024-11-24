export const checkIfEntitiesExist = async (entities, entityNames, res) => {
  for (let i = 0; i < entities.length; i++) {
    if (!entities[i]) {
      return res.status(404).json({
        success: false,
        message: `${entityNames[i]} not found`,
      });
    }
  }
  return null;
};


export const checkRequiredFields = (fields, res) => {
  for (const field in fields) {
    if (!fields[field]) {
      return res.status(400).json({
        success: false,
        message: `${field} is required.`,
      });
    }
  }
  return null;
};

export const getUserIdFromToken = (req, res) => {
  const user_id = req.user?.user_id;
  if (!user_id) {
    return res.status(401).json({ message: "Unauthorized: Missing user_id" });
  }
  console.log(`The user id is ${user_id}`);
  return user_id;
};
