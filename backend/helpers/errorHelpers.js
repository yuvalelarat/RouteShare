export const checkIfEntityExists = (entity, entityName, res) => {
  if (!entity) {
    return res.status(404).json({
      success: false,
      message: `${entityName} not found`,
    });
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
