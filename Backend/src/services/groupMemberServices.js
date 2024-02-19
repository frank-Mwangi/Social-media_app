import { poolRequest, sql } from "../utils/dbConnect.js";

export const getGroupMembersService = async () => {
  try {
    const result = await poolRequest().query(
      "SELECT GroupMembers.*, [Group].GroupName, [Group].Description, [User].Username, [User].Email, [User].TagName, [User].Location FROM GroupMembers INNER JOIN [Group] ON GroupMembers.GroupID = [Group].GroupID INNER JOIN [User] ON GroupMembers.MemberID = [User].UserID"
    );
    //console.log(result.recordset);
    return result.recordset;
  } catch (error) {
    return error.message;
  }
};

export const getGroupMembersByIDService = async (GroupID) => {
  try {
    const result = await poolRequest()
      .input("GroupID", sql.Int, GroupID)
      .query(
        "SELECT GroupMembers.*, [Group].GroupName, [Group].Description, [User].Username, [User].Email, [User].TagName, [User].Location FROM GroupMembers INNER JOIN [Group] ON GroupMembers.GroupID = [Group].GroupID INNER JOIN [User] ON GroupMembers.MemberID = [User].UserID WHERE [Group].GroupID=@GroupID"
      );
    return result.recordset;
  } catch (error) {
    return error;
  }
};

export const getGroupsByMemberIDService = async (MemberID) => {
  try {
    const result = await poolRequest()
      .input("MemberID", sql.Int, MemberID)
      .query(
        "SELECT GroupMembers.*, [Group].GroupName, [Group].Description, [User].Username, [User].Email, [User].TagName, [User].Location FROM GroupMembers INNER JOIN [Group] ON GroupMembers.GroupID = [Group].GroupID INNER JOIN [User] ON GroupMembers.MemberID = [User].UserID WHERE GroupMembers.MemberID=@MemberID"
      );
    return result.recordset;
  } catch (error) {
    return error;
  }
};

export const createGroupMemberService = async (newGroupMember) => {
  try {
    const { GroupID, MemberID } = newGroupMember;
    const result = await poolRequest()
      .input("GroupID", sql.Int, GroupID)
      .input("MemberID", sql.Int, MemberID)
      .query("INSERT INTO GroupMembers VALUES (@GroupID, @MemberID)");
    return result;
  } catch (error) {
    return error;
  }
};

export const deleteGroupMemberService = async (GroupID, MemberID) => {
  try {
    await poolRequest()
      .input("GroupID", sql.Int, GroupID)
      .input("MemberID", sql.Int, MemberID)
      .query(
        "DELETE FROM GroupMember WHERE GroupID=@GroupID AND MemberID=@MemberID"
      );
  } catch (error) {
    return error.message;
  }
};
