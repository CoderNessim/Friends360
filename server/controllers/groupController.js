const factory = require('./handlerFactory');
const Group = require('../models/groupModel');

exports.createGroup = factory.createOne(Group, 'Group');
