const FormModel = require('../models/form_model');

sendFormData = (req, res) => {
  const body = req.body;

  if (!body) {
    return res.status(400).json({
      success: false,
      error: 'You must provide a form data',
    });
  }

  const formData = new FormModel(body);
  if(!formData) {
    return res.status(400).json({ success: false, error: err });
  }

  formData.save()
    .then(() => {
      return res.status(201).json({
        id: formData._id,
        success: true,
        message: 'Application has been sent',
      });
    })
    .catch(error => {
      return res.status(400).json({
        error,
        message: 'Application has not been sent',
    });
  });
}

getFormData =  async (req, res) => {
  await FormModel.find({}, (err, data) => {
    if(err) {
      return res.status(400).json({ success: false, error: err })
    }
    if (!data.length) {
      return res
        .status(404)
        .json({ success: false, error: `Form data not found` })
    }
    return res.status(200).json({ success: true, data })
  }).catch(err => console.log(err))
}

module.exports = {
  getFormData,
  sendFormData
};
