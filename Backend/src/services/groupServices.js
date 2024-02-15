import { poolRequest, sql } from "../utils/dbConnect.js";

export const getGroupsService = async () => {
  try {
    const result = await poolRequest().query("SELECT * FROM [Group]");
    return result.recordset;
  } catch (error) {
    return error.message;
  }
};

export const createGroupsService = async (newGroup) => {
  const { GroupName, Description, CreatedDate } = newGroup;
  try {
    const result = await poolRequest()
      .input("GroupName", sql.VarChar, GroupName)
      .input("Description", sql.VarChar, Description)
      .input("CreatedDate", sql.DateTime, CreatedDate)
      .query(
        "INSERT INTO [Group] (GroupName, Description, CreatedDate) VALUES (@GroupName, @Description, @CreatedDate)"
      );

    //console.log(result);
    return result;
  } catch (error) {
    return error.message;
  }
};

export const updateGroupService = async (group) => {
  const { GroupID, GroupName, Description, CreatedDate } = group;
  try {
    const result = await poolRequest()
      .input("GroupID", sql.Int, GroupID)
      .input("GroupName", sql.VarChar, GroupName)
      .input("Description", sql.VarChar, Description)
      .input("CreatedDate", sql.DateTime, CreatedDate)
      .query(
        "Update [Group] SET GroupName=@GroupName, Description=@Description, CreatedDate=@CreatedDate WHERE GroupID=@GroupID"
      );
    return result;
  } catch (error) {
    return error.message;
  }
};

export const deleteGroupService = async (GroupID) => {
  try {
    await poolRequest()
      .input("GroupID", sql.Int, GroupID)
      .query("DELETE FROM [Group] WHERE GroupID=@GroupID");
  } catch (error) {
    return error.message;
  }
};
