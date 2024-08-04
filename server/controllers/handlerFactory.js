const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.deleteOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);
    if (!doc) {
      return next(new AppError('No document found with that ID', 404));
    }

    res.status(204).json({
      status: 'success',
      data: null,
    });
  });

exports.updateOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const updateData = { ...req.body };

    if (req.file) {
      updateData.photo = `/public/img/users/${req.file.filename}`; // Store the relative path to the photo
    }

    const doc = await Model.findByIdAndUpdate(
      req.user.id || req.params.id,
      updateData,
      {
        new: true,
        runValidators: true,
      },
    );

    if (!doc) {
      return next(new AppError('No document found with that ID', 404));
    }

    res.status(200).json({
      status: 'success',
      data: {
        doc,
      },
    });
  });
// catchAsync(async (req, res, next) => {
//   const doc = await Model.findByIdAndUpdate(
//     req.params.id || req.user.id,
//     req.body,
//     {
//       new: true,
//       runValidators: true,
//     },
//   );

//   if (!doc) {
//     return next(new AppError('No document found with that ID', 404));
//   }

//   res.status(200).json({
//     status: 'success',
//     data: {
//       data: doc,
//     },
//   });
// });

exports.createOne = (Model, modelType = '') =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.create(req.body);
    if (modelType === 'Group') {
      doc.members.push(req.user.id);
      doc.admin = req.user.id;
      await doc.save();
    }

    res.status(201).json({
      status: 'success',
      data: {
        data: doc,
      },
    });
  });

exports.getOne = (Model, popOptions = '') =>
  catchAsync(async (req, res, next) => {
    let id = req.params.id;
    if (!id) id = req.user.id;
    let query = Model.findById(id);
    if (popOptions) query = query.populate(popOptions);

    const doc = await query;

    if (!doc) {
      return next(new AppError('No document found with that ID', 404));
    }

    res.status(200).json({
      status: 'success',
      data: {
        data: doc,
      },
    });
  });

exports.getAll = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.find;
    res.status(200).json({
      status: 'success',
      results: doc.length,
      data: {
        data: doc,
      },
    });
  });
