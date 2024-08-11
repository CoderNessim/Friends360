const StreamChat = require('stream-chat').StreamChat;
const catchAsync = require('../utils/catchAsync');

const serverClient = StreamChat.getInstance(
  process.env.STREAM_API_KEY,
  process.env.STREAM_API_SECRET,
);

exports.updatePermission = catchAsync(async (req, res, next) => {
  //update permission of a channel
  const { channelId, userId, role } = req.body;

  const channel = serverClient.channel('messaging', channelId, {
    created_by_id: userId,
  });
  await channel.watch();
  await channel.assignRoles([{ user_id: userId, channel_role: role }]);

  res.status(200).json({
    status: 'success',
    message: 'Role assigned successfully',
  });
});
