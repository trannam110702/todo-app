const yup = require("yup");
async function todoInputMiddleware(ctx, next) {
  try {
    const postData = ctx.request.body;
    let schema = yup.object().shape({
      name: yup.string().required(),
    });

    await schema.validate(postData);
    next();
  } catch (e) {
    ctx.status = 400;
    ctx.body = {
      success: false,
      errors: e.errors,
      errorName: e.name,
    };
  }
}
async function todoInputUpdateMiddleware(ctx, next) {
  try {
    const postData = ctx.request.body;
    let schema = yup.object().shape({
      isCompleted: yup.boolean().required(),
    });

    await schema.validate(postData);
    next();
  } catch (e) {
    ctx.status = 400;
    ctx.body = {
      success: false,
      errors: e.errors,
      errorName: e.name,
    };
  }
}
module.exports = { todoInputMiddleware, todoInputUpdateMiddleware };
