const boom = require('@hapi/boom');

function validatorHandler(schema, property) {
  return (req, res, next) => {
    console.log(req[property]);
    const data = req[property];
    const { error } = schema.validate(data, { abortEarly: false });
    if (error) {
      next(boom.badRequest(error)); //para que los middleware de tipo error los procese
    } else {
      next();
    }
  };
}

module.exports = validatorHandler;
