module.exports.postCreate = (req,res,next)=>{
  var error = [];
  if(!req.body.name){
    error.push('Name is required');
  }
  if(req.body.name.length>30){
    error.push('Tên đăng nhập phải ít hơn 30 ký tự');
  }
  if(error.length){
      res.render('user/userCreate.pug',{
        error:error,
        values: req.body
      });
    return ;
  }
  next();
};